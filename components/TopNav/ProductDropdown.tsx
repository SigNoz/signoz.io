'use client'

import { useState } from 'react'
import { Button } from '@headlessui/react'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import * as Popover from '@radix-ui/react-popover'
import TrackingLink from '@/components/TrackingLink'
import BrainfishIcon from '@/public/img/index_features/brainfish.svg'
import {
  productDropdownItems,
  comparisonItems,
  POPOVER_CONTENT_CLASS,
  SECTION_HEADING_CLASS,
} from './constants'

export default function ProductDropdown() {
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
          <div className="flex min-w-0 flex-row">
            <ProductModulesSection onClose={close} />
            <SidebarSection onClose={close} />
          </div>
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

function SidebarSection({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex w-[280px] shrink-0 flex-col gap-y-6 border-l border-signoz_slate-400 bg-[hsl(240_5.88%_10%)] p-6 sm:w-[300px] lg:w-[320px]">
      <div className="flex flex-col gap-y-4">
        <Link
          href="/case-study"
          className={`flex flex-row items-center gap-1 ${SECTION_HEADING_CLASS} hover:text-[#fff]`}
          onClick={onClose}
          prefetch={false}
        >
          <span>Customer Stories</span> <ArrowRight size={14} />
        </Link>
        <div>
          <TrackingLink
            href="/case-study/brainfish/"
            className="group flex h-auto min-w-0 items-center gap-4"
            clickType="Nav Click"
            clickName="Customer Stories Link"
            clickText="How Brainfish leveraged SigNoz for effective Kubernetes monitoring"
            clickLocation="Top Navbar"
            onClick={onClose}
            prefetch={false}
          >
            <BrainfishIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
            <div className="line-clamp-2 max-w-[274px] text-sm text-signoz_vanilla-400 group-hover:text-[#fff]">
              How Brainfish leveraged SigNoz for effective Kubernetes monitoring
            </div>
          </TrackingLink>
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <div className={SECTION_HEADING_CLASS}>
          <span>Compare Signoz</span>
        </div>
        <div className="flex flex-col gap-1 text-sm text-signoz_vanilla-400">
          {comparisonItems.map((item) => (
            <TrackingLink
              key={item.key}
              href={item.url}
              className="group flex flex-row items-center gap-1 hover:text-[#fff]"
              clickType="Nav Click"
              clickName={`${item.name} Comparison Link`}
              clickText={item.name}
              clickLocation="Top Navbar"
              onClick={onClose}
              prefetch={false}
            >
              <span>{item.name}</span>{' '}
              <ArrowRight className="opacity-0 group-hover:opacity-100" size={14} />
            </TrackingLink>
          ))}
        </div>
      </div>
    </div>
  )
}
