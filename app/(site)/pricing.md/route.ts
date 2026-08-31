import { agentResponse } from '@/utils/agentResponseHeaders'
import { buildPricingMarkdown } from '@/utils/pricingMarkdown'

/**
 * Markdown twin of /pricing. The pricing page is interactive (sliders, tabs, a
 * calculator), so it converts poorly to markdown; this serves a structured
 * plan/rate/feature document instead.
 */
export async function GET() {
  return agentResponse(buildPricingMarkdown(), { varyAccept: true })
}
