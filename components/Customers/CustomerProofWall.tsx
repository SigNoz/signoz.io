'use client'

import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import { usePathname } from 'next/navigation'

import { FeaturedQuoteCard, LogoCard, QuoteCard } from './ProofWallCards'
import type {
  LogoComponent,
  LogoSpec,
} from '@/components/index-header/homepage-customer-proof/HomepageCustomerProof.types'
import { useLogEvent } from '@/hooks/useLogEvent'
import EltropyLogo from '@/public/svgs/icons/eltropy.svg'

import type { ProofLogo, ProofQuote } from './Customers.types'

type ProofTile =
  | {
      featuredPosition: 0 | 1 | 2 | null
      proof: ProofQuote
      type: 'quote'
    }
  | {
      wide: boolean
      logo: LogoSpec
      type: 'logo'
    }

const proofLogoComponents: Record<string, LogoComponent> = {
  eltropy: EltropyLogo,
}

const featuredQuotePositions = new Map<number, 0 | 1 | 2>([
  [0, 0],
  [12, 1],
  [18, 2],
])
const proofRowCount = 6
const proofColumnUnitWidth = 156
const autoScrollPixelsPerSecond = 18.5
const customerProofClickLocation = 'Customers Proof Wall'

function toLogoSpec(logo: ProofLogo): LogoSpec {
  const { componentKey, ...spec } = logo
  return {
    ...spec,
    Logo: componentKey ? proofLogoComponents[componentKey] : undefined,
  }
}

interface CustomerProofWallProps {
  quotes: ProofQuote[]
  logos: ProofLogo[]
}

function ProofBoard({
  boardWidth,
  columnCount,
  isClone,
  tiles,
}: {
  boardWidth: number
  columnCount: number
  isClone: boolean
  tiles: ProofTile[]
}) {
  return (
    <div
      aria-hidden={isClone ? true : undefined}
      className={`grid shrink-0 grid-flow-row-dense grid-rows-[repeat(6,5rem)] gap-3 pr-3 ${isClone ? 'motion-reduce:hidden' : ''}`}
      style={{
        gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
        width: boardWidth,
      }}
    >
      {tiles.map((tile, tileIndex) => (
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
                logo={tile.proof.logo ? toLogoSpec(tile.proof.logo) : undefined}
                quote={tile.proof.quote}
                theme={tile.proof.themes[0]}
              />
            ) : (
              <QuoteCard
                attribution={tile.proof.attribution}
                clickLocation={customerProofClickLocation}
                href={tile.proof.href}
                isClone={isClone}
                logo={tile.proof.logo ? toLogoSpec(tile.proof.logo) : undefined}
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

export default function CustomerProofWall({ quotes, logos }: CustomerProofWallProps) {
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
  const pathname = usePathname()

  const { boardWidth, columnCount, tiles } = useMemo(() => {
    const computedTiles = quotes.flatMap((proof, quoteIndex) => {
      const quoteTiles: ProofTile[] = [
        {
          featuredPosition: featuredQuotePositions.get(quoteIndex) ?? null,
          proof,
          type: 'quote',
        },
      ]
      const logoCount = quoteIndex < 9 ? 3 : 2
      const startLogoIndex = Math.min(quoteIndex, 9) * 3 + Math.max(0, quoteIndex - 9) * 2

      for (let index = 0; index < logoCount; index += 1) {
        const logoIndex = startLogoIndex + index
        const logo = logos[logoIndex]
        if (!logo) break

        quoteTiles.push({
          logo: toLogoSpec(logo),
          type: 'logo',
          wide: logoIndex % 3 === 0,
        })
      }

      return quoteTiles
    })

    const totalCellUnits = computedTiles.reduce((units, tile) => {
      if (tile.type === 'quote') {
        return units + (tile.featuredPosition !== null ? 8 : 3)
      }
      return units + (tile.wide ? 2 : 1)
    }, 0)
    const columns = Math.ceil(totalCellUnits / proofRowCount)

    return {
      boardWidth: columns * proofColumnUnitWidth,
      columnCount: columns,
      tiles: computedTiles,
    }
  }, [logos, quotes])

  const proofCycleWidth = boardWidth

  const trackControl = (clickName: string, clickText: string) => {
    logEvent({
      eventName: 'Website Click',
      eventType: 'track',
      attributes: {
        clickType: 'Customer Proof',
        clickName,
        clickLocation: customerProofClickLocation,
        clickText,
        pageLocation: pathname,
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
  }, [isPaused, proofCycleWidth])

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const respectReducedMotion = () => {
      if (reducedMotionQuery.matches) setIsPaused(true)
    }

    respectReducedMotion()
    reducedMotionQuery.addEventListener('change', respectReducedMotion)
    return () => reducedMotionQuery.removeEventListener('change', respectReducedMotion)
  }, [])

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
          className="cursor-grab select-none overflow-x-auto pb-4 [scrollbar-width:none] focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
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
            <ProofBoard
              boardWidth={boardWidth}
              columnCount={columnCount}
              isClone={false}
              tiles={tiles}
            />
            <ProofBoard boardWidth={boardWidth} columnCount={columnCount} isClone tiles={tiles} />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--l1-background)] via-[color-mix(in_srgb,var(--l1-background)_80%,transparent)] to-transparent sm:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--l1-background)] via-[color-mix(in_srgb,var(--l1-background)_80%,transparent)] to-transparent sm:w-24"
        />
      </div>
    </div>
  )
}
