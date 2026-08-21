import Link from 'next/link'

export interface Crumb {
  label: string
  /** Omit on the final crumb — the page you are already on. */
  href?: string
}

/**
 * The one breadcrumb treatment for the site. Guide pages used to hand-roll
 * these and drifted into three separator styles ("/", ">", "›") plus a chevron
 * icon, so the separator lives here and nowhere else.
 *
 * `tone="dark"` is for the navy hero blocks; `tone="light"` for the pale bar
 * some guides use above the article.
 */
export function Breadcrumbs({
  items,
  tone = 'dark',
  className = '',
}: {
  items: Crumb[]
  tone?: 'dark' | 'light'
  className?: string
}) {
  const styles =
    tone === 'dark'
      ? {
          link: 'text-blue-300 hover:text-[#D4AF37] transition-colors',
          current: 'text-blue-100',
          separator: 'text-blue-400/70',
        }
      : {
          link: 'text-[#1E3A5F] hover:underline',
          current: 'text-slate-500',
          separator: 'text-slate-400',
        }

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-x-2">
            {i > 0 && (
              <span aria-hidden="true" className={styles.separator}>
                /
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
