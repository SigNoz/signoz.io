import Link from 'next/link'
import { Typography } from '@signozhq/ui/typography'

interface InterlinkCardProps {
  href: string
  title: string
  className?: string
}

export default function InterlinkCard({ href, title, className = '' }: InterlinkCardProps) {
  return (
    <div
      className={`mb-6 rounded-lg border border-[var(--l2-border)] bg-[var(--l2-background)] p-4 ${className}`}
    >
      <Link
        href={href}
        className="text-lg font-medium text-[var(--accent-primary)] no-underline hover:text-[var(--accent-primary-hover)]"
        target="_blank"
        prefetch={false}
      >
        <Typography.Text as="span" className="text-inherit">
          {title} →
        </Typography.Text>
      </Link>
    </div>
  )
}
