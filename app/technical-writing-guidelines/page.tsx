import MarkdownRenderer from '@/components/ReactMarkdown'
import React from 'react'

const markdownContent = ``

export default function page() {
  return (
    <div className="container mx-auto my-16">
      <MarkdownRenderer markdownContent={markdownContent} />
    </div>
  )
}
