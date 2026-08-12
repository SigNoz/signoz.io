import EnterprisePage from './EnterprisePage'
import { Metadata } from 'next'

// 1 year
export const revalidate = 31536000

const whySigNozDescription =
  'Choose managed SigNoz Cloud, managed SigNoz Cloud: BYOC in your cloud account, or Self-Hosted SigNoz that your team operates.'

export const metadata: Metadata = {
  title: {
    absolute: 'Enterprise observability, built for the AI era | SigNoz',
  },
  openGraph: {
    title: 'Enterprise observability, built for the AI era | SigNoz',
    description: whySigNozDescription,
    images: '/img/platform/ClickStackAlternativeMeta.webp',
  },
  description: whySigNozDescription,
  twitter: {
    title: 'Enterprise observability, built for the AI era | SigNoz',
    description: whySigNozDescription,
    images: '/img/platform/ClickStackAlternativeMeta.webp',
  },
}

export default function Enterprise() {
  return <EnterprisePage />
}
