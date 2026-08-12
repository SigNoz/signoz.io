import { getMcpDiscoveryDocument } from '@/utils/docs/buildMcpDiscoveryDocument'
import { agentResponse } from '@/utils/agentResponseHeaders'

export async function GET() {
  const body = JSON.stringify(await getMcpDiscoveryDocument(), null, 2)
  return agentResponse(body, { contentType: 'application/json; charset=utf-8' })
}
