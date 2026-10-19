'use client'

import React, { useEffect, useRef } from 'react'
import FeatureComparisonGrid, { FeatureComparisonGridProps } from './FeatureComparisonGrid'

type FeatureComparisonGridWithOcclusionProps = Omit<FeatureComparisonGridProps, 'rootRef'>

// Sub-pixel guard so elements that merely share an edge with a band at rest
// (e.g. the separator right below a section header) are not clipped.
const EDGE_EPSILON = 0.5

/**
 * Clips cell content that slides underneath a stuck (sticky) section-header band,
 * so occluded columns behave exactly like columns whose band cells have opaque
 * backgrounds. Works by measuring the bands' actual on-screen rects, so it is
 * correct in any scroll setup (page scroll on desktop, nested scroll container
 * on mobile).
 */
function useStickyBandTextOcclusion(rootRef: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-occlude-sticky-text]'))
    const headers = Array.from(root.querySelectorAll<HTMLElement>('[data-sticky-section-header]'))
    if (targets.length === 0 || headers.length === 0) return

    let frame = 0

    const update = () => {
      frame = 0
      const bands = headers.map((header) => header.getBoundingClientRect())

      for (const target of targets) {
        const rect = target.getBoundingClientRect()
        // Anything above a covering band's bottom edge is also covered higher up
        // (by the opaque sticky column header), so a single top inset suffices.
        let clipTop = 0
        for (const band of bands) {
          if (rect.top < band.bottom - EDGE_EPSILON && rect.bottom > band.top + EDGE_EPSILON) {
            clipTop = Math.max(clipTop, band.bottom - rect.top)
          }
        }
        target.style.clipPath = clipTop > 0 ? `inset(${clipTop}px 0 0 0)` : ''
      }
    }

    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }

    update()

    // Capture phase so scrolls of any ancestor scroll container are observed,
    // not just the window (the grid may live inside an overflow container).
    window.addEventListener('scroll', schedule, { capture: true, passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame !== 0) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule, { capture: true })
      window.removeEventListener('resize', schedule)
      for (const target of targets) target.style.clipPath = ''
    }
  }, [rootRef])
}

export default function FeatureComparisonGridWithOcclusion(
  props: FeatureComparisonGridWithOcclusionProps
) {
  const rootRef = useRef<HTMLDivElement>(null)
  useStickyBandTextOcclusion(rootRef)

  return <FeatureComparisonGrid {...props} rootRef={rootRef} />
}
