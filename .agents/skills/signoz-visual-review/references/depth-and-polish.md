# Depth, Polish, and Finishing Touches

## The SigNoz Dark Theme Depth Model

On dark backgrounds, depth works differently than on light. Lighter elements feel closer; darker elements recede. SigNoz uses layering, borders, and subtle gradients rather than heavy shadows.

### Elevation Without Shadows

Traditional box-shadows are subtle on dark backgrounds. SigNoz achieves depth through:

- **Border separation**: Dashed borders (`border-dashed border-signoz_slate-400`) create section boundaries
- **Background differentiation**: `bg-signoz_ink-400` or `bg-signoz_ink-300` on cards lifts them above the `bg-signoz_ink-500` page
- **Gradient backdrops**: The purple gradient blob behind the hero creates atmospheric depth
- **Layering**: The dot-pattern background sits behind content, creating a subtle textured depth plane

### When to Use Shadows

If shadows are needed on dark theme:
- Use very soft, large-radius shadows with low opacity
- Two-part shadow: Combine a large ambient shadow with a tight near-shadow
- Example: `shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3),0_2px_4px_-2px_rgba(0,0,0,0.2)]`
- Use sparingly — borders and background shifts are usually sufficient

## Border Patterns

### Dashed Section Borders
The signature SigNoz visual element. Consistent usage is critical.

- **Section dividers**: `border-y-1 border-dashed border-signoz_slate-400` or `border-t-1 border-dashed`
- **Content containers**: `border border-dashed border-signoz_slate-400` via `SectionLayout variant="bordered"`
- **Card borders**: `border border-dashed border-signoz_slate-400/50` for cards within grids
- **Consistency**: All dashed borders on a page should use the same color and opacity

### Solid Borders
- Used for buttons, inputs, and interactive elements
- `border-signoz_slate-400` for default state
- Accent color borders for active/selected states

## Gradient and Decorative Elements

### Hero Gradient Blob
Applied once in `FeaturePageLayout`:
```
absolute left-0 right-0 top-0 mx-auto h-[450px] w-full flex-shrink-0
rounded-[956px] bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)]
bg-[length:110%] bg-no-repeat opacity-30 blur-[300px]
```
- Creates atmospheric purple glow behind hero content
- Do not duplicate this in inner sections
- The `opacity-30` and `blur-[300px]` ensure it is ambient, not distracting

### Dot Pattern Background
```
bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full
```
- Applied once in `FeaturePageLayout`
- Creates subtle texture that prevents the dark background from feeling flat
- The `masked-dots` class fades the pattern at edges

### Text Gradient
The `text-gradient` class is reserved for hero titles only. It creates a sense of premium, branded emphasis.

## Images and Screenshots

### Image Handling in Feature Pages
- **Use Next.js Image**: Always `import Image from 'next/image'`
- **Intrinsic sizing pattern**: `width={10000} height={10000}` lets the image size itself to its container — this is the standard SigNoz pattern
- **Container constraints**: Images are constrained by their parent grid column or `max-w-*` wrapper
- **Alt text**: Always provide meaningful alt text describing the UI shown

### Screenshot Quality
- Screenshots should show the SigNoz product UI — dark themed, matching the page's visual language
- Do not use screenshots that are too small (text unreadable) or too large (dominating the section)
- In split layouts, the image column should balance with the text column

### Image Spacing
- Images in split layouts: `px-6` padding from grid edges
- Standalone images: `mb-8` bottom margin before the next section
- Side-by-side images: `gap-8` between them (see trace-funnels AnalyzeRequestFlows pattern)

## Finishing Touches

### Accent Borders for Personality
Add a colored left or top border to cards or alerts that need visual distinction:
- `border-l-4 border-signoz_cherry-500` for a warm accent
- `border-t-4 border-signoz_robin-400` for an informational accent
- Use on max 1-2 elements per page — overuse dilutes the effect

### Empty States
If a section or component could render with no data:
- Include an illustration or icon
- Add descriptive text explaining what will appear
- Include a primary CTA button ("Get started", "Create your first...")

### CTA Banner Polish
CTA banners (like `StopLosingUsersBanner`) should feel like a visual destination:
- Centered text with `text-center`
- Generous vertical padding: `py-20`
- Clear hierarchy: Large title → ButtonGroup
- Bordered separation: `border-t-1 border-dashed border-signoz_slate-400`

### Responsive Polish
- Test at 375px (mobile), 768px (tablet), 1440px (desktop)
- Split layouts should stack gracefully — text above image on mobile
- Card grids should collapse to single column on mobile
- Hero text should remain readable without horizontal scroll

## Common Issues to Flag

1. **Duplicate decorative elements**: Gradient blob or dot pattern re-applied inside sections
2. **Inconsistent border style**: Mixing dashed and solid borders for the same purpose
3. **Missing image alt text**: Screenshots without descriptive alt attributes
4. **Uncontrolled image sizing**: Images without container constraints, stretching too wide or too tall
5. **Flat sections**: Content sections without any depth cue (no border, no background shift, no spacing) blending into the background
6. **Absent empty states**: Components that could render empty with no visual fallback
7. **CTA without breathing room**: Call-to-action sections with insufficient padding, feeling cramped
