# Colors in the SigNoz Design System

## SigNoz Color Tokens

SigNoz uses custom Tailwind color tokens. All color usage should reference these tokens — never raw hex/rgb values in component code.

### Background Colors (Dark Theme)
- `bg-signoz_ink-500`: Primary page background (darkest) — used in `FeaturePageLayout`
- `bg-signoz_ink-400`: Slightly lighter background for elevated surfaces
- `bg-signoz_ink-300`: Card or section backgrounds that need subtle lift

### Text Colors
- `text-signoz_vanilla-100`: Primary text — high contrast on dark backgrounds (titles, important content)
- `text-signoz_vanilla-400`: Secondary text — muted but readable (descriptions, body text)
- `text-signoz_slate-400`: Tertiary/supporting — borders, subtle labels, muted elements

### Accent Colors
- `text-signoz_cherry-500`: Brand accent — CTAs, highlights, important indicators
- `text-signoz_robin-400`: Secondary accent — links, interactive elements, complementary highlights
- `text-signoz_sienna-100`: Warm accent — used sparingly for differentiation

### Border Colors
- `border-signoz_slate-400`: Standard border color for section dividers (with `border-dashed`)
- `border-signoz_slate-400/40` or `border-signoz_slate-400/50`: Reduced opacity borders for cards and subtle separation

## Contrast on Dark Backgrounds

Dark theme inverts many standard contrast assumptions.

### Text Contrast
- **Primary text** (`signoz_vanilla-100` on `signoz_ink-500`): High contrast — use for headings, important content
- **Secondary text** (`signoz_vanilla-400` on `signoz_ink-500`): Medium contrast — use for body text, descriptions
- **Low contrast** (`signoz_slate-400` on `signoz_ink-500`): Subtle — only for decorative or truly tertiary elements
- **Rule**: If text is hard to read, increase the vanilla shade (toward 100) rather than increasing font size

### Colored Text on Dark
- Accent colors (`cherry-500`, `robin-400`) are pre-calibrated for dark backgrounds
- Do not use very light accent shades (e.g., `cherry-100`) as text on dark — they lack sufficient contrast
- Do not use very dark accent shades — they disappear into the dark background

### Gradient Text
- `text-gradient` class: Used exclusively for hero titles — creates a white-to-purple gradient
- Do not apply gradient text to body content or card titles — reserve for hero-level emphasis

## Semantic Color Usage

### Status Colors
When displaying status, success, warning, or error states:
- **Success**: Green accent with icon — never color alone (accessibility)
- **Warning**: Yellow/amber accent with icon
- **Error/Destructive**: Cherry/red accent with icon
- **Info**: Robin/blue accent with icon

### Interactive States
- **Hover**: Slightly lighter background or subtle opacity change
- **Active/Selected**: Accent color border or background highlight
- **Disabled**: Reduced opacity (`opacity-50`) on the element

## Decorative Color Patterns

### Gradient Overlay (Page Background)
```
bg-gradient-to-b from-[rgba(190,107,241,1)] to-[rgba(69,104,220,0)]
```
This purple-to-transparent gradient blob sits behind the hero section. It uses raw rgba because it is a one-time decorative element at the layout level, not a reusable token.

### Dot Pattern
The `bg-dot-pattern masked-dots` class creates a subtle dot grid background. It is applied once in `FeaturePageLayout` — do not re-apply in inner sections.

### Accent Borders
- Add a `border-l-4 border-signoz_cherry-500` to a card for visual personality
- Use sparingly — only on cards or alerts that need to draw extra attention

## Common Issues to Flag

1. **Raw hex/rgb in components**: Colors like `text-[#ff5733]` instead of SigNoz tokens
2. **Wrong contrast pairing**: `text-signoz_vanilla-400` used where `text-signoz_vanilla-100` is needed for readability
3. **Gradient text overuse**: `text-gradient` applied beyond hero titles
4. **Missing token usage**: New colors introduced that are not part of the design system
5. **Color-only communication**: Status or state communicated solely through color without icon or text label
6. **Inconsistent accent usage**: Mixing `cherry` and `robin` accents for the same semantic purpose across a page
7. **Border opacity inconsistency**: Some card borders at `/40` and others at `/50` on the same page
