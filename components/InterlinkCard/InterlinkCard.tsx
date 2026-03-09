import Link from 'next/link'

interface InterlinkCardProps {
  href: string
  title: string
  className?: string
}

export default function InterlinkCard({ href, title, className = '' }: InterlinkCardProps) {
  return (
    <div className={`mb-6 rounded-lg border border-gray-800 bg-gray-900/50 p-4 ${className}`}>
      <Link
        href={href}
        className="text-lg font-medium text-blue-400 no-underline hover:text-blue-300"
        target="_blank"
        prefetch={false}
      >
        {title} →
      </Link>
    </div>
  )
}
