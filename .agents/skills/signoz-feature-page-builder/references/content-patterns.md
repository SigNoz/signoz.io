# Content and Tracking Patterns

## Section Composition Patterns

Content sections are built using four shared components: `FeatureShowcase`, `SplitSection`, `CTABanner`, and `HeroCards`. Section dividers are handled by the parent page using `<Divider />`.

### FeatureShowcase — Full-Width Feature Section

For features where the screenshot needs full width below the text.

```tsx
// In .constants.tsx
export const FEATURE_SHOWCASE = {
  title: 'Section Title',
  description: 'Description text explaining the feature in 2-3 sentences.',
  image: '/img/feature/wide-screenshot.png',
  imageAlt: 'Descriptive alt text',
  button: {
    text: 'Read Documentation',
    href: '/docs/feature/',
    tracking: { clickType: 'Secondary CTA', clickName: '...', clickLocation: '...', clickText: '...' },
  },
}

// In page component — simplest usage
const FeatureSection: React.FC = () => {
  return <FeatureShowcase {...FEATURE_SHOWCASE} />
}

// With children (e.g., HeroCards grid between text and image)
const FeatureWithCards: React.FC = () => {
  return (
    <FeatureShowcase {...SHOWCASE_DATA} className="px-6 pb-0 pt-6" imageClassName="mb-0">
      <HeroCards cards={CARDS} layoutVariant="no-border" cols={2} />
    </FeatureShowcase>
  )
}
```

**Rules:**
- Text constrained by `max-w-4xl` for readable line length
- Image sits below children at full section width
- Optional inline CTA button between text and image
- Content data lives in `.constants.tsx`, JSX composition stays in page

### SplitSection — Text + Image Side-by-Side

The most common section pattern. Text on one side, product screenshot on the other.

```tsx
// In .constants.tsx
export const LEFT_PANEL = {
  title: 'Feature Title',
  description: 'Description paragraph explaining the feature.',
  button: { text: 'Read Documentation', href: '/docs/feature/' },
}

export const RIGHT_IMAGE = {
  src: '/img/feature/screenshot.png',
  alt: 'Descriptive alt text',
}

// In page component — panel config + custom ReactNode
const FeatureSection: React.FC = () => {
  return (
    <SplitSection
      className="py-10"
      left={LEFT_PANEL}
      right={
        <div className="h-full w-full px-6">
          <Image src={RIGHT_IMAGE.src} alt={RIGHT_IMAGE.alt} width={10000} height={10000} />
        </div>
      }
    />
  )
}

// Two panel configs with vertical divider
const TwoPanelSection: React.FC = () => {
  return (
    <SplitSection
      className="py-16"
      left={FINE_TUNE_PANEL}
      right={MAINTENANCE_PANEL}
      withVerticalDivider
    />
  )
}
```

**Rules:**
- Alternate text/image sides between sections for visual rhythm
- Use `withVerticalDivider` when both sides have title+description
- Panel configs go in `.constants.tsx`; custom ReactNode children stay in JSX
- First section often uses `className="py-10"`, with the `<Divider className="mt-12" />` above it for spacing

### CTABanner — Call-to-Action Section

Centered call-to-action between feature sections.

```tsx
// In .constants.tsx
const BUTTON_CLASS_NAME = 'flex items-center justify-center gap-1 h-full w-full'

export const CTA_BUTTONS = [
  {
    text: 'Start your free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Feature Banner Start Trial',
      clickLocation: 'Feature Bottom Banner',
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
      clickName: 'Feature Banner Docs',
      clickLocation: 'Feature Bottom Banner',
      clickText: 'Read Documentation',
    },
  },
]

// In page component
const Banner: React.FC = () => {
  return (
    <CTABanner
      title={<>Compelling CTA Headline</>}
      buttons={CTA_BUTTONS}
    />
  )
}
```

**Rules:**
- Title accepts ReactNode — use `<br />` for line breaks
- Buttons defined in constants with tracking objects
- Use `BUTTON_CLASS_NAME` constant for button className (Tailwind replacement for `flex-center`)

### Card Grid Section

Feature highlights as a grid of cards.

```tsx
const FeatureHighlights: React.FC = () => {
  return (
    <HeroCards
      cards={FEATURE_CARDS}
      variant="combined"
      layoutVariant="no-border"
      cols={3}
    />
  )
}
```

**Rules:**
- 3 columns for brief highlights (1-2 sentence descriptions)
- 2 columns for detailed highlights (3+ sentence descriptions)
- `variant="combined"` for connected card look, `"default"` for separated cards
- Cards defined in constants file

### Section Dividers

