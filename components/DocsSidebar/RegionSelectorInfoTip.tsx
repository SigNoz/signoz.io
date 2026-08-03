'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Popover, PopoverAnchor, PopoverClose, PopoverContent } from '@signozhq/ui/popover'

export const REGION_SELECTOR_TIP_STORAGE_KEY = 'signoz-docs-region-selector-tip-dismissed'

type RegionSelectorInfoTipProps = {
  children: React.ReactNode
}

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)'

export default function RegionSelectorInfoTip({ children }: RegionSelectorInfoTipProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const syncOpenState = () => {
      try {
        if (localStorage.getItem(REGION_SELECTOR_TIP_STORAGE_KEY) === 'true') {
          setOpen(false)
          return
        }
      } catch {}

      setOpen(window.matchMedia(DESKTOP_MEDIA_QUERY).matches)
    }

    syncOpenState()

    const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)
    mediaQuery.addEventListener('change', syncOpenState)
    return () => mediaQuery.removeEventListener('change', syncOpenState)
  }, [])

  const dismiss = () => {
    setOpen(false)
    try {
      localStorage.setItem(REGION_SELECTOR_TIP_STORAGE_KEY, 'true')
    } catch {}
  }

  return (
    <Popover open={open} modal={false}>
      <PopoverAnchor asChild>
        <div className="relative w-full bg-[var(--l1-background)]">{children}</div>
      </PopoverAnchor>
      <PopoverContent
        side="right"
        align="start"
        sideOffset={12}
        collisionPadding={16}
        onOpenAutoFocus={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
        onEscapeKeyDown={(event) => {
          event.preventDefault()
          dismiss()
        }}
        style={{ zIndex: 10 }}
        className="!w-[min(320px,calc(100vw-2rem))] !border-0 !bg-[var(--accent-primary)] !p-3 !text-[var(--base-white)] !shadow-lg !outline-none"
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-semibold leading-none text-[var(--base-white)]">
                Select your SigNoz region
              </p>
              <PopoverClose asChild>
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label="Dismiss region selector tip"
                  className="text-[var(--base-white)]/80 flex h-3.5 w-3.5 shrink-0 items-center justify-center transition-opacity hover:text-[var(--base-white)]"
                >
                  <X size={14} />
                </button>
              </PopoverClose>
            </div>
            <p className="text-[var(--base-white)]/80 text-xs leading-[18px]">
              Select your SigNoz region to ensure all code snippets in docs are updated to reflect
              your region.
            </p>
          </div>
          <div className="flex justify-end">
            <PopoverClose asChild>
              <button
                type="button"
                onClick={dismiss}
                className="flex h-8 items-center rounded-[3px] bg-[var(--base-white)] px-4 text-sm font-medium text-[var(--accent-primary)] transition-opacity hover:opacity-90"
              >
                Got it
              </button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
