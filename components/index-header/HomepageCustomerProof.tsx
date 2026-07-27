'use client'

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from 'react'

import { cn } from 'app/lib/utils'

import { BentoBoard } from './homepage-customer-proof/CustomerProofBoard'
import {
  carouselBoardWidth,
  carouselCycleWidth,
  carouselDurationSeconds,
  carouselRailGap,
} from './homepage-customer-proof/HomepageCustomerProof.constants'
import type { DragState } from './homepage-customer-proof/HomepageCustomerProof.types'
import {
  getCarouselTranslateX,
  normalizeCarouselOffset,
} from './homepage-customer-proof/HomepageCustomerProof.utils'

export default function HomepageCustomerProof() {
  const [isDragging, setIsDragging] = useState(false)
  const [isExploring, setIsExploring] = useState(false)
  const [isTouchPaused, setIsTouchPaused] = useState(false)
  const [animationDelay, setAnimationDelay] = useState(0)
  const viewportRef = useRef<HTMLDivElement>(null)
  const railRef = useRef<HTMLDivElement>(null)
  const dragStateRef = useRef<DragState | null>(null)
  const manualOffsetRef = useRef<number | null>(null)
  const suppressClickRef = useRef(false)
  const touchPausedRef = useRef(false)

  const updateManualOffset = (offset: number, normalize = true) => {
    const nextOffset = normalize ? normalizeCarouselOffset(offset) : offset
    manualOffsetRef.current = nextOffset
    railRef.current?.style.setProperty('--proof-manual-offset', `${nextOffset}px`)
    return nextOffset
  }

  const beginManualExploration = () => {
    const currentOffset = manualOffsetRef.current ?? getCarouselTranslateX(railRef.current)
    const nextOffset = updateManualOffset(currentOffset)
    setIsExploring(true)
    return nextOffset
  }

  const resumeAutoMotion = () => {
    const currentOffset = manualOffsetRef.current
    if (currentOffset === null) return

    setAnimationDelay((currentOffset / carouselCycleWidth) * carouselDurationSeconds)
    manualOffsetRef.current = null
    setIsExploring(false)
  }

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const handleWheel = (event: globalThis.WheelEvent) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.shiftKey
            ? event.deltaY
            : 0

      if (!delta) return

      event.preventDefault()
      const currentOffset = manualOffsetRef.current ?? getCarouselTranslateX(railRef.current)
      const nextOffset = normalizeCarouselOffset(currentOffset - delta)
      manualOffsetRef.current = nextOffset
      railRef.current?.style.setProperty('--proof-manual-offset', `${nextOffset}px`)
      setIsExploring(true)
    }

    viewport.addEventListener('wheel', handleWheel, { passive: false })
    return () => viewport.removeEventListener('wheel', handleWheel)
  }, [])

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    const usesNativeScroll = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const startOffset = usesNativeScroll ? 0 : beginManualExploration()
    dragStateRef.current = {
      pointerId: event.pointerId,
      startOffset,
      startScrollLeft: event.currentTarget.scrollLeft,
      startX: event.clientX,
      usesNativeScroll,
    }
    suppressClickRef.current = false
    setIsDragging(true)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    const delta = event.clientX - dragState.startX
    if (Math.abs(delta) > 4) {
      suppressClickRef.current = true
      event.preventDefault()
    }

    if (dragState.usesNativeScroll) {
      event.currentTarget.scrollLeft = dragState.startScrollLeft - delta
    } else {
      updateManualOffset(dragState.startOffset + delta)
    }
  }

  const finishDragging = (event: PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    dragStateRef.current = null
    setIsDragging(false)

    const target = event.target
    const tappedNonLink =
      event.type === 'pointerup' &&
      event.pointerType === 'touch' &&
      !dragState.usesNativeScroll &&
      !suppressClickRef.current &&
      target instanceof Element &&
      !target.closest('a')

    if (!tappedNonLink) return

    const nextTouchPaused = !touchPausedRef.current
    touchPausedRef.current = nextTouchPaused
    setIsTouchPaused(nextTouchPaused)
    if (!nextTouchPaused) {
      resumeAutoMotion()
      event.currentTarget.blur()
    }
  }

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    finishDragging(event)
    if (touchPausedRef.current) return
    resumeAutoMotion()
  }

  const handleFocusCapture = (event: FocusEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (event.target === event.currentTarget) return

      const targetRect = event.target.getBoundingClientRect()
      const viewportRect = event.currentTarget.getBoundingClientRect()
      if (targetRect.left < viewportRect.left) {
        event.currentTarget.scrollLeft -= viewportRect.left - targetRect.left
      } else if (targetRect.right > viewportRect.right) {
        event.currentTarget.scrollLeft += targetRect.right - viewportRect.right
      }
      return
    }

    const currentOffset = beginManualExploration()
    if (event.target === event.currentTarget) return

    const targetRect = event.target.getBoundingClientRect()
    const viewportRect = event.currentTarget.getBoundingClientRect()
    const safeInset = window.matchMedia('(min-width: 768px)').matches ? 48 : 24
    const safeLeft = viewportRect.left + safeInset
    const safeRight = viewportRect.right - safeInset
    let nextOffset = currentOffset

    if (targetRect.left < safeLeft) {
      nextOffset += safeLeft - targetRect.left
    } else if (targetRect.right > safeRight) {
      nextOffset -= targetRect.right - safeRight
    }

    updateManualOffset(Math.min(0, nextOffset), false)
  }

  const handleBlurCapture = (event: FocusEvent<HTMLDivElement>) => {
    if (event.relatedTarget && event.currentTarget.contains(event.relatedTarget)) return
    if (touchPausedRef.current) return
    resumeAutoMotion()
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    event.preventDefault()
    const distance = event.key === 'ArrowLeft' ? 320 : -320
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      event.currentTarget.scrollLeft -= distance
      return
    }

    const currentOffset = beginManualExploration()
    updateManualOffset(currentOffset + distance)
  }

  const handleClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    if (event.detail === 0) {
      suppressClickRef.current = false
      return
    }

    if (suppressClickRef.current) {
      event.preventDefault()
      event.stopPropagation()
      suppressClickRef.current = false
      return
    }

    // Pointer-activated links open in a new tab, so their focus can otherwise keep the rail
    // in manual mode after the user returns. Preserve focus for keyboard activation.
    if (!(event.target instanceof Element)) return

    const link = event.target.closest<HTMLAnchorElement>('a')
    if (!link) return

    if (touchPausedRef.current) {
      touchPausedRef.current = false
      setIsTouchPaused(false)
    }
    resumeAutoMotion()
    link.blur()
  }

  const railStyle = {
    '--proof-board-width': `${carouselBoardWidth}px`,
    '--proof-cycle-distance': `-${carouselCycleWidth}px`,
    '--proof-cycle-duration': `${carouselDurationSeconds}s`,
    '--proof-rail-gap': `${carouselRailGap}px`,
    animationDelay: `${animationDelay}s`,
  } as CSSProperties

  return (
    <section
      aria-label="Customer stories"
      className="relative mt-14 pb-14 sm:mt-16 md:pb-20 xl:mt-20"
      data-homepage-customer-proof
    >
      <div className="group relative">
        <div
          aria-label={
            isTouchPaused
              ? 'Customer stories carousel paused. Tap a non-linked card to resume.'
              : 'Customer stories carousel. Hover or focus to pause, tap a non-linked card on touch screens to pause or resume, then drag or use the left and right arrow keys to explore.'
          }
          className={cn(
            'w-full cursor-grab touch-pan-y overflow-hidden [-webkit-mask-image:linear-gradient(90deg,transparent_0,#000_24px,#000_calc(100%_-_24px),transparent_100%)] [mask-image:linear-gradient(90deg,transparent_0,#000_24px,#000_calc(100%_-_24px),transparent_100%)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signoz_robin-400 motion-reduce:touch-auto motion-reduce:overflow-x-auto motion-reduce:[-webkit-mask-image:none] motion-reduce:[mask-image:none] motion-reduce:[scrollbar-color:#3c4152_transparent] motion-reduce:[scrollbar-width:thin] motion-safe:md:[-webkit-mask-image:linear-gradient(90deg,transparent_0,#000_48px,#000_calc(100%_-_48px),transparent_100%)] motion-safe:md:[mask-image:linear-gradient(90deg,transparent_0,#000_48px,#000_calc(100%_-_48px),transparent_100%)]',
            isDragging && 'cursor-grabbing select-none [&_*]:cursor-grabbing [&_*]:select-none'
          )}
          data-proof-carousel-viewport
          onBlurCapture={handleBlurCapture}
          onClickCapture={handleClickCapture}
          onDragStart={(event) => event.preventDefault()}
          onFocusCapture={handleFocusCapture}
          onKeyDown={handleKeyDown}
          onPointerCancel={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerLeave={handlePointerLeave}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDragging}
          ref={viewportRef}
          role="group"
          tabIndex={0}
        >
          <div
            className={cn(
              'flex w-max animate-homepage-customer-proof-rail gap-[var(--proof-rail-gap)] will-change-transform group-focus-within:[animation-play-state:paused] group-active:[animation-play-state:paused] motion-reduce:!transform-none motion-reduce:!animate-none motion-reduce:will-change-auto [@media(hover:hover)]:group-hover:[animation-play-state:paused]',
              isExploring && '!animate-none [transform:translate3d(var(--proof-manual-offset),0,0)]'
            )}
            ref={railRef}
            style={railStyle}
          >
            <BentoBoard isClone={false} />
            <BentoBoard isClone />
          </div>
        </div>
      </div>
    </section>
  )
}
