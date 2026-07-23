# Shared Feature Page Components

All components are in `shared/components/molecules/FeaturePages/`. Import with the `@/shared/components/molecules/FeaturePages/` path alias.

## Section Content Components

These are the primary building blocks for feature page content sections. Use these instead of writing custom inline sections.

### FeatureShowcase

Full-width section with title, description, optional button, optional children, and optional image below. Replaces the old inline "title + description + image" pattern.

```tsx
import FeatureShowcase from '@/shared/components/molecules/FeaturePages/FeatureShowcase'

// Simplest: spread a constants object
<FeatureShowcase {...SET_MULTIPLE_SEVERITY_THRESHOLDS_SHOWCASE} />

// With children inserted between text and image
<FeatureShowcase {...CREATE_ALERTS_SHOWCASE} className="px-6 pb-0 pt-6" imageClassName="mb-0">
  <HeroCards cards={CARDS} layoutVariant="no-border" variant="default" cols={2} />
</FeatureShowcase>

// Image-only (no title/description) — used as a section intro above a CarouselCards
<FeatureShowcase
  {...DRILL_INTO_DOMAINS_SHOWCASE}
  className="!mx-auto !w-[80vw] px-6 pb-0 pt-6"
  contentClassName="mb-0"
/>

// With custom imageElement instead of image path
<FeatureShowcase
  {...QUERY_BUILDER_SHOWCASE}
  imageElement={
    <>
      <Image src={IMAGE.src} alt={IMAGE.alt} width={10000} height={10000} className="mb-8" />
      <HeroCards cards={CARDS} layoutVariant="no-border" variant="combined" />
    </>
  }
/>
```

**Props:**
- `title?` (ReactNode): Section heading
- `description?` (ReactNode): Section body text
- `image?` (string): Image path — rendered below children
- `imageAlt?` (string): Alt text for image
- `imageElement?` (ReactNode): Custom image element — overrides `image`/`imageAlt`
- `button?` (object): `{ text, href, tracking? }` — renders a secondary CTA button with ArrowRight icon. If `tracking` is provided, wraps in `TrackingLink`.
- `children?` (ReactNode): Custom content rendered between text/button and image
- `className?` (string): Override wrapper classes (default: `bg-signoz_ink-500 p-6`)
- `contentClassName?` (string): Override the title+description+button wrapper (default: `mb-8 max-w-4xl`)
- `imageClassName?` (string): Override image classes (default: `mb-8`)

**Render order:** title → description → button → children → imageElement/image

**When to use:** Any section that shows a title + description + screenshot. This is the most common section type.

**Constants pattern:**
```tsx
// In .constants.tsx
export const FEATURE_SHOWCASE = {
  title: 'Section Title',
  description: 'Section description text.',
  image: '/img/feature/screenshot.png',
  imageAlt: 'Descriptive alt text',
  button: {
    text: 'Read Documentation',
    href: '/docs/feature/',
    tracking: { clickType: 'Secondary CTA', clickName: '...', clickLocation: '...', clickText: '...' },
  },
}
```

### SplitSection

Side-by-side layout with two panels. Each panel can be a config object (auto-rendered with title/description/button/image) or a custom ReactNode. Replaces the old `GridLayout variant="split"` + manual column markup.

```tsx
import SplitSection from '@/shared/components/molecules/FeaturePages/SplitSection'

// Both panels as config objects, with vertical divider
<SplitSection
  className="py-16"
  left={FINE_TUNE_PANEL}
  right={MAINTENANCE_WINDOWS_PANEL}
  withVerticalDivider
/>

// Left panel as config, right panel as custom ReactNode
<SplitSection
  className="py-10"
  left={DEFINE_SEQUENCES_PANEL}
  right={
    <div className="h-full w-full px-6">
      <Image src={IMAGE.src} alt={IMAGE.alt} width={10000} height={10000} />
    </div>
  }
/>

// Spreading a panel with extra props merged
<SplitSection
  className="py-6"
  left={{ ...MANAGE_AS_CODE_PANEL, className: 'justify-center' }}
  right={<div className="h-full w-full px-6">...</div>}
/>

// Right panel with custom imageElement override
<SplitSection
  className="py-16"
  left={FILTER_PANEL}
  right={{
    ...DETECTION_PANEL,
    imageElement: <div className="flex h-full flex-col items-center justify-center pb-16">...</div>,
  }}
  withVerticalDivider
/>
```

**Props:**
- `left` (SplitSectionPanel | ReactNode): Left column content
- `right` (SplitSectionPanel | ReactNode): Right column content
- `withVerticalDivider?` (boolean, default: `false`): Show a vertical `<Divider>` between panels
- `className?` (string): Override wrapper classes (default: `bg-signoz_ink-500`)

**SplitSectionPanel config object:**
- `title` (ReactNode): Panel heading
- `description` (ReactNode): Panel body text — can be a string or JSX with multiple `<p>` tags
- `image?` (string): Image path
- `imageAlt?` (string): Alt text
- `imageElement?` (ReactNode): Custom image content — overrides `image`
- `button?` (object): `{ text, href, tracking? }` — secondary CTA button
- `className?` (string): Override the panel wrapper (e.g., `'justify-center'`)
- `contentClassName?` (string): Override the title+description wrapper
- `imageClassName?` (string): Override image classes

