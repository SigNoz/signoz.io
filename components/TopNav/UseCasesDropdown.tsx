'use client'

import { Button } from '@headlessui/react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import { useCasesDropdownItemsSorted } from './constants'
import { useNavDropdown } from './NavDropdownContext'

export default function UseCasesDropdown() {
  const { isOpen, open, close, triggerRef } = useNavDropdown('usecases')

  return (
    <div onPointerEnter={open} onPointerLeave={close} className="flex items-center">
      <Button
        ref={triggerRef}
        className="hover:bg-robin-200/20 truncate rounded-full px-2.5 py-1 text-sm transition-colors outline-none"
        onClick={() => (isOpen ? close() : open())}
      >
        <div className="flex items-center">
          Use Cases
          <ChevronDown
            size={12}
            className={`ml-1 transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </div>
      </Button>
    </div>
  )
}

export function UseCasesDropdownContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-y-4 p-6">
      <div className="grid grid-cols-1 gap-y-4">
        {useCasesDropdownItemsSorted.map((item) => (
          <TrackingLink
            href={item.url}
            className="group flex h-auto min-w-0 items-start gap-2"
            key={item.key}
            clickType="Nav Click"
            clickName={`${item.name} Use Case Link`}
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
