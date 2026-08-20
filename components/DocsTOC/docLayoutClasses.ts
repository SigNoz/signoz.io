/** Shared Tailwind class strings for the docs three-column layout. */

/** Pixel width of the docs left sidenav (`w-80`). Keep in sync with the classes below. */
export const DOC_SIDENAV_WIDTH_PX = 320
export const DOC_TOC_WIDTH_PX = 320
export const DOCS_CONTENT_COLUMN_ATTR = 'data-docs-content-column'

/**
 * Outer sticky rail: hugs content when short; caps at viewport when tall.
 * `-mt-6` cancels the docs content column `py-6` so the rail aligns with the
 * sticky top offset and `max-h` fits the visible viewport (keeps Edit / Last
 * updated on-screen). Only the TOC list inside scrolls when content overflows.
 */
export const DOC_TOC_CLASSES =
  'sticky top-[48px] -mt-6 box-border flex max-h-[calc(100vh-48px)] w-80 min-w-[320px] max-w-[320px] flex-[0_0_320px] flex-col self-start overflow-hidden px-4 py-4 max-lg:!hidden'

export const DOC_SIDENAV_CLASSES =
  'box-border w-80 min-w-[320px] max-w-[320px] self-stretch border-r border-[var(--l1-border)] bg-[var(--l1-background)] max-md:hidden'
