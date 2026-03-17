'use client'
import { useEffect, useRef } from 'react'

export default function IncidentCostGraphic() {
  const svgRef = useRef<SVGSVGElement>(null)
  const animRef = useRef<number | null>(null)
  const timeRef = useRef(0)
  const isVisibleRef = useRef(false)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          startAnimation()
        } else {
          stopAnimation()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(svg)

    return () => {
      observer.disconnect()
      stopAnimation()
    }
  }, [])

  function startAnimation() {
    if (animRef.current !== null) return
    const animate = () => {
      if (!isVisibleRef.current) {
        animRef.current = null
        return
      }
      timeRef.current += 0.02
      updateAnimatedElements()
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
  }

  function stopAnimation() {
    if (animRef.current !== null) {
      cancelAnimationFrame(animRef.current)
      animRef.current = null
    }
  }

  function updateAnimatedElements() {
    const t = timeRef.current
    const svg = svgRef.current
    if (!svg) return

    for (let i = 0; i < 3; i++) {
      const pulse = 0.55 + 0.45 * Math.sin(t * 2 + i * 1.2)
      const unknownRect = svg.querySelector<SVGRectElement>(`#unknown-rect-${i}`)
      const unknownBorder = svg.querySelector<SVGRectElement>(`#unknown-border-${i}`)
      const questionMark = svg.querySelector<SVGTextElement>(`#question-${i}`)
      if (unknownRect) unknownRect.setAttribute('opacity', String(pulse))
      if (unknownBorder) unknownBorder.setAttribute('opacity', String(pulse * 0.5))
      if (questionMark) questionMark.setAttribute('opacity', String(pulse))
    }
  }

  const W = 1000
  const H = 520

  const scenarios = [
    { label: 'Normal Day', sub: 'Routine dashboard checks' },
    { label: 'P2 Incident', sub: '2hr elevated investigation' },
    { label: 'P1 Outage', sub: 'All hands, 4+ hours' },
  ]

  const csKnownTotal = 120
  const signozCost = 900

  const csKnownH = 55
  const signozH = 135
  const csUnknownH = [28, 70, 150]

  const sectionW = 300
  const barW = 56
  const gapBetweenBars = 36
  const startX = (W - sectionW * 3) / 2
  const barsBaseY = 390

  return (
    <div className="max-w-full overflow-hidden bg-transparent p-0">
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full">
        <defs>
          <filter id="glow-red" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-teal" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <pattern id="unknown-hash" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#FF6B6B" fillOpacity="0.2" />
            <line
              x1="0"
              y1="8"
              x2="8"
              y2="0"
              stroke="#FF6B6B"
              strokeWidth="1.5"
              strokeOpacity="0.35"
            />
          </pattern>
        </defs>

        {/* Title */}
        <text
          x={W / 2}
          y={38}
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="28"
          fontWeight="700"
          fontFamily="'IBM Plex Sans', -apple-system, sans-serif"
        >
          Same Data. Different Day. <tspan fill="#FF6B6B">Different Bill?</tspan>
        </text>
        <text
          x={W / 2}
          y={68}
          textAnchor="middle"
          fill="#888888"
          fontSize="16"
          fontFamily="'IBM Plex Mono', monospace"
        >
          100 GB/day ingestion · 3,000 GB/month
        </text>

        {scenarios.map((scenario, i) => {
          const sectionX = startX + i * sectionW
          const centerX = sectionX + sectionW / 2
          const csBarX = centerX - barW - gapBetweenBars / 2
          const szBarX = centerX + gapBetweenBars / 2
          const unknownH = csUnknownH[i]
          const csTotalH = csKnownH + unknownH

          return (
            <g key={i}>
              {/* Scenario label */}
              <text
                x={centerX}
                y={110}
                textAnchor="middle"
                fill="#FFFFFF"
                fontSize="19"
                fontWeight="700"
                fontFamily="'IBM Plex Sans', -apple-system, sans-serif"
              >
                {scenario.label}
              </text>
              <text
                x={centerX}
                y={133}
                textAnchor="middle"
                fill="#777777"
                fontSize="14"
                fontFamily="'IBM Plex Mono', monospace"
              >
                {scenario.sub}
              </text>

              {/* Section dividers */}
              {i > 0 && (
                <line
                  x1={sectionX}
                  y1={95}
                  x2={sectionX}
                  y2={barsBaseY + 30}
                  stroke="#2A2A32"
                  strokeWidth="1"
                />
              )}

              {/* ClickStack known bar */}
              <rect
                x={csBarX}
                y={barsBaseY - csKnownH}
                width={barW}
                height={csKnownH}
                rx="3"
                fill="#3A3A44"
              />
              <line
                x1={csBarX}
                y1={barsBaseY - csKnownH * 0.6}
                x2={csBarX + barW}
                y2={barsBaseY - csKnownH * 0.6}
                stroke="#4A4A54"
                strokeWidth="0.5"
              />

              {/* ClickStack unknown bar (hatched, animated via ref) */}
              <rect
                id={`unknown-rect-${i}`}
                x={csBarX}
                y={barsBaseY - csKnownH - unknownH}
                width={barW}
                height={unknownH}
                rx="3"
                fill="url(#unknown-hash)"
                opacity="0.55"
                filter="url(#glow-red)"
              />
              <rect
                id={`unknown-border-${i}`}
                x={csBarX}
                y={barsBaseY - csKnownH - unknownH}
                width={barW}
                height={unknownH}
                rx="3"
                fill="none"
                stroke="#FF6B6B"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.5"
              />

              {/* "?" on unknown region */}
              <text
                id={`question-${i}`}
                x={csBarX + barW / 2}
                y={barsBaseY - csKnownH - unknownH / 2 + 7}
                textAnchor="middle"
                fill="#FF6B6B"
                fontSize={unknownH > 50 ? '28' : '20'}
                fontWeight="700"
                fontFamily="'IBM Plex Mono', monospace"
                opacity="0.55"
              >
                ?
              </text>

              {/* ClickStack cost label */}
              <text
                x={csBarX + barW / 2}
                y={barsBaseY - csTotalH - 16}
                textAnchor="middle"
                fill="#FF6B6B"
                fontSize="17"
                fontWeight="600"
                fontFamily="'IBM Plex Mono', monospace"
              >
                ${csKnownTotal} + ?
              </text>

              {/* ClickStack name */}
              <text
                x={csBarX + barW / 2}
                y={barsBaseY + 22}
                textAnchor="middle"
                fill="#AAAAAA"
                fontSize="13"
                fontFamily="'IBM Plex Mono', monospace"
              >
                ClickStack
              </text>

              {/* SigNoz bar */}
              <rect
                x={szBarX}
                y={barsBaseY - signozH}
                width={barW}
                height={signozH}
                rx="3"
                fill="#44AA99"
                filter="url(#glow-teal)"
                opacity="0.85"
              />

              {/* SigNoz cost label */}
              <text
                x={szBarX + barW / 2}
                y={barsBaseY - signozH - 16}
                textAnchor="middle"
                fill="#44AA99"
                fontSize="17"
                fontWeight="600"
                fontFamily="'IBM Plex Mono', monospace"
              >
                ${signozCost}
              </text>

              {/* SigNoz name */}
              <text
                x={szBarX + barW / 2}
                y={barsBaseY + 22}
                textAnchor="middle"
                fill="#AAAAAA"
                fontSize="13"
                fontFamily="'IBM Plex Mono', monospace"
              >
                SigNoz
              </text>
            </g>
          )
        })}

        {/* Legend */}
        <g transform={`translate(${W / 2 - 270}, ${barsBaseY + 52})`}>
          <g>
            <rect x="0" y="0" width="14" height="14" rx="2" fill="#3A3A44" />
            <text
              x="22"
              y="12"
              fill="#888888"
              fontSize="14"
              fontFamily="'IBM Plex Mono', monospace"
            >
              Storage $0.03/GB + Ingest ~$0.01/GB
            </text>
          </g>
          <g transform="translate(360, 0)">
            <rect
              x="0"
              y="0"
              width="14"
              height="14"
              rx="2"
              fill="url(#unknown-hash)"
              stroke="#FF6B6B"
              strokeWidth="0.5"
              strokeDasharray="3 2"
            />
            <text
              x="22"
              y="12"
              fill="#888888"
              fontSize="14"
              fontFamily="'IBM Plex Mono', monospace"
            >
              Query compute
            </text>
          </g>
        </g>
      </svg>
    </div>
  )
}
