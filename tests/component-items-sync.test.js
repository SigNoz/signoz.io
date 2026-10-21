const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')
const { readdirSync, readFileSync } = require('fs')
const { join } = require('path')

const { getListicleSectionItems } = loadTsModule('constants/listicles/utils.ts')
const { resolveListicleIncludes } = require('../constants/listicles/includes')

const isValidHref = (href) =>
  typeof href === 'string' && (href.startsWith('/') || href.startsWith('https://'))

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0

const assertNonEmptyString = (value, name) => {
  assert.ok(isNonEmptyString(value), `${name} should be a non-empty string`)
}

const assertNoDuplicateHrefs = (items, name) => {
  const hrefs = items.map((item) => item.href)
  const uniqueHrefs = new Set(hrefs)
  assert.equal(
    hrefs.length,
    uniqueHrefs.size,
    `${name} has duplicate hrefs: ${hrefs.filter((h, i) => hrefs.indexOf(h) !== i).join(', ')}`
  )
}

// ── Listicle JSON configs ───────────────────────────────────────────

const LISTICLES_DIR = join(__dirname, '..', 'constants', 'listicles')

function loadRawListicleConfigs() {
  const files = readdirSync(LISTICLES_DIR).filter((f) => f.endsWith('.json'))
  return files.map((f) => ({
    name: f.replace('.json', ''),
    config: JSON.parse(readFileSync(join(LISTICLES_DIR, f), 'utf8')),
  }))
}

// The configs as the app and the CMS see them, with `include` sections expanded.
function loadAllListicleConfigs() {
  const raw = loadRawListicleConfigs()
  const byName = Object.fromEntries(raw.map(({ name, config }) => [name, config]))
  return raw.map(({ name, config }) => ({
    name,
    config: resolveListicleIncludes(config, (included) => byName[included] ?? null),
  }))
}

function collectItems(config) {
  const items = []
  if (config.items) items.push(...config.items)
  if (config.staticSections) {
    for (const sec of config.staticSections) items.push(...sec.items)
  }
  if (config.sections) {
    for (const sec of config.sections) {
      if (sec.items) items.push(...sec.items)
      if (sec.subsections) {
        for (const sub of sec.subsections) items.push(...sub.items)
      }
    }
  }
  return items
}

function collectRenderedSectionItems(section) {
  return [
    ...section.items,
    ...(section.subsections || []).flatMap((subsection) => subsection.items),
  ]
}

function assertValidIcon(icon, name) {
  if (typeof icon === 'string') {
    assertNonEmptyString(icon, name)
    return
  }

  assert.ok(icon && typeof icon === 'object', `${name} should be a string path or badge object`)
  assertNonEmptyString(icon.badge, `${name}.badge`)
  assertNonEmptyString(icon.color, `${name}.color`)
}

function assertValidListicleItems(items, name) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    assertNonEmptyString(item.name, `${name}[${i}].name`)
    assert.ok(isValidHref(item.href), `${name}[${i}].href should start with / or https://`)
    assertValidIcon(item.icon, `${name}[${i}].icon`)

    if (item.clickName !== undefined) {
      assertNonEmptyString(item.clickName, `${name}[${i}].clickName`)
    }
  }
}

test('all listicle JSON configs parse', () => {
  const files = readdirSync(LISTICLES_DIR).filter((f) => f.endsWith('.json'))

  assert.ok(files.length > 0, 'constants/listicles should contain JSON configs')

  for (const file of files) {
    assert.doesNotThrow(
      () => JSON.parse(readFileSync(join(LISTICLES_DIR, file), 'utf8')),
      `${file} should be valid JSON`
    )
  }
})

