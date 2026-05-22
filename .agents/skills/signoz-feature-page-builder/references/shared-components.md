# Shared Feature Page Components

All components are in `shared/components/molecules/FeaturePages/`. Import with the `@/shared/components/molecules/FeaturePages/` path alias.

## Layout Components

### FeaturePageLayout

Wraps the entire feature page. Provides dark background, dot pattern, and gradient overlay.

```tsx
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'

<FeaturePageLayout showProductNav={true}>
  {children}
</FeaturePageLayout>
```

**Props:**
- `showProductNav` (boolean, default: `true`): Show the product navigation bar
- `children`: Page content

**Provides:** `bg-signoz_ink-500` background, `bg-dot-pattern`, gradient blob, `ProductNav`

### SectionLayout

Container for content sections with consistent width and border treatment.

```tsx
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'

<SectionLayout variant="bordered" className="!px-0">
  {children}
</SectionLayout>
```

**Props:**
- `variant`: `'default'` | `'full-width'` | `'bordered'` | `'no-border'` | `'border-x'`
- `className` (string): Additional classes
- `withBackground` (boolean): Add `bg-signoz_ink-500`

**Variants:**
- `bordered`: Dashed side borders, 80vw width — **standard for feature sections**
- `full-width`: Same width, no border
- `no-border`: 90vw mobile / 80vw desktop, no border
- `border-x`: Full dashed border (all sides)

### GridLayout

Responsive grid wrapper for multi-column layouts.

```tsx
import GridLayout from '@/shared/components/molecules/FeaturePages/GridLayout'

<GridLayout variant="split">          {/* 2-column text+image */}
<GridLayout variant="default" cols={3}> {/* 3-column card grid */}
```

**Props:**
- `variant`: `'default'` | `'split'`
- `cols` (number, default: 3): Column count for default variant
- `className` (string): Additional classes

**Behavior:**
- `split`: `grid-cols-1 lg:grid-cols-2` — for text + image sections
- `default`: `grid-cols-1 md:grid-cols-{cols}` — for card grids
- Gap: `gap-y-8 md:gap-y-16`

## Header Components

### FeaturePageHeader

Hero section with title, description, buttons, and hero image.

```tsx
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'

<FeaturePageHeader
  title={<>Create Visual Funnels from Traces</>}
  description={<>The only tracing tool that tracks multi-step flows.</>}
  buttons={headerButtons}
  heroImage="/img/feature/hero.webp"
  heroImageAlt="Feature hero image"
/>
```

**Props:**
- `title` (ReactNode): Hero title — use `text-gradient` styling (applied automatically)
- `description` (ReactNode): Subtitle text
- `buttons` (array): Button config objects for `ButtonGroup`
- `buttonGroup` (ReactNode): Custom button component (alternative to `buttons`)
- `heroImage` (string): Path to hero image
- `heroImageAlt` (string): Alt text for hero image
- `buttonDescription` (string): Optional text below buttons
- `sectionLayoutVariant`, `sectionLayoutClassName`: Override SectionLayout defaults

### ButtonGroup

Renders an array of buttons with tracking support.

```tsx
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'

const buttons = [
  {
    text: 'Start your free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: 'flex-center',
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Feature Hero Start Trial',
      clickLocation: 'Feature Hero',
      clickText: 'Start your free trial',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/feature/',
    variant: 'secondary' as const,
    className: 'flex-center',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Feature Hero Docs',
      clickLocation: 'Feature Hero',
      clickText: 'Read Documentation',
    },
  },
]

<ButtonGroup buttons={buttons} />
```

**Props:**
- `buttons` (array): Each with `text`, `href`, `variant`, `className`, optional `tracking`, optional `icon`
- `className` (string): Additional wrapper classes

Auto-adds `ArrowRight` icon if no custom icon provided.

## Card Components

### HeroCards

Grid of feature cards with icons, titles, and descriptions.

