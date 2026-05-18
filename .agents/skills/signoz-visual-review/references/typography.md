# Typography in SigNoz Feature Pages

## Type Scale

SigNoz feature pages use Tailwind's default type scale. Stick to these sizes and avoid arbitrary pixel values.

- **Hero titles**: `text-2xl sm:text-3xl md:text-4xl lg:text-[44px]` — responsive scaling with a custom max
- **Section titles**: `text-2xl` or default `h2` sizing — large enough to orient, not dominate
- **Card titles**: Default size or `text-lg` with `font-semibold`
- **Body text**: `text-base` (16px) or `text-lg` (18px) for feature descriptions
- **Small/supporting text**: `text-sm` (14px) for labels, captions, metadata
- **Avoid**: Sizes below `text-xs` (12px) on dark backgrounds — readability drops sharply

## Line Height

Line height is inversely proportional to font size. SigNoz uses Tailwind's `leading-*` utilities.

- **Body text**: `leading-relaxed` (1.625) or `leading-8` (2rem) for long-form descriptions — this is the standard across feature pages
- **Headings**: Default Tailwind line height or `leading-tight` (1.25) for large hero text
- **Cards**: `leading-relaxed` for description text within cards
- **Rule**: If text feels cramped, increase line height before increasing font size

## Line Length

Optimal reading length is 45-75 characters per line.

- **SigNoz pattern**: Feature page body text is constrained by `GridLayout variant="split"` (50% width) or `max-w-4xl` on full-width sections
- **Issue to watch**: Full-width sections without `max-w-` constraint can create excessively long lines on wide screens
- **Fix**: Wrap descriptive text in a `max-w-4xl` or `max-w-3xl` container

## Font Weight Patterns

- **Hero title**: `font-semibold` (600) with `text-gradient` class
- **Section titles**: `font-semibold` or default weight — consistency matters more than the specific weight
- **Body text**: `font-normal` (400) — never bold body text
- **Button text**: Inherits from Button component — do not override
- **Card titles**: `font-semibold` — creates clear separation from card description text
- **Labels/metadata**: `font-normal` or `font-medium` (500) at smaller sizes

## Responsive Typography

- **Scale down gracefully**: Hero titles should use responsive classes (`text-2xl sm:text-3xl md:text-4xl`)
- **Do not hide text**: Prefer shorter line breaks (`<br className="hidden md:block" />`) over hiding entire text blocks on mobile
- **Mobile body text**: `text-base` is the minimum for comfortable reading on mobile

## Alignment

- **Left-align**: All body text and section content — the standard for readability
- **Center-align**: Only for CTA banners (e.g., `StopLosingUsersBanner`) and hero section titles/descriptions
- **Right-align**: Only for numeric data in tables or comparison grids
- **Consistency**: Within a section, all text should share the same alignment. Do not mix left-aligned titles with center-aligned descriptions.

## Common Issues to Flag

1. **Inconsistent title sizes**: Section titles across the same page using different sizes without visual justification
2. **Missing responsive scaling**: Large text without `sm:` / `md:` breakpoint adjustments
3. **Excessive line length**: Body text spanning full container width without `max-w-*` constraint
4. **Tight line height on body text**: Using default or `leading-normal` instead of `leading-relaxed` for multi-line descriptions
5. **Weight overuse**: Multiple elements competing at `font-bold` — only hero titles should be the heaviest
