'use client'

import React from 'react'
import IconCardGrid from '../Card/IconCardGrid'

/**
 * A simple listicle for one-click installation options for SigNoz.
 */
export default function SelfHostInstallationListicle() {
  // --- Icons ---
  const railwayIcon = <img src="/img/icons/railway-icon.webp" alt="Railway" />
  const elestioIcon = <img src="/img/icons/elestio-icon.svg" alt="Elestio" />

  // --- Cards for One-Click Install ---
  const oneClickCards = [
    { name: 'Railway', href: 'https://railway.com/deploy/signoz', icon: railwayIcon, clickName: 'Deploy to Railway' },
    { name: 'Elestio', href: 'https://elest.io/open-source/signoz', icon: elestioIcon, clickName: 'Deploy to Elestio' },
  ]

  return (
    <div>
      <IconCardGrid
        sectionName="all"
        gridCols="grid-cols-2 sm:grid-cols-3"
        cards={oneClickCards}
      />
    </div>
  )
}