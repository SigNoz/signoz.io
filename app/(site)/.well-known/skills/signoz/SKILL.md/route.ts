import { GET as getSkillMarkdown } from '@/app/(site)/skill.md/route'

// Re-serve /skill.md byte-for-byte for v0.1.0 discovery clients.
export async function GET() {
  const response = await getSkillMarkdown()
  response.headers.set('Access-Control-Allow-Origin', '*')
  return response
}
