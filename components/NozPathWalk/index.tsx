'use client'

import { useCallback, useMemo, useRef, useState } from 'react'

import { cn } from 'app/lib/utils'

import { NozPathWalkContext } from './NozPathWalk.context'
import type { NozPathWalkProps } from './NozPathWalk.types'
import NozSprite, { type NozSpriteHandle } from './NozSprite'
import styles from './NozPathWalk.module.css'
import { useNozPathWalk } from './useNozPathWalk'

/**
 * Wraps the stretch of page noz walks down. The wrapper element is the scroll
 * track. Mark where he should finish with `data-noz-end`; without that marker
 * the walk finishes just before the track leaves the viewport.
 *
 * Render `<NozSkyline />` inside whichever child section the silhouette belongs
 * behind. On small screens and under `prefers-reduced-motion` the walk is skipped
 * and only the static skyline is drawn.
 */
export default function NozPathWalk({
  children,
  badges,
  skylineSrc,
  skylineAlt,
  lanes,
  tuning,
  className,
  nozLabel = 'Noz, the SigNoz mascot — hover to make him wave',
}: NozPathWalkProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const sceneCanvasRef = useRef<HTMLCanvasElement>(null)
  const badgeLayerRef = useRef<HTMLDivElement>(null)
  const nozButtonRef = useRef<HTMLButtonElement>(null)
  const spriteRef = useRef<NozSpriteHandle>(null)
  const [skylineCanvas, setSkylineCanvas] = useState<HTMLCanvasElement | null>(null)

  const registerSkyline = useCallback((canvas: HTMLCanvasElement | null) => {
    setSkylineCanvas(canvas)
  }, [])

  const context = useMemo(() => ({ registerSkyline, skylineAlt }), [registerSkyline, skylineAlt])

  useNozPathWalk({
    trackRef,
    sceneCanvasRef,
    badgeLayerRef,
    nozButtonRef,
    spriteRef,
    skylineCanvas,
    skylineSrc,
    badgeCount: badges.length,
    lanes,
    tuning,
    wavingClassName: styles.waving,
  })

  return (
    <NozPathWalkContext.Provider value={context}>
      <div ref={trackRef} className={cn(styles.track, className)}>
        {children}
      </div>

      {/*
        Decorative overlays. The badges restate headings that are already in the
        page, and the trail is pure ornament, so the whole scene is hidden from
        assistive tech.
      */}
      <canvas
        ref={sceneCanvasRef}
        className={cn(styles.layer, styles.sceneLayer)}
        aria-hidden="true"
      />
      <div ref={badgeLayerRef} className={cn(styles.layer, styles.badgeLayer)} aria-hidden="true">
        {badges.map((label) => (
          <div key={label} className={styles.badge} data-noz-badge>
            {label}
          </div>
        ))}
      </div>
      <div className={cn(styles.layer, styles.nozLayer)}>
        <NozSprite ref={spriteRef} buttonRef={nozButtonRef} label={nozLabel} />
      </div>
    </NozPathWalkContext.Provider>
  )
}

export { default as NozSkyline } from './NozSkyline'
export type { NozPathWalkProps, NozPathWalkTuning } from './NozPathWalk.types'
