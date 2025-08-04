import React from 'react'
import { Color } from '@signozhq/design-tokens'
import ModuleNavItems from './ModuleNavItems'
import { resourcesDropdownItems } from './constants'

interface Props {
  handleResourcesDropdownClick?: () => void
}

export default function ResourcesPopoverContent({
  handleResourcesDropdownClick = () => {},
}: Props) {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col gap-y-4 p-6">
        <div
          className={`text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-[${Color.BG_SLATE_50}]`}
        >
          Learn
        </div>
        <div className="grid grid-cols-1 gap-x-3 gap-y-5">
          <ModuleNavItems
            items={resourcesDropdownItems.learn}
            handleDropdownClick={handleResourcesDropdownClick}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-4 p-6">
        <div
          className={`text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-[${Color.BG_SLATE_50}]`}
        >
          Explore
        </div>
        <div className="grid grid-cols-1 gap-x-3 gap-y-5">
          <ModuleNavItems
            items={resourcesDropdownItems.explore}
            handleDropdownClick={handleResourcesDropdownClick}
          />
        </div>
      </div>
    </div>
  )
} 