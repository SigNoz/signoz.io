'use client'

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'

import {
  FeaturedQuoteCard,
  LogoCard,
  QuoteCard,
} from '@/components/index-header/homepage-customer-proof/CustomerProofCards'
import type { LogoSpec } from '@/components/index-header/homepage-customer-proof/HomepageCustomerProof.types'
import { useLogEvent } from '@/hooks/useLogEvent'

import { customerLogos, customerQuotes, type CustomerQuote } from './customerProof'

type ProofTile =
  | {
      featuredPosition: 0 | 1 | 2 | null
      proof: CustomerQuote
      type: 'quote'
    }
  | {
      wide: boolean
      logo: LogoSpec
      type: 'logo'
    }

const featuredQuotePositions = new Map<number, 0 | 1 | 2>([
  [0, 0],
  [12, 1],
  [18, 2],
])
const proofBoardWidth = 4368
const proofCycleWidth = proofBoardWidth
const autoScrollPixelsPerSecond = 18.5
const customerProofClickLocation = 'Customers Proof Wall'
let nextLogoIndex = 0

const proofTiles = customerQuotes.flatMap((proof, quoteIndex) => {
  const tiles: ProofTile[] = [
    {
      featuredPosition: featuredQuotePositions.get(quoteIndex) ?? null,
      proof,
      type: 'quote',
    },
  ]
  const logoCount = quoteIndex < 9 ? 3 : 2

  for (let index = 0; index < logoCount; index += 1) {
    const logo = customerLogos[nextLogoIndex]
    if (!logo) break

    tiles.push({
      logo,
      type: 'logo',
      wide: nextLogoIndex % 3 === 0,
    })
    nextLogoIndex += 1
  }

  return tiles
})

