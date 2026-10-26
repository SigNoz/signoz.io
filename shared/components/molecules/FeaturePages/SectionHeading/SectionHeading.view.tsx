import React from 'react'
import { cn } from 'app/lib/utils'
import { SectionHeadingProps } from './SectionHeading.types'

const SectionHeading: React.FC<SectionHeadingProps> = ({ children, className }) => {
  return (
    <div className={cn('bg-heading-dot-grid', className)}>
      <div className="flex flex-col items-center justify-center py-28 text-center">
        <h2 className="m-0 max-w-4xl text-4xl font-semibold leading-[3.25rem] text-[var(--callout-sienna-title)] lg:text-[44px]">
          {children}
        </h2>
      </div>
    </div>
  )
}

export default SectionHeading
