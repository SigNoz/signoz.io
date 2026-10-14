import { buildAgentCard, discoveryJsonResponse } from '@/utils/agentDiscoveryCards'

export async function GET() {
  return discoveryJsonResponse(buildAgentCard())
}