function ProofBoard({ isClone }: { isClone: boolean }) {
  return (
    <div
      aria-hidden={isClone ? true : undefined}
      className={`grid shrink-0 grid-flow-row-dense grid-cols-[repeat(28,minmax(0,1fr))] grid-rows-[repeat(6,5rem)] gap-3 pr-3 ${isClone ? 'motion-reduce:hidden' : ''}`}
      style={{ width: proofBoardWidth }}
    >
      {proofTiles.map((tile, tileIndex) => (
        <div
          className={`${
            tile.type === 'quote'
              ? tile.featuredPosition === 0
                ? 'col-span-4 col-start-1 row-span-2 row-start-1 min-h-0 min-w-0'
                : tile.featuredPosition === 1
                  ? 'col-span-4 col-start-10 row-span-2 row-start-3 min-h-0 min-w-0'
                  : tile.featuredPosition === 2
                    ? 'col-span-4 col-start-[19] row-span-2 row-start-5 min-h-0 min-w-0'
                    : 'col-span-3 min-h-0 min-w-0'
              : tile.wide
                ? 'col-span-2 min-h-0 min-w-0'
                : 'col-span-1 min-h-0 min-w-0'
          } ${
            tile.type === 'quote'
              ? tile.featuredPosition !== null
                ? '[&_blockquote_p]:!text-sm [&_blockquote_p]:!leading-5'
                : '[&_blockquote_p]:!text-xs [&_blockquote_p]:!leading-4'
              : ''
          }`}
          key={`${tile.type}-${tileIndex}`}
        >
          {tile.type === 'quote' ? (
            tile.featuredPosition !== null ? (
              <FeaturedQuoteCard
                attribution={tile.proof.attribution}
                clickLocation={customerProofClickLocation}
                href={tile.proof.href}
                isClone={isClone}
                logo={tile.proof.logo}
                quote={tile.proof.quote}
                theme={tile.proof.themes[0]}
              />
            ) : (
              <QuoteCard
                attribution={tile.proof.attribution}
                clickLocation={customerProofClickLocation}
                href={tile.proof.href}
                isClone={isClone}
                logo={tile.proof.logo}
                quote={tile.proof.quote}
                theme={tile.proof.themes[0]}
              />
            )
          ) : (
            <LogoCard
              clickLocation={customerProofClickLocation}
              isClone={isClone}
              logo={tile.logo}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default function CustomerProofCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null)
  const autoScrollPositionRef = useRef(0)
  const manualPauseUntilRef = useRef(0)
  const dragRef = useRef({
    active: false,
    moved: false,
    scrollLeft: 0,
    startX: 0,
  })
  const suppressClickRef = useRef(false)
  const [isPaused, setIsPaused] = useState(false)
  const logEvent = useLogEvent()

  const trackControl = (clickName: string, clickText: string) => {
    logEvent({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: {
        clickType: 'Customer Proof',
        clickName,
        clickLocation: customerProofClickLocation,
        clickText,
      },
    })
  }

  const normalizeScrollPosition = () => {
    const viewport = viewportRef.current
    if (!viewport) return

    const normalizedPosition =
      viewport.scrollLeft >= proofCycleWidth
        ? viewport.scrollLeft - proofCycleWidth
        : viewport.scrollLeft
    viewport.scrollLeft = normalizedPosition
    autoScrollPositionRef.current = normalizedPosition
  }

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport || isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      return

    let animationFrame = 0
    let previousTime = performance.now()
    const animate = (currentTime: number) => {
      const elapsedSeconds = Math.min(currentTime - previousTime, 64) / 1000
      previousTime = currentTime
      const viewportRect = viewport.getBoundingClientRect()
      const carousel = viewport.closest('[data-customer-proof-carousel]')
      const isVisible = viewportRect.bottom >= -200 && viewportRect.top <= window.innerHeight + 200
      const isHovered = carousel?.matches(':hover') ?? false
      const isFocused = carousel?.contains(document.activeElement) ?? false

      if (
        isVisible &&
        !dragRef.current.active &&
        !isFocused &&
        !isHovered &&
        currentTime >= manualPauseUntilRef.current &&
        document.visibilityState === 'visible'
      ) {
        autoScrollPositionRef.current += elapsedSeconds * autoScrollPixelsPerSecond
        if (autoScrollPositionRef.current >= proofCycleWidth) {
          autoScrollPositionRef.current -= proofCycleWidth
        }
        viewport.scrollLeft = autoScrollPositionRef.current
      }

      animationFrame = window.requestAnimationFrame(animate)
    }

    animationFrame = window.requestAnimationFrame(animate)
    return () => {
      window.cancelAnimationFrame(animationFrame)
    }
  }, [isPaused])

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const respectReducedMotion = () => {
      if (reducedMotionQuery.matches) setIsPaused(true)
    }

    respectReducedMotion()
    reducedMotionQuery.addEventListener('change', respectReducedMotion)
    return () => reducedMotionQuery.removeEventListener('change', respectReducedMotion)
  }, [])

  const move = (direction: -1 | 1) => {
    const viewport = viewportRef.current
    if (!viewport) return
    manualPauseUntilRef.current = performance.now() + 650

    if (direction === -1 && viewport.scrollLeft < viewport.clientWidth) {
      viewport.scrollLeft += proofCycleWidth
    }

    viewport.scrollBy({
      behavior: 'smooth',
      left: direction * viewport.clientWidth * 0.8,
    })
    window.setTimeout(normalizeScrollPosition, 500)
  }

  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    const viewport = viewportRef.current
    if (!viewport) return

    if (viewport.scrollLeft < viewport.clientWidth) {
      viewport.scrollLeft += proofCycleWidth
    }

    dragRef.current = {
      active: true,
      moved: false,
      scrollLeft: viewport.scrollLeft,
      startX: event.clientX,
    }
  }

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current
    const drag = dragRef.current
    if (!viewport || !drag.active || (event.buttons & 1) === 0) return

    const distance = event.clientX - drag.startX
    if (Math.abs(distance) > 4) drag.moved = true
    if (!drag.moved) return

    event.preventDefault()
    viewport.scrollLeft = drag.scrollLeft - distance
  }

  const finishDrag = () => {
    const drag = dragRef.current
    if (!drag.active) return

    suppressClickRef.current = drag.moved
    drag.active = false
    if (drag.moved) trackControl('Drag Customer Proof Wall', 'Drag proof wall')
    normalizeScrollPosition()

    window.setTimeout(() => {
      suppressClickRef.current = false
    }, 0)
  }

  return (
    <div data-customer-proof-carousel onMouseLeave={finishDrag}>
      <div className="relative">
        <div
          aria-label={`Customer proof carousel. ${
            isPaused
              ? 'Automatic scrolling is paused.'
              : 'Automatically scrolls and pauses while hovered or focused.'
          }`}
          aria-roledescription="carousel"
          className="cursor-grab select-none overflow-x-auto pb-4 [scrollbar-width:none] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signoz_robin-400 active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
          onClickCapture={(event) => {
            if (!suppressClickRef.current) return
            event.preventDefault()
            event.stopPropagation()
          }}
          onDragStart={(event) => event.preventDefault()}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={finishDrag}
          ref={viewportRef}
          role="region"
          tabIndex={0}
        >
          <div className="flex w-max">
            <ProofBoard isClone={false} />
            <ProofBoard isClone />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-signoz_ink-500 via-signoz_ink-500/80 to-transparent sm:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-signoz_ink-500 via-signoz_ink-500/80 to-transparent sm:w-24"
        />
      </div>

      <div className="mt-4 flex justify-end">
        <div className="flex shrink-0 gap-2">
          <button
            aria-label={
              isPaused
                ? 'Resume automatic customer proof scrolling'
                : 'Pause automatic customer proof scrolling'
            }
            aria-pressed={isPaused}
            className="flex h-10 items-center justify-center gap-2 rounded-full border border-signoz_slate-400 px-4 text-sm text-signoz_vanilla-300 transition-colors hover:border-signoz_slate-300 hover:text-signoz_vanilla-100"
            onClick={() => {
              trackControl(
                isPaused ? 'Play Customer Proof Wall' : 'Pause Customer Proof Wall',
                isPaused ? 'Play' : 'Pause'
              )
              setIsPaused((current) => !current)
            }}
            type="button"
          >
            {isPaused ? (
              <Play aria-hidden="true" size={15} />
            ) : (
              <Pause aria-hidden="true" size={15} />
            )}
            {isPaused ? 'Play' : 'Pause'}
          </button>
          <button
            aria-label="Previous customer proof"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-signoz_slate-400 text-signoz_vanilla-300 transition-colors hover:border-signoz_slate-300 hover:text-signoz_vanilla-100"
            onClick={(event) => {
              trackControl('Previous Customer Proof', 'Previous proof')
              move(-1)
              if (event.detail !== 0) event.currentTarget.blur()
            }}
            type="button"
          >
            <ArrowLeft aria-hidden="true" size={17} />
          </button>
          <button
            aria-label="Next customer proof"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-signoz_slate-400 text-signoz_vanilla-300 transition-colors hover:border-signoz_slate-300 hover:text-signoz_vanilla-100"
            onClick={(event) => {
              trackControl('Next Customer Proof', 'Next proof')
              move(1)
              if (event.detail !== 0) event.currentTarget.blur()
            }}
            type="button"
          >
            <ArrowRight aria-hidden="true" size={17} />
          </button>
        </div>
      </div>
    </div>
  )
}
