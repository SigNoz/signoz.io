'use client'

import { ArrowRight, ChevronDown } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import { Button } from '@/components/ui/Button'
import KernelLogo from '@/public/svgs/icons/kernel.svg'
import { productDropdownItemsSorted, comparisonItems, SECTION_HEADING_CLASS } from './constants'
import { useNavDropdown } from './NavDropdownContext'

export default function ProductDropdown() {
  const { isOpen, open, close, triggerRef } = useNavDropdown('product')

  return (
    <div onPointerEnter={open} onPointerLeave={close} className="flex items-center">
      <Button
        isButton
        unstyled
        type="button"
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
    <div className="flex min-w-0 flex-row">
      <div className="flex min-w-0 flex-1 flex-col gap-y-4 p-6">
        <div className="grid grid-cols-1 gap-y-4">
          {productDropdownItemsSorted.map((item) => (
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
      <div className="flex w-[280px] shrink-0 flex-col gap-y-6 border-l border-signoz_slate-400 bg-[hsl(240_5.88%_10%)] p-6 sm:w-[300px] lg:w-[320px]">
        <div className="flex flex-col gap-y-4">
          <TrackingLink
            href="/case-study/"
            className={`flex flex-row items-center gap-1 ${SECTION_HEADING_CLASS} hover:text-[#fff]`}
            clickType="Nav Click"
            clickName="Customer Stories Link"
            clickText="Customer Stories"
            clickLocation="Top Navbar"
            onClick={onClose}
            prefetch={false}
          >
            <span>Customer Stories</span> <ArrowRight size={14} />
          </TrackingLink>
          <div>
            <TrackingLink
              href="/case-study/kernel/"
              className="group flex h-auto w-full min-w-0 items-center gap-3"
              clickType="Nav Click"
              clickName="Customer Stories Link"
              clickText="How Kernel Reduced Browser Acquisition Latency from 140ms to 30ms with SigNoz MCP"
              clickLocation="Top Navbar"
              onClick={onClose}
              prefetch={false}
            >
              <KernelLogo className="h-auto w-12 shrink-0" aria-hidden="true" />
              <div className="line-clamp-2 min-w-0 flex-1 text-sm text-signoz_vanilla-400 group-hover:text-[#fff]">
                How Kernel Reduced Browser Acquisition Latency from 140ms to 30ms with SigNoz MCP
              </div>
            </TrackingLink>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div className={SECTION_HEADING_CLASS}>
            <span>Compare SigNoz</span>
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
    </div>
  )
}
