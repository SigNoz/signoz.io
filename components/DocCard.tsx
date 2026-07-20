import React from 'react'
import Link from '@/components/Link'

interface CardProps {
  title: string
  description: string
  href: string
}

const DocCard: React.FC<CardProps> = ({ title, description, href }) => {
  return (
    <Link
      href={href}
      className="block overflow-hidden rounded border border-[var(--l2-border)] bg-[var(--l2-background)] p-6 no-underline shadow-lg transition-all duration-200 ease-in-out hover:border-[var(--accent-primary)]"
    >
      <div className="mb-2 text-xl font-bold text-[var(--l1-foreground)]">{title}</div>
      <p className="text-base text-[var(--l2-foreground)]">{description}</p>
    </Link>
  )
}

export default DocCard
