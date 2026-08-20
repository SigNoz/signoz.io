import { Metadata } from 'next'

const enterpriseDescription =
  'Compare SigNoz Cloud, SigNoz-managed BYOC, and Self-Hosted SigNoz for enterprise security, compliance, scale, and contracted support.'

export const metadata: Metadata = {
  title: {
    absolute: 'SigNoz Enterprise | Built for Scale',
  },
  openGraph: {
    title: 'SigNoz Enterprise | Built for Scale',
    description: enterpriseDescription,
  },
  twitter: {
    description: enterpriseDescription,
  },
  description: enterpriseDescription,
}
