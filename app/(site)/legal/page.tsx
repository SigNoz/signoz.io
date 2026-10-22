import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import siteMetadata from '@/data/siteMetadata'
import { EXTERNAL_LEGAL_LINKS } from '@/data/legal/external'
import { formatLegalDate, getLegalDocs } from '@/utils/legal'

const description = 'Terms, policies, and compliance resources for using SigNoz.'

export const metadata: Metadata = {
  title: 'Legal',
  description,
  openGraph: {
    title: 'Legal | SigNoz',
    description,
    url: `${siteMetadata.siteUrl}/legal/`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'Legal | SigNoz',
    description,
    images: [siteMetadata.socialBanner],
    site: siteMetadata.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/legal/`,
  },
}

const rowClassName =
  'group flex items-start justify-between gap-6 py-5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bg-robin-400)]'

const RULE_CLASSES = 'rule-fade-x border-b border-[var(--l2-border)]'

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className={`${RULE_CLASSES} m-0 pb-3 text-sm font-medium text-[var(--l3-foreground)]`}
    >
      {children}
    </h2>
  )
}

function RowText({ title, description }: { title: string; description: string }) {
  return (
    <span className="min-w-0">
      <span className="block text-lg font-medium text-[var(--l1-foreground)] group-hover:text-[var(--l1-foreground-hover)]">
        {title}
      </span>
      <span className="mt-1 block text-[var(--l3-foreground)]">{description}</span>
    </span>
  )
}

export default function LegalPage() {
  const docs = getLegalDocs()

  return (
    <div className="mx-auto w-full max-w-[880px] px-4 py-16 md:px-8 lg:py-24">
      <header>
        <h1 className="text-4xl font-semibold tracking-tight text-[var(--l1-foreground)] md:text-5xl">
          Legal
        </h1>
        <p className="mt-4 max-w-[56ch] text-lg text-[var(--l2-foreground)]">
          The terms that govern your use of SigNoz, and how we handle your data.
        </p>
      </header>

      <section aria-labelledby="legal-policies" className="mt-14">
        <SectionHeading id="legal-policies">Policies</SectionHeading>
        <ul className="m-0 list-none p-0">
          {docs.map((doc) => (
            <li key={doc.slug} className={RULE_CLASSES}>
              <Link href={`/legal/${doc.slug}/`} className={rowClassName}>
                <RowText title={doc.title} description={doc.description} />
                <span className="flex shrink-0 items-center gap-4 pt-1 text-sm text-[var(--l3-foreground)]">
                  {doc.lastUpdated && (
                    <span className="hidden sm:inline">
                      Updated{' '}
                      <time dateTime={doc.lastUpdated}>{formatLegalDate(doc.lastUpdated)}</time>
                    </span>
                  )}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--l1-foreground)] motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="legal-security" className="mt-14">
        <SectionHeading id="legal-security">Security &amp; compliance</SectionHeading>
        <ul className="m-0 list-none p-0">
          {EXTERNAL_LEGAL_LINKS.map((link) => (
            <li key={link.href} className={RULE_CLASSES}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={rowClassName}
              >
                <RowText title={link.title} description={link.description} />
                <span className="flex shrink-0 items-center gap-2 pt-1 text-sm text-[var(--l3-foreground)]">
                  <span className="hidden sm:inline">trust.signoz.io</span>
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--l1-foreground)] motion-reduce:transition-none"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
