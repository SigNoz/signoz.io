# Layout and Spacing in SigNoz Feature Pages

## Spacing System

SigNoz uses Tailwind's spacing scale. All spacing should use scale values — never arbitrary pixel values.

**Tailwind spacing scale (commonly used in SigNoz):**
- `1` (4px), `2` (8px), `3` (12px), `4` (16px), `6` (24px), `8` (32px), `10` (40px), `12` (48px), `16` (64px), `20` (80px), `24` (96px)

**Workflow**: Need more space? Move to the next scale value. Not enough? Skip one. Never pick values between scale points.

## Section Layout Patterns

SigNoz feature pages use a consistent layout system built on shared components.

### Page-Level Structure

```
FeaturePageLayout
  ├── Header (FeaturePageHeader)
  ├── SectionLayout variant="bordered"
  │   ├── Feature section 1
  │   ├── Feature section 2
  │   ├── ...
  │   └── CTA banner
  ├── UsageBasedPricing
  ├── SigNozStats
  └── CustomerStoriesSection
```

### SectionLayout Variants
- `bordered`: `border border-dashed border-signoz_slate-400` with `md:!w-[80vw] max-w-8xl !mx-auto` — the standard for feature content sections
- `full-width`: Same width constraints, no border
- `no-border`: Same as full-width, no visible border
- `border-x`: Full dashed border including top and bottom

### Content Width
- **Standard**: `md:!w-[80vw] max-w-8xl !mx-auto` — all feature content respects this
- **Inner padding**: `px-6` within sections (24px each side)
- **Do not fill the screen**: Content should feel contained, not edge-to-edge

## White Space Rules

### Start with Too Much

The most common mistake in feature pages is insufficient spacing between sections. Start with generous spacing and reduce.

### Group Spacing > Inner Spacing

Space *between* groups must exceed space *within* groups. This establishes visual relationships.

- **Between sections**: `mt-12` (48px) or `py-10` (40px) / `py-20` (80px) — section-level breathing room
- **Within sections**: `mb-6` (24px) for title-to-body, `mb-8` (32px) for body-to-image or body-to-CTA
- **Between cards**: `gap-8` (32px) in card grids
- **Within cards**: `p-6` (24px) internal padding

### Padding Rhythm

Feature sections should maintain a consistent vertical rhythm:

- **Section padding**: `py-10` (40px) for standard sections, `py-20` (80px) for CTA banners and emphasis sections
- **Title to body**: `mb-6` (24px) — consistent across all feature pages
- **Body to next element**: `mb-8` (32px) — text to image, text to button, text to card grid
- **Section dividers**: `border-y-1 border-dashed border-signoz_slate-400` or `border-t-1` — dashed borders create section separation

## Grid Layout Patterns

### GridLayout Component

- `variant="split"`: 2-column layout (1 col mobile, 2 cols on `lg:`) — used for text + image sections
- `variant="default"`: Multi-column grid, `cols` prop controls count (default: 3)
- **Gap**: `gap-y-8 md:gap-y-16` default — vertical gap doubles on desktop

### Split Section Pattern (Text + Image)

The most common feature section pattern alternates text and image across a split grid:

```
Section 1: [Text | Image]  (text left, image right)
Section 2: [Image | Text]  (image left, text right)
Section 3: [Text | Image]  (alternating)
```

- **Text column**: `flex flex-col justify-center px-6` — vertically centered
- **Image column**: `h-full w-full px-6` — image fills available space
- **Alternation**: Creates visual rhythm and prevents monotony

### Card Grid Pattern

- **3-column default**: `HeroCards` with `cols={3}` for feature highlights
- **2-column**: `HeroCards` with `cols={2}` for larger cards with more content
- **Variants**: `default` (separate cards) or `combined` (merged border look)

## Responsive Behavior

- **Mobile-first**: Feature sections stack vertically on mobile (`grid-cols-1`)
- **Desktop expansion**: `lg:grid-cols-2` for split layouts, `md:grid-cols-{n}` for card grids
- **Width transition**: `!w-[90vw]` on mobile → `md:!w-[80vw]` on desktop (via SectionLayout)
- **Padding reduction**: Some sections use `max-md:` to reduce padding on mobile

## Section Separation on Dark Backgrounds

On dark backgrounds, spacing alone is not enough — adjacent sections with the same `bg-signoz_ink-500` background blend together visually. Always add at least one visual separator:

### Separation Techniques (pick one per boundary)

- **Subtle solid border**: `border-bottom: 1px solid rgba(255,255,255,0.06)` — nearly invisible but creates a visual edge between repeating items (e.g., alternating feature rows in comparison pages)
- **Dashed border**: `border-dashed border-signoz_slate-400` — stronger separator for major section boundaries (the standard SigNoz pattern for feature pages)
- **Background shift**: One section at `bg-signoz_ink-400` creates depth against `bg-signoz_ink-500`
- **Increased spacing**: `py-20` between major page sections, `py-10` within grouped content

### When to Use Which

| Boundary type | Separator |
|--------------|-----------|
| Between repeating items (feature rows, card groups) | Subtle solid border `rgba(255,255,255,0.06)` |
| Between major page sections (hero → features → grid) | Dashed border or generous spacing |
| Between CTA banner and surrounding content | Background shift + increased padding |
| Between grid header and data rows | Subtle accent border (e.g., `rgba(255,107,0,0.2)`) |

## Common Issues to Flag

1. **Arbitrary spacing**: Values like `mt-[37px]` or `py-[15px]` instead of scale values
2. **Inconsistent section padding**: One section using `py-10` while adjacent uses `py-6`
3. **Missing group separation**: Cards or sections that feel like one blob because between-group spacing matches within-group spacing
4. **Broken alternation**: Split sections with text on the same side consecutively (should alternate)
5. **Full-width content**: Text or cards stretching to container edges without `px-6` inner padding
6. **Missing responsive grid collapse**: Card grids not dropping to `grid-cols-1` on mobile
7. **No section boundaries on dark bg**: Adjacent sections with same dark background and no border/spacing distinction — sections blur together
