#!/usr/bin/env node

const { execSync, execFileSync } = require('child_process')
const fs = require('fs')
const path = require('path')

async function readRedirects() {
  const configPath = path.resolve(process.cwd(), 'next.config.js')
  try {
    delete require.cache[require.resolve(configPath)]
  } catch {}
  const configExport = require(configPath)
  const config = typeof configExport === 'function' ? await configExport() : configExport
  return config.redirects()
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
      // route: properties are handled by normalizeRoute at runtime, skip them
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

  // Trailing slash after anchor fragment (e.g., /path/#section/ — the / after fragment is wrong)
  const internalPath = stripSigNozPrefix(rawUrl)
  if (internalPath && internalPath.startsWith('/')) {
    const hashIdx = internalPath.indexOf('#')
    if (hashIdx !== -1) {
      const fragment = internalPath.slice(hashIdx + 1).split('?')[0]
      if (fragment.endsWith('/')) {
        const pathBefore = internalPath.slice(0, hashIdx)
        const cleanFragment = fragment.slice(0, -1)
        const fixedPath =
          (pathBefore.endsWith('/') ? pathBefore : pathBefore + '/') + '#' + cleanFragment
        issues.push({
          type: 'anchor-trailing-slash',
          message: 'Trailing slash after anchor fragment',
          suggestion: fixedPath,
        })
      }
    }
  }

  // Trailing slash check (on the path portion, excluding anchor/query)
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

function stripSigNozPrefix(rawUrl) {
  const sigNozPrefix = 'https://signoz.io'
  if (rawUrl.startsWith(sigNozPrefix)) return rawUrl.slice(sigNozPrefix.length)
  return rawUrl
}

function isExemptFromTrailingSlash(urlPath) {
  if (urlPath === '/') return true
  // Anchor-only (shouldn't reach here after normalization, but guard)
  if (urlPath.startsWith('#')) return true
  // File-like paths: last segment contains a dot (e.g., /img/logo.svg, /static/site.webmanifest)
  const lastSegment = urlPath.split('/').filter(Boolean).pop() || ''
  if (lastSegment.includes('.')) return true
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

function computeReplacement(rawUrl, redirectMap) {
  const normalized = normalizeForRedirectMatch(rawUrl)
  if (!normalized) return null

  const withSlash = normalizeTrailingSlash(normalized)
  const withoutSlash = withSlash.endsWith('/') ? withSlash.slice(0, -1) : withSlash
  const finalDest = redirectMap.get(withSlash) || redirectMap.get(withoutSlash)

  if (finalDest) {
    const sigNozPrefix = 'https://signoz.io'
    let pathPart = rawUrl
    let prefix = ''
    if (rawUrl.startsWith(sigNozPrefix)) {
      prefix = sigNozPrefix
      pathPart = rawUrl.slice(sigNozPrefix.length)
    }

    const hashIdx = pathPart.indexOf('#')
    const queryIdx = pathPart.indexOf('?')
    let suffix = ''
    if (hashIdx !== -1) suffix = pathPart.slice(hashIdx)
    else if (queryIdx !== -1) suffix = pathPart.slice(queryIdx)

    let dest = finalDest
    if (dest.includes('#')) {
      const [destPath, destFragment] = dest.split('#')
      dest = (destPath.endsWith('/') ? destPath : destPath + '/') + '#' + destFragment
    } else if (!dest.endsWith('/')) {
      dest += '/'
    }
    return prefix + dest + suffix
  }

  // Anchor trailing slash fix
  const internalPath = stripSigNozPrefix(rawUrl)
  if (internalPath && internalPath.startsWith('/')) {
    const hashIdx = internalPath.indexOf('#')
    if (hashIdx !== -1) {
      const fragment = internalPath.slice(hashIdx + 1).split('?')[0]
      if (fragment.endsWith('/')) {
        const pathBefore = internalPath.slice(0, hashIdx)
        const cleanFragment = fragment.slice(0, -1)
        const sigNozPrefix = 'https://signoz.io'
        const prefix = rawUrl.startsWith(sigNozPrefix) ? sigNozPrefix : ''
        return (
          prefix + (pathBefore.endsWith('/') ? pathBefore : pathBefore + '/') + '#' + cleanFragment
        )
      }
    }
  }

  // Trailing slash fix
  if (!isExemptFromTrailingSlash(normalized) && !normalized.endsWith('/')) {
    const sigNozPrefix = 'https://signoz.io'
    let urlToFix = rawUrl
    let prefix = ''
    if (urlToFix.startsWith(sigNozPrefix)) {
      prefix = sigNozPrefix
      urlToFix = urlToFix.slice(sigNozPrefix.length)
    }

    const hashIdx = urlToFix.indexOf('#')
    const queryIdx = urlToFix.indexOf('?')
    let pathPart = urlToFix
    let suffix = ''
    if (hashIdx !== -1) {
      suffix = urlToFix.slice(hashIdx)
      pathPart = urlToFix.slice(0, hashIdx)
    } else if (queryIdx !== -1) {
      suffix = urlToFix.slice(queryIdx)
      pathPart = urlToFix.slice(0, queryIdx)
    }

    if (!pathPart.endsWith('/')) {
      return prefix + pathPart + '/' + suffix
    }
  }

  return null
}

function fixFile(filePath, content, redirectMap) {
  const urls = extractUrls(content, filePath)
  if (urls.length === 0) return null

  const lineReplacements = new Map()
  for (const { url, line } of urls) {
    const replacement = computeReplacement(url, redirectMap)
    if (replacement && replacement !== url) {
      if (!lineReplacements.has(line)) lineReplacements.set(line, [])
      lineReplacements.get(line).push({ from: url, to: replacement })
    }
  }

  if (lineReplacements.size === 0) return null

  const lines = content.split('\n')
  let fixCount = 0
  for (const [lineNum, replacements] of lineReplacements) {
    let line = lines[lineNum - 1]
    const sorted = [...replacements].sort((a, b) => b.from.length - a.from.length)
    for (const { from, to } of sorted) {
      let idx = line.indexOf(from)
      while (idx !== -1) {
        const afterIdx = idx + from.length
        const charAfter = afterIdx < line.length ? line[afterIdx] : ''
        const isSubstring = charAfter && /[a-zA-Z0-9_\-]/.test(charAfter)
        if (!isSubstring) {
          line = line.slice(0, idx) + to + line.slice(afterIdx)
          fixCount++
          idx = line.indexOf(from, idx + to.length)
        } else {
          idx = line.indexOf(from, afterIdx)
        }
      }
    }
    lines[lineNum - 1] = line
  }

  return fixCount > 0 ? { content: lines.join('\n'), fixCount } : null
}

async function main() {
  const args = process.argv.slice(2)
  const staged = args.includes('--staged')
  const fix = args.includes('--fix')
  const autoStage = args.includes('--stage-fixes')

  const redirects = await readRedirects()
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

  if (fix) {
    let totalFixes = 0
    let filesFixed = 0
    const fixedFiles = []

    for (const filePath of files) {
      let content
      try {
        content = fs.readFileSync(filePath, 'utf8')
      } catch {
        continue
      }

      const result = fixFile(filePath, content, redirectMap)
      if (result) {
        fs.writeFileSync(filePath, result.content, 'utf8')
        filesFixed++
        totalFixes += result.fixCount
        fixedFiles.push(filePath)
        console.log(`  Fixed ${filePath} (${result.fixCount} replacement(s))`)
      }
    }

    if (filesFixed === 0) {
      console.log('No stale URLs to fix.')
      return
    }

    // Re-stage fixed files when called from pre-commit
    if ((staged || autoStage) && fixedFiles.length > 0) {
      execFileSync('git', ['add', ...fixedFiles])
      console.log(`\nAuto-fixed and re-staged ${totalFixes} URL(s) in ${filesFixed} file(s).`)
    } else {
      console.log(`\nFixed ${totalFixes} URL(s) in ${filesFixed} file(s).`)
    }
    return
  }

  const allIssues = []

  for (const filePath of files) {
    let content
    try {
      if (staged) {
        content = execFileSync('git', ['show', `:${filePath}`], { encoding: 'utf8' })
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
      } else if (issue.type === 'anchor-trailing-slash') {
        console.error(
          `    line ${issue.line}: ${issue.url} -> remove slash after anchor: ${issue.suggestion}`
        )
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
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
