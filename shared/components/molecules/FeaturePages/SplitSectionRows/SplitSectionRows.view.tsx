import React from 'react'
import Divider from '../Divider'
import SplitSection from '../SplitSection'
import { SplitSectionPanel } from '../SplitSection/SplitSection.types'
import { SplitSectionRowsProps } from './SplitSectionRows.types'

const SplitSectionRows: React.FC<SplitSectionRowsProps> = ({ panels, imageClassName }) => {
  const rows: Array<[number, number]> = []
  for (let i = 0; i < panels.length; i += 2) {
    rows.push([i, i + 1])
  }

  return (
    <>
      {rows.map(([leftIndex, rightIndex], rowIndex) => {
        const left = panels[leftIndex]
        const right: SplitSectionPanel | undefined = panels[rightIndex]

        return (
          <React.Fragment key={leftIndex}>
            {rowIndex > 0 && <Divider />}
            <SplitSection
              alignImages
              left={{ ...left, imageClassName }}
              right={right ? { ...right, imageClassName } : <div />}
              withVerticalDivider={Boolean(right)}
            />
          </React.Fragment>
        )
      })}
    </>
  )
}

export default SplitSectionRows
