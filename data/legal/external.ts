export type ExternalLegalLink = {
  title: string
  description: string
  href: string
}

export const EXTERNAL_LEGAL_LINKS: ExternalLegalLink[] = [
  {
    title: 'Trust Center',
    description: 'Security practices, certifications, and compliance reports.',
    href: 'https://trust.signoz.io/',
  },
  {
    title: 'Subprocessors',
    description: 'Third-party service providers that process data on our behalf.',
    href: 'https://trust.signoz.io/subprocessors',
  },
]
