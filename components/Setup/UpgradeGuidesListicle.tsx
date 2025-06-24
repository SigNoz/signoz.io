'use client'

import React, { useState } from 'react'
import { MdSystemUpdateAlt } from 'react-icons/md'
import IconCardGrid from '../Card/IconCardGrid'

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
type Section =
  | 'all'
  | 'latest'
  | '0.70+'
  | '0.60+'
  | '0.50'
  | '0.40'
  | '0.30'
  | '<0.30'

interface UpgradeGuidesListicleProps {
  /** Which tab should be open on mount */
  section?: Section
}

/* ------------------------------------------------------------------ */
/* Data – one flat list; easy to sort / extend                        */
/* ------------------------------------------------------------------ */
const CARDS = [
  { version: '0.76', href: '/docs/operate/migration/upgrade-0.76' },
  { version: '0.70', href: '/docs/operate/migration/upgrade-0.70' },
  { version: '0.64', href: '/docs/operate/migration/upgrade-0.64' },
  { version: '0.55', href: '/docs/operate/migration/upgrade-0.55' },
  { version: '0.51', href: '/docs/operate/migration/upgrade-0.51' },
  { version: '0.49', href: '/docs/operate/migration/upgrade-0.49' },
  { version: '0.45', href: '/docs/operate/migration/upgrade-0.45' },
  { version: '0.38', href: '/docs/operate/migration/upgrade-0.38' },
  { version: '0.36', href: '/docs/operate/migration/upgrade-0.36' },
  { version: '0.27', href: '/docs/operate/migration/upgrade-0.27' },
  { version: '0.23', href: '/docs/operate/migration/upgrade-0.23' },
  { version: '0.19', href: '/docs/operate/migration/upgrade-0.19' },
  { version: '0.12', href: '/docs/operate/migration/upgrade-0.12' },
  { version: '0.10', href: '/docs/operate/migration/upgrade-0.10' },
  { version: '0.9',  href: '/docs/operate/migration/upgrade-0.9'  },
  { version: '0.8.1', href: '/docs/operate/migration/upgrade-0.8.1' },
  { version: '0.8.0', href: '/docs/operate/migration/upgrade-0.8.0' },
] as const

const LATEST = CARDS[0] // highest semver first in the list

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */
const inRange = (v: string, section: Section) => {
  const n = parseFloat(v)
  switch (section) {
    case 'latest':
      return v === LATEST.version
    case '0.70+':
      return n >= 0.70
    case '0.60+':
      return n >= 0.60 && n < 0.70
    case '0.50':
      return n >= 0.50 && n < 0.60
    case '0.40':
      return n >= 0.40 && n < 0.50
    case '0.30':
      return n >= 0.30 && n < 0.40
    case '<0.30':
      return n < 0.30
    default:
      return true // 'all'
  }
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
export default function UpgradeGuidesListicle({
  section = 'all',
}: UpgradeGuidesListicleProps) {
  const SECTIONS: { id: Section; label: string }[] = [
    { id: 'all',    label: 'All' },
    { id: 'latest', label: 'Latest' },
    { id: '0.70+',  label: '0.70 +' },
    { id: '0.60+',  label: '0.60 +' },
    { id: '0.50',   label: '0.50 +' },
    { id: '0.40',   label: '0.40 +' },
    { id: '0.30',   label: '0.30 +' },
    { id: '<0.30',  label: '< 0.30' },
  ]

  const [active, setActive] = useState<Section>(
    SECTIONS.find(s => s.id === section)?.id ?? 'all',
  )

  const docIcon = (
    <MdSystemUpdateAlt className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
  )

  const toGridCard = (card: (typeof CARDS)[number]) => ({
    name: `Upgrade to v${card.version}`,
    href: card.href,
    icon: docIcon,
    clickName: `Upgrade to v${card.version}`,
  })

  const gridFor = (sec: Section) => {
    const cards = CARDS.filter(c => inRange(c.version, sec)).map(toGridCard)
    if (!cards.length) return null
    return (
      <IconCardGrid
        key={sec}
        sectionName={SECTIONS.find(s => s.id === sec)!.label}
        gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
        cards={cards}
      />
    )
  }

  const groupedAllView = () =>
    SECTIONS
      .filter(s => s.id !== 'all')
      .map(s => (
        <div key={s.id} className="mb-10">
          <h2 className="mb-4 text-2xl font-semibold">{s.label}</h2>
          {gridFor(s.id)}
        </div>
      ))

  return (
    <div>
      {/* ---------- Tabs / pills ---------- */}
      <div className="mb-8 flex flex-wrap gap-2">
        {SECTIONS.map(sec => (
          <button
            key={sec.id}
            onClick={() => setActive(sec.id)}
            aria-pressed={active === sec.id}
            className={`inline-block rounded-full px-4 py-2 text-sm font-medium transition-colors
              ${
                active === sec.id
                  ? 'bg-signoz_orange-500 text-white dark:bg-signoz_orange-400'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* ---------- Grid(s) ---------- */}
      {active === 'all' ? groupedAllView() : gridFor(active)}
    </div>
  )
}
