import React from 'react'
import Line from '@/components/ui/Line'

export type ComparisonColumn = {
  key: string
  cellClassName?: string
  sectionCellClassName?: string
  occludeStickyText?: boolean
  stickyOcclusionClassName?: string
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
}: FeatureComparisonGridProps) {
  const headingClass =
    sectionHeadingSize === 'lg'
      ? 'mb-3 mt-8 py-2 text-center text-sm font-medium sm:text-lg md:text-left'
      : 'py-3 text-sm font-medium leading-6 text-white'

  return (
    <div className={`relative ${className ?? ''}`}>
      {overlay}

      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} id={section.id}>
          {/* Section header */}
          <div className={`sticky ${stickyZIndex} ${stickyOffset} ${stickyBg}`}>
            <div className={`grid ${gridClassName}`}>
              <div className={`${headingClass} ${featureSectionClassName ?? ''}`}>
                {section.title}
              </div>
              {columns.map((col) => (
                <div
                  key={col.key}
                  className={[
                    col.sectionCellClassName,
                    col.occludeStickyText ? col.stickyOcclusionClassName : undefined,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                />
              ))}
            </div>
          </div>

          {separator === 'line' ? <Line /> : <div className="h-px w-full bg-[#23262e]" />}

          {/* Rows */}
          <div className="grid grid-cols-1">
            {section.rows.map((row, rowIdx) => (
              <div key={rowIdx}>
                <div className={`grid ${gridClassName}`}>
                  <div className={featureCellClassName}>{row.feature}</div>
                  {columns.map((col) => (
                    <div key={col.key} className={col.cellClassName}>
                      {row.cells[col.key]}
                    </div>
                  ))}
                </div>

                {separator === 'line' ? <Line /> : <div className="h-px w-full bg-[#23262e]" />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