```tsx
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'

<HeroCards
  cards={FEATURE_CARDS}
  variant="combined"
  layoutVariant="no-border"
  cols={3}
/>
```

**Props:**
- `cards` (array): Objects with `icon`, `title`, `description`
- `variant`: `'default'` | `'combined'` — `combined` merges card borders
- `layoutVariant`: Passed to inner SectionLayout
- `cols` (number): Grid columns (default: 3)
- `className` (string): Additional classes

**When to use:** 3+ feature highlights that need equal visual weight. Use 3 columns for brief cards, 2 columns for detailed cards.

### IconTitleDescriptionCard

Card with icon/label, title, and rich description. Used in detailed feature grids.

```tsx
import IconTitleDescriptionCard from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'

<IconTitleDescriptionCard
  icon={<IconComponent />}
  iconText="Category Label"
  title="Feature Title"
  description="Detailed description of the feature."
  variant="lg"
/>
```

**Props:**
- `icon` (ReactNode): Lucide icon or custom icon
- `iconText` (string): Label next to the icon
- `title` (string): Card title
- `description` (string): Card description
- `variant`: `'lg'` | `'xl'`
- `className` (string): Additional classes

**When to use:** Detailed feature explanations where each card needs more content than a `FeatureCard`.

### CarouselCards

Interactive left-panel cards with right-panel image carousel.

```tsx
import CarouselCards from '@/shared/components/molecules/FeaturePages/CarouselCards'

<CarouselCards
  cards={CAROUSEL_DATA}
  buttonLink="/docs/feature/"
  buttonText="Read Documentation"
/>
```

**Props:**
- `cards` (array): Objects with `id`, `title`, `description`, `image`, `isActive`
- `buttonLink` (string): CTA button URL
- `buttonText` (string): CTA button text

**When to use:** Step-by-step walkthroughs where each step has a corresponding product screenshot. Auto-rotates every 4 seconds.

## Social & Pricing Components

### CustomerStoriesSection

Testimonials section with featured case study and card grid.

```tsx
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'

<CustomerStoriesSection
  tracking={{
    clickName: 'Feature Customer Stories Button',
    clickLocation: 'Feature Testimonials',
  }}
/>
```

**Props:**
- `tracking` (object): `clickName` and `clickLocation` for the CTA button
- `showOverlay` (boolean): Show gradient overlay
- `showFeaturedCaseStudy` (boolean): Show featured testimonial

**Required:** Present on every feature page as the last section.

### UsageBasedPricing

Embeds the interactive pricing calculator.

```tsx
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'

<UsageBasedPricing show={['logs', 'traces', 'metrics']} />
```

**Props:**
- `show` (array): Which pricing calculators to display — `'logs'`, `'traces'`, `'metrics'`
- `sectionTitle` (string): Override default title
- `sectionDescription` (string): Override default description

**Required:** Present on every feature page. Select the signal types relevant to the feature.

### SigNozStats

Community stats section with deployment options.

```tsx
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'

<SigNozStats />
```

No props needed. **Required** on every feature page between pricing and testimonials.

## Utility Components

### TrackingLink

Wraps `next/link` with analytics tracking.

```tsx
import TrackingLink from '@/components/TrackingLink'

<TrackingLink
  href="/teams/"
  clickType="Primary CTA"
  clickName="Feature Start Trial"
  clickLocation="Feature Section"
  clickText="Start your free trial"
>
  Start your free trial
</TrackingLink>
```

Use inside `Button` components with `asChild` prop for tracked buttons outside of `ButtonGroup`.

### Button

UI button component with variants.

```tsx
import Button from '@/components/ui/Button'

<Button variant="secondary" rounded="full" className="flex w-fit items-center gap-2" asChild>
  <TrackingLink href="...">
    Read Documentation
    <ArrowRight size={14} />
  </TrackingLink>
</Button>
```

**Props:**
- `variant`: `'default'` | `'secondary'` | others
- `rounded`: `'full'` | `'default'`
- `asChild` (boolean): Render as child element (for wrapping TrackingLink)
