import { describe, expect, it } from 'vitest'
import { getPageType } from './getPageType'

describe('getPageType', () => {
  it.each([
    ['/faqs', 'Product FAQ Listing Page'],
    ['/faqs/', 'Product FAQ Listing Page'],
    ['/faqs/page/2', 'Product FAQ Listing Page'],
    ['/faqs/page/2/', 'Product FAQ Listing Page'],
    ['/faqs/who-uses-signoz-in-production/', 'Product FAQ Page'],
    ['/faqs/page/', 'Product FAQ Page'],
  ])('classifies %s as %s', (pathname, expected) => {
    expect(getPageType(pathname)).toBe(expected)
  })

  it.each([
    ['/blog/page/2/', 'Blog Listing Page'],
    ['/comparisons/', 'Comparison Listing Page'],
    ['/guides/page/3/', 'Guide Listing Page'],
    ['/opentelemetry/page/2/', 'OTel Listing Page'],
    ['/comparisons/signoz-vs-datadog/', 'Comparison Page'],
  ])('keeps other resource center paths as %s → %s', (pathname, expected) => {
    expect(getPageType(pathname)).toBe(expected)
  })
})
