/** Shared Tailwind class strings for the docs three-column layout. */

/**
 * Outer sticky rail: hugs content when short; caps at viewport when tall.
 * `-mt-6` cancels the docs content column `py-6` so the rail aligns with the
 * sticky top offset and `max-h` fits the visible viewport (keeps Edit / Last
 * updated on-screen). Only the TOC list inside scrolls when content overflows.
 */
export const DOC_TOC_CLASSES =
  'sticky top-[48px] -mt-6 box-border flex max-h-[calc(100vh-48px)] w-80 min-w-[320px] max-w-[320px] flex-[0_0_320px] flex-col self-start overflow-hidden px-4 py-4 max-lg:!hidden'

export const DOC_SIDENAV_CLASSES =
  'box-border w-80 min-w-[320px] max-w-[320px] self-stretch border-r border-signoz_slate-500 max-md:hidden'
