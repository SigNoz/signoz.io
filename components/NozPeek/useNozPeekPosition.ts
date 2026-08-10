'use client'

import { useEffect, useState } from 'react'
import {
  DOC_SIDENAV_WIDTH_PX,
  DOC_TOC_WIDTH_PX,
  DOCS_CONTENT_COLUMN_ATTR,
} from '@/components/DocsTOC/docLayoutClasses'

const ARTICLE_MAX_WIDTH = 1200
/** Matches Tailwind `gap-4` between article and TOC columns. */
const ARTICLE_TOC_GAP_PX = 16
/** Matches Tailwind `lg` — TOC column is visible from this width up. */
const TOC_VISIBLE_MIN_PX = 1024

/**
 * Horizontal center for the dock.
 * - Intro: center of the content area beside the sidenav.
 * - Content pages: center of the article/prose column (excludes TOC), preferring a live DOM measure.
 */
function computeDockLeft(isIntro: boolean): number {
  if (typeof window === 'undefined') return 0
  const vw = window.innerWidth
  const isMobile = vw < 768
  const sidebar = isMobile ? 0 : DOC_SIDENAV_WIDTH_PX

  if (isIntro) {
    return sidebar + (vw - sidebar) / 2
  }

  const contentCol = document.querySelector(`[${DOCS_CONTENT_COLUMN_ATTR}]`)
  if (contentCol) {
    const r = contentCol.getBoundingClientRect()
    if (r.width > 0) return r.left + r.width / 2
  }

  // Fallback when the article column isn't mounted yet.
  const contentSectionWidth = vw - sidebar
  const shellWidth = Math.min(ARTICLE_MAX_WIDTH, contentSectionWidth)
  const shellLeft = sidebar + Math.max(0, (contentSectionWidth - shellWidth) / 2)
  const tocVisible = vw >= TOC_VISIBLE_MIN_PX
  const proseWidth = tocVisible
    ? Math.max(0, shellWidth - DOC_TOC_WIDTH_PX - ARTICLE_TOC_GAP_PX)
    : shellWidth
  return shellLeft + proseWidth / 2
}

/** Horizontal centering over the docs content column. */
export function useNozPeekPosition({
  enabled,
  isIntro,
  pathname,
}: {
  enabled: boolean
  isIntro: boolean
  pathname: string | null
}) {
  const [dockLeft, setDockLeft] = useState(0)

  useEffect(() => {
    if (!enabled) return

    const update = () => setDockLeft(computeDockLeft(isIntro))
    update()
    window.addEventListener('resize', update)

    const resizeObserver = new ResizeObserver(update)
    const observeContentCol = () => {
      const contentCol = document.querySelector(`[${DOCS_CONTENT_COLUMN_ATTR}]`)
      if (!contentCol) return
      resizeObserver.disconnect()
      resizeObserver.observe(contentCol)
    }
    observeContentCol()
    // Article column mounts after client navigations — re-measure next frame.
    const raf = window.requestAnimationFrame(() => {
      update()
      observeContentCol()
    })

    return () => {
      window.removeEventListener('resize', update)
      resizeObserver.disconnect()
      window.cancelAnimationFrame(raf)
    }
  }, [enabled, isIntro, pathname])

  return dockLeft
}
