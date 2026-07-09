const { execFileSync } = require('child_process')

function createGitReader({ baseRef = 'main' } = {}) {
  const cache = new Map()

  function getBaseRefCandidates() {
    return [`origin/${baseRef}`, baseRef, 'origin/main', 'main']
  }

  function readFileFromGitRef(filePath, gitRef) {
    try {
      return execFileSync('git', ['show', `${gitRef}:${filePath}`], {
        encoding: 'utf8',
        stdio: ['pipe', 'pipe', 'pipe'],
      })
    } catch {
      return null
    }
  }

  function readBaseFileContent(filePath) {
    const cacheKey = filePath
    if (cache.has(cacheKey)) return cache.get(cacheKey)

    const candidates = getBaseRefCandidates()
    for (const ref of candidates) {
      const content = readFileFromGitRef(filePath, ref)
      if (content !== null) {
        cache.set(cacheKey, content)
        return content
      }
    }

    cache.set(cacheKey, null)
    return null
  }

  function readBaseFileForContentEntry(entry) {
    // Try the filePath directly first
    if (entry.filePath) {
      const content = readBaseFileContent(entry.filePath)
      if (content !== null) return content
    }

    // Construct path from folderName + pathField
    if (entry.folderName && entry.pathField) {
      const constructedPath = `data/${entry.folderName}${entry.pathField}.mdx`
      const content = readBaseFileContent(constructedPath)
      if (content !== null) return content
    }

    return null
  }

  return {
    readFileFromGitRef,
    readBaseFileContent,
    readBaseFileForContentEntry,
    getBaseRefCandidates,
  }
}

module.exports = { createGitReader }
