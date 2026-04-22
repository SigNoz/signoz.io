---
name: signoz-feature-page-builder
description: Create new SigNoz feature pages following established architecture, shared components, and design patterns. Use when asked to "create a feature page", "build a landing page", "new product page", "scaffold a page like trace-funnels", or any request to build a marketing/product page for a SigNoz feature. Also activates for "add a page for [feature]" or "build a page similar to alerts/external-apis/why-signoz".
---

# SigNoz Feature Page Builder

Build new feature pages that match the established architecture, component library, and visual language of existing SigNoz feature pages.

## Reference Implementation

The **trace-funnels page** (`app/trace-funnels/`) is the cleanest reference implementation. Use it as the primary pattern to follow. Other pages provide additional patterns:
- `app/alerts-management/` — Rich multi-section layout with many feature highlights
- `app/external-apis/` — CarouselCards interactive pattern
- `app/why-signoz/` — Complex enterprise page with varied card types
- `app/datadog-migration-tool/` — Modal/form integration pattern

## Build Workflow

1. **Define Page Goals**: Clarify the feature name, target audience, key value propositions (3-5), primary CTA, and secondary CTA.
2. **Create File Structure**: Follow the standard 3-file pattern (see [page-architecture.md](references/page-architecture.md)).
3. **Build Constants**: Define card data, carousel data, button configs, and tracking objects (see [content-patterns.md](references/content-patterns.md)).
4. **Compose Sections**: Assemble the page using shared components in the standard flow (see [shared-components.md](references/shared-components.md)).
5. **Add Tracking**: Integrate `TrackingLink` and tracking objects on all interactive elements.
6. **Visual Review**: Run `$signoz-visual-review` on the completed page to catch visual issues.
7. **Verify**: Run `yarn lint` and `yarn build` to confirm the page compiles.

## Standard Page Flow

Every feature page should follow this structure (order matters):

```
FeaturePageLayout
  ├── 1. Header (FeaturePageHeader)
  │     └── Title + description + primary/secondary buttons + hero image
  │
  ├── 2. Feature Sections (SectionLayout variant="bordered")
  │     ├── Feature section (split: text + image)
  │     ├── Feature section (split: image + text)  ← alternate sides
  │     ├── Feature section (card grid or carousel)
  │     ├── ... more features as needed
  │     └── CTA Banner (centered title + ButtonGroup)
  │
  ├── 3. UsageBasedPricing
  │     └── show={['logs', 'traces', 'metrics']} — pick relevant signal types
  │
  ├── 4. SigNozStats
  │     └── Community stats and deployment options
  │
  └── 5. CustomerStoriesSection
        └── Testimonials with tracking
```

## Component Decision Tree

Choose the right component for each section:

- **Alternating text + image feature explanation** → `GridLayout variant="split"` with text on one side, `Image` on the other
- **3+ feature highlights as cards** → `HeroCards` with `FeatureCard` items
- **Step-by-step interactive walkthrough** → `CarouselCards` with image transitions
- **Detailed feature explanations with icons** → `IconTitleDescriptionCard` in a grid
- **CTA banner between sections** → Centered `h2` + `ButtonGroup` in a bordered div
- **Pricing information** → `UsageBasedPricing` component
- **Social proof** → `CustomerStoriesSection` component

## Content Guidelines

- **Title**: Action-oriented, benefit-focused. "Create Visual Funnels from Traces" not "Trace Funnels Feature".
- **Description**: 1-2 sentences max. Focus on the unique value, not generic observability claims.
- **Section titles**: Verb-led where possible. "Define multi-step sequences", "See drop-offs between steps".
- **Card descriptions**: Specific and concrete. Include real examples (latencies, percentages, error counts) where applicable.
- **Buttons**: Primary = "Start your free trial" (links to `/teams/`). Secondary = "Read Documentation" (links to `/docs/<feature>/`).

## Tracking Requirements

Every interactive element needs tracking. See [content-patterns.md](references/content-patterns.md) for the tracking object structure.

- **Hero buttons**: `clickLocation: '<Feature> Hero'`
- **Mid-page buttons**: `clickLocation: '<Feature> <Section Name>'`
- **Bottom CTA buttons**: `clickLocation: '<Feature> Bottom Banner'`
- **Customer stories**: `clickName: '<Feature> Customer Stories Button'`, `clickLocation: '<Feature> Testimonials'`

## Domain References

- **File structure and metadata**: See [page-architecture.md](references/page-architecture.md)
- **Shared component catalog**: See [shared-components.md](references/shared-components.md)
- **Content and tracking patterns**: See [content-patterns.md](references/content-patterns.md)
- **Pre-launch checklist**: See [design-checklist.md](references/design-checklist.md)

## Guardrails

- Use existing shared components from `shared/components/molecules/FeaturePages/` — do not create new layout primitives.
- Follow the standard page flow. Omitting `UsageBasedPricing`, `SigNozStats`, or `CustomerStoriesSection` requires explicit justification.
- All images go in `public/img/<feature-name>/` directory.
- Constants file should export named constants (not default exports) for card arrays and data objects.
- Do not hardcode Hubspot form IDs — reference them from constants or environment config.
- Run `yarn lint` and `yarn build` after creating the page to verify it compiles.
