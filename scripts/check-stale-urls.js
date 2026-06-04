#!/usr/bin/env node

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function readRedirects({ staged = false } = {}) {
  let content
  if (staged) {
    try {
      content = execSync('git show ":next.config.js"', { encoding: 'utf8' })
    } catch {
      const configPath = path.join(process.cwd(), 'next.config.js')
      content = fs.readFileSync(configPath, 'utf8')
    }
  } else {
    const configPath = path.join(process.cwd(), 'next.config.js')
    content = fs.readFileSync(configPath, 'utf8')
  }
  const entries = []
  const regex = /source:\s*['"]([^'"]+)['"][\s\S]*?destination:\s*['"]([^'"]+)['"]/g
  for (const match of content.matchAll(regex)) {
    entries.push({ source: match[1], destination: match[2] })
  }
  return entries
}

function buildRedirectMap(redirects) {
  const sourceToDestination = new Map()
  for (const { source, destination } of redirects) {
    if (typeof source === 'string' && typeof destination === 'string') {
      sourceToDestination.set(normalizeTrailingSlash(source), destination)
    }
  }

  const resolved = new Map()
  for (const [source] of sourceToDestination) {
    let current = sourceToDestination.get(source)
    const visited = new Set([source])
    let hops = 0
    while (hops < 10 && sourceToDestination.has(normalizeTrailingSlash(current))) {
      const next = sourceToDestination.get(normalizeTrailingSlash(current))
      if (visited.has(normalizeTrailingSlash(next))) break
      visited.add(normalizeTrailingSlash(current))
      current = next
      hops++
    }

    if (current.startsWith('http://') || current.startsWith('https://')) continue
    resolved.set(source, current)
  }
  return resolved
}

function normalizeTrailingSlash(urlPath) {
  if (!urlPath || urlPath === '/') return urlPath
  return urlPath.endsWith('/') ? urlPath : `${urlPath}/`
}

function stripFencedCodeBlocks(content) {
  // Replace content of fenced blocks with empty lines to preserve line numbers
  function blankBlock(match) {
    const lineCount = match.split('\n').length
    return '\n'.repeat(lineCount - 1)
  }
  let out = content.replace(/^[ \t]*```[^\n]*\n[\s\S]*?^[ \t]*```/gm, blankBlock)
  out = out.replace(/^[ \t]*~~~[^\n]*\n[\s\S]*?^[ \t]*~~~/gm, blankBlock)
  return out
}

function extractUrls(content, filePath) {
  const isMdx = filePath.endsWith('.mdx')
  const scanContent = isMdx ? stripFencedCodeBlocks(content) : content
  const lines = scanContent.split('\n')
  const results = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const lineNum = i + 1
    const urls = new Set()

    if (isMdx) {
      // Markdown links: [text](/path) or [text](https://signoz.io/path)
      const mdLinkRegex = /\[(?:[^\]]*)\]\(([^)]+)\)/g
      let match
      while ((match = mdLinkRegex.exec(line)) !== null) {
        urls.add(match[1])
      }
      // Component href="..." or href='...'
      const hrefRegex = /href\s*=\s*["']([^"']+)["']/g
      while ((match = hrefRegex.exec(line)) !== null) {
        urls.add(match[1])
      }
    } else {
      // Code files: href="...", href='...', href={"/..."}
      const hrefDoubleRegex = /href\s*=\s*"([^"]+)"/g
      let match
      while ((match = hrefDoubleRegex.exec(line)) !== null) {
        urls.add(match[1])
      }
      const hrefSingleRegex = /href\s*=\s*'([^']+)'/g
      while ((match = hrefSingleRegex.exec(line)) !== null) {
        urls.add(match[1])
      }
      const hrefJsxRegex = /href\s*=\s*\{\s*["']([^"']+)["']\s*\}/g
      while ((match = hrefJsxRegex.exec(line)) !== null) {
        urls.add(match[1])
      }
      // url: '...' or url: "..."
      const urlPropRegex = /url:\s*['"]([^'"]+)['"]/g
      while ((match = urlPropRegex.exec(line)) !== null) {
        urls.add(match[1])
      }
      // route: '...' or route: "..."
      const routePropRegex = /route:\s*['"]([^'"]+)['"]/g
      while ((match = routePropRegex.exec(line)) !== null) {
        urls.add(match[1])
      }
    }

    for (const rawUrl of urls) {
      results.push({ url: rawUrl, line: lineNum })
    }
  }

  return results
}

function normalizeForRedirectMatch(rawUrl) {
  let urlPath = rawUrl
  // Strip https://signoz.io prefix
  const sigNozPrefix = 'https://signoz.io'
  if (urlPath.startsWith(sigNozPrefix)) {
    urlPath = urlPath.slice(sigNozPrefix.length)
  }
  // Must start with /
  if (!urlPath.startsWith('/')) return null
  // Strip anchor and query
  urlPath = urlPath.split('#')[0].split('?')[0]
  if (!urlPath) return null
  return urlPath
}

