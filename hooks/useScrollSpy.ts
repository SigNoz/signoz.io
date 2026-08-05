import { useEffect, useState } from 'react'

type ScrollSpyTocItem = {
  url: string
}

type UseScrollSpyOptions = {
  offset?: number
}

const DEFAULT_OFFSET_PX = 120

const resolveHeading = (item: ScrollSpyTocItem) => {
  const rawId = item.url.startsWith('#') ? item.url.slice(1) : item.url
  const normalizedId = rawId.replace(/-+$/g, '')
  const el = document.getElementById(rawId) || document.getElementById(normalizedId)
  if (!el || el.getClientRects().length === 0) return null
  return {
    url: item.url.startsWith('#') ? item.url : `#${rawId}`,
    el,
  }
}

export const useScrollSpy = (
  toc: ScrollSpyTocItem[] | undefined,
  options: UseScrollSpyOptions = {}
) => {
  const { offset = DEFAULT_OFFSET_PX } = options
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    if (!toc || toc.length === 0) return

    let rafId = 0

    const updateActiveSection = () => {
      const headings = toc
        .map(resolveHeading)
        .filter((item): item is { url: string; el: HTMLElement } => item !== null)
        .sort((a, b) => a.el.getBoundingClientRect().top - b.el.getBoundingClientRect().top)

      if (headings.length === 0) return

      let activeUrl = headings[0].url
      for (const heading of headings) {
        if (heading.el.getBoundingClientRect().top <= offset) {
          activeUrl = heading.url
        }
      }
      setActiveSection((prev) => (prev === activeUrl ? prev : activeUrl))
    }

    const scheduleUpdate = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        rafId = 0
        updateActiveSection()
      })
    }

    updateActiveSection()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [toc, offset])

  return { activeSection, setActiveSection }
}
