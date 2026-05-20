'use client'

import { Button } from '@headlessui/react'
import { ArrowRight, ChevronDown, Scale, MoveRight } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import { comparisonItems, migrationItems, ComparisonItem, MigrationItem } from './constants'
import { useNavDropdown } from './NavDropdownContext'

export default function CompareSignozDropdown() {
  const { isOpen, open, close, triggerRef } = useNavDropdown('compare')

  return (
    <div onPointerEnter={open} onPointerLeave={close} className="flex items-center">
      <Button
        ref={triggerRef}
        className="truncate rounded-full px-2.5 py-1 text-sm outline-none transition-colors hover:bg-signoz_robin-200/20"
        onClick={() => (isOpen ? close() : open())}
      >
        <div className="flex items-center">
          Compare
          <ChevronDown
            size={12}
            className={`ml-1 transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </div>
      </Button>
    </div>
  )
}

export function CompareSignozDropdownContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex min-w-0 flex-row">
      <LinkSection
        icon={<Scale size={16} className="shrink-0 text-signoz_vanilla-100" />}
        items={comparisonItems}
        trackingSuffix="Comparison"
        onClose={onClose}
      />
      <LinkSection
        icon={<MoveRight size={16} className="shrink-0 text-signoz_vanilla-100" />}
        items={migrationItems}
        trackingSuffix="Migration"
        onClose={onClose}
        hasBorderLeft
      />
    </div>
  )
}

function LinkSection({
  icon,
  items,
  trackingSuffix,
  onClose,
  hasBorderLeft,
}: {
  icon: React.ReactNode
  items: (ComparisonItem | MigrationItem)[]
  trackingSuffix: string
  onClose: () => void
  hasBorderLeft?: boolean
}) {
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col p-5 ${hasBorderLeft ? 'border-l border-signoz_slate-400' : ''}`}
    >
      <div className="flex flex-col gap-y-0.5">
        {items.map((item) => (
          <TrackingLink
            key={item.key}
            href={item.url}
            className="group flex items-start gap-3 px-2 py-2"
            clickType="Nav Click"
            clickName={`${item.name} ${trackingSuffix} Link`}
            clickText={item.name}
            clickLocation="Top Navbar"
            onClick={onClose}
            prefetch={false}
          >
            <div className="flex h-8 w-4 items-start pt-0.5">{icon}</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="whitespace-nowrap text-sm text-signoz_vanilla-100">
                  {item.name}
                </span>
                <ArrowRight
                  className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                  size={14}
                />
              </div>
              <div className="whitespace-nowrap text-xs text-signoz_vanilla-400 group-hover:text-signoz_vanilla-100">
                {item.description}
              </div>
            </div>
          </TrackingLink>
        ))}
      </div>
    </div>
  )
}
