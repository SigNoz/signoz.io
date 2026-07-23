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
import Image from 'next/image'
import {
  HEADER_BUTTONS, FEATURE_SHOWCASE, PANEL_DATA, PANEL_IMAGE, CTA_BUTTONS,
} from './FeatureNamePage.constants'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import FeatureShowcase from '@/shared/components/molecules/FeaturePages/FeatureShowcase'
import SplitSection from '@/shared/components/molecules/FeaturePages/SplitSection'
import CTABanner from '@/shared/components/molecules/FeaturePages/CTABanner'

// Section components use shared components + spread constants
const Header: React.FC = () => (
  <FeaturePageHeader title={...} description={...} buttons={HEADER_BUTTONS} heroImage="..." />
)

const FeatureSection1: React.FC = () => (
  <FeatureShowcase {...FEATURE_SHOWCASE} />
)

const FeatureSection2: React.FC = () => (
  <SplitSection
    className="py-10"
    left={PANEL_DATA}
    right={<div className="h-full w-full px-6"><Image src={PANEL_IMAGE.src} ... /></div>}
  />
)

const Banner: React.FC = () => (
  <CTABanner title={<>CTA Headline</>} buttons={CTA_BUTTONS} />
)

// Main page — composes sections with <Divider /> between them
const FeatureNamePage: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />
      <SectionLayout variant="bordered" className="!px-0">
        <Divider />
        <FeatureSection1 />
        <Divider />
        <FeatureSection2 />
        <Divider />
        <Banner />
      </SectionLayout>
      <UsageBasedPricing show={['logs', 'traces', 'metrics']} />
      <SigNozStats />
      <CustomerStoriesSection tracking={{ clickName: '...', clickLocation: '...' }} />
    </FeaturePageLayout>
  )
}

export default FeatureNamePage
```

**Key rules:**
- Marked `'use client'` — required for interactivity and hooks
- Section components are defined as `React.FC` in the same file (co-located)
- Content data is spread from constants: `<FeatureShowcase {...SHOWCASE_DATA} />`
- `<Divider />` is placed between sections in the main composition — content components do NOT render their own dividers
- `SectionLayout variant="bordered" className="!px-0"` wraps all feature sections

## File 3: `<FeatureName>Page.constants.tsx`

```tsx
import { IconName1, IconName2, IconName3 } from 'lucide-react'

const BUTTON_CLASS_NAME = 'flex items-center justify-center gap-1 h-full w-full'

// Button arrays for header and CTA sections
export const HEADER_BUTTONS = [
  {
    text: 'Start your free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: { clickType: 'Primary CTA', clickName: '...', clickLocation: '...', clickText: '...' },
  },
  {
    text: 'Read Documentation',
    href: '/docs/feature/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: { clickType: 'Secondary CTA', clickName: '...', clickLocation: '...', clickText: '...' },
  },
]

// FeatureShowcase data — spread into component as props
export const FEATURE_SHOWCASE = {
  title: 'Section Title',
  description: 'Section description.',
  image: '/img/feature/screenshot.png',
  imageAlt: 'Screenshot alt text',
  button: {
    text: 'Read Documentation',
    href: '/docs/feature/',
    tracking: { clickType: 'Secondary CTA', clickName: '...', clickLocation: '...', clickText: '...' },
  },
}

// SplitSection panel data
export const LEFT_PANEL = {
  title: 'Panel Title',
  description: 'Panel description.',
  image: '/img/feature/panel.png',
  imageAlt: 'Panel screenshot',
  button: { text: 'Read Documentation', href: '/docs/feature/' },
}

// Separate image reference (when using custom ReactNode for the other panel)
export const PANEL_IMAGE = {
  src: '/img/feature/image.png',
  alt: 'Image alt text',
}

// Card arrays for HeroCards grids
export const FEATURE_CARDS = [
  {
    icon: <IconName1 />,
    title: 'Card Title',
    description: 'Card description text.',
  },
  // ... more cards
]

// Carousel data
export const CAROUSEL_DATA = [
  {
    id: 0,
    title: 'Step title',
    description: 'Step description',
    image: '/img/feature/step-1.png',
    isActive: true,
  },
  // ... more items
]

// CTA button arrays
export const CTA_BUTTONS = [
  {
    text: 'Start your free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: { ... },
  },
  {
    text: 'Read Documentation',
    href: '/docs/feature/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: { ... },
  },
]
```

**Key rules:**
- Named exports (not default) — allows selective importing
- `BUTTON_CLASS_NAME` constant at file top — Tailwind replacement for the old `flex-center` CSS class
- FeatureShowcase data objects are spread as props: `<FeatureShowcase {...SHOWCASE} />`
- SplitSection panel configs have `title`, `description`, optional `image`/`button`/`imageClassName`
- Image references as `{ src, alt }` objects for cases where images are rendered as custom ReactNode
- Icons imported from `lucide-react` and rendered as JSX in card data
- Image paths are absolute from `public/` root
- SCREAMING_SNAKE_CASE for all constant names

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
