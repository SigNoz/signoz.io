import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

const CONTENT_DIR = join(process.cwd(), '.content', 'Doc')

interface DocJson {
  title: string
  description?: string
  docTags?: string[]
  body: {
    raw: string
  }
  slug: string
}

/**
 * Clean MDX syntax from raw markdown for plain text consumption
 */
function cleanMdxSyntax(body: string): string {
  let cleaned = body

  // Remove import statements
  cleaned = cleaned.replace(/^import\s+.*$/gm, '')

  // Remove export statements
  cleaned = cleaned.replace(/^export\s+.*$/gm, '')

  // Convert self-closing JSX components to placeholder text
  cleaned = cleaned.replace(/<(\w+)[^>]*\/>/g, '[$1]')

  // Convert JSX components with children to placeholder text
  cleaned = cleaned.replace(/<(\w+)[^>]*>[\s\S]*?<\/\1>/g, '[$1]')

  // Clean up excessive whitespace
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n').trim()

  return cleaned
}

/**
 * Build markdown document with header and footer
 */
function buildMarkdown(doc: DocJson): string {
  const lines: string[] = []

  // Title
  lines.push(`# ${doc.title}`)
  lines.push('')

  // Description if present
  if (doc.description) {
    lines.push(`> ${doc.description}`)
    lines.push('')
  }

  // Tags if present
  const tags = Array.isArray(doc.docTags)
    ? doc.docTags.filter((t) => typeof t === 'string' && t.trim().length > 0)
    : []

  if (tags.length > 0) {
    lines.push(`**Tags:** ${tags.join(', ')}`)
    lines.push('')
  }

  lines.push('---')
  lines.push('')

  // Body
  lines.push(cleanMdxSyntax(doc.body.raw))

  // Footer
  lines.push('')
  lines.push('---')
  lines.push('')
  lines.push('For more documentation, visit https://signoz.io/docs/')

  return lines.join('\n')
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params
  const slugPath = slug.join('/')

  // Handle 'index' as 'introduction'
  const docSlug = slugPath === 'index' ? 'introduction' : slugPath

  // Build path to JSON file
  const jsonPath = join(CONTENT_DIR, `${docSlug}.json`)

  if (!existsSync(jsonPath)) {
    return NextResponse.json({ error: 'Document not found' }, { status: 404 })
  }

  try {
    const content = await readFile(jsonPath, 'utf-8')
    const doc: DocJson = JSON.parse(content)
    const markdown = buildMarkdown(doc)

    return new NextResponse(markdown, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error(`Failed to process doc ${docSlug}:`, error)
    return NextResponse.json({ error: 'Failed to process document' }, { status: 500 })
  }
}
