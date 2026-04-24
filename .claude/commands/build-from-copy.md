# Build Page from Copy

Use the `signoz-feature-page-builder` skill with the **Copy-First workflow** (Workflow B).

The user will provide raw copy (all text content) and optionally a Figma file URL for assets.

Steps:
1. Analyze and classify every content block from the user's input
2. If a Figma URL is provided, fetch the file and identify exportable assets
3. Map content blocks to the best shared components based on content shape
4. Present a content map table to the user for approval before generating code
5. Generate all page files with properly sized, arranged, and spaced content
6. Flag any gaps — do not fabricate copy, stats, or claims not in the original input

Consult the copy-to-page-workflow.md reference for the full content analysis algorithm and image sizing rules.

$ARGUMENTS
