'use client'

import React from 'react'
import IconCardGrid from '../Card/IconCardGrid'
import { AZURE_ONE_CLICK_ITEMS } from '@/constants/componentItems'

const ICON_MAP: Record<string, React.ReactNode> = {
  '/docs/integrations/azure/cdn-frontdoor': (
    <img
      src="/img/icons/azure-cdn-frontdoor-icon.svg"
      alt="Azure CDN FrontDoor"
      className="h-7 w-7"
    />
  ),
  '/docs/integrations/azure/blob-storage': (
    <img
      src="/img/icons/azure-blob-storage-icon.svg"
      alt="Azure Blob Storage"
      className="h-7 w-7"
    />
  ),
  '/docs/integrations/azure/virtual-machines': (
    <img
      src="/img/icons/azure-virtual-machines-icon.svg"
      alt="Azure Virtual Machines"
      className="h-7 w-7"
    />
  ),
  '/docs/integrations/azure/container-apps': (
    <img
      src="/img/icons/azure-container-apps-icon.svg"
      alt="Azure Container Apps"
      className="h-7 w-7"
    />
  ),
  '/docs/integrations/azure/app-service': (
    <img src="/img/icons/azure-app-service-icon.svg" alt="Azure App Services" className="h-7 w-7" />
  ),
  '/docs/integrations/azure/aks': (
    <img src="/img/icons/azure-aks-icon.svg" alt="Azure Kubernetes Service" className="h-7 w-7" />
  ),
}

export default function AzureOneClickListicle() {
  const cards = AZURE_ONE_CLICK_ITEMS.map((item) => ({
    ...item,
    icon: ICON_MAP[item.href],
  }))

  return (
    <IconCardGrid
      cards={cards}
      sectionName="Azure One-Click Integrations"
      gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
    />
  )
}
