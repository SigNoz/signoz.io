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
      className="border-border bg-card text-card-foreground hover:border-primary block overflow-hidden rounded border p-6 no-underline shadow-sm transition-all duration-200 ease-in-out"
    >
      <div className="text-l1-foreground mb-2 text-xl font-bold">{title}</div>
      <p className="text-muted-foreground text-base">{description}</p>
    </Link>
  )
}

export default DocCard
