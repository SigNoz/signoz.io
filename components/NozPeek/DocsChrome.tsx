'use client'

import NozPeekDock from './NozPeekDock'
import DocsFooter from '@/components/DocsFooter/DocsFooter'

/**
 * Shared docs chrome that must not remount on intro ↔ article navigations:
 * Noz-peek dock + docs footer.
 */
export default function DocsChrome() {
  return (
    <>
      <NozPeekDock />
      <DocsFooter />
    </>
  )
}
