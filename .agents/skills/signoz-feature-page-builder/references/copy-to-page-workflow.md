# Copy-to-Page Workflow

Build a complete feature page from raw copy and Figma assets. The user provides all text content in a single prompt, and optionally a Figma file/frame URL for assets. This workflow analyzes the content shape, selects components, fetches/sizes assets, and outputs a production-ready page.

## Input Format

The user provides copy in any format — bullet lists, sections, headings, or freeform text. The skill must parse and classify it.

### Expected Copy Elements

| Element | How to identify | Maps to |
|---------|----------------|---------|
| Main headline | First/largest heading, benefit-focused statement | `FeaturePageHeader` title |
| Subtitle | 1-2 sentences after headline | `FeaturePageHeader` description |
| Feature blocks (title + description) | Repeated pattern of heading + paragraph | Split sections or card grid |
| Short feature points (3+) | Bullet points or short title+description pairs | `HeroCards` / `FeatureCard` grid |
| Step-by-step flow | Numbered items with sequential logic | `CarouselCards` |
| CTA text | Action phrases like "Get started", "Try now" | `ButtonGroup` buttons |
| Social proof quotes | Quoted text with attribution | `CustomerStoriesSection` |
| Metadata | SEO title, description, URL slug | `page.tsx` metadata |

## Content Analysis Algorithm

When raw copy arrives, run this analysis before writing any code:

### Step 1: Classify each content block

Read through all the copy and tag each block:

- `HERO` — The main headline and subtitle (always exactly 1)
- `FEATURE_SPLIT` — A feature with enough description for a full section (2+ sentences) that would benefit from an accompanying image
- `FEATURE_CARD` — A short feature point (title + 1-2 sentences) — best in a card grid
- `FEATURE_CAROUSEL` — Sequential steps that form a walkthrough
- `CTA` — Call-to-action text
- `META` — SEO/metadata content

### Step 2: Count and decide layout

| Content shape | Recommended layout |
|--------------|-------------------|
| 2-4 `FEATURE_SPLIT` blocks | Alternating split sections (text + image) |
| 3+ `FEATURE_CARD` blocks (short) | `HeroCards` grid (3 cols if 3/6/9 items, 2 cols if 2/4) |
| 3-5 sequential steps | `CarouselCards` with step images |
| Mix of splits + cards | Split sections first, then card grid, then CTA |
| 6+ features, all similar length | Group into 2-3 split sections + 1 card grid |

### Step 3: Arrange in page order

Always follow this arrangement:

```
1. HERO → FeaturePageHeader
2. Primary FEATURE_SPLIT sections (alternating left/right) → GridLayout split
3. FEATURE_CARD group (if any) → HeroCards grid
4. Secondary FEATURE_SPLIT sections → GridLayout split
5. FEATURE_CAROUSEL (if any) → CarouselCards
6. CTA → CTA Banner
7. UsageBasedPricing (auto-added)
8. SigNozStats (auto-added)
9. CustomerStoriesSection (auto-added)
```

**Arrangement heuristics:**
- Lead with the strongest/most differentiating feature split
- Place card grids after 2-3 split sections to break the alternating rhythm
- Carousel works best in the middle — after users understand the feature, before the CTA
- End feature content with the CTA banner before pricing

### Step 4: Size and distribute copy

**Title sizing:**
- Hero title: Keep under 8 words. If the provided headline is longer, tighten it.
- Section titles: Keep under 10 words. Verb-led preferred.
- Card titles: Keep under 6 words.

**Description sizing:**
- Hero description: 1-2 sentences, under 30 words.
- Split section descriptions: 2-4 sentences. If longer, break into a lead paragraph + bullet list.
- Card descriptions: 1-3 sentences, roughly equal length across all cards in a grid.

**If copy is too long for a section:** Split into primary text (in the section) and supporting details (as cards below).
**If copy is too short:** Flag to the user — do not fabricate content.

## Figma Asset Integration

### Fetching Assets from Figma

When the user provides a Figma URL:

1. **Fetch the Figma file/frame** using Figma MCP tools or `WebFetch` for Figma URLs
2. **Identify exportable assets**: Look for frames named with export intent (e.g., `hero-image`, `step-1`, `feature-screenshot`)
3. **Export at appropriate sizes**: Request 2x exports for retina quality
4. **Download and place** in `public/img/<feature-name>/`

### Asset-to-Section Mapping

| Asset type | Naming convention | Maps to |
|-----------|-------------------|---------|
| Hero/banner image | `hero.webp` or `<feature>-hero.webp` | `FeaturePageHeader` heroImage |
| Feature screenshot | `feature-<name>.png` | Split section image column |
| Step screenshot | `step-<n>-<name>.png` | CarouselCards item image |
| OG/meta image | `<Feature>Meta.webp` (1200x630) | `page.tsx` metadata |
| Icon/illustration | Individual component icons | Card icon slots (prefer lucide-react) |

### Image Sizing Rules

**Split section images (text + image layout):**
- Image fills its grid column (~50% of 80vw container)
- Use the standard `width={10000} height={10000}` pattern — the container constrains it
- Aspect ratio: Landscape preferred (16:9 or 4:3). Portrait screenshots may need cropping.
- If image is too tall for the text beside it, crop to the most relevant portion

**Carousel images:**
- All carousel images must be the same aspect ratio for smooth transitions
- Landscape 16:9 preferred
- Resolution: At least 800px wide for clarity in the carousel panel

**Hero images:**
- Wide format, typically the full product UI
- Placed below the hero text/buttons
- Should show the feature in action

**Card icons:**
- Prefer `lucide-react` icons over custom assets for cards
- If Figma provides custom icons, export as SVG and create React components
- Standard size: 24px (default lucide size)

### When No Figma Assets Are Available

If the user provides copy but no assets:
1. Use `lucide-react` icons for card grids
2. Add placeholder image paths with TODO comments: `{/* TODO: Add product screenshot */}`
3. Flag which sections need images and describe what the ideal screenshot would show
4. The page remains structurally complete — images can be dropped in later

## Output Behavior

After analyzing copy and assets, output:

1. **Content map** — Show the user how their copy was classified and arranged (brief table)
2. **Component choices** — Which shared components are used and why
3. **Image assignments** — Which Figma asset maps to which section
4. **Then generate the full page files** — `page.tsx`, `<Feature>Page.tsx`, `<Feature>Page.constants.tsx`
5. **Flag gaps** — Any sections that need more copy, missing images, or decisions from the user

Do not fabricate copy, statistics, or claims that weren't in the original input. If content is needed to fill a section, ask the user.
