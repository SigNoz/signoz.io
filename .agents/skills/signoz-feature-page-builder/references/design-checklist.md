# Feature Page Design Checklist

Run through this checklist before considering a feature page complete.

## Structure

- [ ] Page follows the standard flow: Header → Feature Sections → CTA Banner → UsageBasedPricing → SigNozStats → CustomerStoriesSection
- [ ] `page.tsx` exports metadata with title, description, OpenGraph, and Twitter card
- [ ] Page component is marked `'use client'`
- [ ] Page is wrapped in `FeaturePageLayout`
- [ ] Feature sections are wrapped in `SectionLayout variant="bordered" className="!px-0"`
- [ ] Constants are in a separate `.constants.tsx` file with named exports

## Visual Hierarchy

- [ ] Hero title is the most prominent element on the page (gradient text, largest size)
- [ ] Section titles are clearly subordinate to the hero but distinguish from body text
- [ ] Body text uses `text-signoz_vanilla-400` (muted), not `text-signoz_vanilla-100` (bright)
- [ ] Primary CTA button is visually dominant over secondary buttons
- [ ] No two adjacent sections compete for equal visual weight

## Layout & Spacing

- [ ] Split sections alternate text/image sides (left-right, right-left)
- [ ] Consistent section padding — `py-10` standard, `py-20` for CTA banners
- [ ] Section dividers use `border-dashed border-signoz_slate-400` consistently
- [ ] Card grids have equal-length descriptions for visual balance
- [ ] No arbitrary spacing values — all from Tailwind scale
- [ ] Content width constrained by SectionLayout (not full-viewport)

## Typography

- [ ] Hero title uses responsive sizing (`text-2xl sm:text-3xl md:text-4xl`)
- [ ] Body text uses `leading-relaxed` or `leading-8` for readability
- [ ] Long text blocks constrained by `max-w-4xl` or grid column width
- [ ] No text smaller than `text-sm` on dark background
- [ ] Font weights: titles at `font-semibold`, body at `font-normal`

## Colors & Theme

- [ ] All colors use SigNoz tokens (no raw hex/rgb in components)
- [ ] Text contrast is sufficient on `bg-signoz_ink-500` background
- [ ] `text-gradient` only used on the hero title
- [ ] Accent colors (`cherry`, `robin`) used consistently for the same semantic purpose
- [ ] Border colors consistent: `border-signoz_slate-400` for dashed dividers

## Images

- [ ] All images use Next.js `Image` component
- [ ] Images have descriptive `alt` text
- [ ] Images use the `width={10000} height={10000}` intrinsic sizing pattern
- [ ] OG image exists at `public/img/<feature>/` in 1200x630 `.webp` format
- [ ] Product screenshots are clear and readable at the displayed size

## Tracking

- [ ] All hero buttons have tracking objects
- [ ] All mid-page CTA buttons have tracking objects
- [ ] Bottom CTA banner buttons have tracking objects
- [ ] CustomerStoriesSection has `tracking` prop with `clickName` and `clickLocation`
- [ ] Tracking `clickName` follows naming convention: `{Page} {Section} {Action}`

## Responsive

- [ ] Page renders correctly at 375px mobile width
- [ ] Split layouts stack properly on mobile (text above image)
- [ ] Card grids collapse to single column on mobile
- [ ] Hero text does not overflow or require horizontal scroll
- [ ] Buttons are tappable size on mobile (min 44px touch target)

## Components

- [ ] Uses shared components from `shared/components/molecules/FeaturePages/` — no custom layout primitives
- [ ] `FeaturePageHeader` for hero section
- [ ] `ButtonGroup` for grouped CTA buttons
- [ ] `HeroCards` for feature card grids
- [ ] `GridLayout variant="split"` for text + image sections
- [ ] `UsageBasedPricing` with relevant signal types
- [ ] `SigNozStats` present
- [ ] `CustomerStoriesSection` present as final section

## Build Verification

- [ ] `yarn lint` passes with no errors
- [ ] `yarn build` completes successfully
- [ ] Page accessible at `localhost:3000/<feature-name>/`
- [ ] No console errors or warnings on page load
