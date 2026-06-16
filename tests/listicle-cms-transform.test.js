const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { transformCmsListicle } = loadTsModule('utils/listicleCms.ts')

test('transformCmsListicle maps flat listicles', () => {
  const config = transformCmsListicle({
    key: 'apm-quick-start',
    pattern: 'flat',
    markdown_title: 'APM Quick Start',
    section_name: 'APM',
    grid_cols: 'grid-cols-2',
    view_all_href: '/docs/apm',
    view_all_text: 'View all APM docs',
    items: [
      {
        name: 'Python',
        href: '/docs/python',
        click_name: 'Python Link',
        icon_path: 'https://cdn.example.com/img/icons/listicle/si-python.svg',
      },
    ],
  })

  assert.deepEqual(config, {
    id: 'apm-quick-start',
    pattern: 'flat',
    markdownTitle: 'APM Quick Start',
    sectionName: 'APM',
    gridCols: 'grid-cols-2',
    viewAllHref: '/docs/apm',
    viewAllText: 'View all APM docs',
    items: [
      {
        name: 'Python',
        href: '/docs/python',
        clickName: 'Python Link',
        icon: 'https://cdn.example.com/img/icons/listicle/si-python.svg',
      },
    ],
  })
})

test('transformCmsListicle maps sectioned listicles with subsections and badge icons', () => {
  const config = transformCmsListicle({
    key: 'metrics-quick-start',
    pattern: 'sectioned',
    markdown_title: 'Metrics Quick Start',
    section_name: 'Metrics',
    sections: [
      {
        section_id: 'databases',
        label: 'Databases',
        title: 'Databases',
        section_name: 'Database Metrics',
        grid_cols: 'grid-cols-3',
        subsections: [
          {
            section_id: 'sql',
            title: 'SQL',
            section_name: 'SQL Metrics',
            items: [
              {
                name: 'PostgreSQL',
                href: '/docs/postgres',
                icon_badge: 'PG',
                icon_color: '#336791',
              },
            ],
          },
        ],
      },
    ],
  })

  assert.deepEqual(config.sections, [
    {
      id: 'databases',
      label: 'Databases',
      title: 'Databases',
      sectionName: 'Database Metrics',
      gridCols: 'grid-cols-3',
      subsections: [
        {
          id: 'sql',
          title: 'SQL',
          sectionName: 'SQL Metrics',
          items: [
            {
              name: 'PostgreSQL',
              href: '/docs/postgres',
              icon: {
                badge: 'PG',
                color: '#336791',
              },
            },
          ],
        },
      ],
    },
  ])
})

test('transformCmsListicle maps searchable and static-section fields', () => {
  const config = transformCmsListicle({
    key: 'java-instrumentation',
    pattern: 'searchable',
    markdown_title: 'Java Instrumentation',
    section_name: 'Java',
    search_placeholder: 'Search Java integrations',
    wrapper_title: 'Choose your framework',
    static_sections: [
      {
        title: 'Frameworks',
        section_name: 'Frameworks',
        items: [
          {
            name: 'Spring Boot',
            href: '/docs/spring',
            icon_path: '/img/icons/listicle/si-springboot.svg',
          },
        ],
      },
    ],
  })

  assert.equal(config.searchPlaceholder, 'Search Java integrations')
  assert.equal(config.wrapperTitle, 'Choose your framework')
  assert.deepEqual(config.staticSections, [
    {
      title: 'Frameworks',
      sectionName: 'Frameworks',
      items: [
        {
          name: 'Spring Boot',
          href: '/docs/spring',
          icon: '/img/icons/listicle/si-springboot.svg',
        },
      ],
    },
  ])
})
