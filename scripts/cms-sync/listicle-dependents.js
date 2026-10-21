const fs = require('fs')
const path = require('path')
const { includedListicleNames } = require('../../constants/listicles/includes')

const LISTICLES_DIR = path.resolve(__dirname, '..', '..', 'constants', 'listicles')

function readListicle(listiclesDir, name) {
  try {
    return JSON.parse(fs.readFileSync(path.join(listiclesDir, `${name}.json`), 'utf8'))
  } catch {
    return null
  }
}

/**
 * Returns `changedFiles` plus every listicle that includes one of them, so that
 * the CMS sync and the cache revalidation also cover the listicles whose cards changed.
 */
function withDependentListicles(changedFiles, listiclesDir = LISTICLES_DIR) {
  const changed = new Set(changedFiles.map((file) => path.basename(file, '.json')))
  const files = [...changedFiles]
  for (const file of fs.readdirSync(listiclesDir).filter((f) => f.endsWith('.json'))) {
    const name = path.basename(file, '.json')
    if (changed.has(name)) continue
    const config = readListicle(listiclesDir, name)
    if (config && includedListicleNames(config).some((included) => changed.has(included))) {
      files.push(`constants/listicles/${file}`)
      changed.add(name)
    }
  }
  return files
}

module.exports = { LISTICLES_DIR, readListicle, withDependentListicles }
