const { describe, it } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const { loadTsModule } = require('./helpers/loadTsModule')

const ROOT = path.resolve(__dirname, '..')
const CASE_STUDY_DIR = path.join(ROOT, 'data', 'case-study')
const TYPES_PATH = path.join(ROOT, 'components', 'Customers', 'Customers.types.ts')

// Single vocabulary shared by MDX frontmatter, the page content constant and the frontend filter bar.
const STORY_FILTERS = [
  'All stories',
  'AI & agent workflows',
  'Logs & alerting',
  'Tracing & performance',
  'Kubernetes & infrastructure',
  'Tool consolidation',
]
const ASSIGNABLE_FILTERS = STORY_FILTERS.filter((f) => f !== 'All stories')

const PROOF_THEMES = [
  'Migration & consolidation',
  'Setup & self-hosting',
  'Agent-native observability',
  'Debugging & scale',
  'Unified observability',
]

const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/

const { CUSTOMERS_PAGE_CONTENT: pageContent } = loadTsModule(
  'app/(site)/customers/customersPageContent.ts'
)

function assertSiteAssetExistsInPublic(assetPath, context) {
  assert.ok(
    assetPath.startsWith('/'),
    `${context}: asset path "${assetPath}" must be site-relative`
  )
  const publicPath = path.join(ROOT, 'public', assetPath)
  assert.ok(fs.existsSync(publicPath), `${context}: "${assetPath}" not found under public/`)
}

describe('customers filter vocabulary', () => {
  it('matches the shared constant in Customers.types.ts', () => {
    const source = fs.readFileSync(TYPES_PATH, 'utf8')
    for (const filter of STORY_FILTERS) {
      assert.ok(source.includes(`'${filter}'`), `Customers.types.ts is missing filter "${filter}"`)
    }
  })
})

describe('app/(site)/customers/customersPageContent.ts', () => {
  it('has 3 featured videos with valid YouTube IDs', () => {
    assert.equal(pageContent.featuredVideos.length, 3)
    for (const video of pageContent.featuredVideos) {
      assert.ok(video.company, 'video missing company')
      assert.ok(video.title, 'video missing title')
      assert.match(video.videoId, YOUTUBE_ID_PATTERN, `invalid videoId "${video.videoId}"`)
    }
  })

  it('has 3 quote carousel slides with complete attribution', () => {
    assert.equal(pageContent.quoteCarousel.length, 3)
    for (const slide of pageContent.quoteCarousel) {
      assert.ok(Array.isArray(slide.segments) && slide.segments.length > 0, 'slide has no segments')
      for (const segment of slide.segments) {
        assert.equal(typeof segment.text, 'string')
      }
      for (const key of ['person', 'role', 'company', 'logo', 'href', 'sourceLabel']) {
        assert.ok(slide[key], `quote slide for "${slide.company}" missing "${key}"`)
      }
      assertSiteAssetExistsInPublic(slide.logo, `quoteCarousel ${slide.company}`)
    }
  })

  it('has 27 proof wall quotes with known themes', () => {
    assert.equal(pageContent.proofWall.quotes.length, 27)
    for (const quote of pageContent.proofWall.quotes) {
      assert.ok(quote.quote, 'proof quote missing quote text')
      assert.ok(quote.attribution, 'proof quote missing attribution')
      assert.ok(quote.href, `proof quote "${quote.attribution}" missing href`)
      assert.ok(
        Array.isArray(quote.themes) && quote.themes.length > 0,
        `proof quote "${quote.attribution}" has no themes`
      )
      for (const theme of quote.themes) {
        assert.ok(PROOF_THEMES.includes(theme), `unknown proof theme "${theme}"`)
      }
      if (quote.logo && quote.logo.imageSrc) {
        assertSiteAssetExistsInPublic(quote.logo.imageSrc, `proof quote ${quote.attribution}`)
      }
    }
  })

  it('has 63 proof wall logos resolvable to an image or component', () => {
    assert.equal(pageContent.proofWall.logos.length, 63)
    for (const logo of pageContent.proofWall.logos) {
      assert.ok(logo.name, 'proof logo missing name')
      assert.ok(
        logo.imageSrc || logo.componentKey,
        `proof logo "${logo.name}" needs imageSrc or componentKey`
      )
      if (logo.imageSrc) {
        assertSiteAssetExistsInPublic(logo.imageSrc, `proof logo ${logo.name}`)
      }
    }
  })

  it('has 3 blog story cards with valid filters and /blog hrefs', () => {
    assert.equal(pageContent.blogStoryCards.length, 3)
    for (const card of pageContent.blogStoryCards) {
      assert.equal(card.type, 'From the SigNoz blog')
      for (const key of ['company', 'title', 'description', 'person', 'role', 'logo', 'logoAlt']) {
        assert.ok(card[key], `blog story card "${card.company}" missing "${key}"`)
      }
      assert.match(card.href, /^\/blog\/[a-z0-9-]+\/$/)
      assert.match(card.publishedAt, /^\d{4}-\d{2}-\d{2}$/)
      assert.ok(Array.isArray(card.filters) && card.filters.length > 0, 'card has no filters')
      for (const filter of card.filters) {
        assert.ok(ASSIGNABLE_FILTERS.includes(filter), `unknown filter "${filter}"`)
      }
      assertSiteAssetExistsInPublic(card.logo, `blog story card ${card.company}`)
    }
  })
})

describe('data/case-study frontmatter', () => {
  const files = fs.readdirSync(CASE_STUDY_DIR).filter((f) => f.endsWith('.mdx'))

  it('has at least 14 customer stories', () => {
    assert.ok(files.length >= 14, `expected >= 14 case studies, found ${files.length}`)
  })

  for (const file of files) {
    it(`${file} has complete customer-story frontmatter`, () => {
      const { data } = matter(fs.readFileSync(path.join(CASE_STUDY_DIR, file), 'utf8'))

      for (const key of ['title', 'description', 'company', 'person', 'role', 'logo', 'logo_alt']) {
        assert.ok(data[key], `missing frontmatter key "${key}"`)
      }

      // Tags sync to the CMS as case-sensitive tag relations and drive the story filter bar.
      assert.ok(Array.isArray(data.tags) && data.tags.length > 0, 'tags must be a non-empty array')
      for (const tag of data.tags) {
        assert.ok(ASSIGNABLE_FILTERS.includes(tag), `unknown tag "${tag}"`)
      }

      // gray-matter parses unquoted dates as Date objects
      assert.ok(
        data.date instanceof Date || /^\d{4}-\d{2}-\d{2}$/.test(String(data.date)),
        'date must be a date'
      )

      // The CMS sync hard-fails when a frontmatter asset is missing from data-assets/
      const dataAssetPath = path.join(ROOT, 'data-assets', data.logo)
      assert.ok(fs.existsSync(dataAssetPath), `logo "${data.logo}" not found under data-assets/`)
      assertSiteAssetExistsInPublic(data.logo, `${file} logo`)
    })
  }
})