test('all listicle JSON configs have valid top-level fields', () => {
  for (const { name, config } of loadAllListicleConfigs()) {
    assert.equal(config.id, name, `${name}.json id should match filename`)
    assert.ok(
      ['flat', 'sectioned', 'searchable'].includes(config.pattern),
      `${name}.pattern should be flat, sectioned, or searchable`
    )
    assertNonEmptyString(config.markdownTitle, `${name}.markdownTitle`)
    assertNonEmptyString(config.sectionName, `${name}.sectionName`)

    if (config.gridCols !== undefined) assertNonEmptyString(config.gridCols, `${name}.gridCols`)
    if (config.viewAllHref !== undefined) {
      assert.ok(
        isValidHref(config.viewAllHref),
        `${name}.viewAllHref should start with / or https://`
      )
    }
    if (config.viewAllText !== undefined) {
      assertNonEmptyString(config.viewAllText, `${name}.viewAllText`)
    }
    if (config.title !== undefined) assertNonEmptyString(config.title, `${name}.title`)
    if (config.description !== undefined) {
      assertNonEmptyString(config.description, `${name}.description`)
    }
    if (config.searchPlaceholder !== undefined) {
      assertNonEmptyString(config.searchPlaceholder, `${name}.searchPlaceholder`)
    }
    if (config.wrapperTitle !== undefined) {
      assertNonEmptyString(config.wrapperTitle, `${name}.wrapperTitle`)
    }

    if (config.pattern === 'sectioned') {
      assert.ok(Array.isArray(config.sections), `${name}.sections should be an array`)
      assert.ok(config.sections.length > 0, `${name}.sections should not be empty`)

      for (let i = 0; i < config.sections.length; i++) {
        const section = config.sections[i]
        assertNonEmptyString(section.id, `${name}.sections[${i}].id`)
        assertNonEmptyString(section.label, `${name}.sections[${i}].label`)
        assertNonEmptyString(section.title, `${name}.sections[${i}].title`)
        assertNonEmptyString(section.sectionName, `${name}.sections[${i}].sectionName`)
        if (section.gridCols !== undefined) {
          assertNonEmptyString(section.gridCols, `${name}.sections[${i}].gridCols`)
        }
        assert.ok(
          Array.isArray(section.items) || Array.isArray(section.subsections),
          `${name}.sections[${i}] should have items or subsections`
        )
        if (section.items) assertValidListicleItems(section.items, `${name}.sections[${i}].items`)
        if (section.subsections) {
          assert.ok(
            section.subsections.length > 0,
            `${name}.sections[${i}].subsections should not be empty`
          )
          for (let j = 0; j < section.subsections.length; j++) {
            const subsection = section.subsections[j]
            assertNonEmptyString(subsection.id, `${name}.sections[${i}].subsections[${j}].id`)
            assertNonEmptyString(subsection.title, `${name}.sections[${i}].subsections[${j}].title`)
            assertNonEmptyString(
              subsection.sectionName,
              `${name}.sections[${i}].subsections[${j}].sectionName`
            )
            if (subsection.gridCols !== undefined) {
              assertNonEmptyString(
                subsection.gridCols,
                `${name}.sections[${i}].subsections[${j}].gridCols`
              )
            }
            assert.ok(
              Array.isArray(subsection.items),
              `${name}.sections[${i}].subsections[${j}].items should be an array`
            )
            assert.ok(
              subsection.items.length > 0,
              `${name}.sections[${i}].subsections[${j}].items should not be empty`
            )
            assertValidListicleItems(
              subsection.items,
              `${name}.sections[${i}].subsections[${j}].items`
            )
          }
        }
      }
      continue
    }

    if (config.staticSections) {
      assert.ok(
        config.pattern === 'flat',
        `${name}.staticSections should only be used with flat listicles`
      )
      assert.ok(Array.isArray(config.staticSections), `${name}.staticSections should be an array`)
      assert.ok(config.staticSections.length > 0, `${name}.staticSections should not be empty`)

      for (let i = 0; i < config.staticSections.length; i++) {
        const section = config.staticSections[i]
        assertNonEmptyString(section.title, `${name}.staticSections[${i}].title`)
        assertNonEmptyString(section.sectionName, `${name}.staticSections[${i}].sectionName`)
        if (section.gridCols !== undefined) {
          assertNonEmptyString(section.gridCols, `${name}.staticSections[${i}].gridCols`)
        }
        assert.ok(
          Array.isArray(section.items),
          `${name}.staticSections[${i}].items should be an array`
        )
        assert.ok(
          section.items.length > 0,
          `${name}.staticSections[${i}].items should not be empty`
        )
        assertValidListicleItems(section.items, `${name}.staticSections[${i}].items`)
      }
      continue
    }

    assert.ok(Array.isArray(config.items), `${name}.items should be an array`)
    assert.ok(config.items.length > 0, `${name}.items should not be empty`)
    assertValidListicleItems(config.items, `${name}.items`)
  }
})

test('all listicle JSON configs have non-empty items', () => {
  for (const { name, config } of loadAllListicleConfigs()) {
    const items = collectItems(config)
    assert.ok(items.length > 0, `${name}.json should have at least one item`)
  }
})

