// Must stay CJS: the CMS sync script (scripts/cms-sync) requires it, and the app imports it.

// A section's `include` lists other listicles whose cards the section shows:
// "<listicle>" takes every card, "<listicle>#<sectionId>" takes one section, and a
// trailing "@<href prefix>" keeps only the cards under that path. An entry can also be
// { "from": "<listicle>[#<sectionId>][@<href prefix>]", "nameSuffix": " (Manual)" } to
// tell the included cards apart from others with the same name. A section's `exclude`
// lists hrefs to drop; an entry that ends in "/*" drops every card under that path.
// With `uniqueAcrossSections: true` on the listicle, each card stays only in the
// first section that claims it. Sections claim in `claimOrder` (default: their order).

const normalizeHref = (href) => href.replace(/^https:\/\/signoz\.io/, '').replace(/\/+$/, '')

const sectionItems = (section) => [
  ...(section.items || []),
  ...(section.subsections || []).flatMap((subsection) => subsection.items || []),
]

const startsWithPath = (href, prefix) => {
  const normalized = normalizeHref(href)
  const normalizedPrefix = normalizeHref(prefix)
  return normalized === normalizedPrefix || normalized.startsWith(`${normalizedPrefix}/`)
}

const isExcluded = (href, exclude) =>
  exclude.some((entry) =>
    entry.endsWith('/*')
      ? normalizeHref(href).startsWith(`${normalizeHref(entry.slice(0, -2))}/`)
      : normalizeHref(href) === normalizeHref(entry)
  )

const entrySource = (entry) => (typeof entry === 'string' ? entry : entry.from)

function collectIncludedItems(entry, getConfig) {
  const label = entrySource(entry)
  const [source, hrefPrefix] = label.split('@')
  const items = collectSourceItems(source, label, getConfig)
  const kept = hrefPrefix ? items.filter((item) => startsWithPath(item.href, hrefPrefix)) : items
  const suffix = typeof entry === 'string' ? '' : entry.nameSuffix || ''
  return suffix ? kept.map((item) => ({ ...item, name: `${item.name}${suffix}` })) : kept
}

function collectSourceItems(source, entry, getConfig) {
  const [name, sectionId] = source.split('#')
  const config = getConfig(name)
  if (!config) {
    throw new Error(`Listicle include "${entry}": no listicle named "${name}"`)
  }
  if ((config.sections || []).some((section) => section.include)) {
    throw new Error(`Listicle include "${entry}": "${name}" has includes of its own`)
  }

  if (sectionId) {
    const section = (config.sections || []).find((candidate) => candidate.id === sectionId)
    if (!section) {
      throw new Error(`Listicle include "${entry}": "${name}" has no section "${sectionId}"`)
    }
    return sectionItems(section)
  }

  return [
    ...(config.items || []),
    ...(config.sections || []).flatMap(sectionItems),
    ...(config.staticSections || []).flatMap(sectionItems),
  ]
}

/**
 * Returns a copy of `config` in which each section with `include` holds its own
 * items plus the included cards, without duplicate hrefs, sorted by name.
 * `getConfig(name)` returns the raw config of another listicle, or null.
 */
function resolveListicleIncludes(config, getConfig) {
  const sections = config.sections || []
  if (!sections.some((section) => section.include) && !config.uniqueAcrossSections) return config

  const claimed = new Set()
  const resolved = new Map()
  const claimOrder = sections
    .map((section, index) => ({ section, index }))
    .sort((a, b) => (a.section.claimOrder ?? a.index) - (b.section.claimOrder ?? b.index))

  for (const { section, index } of claimOrder) {
    const { include = [], exclude = [], claimOrder: _claimOrder, ...rest } = section
    const seen = new Set()
    const items = []
    for (const item of [
      ...(section.items || []),
      ...include.flatMap((entry) => collectIncludedItems(entry, getConfig)),
    ]) {
      const key = normalizeHref(item.href)
      if (seen.has(key) || isExcluded(item.href, exclude)) continue
      if (config.uniqueAcrossSections && claimed.has(key)) continue
      seen.add(key)
      claimed.add(key)
      items.push({ ...item })
    }
    if (section.include) {
      items.sort((a, b) => a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }))
    }
    resolved.set(
      index,
      section.include || config.uniqueAcrossSections ? { ...rest, items } : section
    )
  }

  const { uniqueAcrossSections: _unique, ...rest } = config
  return { ...rest, sections: sections.map((_section, index) => resolved.get(index)) }
}

/** Names of the listicles that `config` includes. */
function includedListicleNames(config) {
  return [
    ...new Set(
      (config.sections || []).flatMap((section) =>
        (section.include || []).map((entry) => entrySource(entry).split('@')[0].split('#')[0])
      )
    ),
  ]
}

module.exports = { resolveListicleIncludes, includedListicleNames }
