import React from 'react'
import { cn } from 'app/lib/utils'
import SectionLayout from '../SectionLayout'
import { StickyTitleSectionProps } from './StickyTitleSection.types'

const StickyTitleSection: React.FC<StickyTitleSectionProps> = ({ title, children, className }) => {
  return (
    <SectionLayout
      variant="bordered"
      className={cn('border-dashed border-[var(--l2-border)] !px-0', className)}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="!w-[100%] flex-1 md:!w-[300px]">
          <p className="sticky top-[100px] px-10 pt-10 text-4xl font-bold !leading-[3.5rem] text-[var(--l1-foreground)] sm:text-4xl md:px-0 md:pl-12">
            {title}
          </p>
        </div>
        <div className="flex-[2_2_0%]">
          <div className="border-l border-dashed border-[var(--l2-border)] bg-transparent p-0">
            <div className="flex flex-col gap-2 px-10 py-10">{children}</div>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}

export default StickyTitleSection
