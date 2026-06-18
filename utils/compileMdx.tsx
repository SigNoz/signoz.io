import { promises as fs } from 'fs'
import path from 'path'
import React from 'react'
import { compileMDX, type MDXRemoteProps } from 'next-mdx-remote/rsc'

import { components as baseComponents } from '@/components/MDXComponents'
import { mdxOptions } from './mdxUtils'

const SHARED_IMPORT_RE =
  /^import\s+([A-Za-z_$][\w$]*)\s+from\s+['"]@\/components\/shared\/([^'"]+\.mdx?)['"]\s*$/

type CompileResult = {
  content: React.ReactNode
  source: string
}

type ImportedComponents = Record<string, React.ComponentType>

function extractLeadingSharedImports(source: string) {
  const lines = source.split(/\r?\n/)
  const imports: Array<{ localName: string; sharedPath: string }> = []
  let index = 0

  while (index < lines.length && lines[index].trim() === '') {
    index += 1
  }

  while (index < lines.length) {
    const match = lines[index].match(SHARED_IMPORT_RE)
    if (!match) break

    imports.push({
      localName: match[1],
      sharedPath: match[2],
    })

    lines[index] = ''
    index += 1

    while (index < lines.length && lines[index].trim() === '') {
      index += 1
    }
  }

  return {
    imports,
    source: lines.join('\n'),
  }
}

async function compileImportedSharedComponents(
  imports: Array<{ localName: string; sharedPath: string }>,
  seen: Set<string>
): Promise<ImportedComponents> {
  const importedComponents: ImportedComponents = {}

  for (const imported of imports) {
    const normalizedSharedPath = imported.sharedPath.replace(/^\/+/, '')
    const sharedFilePath = path.join(process.cwd(), 'components', 'shared', normalizedSharedPath)

    if (seen.has(sharedFilePath)) {
      continue
    }

    seen.add(sharedFilePath)
    const sharedSource = await fs.readFile(sharedFilePath, 'utf8')
    const { content } = await compileMdxSource(sharedSource, seen)
    importedComponents[imported.localName] = function ImportedSharedMdx() {
      return <>{content}</>
    }
  }

  return importedComponents
}

export async function compileMdxSource(
  source: string,
  seen = new Set<string>()
): Promise<CompileResult> {
  const { imports, source: sourceWithoutImports } = extractLeadingSharedImports(source)
  const importedComponents = await compileImportedSharedComponents(imports, seen)
  const components = {
    ...baseComponents,
    ...importedComponents,
  }

  const { content } = await compileMDX({
    source: sourceWithoutImports,
    components: components as MDXRemoteProps['components'],
    options: mdxOptions as MDXRemoteProps['options'],
  })

  return {
    content,
    source: sourceWithoutImports,
  }
}
