// Pure manifest functions — no I/O

const MANIFEST_VERSION = 2

function createEmptyManifest() {
  return { version: MANIFEST_VERSION, content: [], listicles: [], sidenav: null }
}

function normalizeManifest(raw) {
  if (!raw) return createEmptyManifest()

  // v1 format: plain array of entries
  if (Array.isArray(raw)) {
    return { version: MANIFEST_VERSION, content: raw, listicles: [], sidenav: null }
  }

  // v2 format
  if (raw.version === MANIFEST_VERSION) {
    return {
      version: MANIFEST_VERSION,
      content: raw.content || [],
      listicles: raw.listicles || [],
      sidenav: raw.sidenav || null,
    }
  }

  // Unknown version — treat content array if present, else empty
  return {
    version: MANIFEST_VERSION,
    content: raw.content || [],
    listicles: raw.listicles || [],
    sidenav: raw.sidenav || null,
  }
}

const SYSTEM_FIELDS = [
  'id',
  'documentId',
  'createdAt',
  'updatedAt',
  'publishedAt',
  'locale',
  'localizations',
]

function sanitizeEntityForRestore(entity) {
  if (!entity || typeof entity !== 'object') return entity
  const cleaned = { ...entity }
  for (const field of SYSTEM_FIELDS) {
    delete cleaned[field]
  }
  return cleaned
}

function normalizeContentManifestEntry(entry) {
  return {
    folderName: entry.folderName,
    pathField: entry.pathField,
    filePath: entry.filePath,
    kind: entry.kind || 'unknown',
    restoreData: entry.restoreData || null,
  }
}

function normalizeListicleManifestEntry(entry) {
  return {
    key: entry.key,
    kind: entry.kind || 'unknown',
    restoreData: entry.restoreData || null,
  }
}

function contentManifestKey(entry) {
  return `${entry.folderName}:${entry.pathField}`
}

function listicleManifestKey(entry) {
  return entry.key
}

function buildManifestMap(entries, keyFn) {
  const map = new Map()
  for (const entry of entries) {
    map.set(keyFn(entry), entry)
  }
  return map
}

function hasStagingManifestState(manifest) {
  if (!manifest) return false
  const m = normalizeManifest(manifest)
  return m.content.length > 0 || m.listicles.length > 0 || m.sidenav !== null
}

function buildCurrentContentManifestEntry(
  op,
  existingEntry,
  { previousEntry, baseFileExists } = {}
) {
  const entry = {
    folderName: op.folderName,
    pathField: op.pathField,
    filePath: op.filePath,
    kind: 'unknown',
    restoreData: null,
  }

  if (op.type === 'delete') {
    if (previousEntry && previousEntry.kind === 'created') {
      // Created then deleted by same PR — remove from manifest entirely
      return null
    }
    entry.kind = 'deleted'
    if (existingEntry) {
      entry.restoreData = sanitizeEntityForRestore(existingEntry)
    }
  } else {
    // create_or_update
    if (existingEntry) {
      entry.kind = 'updated'
      entry.restoreData = sanitizeEntityForRestore(existingEntry)
    } else {
      entry.kind = 'created'
    }
  }

  return entry
}

function buildCurrentListicleManifestEntry(
  listicleFile,
  previousEntry,
  existingEntry,
  isDeleted,
  baseFileExists
) {
  const key =
    typeof listicleFile === 'string'
      ? listicleFile
          .split('/')
          .pop()
          .replace(/\.json$/, '')
      : listicleFile

  if (isDeleted) {
    if (previousEntry && previousEntry.kind === 'created') {
      // Created then deleted by same PR — remove from manifest entirely
      return null
    }
    return {
      key,
      kind: 'deleted',
      restoreData: existingEntry ? sanitizeEntityForRestore(existingEntry) : null,
    }
  }

  if (existingEntry) {
    return {
      key,
      kind: 'updated',
      restoreData: sanitizeEntityForRestore(existingEntry),
    }
  }

  return {
    key,
    kind: 'created',
    restoreData: null,
  }
}

function getContentReconciliationAction(entry) {
  const kind = entry.kind || 'unknown'

  if (kind === 'created') {
    return { action: 'delete' }
  }

  if (kind === 'updated' || kind === 'deleted') {
    if (entry.restoreData) {
      return { action: 'restore' }
    }
    return { action: 'error', reason: 'no restoreData for updated/deleted entry' }
  }

  // kind === 'unknown'
  if (entry.restoreData) {
    return { action: 'restore' }
  }
  return { action: 'delete' }
}

function getListicleReconciliationAction(entry) {
  const kind = entry.kind || 'unknown'

  if (kind === 'created') {
    return { action: 'delete' }
  }

  if (kind === 'updated' || kind === 'deleted') {
    if (entry.restoreData) {
      return { action: 'restore' }
    }
    return { action: 'error', reason: 'no restoreData for updated/deleted entry' }
  }

  // kind === 'unknown'
  if (entry.restoreData) {
    return { action: 'restore' }
  }
  return { action: 'delete' }
}

module.exports = {
  MANIFEST_VERSION,
  createEmptyManifest,
  normalizeManifest,
  normalizeContentManifestEntry,
  normalizeListicleManifestEntry,
  contentManifestKey,
  listicleManifestKey,
  buildManifestMap,
  hasStagingManifestState,
  sanitizeEntityForRestore,
  buildCurrentContentManifestEntry,
  buildCurrentListicleManifestEntry,
  getContentReconciliationAction,
  getListicleReconciliationAction,
}
