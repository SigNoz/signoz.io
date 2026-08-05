'use client'

import React, { startTransition, useEffect, useRef, useState } from 'react'
import Line from '@/components/ui/Line'

export type ComparisonColumn = {
  key: string
  cellClassName?: string
  sectionCellClassName?: string
  occludeStickyText?: boolean
}

export type ComparisonSection = {
  title: string
  id?: string
  rows: {
    feature: React.ReactNode
    cells: Record<string, React.ReactNode>
  }[]
}

type FeatureComparisonGridProps = {
  columns: ComparisonColumn[]
  sections: ComparisonSection[]
  gridClassName: string
  sectionHeadingSize?: 'sm' | 'lg'
  stickyOffset?: string
  stickyBg?: string
  stickyZIndex?: string
  overlay?: React.ReactNode
  className?: string
  featureCellClassName?: string
  featureSectionClassName?: string
  separator?: 'line' | 'border'
  separatorClassName?: string
}

const TAILWIND_TOP_SPACING_PX: Record<string, number> = {
  '0': 0,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '7': 28,
  '8': 32,
  '9': 36,
  '10': 40,
  '11': 44,
  '12': 48,
  '14': 56,
  '16': 64,
  '20': 80,
  '24': 96,
  '28': 112,
  '32': 128,
}

function parseStickyOffsetPx(stickyOffset: string): number {
  const arbitrary = stickyOffset.match(/top-\[(\d+)px\]/)
  if (arbitrary) return Number(arbitrary[1])

  const spacing = stickyOffset.match(/^top-(\d+)$/)
  if (spacing && spacing[1] in TAILWIND_TOP_SPACING_PX) {
    return TAILWIND_TOP_SPACING_PX[spacing[1]]
  }

  return 0
}

function useStickyBandTextOcclusion(
  rootRef: React.RefObject<HTMLElement | null>,
  enabled: boolean,
  stickyOffset: string
) {
  const [hiddenIds, setHiddenIds] = useState<ReadonlySet<string>>(() => new Set())

  useEffect(() => {
    if (!enabled) {
      setHiddenIds(new Set())
      return
    }

    const root = rootRef.current
    if (!root) return

    const offsetPx = parseStickyOffsetPx(stickyOffset)
    let observer: IntersectionObserver | null = null

    const connect = () => {
      observer?.disconnect()

      const targets = root.querySelectorAll<HTMLElement>('[data-occlude-sticky-text]')
      if (targets.length === 0) return

      const header = root.querySelector<HTMLElement>('[data-sticky-section-header]')
      const bandHeight = header?.getBoundingClientRect().height || 48
      const bottomInset = Math.max(0, window.innerHeight - offsetPx - bandHeight)

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
          rootMargin: `-${offsetPx}px 0px -${bottomInset}px 0px`,
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
  }, [enabled, rootRef, stickyOffset])

  return hiddenIds
}

export default function FeatureComparisonGrid({
  columns,
  sections,
  gridClassName,
  sectionHeadingSize = 'lg',
  stickyOffset = 'top-[220px]',
  stickyBg = 'bg-[#0f1013]',
  stickyZIndex = 'z-10',
  overlay,
  className,
  featureCellClassName,
  featureSectionClassName,
  separator = 'line',
  separatorClassName,
}: FeatureComparisonGridProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const usesTextOcclusion = columns.some((col) => col.occludeStickyText)
  const hiddenIds = useStickyBandTextOcclusion(rootRef, usesTextOcclusion, stickyOffset)

  const headingClass =
    sectionHeadingSize === 'lg'
      ? 'mb-3 mt-8 py-2 text-center text-sm font-medium sm:text-lg md:text-left'
      : 'py-3 text-sm font-medium leading-6 text-white'

  const renderSeparator = (occludeId?: string) => {
    const isHidden = occludeId ? hiddenIds.has(occludeId) : false
    const occludeProps = occludeId
      ? {
          'data-occlude-sticky-text': occludeId,
          style: isHidden ? ({ visibility: 'hidden' } as const) : undefined,
        }
      : {}

    if (separator === 'line') {
      return (
        <div {...occludeProps}>
          <Line />
        </div>
      )
    }

    return (
      <div
        className={`h-px w-full ${separatorClassName ?? 'bg-[var(--l1-border)]'}`}
        {...occludeProps}
      />
    )
  }

  return (
    <div ref={rootRef} className={`relative ${className ?? ''}`}>
      {overlay}

      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} id={section.id}>
          {/* Section header — occlude cols stay transparent so overlays show through */}
          <div
            data-sticky-section-header
            className={`sticky ${stickyZIndex} ${stickyOffset} ${stickyBg}`}
          >
            <div className={`grid ${gridClassName}`}>
              <div className={`${headingClass} ${featureSectionClassName ?? ''}`}>
                {section.title}
              </div>
              {columns.map((col) => (
                <div key={col.key} className={col.sectionCellClassName ?? ''} />
              ))}
            </div>
          </div>

          {renderSeparator(usesTextOcclusion ? `sep-${sectionIdx}-header` : undefined)}

          {/* Rows */}
          <div className="grid grid-cols-1">
            {section.rows.map((row, rowIdx) => (
              <div key={rowIdx}>
                <div className={`grid ${gridClassName}`}>
                  <div className={featureCellClassName}>{row.feature}</div>
                  {columns.map((col) => {
                    const occludeId = col.occludeStickyText
                      ? `${sectionIdx}-${rowIdx}-${col.key}`
                      : undefined
                    const isHidden = occludeId ? hiddenIds.has(occludeId) : false

                    return (
                      <div
                        key={col.key}
                        className={col.cellClassName}
                        data-occlude-sticky-text={occludeId}
                        style={isHidden ? { visibility: 'hidden' } : undefined}
                      >
                        {row.cells[col.key]}
                      </div>
                    )
                  })}
                </div>

                {renderSeparator(usesTextOcclusion ? `sep-${sectionIdx}-${rowIdx}` : undefined)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
