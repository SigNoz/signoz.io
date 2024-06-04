import Enterprise from './Enterprise'

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Enterprise',
}

export default function EnterprisePage() {
  return <Enterprise />
}