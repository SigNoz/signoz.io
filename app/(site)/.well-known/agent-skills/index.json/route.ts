import { GET as getSkillMarkdown } from '@/app/(site)/skill.md/route'
import { buildAgentSkillsIndex, discoveryJsonResponse } from '@/utils/agentDiscoveryCards'

export async function GET() {
  const skillBody = await (await getSkillMarkdown()).text()
  return discoveryJsonResponse(buildAgentSkillsIndex(skillBody))
}
