#!/usr/bin/env python3
"""Blog SEO audit: internal links, orphans, meta lengths, featured images.
Run: python3 scripts/seo/audit.py  (from project root)"""
import re, os, sys, json
root=os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
src=open(f'{root}/src/data/blog-posts.ts').read()
# split into post objects by "    id: '"
chunks=re.split(r"\n  \{\n    id: '", src)[1:]
posts=[]
for c in chunks:
    pid=c.split("'",1)[0]
    g=lambda k: (re.search(rf"\n    {k}:\s*\n?\s*'((?:[^'\\]|\\.)*)'", c) or [None,None])[1]
    content=c.split('content: `',1)[1].split('`',1)[0] if 'content: `' in c else ''
    posts.append(dict(id=pid,slug=g('slug'),title=g('title'),meta_title=g('meta_title'),meta_description=g('meta_description'),excerpt=g('excerpt'),img=g('featured_image_url'),content=content))
blog_slugs={p['slug'] for p in posts}
def slugs(path):
    return set(re.findall(r"slug: '([^']+)'", open(f'{root}/{path}').read()))
# NOTE: src/data/ports.ts holds embarkation ports rendered at /hotels/[port], NOT /ports/[slug].
hotel_ports=slugs('src/data/ports.ts'); ports=set(); ships=slugs('src/data/ships.ts')
dest=set()
import glob
for f in ['src/data/destination-ports.ts','src/data/destination-ports-extra.ts']+[os.path.relpath(x,root) for x in glob.glob(f'{root}/src/data/destination-ports/*.ts')]:
    if os.path.exists(f'{root}/{f}'): dest|=slugs(f)
app=f'{root}/src/app'
static_routes=set()
for d,_,fs in os.walk(app):
    if 'page.tsx' in fs:
        r='/'+os.path.relpath(d,app).replace(os.sep,'/')
        static_routes.add('/' if r=='/.' else r)
def resolve(href):
    h=href.split('#')[0].split('?')[0].rstrip('/') or '/'
    if not h.startswith('/'): return True
    if h in static_routes: return True
    m=re.match(r'^/blog/([^/]+)$',h)
    if m: return m.group(1) in blog_slugs or f'/blog/{m.group(1)}' in static_routes
    m=re.match(r'^/ports/([^/]+)$',h)
    if m: return m.group(1) in ports or m.group(1) in dest
    m=re.match(r'^/hotels/([^/]+)$',h)
    if m: return m.group(1) in hotel_ports
    m=re.match(r'^/ships/([^/]+)$',h)
    if m: return m.group(1) in ships
    # dynamic [slug]/[id] routes we can't verify statically
    for r in static_routes:
        if '[' in r and re.fullmatch(re.sub(r'\[[^\]]+\]','[^/]+',r),h): return True
    return False
issues=0; inbound={s:0 for s in blog_slugs}
for p in posts:
    hrefs=re.findall(r'href="([^"]+)"',p['content'])
    for h in hrefs:
        if not resolve(h): print(f"BROKEN  {p['slug']} -> {h}"); issues+=1
        m=re.match(r'^/blog/([^/#?]+)',h)
        if m and m.group(1) in inbound and m.group(1)!=p['slug']: inbound[m.group(1)]+=1
    t=p['meta_title'] or p['title']; d=p['meta_description'] or p['excerpt']
    if len(t)>60: print(f"TITLE>60 ({len(t)}) {p['slug']}"); issues+=1
    if not (120<=len(d)<=160): print(f"DESC {len(d)} {p['slug']}"); issues+=1
    if not p['img']: print(f"NOIMG {p['slug']}"); issues+=1
for s,n in inbound.items():
    if n==0: print(f"ORPHAN {s}"); issues+=1
print(f"{len(posts)} posts audited, {issues} issues")
