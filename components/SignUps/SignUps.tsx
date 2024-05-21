import MarkdownRenderer from '@/components/ReactMarkdown'
import React from 'react'

const markdownContent = `[![Pricing Page](/img/blog/common/signup_cta_1.webp)](https://signoz.io/pricing/)`

export default function SignUps() {
  return <MarkdownRenderer markdownContent={markdownContent} />
}
