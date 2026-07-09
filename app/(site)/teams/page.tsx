import { Suspense } from 'react'
import TeamsPage from './TeamsPage'

import { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: {
    absolute: 'SigNoz | Teams',
  },
  openGraph: {
    title: 'SigNoz | Teams',
    description:
      ' Sign up for SigNoz cloud and get 30 days of free trial with access to all features.',
  },
  description:
    'Sign up for SigNoz cloud and get 30 days of free trial with access to all features.',
}

export default async function Teams({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const initialAuthCode = typeof params.code === 'string' ? params.code : null
  const initialSsoError = typeof params.has_sso_error === 'string' ? params.has_sso_error : null

  return (
    <Suspense>
      <TeamsPage initialAuthCode={initialAuthCode} initialSsoError={initialSsoError} />
    </Suspense>
  )
}
