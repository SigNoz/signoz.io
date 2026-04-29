'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select'

interface APIVersionSwitcherProps {
  currentVersion: string
  availableVersions: string[]
}

// Coupled to Stoplight Elements' internal DOM structure (tested with @stoplight/elements ^8.5.0).
// Locates the sidebar header row by navigating from the "powered by Stoplight" link upward.
// If Stoplight updates their DOM layout, this selector may need adjustment.
function findSidebarHeaderRow(apiRoot: HTMLElement): {
  headerRow: HTMLElement
  heading: HTMLElement
} | null {
  const powered = apiRoot.querySelector<HTMLAnchorElement>(
    'a[href*="utm_campaign=powered_by"][href*="stoplight.io"]'
  )
  const column = powered?.parentElement
  if (!column || column === apiRoot) return null

  const headerRow = column.children[0] as HTMLElement | undefined
  if (!headerRow) return null

  const heading = headerRow.querySelector('h1, h2, h3, h4, h5, h6') as HTMLElement | null
  if (!heading) return null

  return { headerRow, heading }
}

function findMobileNavHost(): HTMLElement | null {
  return document.querySelector<HTMLElement>('[data-test="mobile-project-top-nav"]')
}

export default function APIVersionSwitcher({
  currentVersion,
  availableVersions,
}: APIVersionSwitcherProps) {
  const router = useRouter()
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null)

  const findAndAttach = useCallback(() => {
    const apiRoot = document.querySelector<HTMLElement>('.sl-elements-api')
    if (!apiRoot) return false

    // Desktop / drawer sidebar: header row next to API title (SigNoz)
    const desktop = findSidebarHeaderRow(apiRoot)
    if (desktop) {
      const { headerRow, heading } = desktop
      const existing = headerRow.querySelector('.api-version-portal')
      if (existing) {
        setPortalContainer(existing as HTMLElement)
        return true
      }

      headerRow.style.display = 'flex'
      headerRow.style.alignItems = 'center'
      headerRow.style.flexWrap = 'nowrap'
      headerRow.style.gap = '10px'
      headerRow.style.minWidth = '0'

      heading.style.minWidth = '0'
      heading.style.overflow = 'hidden'
      heading.style.textOverflow = 'ellipsis'
      heading.style.whiteSpace = 'nowrap'

      const wrapper = document.createElement('div')
      wrapper.className = 'api-version-portal'
      wrapper.style.flexShrink = '0'
      heading.insertAdjacentElement('afterend', wrapper)
      setPortalContainer(wrapper)
      return true
    }

    // Responsive top bar: title centered — place version after title
    const mobileNav = findMobileNavHost()
    if (mobileNav) {
      const existing = mobileNav.querySelector('.api-version-portal')
      if (existing) {
        setPortalContainer(existing as HTMLElement)
        return true
      }
      mobileNav.style.display = 'flex'
      mobileNav.style.alignItems = 'center'
      mobileNav.style.justifyContent = 'center'
      mobileNav.style.flexWrap = 'wrap'
      mobileNav.style.gap = '8px'

      const wrapper = document.createElement('div')
      wrapper.className = 'api-version-portal'
      wrapper.style.flexShrink = '0'
      mobileNav.appendChild(wrapper)
      setPortalContainer(wrapper)
      return true
    }

    return false
  }, [])

  useEffect(() => {
    setPortalContainer(null)
    document.querySelectorAll('.api-version-portal').forEach((el) => el.remove())

    if (findAndAttach()) return undefined

    let attempts = 0
    const MAX_ATTEMPTS = 50 // ~10 seconds
    const interval = setInterval(() => {
      if (findAndAttach() || ++attempts >= MAX_ATTEMPTS) clearInterval(interval)
    }, 200)

    return () => clearInterval(interval)
  }, [findAndAttach, currentVersion])

  const selectUI = (
    <Select
      value={currentVersion}
      onValueChange={(next) => {
        router.push(`/api-reference/${next}/`)
      }}
    >
      <SelectTrigger className="h-7 w-[130px] shrink-0 text-xs">
        <SelectValue placeholder="Version" />
      </SelectTrigger>
      <SelectContent
        className="border border-primary-600 bg-signoz_slate-400 text-white"
        position="popper"
        align="start"
        side="bottom"
        avoidCollisions={false}
      >
        {availableVersions.map((v) => (
          <SelectItem
            key={v}
            value={v}
            className="text-xs transition-colors duration-200 hover:bg-signoz_slate-500 focus:bg-signoz_slate-500"
          >
            {v}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  if (portalContainer) {
    return <>{createPortal(selectUI, portalContainer)}</>
  }

  return null
}
