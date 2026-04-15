'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { OLLY_IMAGES } from '../data/constants'

interface HeroSectionProps {
  onStart: () => void
}

export default function HeroSection({ onStart }: HeroSectionProps) {
  const [counter, setCounter] = useState(0)
  const target = 1247

  useEffect(() => {
    const step = Math.ceil(target / 40)
    const interval = setInterval(() => {
      setCounter((prev) => {
        const next = prev + step
        if (next >= target) {
          clearInterval(interval)
          return target
        }
        return next
      })
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pb-[60px] pt-16 text-center md:pt-10">
      {/* Branding */}
      <div
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-[18px] py-2 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.08em] text-[var(--text-dim)]"
        style={{ animation: 'fadeDown 0.8s ease' }}
      >
        <span
          className="h-[6px] w-[6px] rounded-full bg-[var(--accent)]"
          style={{ animation: 'pulse 2s ease-in-out infinite' }}
        />
        From the incident responders at{' '}
        <a
          href="https://signoz.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text)] no-underline transition-colors duration-200 hover:text-[var(--accent)]"
        >
          SigNoz
        </a>
      </div>

      {/* Olly */}
      <div
        className="relative mb-4 flex justify-center"
        style={{ animation: 'fadeUp 0.8s ease 0.3s both' }}
      >
        <Image
          src={OLLY_IMAGES.sleeping.src}
          alt={OLLY_IMAGES.sleeping.alt}
          width={280}
          height={240}
          className="h-auto max-h-[240px] w-[280px] object-contain drop-shadow-[0_8px_30px_rgba(255,61,61,0.15)]"
          style={{ animation: 'ollyFloat 4s ease-in-out infinite' }}
          priority
        />
      </div>

      {/* Headline */}
      <h1
        className="font-[family-name:var(--font-outfit)] font-extrabold leading-[0.95] tracking-[-0.03em]"
        style={{ fontSize: 'clamp(42px, 8vw, 80px)', animation: 'fadeUp 0.8s ease 0.1s both' }}
      >
        <span className="block text-[0.45em] font-medium uppercase tracking-[0.06em] text-[var(--text-dim)]">
          How much has AI
        </span>
        <span className="relative text-[var(--accent)]">
          Deskilled
          <span className="absolute bottom-[2px] left-0 right-0 h-1 rounded-sm bg-[var(--accent)] opacity-30" />
        </span>{' '}
        You?
      </h1>

      {/* Subtitle */}
      <p
        className="mb-12 mt-5 max-w-[500px] text-[17px] leading-relaxed text-[var(--text-dim)]"
        style={{ animation: 'fadeUp 0.8s ease 0.25s both' }}
      >
        7 incident scenarios. Zero AI assistance.
        <br />
        Find out how much{' '}
        <strong className="font-semibold text-[var(--text)]">
          muscle memory you&apos;ve lost
        </strong>{' '}
        since you started letting copilots think for you.
      </p>

      {/* CTA Button */}
      <button
        onClick={onStart}
        className="group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-md border-none bg-[var(--accent)] px-10 py-[18px] font-[family-name:var(--font-jetbrains)] text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,61,61,0.3)]"
        style={{ animation: 'fadeUp 0.8s ease 0.4s both' }}
      >
        <span className="duration-600 absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform group-hover:translate-x-full" />
        Run Diagnostic <span>&rarr;</span>
      </button>

      {/* Stats */}
      <div
        className="mt-[50px] flex justify-center gap-10"
        style={{ animation: 'fadeUp 0.8s ease 0.5s both' }}
      >
        <div className="text-center">
          <div className="font-[family-name:var(--font-jetbrains)] text-[22px] font-bold text-[var(--accent)]">
            {counter.toLocaleString()}
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[var(--text-dim)]">
            SREs assessed
          </div>
        </div>
        <div className="text-center">
          <div className="font-[family-name:var(--font-jetbrains)] text-[22px] font-bold text-[var(--accent)]">
            68%
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[var(--text-dim)]">
            Show decay
          </div>
        </div>
        <div className="text-center">
          <div className="font-[family-name:var(--font-jetbrains)] text-[22px] font-bold text-[var(--accent)]">
            4.2
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[var(--text-dim)]">
            Avg severity
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-0 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.1em] text-[var(--text-dim)]"
        style={{ animation: 'fadeUp 0.8s ease 0.6s both' }}
      >
        <span
          className="h-[30px] w-px"
          style={{
            background: 'linear-gradient(to bottom, var(--text-dim), transparent)',
            animation: 'scrollBounce 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
