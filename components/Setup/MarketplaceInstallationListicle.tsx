'use client'

import React from 'react'
import IconCardGrid from '../Card/IconCardGrid'
import { SiDigitalocean } from 'react-icons/si'
import { MARKETPLACE_INSTALLATION_ITEMS } from '@/constants/componentItems'

const ICON_MAP: Record<string, React.ReactNode> = {
  'https://railway.com/deploy/signoz': <img src="/img/icons/railway-icon.webp" alt="Railway" />,
  'https://marketplace.digitalocean.com/apps/signoz': (
    <SiDigitalocean className="h-7 w-7 text-sky-400" />
  ),
  'https://www.vultr.com/marketplace/apps/signoz/': <img src="/img/icons/vultr.svg" alt="Vultr" />,
  'https://github.com/coollabsio/coolify/blob/v4.x/templates/compose/signoz.yaml': (
    <img src="/img/icons/coolify-logo.png" alt="Coolify" />
  ),
}

const cards = MARKETPLACE_INSTALLATION_ITEMS.map((item) => ({
  ...item,
  icon: ICON_MAP[item.href],
}))

/**
 * A simple listicle for one-click installation options for SigNoz.
 */
export default function SelfHostInstallationListicle() {
  return (
    <div>
      <IconCardGrid sectionName="all" gridCols="grid-cols-2 sm:grid-cols-3" cards={cards} />
    </div>
  )
}
