'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export function getScrollFadeMask(top: boolean, bottom: boolean): string | undefined {
  if (!top && !bottom) return undefined
  const start = top ? 'transparent 0px, #000 20px' : '#000 0px'
  const end = bottom ? '#000 calc(100% - 20px), transparent 100%' : '#000 100%'
  return `linear-gradient(to bottom, ${start}, ${end})`
}

export const TOC_SCROLL_CONTAINER_CLASS =
  'min-h-0 flex-1 overflow-y-auto overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

export const TOC_SECTION_LABEL_CLASS =
  'mb-3 shrink-0 text-xs font-medium uppercase tracking-wide text-[var(--l2-foreground)]'

export const ARTICLE_TOC_RAIL_CLASS =
  'sticky top-[48px] box-border hidden max-h-[calc(100vh-48px)] w-80 min-w-80 max-w-80 flex-[0_0_320px] flex-col self-start overflow-hidden px-4 py-2 lg:flex'

/** Left nav rail for otel hub — stretch column like docs, sticky nav inside. */
export const ARTICLE_SIDENAV_STICKY_CLASS =
  'docs-sidebar sticky top-[48px] flex max-h-[calc(100vh-48px)] w-full flex-col overflow-hidden py-4 text-white'

export const ARTICLE_SIDENAV_SCROLL_CLASS =
  'min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

export function useTocScrollFade(dependencyKey?: unknown) {
  const tocItemsRef = useRef<HTMLDivElement | null>(null)
  const [scrollFade, setScrollFade] = useState({ top: false, bottom: false })

  const updateScrollFade = useCallback(() => {
    const el = tocItemsRef.current
    if (!el) {
      setScrollFade({ top: false, bottom: false })
      return
    }
    const { scrollTop, scrollHeight, clientHeight } = el
    const canScroll = scrollHeight > clientHeight + 1
    setScrollFade({
      top: canScroll && scrollTop > 1,
      bottom: canScroll && scrollTop + clientHeight < scrollHeight - 1,
    })
  }, [])

  useEffect(() => {
    const el = tocItemsRef.current
    if (!el) return

    updateScrollFade()
    el.addEventListener('scroll', updateScrollFade, { passive: true })
    const observer = new ResizeObserver(() => updateScrollFade())
    observer.observe(el)
    if (el.firstElementChild) observer.observe(el.firstElementChild)

    return () => {
      el.removeEventListener('scroll', updateScrollFade)
      observer.disconnect()
    }
  }, [updateScrollFade, dependencyKey])

  const scrollFadeStyle = {
    WebkitMaskImage: getScrollFadeMask(scrollFade.top, scrollFade.bottom),
    maskImage: getScrollFadeMask(scrollFade.top, scrollFade.bottom),
  }

  return { tocItemsRef, scrollFade, scrollFadeStyle, updateScrollFade }
}
