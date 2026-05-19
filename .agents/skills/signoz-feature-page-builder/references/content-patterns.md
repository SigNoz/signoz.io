# Content and Tracking Patterns

## Section Composition Patterns

### Split Feature Section (Text + Image)

The most common section pattern. Text on one side, product screenshot on the other.

```tsx
const FeatureSection: React.FC = () => {
  return (
    <div className="mt-12 border-y-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 py-10">
      <GridLayout variant="split">
        {/* Text Column */}
        <div className="flex h-full w-full flex-col justify-center px-6">
          <div className="flex flex-col justify-between">
            <h2 className="mb-6 text-signoz_vanilla-100">Section Title</h2>
            <p className="leading-relaxed text-signoz_vanilla-400">
              Description paragraph explaining the feature.
            </p>
          </div>
        </div>

        {/* Image Column */}
        <div className="h-full w-full px-6">
          <Image
            src="/img/feature/screenshot.png"
            alt="Descriptive alt text"
            width={10000}
            height={10000}
          />
        </div>
      </GridLayout>
    </div>
  )
}
```

**Rules:**
- Alternate text/image sides between sections for visual rhythm
- Text column: `flex flex-col justify-center px-6`
- Image column: `h-full w-full px-6`
- Wrapper: `border-y-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 py-10`
- First section often uses `mt-12` for spacing from header

### Full-Width Feature Section (Text + Wide Image Below)

For features where the screenshot needs full width.

```tsx
const WideFeatureSection: React.FC = () => {
  return (
    <div className="border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6">
      <div className="mb-8 max-w-4xl">
        <h2 className="mb-6 text-signoz_vanilla-100">Section Title</h2>
        <p className="mb-8 leading-relaxed text-signoz_vanilla-400">
          Description text.
        </p>
        <Button variant="secondary" rounded="full" className="flex w-fit items-center gap-2" asChild>
          <TrackingLink href="/docs/feature/" {...trackingProps}>
            Read Documentation
            <ArrowRight size={14} />
          </TrackingLink>
        </Button>
      </div>
      <Image
        src="/img/feature/wide-screenshot.png"
        alt="Descriptive alt text"
        width={10000}
        height={10000}
        className="mb-8"
      />
    </div>
  )
}
```

**Rules:**
- Text constrained by `max-w-4xl` for readable line length
- Image sits below text at full section width
- Optional inline CTA button between text and image

### CTA Banner Section

Centered call-to-action between feature sections.

```tsx
const CTABanner: React.FC = () => {
  const ctaButtons = [
    {
      text: 'Start your free trial',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
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
      className: 'flex-center',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Feature Banner Docs',
        clickLocation: 'Feature Bottom Banner',
        clickText: 'Read Documentation',
      },
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center border-t-1 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-6 py-20">
      <h2 className="mb-6 text-center text-4xl text-signoz_vanilla-100">
        Compelling CTA Headline
      </h2>
      <ButtonGroup buttons={ctaButtons} />
    </div>
  )
}
```

**Rules:**
- Centered layout with `flex flex-col items-center justify-center`
- Generous padding: `py-20`
- Title: `text-center text-4xl text-signoz_vanilla-100`
- ButtonGroup below title with `mb-6` spacing

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

## Constants File Patterns

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
