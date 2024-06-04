import Enterprise from './EnterpriseCloud'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise Pricing',
}

export default function EnterprisePage() {
  return <Enterprise />
}