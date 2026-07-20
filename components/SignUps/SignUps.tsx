import MarkdownRenderer from '@/components/ReactMarkdown'
import React from 'react'

const markdownContent = `[![Pricing Page](/img/blog/common/signup_cta_1.webp)](https://signoz.io/pricing/)`

export default function SignUps() {
  return (
    <div className="overflow-hidden rounded-md border border-[var(--l2-border)] bg-[var(--l2-background)]">
      <MarkdownRenderer markdownContent={markdownContent} />
    </div>
  )
}
