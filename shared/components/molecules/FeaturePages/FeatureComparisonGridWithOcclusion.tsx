'use client'

import React, { startTransition, useEffect, useRef, useState } from 'react'
import FeatureComparisonGrid, { FeatureComparisonGridProps } from './FeatureComparisonGrid'

type FeatureComparisonGridWithOcclusionProps = Omit<
  FeatureComparisonGridProps,
  'rootRef' | 'hiddenIds'
> & {
  stickyOffsetPx: number
}

function useStickyBandTextOcclusion(
  rootRef: React.RefObject<HTMLDivElement | null>,
  stickyOffsetPx: number
) {
  const [hiddenIds, setHiddenIds] = useState<ReadonlySet<string>>(() => new Set())

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let observer: IntersectionObserver | null = null

    const connect = () => {
      observer?.disconnect()

      const targets = root.querySelectorAll<HTMLElement>('[data-occlude-sticky-text]')
      if (targets.length === 0) return

      const header = root.querySelector<HTMLElement>('[data-sticky-section-header]')
      if (!header) return

      const bandHeight = header.getBoundingClientRect().height
      const bottomInset = Math.max(0, window.innerHeight - stickyOffsetPx - bandHeight)

      observer = new IntersectionObserver(
        (entries) => {
          startTransition(() => {
            setHiddenIds((prev) => {
              let changed = false
              const next = new Set(prev)
              for (const entry of entries) {
                const id = (entry.target as HTMLElement).dataset.occludeStickyText
                if (!id) continue
                if (entry.isIntersecting) {
                  if (!next.has(id)) {
                    next.add(id)
                    changed = true
                  }
                } else if (next.delete(id)) {
                  changed = true
                }
              }
              return changed ? next : prev
            })
          })
        },
        {
          root: null,
          rootMargin: `-${stickyOffsetPx}px 0px -${bottomInset}px 0px`,
          threshold: 0,
        }
      )

      targets.forEach((target) => observer?.observe(target))
    }

    connect()

    const onResize = () => connect()
    window.addEventListener('resize', onResize)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [rootRef, stickyOffsetPx])

  return hiddenIds
}

export default function FeatureComparisonGridWithOcclusion({
  stickyOffsetPx,
  ...props
}: FeatureComparisonGridWithOcclusionProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const hiddenIds = useStickyBandTextOcclusion(rootRef, stickyOffsetPx)

  return <FeatureComparisonGrid {...props} rootRef={rootRef} hiddenIds={hiddenIds} />
}
