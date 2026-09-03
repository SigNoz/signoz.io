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

const DOC_SIDENAV_RAIL_BASE_CLASSES =
  'box-border w-80 min-w-[320px] max-w-[320px] self-stretch border-r border-[var(--l1-border)] bg-[var(--l1-background)]'

export const DOC_SIDENAV_CLASSES = `${DOC_SIDENAV_RAIL_BASE_CLASSES} max-md:hidden`

/** OTel hub keeps its sidebar hidden below lg (mobile uses the See All Guides overlay). */
export const HUB_SIDENAV_CLASSES = `${DOC_SIDENAV_RAIL_BASE_CLASSES} max-lg:hidden`

/** Sticky nav column inside the sidenav rail. */
export const DOC_SIDENAV_NAV_CLASSES =
  'docs-sidebar sticky top-[56px] flex h-[calc(100vh-56px)] w-full flex-col overflow-hidden text-[var(--l1-foreground)]'

/** Pinned block above the sidenav scroll area (region / language selector). */
export const DOC_SIDENAV_PINNED_CLASSES =
  'relative z-10 shrink-0 bg-[var(--l1-background)] shadow-[0_8px_16px_-6px_color-mix(in_srgb,var(--base-black)_55%,transparent)]'

export const DOC_SIDENAV_SCROLL_BASE_CLASSES = 'docs-sidebar-scroll min-h-0 flex-1 overflow-y-auto'

/** Centered content area to the right of the sidenav rail. */
export const DOC_CONTENT_CENTER_CLASSES =
  'flex min-w-0 flex-[1_1_auto] justify-center overflow-clip'

export const DOC_CONTENT_COLUMN_CLASSES =
  'box-border w-full max-w-[1200px] px-4 py-6 [&_details+details]:mt-8'

/** Row holding the article column and the right TOC rail. */
export const DOC_CONTENT_ROW_CLASSES = 'mx-auto flex h-full w-full max-w-ot-hub items-start gap-4'
