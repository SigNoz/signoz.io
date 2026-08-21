import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from '@/app/(site)/seo'
import { buildListingMetadata } from '@/app/(site)/(opentelemetry-hub-routes)/metadata'

const expectedDescription =
  'SigNoz builds SigNoz Cloud, a managed OpenTelemetry-native observability platform, and Self-Hosted SigNoz, its open-source self-managed option.'

describe('shared metadata descriptions', () => {
  it('keeps the site title and updates only the shared fallback description', () => {
    expect(siteMetadata.title).toBe('SigNoz')
    expect(siteMetadata.description).toBe(expectedDescription)
  })

  it.each([
    ['Tags', 'Things I blog about'],
    ['observability', 'All posts tagged observability'],
  ])(
    'keeps standard, Open Graph, and Twitter descriptions aligned for %s',
    (title, description) => {
      const metadata = genPageMetadata({ title, description })

      expect(metadata.title).toBe(title)
      expect(metadata.description).toBe(description)
      expect(metadata.openGraph?.description).toBe(description)
      expect(metadata.twitter?.description).toBe(description)
      expect(metadata.openGraph?.siteName).toBe('SigNoz')
    }
  )

  it('uses the shared fallback when a page description is not set', () => {
    const metadata = genPageMetadata({ title: 'Tags' })

    expect(metadata.description).toBe(expectedDescription)
    expect(metadata.openGraph?.description).toBe(expectedDescription)
    expect(metadata.twitter?.description).toBe(expectedDescription)
  })

  it.each([
    ['Guides', undefined],
    ['Blog', undefined],
    ['Comparisons', undefined],
    ['OpenTelemetry', '2'],
    ['Guides', '2'],
    ['Comparisons', '2'],
    ['Blog', '2'],
  ])('keeps listing metadata descriptions aligned for %s page %s', (section, page) => {
    const metadata = buildListingMetadata(section, page)

    expect(metadata.description).toBe(metadata.openGraph?.description)
    expect(metadata.description).toBe(metadata.twitter?.description)
    expect(metadata.description).toContain(expectedDescription)
    expect(metadata.openGraph?.siteName).toBe('SigNoz')
  })

  it('uses the shared fallback description in error metadata and explains entities in llms.txt', () => {
    const globalErrorSource = readFileSync(resolve(process.cwd(), 'app/global-error.tsx'), 'utf8')
    const llmsSource = readFileSync(resolve(process.cwd(), 'app/(site)/llms.txt/route.ts'), 'utf8')

    expect(globalErrorSource.match(/content=\{siteMetadata\.description\}/g)).toHaveLength(3)
    expect(llmsSource).toContain(
      'SigNoz Cloud brings your traces, metrics, and logs into one OpenTelemetry-native platform. Simple usage-based pricing, and the freedom to run on your infrastructure with Self-Hosted SigNoz.'
    )
  })
})
