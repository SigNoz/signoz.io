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
    markdownFeature?: string
    markdownCells?: Record<string, string>
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
  /** Column labels for agent markdown; when set, sections render as data-md-table grids. */
  markdownColumnLabels?: string[]
  separatorClassName?: string
  rootRef?: React.Ref<HTMLDivElement>
}

export default function FeatureComparisonGrid({
  columns,
  sections,
  gridClassName,
  sectionHeadingSize = 'lg',
  stickyOffset = 'top-[220px]',
  stickyBg = 'bg-[var(--l2-background)]',
  stickyZIndex = 'z-10',
  overlay,
  className,
  featureCellClassName,
  featureSectionClassName,
  separator = 'line',
  markdownColumnLabels,
  separatorClassName,
  rootRef,
}: FeatureComparisonGridProps) {
  const markdownTableHeader = markdownColumnLabels?.join('|')
  const usesTextOcclusion = columns.some((col) => col.occludeStickyText)

  const headingClass =
    sectionHeadingSize === 'lg'
      ? 'mb-3 mt-8 py-2 text-center text-sm font-medium sm:text-lg md:text-left'
      : 'py-3 text-sm font-medium leading-6 text-[var(--l1-foreground)]'

  const renderSeparator = (occludeId?: string) => {
    const occludeProps = occludeId ? { 'data-occlude-sticky-text': occludeId } : {}

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
          <div
            className="grid grid-cols-1"
            {...(markdownTableHeader ? { 'data-md-table': markdownTableHeader } : {})}
          >
            {section.rows.map((row, rowIdx) => (
              <div key={rowIdx}>
                <div
                  className={`grid ${gridClassName}`}
                  {...(markdownTableHeader ? { 'data-md-row': '' } : {})}
                >
                  <div
                    className={featureCellClassName}
                    {...(markdownTableHeader ? { 'data-md-cell': row.markdownFeature ?? '' } : {})}
                  >
                    {row.feature}
                  </div>
                  {columns.map((col) => (
                    <div
                      key={col.key}
                      className={col.cellClassName}
                      data-occlude-sticky-text={
                        col.occludeStickyText ? `${sectionIdx}-${rowIdx}-${col.key}` : undefined
                      }
                      {...(markdownTableHeader
                        ? { 'data-md-cell': row.markdownCells?.[col.key] ?? '' }
                        : {})}
                    >
                      {row.cells[col.key]}
                    </div>
                  ))}
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
