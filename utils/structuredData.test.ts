import { describe, expect, it } from 'vitest'
import { generateStructuredData, STRUCTURED_DATA_IDS } from './structuredData'

const content = {
  title: 'Example article',
  description: 'Example description',
  path: 'blog/example-article',
  content: 'Example article body',
  published_date: '2026-08-01',
  updated_date: '2026-08-02',
}

describe('structured data entity references', () => {
  it('locks the four shared entity IDs and does not define a generic software ID', () => {
    expect(STRUCTURED_DATA_IDS).toEqual({
      organization: 'https://signoz.io/#organization',
      website: 'https://signoz.io/#website',
      signozCloud: 'https://signoz.io/#signoz-cloud',
      selfHostedSignoz: 'https://signoz.io/#self-hosted-signoz',
    })
    expect(Object.values(STRUCTURED_DATA_IDS)).not.toContain('https://signoz.io/#software')
  })

  it.each(['blog', 'docs', 'guides', 'comparisons', 'opentelemetry'])(
    'uses the SigNoz organization ID for %s publisher references',
    (collectionType) => {
      const structuredData = generateStructuredData(collectionType, content)

      expect(structuredData).toMatchObject({
        publisher: {
          '@type': 'Organization',
          '@id': STRUCTURED_DATA_IDS.organization,
          name: 'SigNoz',
        },
      })
    }
  )

  it('uses the same organization ID for the default organization author', () => {
    const structuredData = generateStructuredData('docs', content)

    expect(structuredData).toMatchObject({
      author: {
        '@type': 'Organization',
        '@id': STRUCTURED_DATA_IDS.organization,
        name: 'SigNoz',
      },
    })
  })
})
