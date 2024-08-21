import MarkdownRenderer from '@/components/ReactMarkdown'
import React from 'react'

const markdownContent = `SigNoz cloud is the easiest way to run SigNoz. [Sign up](https://signoz.io/teams/) for a free
account and get 30 days of unlimited access to all features. [![Try SigNoz Cloud
CTA](/img/blog/common/try-signoz-cloud-all-blog-cta.webp)](https://signoz.io/teams/) You can
also install and self-host SigNoz yourself since it is open-source. With 18,000+ GitHub stars,
[open-source SigNoz](https://github.com/signoz/signoz) is loved by developers. Find the
[instructions](https://signoz.io/docs/install/) to self-host SigNoz.
`

export default function GetStartedSigNoz() {
  return <MarkdownRenderer markdownContent={markdownContent} />
}
