'use client'

import dynamic from 'next/dynamic'
import { useSyncExternalStore } from 'react'

const DESKTOP_MEDIA_QUERY = '(min-width: 768px)'

const NoiseToSignalCanvas = dynamic(() => import('./NoiseToSignalCanvas'), { ssr: false })

// JS render guard: CSS hiding would leave the canvas and RAF loop mounted below `md`.
function subscribeToDesktopViewport(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_MEDIA_QUERY)
  mediaQuery.addEventListener('change', onStoreChange)
  return () => mediaQuery.removeEventListener('change', onStoreChange)
}

function getDesktopViewportSnapshot() {
  return window.matchMedia(DESKTOP_MEDIA_QUERY).matches
}

function getServerViewportSnapshot() {
  return false
}

const NOISY_TRACES: { token: string; points: string }[] = [
  {
    token: '--bg-cherry-500',
    points: '0,150 50,138 100,158 150,142 200,162 250,168 300,188 350,205 400,225',
  },
  {
    token: '--bg-amber-500',
    points: '0,192 50,205 100,185 150,200 200,190 250,205 300,208 350,218 400,225',
  },
  {
    token: '--bg-forest-500',
    points: '0,258 50,246 100,262 150,250 200,260 250,248 300,244 350,232 400,225',
  },
  {
    token: '--bg-sakura-500',
    points: '0,298 50,310 100,292 150,306 200,288 250,282 300,262 350,240 400,225',
  },
]

function NoiseToSignalPoster() {
  return (
    <div
      className="grid aspect-[4/3] w-full grid-rows-[2rem_minmax(0,1fr)_2.5rem] sm:aspect-[16/9]"
      aria-hidden
    >
      <div className="border-b border-[var(--l2-border)]" />
      <svg
        viewBox="0 0 800 450"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        role="presentation"
        focusable="false"
      >
        {/* faint dashed grid */}
        <g stroke="var(--l2-border)" strokeWidth="1" strokeDasharray="3 5" opacity="0.6">
          <line x1="0" y1="112" x2="800" y2="112" />
          <line x1="0" y1="225" x2="800" y2="225" />
          <line x1="0" y1="338" x2="800" y2="338" />
          <line x1="200" y1="0" x2="200" y2="450" />
          <line x1="600" y1="0" x2="600" y2="450" />
        </g>
        {/* inflection axis */}
        <line
          x1="400"
          y1="0"
          x2="400"
          y2="450"
          stroke="var(--l3-border)"
          strokeWidth="1"
          strokeDasharray="4 5"
        />
        {/* noisy traces converging into the inflection point */}
        <g fill="none" strokeWidth="1.5" opacity="0.55" strokeLinejoin="round">
          {NOISY_TRACES.map((trace) => (
            <polyline key={trace.token} points={trace.points} stroke={`var(${trace.token})`} />
          ))}
        </g>
        {/* resolved clean line with one anomaly bump and one dip */}
        <path
          d="M400 225 H520 c12 0 16 -40 26 -40 s14 40 26 40 H660 c10 0 12 26 20 26 s10 -26 20 -26 H800"
          fill="none"
          stroke="var(--bg-robin-500)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="400" cy="225" r="5" fill="var(--bg-robin-500)" />
      </svg>
      <div className="border-t border-[var(--l2-border)]" />
    </div>
  )
}

export default function NoiseToSignalStage() {
  const isDesktop = useSyncExternalStore(
    subscribeToDesktopViewport,
    getDesktopViewportSnapshot,
    getServerViewportSnapshot
  )

  if (!isDesktop) return <NoiseToSignalPoster />

  return <NoiseToSignalCanvas />
}
