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

### Prerequisites: Figma MCP Setup

Before fetching assets, verify Figma MCP is available. Check for tools prefixed with `mcp__figma` (e.g., `mcp__figma__get_file`, `mcp__figma_developer__get_file`).

**If no Figma MCP tools are found**, instruct the user:

```
No Figma MCP is configured. To enable Figma asset fetching, add one:

Option A (Figma Developer MCP — recommended):
  claude mcp add figma-developer -- npx -y figma-developer-mcp --figma-api-key=<YOUR_KEY>

Option B (Framelink Figma MCP):
  claude mcp add figma -- npx -y @anthropic-ai/framelink-figma-mcp --figma-api-key=<YOUR_KEY>

Get your API key from: Figma > Settings > Personal Access Tokens
```

Do NOT proceed with asset fetching until the MCP is confirmed working.

### Auto-Discovery: Finding Nodes Without IDs

The user will provide a Figma file URL — never ask for node IDs. Discover them automatically:

**Step 1: Parse the Figma URL**

Extract the file key and optional node-id from the URL:
- `https://www.figma.com/design/<fileKey>/<name>` → whole file
- `https://www.figma.com/design/<fileKey>/<name>?node-id=<nodeId>` → specific frame/page

**Step 2: Fetch the file tree**

Use the Figma MCP `get_file` tool (or equivalent) with the file key. This returns the full document tree with all pages, frames, groups, and components.

**Step 3: Walk the tree and identify exportable assets**

Traverse the document tree and collect all nodes of type `FRAME`, `GROUP`, or `COMPONENT` that match export patterns:

| Name pattern (case-insensitive) | Asset type | Export scale | Final format |
|-------------------------------|------------|-------------|-------------|
| `*hero*`, `*header*`, `*banner*` | Hero image | **4x PNG** | WebP |
| `*feature*`, `*section*`, `*screenshot*` | Feature screenshot | 2x PNG | WebP |
| `*step*`, `*carousel*`, `*slide*` | Carousel step | 2x PNG | WebP |
| `*icon*`, `*logo*` (small frames) | Icon | 2x SVG preferred, PNG fallback | SVG or WebP |
| `*og*`, `*meta*`, `*social*` | OG image | 2x PNG | WebP (1200x630) |
| `*graphic*` | Graphic/illustration | 4x PNG | WebP |
| Any other named frame at top level | General asset | 2x PNG | WebP |

**Important:** Export **groups** as single flattened images, not individual children. When a Figma node is a GROUP (like "feature-graphic-hero" in the screenshot), export the entire group as one image. The MCP's `get_images` / `export` tool handles this — pass the group's node ID.

**Step 4: Present discovered assets to the user**

Before exporting, show a table of discovered assets:

```
Found 5 exportable assets in Figma file:

| # | Node name              | Type  | Export as         | Maps to            |
|---|------------------------|-------|-------------------|--------------------|
| 1 | feature-graphic-hero   | GROUP | 4x PNG → WebP    | Hero image         |
| 2 | logs-explorer-screenshot | FRAME | 2x PNG → WebP  | Feature section 1  |
| 3 | step-1-create-pipeline | FRAME | 2x PNG → WebP    | Carousel step 1    |
| 4 | step-2-filter-logs     | FRAME | 2x PNG → WebP    | Carousel step 2    |
| 5 | og-card                | FRAME | 2x PNG → WebP    | OG meta image      |

Proceed with export? (or specify changes)
```

Wait for user confirmation before exporting.

### Exporting Assets from Figma

**Step 1: Export via MCP**

Use the Figma MCP image export tool. Common tool signatures:

```
# Figma Developer MCP
get_images(fileKey, ids: [nodeId1, nodeId2], scale: 4, format: "png")

# Framelink MCP
export_node(file_key, node_id, scale: 4, format: "png")
```

**Export rules by asset type:**

| Asset type | Scale | Format | Reason |
|-----------|-------|--------|--------|
| Hero / header / banner / graphic | **4x** | PNG | High-res hero needs maximum clarity |
| Feature screenshots | 2x | PNG | Retina quality |
| Carousel steps | 2x | PNG | Retina quality |
| Icons (small) | 2x | SVG (preferred) or PNG | Vector stays sharp at any size |
| OG/meta images | 2x | PNG | Will be resized to 1200x630 |

**Step 2: Download exported images**

The MCP returns image URLs. Download each one:

```bash
curl -L -o public/img/<feature-name>/<asset-name>.png "<figma-export-url>"
```

**Step 3: Convert PNG → WebP**

Use macOS `sips` (always available) for conversion:

```bash
# Hero image: exported at 4x PNG, convert to WebP
sips -s format webp public/img/<feature-name>/hero.png --out public/img/<feature-name>/hero.webp

# Feature screenshots: 2x PNG → WebP
sips -s format webp public/img/<feature-name>/feature-logs.png --out public/img/<feature-name>/feature-logs.webp

# Remove original PNGs after WebP conversion
rm public/img/<feature-name>/*.png
```

**If `sips` doesn't support WebP** (older macOS), fall back to:
```bash
# Install cwebp if needed
brew install webp
cwebp -q 90 input.png -o output.webp
```

### Asset-to-Section Mapping

| Asset type | File naming | Maps to |
|-----------|-------------|---------|
| Hero/banner/graphic image | `<feature>-hero.webp` | `FeaturePageHeader` heroImage |
| Feature screenshot | `feature-<name>.webp` | Split section image column |
| Step screenshot | `step-<n>-<name>.webp` | CarouselCards item image |
| OG/meta image | `<Feature>Meta.webp` (1200x630) | `page.tsx` metadata |
| Icon/illustration | `icon-<name>.svg` | Card icon slots (prefer lucide-react) |

### Image Sizing Rules

**Hero images (exported at 4x):**
- Wide format, typically the full product UI or a graphic illustration
- The 4x export ensures crisp rendering on all displays including 3x retina
- Placed below the hero text/buttons
- Should show the feature in action
- Final WebP keeps the full resolution — Next.js `<Image>` handles responsive sizing

**Split section images (text + image layout):**
- Image fills its grid column (~50% of 80vw container)
- Use the standard `width={10000} height={10000}` pattern — the container constrains it
- Aspect ratio: Landscape preferred (16:9 or 4:3). Portrait screenshots may need cropping.
- If image is too tall for the text beside it, crop to the most relevant portion

**Carousel images:**
- All carousel images must be the same aspect ratio for smooth transitions
- Landscape 16:9 preferred
- Resolution: At least 800px wide for clarity in the carousel panel

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
