'use client'

import { Button } from '@headlessui/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import { productDropdownItems, SECTION_HEADING_CLASS } from './constants'
import { useNavDropdown } from './NavDropdownContext'

export default function ProductDropdown() {
  const { isOpen, open, close, triggerRef } = useNavDropdown('product')

  return (
    <div onPointerEnter={open} onPointerLeave={close} className="flex items-center">
      <Button
        ref={triggerRef}
        className="truncate rounded-full px-2.5 py-1 text-sm outline-none transition-colors hover:bg-signoz_robin-200/20"
        onClick={() => (isOpen ? close() : open())}
      >
        <div className="flex items-center">
          Product
          <ChevronDown
            size={12}
            className={`ml-1 transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </div>
      </Button>
    </div>
  )
}

export function ProductDropdownContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-y-4 p-6">
      <div className={SECTION_HEADING_CLASS}>Product Modules</div>
      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-x-0 gap-y-4">
        {productDropdownItems.map((item) => (
          <TrackingLink
            href={item.url || ''}
            disabled={item.url === undefined}
            className={`group flex h-auto min-w-0 items-start gap-2 ${item.url === undefined ? 'cursor-not-allowed opacity-80' : ''}`}
            key={item.key}
            clickType="Nav Click"
            clickName={`${item.name} Product Link`}
            clickText={item.name}
            clickLocation="Top Navbar"
            onClick={onClose}
            prefetch={false}
          >
            {item.icon}
            <div className="min-w-0">
              <div className="flex flex-row items-center gap-1">
                <span className="text-sm">{item.name}</span>{' '}
                <ArrowRight size={14} className="shrink-0 opacity-0 group-hover:opacity-100" />
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
