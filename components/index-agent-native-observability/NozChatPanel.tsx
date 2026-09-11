'use client'

import { ArrowUp, AtSign, Blocks, ChevronDown, Maximize2, Minus, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { cn } from 'app/lib/utils'

import './noz-input-peek.css'

const SUGGESTED_QUESTIONS = [
  'Why is my cache failing?',
  'Where can I monitor my k8s pods?',
  'How can I optimize my signoz bill?',
]

function NozInputPeek() {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return

    const noz = wrap.querySelector<HTMLElement>('.noz-input-peek')
    if (!noz) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let ready = false
    let raf = 0

    const reveal = () => {
      wrap.classList.add('is-live')
      noz.classList.add('is-live')
      window.setTimeout(
        () => {
          ready = true
        },
        reduced ? 0 : 1400
      )
    }

    let io: IntersectionObserver | undefined
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            reveal()
            io?.disconnect()
          }
        },
        { threshold: 0.4 }
      )
      io.observe(wrap)
    } else {
      reveal()
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!ready || reduced || raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const eye = noz.querySelector('.noz-input-peek__eye')
        const pupil = noz.querySelector<SVGGElement>('.noz-input-peek__pupil')
        if (!eye || !pupil) return
        const rect = eye.getBoundingClientRect()
        const deltaX = event.clientX - (rect.left + rect.width / 2)
        const deltaY = event.clientY - (rect.top + rect.height / 2)
        const distance = Math.hypot(deltaX, deltaY) || 1
        const magnitude = Math.min(1, distance / 160) * 1.25
        pupil.style.transform = `translate(${((deltaX / distance) * magnitude).toFixed(3)}px, ${(
          (deltaY / distance) *
          magnitude
        ).toFixed(3)}px)`
      })
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      io?.disconnect()
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div ref={wrapRef} className="noz-input-wrap m-4 mt-2 shrink-0">
      <div className="noz-input-peek" aria-hidden="true" data-markdown-ignore>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="4.36"
            y="8.5"
            width="15.46"
            height="11.98"
            rx="1.76"
            fill="var(--bg-cherry-500)"
          />
          <g className="noz-input-peek__head">
            <circle className="noz-input-peek__eye" cx="12.02" cy="14.49" r="3.88" fill="#F5F5F5" />
            <g className="noz-input-peek__pupil">
              <path
                d="M12.02 12.8c0 .93-.75 1.69-1.68 1.69-.31 0-.59-.08-.84-.22-.03.28 0 .58.08.87.36 1.35 1.75 2.15 3.1 1.79 1.35-.36 2.15-1.75 1.79-3.1-.32-1.2-1.47-1.97-2.67-1.86.14.24.22.53.22.83Z"
                fill="#0A0C10"
              />
            </g>
            <path
              d="M8.34 7.95 9.83 4.31a3.56 3.56 0 0 1 1.52-1.68l2.57-1.36c.21-.12.46.08.4.31l-.65 2.49a.85.85 0 0 0 .04.54l1.33 3.34h-3.62l.21-.62.7-.24a.28.28 0 0 0 0-.53l-.7-.23-.24-.71a.28.28 0 0 0-.53 0l-.23.71-.71.23a.28.28 0 0 0 0 .53l.71.24.2.62H8.34Zm-.56-.04h7.82a.56.56 0 1 1 0 1.12H7.78a.56.56 0 1 1 0-1.12Z"
              fill="var(--bg-robin-500)"
            />
          </g>
        </svg>
      </div>
      <svg className="noz-input-peek__hands" viewBox="0 0 34 7" fill="none" aria-hidden="true">
        <rect width="3.53" height="6.17" rx="1.47" fill="var(--bg-cherry-500)" />
        <rect x="30.47" width="3.53" height="6.17" rx="1.47" fill="var(--bg-cherry-500)" />
      </svg>
      <div className="relative z-[2] rounded-lg border border-[var(--l2-border)] bg-[var(--l1-background)] px-3 pb-2.5 pt-3">
        <span className="text-sm text-[var(--l3-foreground)]">Ask Noz…</span>
        <div className="mt-7 flex items-center justify-between">
          <span className="-ml-1.5 flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[13px] text-[var(--l2-foreground)] transition-colors hover:bg-[var(--l3-background)] hover:text-[var(--l1-foreground)]">
            <Blocks size={14} strokeWidth={1.8} />
            Skills
            <ChevronDown size={13} strokeWidth={1.8} />
          </span>
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md text-[var(--l3-foreground)] transition-colors hover:bg-[var(--l3-background)] hover:text-[var(--l2-foreground-hover)]">
              <AtSign size={15} strokeWidth={1.8} />
            </span>
            <span className="flex size-8 items-center justify-center rounded-full bg-[var(--primary-background)] text-[var(--primary-foreground)] transition-colors hover:bg-[var(--primary-background-hover)]">
              <ArrowUp size={15} strokeWidth={2.2} />
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function NozChatPanel({ className = '' }: { className?: string }) {
  return (
    <div
      className={cn('rounded-[18px] p-px shadow-[0_34px_120px_rgba(0,0,0,0.58)]', className)}
      style={{
        background:
          'linear-gradient(135deg, color-mix(in srgb, var(--base-white) 16%, transparent), color-mix(in srgb, var(--base-white) 4%, transparent) 42%, color-mix(in srgb, var(--base-white) 9%, transparent))',
      }}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[17px] bg-[var(--l1-background)]">
        <div className="flex shrink-0 items-center justify-between px-4 pt-3">
          <span className="text-sm font-medium text-[var(--l1-foreground)]">New chat</span>
          <div className="flex items-center gap-0.5 text-[var(--l3-foreground)]">
            {[Minus, Maximize2, X].map((Icon, index) => (
              <span
                key={index}
                className="flex size-6 items-center justify-center rounded-md transition-colors hover:bg-[var(--l3-background)] hover:text-[var(--l2-foreground-hover)]"
              >
                <Icon size={13} strokeWidth={2} />
              </span>
            ))}
          </div>
        </div>

        <div className="min-h-10 flex-1" />

        <div className="px-4">
          <p className="m-0 text-lg font-semibold leading-6 text-[var(--l1-foreground)]">Noz</p>
          <p className="m-0 mt-2 max-w-[36ch] text-sm leading-6 text-[var(--l2-foreground)]">
            I can help you understand and be the all-seeing eye over your entire infrastructure.
            What do you need?
          </p>

          <div className="mt-4 flex flex-col items-start gap-2">
            {SUGGESTED_QUESTIONS.map((question) => (
              <span
                key={question}
                className="cursor-default rounded-md bg-[var(--l3-background)] px-3 py-1.5 text-[13px] leading-5 text-[var(--l2-foreground)] transition-colors hover:bg-[var(--l3-background-hover)] hover:text-[var(--l1-foreground)]"
              >
                {question}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8" />

        <NozInputPeek />
      </div>
    </div>
  )
}
