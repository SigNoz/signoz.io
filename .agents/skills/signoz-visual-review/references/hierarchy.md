# Visual Hierarchy on Dark Backgrounds

Visual hierarchy determines how important elements appear in relation to one another. On SigNoz's dark-themed pages, hierarchy is the most effective tool for making a design feel professional and guiding the user's eye.

## Strategies for Hierarchy

### 1. Weight and Opacity Over Size

Do not rely solely on font size to denote importance. On dark backgrounds, opacity and weight differences are more effective than size changes.

- **Weight**: Primary text at `font-semibold` (600) or `font-bold` (700). Secondary text at `font-normal` (400). Avoid weights below 400 on dark backgrounds — thin text loses readability.
- **Color/opacity (Tailwind)**: Primary content in `text-signoz_vanilla-100` (bright). Secondary content in `text-signoz_vanilla-400` (muted). Tertiary in `text-signoz_slate-400`.
- **Color/opacity (CSS modules)**: Primary content at full white (`color: inherit`). Secondary content at `color: rgba(255, 255, 255, 0.75)`. Tertiary at `color: rgba(255, 255, 255, 0.55)`. This is the single most impactful change for pages using CSS modules — description text that matches title brightness creates visual noise.
- **Example (Tailwind)**: A section title at `text-2xl font-semibold text-signoz_vanilla-100` with a description at `text-base font-normal text-signoz_vanilla-400 leading-relaxed` creates clear separation without size excess.
- **Example (CSS module)**: A section title at `font-weight: 600; font-size: 1.5rem` with a description at `font-weight: 400; font-size: 1rem; color: rgba(255,255,255,0.75); line-height: 170%` — the opacity difference does the heavy lifting.

### 2. De-emphasize to Emphasize

If a primary element does not stand out, do not make it louder. Instead, weaken the competing elements.

- **Reduce competing backgrounds**: If a sidebar or secondary section draws too much attention, simplify its background or reduce its border weight.
- **Mute inactive elements**: Navigation items, inactive tabs, and supporting labels should use `text-signoz_vanilla-400` or lighter, not full `text-signoz_vanilla-100`.
- **SigNoz pattern**: The `FeaturePageHeader` title uses `text-gradient` (gradient from white/purple) to command attention while body text stays in muted `text-signoz_vanilla-400`.

### 3. Label Treatment

Avoid `Label: Value` formats where context makes the label obvious.

- **Combine**: Instead of "Duration: 120ms", present "120ms duration" or just "120ms" if the column heading provides context.
- **Context**: If the visual position or icon already communicates meaning, the label is redundant.
- **When required**: Treat labels as supporting content — smaller, lighter weight (`text-sm text-signoz_vanilla-400 uppercase tracking-wider`), and emphasize the data value.

### 4. Button Hierarchy

Design buttons by their importance in the action flow, not their semantic meaning.

- **Primary action**: Solid background, high contrast — `Button variant="default"` (SigNoz default button style).
- **Secondary action**: Outline or lower contrast — `Button variant="secondary"`.
- **Tertiary action**: Text link style with `ArrowRight` icon.
- **Destructive actions**: Only use warning colors when the destructive action is the *primary* action (e.g., in a confirmation modal). In a list of actions, a "Delete" button should be secondary/tertiary.
- **SigNoz pattern**: Feature pages use `ButtonGroup` with primary + secondary buttons. Primary CTA is always first ("Start your free trial"), secondary is informational ("Read Documentation").

### 5. Section Title Hierarchy

Section titles in feature pages are labels for the content below — they should orient, not dominate.

- **Section titles**: `text-signoz_vanilla-100` with `mb-6` spacing, sized appropriately (usually `h2` default or `text-2xl`).
- **Hero titles**: Larger, gradient text — the only place where oversized text is appropriate.
- **Card titles**: `font-semibold text-signoz_vanilla-100` at the default or slightly larger size.

### 6. Balancing Icon Weight

Icons from `lucide-react` are visually heavier than text due to solid stroke weight.

- **Soften icon color**: Use `text-signoz_vanilla-400` or an accent color at lower opacity for icons next to text.
- **Icon containers**: When icons appear in cards (`FeatureCard`, `IconTitleDescriptionCard`), the icon serves as a visual anchor — it can use accent colors like `text-signoz_cherry-500` or `text-signoz_robin-400`.
- **Size balance**: Icons in card grids typically use the default lucide size (24px). Do not scale icons up to fill space — wrap them in a colored circle/shape instead.
