'use client'

import { useEffect, useRef } from 'react'
import SearchBar from '@/components/ui/SearchBar'
import { SEARCH_PLACEHOLDERS } from './constants'
import Image from 'next/image'
import DitherCanvas from '@/components/DitherCanvas/DitherCanvas'

const HERO_OVERLAY_GRADIENT =
  'linear-gradient(0deg, var(--l1-background) 0%, color-mix(in srgb, var(--l1-background) 90%, transparent) 20%, color-mix(in srgb, var(--l1-background) 80%, transparent) 40%, color-mix(in srgb, var(--l1-background) 60%, transparent) 60%, color-mix(in srgb, var(--l1-background) 10%, transparent) 85%, transparent 100%)'

const PROGRESSIVE_BLUR_LAYERS = [
  { blur: 1, mask: 'linear-gradient(0deg, black 0%, transparent 40%)' },
  { blur: 4, mask: 'linear-gradient(0deg, black 0%, transparent 55%)' },
  { blur: 12, mask: 'linear-gradient(0deg, black 0%, transparent 70%)' },
  { blur: 24, mask: 'linear-gradient(0deg, black 0%, transparent 85%)' },
]

const TITLE_GLOW =
  'drop-shadow(0 8px 18px color-mix(in srgb, var(--accent-sakura) 75%, transparent)) drop-shadow(0 2px 4px color-mix(in srgb, var(--accent-sakura) 45%, transparent))'

const PARALLAX_MAX_X = 10
const PARALLAX_MAX_Y = 7

export default function Hero() {
  const titleLayerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)
  const targetRef = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const tick = () => {
      const layer = titleLayerRef.current
      if (layer) {
        const cur = currentRef.current
        const tgt = targetRef.current
        cur.x += (tgt.x - cur.x) * 0.08
        cur.y += (tgt.y - cur.y) * 0.08
        layer.style.transform = `translate3d(${cur.x.toFixed(2)}px, ${cur.y.toFixed(2)}px, 0)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      targetRef.current = { x: nx * PARALLAX_MAX_X * 2, y: ny * PARALLAX_MAX_Y * 2 }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <DitherCanvas enableClick={false} className="relative w-full md:h-[513px]">
      <div className="relative w-full overflow-hidden md:h-[513px]">
        <div className="pointer-events-none relative w-full md:absolute md:inset-0 md:overflow-hidden">
          <Image
            src="/img/docs-introduction/hero-illustration.webp"
            alt=""
            width={4096}
            height={1805}
            className="block h-auto w-full max-w-none object-cover object-top md:absolute md:inset-0 md:h-full md:w-full"
            sizes="100vw"
            priority
            aria-hidden
          />

          <div
            ref={titleLayerRef}
            className="absolute inset-0 will-change-transform"
            style={{
              backgroundColor: 'var(--base-white)',
              WebkitMaskImage: 'url(/img/docs-introduction/hero-title-mask.webp)',
              maskImage: 'url(/img/docs-introduction/hero-title-mask.webp)',
              WebkitMaskSize: 'cover',
              maskSize: 'cover',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'center top',
              maskPosition: 'center top',
              filter: TITLE_GLOW,
            }}
            aria-hidden
          />
          <span className="sr-only">Welcome to SigNoz Docs</span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[160px] md:h-[220px]">
          {PROGRESSIVE_BLUR_LAYERS.map((layer, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${layer.blur}px)`,
                WebkitBackdropFilter: `blur(${layer.blur}px)`,
                maskImage: layer.mask,
                WebkitMaskImage: layer.mask,
              }}
            />
          ))}
          <div className="absolute inset-0" style={{ backgroundImage: HERO_OVERLAY_GRADIENT }} />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-end px-4 pb-8 pt-6 md:absolute md:inset-x-0 md:bottom-0 md:h-[141px] md:pb-8 md:pt-0">
          <div className="flex w-full max-w-[590px] flex-col items-center">
            <SearchBar
              placeholder={SEARCH_PLACEHOLDERS}
              clickLocation="Docs Hero"
              className="!h-[52px] !max-w-none !rounded-[6px] !border-[var(--l2-border)] !bg-[var(--l2-background)] !px-[18px] !py-0 shadow-[0_12px_48px_color-mix(in_srgb,var(--base-black)_55%,transparent)] hover:!border-[var(--l2-border)] hover:!shadow-[0_12px_48px_color-mix(in_srgb,var(--base-black)_55%,transparent)] [&>span]:!text-sm [&>span]:!leading-[19px] [&>span]:!text-[var(--l3-foreground)] hover:[&>span]:!text-[var(--l1-foreground)] [&_svg]:!mr-2 [&_svg]:!h-4 [&_svg]:!w-4 [&_svg]:!text-[var(--l3-foreground)] hover:[&_svg]:!text-[var(--l1-foreground)]"
            />
          </div>
        </div>
      </div>
    </DitherCanvas>
  )
}
