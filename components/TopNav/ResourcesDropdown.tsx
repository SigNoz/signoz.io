'use client'

import { useState } from 'react'
import { Button } from '@headlessui/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import TrackingLink from '@/components/TrackingLink'
import {
  resourcesDropdownItems,
  ResourceItem,
  POPOVER_CONTENT_CLASS,
  SECTION_HEADING_CLASS,
} from './constants'

export default function ResourcesDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

  return (
    <div
      onPointerEnter={() => setIsOpen(true)}
      onPointerLeave={() => setIsOpen(false)}
      className="flex items-center"
    >
      <Popover.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) setIsOpen(false)
        }}
        modal={false}
      >
        <Popover.Trigger asChild>
          <Button className="truncate px-1.5 py-1 text-sm outline-none hover:text-signoz_robin-500">
            <div className="flex items-center">
              Resources
              <ChevronDown
                size={12}
                className={`ml-1 transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>
          </Button>
        </Popover.Trigger>
        <Popover.Content
          side="bottom"
          align="start"
          sideOffset={4}
          className={POPOVER_CONTENT_CLASS}
        >
          <div className="flex min-w-0 flex-row">
            <ResourceSection title="Learn" items={resourcesDropdownItems.learn} onClose={close} />
            <ResourceSection
              title="Explore"
              items={resourcesDropdownItems.explore}
              onClose={close}
            />
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}

function ResourceSection({
  title,
  items,
  onClose,
}: {
  title: string
  items: ResourceItem[]
  onClose: () => void
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-y-4 p-6">
      <div className={SECTION_HEADING_CLASS}>{title}</div>
      <div className="grid grid-cols-1 gap-x-3 gap-y-5">
        {items.map((item) => (
          <TrackingLink
            href={item.url}
            className="group flex h-auto items-center gap-4"
            key={item.key}
            clickType="Nav Click"
            clickName={`${item.name} Link`}
            clickText={item.name}
            clickLocation="Top Navbar"
            onClick={onClose}
            prefetch={false}
          >
            <div>
              <div className="flex flex-row items-center gap-1">
                <span>{item.name}</span>{' '}
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100" />
              </div>
              <div className="line-clamp-2 max-w-[274px] text-xs text-signoz_vanilla-400 group-hover:text-[#FFF]">
                {item.description}
              </div>
            </div>
          </TrackingLink>
        ))}
      </div>
    </div>
  )
}
