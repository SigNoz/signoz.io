import { GET as getSkillMarkdown } from '@/app/(site)/skill.md/route'
import { buildLegacySkillsIndex, discoveryJsonResponse } from '@/utils/agentDiscoveryCards'

export async function GET() {
  const skillBody = await (await getSkillMarkdown()).text()
  return discoveryJsonResponse(buildLegacySkillsIndex(skillBody))
}
