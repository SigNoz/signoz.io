'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import StabilityBadge from './StabilityBadge'
import type { StabilityIndex, StabilityLevel } from '@/constants/apiReferenceStability'

// Stoplight renders each table-of-contents row as `sl-toc-<slug>`, and an operation's slug is
// `/operations/<operationId>`. See @stoplight/elements-core `getHtmlIdFromItemId`.
const TOC_ID_PREFIX = 'sl-toc-'
const OPERATION_SLUG_PREFIX = '/operations/'
const ROW_SELECTOR = `[id^="${TOC_ID_PREFIX}${OPERATION_SLUG_PREFIX}"]`
const ROW_STAMP_ATTRIBUTE = 'data-signoz-stability'
const SLOT_ATTRIBUTE = 'data-signoz-stability-slot'
const SLOT_CLASS_NAME = 'ml-1.5 inline-flex shrink-0'

interface Slot {
  key: string
  level: StabilityLevel
  node: HTMLElement
}

export default function StabilitySidebarBadges({ byOperationId, copy }: StabilityIndex) {
  const [slots, setSlots] = useState<Slot[]>([])

  useEffect(() => {
    if (Object.keys(byOperationId).length === 0) return

    let frame = 0
    // The responsive layout can mount a second copy of a row, so keys can't be the operation id.
    let slotCount = 0

    const attach = () => {
      frame = 0
      const added: Slot[] = []

      document.querySelectorAll<HTMLElement>(ROW_SELECTOR).forEach((row) => {
        if (row.hasAttribute(ROW_STAMP_ATTRIBUTE)) return

        const operationId = row.id.slice(TOC_ID_PREFIX.length + OPERATION_SLUG_PREFIX.length)
        const level = byOperationId[operationId]
        if (!level) return

        const node = document.createElement('span')
        node.className = SLOT_CLASS_NAME
        node.setAttribute(SLOT_ATTRIBUTE, '')
        row.appendChild(node)
        row.setAttribute(ROW_STAMP_ATTRIBUTE, level)
        slotCount += 1
        added.push({ key: `${operationId}-${slotCount}`, level, node })
      })

      if (added.length === 0) return
      setSlots((current) => [...current.filter((slot) => slot.node.isConnected), ...added])
    }

    const observer = new MutationObserver(() => {
      if (frame) return
      frame = requestAnimationFrame(attach)
    })

    attach()
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
      document.querySelectorAll(`[${ROW_STAMP_ATTRIBUTE}]`).forEach((row) => {
        row.removeAttribute(ROW_STAMP_ATTRIBUTE)
      })
      document.querySelectorAll(`[${SLOT_ATTRIBUTE}]`).forEach((node) => node.remove())
      setSlots([])
    }
  }, [byOperationId])

  return (
    <>
      {slots.map((slot) =>
        createPortal(
          <StabilityBadge
            level={slot.level}
            copy={copy[slot.level]}
            variant="short"
            side="right"
          />,
          slot.node,
          slot.key
        )
      )}
    </>
  )
}