Dividers are placed by the parent page between content sections. Content components (`FeatureShowcase`, `SplitSection`, `CTABanner`) do NOT render their own dividers.

```tsx
// Page composition pattern
<SectionLayout variant="bordered" className="!px-0">
  <Divider />
  <FeatureSection1 />
  <Divider />
  <FeatureSection2 />
  <Divider className="mt-12" />   {/* Extra top margin when needed */}
  <SplitSection ... />
  <Divider />
  <CTABanner ... />
</SectionLayout>
```

## Constants File Patterns

### Button Arrays

```tsx
// Shared button className constant — Tailwind replacement for `flex-center`
const BUTTON_CLASS_NAME = 'flex items-center justify-center gap-1 h-full w-full'

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
```

### FeatureShowcase Data

```tsx
export const FEATURE_SHOWCASE = {
  title: 'Section Title',
  description: 'Description text — string or JSX.',
  image: '/img/feature/screenshot.png',
  imageAlt: 'Alt text',
  button: {
    text: 'Read Documentation',
    href: '/docs/feature/',
    tracking: { clickType: 'Secondary CTA', ... },  // optional
  },
}
```

### SplitSectionPanel Data

```tsx
export const PANEL = {
  title: 'Panel Title',
  description: 'Panel description — string or JSX with <p> tags.',
  image: '/img/feature/panel.png',
  imageAlt: 'Alt text',
  imageClassName: 'mb-8',  // optional
  button: { text: 'Read Documentation', href: '/docs/feature/' },  // optional
}

// Image reference (for custom right-column rendering)
export const PANEL_IMAGE = {
  src: '/img/feature/panel.png',
  alt: 'Alt text',
}
```

### Card Data Structure

```tsx
import { Atom, Zap, Shield } from 'lucide-react'

export const FEATURE_CARDS = [
  {
    icon: <Atom />,
    title: 'Card Title',
    description: 'Specific, concrete description. Include real examples where possible.',
  },
  {
    icon: <Zap />,
    title: 'Second Card',
    description: 'Each card should communicate a distinct value proposition.',
  },
  {
    icon: <Shield />,
    title: 'Third Card',
    description: 'Keep descriptions roughly equal length across cards for visual balance.',
  },
]
```

**Rules:**
- Icons from `lucide-react` — choose icons that visually relate to the concept
- Named export (not default)
- SCREAMING_SNAKE_CASE for constant names
- 3 cards minimum for grid layout, keep descriptions similar length

### Carousel Data Structure

```tsx
export const WALKTHROUGH_CAROUSEL = [
  {
    id: 0,
    title: 'Step 1: Configure',
    description: 'Set up your integration in under 5 minutes.',
    image: '/img/feature/step-configure.png',
    isActive: true,
  },
  {
    id: 1,
    title: 'Step 2: Monitor',
    description: 'View real-time data as it flows in.',
    image: '/img/feature/step-monitor.png',
    isActive: false,
  },
  {
    id: 2,
    title: 'Step 3: Alert',
    description: 'Set up alerts for anomalies.',
    image: '/img/feature/step-alert.png',
    isActive: false,
  },
]
```

**Rules:**
- Sequential `id` starting from 0
- First item has `isActive: true`
- Each item needs a corresponding image in `public/img/<feature>/`
- 3-5 items is ideal for carousel usability

## Tracking Integration

### Tracking Object Structure

```tsx
{
  clickType: 'Primary CTA' | 'Secondary CTA' | 'Nav Link' | 'Feature Link',
  clickName: '<Feature> <Section> <Action>',  // e.g., 'Trace Funnels Hero Start Trial'
  clickLocation: '<Feature> <Section>',        // e.g., 'Trace Funnels Hero'
  clickText: '<Button Text>',                  // exact button text
}
```

### Where Tracking Is Required

| Element | Tracking Method |
|---------|----------------|
| Hero buttons | Via `FeaturePageHeader` `buttons` prop |
| Mid-page buttons | Via `ButtonGroup` `buttons` prop or `TrackingLink` |
| Inline documentation links | Via `TrackingLink` wrapping `Button asChild` |
| Customer stories section | Via `CustomerStoriesSection` `tracking` prop |
| Carousel CTA | Via `CarouselCards` `buttonLink`/`buttonText` props |

### Tracking Naming Convention

- **clickName**: `{PageName} {SectionName} {ActionType}` — e.g., `Trace Funnels Hero Start Trial`
- **clickLocation**: `{PageName} {SectionName}` — e.g., `Trace Funnels Hero`
- **clickType**: Reflects the button's role — `Primary CTA` for main actions, `Secondary CTA` for supporting actions
- **clickText**: Exact visible text of the button/link
