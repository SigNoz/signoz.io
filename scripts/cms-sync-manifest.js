const MANIFEST_VERSION = 2

function createEmptyManifest() {
  return {
    version: MANIFEST_VERSION,
    content: [],
    listicles: [],
    sidenav: null,
  }
}

function normalizeContentManifestEntry(entry) {
  if (!entry || !entry.folderName || !entry.pathField) return null

  return {
    kind: entry.kind || entry.action || 'unknown',
    folderName: entry.folderName,
    pathField: entry.pathField,
    filePath: entry.filePath || entry.path || null,
    restoreData: entry.restoreData || null,
  }
}

function normalizeListicleManifestEntry(entry) {
  if (!entry || !entry.key) return null

  return {
    kind: entry.kind || entry.action || 'unknown',
    key: entry.key,
    filePath: entry.filePath || null,
    restoreData: entry.restoreData || null,
  }
}

function normalizeManifest(rawManifest) {
  const manifest = createEmptyManifest()

  if (Array.isArray(rawManifest)) {
    manifest.content = rawManifest.map(normalizeContentManifestEntry).filter(Boolean)
    return manifest
  }

  if (!rawManifest || typeof rawManifest !== 'object') {
    return manifest
  }

  const contentEntries = rawManifest.content || rawManifest.entries || []
  const listicleEntries = rawManifest.listicles || []

  manifest.version = rawManifest.version || MANIFEST_VERSION
  manifest.content = contentEntries.map(normalizeContentManifestEntry).filter(Boolean)
  manifest.listicles = listicleEntries.map(normalizeListicleManifestEntry).filter(Boolean)
  manifest.sidenav = rawManifest.sidenav || null

  return manifest
}

function contentManifestKey(entry) {
  return `${entry.folderName}:${entry.pathField}`
}

function listicleManifestKey(entry) {
  return entry.key
}

function buildManifestMap(entries, keyFn) {
  return new Map(entries.map((entry) => [keyFn(entry), entry]))
}

function hasStagingManifestState(rawManifest) {
  const manifest = normalizeManifest(rawManifest)
  return (
    manifest.content.length > 0 ||
    manifest.listicles.length > 0 ||
    Boolean(manifest.sidenav?.touched)
  )
}

function getContentReconciliationAction(entry, restoreData) {
  const kind = entry?.kind || 'unknown'

  if (kind === 'created') {
    return { action: 'delete' }
  }

  if (restoreData) {
    return { action: 'restore', restoreData }
  }

  if (kind === 'unknown') {
    return { action: 'delete' }
  }

  return {
    action: 'error',
    error: `No baseline content or restore data found for ${entry?.pathField || 'entry'}`,
  }
}

function getListicleReconciliationAction(entry, restoreData) {
  const kind = entry?.kind || 'unknown'

  if (kind === 'created') {
    return { action: 'delete' }
  }

  if (restoreData) {
    return { action: 'restore', restoreData }
  }

  if (kind === 'unknown') {
    return { action: 'delete' }
  }

  return {
    action: 'error',
    error: `No baseline content or restore data found for listicle ${entry?.key || 'entry'}`,
  }
}

module.exports = {
  MANIFEST_VERSION,
  createEmptyManifest,
  normalizeManifest,
  contentManifestKey,
  listicleManifestKey,
  buildManifestMap,
  hasStagingManifestState,
  getContentReconciliationAction,
  getListicleReconciliationAction,
}
