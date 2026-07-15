'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import './DocsFooter.css'

type FooterLink = { label: string; href: string; external?: boolean }

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Docs',
    links: [
      { label: 'Introduction', href: '/docs/introduction/' },
      { label: 'Contributing', href: '/docs/contributing/' },
      { label: 'Migrate from Datadog', href: '/docs/migration/migrate-from-datadog-to-signoz/' },
      { label: 'SigNoz API', href: '/api-reference/' },
    ],
  },
  {
    title: 'OpenTelemetry',
    links: [
      { label: 'What is OpenTelemetry', href: '/opentelemetry/' },
      { label: 'Collector Guide', href: '/blog/opentelemetry-collector-complete-guide/' },
      { label: 'OpenTelemetry Demo', href: '/blog/opentelemetry-demo/' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Support', href: '/support/' },
      { label: 'Slack', href: 'https://signoz.io/slack/', external: true },
      { label: 'Changelog', href: '/changelog/' },
      { label: 'Newsletter', href: 'https://newsletter.signoz.io/', external: true },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about-us/' },
      { label: 'Careers', href: 'https://signoz.io/careers/', external: true },
      { label: 'Terms', href: '/terms-of-service/' },
      { label: 'Privacy', href: '/privacy/' },
    ],
  },
]

function FooterPillLink({ link }: { link: FooterLink }) {
  if (link.external) {
    return (
      <a
        href={link.href}
        className="docs-footer-link"
        target="_blank"
        rel="noopener noreferrer nofollow"
      >
        {link.label}
      </a>
    )
  }

  return (
    <Link href={link.href} className="docs-footer-link" prefetch={false}>
      {link.label}
    </Link>
  )
}

export default function DocsFooter() {
  const pathname = usePathname()
  if (!pathname?.startsWith('/docs')) return null

  return (
    <footer className="docs-footer" aria-label="Docs footer">
      <div className="docs-footer-inner">
        <div className="docs-footer-cols">
          {COLUMNS.map((col) => (
            <div key={col.title} className="docs-footer-col">
              <div className="docs-footer-col-title">{col.title}</div>
              {col.links.map((link) => (
                <FooterPillLink key={link.href + link.label} link={link} />
              ))}
            </div>
          ))}
        </div>
        <div className="docs-footer-baseline">
          <span>© {new Date().getFullYear()} SigNoz Inc.</span>
          <span className="docs-footer-spacer" />
          <Link href="/terms-of-service/" className="docs-footer-link" prefetch={false}>
            Terms
          </Link>
          <Link href="/privacy/" className="docs-footer-link" prefetch={false}>
            Privacy
          </Link>
          <a
            href="https://trust.signoz.io/"
            className="docs-footer-link"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Security
          </a>
        </div>
      </div>
    </footer>
  )
}
