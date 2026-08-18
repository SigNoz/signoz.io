'use client'

import NozPeekDock from './NozPeekDock'

/**
 * Shared docs chrome that must not remount on intro ↔ article navigations.
 * Site footer is rendered inside DocsShell (content column), not under the sidenav.
 */
export default function DocsChrome() {
  return <NozPeekDock />
}
