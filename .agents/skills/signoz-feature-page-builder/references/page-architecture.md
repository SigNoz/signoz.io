# Feature Page Architecture

## File Structure

Every feature page lives in `app/<feature-name>/` and consists of 3 files:

```
app/<feature-name>/
  ├── page.tsx                          # Server component — metadata + render
  ├── <FeatureName>Page.tsx             # Client component — 'use client', full page
  └── <FeatureName>Page.constants.tsx   # Data: cards, buttons, carousel items
```

**Naming conventions:**
- Directory: kebab-case (`trace-funnels`, `alerts-management`, `external-apis`)
- Page component: PascalCase matching the feature (`TraceFunnelsPage.tsx`, `AlertsPage.tsx`)
- Constants: Same name + `.constants.tsx` suffix

## File 1: `page.tsx` (Server Component)

```tsx
import type { Metadata } from 'next'
import FeatureNamePage from './FeatureNamePage'

export const metadata: Metadata = {
  title: 'Feature Title - SigNoz',
  description: 'Concise description of the feature for SEO (under 160 chars).',
  openGraph: {
    title: 'Feature Title - SigNoz',
    description: 'Concise description of the feature for SEO.',
    url: 'https://signoz.io/<feature-name>/',
    siteName: 'SigNoz',
    images: [
      {
        url: 'https://signoz.io/img/<feature-name>/<FeatureName>Meta.webp',
        width: 1200,
        height: 630,
        alt: 'Feature Title',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Feature Title - SigNoz',
    description: 'Concise description of the feature for SEO.',
    images: ['https://signoz.io/img/<feature-name>/<FeatureName>Meta.webp'],
  },
}

export default function Page() {
  return <FeatureNamePage />
}
```

**Key rules:**
- `page.tsx` is a **server component** — no `'use client'` directive
- Exports `metadata` using Next.js Metadata API — no `generateMetadata` needed for static pages
- OpenGraph image should be 1200x630 and placed in `public/img/<feature-name>/`
- Description under 160 characters for SEO
- URL must include trailing slash

## File 2: `<FeatureName>Page.tsx` (Client Component)

```tsx
'use client'

import React from 'react'
// ... imports

// Section components (defined in same file or extracted if large)
const Header: React.FC = () => { /* ... */ }
const FeatureSection1: React.FC = () => { /* ... */ }
const FeatureSection2: React.FC = () => { /* ... */ }
const CTABanner: React.FC = () => { /* ... */ }

// Main page component
const FeatureNamePage: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />
      <SectionLayout variant="bordered" className="!px-0">
        <FeatureSection1 />
        <FeatureSection2 />
        <CTABanner />
      </SectionLayout>
      <UsageBasedPricing show={['logs', 'traces', 'metrics']} />
      <SigNozStats />
      <CustomerStoriesSection tracking={{ /* ... */ }} />
    </FeaturePageLayout>
  )
}

export default FeatureNamePage
```

**Key rules:**
- Marked `'use client'` — required for interactivity and hooks
- Section components are defined as `React.FC` in the same file (co-located)
- Sections are only extracted to separate files if they become very large (50+ lines)
- Main component composes sections in the standard flow
- `SectionLayout variant="bordered" className="!px-0"` wraps all feature sections

## File 3: `<FeatureName>Page.constants.tsx`

```tsx
import { IconName1, IconName2, IconName3 } from 'lucide-react'

export const FEATURE_CARDS = [
  {
    icon: <IconName1 />,
    title: 'Card Title',
    description: 'Card description text.',
  },
  // ... more cards
]

export const CAROUSEL_DATA = [
  {
    id: 0,
    title: 'Step title',
    description: 'Step description',
    image: '/img/<feature-name>/step-1.png',
    isActive: true,
  },
  // ... more items
]
```

**Key rules:**
- Named exports (not default) — allows selective importing
- Icons imported from `lucide-react` and rendered as JSX in the data
- Image paths are absolute from `public/` root
- Card/carousel data follows the type structure expected by shared components

## Image Directory

```
public/img/<feature-name>/
  ├── <FeatureName>Meta.webp         # OG image (1200x630)
  ├── <feature-name>-hero.webp       # Hero image (exported 4x PNG → WebP)
  ├── feature-<name>.webp            # Feature screenshots (2x PNG → WebP)
  ├── step-<n>-<name>.webp           # Carousel steps (2x PNG → WebP)
  └── icon-<name>.svg                # Icons (SVG preferred)
```

- Use `.webp` for all raster images (hero, screenshots, OG) — better compression, universal browser support
- Hero/header images are exported from Figma at **4x scale** as PNG, then converted to WebP for maximum retina clarity
- Feature screenshots and carousel steps are exported at **2x scale** as PNG, then converted to WebP
- Use `.svg` for icons and simple illustrations
- Name images descriptively: `feature-logs-explorer.webp`, not `image1.webp`
- Conversion command (macOS): `sips -s format webp input.png --out output.webp`
