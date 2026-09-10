// Pure functions for asset path extraction and replacement — no I/O

function stripFencedCodeBlocks(content) {
  let out = content.replace(/^[ \t]*```[^\n]*\n[\s\S]*?^[ \t]*```/gm, '\n')
  out = out.replace(/^[ \t]*~~~[^\n]*\n[\s\S]*?^[ \t]*~~~/gm, '\n')
  return out
}

function extractAssetPaths(content, frontmatter) {
  const paths = new Set()

  const bodyForScan = stripFencedCodeBlocks(content)

  const mdImageRegex = /!\[.*?\]\((.*?)\)/g

  let match
  while ((match = mdImageRegex.exec(bodyForScan)) !== null) {
    if (match[1] && !match[1].startsWith('http') && !match[1].startsWith('https')) {
      paths.add(match[1])
    }
  }

  const componentTags = ['img', 'video', 'source', 'Image', 'Figure', 'Table', 'NextImage']
  const srcAttributes = ['src', 'lightSrc']

  componentTags.forEach((tagName) => {
    srcAttributes.forEach((attrName) => {
      const tagRegex = new RegExp(
        `<${tagName}[^>]*?\\s+${attrName}\\s*=\\s*["']([^"']+)["'][^>]*?(?:/>|>[\\s\\S]*?</${tagName}>)`,
        'gi'
      )

      let match
      while ((match = tagRegex.exec(bodyForScan)) !== null) {
        const srcValue = match[1]
        if (srcValue && !srcValue.startsWith('http') && !srcValue.startsWith('https')) {
          paths.add(srcValue)
        }
      }

      const tagRegexNoQuotes = new RegExp(
        `<${tagName}[^>]*?\\s+${attrName}\\s*=\\s*([^\\s>"']+)[^>]*?(?:/>|>[\\s\\S]*?</${tagName}>)`,
        'gi'
      )

      while ((match = tagRegexNoQuotes.exec(bodyForScan)) !== null) {
        const srcValue = match[1]
        if (srcValue && !srcValue.startsWith('http') && !srcValue.startsWith('https')) {
          paths.add(srcValue)
        }
      }
    })
  })

  function checkValue(value) {
    if (typeof value === 'string') {
      if (
        value.startsWith('/') &&
        !value.startsWith('http') &&
        !value.startsWith('https') &&
        /\.[a-zA-Z0-9]+$/.test(value)
      ) {
        paths.add(value)
      }
    } else if (Array.isArray(value)) {
      value.forEach(checkValue)
    } else if (typeof value === 'object' && value !== null) {
      Object.values(value).forEach(checkValue)
    }
  }

  checkValue(frontmatter)
  return Array.from(paths)
}

function replaceAssetPaths(content, frontmatter, assets, cdnUrl) {
  let newContent = content
  const newFrontmatter = { ...frontmatter }

  assets.forEach((assetPath) => {
    const cleanPath = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath
    const fullCdnUrl = `${cdnUrl}/${cleanPath}`
    const escapedAssetPath = assetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

    const attrPattern = new RegExp(`((?:src|lightSrc)\\s*=\\s*["'])${escapedAssetPath}(["'])`, 'g')
    newContent = newContent.replace(attrPattern, `$1${fullCdnUrl}$2`)

    const mdPattern = new RegExp(`(!\\[.*?\\]\\()${escapedAssetPath}(\\))`, 'g')
    newContent = newContent.replace(mdPattern, `$1${fullCdnUrl}$2`)

    const noQuotesPattern = new RegExp(
      `((?:src|lightSrc)\\s*=\\s*)${escapedAssetPath}([\\s>])`,
      'g'
    )
    newContent = newContent.replace(noQuotesPattern, `$1${fullCdnUrl}$2`)

    Object.keys(newFrontmatter).forEach((key) => {
      if (newFrontmatter[key] === assetPath) {
        newFrontmatter[key] = fullCdnUrl
      }
    })
  })

  return { content: newContent, frontmatter: newFrontmatter }
}

module.exports = { stripFencedCodeBlocks, extractAssetPaths, replaceAssetPaths }
