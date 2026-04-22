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

## Quick Heuristics (SigNoz-Specific)

These are patterns observed across the best SigNoz feature pages:

- **Section rhythm**: Consistent `py-10` / `py-20` padding within `SectionLayout variant="bordered"`
- **Dashed borders**: `border-dashed border-signoz_slate-400` for section dividers — should be consistent across all sections
- **Content width**: Main content at `md:!w-[80vw] max-w-8xl !mx-auto` via SectionLayout
- **Text hierarchy**: Titles in `text-signoz_vanilla-100`, body in `text-signoz_vanilla-400`, accents in `text-signoz_cherry-500` or `text-signoz_robin-400`
- **Button hierarchy**: Primary = solid default variant, Secondary = outline/secondary variant, both with `ArrowRight` icon
- **Hero pattern**: `FeaturePageHeader` with gradient text title, max 2 buttons, hero image below
- **Image sizing**: Use `width={10000} height={10000}` pattern for responsive images within containers (Next.js Image with intrinsic sizing)
- **Split layouts**: `GridLayout variant="split"` for alternating text + image sections — text and image should alternate sides for visual rhythm
- **CTA banners**: Centered text with `ButtonGroup` inside dashed-border sections, `py-20` padding
- **Standard page tail**: `UsageBasedPricing` → `SigNozStats` → `CustomerStoriesSection` — present on all feature pages

## Domain References

Consult these for detailed tactical rules when reviewing specific design aspects:

- **Visual hierarchy**: See [hierarchy.md](references/hierarchy.md)
- **Layout and spacing**: See [layout-spacing.md](references/layout-spacing.md)
- **Typography**: See [typography.md](references/typography.md)
- **Colors and palette**: See [colors.md](references/colors.md)
- **Depth and polish**: See [depth-and-polish.md](references/depth-and-polish.md)

## Guardrails

- Suggest changes using existing Tailwind classes and SigNoz design tokens — do not invent new CSS variables or tokens.
- Recommend existing shared components from `shared/components/molecules/FeaturePages/` before suggesting custom implementations.
- Keep suggestions actionable with specific class names and file locations.
- Do not suggest changes that contradict the established SigNoz visual language (dark theme, dashed borders, gradient overlays).
- Prioritize consistency with existing high-quality pages (trace-funnels, alerts-management) over theoretical ideals.
