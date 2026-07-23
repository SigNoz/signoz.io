---
name: signoz-visual-review
description: Review SigNoz feature pages and components for visual design quality — hierarchy, typography, spacing, color, and polish. Use when asked to "review this page visually", "make this look better", "improve the design", "fix the UI", audit visual consistency, or evaluate a feature page's design against best practices. Also activates for requests like "check the styling" or "does this page look good".
---

# SigNoz Visual Review

Review feature pages and components for visual design quality using tactical, rule-based design principles adapted for the SigNoz dark-themed design system.

## Design Philosophy

Design quality comes from logical, constrained systems — not artistic talent. Every visual choice should be deliberate and traceable to a design system value. The SigNoz website uses a dark theme with custom color tokens, dashed-border section dividers, gradient overlays, and a dot-pattern background. Reviews must account for this specific visual language.

## Review Workflow

1. **Identify Scope**: Determine which page or component to review. Read the source files (`app/<page>/`, constants, and any shared components used).
2. **Take a Screenshot** (if possible): Use Chrome DevTools MCP to screenshot the page at desktop (1440px) and mobile (375px) widths for visual context.
3. **Audit Visual Hierarchy**: Consult [hierarchy.md](references/hierarchy.md). Check that primary content commands attention, secondary content recedes, and competing elements are de-emphasized rather than primary elements made louder.
4. **Audit Layout & Spacing**: Consult [layout-spacing.md](references/layout-spacing.md). Check section padding rhythm, group spacing, grid alignment, and content width constraints.
5. **Audit Typography**: Consult [typography.md](references/typography.md). Check type scale consistency, line-height proportionality, line length, and responsive text sizing.
6. **Audit Colors**: Consult [colors.md](references/colors.md). Check palette usage against SigNoz tokens, contrast ratios on dark backgrounds, and consistent use of semantic colors.
7. **Audit Depth & Polish**: Consult [depth-and-polish.md](references/depth-and-polish.md). Check shadow usage, border styling, gradient placement, decorative elements, empty states, and finishing touches.
8. **Compile Findings**: Produce a prioritized list of findings with severity, impact, and specific Tailwind/code fixes.

## Output Format

For each finding:

- **Issue**: What the problem is
- **Severity**: `Critical` | `High` | `Medium` | `Low`
- **Impact**: Why it matters (user perception, readability, consistency)
- **Location**: File path and component/section name
- **Fix**: Specific code change with Tailwind classes or component adjustments

End with a summary grouped by severity and an overall assessment.

## Scope

This skill applies to all SigNoz marketing pages, including:

- **Feature pages** (`app/trace-funnels/`, `app/alerts-management/`, etc.) — use shared components from `shared/components/molecules/FeaturePages/` with Tailwind classes
- **Comparison pages** (`app/product-comparison/signoz-vs-*/`) — use dedicated components from `components/comparison/` with CSS modules
- **Any page** with visual design issues the user wants reviewed

Adapt findings to whatever styling system the page uses (Tailwind classes OR CSS module properties).

## Quick Heuristics (SigNoz-Specific)

These are patterns observed across the best SigNoz pages:

### Text Hierarchy on Dark Backgrounds

The most impactful improvement for any dark-themed page is proper text hierarchy through color/opacity:

- **Titles**: Full white (`color: inherit` or `text-signoz_vanilla-100`) — commands attention
- **Body/descriptions**: Muted white (`rgba(255,255,255,0.75)` in CSS modules, or `text-signoz_vanilla-400` in Tailwind) — readable but recedes
- **Tertiary text**: Further muted (`rgba(255,255,255,0.55)` or `text-signoz_slate-400`) — for captions, extra detail
- **Anti-pattern**: Title and body text at the same brightness — everything competes, nothing stands out

### Section Separation on Dark Backgrounds

On dark backgrounds, sections blend together without explicit visual breaks:

- **Subtle borders**: `border-bottom: 1px solid rgba(255,255,255,0.06)` between repeating sections (e.g., feature reason rows)
- **Dashed borders**: `border-dashed border-signoz_slate-400` for major section dividers (SectionLayout pattern)
- **Background shifts**: `bg-signoz_ink-400` on cards/surfaces to lift them from `bg-signoz_ink-500` page
- **Spacing alone is not enough**: Even with generous padding, dark sections need a visual edge or background shift to feel distinct

### Feature Page Patterns

- **Section rhythm**: Consistent `py-10` / `py-20` padding within `SectionLayout variant="bordered"`
- **Content width**: Main content at `md:!w-[80vw] max-w-8xl !mx-auto` via SectionLayout
- **Button hierarchy**: Primary = solid default variant, Secondary = outline/secondary variant, both with `ArrowRight` icon
- **Hero pattern**: `FeaturePageHeader` with gradient text title, max 2 buttons, hero image below
- **Image sizing**: Use `width={10000} height={10000}` pattern for responsive images within containers
- **Full-width sections**: `FeatureShowcase` — title + description + optional button + image below
- **Split layouts**: `SplitSection` for alternating text + image — alternate sides for rhythm; use `withVerticalDivider` for side-by-side features
- **CTA banners**: `CTABanner` component — centered title + `ButtonGroup`, `py-20` padding
- **Section dividers**: `<Divider />` placed between sections by the parent page (NOT inside content components)
- **Data separation**: Section content in `.constants.tsx`, JSX composition in page file
- **Standard page tail**: `UsageBasedPricing` → `SigNozStats` → `CustomerStoriesSection`

### Comparison Page Patterns

- **CSS modules**: Comparison components use `.module.css` files, not Tailwind — fixes must use CSS properties
- **Grid/table readability**: Header rows need more font-weight (600 vs 500) and a subtle border-bottom to separate from data rows
- **Detail text in grids**: Minimum `0.75rem` with `line-height: 130%` — smaller than that becomes unreadable on dark backgrounds
- **Alternating feature rows**: Add subtle `border-bottom: 1px solid rgba(255,255,255,0.06)` to create visual separation between repeating sections
- **Hero description**: Constrain width to 65% for comfortable line length, mute to `rgba(255,255,255,0.75)`

## Domain References

Consult these for detailed tactical rules when reviewing specific design aspects:

- **Visual hierarchy**: See [hierarchy.md](references/hierarchy.md)
- **Layout and spacing**: See [layout-spacing.md](references/layout-spacing.md)
- **Typography**: See [typography.md](references/typography.md)
- **Colors and palette**: See [colors.md](references/colors.md)
- **Depth and polish**: See [depth-and-polish.md](references/depth-and-polish.md)

## Guardrails

- **Match the styling system**: If the page uses Tailwind, suggest Tailwind classes. If it uses CSS modules (`.module.css`), suggest CSS properties. Do not mix systems.
- Recommend existing shared components before suggesting custom implementations.
- Keep suggestions actionable with specific class names/properties and file locations.
- Do not suggest changes that contradict the established SigNoz visual language (dark theme, dashed borders, gradient overlays).
- Prioritize consistency with existing high-quality pages (trace-funnels, alerts-management) over theoretical ideals.
- **Always take screenshots**: Use Chrome DevTools MCP to capture the current state before suggesting fixes, and verify after applying changes. Visual review without seeing the actual render is guesswork.
