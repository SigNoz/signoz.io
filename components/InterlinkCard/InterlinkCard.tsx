import Link from 'next/link'

interface InterlinkCardProps {
  href: string
  title: string
  className?: string
}

export default function InterlinkCard({ href, title, className = '' }: InterlinkCardProps) {
  return (
    <div className={`border-border bg-card mb-6 rounded-lg border p-4 ${className}`}>
      <Link
        href={href}
        className="text-primary hover:text-primary/80 text-lg font-medium no-underline"
        target="_blank"
        prefetch={false}
      >
        {title} →
      </Link>
    </div>
  )
}
