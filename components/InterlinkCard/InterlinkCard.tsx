import Link from 'next/link'

interface InterlinkCardProps {
  href: string
  title: string
  className?: string
}

export default function InterlinkCard({ href, title, className = '' }: InterlinkCardProps) {
  return (
    <div
      className={`mb-6 rounded-lg border border-[var(--l1-border)] bg-[var(--l2-background)] p-4 ${className}`}
    >
      <Link
        href={href}
        className="text-lg font-medium text-[var(--accent-primary)] no-underline hover:text-[var(--accent-primary-hover)]"
        target="_blank"
        prefetch={false}
      >
        {title} →
      </Link>
    </div>
  )
}
