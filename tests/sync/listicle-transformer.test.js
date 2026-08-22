const test = require('node:test')
const assert = require('node:assert/strict')
const {
  transformListicleItem,
  transformListicleSection,
  transformListicleSubsection,
  transformListicleToStrapi,
  extractIconPaths,
} = require('../../scripts/cms-sync/listicle-transformer')

const CDN = 'https://cdn.example.com'

test('transformListicleItem', async (t) => {
  await t.test('transforms basic item', () => {
    const result = transformListicleItem({ name: 'Test', href: '/test' }, CDN)
    assert.equal(result.name, 'Test')
    assert.equal(result.href, '/test')
  })

  await t.test('converts clickName to click_name', () => {
    const result = transformListicleItem(
      { name: 'Test', href: '/test', clickName: 'click_test' },
      CDN
    )
    assert.equal(result.click_name, 'click_test')
  })

  await t.test('converts string icon to CDN URL', () => {
    const result = transformListicleItem(
      { name: 'Test', href: '/test', icon: '/icons/tool.svg' },
      CDN
    )
    assert.equal(result.icon_path, 'https://cdn.example.com/icons/tool.svg')
  })

  await t.test('handles icon without leading slash', () => {
    const result = transformListicleItem(
      { name: 'Test', href: '/test', icon: 'icons/tool.svg' },
      CDN
    )
    assert.equal(result.icon_path, 'https://cdn.example.com/icons/tool.svg')
  })

  await t.test('converts object icon to badge/color fields', () => {
    const result = transformListicleItem(
      { name: 'Test', href: '/test', icon: { badge: 'New', color: '#ff0000' } },
      CDN
    )
    assert.equal(result.icon_badge, 'New')
    assert.equal(result.icon_color, '#ff0000')
    assert.equal(result.icon_path, undefined)
  })
})

test('transformListicleSubsection', async (t) => {
  await t.test('maps camelCase to snake_case fields', () => {
    const result = transformListicleSubsection(
      { id: 'sub1', title: 'Sub', sectionName: 'sub_section', gridCols: 3, items: [] },
      CDN
    )
    assert.equal(result.section_id, 'sub1')
    assert.equal(result.section_name, 'sub_section')
    assert.equal(result.grid_cols, 3)
  })
})

test('transformListicleSection', async (t) => {
  await t.test('maps section with items and subsections', () => {
    const result = transformListicleSection(
      {
        id: 'sec1',
        label: 'Section 1',
        title: 'First Section',
        sectionName: 'first',
        gridCols: 2,
        items: [{ name: 'Item', href: '/item' }],
        subsections: [{ id: 'sub1', title: 'Sub', sectionName: 'sub1', items: [] }],
      },
      CDN
    )

    assert.equal(result.section_id, 'sec1')
    assert.equal(result.label, 'Section 1')
    assert.equal(result.grid_cols, 2)
    assert.equal(result.items.length, 1)
    assert.equal(result.subsections.length, 1)
  })
})

test('transformListicleToStrapi', async (t) => {
  await t.test('transforms full listicle config', () => {
    const input = {
      id: 'test-listicle',
      pattern: '/tools/*',
      markdownTitle: '# Tools',
      sectionName: 'tools',
      gridCols: 3,
      title: 'All Tools',
      description: 'A list of tools',
      viewAllHref: '/tools',
      viewAllText: 'View All',
      searchPlaceholder: 'Search tools...',
      wrapperTitle: 'Tools Wrapper',
      items: [{ name: 'Tool A', href: '/tool-a', icon: '/icons/a.svg' }],
      sections: [
        {
          id: 'sec1',
          label: 'Section',
          title: 'Section Title',
          sectionName: 'sec',
          items: [],
        },
      ],
      staticSections: [
        {
          title: 'Static',
          sectionName: 'static_sec',
          gridCols: 4,
          items: [{ name: 'Static Item', href: '/static' }],
        },
      ],
    }

    const result = transformListicleToStrapi(input, CDN)

    assert.equal(result.key, 'test-listicle')
    assert.equal(result.pattern, '/tools/*')
    assert.equal(result.markdown_title, '# Tools')
    assert.equal(result.section_name, 'tools')
    assert.equal(result.grid_cols, 3)
    assert.equal(result.view_all_href, '/tools')
    assert.equal(result.view_all_text, 'View All')
    assert.equal(result.search_placeholder, 'Search tools...')
    assert.equal(result.wrapper_title, 'Tools Wrapper')
    assert.equal(result.items.length, 1)
    assert.equal(result.sections.length, 1)
    assert.equal(result.static_sections.length, 1)
    assert.equal(result.static_sections[0].grid_cols, 4)
  })
})

test('extractIconPaths', async (t) => {
  await t.test('extracts icons from items', () => {
    const result = extractIconPaths({
      items: [
        { name: 'A', icon: '/icons/a.svg' },
        { name: 'B', icon: { badge: 'New' } },
        { name: 'C', icon: '/icons/c.svg' },
      ],
    })
    assert.deepEqual(result, ['/icons/a.svg', '/icons/c.svg'])
  })

  await t.test('extracts icons from sections and subsections', () => {
    const result = extractIconPaths({
      sections: [
        {
          items: [{ name: 'A', icon: '/icons/sec.svg' }],
          subsections: [{ items: [{ name: 'B', icon: '/icons/sub.svg' }] }],
        },
      ],
    })
    assert.deepEqual(result, ['/icons/sec.svg', '/icons/sub.svg'])
  })

  await t.test('extracts icons from staticSections', () => {
    const result = extractIconPaths({
      staticSections: [{ items: [{ name: 'A', icon: '/icons/static.svg' }] }],
    })
    assert.deepEqual(result, ['/icons/static.svg'])
  })

  await t.test('returns empty array for no icons', () => {
    const result = extractIconPaths({ items: [{ name: 'A' }] })
    assert.deepEqual(result, [])
  })
})
