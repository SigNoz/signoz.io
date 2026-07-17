'use client'

import NozPeekDock from './NozPeekDock'

/**
 * Shared docs chrome that must not remount on intro ↔ article navigations.
 * Site footer is MainFooter (rising-pill links) from the root layout.
 */
export default function DocsChrome() {
  return <NozPeekDock />
}
