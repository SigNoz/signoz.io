'use client'

import { useEffect, useState } from 'react'
import { cn } from 'app/lib/utils'

// Near-white logos vanish on light cards, so each icon is pixel-sampled and
// only those get a dark chip.

const isWhiteNamed = (src: string) =>
  /[-_]white\.[a-z0-9]+$/i.test((src.split('/').pop() ?? '').split(/[?#]/)[0])

const probeUrls = (src: string): string[] => {
  if (!/^https?:\/\//.test(src) || src.startsWith(window.location.origin)) return [src]
  const pathname = new URL(src).pathname.replace(/^\/web\//, '/')
  return [`/api/icon-probe?src=${encodeURIComponent(src)}`, pathname]
}

const isNearWhite = (img: HTMLImageElement): boolean | null => {
  try {
    const size = 24
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return null
    ctx.drawImage(img, 0, 0, size, size)
    const data = ctx.getImageData(0, 0, size, size).data
    let sum = 0
    let count = 0
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 40) continue
      sum += (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255
      count++
    }
    return count > 0 && sum / count > 0.72
  } catch {
    return null
  }
}

export default function ListicleIcon({ src }: { src: string }) {
  const [needsChip, setNeedsChip] = useState(() => isWhiteNamed(src))

  useEffect(() => {
    if (isWhiteNamed(src)) return
    let cancelled = false

    const tryProbe = (urls: string[]) => {
      if (!urls.length || cancelled) return
      const probe = new Image()
      probe.onload = () => {
        if (cancelled) return
        const verdict = isNearWhite(probe)
        if (verdict === null) tryProbe(urls.slice(1))
        else if (verdict) setNeedsChip(true)
      }
      probe.onerror = () => tryProbe(urls.slice(1))
      probe.src = urls[0]
    }

    const html = document.documentElement
    let observer: MutationObserver | undefined
    if (html.classList.contains('dark')) {
      observer = new MutationObserver(() => {
        if (!html.classList.contains('dark')) {
          observer?.disconnect()
          tryProbe(probeUrls(src))
        }
      })
      observer.observe(html, { attributes: true, attributeFilter: ['class'] })
    } else {
      tryProbe(probeUrls(src))
    }

    return () => {
      cancelled = true
      observer?.disconnect()
    }
  }, [src])

  return (
    <div
      className={cn(
        'mb-3 flex h-12 w-12 items-center justify-center rounded-lg',
        needsChip && 'bg-signoz_ink-300 dark:bg-transparent'
      )}
    >
      <img src={src} alt="" className="no-theme-invert h-7 w-7 object-contain" loading="lazy" />
    </div>
  )
}
