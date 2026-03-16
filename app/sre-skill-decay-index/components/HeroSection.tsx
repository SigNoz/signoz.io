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
    <section className="flex min-h-screen flex-col items-center justify-center relative px-6 pt-16 pb-[60px] text-center md:pt-10">

      {/* Branding */}
      <div
        className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-[18px] py-2 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.08em] text-[var(--text-dim)] mb-6"
        style={{ animation: 'fadeDown 0.8s ease' }}
      >
        <span className="h-[6px] w-[6px] rounded-full bg-[var(--accent)]" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
        From the incident responders at <a href="https://signoz.io/" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--accent)] no-underline transition-colors duration-200">SigNoz</a>
      </div>

      {/* Olly */}
      <div className="relative flex justify-center mb-4" style={{ animation: 'fadeUp 0.8s ease 0.3s both' }}>
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
        <span className="block text-[0.45em] font-medium tracking-[0.06em] uppercase text-[var(--text-dim)]">
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
        className="text-[17px] text-[var(--text-dim)] max-w-[500px] leading-relaxed mb-12 mt-5"
        style={{ animation: 'fadeUp 0.8s ease 0.25s both' }}
      >
        7 incident scenarios. Zero AI assistance.
        <br />
        Find out how much <strong className="text-[var(--text)] font-semibold">
          muscle memory you&apos;ve lost
        </strong>{' '}
        since you started letting copilots think for you.
      </p>

      {/* CTA Button */}
      <button
        onClick={onStart}
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-md border-none bg-[var(--accent)] px-10 py-[18px] font-[family-name:var(--font-jetbrains)] text-[13px] font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(255,61,61,0.3)] cursor-pointer"
        style={{ animation: 'fadeUp 0.8s ease 0.4s both' }}
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-600 group-hover:translate-x-full" />
        Run Diagnostic <span>&rarr;</span>
      </button>

      {/* Stats */}
      <div
        className="flex justify-center gap-10 mt-[50px]"
        style={{ animation: 'fadeUp 0.8s ease 0.5s both' }}
      >
        <div className="text-center">
          <div className="font-[family-name:var(--font-jetbrains)] text-[22px] font-bold text-[var(--accent)]">
            {counter.toLocaleString()}
          </div>
          <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--text-dim)] mt-1">
            SREs assessed
          </div>
        </div>
        <div className="text-center">
          <div className="font-[family-name:var(--font-jetbrains)] text-[22px] font-bold text-[var(--accent)]">
            68%
          </div>
          <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--text-dim)] mt-1">
            Show decay
          </div>
        </div>
        <div className="text-center">
          <div className="font-[family-name:var(--font-jetbrains)] text-[22px] font-bold text-[var(--accent)]">
            4.2
          </div>
          <div className="text-[11px] uppercase tracking-[0.08em] text-[var(--text-dim)] mt-1">
            Avg severity
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-[0.1em] text-[var(--text-dim)]"
        style={{ animation: 'fadeUp 0.8s ease 0.6s both' }}
      >
        <span
          className="w-px h-[30px]"
          style={{
            background: 'linear-gradient(to bottom, var(--text-dim), transparent)',
            animation: 'scrollBounce 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}
