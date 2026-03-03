'use client'

import React from 'react'
import Image from 'next/image'
import { CategoryScore, SeverityLevel } from '../types'
import { OLLY_IMAGES, getResultOllyKey, SEVERITY_CONFIG } from '../data/constants'
import SkillBreakdownChart from './SkillBreakdownChart'
import RecentDiagnostics from './RecentDiagnostics'

interface ResultsData {
  display: string
  level: SeverityLevel
  label: string
  roast: string
  breakdown: CategoryScore[]
}

interface ResultsSectionProps {
  results: ResultsData
  onRestart: () => void
}

const LEVEL_TOP_BAR: Record<SeverityLevel, string> = {
  low: 'bg-[#00ff9d]',
  mid: 'bg-[#ffb020]',
  high: 'bg-[#ff3d3d]',
  critical: 'bg-[#ff3d3d] shadow-[0_0_20px_rgba(255,61,61,0.5)]',
}

const SCORE_STYLE: Record<SeverityLevel, string> = {
  low: 'text-[#00ff9d]',
  mid: 'text-[#ffb020]',
  high: 'text-[#ff3d3d]',
  critical: 'text-[#ff3d3d] [text-shadow:0_0_40px_rgba(255,61,61,0.4)]',
}

const LABEL_STYLE: Record<SeverityLevel, string> = {
  low: 'text-[#00ff9d]',
  mid: 'text-[#ffb020]',
  high: 'text-[#ff3d3d]',
  critical: 'text-[#ff3d3d]',
}

export default function ResultsSection({ results, onRestart }: ResultsSectionProps) {
  const ollyKey = getResultOllyKey(results.level)
  const ollyData = OLLY_IMAGES[ollyKey]
  const isCritical = results.level === 'critical'

  return (
    <section className="px-6 pb-[120px] pt-20 text-center">
      <div className="mx-auto max-w-[720px]">
        {/* Results card */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-10 py-[60px] max-md:px-6 max-md:py-10">
          {/* Top accent bar */}
          <div className={`absolute left-0 right-0 top-0 h-[3px] ${LEVEL_TOP_BAR[results.level]}`} />

          {/* Result Olly */}
          <Image
            src={ollyData.src}
            alt={ollyData.alt}
            width={160}
            height={180}
            className={`mx-auto mb-5 block h-auto max-h-[180px] w-40 object-contain ${isCritical ? 'brightness-[0.6] grayscale-[0.4] drop-shadow-[0_0_20px_rgba(255,61,61,0.4)]' : ''}`}
            style={{ animation: 'ollyReveal 0.8s ease both, ollyBob 3s ease-in-out infinite 0.8s' }}
          />

          {/* Score label */}
          <div className="mb-3 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            Your Skill Decay Index
          </div>

          {/* Score number */}
          <div
            className={`font-[family-name:var(--font-syne)] text-[96px] font-extrabold leading-none mb-2 max-md:text-[64px] ${SCORE_STYLE[results.level]}`}
            style={{ animation: 'scoreReveal 1s ease' }}
          >
            {results.display}
          </div>

          {/* Level label */}
          <div
            className={`font-[family-name:var(--font-jetbrains)] text-[13px] font-semibold uppercase tracking-[0.1em] mb-8 ${LABEL_STYLE[results.level]}`}
          >
            {results.label}
          </div>

          {/* Roast */}
          <div className="mx-auto mb-10 max-w-[520px] text-lg italic leading-relaxed text-[var(--text)] before:content-[open-quote] after:content-[close-quote]">
            {results.roast}
          </div>

          {/* Skill Breakdown */}
          <SkillBreakdownChart breakdown={results.breakdown} />

          {/* CTA */}
          <div className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-8">
            <p className="mb-5 text-sm leading-relaxed text-[var(--text-dim)]">
              This diagnostic is inspired by{' '}
              <strong className="text-[var(--text)]">
                Bainbridge&apos;s Ironies of Automation
              </strong>{' '}
              &mdash; the more you automate, the worse you get at the exact moments
              automation fails.
            </p>
            <a
              href="https://signoz.io/blog"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--accent)] px-7 py-[14px] font-[family-name:var(--font-jetbrains)] text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-white no-underline"
            >
              Read the Full Article &rarr;
            </a>
          </div>

          {/* Restart button */}
          <button
            onClick={onRestart}
            className="mt-6 cursor-pointer border-none bg-transparent font-[family-name:var(--font-jetbrains)] text-xs text-[var(--text-dim)] underline underline-offset-[3px] hover:text-[var(--text)]"
          >
            &#8635; Run diagnostic again
          </button>
        </div>

        {/* Recent Diagnostics */}
        <RecentDiagnostics />
      </div>
    </section>
  )
}
