import React from 'react'
import Hero from './Hero'
import DocsCtaSection from './DocsCtaSection'
import DocsIntroSection from '@/components/DocsIntroSection/DocsIntroSection'
import { INTRO_SECTIONS } from './constants'
import { Metadata } from 'next'
import { generateDocsBreadcrumb } from '@/utils/breadcrumbSchema'
import JsonLdScript from '@/components/JsonLdScript'
import { INTRO_DESCRIPTION } from '@/utils/docs/agentDiscovery'
import siteMetadata from '@/data/siteMetadata'

export const metadata: Metadata = {
  title: 'Introduction to SigNoz - Open Source Observability Platform',
  description: INTRO_DESCRIPTION,
  alternates: {
    // This route is its own page, so it does not inherit the catch-all's
    // markdown alternate. Without this the main docs entry point is the one
    // page that never advertises its `.md` twin.
    types: { 'text/markdown': `${siteMetadata.siteUrl}/docs/introduction.md` },
  },
}

/**
 * The markdown twin of every docs page is announced in a `<link
 * rel="alternate">` tag and an sr-only note, neither of which a client reading
 * raw HTML tends to notice. State it once, visibly, on the first page.
 */
function MarkdownHint() {
  return (
    <div className="w-full border-b border-[var(--l1-border)]" data-markdown-ignore>
      <p className="mx-auto max-w-[1200px] px-4 py-3 text-sm text-[var(--l3-foreground)]">
        Reading these docs as a script or an agent? Append{' '}
        <code className="text-[var(--l1-foreground)]">.md</code> to any docs URL for plain markdown,
        or start from{' '}
        <a href="/llms.txt" className="text-inherit underline">
          llms.txt
        </a>
        .
      </p>
    </div>
  )
}

export default async function DocsIntroductionPage() {
  const breadcrumbJsonLd = await generateDocsBreadcrumb('introduction', 'Introduction')

  return (
    <>
      <JsonLdScript data={breadcrumbJsonLd} />
      <Hero />
      <MarkdownHint />
      {INTRO_SECTIONS.map((section) => (
        <DocsIntroSection key={section.clickLocation} {...section} />
      ))}
      <DocsCtaSection />
    </>
  )
}