test('all listicle items have valid name, href, and icon', () => {
  for (const { name, config } of loadAllListicleConfigs()) {
    assertValidListicleItems(collectItems(config), name)
  }
})

test('no duplicate hrefs within each listicle section', () => {
  for (const { name, config } of loadAllListicleConfigs()) {
    for (const section of getListicleSectionItems(config)) {
      assertNoDuplicateHrefs(
        collectRenderedSectionItems(section),
        `${name}.sections[${section.id}]`
      )
    }
  }
})

test('listicle includes resolve to known listicles and sections', () => {
  const raw = loadRawListicleConfigs()
  const byName = Object.fromEntries(raw.map(({ name, config }) => [name, config]))
  for (const { name, config } of raw) {
    assert.doesNotThrow(
      () => resolveListicleIncludes(config, (included) => byName[included] ?? null),
      `${name}.json includes should resolve`
    )
  }
})

test('resolveListicleIncludes merges included cards without duplicates, sorted by name', () => {
  const configs = {
    source: {
      pattern: 'sectioned',
      sections: [
        { id: 'one', items: [{ name: 'Beta', href: '/docs/beta/' }] },
        { id: 'two', items: [{ name: 'Gamma', href: '/docs/gamma' }] },
      ],
    },
  }
  const getConfig = (name) => configs[name] ?? null
  const config = {
    pattern: 'sectioned',
    sections: [
      {
        id: 'all',
        include: ['source'],
        items: [
          { name: 'Alpha', href: '/docs/alpha' },
          { name: 'Beta', href: '/docs/beta' },
        ],
      },
      { id: 'part', include: ['source#two'] },
      { id: 'plain', items: [{ name: 'Delta', href: '/docs/delta' }] },
    ],
  }

  const resolved = resolveListicleIncludes(config, getConfig)
  assert.deepEqual(
    resolved.sections[0].items.map((item) => item.name),
    ['Alpha', 'Beta', 'Gamma']
  )
  assert.deepEqual(
    resolved.sections[1].items.map((item) => item.name),
    ['Gamma']
  )
  assert.equal(resolved.sections[2], config.sections[2])
  assert.ok(resolved.sections.every((section) => !('include' in section)))

  assert.throws(
    () => resolveListicleIncludes({ sections: [{ id: 'x', include: ['missing'] }] }, getConfig),
    /no listicle named "missing"/
  )
  assert.throws(
    () => resolveListicleIncludes({ sections: [{ id: 'x', include: ['source#nope'] }] }, getConfig),
    /has no section "nope"/
  )
})

test('resolveListicleIncludes applies href filters, exclude, nameSuffix, and claim order', () => {
  const configs = {
    source: {
      pattern: 'sectioned',
      sections: [
        {
          id: 'all',
          items: [
            { name: 'Hub', href: '/docs/cloud/hub' },
            { name: 'Child', href: '/docs/cloud/hub/child' },
            { name: 'Other', href: '/docs/other' },
          ],
        },
      ],
    },
  }
  const getConfig = (name) => configs[name] ?? null
  const config = {
    pattern: 'sectioned',
    uniqueAcrossSections: true,
    sections: [
      { id: 'broad', include: ['source'] },
      {
        id: 'cloud',
        claimOrder: -1,
        include: [{ from: 'source@/docs/cloud', nameSuffix: ' (Manual)' }],
        exclude: ['/docs/cloud/hub/*'],
      },
    ],
  }

  const resolved = resolveListicleIncludes(config, getConfig)
  assert.deepEqual(
    resolved.sections.map((section) => section.items.map((item) => item.name)),
    [['Child', 'Other'], ['Hub (Manual)']]
  )
  assert.ok(!('uniqueAcrossSections' in resolved))
  assert.ok(
    resolved.sections.every((section) => !('claimOrder' in section) && !('exclude' in section))
  )
})

test('integrations catalog keeps each card in one tab and each name once per tab', () => {
  const integrations = loadAllListicleConfigs().find(({ name }) => name === 'integrations').config
  const seenHrefs = new Map()
  for (const section of integrations.sections) {
    const names = section.items.map((item) => item.name)
    assert.equal(
      new Set(names).size,
      names.length,
      `integrations.sections[${section.id}] repeats a card name`
    )
    for (const item of section.items) {
      const href = item.href.replace(/\/+$/, '')
      assert.ok(!seenHrefs.has(href), `${href} is in both ${seenHrefs.get(href)} and ${section.id}`)
      seenHrefs.set(href, section.id)
    }
  }
})
