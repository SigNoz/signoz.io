const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

function parseArgs(argv) {
  const args = argv || process.argv.slice(2)
  function getArg(name) {
    const idx = args.indexOf(name)
    return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : null
  }
  return {
    baseSha: getArg('--base-sha'),
    headSha: getArg('--head-sha'),
    outputDir: getArg('--output-dir') || '.github/outputs',
  }
}

function categorizeFile(filePath, status) {
  const result = {
    contentChanged: false,
    contentDeleted: false,
    assetChanged: false,
    sidenavChanged: false,
    listicleChanged: false,
    listicleDeleted: false,
  }

  if (filePath.startsWith('data/docs-side-nav/')) {
    result.sidenavChanged = true
    return result
  }

  if (/^data\/.*\.(mdx|md)$/.test(filePath)) {
    if (status === 'D') {
      result.contentDeleted = true
    } else {
      result.contentChanged = true
    }
    return result
  }

  if (filePath.startsWith('data-assets/')) {
    if (status !== 'D') {
      result.assetChanged = true
    }
    return result
  }

  if (/^constants\/listicles\/.*\.json$/.test(filePath)) {
    if (status === 'D') {
      result.listicleDeleted = true
    } else {
      result.listicleChanged = true
    }
    return result
  }

  return result
}

function parseGitDiff(raw) {
  const contentChanged = []
  const contentDeleted = []
  const assetsChanged = []
  const listiclesChanged = []
  const listiclesDeleted = []
  let sidenavChanged = false

  const parts = raw.split('\0').filter(Boolean)
  let i = 0

  while (i < parts.length) {
    const statusRaw = parts[i++]
    const status = statusRaw.charAt(0)

    if (status === 'R' || status === 'C') {
      i++ // old path (ignored)
      const newPath = parts[i++]
      if (!newPath) break
      const cat = categorizeFile(newPath, 'A')
      if (cat.sidenavChanged) sidenavChanged = true
      if (cat.contentChanged) contentChanged.push(newPath)
      if (cat.assetChanged) assetsChanged.push(newPath)
      if (cat.listicleChanged) listiclesChanged.push(newPath)
    } else {
      const filePath = parts[i++]
      if (!filePath) break
      const cat = categorizeFile(filePath, status)
      if (cat.sidenavChanged) sidenavChanged = true
      if (cat.contentChanged) contentChanged.push(filePath)
      if (cat.contentDeleted) contentDeleted.push(filePath)
      if (cat.assetChanged) assetsChanged.push(filePath)
      if (cat.listicleChanged) listiclesChanged.push(filePath)
      if (cat.listicleDeleted) listiclesDeleted.push(filePath)
    }
  }

  return {
    contentChanged,
    contentDeleted,
    assetsChanged,
    listiclesChanged,
    listiclesDeleted,
    sidenavChanged,
  }
}

function main() {
  const { baseSha, headSha, outputDir } = parseArgs()

  if (!headSha) {
    console.error('--head-sha is required')
    process.exit(1)
  }

  let raw
  if (!baseSha) {
    raw = execSync(`git diff-tree --root -r --name-status -z ${headSha}`, { encoding: 'utf8' })
  } else {
    raw = execSync(`git diff --name-status --diff-filter=ACDMRT -z ${baseSha} ${headSha}`, {
      encoding: 'utf8',
    })
  }

  const result = parseGitDiff(raw)

  fs.mkdirSync(outputDir, { recursive: true })
  fs.writeFileSync(
    path.join(outputDir, 'content_changed_files.json'),
    JSON.stringify(result.contentChanged)
  )
  fs.writeFileSync(
    path.join(outputDir, 'content_deleted_files.json'),
    JSON.stringify(result.contentDeleted)
  )
  fs.writeFileSync(
    path.join(outputDir, 'assets_changed_files.json'),
    JSON.stringify(result.assetsChanged)
  )
  fs.writeFileSync(
    path.join(outputDir, 'listicles_changed_files.json'),
    JSON.stringify(result.listiclesChanged)
  )
  fs.writeFileSync(
    path.join(outputDir, 'listicles_deleted_files.json'),
    JSON.stringify(result.listiclesDeleted)
  )

  // Output flags
  const flags = {
    any_content_changed: result.contentChanged.length > 0,
    any_content_deleted: result.contentDeleted.length > 0,
    any_assets_changed: result.assetsChanged.length > 0,
    sidenav_changed: result.sidenavChanged,
    any_listicles_changed: result.listiclesChanged.length > 0 || result.listiclesDeleted.length > 0,
  }

  if (process.env.GITHUB_OUTPUT) {
    const lines = Object.entries(flags)
      .map(([k, v]) => `${k}=${v}`)
      .join('\n')
    fs.appendFileSync(process.env.GITHUB_OUTPUT, lines + '\n')
  }

  // Always print to stdout for visibility
  for (const [k, v] of Object.entries(flags)) {
    console.log(`${k}=${v}`)
  }

  console.log(`Content changed: ${result.contentChanged.length} file(s)`)
  console.log(`Content deleted: ${result.contentDeleted.length} file(s)`)
  console.log(`Assets changed: ${result.assetsChanged.length} file(s)`)
  console.log(`Listicles changed: ${result.listiclesChanged.length} file(s)`)
  console.log(`Listicles deleted: ${result.listiclesDeleted.length} file(s)`)
  console.log(`Sidenav changed: ${result.sidenavChanged}`)
}

if (require.main === module) {
  main()
}

module.exports = { categorizeFile, parseGitDiff }
