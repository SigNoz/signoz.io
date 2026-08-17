'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { cn } from 'app/lib/utils'
import styles from './code-block.module.css'
import type { MinimapLineMeta } from './types'
import { minimapLineWidthPercent } from './utils'

const MINIMAP_KIND_CLASS: Record<'robin' | 'cherry' | 'forest' | 'amber', string> = {
  robin: styles.minimapRobin,
  cherry: styles.minimapCherry,
  forest: styles.minimapForest,
  amber: styles.minimapAmber,
}

export function CodeBlockMinimap({
  lines,
  preRef,
}: {
  lines: MinimapLineMeta[]
  preRef: React.RefObject<HTMLPreElement | null>
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const draggingRef = useRef(false)
  const [viewport, setViewport] = useState({ top: 0, height: 1, scrollable: false })

  const maxLength = useMemo(
    () => lines.reduce((max, line) => Math.max(max, line.length), 0),
    [lines]
  )

  const syncViewport = useCallback(() => {
    const pre = preRef.current
    if (!pre) return
    const { scrollTop, scrollHeight, clientHeight } = pre
    if (scrollHeight <= 0) {
      setViewport({ top: 0, height: 1, scrollable: false })
      return
    }
    const scrollable = scrollHeight - clientHeight > 1
    setViewport({
      top: scrollTop / scrollHeight,
      height: Math.min(1, clientHeight / scrollHeight),
      scrollable,
    })
  }, [preRef])

  useEffect(() => {
    const pre = preRef.current
    if (!pre) return

    syncViewport()
    pre.addEventListener('scroll', syncViewport, { passive: true })
    const observer = new ResizeObserver(syncViewport)
    observer.observe(pre)
    return () => {
      pre.removeEventListener('scroll', syncViewport)
      observer.disconnect()
    }
  }, [preRef, syncViewport, lines.length])

  /** Map a Y ratio on the track to pre scrollTop (center the click). */
  const scrollToTrackRatio = useCallback(
    (ratio: number, behavior: ScrollBehavior = 'auto') => {
      const pre = preRef.current
      if (!pre) return
      const maxScroll = Math.max(0, pre.scrollHeight - pre.clientHeight)
      if (maxScroll <= 0) return

      const clamped = Math.max(0, Math.min(1, ratio))
      const nextTop = clamped * pre.scrollHeight - pre.clientHeight / 2
      pre.scrollTo({
        top: Math.max(0, Math.min(nextTop, maxScroll)),
        behavior,
      })
    },
    [preRef]
  )

  const ratioFromPointer = useCallback((clientY: number) => {
    const track = trackRef.current
    if (!track) return 0
    const rect = track.getBoundingClientRect()
    if (rect.height <= 0) return 0
    return (clientY - rect.top) / rect.height
  }, [])

  const onPointerDown = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.button !== 0) return
      event.preventDefault()
      draggingRef.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
      scrollToTrackRatio(ratioFromPointer(event.clientY))
    },
    [ratioFromPointer, scrollToTrackRatio]
  )

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return
      scrollToTrackRatio(ratioFromPointer(event.clientY))
    },
    [ratioFromPointer, scrollToTrackRatio]
  )

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }, [])

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const pre = preRef.current
      if (!pre) return
      const maxScroll = Math.max(0, pre.scrollHeight - pre.clientHeight)
      if (maxScroll <= 0) return
      const step = pre.clientHeight * 0.8
      if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault()
        pre.scrollTo({ top: Math.min(pre.scrollTop + step, maxScroll) })
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault()
        pre.scrollTo({ top: Math.max(pre.scrollTop - step, 0) })
      } else if (event.key === 'Home') {
        event.preventDefault()
        pre.scrollTo({ top: 0 })
      } else if (event.key === 'End') {
        event.preventDefault()
        pre.scrollTo({ top: maxScroll })
      }
    },
    [preRef]
  )

  if (lines.length <= 0) return null

  const viewportStyle: CSSProperties | undefined = viewport.scrollable
    ? {
        top: `${viewport.top * 100}%`,
        height: `${viewport.height * 100}%`,
      }
    : undefined

  return (
    <div className={styles.minimap}>
      <div
        ref={trackRef}
        className={styles.minimapTrack}
        role="scrollbar"
        aria-label="Code minimap"
        aria-orientation="vertical"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(viewport.top * 100)}
        aria-disabled={!viewport.scrollable}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      >
        <div className={styles.minimapContent}>
          {lines.map((line, i) => {
            const kind = line.kind
            return (
              <div
                key={i}
                className={cn(
                  styles.minimapLine,
                  kind !== 'none' ? MINIMAP_KIND_CLASS[kind] : undefined
                )}
                style={{ width: `${minimapLineWidthPercent(line.length, maxLength)}%` }}
              />
            )
          })}
        </div>
        {viewportStyle ? <div className={styles.minimapViewport} style={viewportStyle} /> : null}
      </div>
    </div>
  )
}