**How panel detection works:** If the value has `title` and `description` keys (and is not a React element), it's treated as a `SplitSectionPanel` config and auto-rendered. Otherwise it's rendered as-is.

**When to use:** Two-column text+image layouts, or two side-by-side feature explanations. Use `withVerticalDivider` when both sides have their own title+description.

**Constants pattern:**
```tsx
// In .constants.tsx
export const LEFT_PANEL = {
  title: 'Panel Title',
  description: 'Panel description.',
  image: '/img/feature/panel-left.png',
  imageAlt: 'Panel left',
  button: { text: 'Read Documentation', href: '/docs/feature/' },
}
```

### CTABanner

Centered call-to-action banner with title and button group. Replaces all inline CTA banner sections.

```tsx
import CTABanner from '@/shared/components/molecules/FeaturePages/CTABanner'

<CTABanner
  title={<>Stop alert fatigue. <br /> Start catching real issues.</>}
  buttons={STOP_ALERT_FATIGUE_BUTTONS}
/>
```

**Props:**
- `title` (ReactNode): Centered heading — use `<br />` for line breaks
- `buttons` (ButtonGroupButton[]): Array of button configs passed to `ButtonGroup`
- `className?` (string): Override wrapper classes

**Renders:** Centered flex column with `py-20` padding, `text-4xl` title, and `ButtonGroup` below.

**When to use:** Bottom-of-page CTA, or mid-page conversion banners.

**Constants pattern:**
```tsx
// In .constants.tsx — define button arrays in constants for reuse
const BUTTON_CLASS_NAME = 'flex items-center justify-center gap-1 h-full w-full'

export const CTA_BUTTONS = [
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
```

### Divider

Replaces inline `border-t-1 border-dashed border-signoz_slate-400` divs. Use between sections inside a `SectionLayout`.

```tsx
import Divider from '@/shared/components/molecules/FeaturePages/Divider'

// Default horizontal dashed divider
<Divider />

// With extra spacing (e.g., after a section with its own top margin)
<Divider className="mt-12" />

// Solid variant (used for decorative lines like VS dividers)
<Divider variant="solid" className="h-px flex-1 border-signoz_sakura-600" />

// Vertical (used inside SplitSection internally, rarely needed directly)
<Divider orientation="vertical" />
```

**Props:**
- `orientation?`: `'horizontal'` (default) | `'vertical'`
- `variant?`: `'dashed'` (default) | `'solid'`
- `className?` (string): Additional classes

**When to use:** Between every content section inside `SectionLayout variant="bordered"`. The parent page controls dividers — content components like `FeatureShowcase` and `SplitSection` do NOT render their own dividers.

**Pattern in page composition:**
```tsx
<SectionLayout variant="bordered" className="!px-0">
  <Divider />
  <FeatureSection1 />
  <Divider />
  <FeatureSection2 />
  <Divider />
  <CTABanner ... />
</SectionLayout>
```

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

Container for content sections with consistent width and border treatment. Manages side-rail borders and max-width — NOT section dividers (use `<Divider />` for those).

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
- `no-border`: Same as full-width, no border
- `border-x`: Full dashed border (all sides)

### GridLayout

Responsive grid wrapper for multi-column layouts. Rarely used directly — prefer `SplitSection` for two-column layouts.

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
- `split`: `grid-cols-1 lg:grid-cols-2` — used internally by `SplitSection`
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
  buttons={HEADER_BUTTONS}
  heroImage="/img/feature/hero.webp"
  heroImageAlt="Feature hero image"
/>
```

**Props:**
- `title` (ReactNode): Hero title — use `text-gradient` styling (applied automatically)
- `description` (ReactNode): Subtitle text
- `buttons` (array): Button config objects for `ButtonGroup`
- `buttonGroup` (ReactNode): Custom button component (alternative to `buttons`)
- `heroImage` (string | ReactNode): Path to hero image, or custom image element
- `heroImageAlt` (string): Alt text for hero image
- `buttonDescription` (string | ReactNode): Optional text below buttons
- `sectionLayoutVariant`, `sectionLayoutClassName`: Override SectionLayout defaults
- `align`: `'center'` (default) | `'left'`

### ButtonGroup

Renders an array of buttons with tracking support.

```tsx
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'

// Buttons are typically defined in .constants.tsx
const BUTTON_CLASS_NAME = 'flex items-center justify-center gap-1 h-full w-full'

const buttons = [
  {
    text: 'Start your free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
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
    className: BUTTON_CLASS_NAME,
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

Auto-adds `ArrowRight` icon if no custom icon provided. Use `BUTTON_CLASS_NAME` constant (Tailwind equivalent of `flex-center`) for button className.

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
- `variant`: `'default'` | `'combined'` — `combined` removes card borders
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
