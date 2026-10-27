import { skillMarkdownResponse } from '@/utils/skillMarkdown'

export async function GET() {
  return skillMarkdownResponse()
}
