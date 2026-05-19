'use client'

import { Button } from '@headlessui/react'
import { ArrowRight, ChevronDown, Scale, MoveRight } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import TrackingLink from '@/components/TrackingLink'
import {
  comparisonItems,
  migrationItems,
  ComparisonItem,
  MigrationItem,
  POPOVER_CONTENT_CLASS,
  SECTION_HEADING_CLASS,
} from './constants'
import { useNavDropdown } from './NavDropdownContext'

export default function CompareSignozDropdown() {
  const { isOpen, open, close } = useNavDropdown('compare')

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
              Compare SigNoz
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
            <LinkSection
              title="Compare SigNoz"
              icon={<Scale size={16} className="shrink-0 text-signoz_robin-400" />}
              items={comparisonItems}
              trackingSuffix="Comparison"
              onClose={close}
            />
            <LinkSection
              title="Migrate to SigNoz"
              icon={<MoveRight size={16} className="shrink-0 text-signoz_robin-400" />}
              items={migrationItems}
              trackingSuffix="Migration"
              onClose={close}
              hasBorderLeft
            />
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>
  )
}

function LinkSection({
  title,
  icon,
  items,
  trackingSuffix,
  onClose,
  hasBorderLeft,
}: {
  title: string
  icon: React.ReactNode
  items: (ComparisonItem | MigrationItem)[]
  trackingSuffix: string
  onClose: () => void
  hasBorderLeft?: boolean
}) {
  return (
    <div
      className={`flex min-w-0 flex-1 flex-col gap-y-3 p-5 ${hasBorderLeft ? 'border-l border-signoz_slate-400' : ''}`}
    >
      <div className={SECTION_HEADING_CLASS}>{title}</div>
      <div className="flex flex-col gap-y-0.5">
        {items.map((item) => (
          <TrackingLink
            key={item.key}
            href={item.url}
            className="group flex items-start gap-3 rounded px-2 py-2 transition-colors hover:bg-signoz_slate-500"
            clickType="Nav Click"
            clickName={`${item.name} ${trackingSuffix} Link`}
            clickText={item.name}
            clickLocation="Top Navbar"
            onClick={onClose}
            prefetch={false}
          >
            <div className="flex h-8 w-4 items-center justify-center">{icon}</div>
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
