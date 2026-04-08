import { headers } from 'next/headers'
import SpeedInsightsClient from './SpeedInsightsClient'

export default function SpeedInsightsWithDebug() {
  const vercelId = headers().get('x-vercel-id')
  return <SpeedInsightsClient vercelId={vercelId} />
}
