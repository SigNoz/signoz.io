import Enterprise from './EnterpriseCloud'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise Cloud',
}

export default function EnterprisePage() {
  return <Enterprise />
}