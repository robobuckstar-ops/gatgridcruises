#!/usr/bin/env python3
"""Page-metadata SEO audit: meta description length, openGraph presence, og:image.

Companion to audit.py (which covers blog posts in src/data/blog-posts.ts).
Run: python3 scripts/seo/pages.py   (from project root)
Exit code is 0 always; this is a reporting tool.

Skipped by design:
  - /admin, /auth, /account, /my-trip  (gated, not indexed)
  - redirect-only pages (a page.tsx whose body is just redirect())
  - routes whose metadata comes from generateMetadata() (dynamic [slug] routes)
"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
APP = os.path.join(ROOT, 'src', 'app')
SKIP = re.compile(r'^/(admin|auth|account|my-trip)(/|$)')
MIN_DESC, MAX_DESC = 120, 160


def brace_block(s, key):
    """Return the {...} block that follows `key`, brace-matched."""
    i = s.find(key)
    if i < 0:
        return None
    j = s.find('{', i)
    if j < 0:
        return None
    depth = 0
    for k in range(j, len(s)):
        if s[k] == '{':
            depth += 1
        elif s[k] == '}':
            depth -= 1
            if depth == 0:
                return s[j:k + 1]
    return None


def str_field(block, key, page=''):
    """Read a string field out of a metadata block.

    `description: SOME_CONST` used to fall through this regex, which then matched
    the *next* `description:` in the block (usually the twitter one) and reported
    a length for the wrong string. Resolve the identifier against the file first.
    """
    m = re.search(rf"(?<![\w.]){key}:\s*(?:\n\s*)?([A-Z][A-Z0-9_]*)\s*,", block)
    if m and page:
        c = re.search(rf"const {m.group(1)}\s*=\s*(['\"`])((?:[^\\]|\\.)*?)\1", page, re.S)
        if c:
            return c.group(2)
    m = re.search(rf"(?<![\w.]){key}:\s*(?:\n\s*)?(['\"`])((?:[^\\]|\\.)*?)\1", block, re.S)
    return m.group(2) if m else None


def is_noindex(block):
    """robots: { index: false } pages are deliberately out of the index."""
    robots = brace_block(block, 'robots')
    return bool(robots and re.search(r'index:\s*false', robots))


def desc_len(d):
    d = d.replace('\\n', ' ').replace("\\'", "'").replace('\\"', '"')
    # template interpolations render as a short value, not as the expression text
    d = re.sub(r'\$\{[^}]*\}', 'NN', d)
    return len(d)


def is_redirect_only(s):
    return 'redirect(' in s and 'export const metadata' not in s and len(s) < 600


def collect():
    routes = []
    for d, _, files in os.walk(APP):
        if 'page.tsx' not in files:
            continue
        rel = os.path.relpath(d, APP).replace(os.sep, '/')
        route = '/' if rel == '.' else '/' + rel
        if SKIP.match(route):
            continue
        page = open(os.path.join(d, 'page.tsx')).read()
        if is_redirect_only(page):
            continue
        meta, kind = None, None
        for fn in ('page.tsx', 'layout.tsx'):
            p = os.path.join(d, fn)
            if not os.path.exists(p):
                continue
            s = page if fn == 'page.tsx' else open(p).read()
            if 'generateMetadata' in s:
                kind = 'dynamic'
                break
            if 'export const metadata' in s:
                meta, kind = brace_block(s, 'export const metadata'), 'static'
                page = s  # consts the metadata references live in this file
                break
        routes.append((route, kind, meta, page))
    return sorted(routes)


def main():
    findings = []
    routes = [r for r in collect() if not (r[2] and is_noindex(r[2]))]
    for route, kind, meta, page in routes:
        if kind == 'dynamic':
            continue
        if kind is None or meta is None:
            findings.append(('NO-METADATA', route, ''))
            continue
        desc = str_field(meta, 'description', page)
        if not desc:
            findings.append(('NO-DESC', route, ''))
        else:
            n = desc_len(desc)
            if n > MAX_DESC:
                findings.append(('DESC-LONG', route, n))
            elif n < MIN_DESC:
                findings.append(('DESC-SHORT', route, n))
        og = brace_block(meta, 'openGraph')
        if not og:
            findings.append(('NO-OG', route, ''))
        elif 'images' not in og:
            findings.append(('OG-NO-IMAGE', route, ''))

    for kind in ('NO-METADATA', 'NO-DESC', 'DESC-LONG', 'DESC-SHORT', 'NO-OG', 'OG-NO-IMAGE'):
        group = [f for f in findings if f[0] == kind]
        if not group:
            continue
        print(f"\n## {kind} ({len(group)})")
        group.sort(key=lambda f: -(f[2] if isinstance(f[2], int) else 0))
        for _, route, val in group:
            print(f"   {str(val):>4} {route}")
    print(f"\n{len(routes)} indexable routes audited, {len(findings)} findings")


if __name__ == '__main__':
    main()
