import React from 'react'
import Link from 'next/link'

interface CardProps {
  title: string
  description: string
  href: string
}

const DocCard: React.FC<CardProps> = ({ title, description, href }) => {
  return (
    <Link
      href={href}
      className="block overflow-hidden rounded border  border-gray-700 bg-gray-900 p-6 no-underline shadow-lg transition-all duration-200 ease-in-out hover:border-blue-500 dark:bg-gray-800"
    >
      <div className="mb-2 text-xl font-bold text-white dark:text-gray-100">{title}</div>
      <p className="text-base text-gray-400 dark:text-gray-300">{description}</p>
    </Link>
  )
}

export default DocCard
