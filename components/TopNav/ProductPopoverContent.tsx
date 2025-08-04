import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Color } from '@signozhq/design-tokens'
import ModuleNavItems from './ModuleNavItems'
import { productDropdownItems, comparisionItems } from './constants'
import TrackingLink from '@/components/TrackingLink'

interface Props {
  handleProductDropdownClick?: () => void
}

export default function ProductPopoverContent({ handleProductDropdownClick = () => {} }: Props) {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col gap-y-4 p-6">
        <div
          className={`text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-[${Color.BG_SLATE_50}]`}
        >
          Product Modules
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-5">
          <ModuleNavItems
            items={productDropdownItems}
            handleDropdownClick={handleProductDropdownClick}
          />
        </div>
      </div>

      <div
        className={`flex flex-col gap-y-6 rounded-r-[4px] border-l border-[${Color.BG_SLATE_400}] bg-[${Color.BG_INK_300}] p-6`}
      >
        <div className="flex flex-col gap-y-4">
          <Link
            href={'/case-study'}
            className={`flex flex-row items-center gap-1 text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-[${Color.BG_SLATE_50}] hover:text-[#fff]`}
            onClick={handleProductDropdownClick}
          >
            <span>Customer Stories</span> <ArrowRight size={14} />
          </Link>
          <div>
            <TrackingLink
              href={'/case-study/brainfish/'}
              className="group flex h-auto items-center gap-4"
              clickType="Nav Click"
              clickName="Customer Stories Link"
              clickText="How Brainfish leveraged SigNoz for effective Kubernetes monitoring"
              clickLocation="Top Navbar"
              onClick={handleProductDropdownClick}
            >
              <Image src={'/img/index_features/brainfish.svg'} alt={''} width={20} height={20} />
              <div
                className={`font-inter line-clamp-2 max-w-[274px] text-[${Color.TEXT_VANILLA_400}] group-hover:text-[#fff]`}
              >
                How Brainfish leveraged SigNoz for effective Kubernetes monitoring
              </div>
            </TrackingLink>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <div
            className={`flex flex-row items-center gap-1 text-[11px] font-semibold uppercase leading-[18px] tracking-[0.88px] text-[${Color.BG_SLATE_50}]`}
          >
            <span>Compare Signoz</span>
          </div>
          <div className={`font-inter flex flex-col gap-1 text-[${Color.TEXT_VANILLA_400}]`}>
            {comparisionItems.map((comparisionItem) => (
              <TrackingLink
                key={comparisionItem.key}
                href={comparisionItem.url}
                className="group flex flex-row items-center gap-1 hover:text-[#fff]"
                clickType="Nav Click"
                clickName={`${comparisionItem.name} Comparison Link`}
                clickText={comparisionItem.name}
                clickLocation="Top Navbar"
                onClick={handleProductDropdownClick}
              >
                <span>{comparisionItem.name}</span>{' '}
                <ArrowRight className="opacity-0 group-hover:opacity-100" size={14} />
              </TrackingLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 