# Build Page from Copy

Use the `signoz-feature-page-builder` skill with the **Copy-First workflow** (Workflow B).

The user will provide raw copy (all text content) and optionally a Figma file URL for assets.

Steps:
1. Analyze and classify every content block from the user's input
2. If a Figma URL is provided:
   a. Verify Figma MCP is configured (look for `mcp__figma*` tools). If not found, prompt the user to add it with `claude mcp add` before proceeding.
   b. Parse the Figma URL to extract the file key
   c. Fetch the file tree via MCP and auto-discover all exportable frames/groups — do NOT ask the user for node IDs
   d. Present discovered assets in a table for user confirmation
   e. Export assets: hero/header/graphic groups at **4x PNG**, all others at 2x PNG
   f. Convert all PNGs to WebP using `sips -s format webp` (macOS native)
   g. Place final WebP files in `public/img/<feature-name>/`
3. Map content blocks to the best shared components based on content shape
4. Present a content map table (copy classification + asset mapping) for approval before generating code
5. Generate all page files with properly sized, arranged, and spaced content
6. Flag any gaps — do not fabricate copy, stats, or claims not in the original input

Consult the copy-to-page-workflow.md reference for the full content analysis algorithm, Figma auto-discovery rules, and image sizing rules.

$ARGUMENTS
