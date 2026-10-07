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

// Coupled to Stoplight Elements' internal DOM structure (tested with @stoplight/elements ^9.0.11).
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

  const attachPortalContainer = useCallback((): HTMLElement | null => {
    const apiRoot = document.querySelector<HTMLElement>('.sl-elements-api')
    if (!apiRoot) return null

    // Desktop / drawer sidebar: header row next to API title (SigNoz)
    const desktop = findSidebarHeaderRow(apiRoot)
    if (desktop) {
      const { headerRow, heading } = desktop

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
      return wrapper
    }

    // Responsive top bar: title centered — place version after title
    const mobileNav = findMobileNavHost()
    if (mobileNav) {
      mobileNav.style.display = 'flex'
      mobileNav.style.alignItems = 'center'
      mobileNav.style.justifyContent = 'center'
      mobileNav.style.flexWrap = 'wrap'
      mobileNav.style.gap = '8px'

      const wrapper = document.createElement('div')
      wrapper.className = 'api-version-portal'
      wrapper.style.flexShrink = '0'
      mobileNav.appendChild(wrapper)
      return wrapper
    }

    return null
  }, [])

  useEffect(() => {
    let frame = 0
    let container: HTMLElement | null = null

    const ensureAttached = () => {
      frame = 0
      if (container?.isConnected) return

      // Switching versions makes Stoplight rebuild the sidebar, discarding the injected node.
      // A one-shot attach lands on the outgoing DOM and disappears with it.
      document.querySelectorAll('.api-version-portal').forEach((el) => el.remove())
      container = attachPortalContainer()
      setPortalContainer(container)
    }

    const observer = new MutationObserver(() => {
      if (frame) return
      frame = requestAnimationFrame(ensureAttached)
    })

    ensureAttached()
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
      document.querySelectorAll('.api-version-portal').forEach((el) => el.remove())
      setPortalContainer(null)
    }
  }, [attachPortalContainer])

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
        className="border border-[var(--l3-border)] bg-[var(--l3-background)] text-[var(--l1-foreground)]"
        position="popper"
        align="start"
        side="bottom"
        avoidCollisions={false}
      >
        {availableVersions.map((v) => (
          <SelectItem
            key={v}
            value={v}
            className="text-xs transition-colors duration-200 hover:bg-[var(--l3-background-hover)] focus:bg-[var(--l3-background-hover)]"
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
