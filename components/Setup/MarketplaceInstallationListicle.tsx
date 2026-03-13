'use client'

import React from 'react'
import IconCardGrid from '../Card/IconCardGrid'
import { SiDigitalocean } from 'react-icons/si'
/**
 * A simple listicle for one-click installation options for SigNoz.
 */
export default function SelfHostInstallationListicle() {
  // --- Icons ---
  const railwayIcon = <img src="/img/icons/railway-icon.webp" alt="Railway" />
  const doIcon = <SiDigitalocean className="h-7 w-7 text-sky-400" />
  const vultrIcon = <img src="/img/icons/vultr.svg" alt="Vultr" />
  const coolifyIcon = <img src="/img/icons/coolify-logo.png" alt="Coolify" />

  // --- Cards for One-Click Install ---
  const oneClickCards = [
    {
      name: 'Railway',
      href: 'https://railway.com/deploy/signoz',
      icon: railwayIcon,
      clickName: 'Deploy to Railway',
    },
    {
      name: 'DigitalOcean',
      href: 'https://marketplace.digitalocean.com/apps/signoz',
      icon: doIcon,
      clickName: 'Deploy to DigitalOcean',
    },
    {
      name: 'Vultr',
      href: 'https://www.vultr.com/marketplace/apps/signoz/',
      icon: vultrIcon,
      clickName: 'Deploy to Vultr',
    },
    {
      name: 'Coolify',
      href: 'https://github.com/coollabsio/coolify/blob/v4.x/templates/compose/signoz.yaml',
      icon: coolifyIcon,
      clickName: 'Deploy to Coolify',
    },
  ]

  return (
    <div>
      <IconCardGrid sectionName="all" gridCols="grid-cols-2 sm:grid-cols-3" cards={oneClickCards} />
    </div>
  )
}
