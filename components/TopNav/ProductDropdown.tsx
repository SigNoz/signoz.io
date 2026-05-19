'use client'

import { Button } from '@headlessui/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import TrackingLink from '@/components/TrackingLink'
import { productDropdownItems, POPOVER_CONTENT_CLASS, SECTION_HEADING_CLASS } from './constants'
import { useNavDropdown } from './NavDropdownContext'

export default function ProductDropdown() {
  const { isOpen, open, close } = useNavDropdown('product')

  return (
    <div onPointerEnter={open} onPointerLeave={close} className="flex items-center">
      <Popover.Root
        open={isOpen}
        onOpenChange={(o) => {
          if (!o) close()
        }}
        modal={false}
      >
        <Popover.Trigger asChild>
          <Button className="truncate px-1.5 py-1 text-sm outline-none hover:text-signoz_robin-500">
            <div className="flex items-center">
              Product
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
          <ProductModulesSection onClose={close} />
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}

function ProductModulesSection({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-y-4 p-6">
      <div className={SECTION_HEADING_CLASS}>Product Modules</div>
      <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-x-0 gap-y-4">
        {productDropdownItems.map((item) => (
          <TrackingLink
            href={item.url || ''}
            disabled={item.url === undefined}
            className={`group flex h-auto min-w-0 items-center gap-4 ${item.url === undefined ? 'cursor-not-allowed opacity-80' : ''}`}
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