function checkUrl(rawUrl, redirectMap) {
  const issues = []
  const normalized = normalizeForRedirectMatch(rawUrl)
  if (!normalized) return issues

  // Stale check: does the normalized path match a redirect source?
  const withSlash = normalizeTrailingSlash(normalized)
  const withoutSlash = withSlash.endsWith('/') ? withSlash.slice(0, -1) : withSlash
  const finalDest = redirectMap.get(withSlash) || redirectMap.get(withoutSlash)
  if (finalDest) {
    issues.push({
      type: 'stale',
      message: `Stale URL (redirects to ${finalDest})`,
      suggestion: finalDest,
    })
  }

  // Trailing slash check
  if (!isExemptFromTrailingSlash(normalized)) {
    if (!normalized.endsWith('/')) {
      issues.push({
        type: 'trailing-slash',
        message: 'Missing trailing slash',
        suggestion: `${normalized}/`,
      })
    }
  }

  return issues
}

function isExemptFromTrailingSlash(urlPath) {
  if (urlPath === '/') return true
  // Anchor-only (shouldn't reach here after normalization, but guard)
  if (urlPath.startsWith('#')) return true
  // File paths (has extension)
  if (/\.\w{2,5}$/.test(urlPath)) return true
  return false
}

function getStagedFiles() {
  const output = execSync('git diff --cached --name-only --diff-filter=ACM', { encoding: 'utf8' })
  return output
    .trim()
    .split('\n')
    .filter((f) => f && isRelevantFile(f))
}

function isRelevantFile(filePath) {
  if (/\.test\.(tsx?|jsx?|js)$/.test(filePath)) return false
  if (/__tests__\//.test(filePath)) return false
  const codePattern = /^(components|app|constants|hooks|utils)\/.+\.(tsx?|jsx?|js)$/
  const mdxPattern = /^data\/.+\.mdx$/
  return codePattern.test(filePath) || mdxPattern.test(filePath)
}

function getAllFiles() {
  const dirs = ['components', 'app', 'constants', 'hooks', 'utils']
  const codeExts = ['.tsx', '.ts', '.jsx', '.js']
  const files = []

  function walkDir(dir) {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '__tests__')
          continue
        walkDir(full)
      } else if (
        codeExts.some((ext) => entry.name.endsWith(ext)) &&
        !entry.name.match(/\.test\./)
      ) {
        files.push(full)
      }
    }
  }

  function walkMdx(dir) {
    if (!fs.existsSync(dir)) return
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) {
        walkMdx(full)
      } else if (entry.name.endsWith('.mdx')) {
        files.push(full)
      }
    }
  }

  for (const dir of dirs) walkDir(dir)
  walkMdx('data')

  return files
}

function main() {
  const args = process.argv.slice(2)
  const staged = args.includes('--staged')

  const redirects = readRedirects({ staged })
  const redirectMap = buildRedirectMap(redirects)

  if (redirectMap.size === 0) {
    console.log('No redirects found in next.config.js')
    return
  }

  const files = staged ? getStagedFiles() : getAllFiles()

  if (files.length === 0) {
    console.log('No relevant files to check.')
    return
  }

  const allIssues = []

  for (const filePath of files) {
    let content
    try {
      if (staged) {
        content = execSync(`git show ":${filePath}"`, { encoding: 'utf8' })
      } else {
        content = fs.readFileSync(filePath, 'utf8')
      }
    } catch {
      continue
    }

    const urls = extractUrls(content, filePath)
    const fileIssues = []

    for (const { url, line } of urls) {
      const issues = checkUrl(url, redirectMap)
      for (const issue of issues) {
        fileIssues.push({ line, url, ...issue })
      }
    }

    if (fileIssues.length > 0) {
      allIssues.push({ file: filePath, issues: fileIssues })
    }
  }

  if (allIssues.length === 0) {
    console.log('Stale URL check passed. No stale or redirect-source URLs found.')
    return
  }

  console.error('Stale URL check failed:')
  let totalIssues = 0
  for (const { file, issues } of allIssues) {
    console.error(`\n  ${file}:`)
    for (const issue of issues) {
      totalIssues++
      if (issue.type === 'stale') {
        console.error(`    line ${issue.line}: ${issue.url} -> use ${issue.suggestion}`)
      } else {
        console.error(
          `    line ${issue.line}: ${issue.url} -> add trailing slash: ${issue.suggestion}`
        )
      }
    }
  }
  console.error(`\n${totalIssues} issue(s) found in ${allIssues.length} file(s).`)
  process.exit(1)
}

module.exports = {
  extractUrls,
  checkUrl,
  readRedirects,
  buildRedirectMap,
  normalizeForRedirectMatch,
  normalizeTrailingSlash,
  stripFencedCodeBlocks,
  isExemptFromTrailingSlash,
  main,
}

if (require.main === module) {
  main()
}
