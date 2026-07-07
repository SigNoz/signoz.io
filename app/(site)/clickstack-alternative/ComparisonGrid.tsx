import { Check, X, Clock, Flame, Cloud, Server } from 'lucide-react'
import type { CellValue, ComparisonCategory } from './ClickStackAlternativePage.types'
import TrackingLink from '@/components/TrackingLink'
import FeatureComparisonGrid from '@/shared/components/molecules/FeaturePages/FeatureComparisonGrid'
import type { ComparisonSection } from '@/shared/components/molecules/FeaturePages/FeatureComparisonGrid'

const BADGE_ICONS = {
  clock: Clock,
  flame: Flame,
  cloud: Cloud,
  server: Server,
} as const

function renderCell(value: CellValue) {
  switch (value.type) {
    case 'check':
      return (
        <div className="flex items-center gap-1.5">
          <Check size={15} className="shrink-0 text-green-400" />
          {value.label && <span className="text-sm text-[#adb4c2]">{value.label}</span>}
        </div>
      )
    case 'cross':
      return (
        <div className="flex items-center gap-1.5">
          <X size={15} className="shrink-0 text-red-400" />
          {value.label && <span className="text-sm text-[#adb4c2]">{value.label}</span>}
        </div>
      )
    case 'dash':
      return <span className="text-sm text-[#62687c]">&mdash;</span>
    case 'text':
      return <span className="text-sm leading-6 text-[#adb4c2]">{value.content}</span>
    case 'badge': {
      const Icon = BADGE_ICONS[value.icon]
      return (
        <div className="flex items-center gap-1.5">
          <Icon size={15} className="shrink-0 text-[#adb4c2]" />
          <span className="text-xs font-medium uppercase tracking-[0.48px] text-[#adb4c2]">
            {value.label}
          </span>
        </div>
      )
    }
  }
}

function toSections(data: ComparisonCategory[]): ComparisonSection[] {
  return data.map((cat) => ({
    title: cat.category,
    rows: cat.rows.map((row) => ({
      feature: <span className="text-sm leading-6 text-[#adb4c2]">{row.feature}</span>,
      cells: {
        signoz: renderCell(row.signoz),
        clickstack: renderCell(row.clickstack),
      },
    })),
  }))
}

const GRID_CLASS = 'grid-cols-[1fr_12rem_12rem]'

const COLUMNS = [
  {
    key: 'signoz',
    cellClassName: 'relative px-3 py-3',
    sectionCellClassName: 'relative',
  },
  {
    key: 'clickstack',
    cellClassName: 'px-3 py-3',
    sectionCellClassName: 'bg-signoz_ink-500',
  },
]

export default function ComparisonGrid({ data }: { data: ComparisonCategory[] }) {
  const sections = toSections(data)

  return (
    <div className="w-full overflow-x-auto text-left text-base leading-normal md:overflow-visible">
      <div className="relative min-w-[40rem] md:min-w-0">
        <div className="pointer-events-none absolute inset-y-0 right-48 z-0 w-48 rounded-lg bg-gradient-to-b from-[#16181d] from-[73%] to-transparent opacity-80" />

        <div className="sticky top-28 z-[9]">
          <div className={`grid ${GRID_CLASS}`}>
            <div className="bg-signoz_ink-500" />
            <div className="relative flex flex-col items-start gap-2.5 bg-[#14161a] px-3 py-4">
              <span className="text-base font-medium leading-7 text-[#eceef2]">SigNoz</span>
              <TrackingLink
                href="/teams/"
                clickType="Primary CTA"
                clickName="Sign Up Button"
                clickLocation="ClickStack Alternative Quick Evaluation"
                clickText="Get Started"
                className="flex h-8 w-40 items-center justify-center rounded-full border border-[#23262e] bg-[#4e74f8] text-xs font-medium tracking-wider text-[#eceef2] hover:bg-[#3d63e7]"
              >
                Get Started
              </TrackingLink>
            </div>
            <div className="flex flex-col items-start gap-2.5 bg-signoz_ink-500 px-3 py-4">
              <span className="text-base font-medium leading-7 text-[#eceef2]">ClickStack</span>
            </div>
          </div>
          <div className="h-px w-full bg-[#23262e]" />
        </div>

        {/* Shared grid body */}
        <FeatureComparisonGrid
          columns={COLUMNS}
          sections={sections}
          gridClassName={GRID_CLASS}
          sectionHeadingSize="sm"
          stickyOffset="top-[215px]"
          stickyBg=""
          stickyZIndex="z-[8]"
          separator="border"
          featureCellClassName="pl-6 py-3"
          featureSectionClassName="pl-6 bg-signoz_ink-500"
        />
      </div>
    </div>
  )
}
