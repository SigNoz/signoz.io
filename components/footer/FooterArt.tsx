'use client'

import { useEffect, useRef } from 'react'

import './footer-fx.css'

const CFG = {
  row: 30,
  minW: 16,
  maxW: 58,
  density: 0.1,
  trailChance: 0.5,
  trailMul: [1.6, 3.4] as const,
  tones: ['c', 'c', 'c', 'b', 'b', 'a', 'a'] as const,
  stagger: 900,
  dur: [340, 680] as const,
}

const ROWS = 4

type Tone = (typeof CFG.tones)[number]

interface BlockSpec {
  tone: Tone
  w: number
  left: number
  top: number
  dur: number
  delay: number
}

interface TrackedBlock {
  el: HTMLSpanElement
  spec: BlockSpec
  fieldW: number
}

const rand = (min: number, max: number) => min + Math.random() * (max - min)
const pick = <T,>(list: readonly T[]): T => list[(Math.random() * list.length) | 0]

function makeBlock(fieldW: number): BlockSpec {
  const w = Math.round(rand(CFG.minW, CFG.maxW))
  return {
    tone: pick(CFG.tones),
    w,
    left: Math.round(rand(0, Math.max(0, fieldW - w - 8))),
    top: ((Math.random() * ROWS) | 0) * CFG.row,
    dur: Math.round(rand(CFG.dur[0], CFG.dur[1])),
    delay: Math.round(Math.random() * CFG.stagger),
  }
}

function paint(spec: BlockSpec, host: HTMLElement): HTMLSpanElement {
  const el = document.createElement('span')
  el.className = 'fx__block'
  el.dataset.tone = spec.tone
  el.style.left = `${spec.left}px`
  el.style.top = `${spec.top}px`
  el.style.setProperty('--w', `${spec.w}px`)
  el.style.setProperty('--d', `${spec.dur}ms`)
  el.style.setProperty('--delay', `${spec.delay}ms`)
  host.appendChild(el)
  return el
}

export default function FooterArt() {
  const rootRef = useRef<HTMLDivElement>(null)
  const fxRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const fx = fxRef.current
    const field = fieldRef.current
    if (!root || !fx || !field) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let blocks: TrackedBlock[] = []
    let ambientTimer: ReturnType<typeof setInterval> | undefined
    const recycleTimers = new Set<ReturnType<typeof setTimeout>>()

    const buildRails = () => {
      fx.querySelectorAll('.fx__rail').forEach((rail) => rail.remove())
      const width = fx.clientWidth
      const fractions = [0.02, 0.25, 0.5, 0.75, 0.98]
      fractions.forEach((fraction) => {
        const rail = document.createElement('span')
        rail.className = 'fx__rail'
        rail.style.left = `${Math.round(width * fraction)}px`
        fx.appendChild(rail)
      })
    }

    const buildField = () => {
      field.innerHTML = ''
      field.style.top = '0px'
      field.style.height = `${ROWS * CFG.row}px`

      const width = field.clientWidth
      if (!width) return

      const count = Math.max(4, Math.round(((width * ROWS * CFG.row) / 10000) * CFG.density * 10))

      for (let i = 0; i < count; i += 1) {
        const spec = makeBlock(width)
        blocks.push({ el: paint(spec, field), spec, fieldW: width })

        if (spec.tone !== 'c' && Math.random() < CFG.trailChance) {
          const trail: BlockSpec = {
            tone: 'c',
            w: Math.round(spec.w * rand(CFG.trailMul[0], CFG.trailMul[1])),
            left: spec.left + spec.w,
            top: spec.top,
            dur: spec.dur + 140,
            delay: spec.delay + 60,
          }
          if (trail.left + trail.w < width) {
            blocks.push({ el: paint(trail, field), spec: trail, fieldW: width })
          }
        }
      }
    }

    const build = () => {
      blocks = []
      buildRails()
      buildField()
    }

    const recycle = (block: TrackedBlock) => {
      const { el } = block
      el.style.setProperty('--delay', '0ms')
      el.style.width = '0px'

      const timer = setTimeout(() => {
        recycleTimers.delete(timer)
        const spec = makeBlock(block.fieldW)
        el.dataset.tone = spec.tone
        el.style.left = `${spec.left}px`
        el.style.top = `${spec.top}px`
        el.style.setProperty('--w', `${spec.w}px`)
        el.style.setProperty('--d', `${spec.dur}ms`)
        el.style.width = ''
        block.spec = spec
      }, block.spec.dur + 90)
      recycleTimers.add(timer)
    }

    const start = () => {
      fx.classList.add('is-live')
      if (reduced.matches) return

      ambientTimer = setInterval(() => {
        if (document.hidden || !blocks.length) return
        for (let n = 0; n < 3; n += 1) {
          const block = blocks[(Math.random() * blocks.length) | 0]
          if (block) recycle(block)
        }
      }, 2600)
    }

    build()

    let io: IntersectionObserver | undefined
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            start()
            io?.disconnect()
          }
        },
        { rootMargin: '0px 0px -12% 0px', threshold: 0.01 }
      )
      io.observe(root)
    } else {
      start()
    }

    let resizeTimer: ReturnType<typeof setTimeout> | undefined
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(build, 180)
    }
    window.addEventListener('resize', onResize)

    return () => {
      io?.disconnect()
      if (ambientTimer) clearInterval(ambientTimer)
      recycleTimers.forEach((timer) => clearTimeout(timer))
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div ref={rootRef} className="footer-effect" aria-hidden="true" data-markdown-ignore>
      <div ref={fxRef} className="fx">
        <div className="fx__rows" />
        <div ref={fieldRef} className="fx__field" />
      </div>
    </div>
  )
}
