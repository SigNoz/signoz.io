import { describe, expect, it } from 'vitest'
import RELATED_PAGE_LINKS from '@/constants/relatedPageLinks.json'
import {
  getRelatedPageLinks,
  normalizePagePath,
  selectRelatedLinks,
  stripSiteTitleSuffix,
} from './relatedPageLinks'

describe('normalizePagePath', () => {
  it('strips origin, trailing slash, .md, query and hash, and lowercases', () => {
    expect(normalizePagePath('/blog/json-logs/')).toBe('/blog/json-logs')
    expect(normalizePagePath('/blog/json-logs.md')).toBe('/blog/json-logs')
    expect(normalizePagePath('https://signoz.io/blog/json-logs/?a=1#top')).toBe('/blog/json-logs')
    expect(normalizePagePath('/Guides/LoggerFactory/')).toBe('/guides/loggerfactory')
    expect(normalizePagePath('/')).toBe('/')
  })
})

describe('selectRelatedLinks', () => {
  it('drops empty, duplicate, and self links, keeps order, caps at 3', () => {
    expect(
      selectRelatedLinks('/blog/source', [
        '',
        'https://signoz.io/blog/source/',
        'https://signoz.io/docs/a/',
        'https://signoz.io/docs/a',
        '  ',
        'https://signoz.io/docs/b/',
        'https://signoz.io/docs/c/',
        'https://signoz.io/docs/d/',
      ])
    ).toEqual([
      'https://signoz.io/docs/a/',
      'https://signoz.io/docs/b/',
      'https://signoz.io/docs/c/',
    ])
  })

  it('treats the same path on another host as a different link', () => {
    expect(selectRelatedLinks('/blog/source', ['https://example.com/blog/source/'])).toEqual([
      'https://example.com/blog/source/',
    ])
  })
})

describe('getRelatedPageLinks', () => {
  it('resolves mapped pages from any path form', () => {
    const expected = { title: 'JSON Logs', links: RELATED_PAGE_LINKS['/blog/json-logs/'] }

    expect(getRelatedPageLinks('/blog/json-logs', 'JSON Logs')).toEqual(expected)
    expect(getRelatedPageLinks('/blog/json-logs/', 'JSON Logs')).toEqual(expected)
    expect(getRelatedPageLinks('https://signoz.io/blog/json-logs/', 'JSON Logs')).toEqual(expected)
    expect(
      getRelatedPageLinks('/guides/loggerFactory-getLogger-cannot-be-resolved-to-a-type/', 'Fix')
    ).not.toBeNull()
  })

  it('returns null for unmapped pages or a missing title', () => {
    expect(getRelatedPageLinks('/pricing', 'Pricing')).toBeNull()
    expect(getRelatedPageLinks('/blog/json-logs', '')).toBeNull()
    expect(getRelatedPageLinks('/blog/json-logs', '   ')).toBeNull()
    expect(getRelatedPageLinks('/blog/json-logs', undefined)).toBeNull()
  })

  it('resolves every mapped page to 3 absolute signoz.io links', () => {
    for (const path of Object.keys(RELATED_PAGE_LINKS)) {
      const entry = getRelatedPageLinks(path, 'Title')
      expect(entry?.links, path).toHaveLength(3)
      for (const link of entry!.links) {
        expect(link, `${path} -> ${link}`).toMatch(/^https:\/\/signoz\.io\/.+\/$/)
      }
    }
  })
})

describe('stripSiteTitleSuffix', () => {
  it('removes only the site title template suffix', () => {
    expect(stripSiteTitleSuffix('Log Management Tool | SigNoz')).toBe('Log Management Tool')
    expect(stripSiteTitleSuffix('Logs Overview | SigNoz Docs')).toBe('Logs Overview | SigNoz Docs')
    expect(stripSiteTitleSuffix('Pricing')).toBe('Pricing')
  })
})
