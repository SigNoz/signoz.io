'use client'

import { Button } from '@headlessui/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import { resourcesDropdownItems, ResourceItem, SECTION_HEADING_CLASS } from './constants'
import { useNavDropdown } from './NavDropdownContext'

export default function ResourcesDropdown() {
  const { isOpen, open, close, triggerRef } = useNavDropdown('resources')

  return (
    <div onPointerEnter={open} onPointerLeave={close} className="flex items-center">
      <Button
        ref={triggerRef}
        className="hover:bg-robin-200/20 truncate rounded-full px-2.5 py-1 text-sm transition-colors outline-none"
        onClick={() => (isOpen ? close() : open())}
      >
        <div className="flex items-center">
          Resources
          <ChevronDown
            size={12}
            className={`ml-1 transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </div>
      </Button>
    </div>
  )
}

export function ResourcesDropdownContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex min-w-0 flex-row">
      <ResourceSection title="Learn" items={resourcesDropdownItems.learn} onClose={onClose} />
      <ResourceSection title="Explore" items={resourcesDropdownItems.explore} onClose={onClose} />
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
              <div className="text-muted-foreground group-hover:text-foreground line-clamp-2 max-w-[274px] text-xs">
                {item.description}
              </div>
            </div>
          </TrackingLink>
        ))}
      </div>
    </div>
  )
}
