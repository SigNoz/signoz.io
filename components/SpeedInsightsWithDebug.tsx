import { headers } from 'next/headers'
import SpeedInsightsClient from './SpeedInsightsClient'

export default async function SpeedInsightsWithDebug() {
  const requestHeaders = headers()
  const vercelId = requestHeaders.get('x-vercel-id')
  return <SpeedInsightsClient vercelId={vercelId} />
}
