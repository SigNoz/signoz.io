import { Suspense } from 'react'
import TeamsPage from './TeamsPage'

import { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const teamsDescription =
  'Create a managed SigNoz Cloud workspace in the US, EU, or India. Get a 30-day trial with no credit card required.'

export const metadata: Metadata = {
  title: {
    absolute: 'SigNoz | Teams',
  },
  openGraph: {
    title: 'SigNoz | Teams',
    description: teamsDescription,
  },
  twitter: {
    description: teamsDescription,
  },
  description: teamsDescription,
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
