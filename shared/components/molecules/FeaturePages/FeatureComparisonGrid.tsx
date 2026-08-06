import React from 'react'
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

export type FeatureComparisonGridProps = {
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
  rootRef?: React.Ref<HTMLDivElement>
  hiddenIds?: ReadonlySet<string>
}

const EMPTY_HIDDEN_IDS: ReadonlySet<string> = new Set()

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
  rootRef,
  hiddenIds = EMPTY_HIDDEN_IDS,
}: FeatureComparisonGridProps) {
  const usesTextOcclusion = columns.some((col) => col.occludeStickyText)

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
