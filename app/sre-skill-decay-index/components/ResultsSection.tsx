'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CategoryScore, SeverityLevel } from '../types'
import { OLLY_IMAGES, getResultOllyKey, SEVERITY_CONFIG, SEVERITY_TEXT, SEVERITY_BG } from '../data/constants'
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
  low: SEVERITY_BG.low,
  mid: SEVERITY_BG.mid,
  high: SEVERITY_BG.high,
  critical: `${SEVERITY_BG.critical} shadow-[0_0_20px_rgba(255,61,61,0.5)]`,
}

const SCORE_STYLE: Record<SeverityLevel, string> = {
  low: SEVERITY_TEXT.low,
  mid: SEVERITY_TEXT.mid,
  high: SEVERITY_TEXT.high,
  critical: `${SEVERITY_TEXT.critical} [text-shadow:0_0_40px_rgba(255,61,61,0.4)]`,
}

export default function ResultsSection({ results, onRestart }: ResultsSectionProps) {
  const ollyKey = getResultOllyKey(results.level)
  const ollyData = OLLY_IMAGES[ollyKey]
  const isCritical = results.level === 'critical'

  return (
    <section className="px-6 pb-[120px] pt-20 text-center">
      <div className="mx-auto max-w-[720px]">
        {/* Results card */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-10 pb-[60px] max-md:px-6 max-md:py-10">
          {/* Top accent bar */}
          <div className={`absolute left-0 right-0 top-0 h-[3px] ${LEVEL_TOP_BAR[results.level]}`} />

          {/* Result Olly */}
          <Image
            src={ollyData.src}
            alt={ollyData.alt}
            width={250}
            height={250}
            className={`mx-auto mb-5 block h-auto max-h-[250px] w-[250px] object-contain ${isCritical ? 'brightness-[0.6] grayscale-[0.4] drop-shadow-[0_0_20px_rgba(255,61,61,0.4)]' : ''}`}
            style={{ animation: 'ollyBob 3.5s ease-in-out infinite' }}
          />

          {/* Score label */}
          <div className="mb-3 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            Your Skill Decay Index
          </div>

          {/* Score number */}
          <div
            className={`font-[family-name:var(--font-syne)] text-[56px] font-extrabold leading-none mb-2 max-md:text-[64px] ${SCORE_STYLE[results.level]}`}
            style={{ animation: 'scoreReveal 1s ease' }}
          >
            {results.display}
          </div>

          {/* Level label */}
          <div
            className={`font-[family-name:var(--font-jetbrains)] text-[13px] font-semibold uppercase tracking-[0.1em] mb-8 ${SEVERITY_TEXT[results.level]}`}
          >
            {results.label}
          </div>

          {/* Roast */}
          <div className="mx-auto mb-8 max-w-[520px] text-lg leading-relaxed text-[var(--text)] before:content-[open-quote] after:content-[close-quote]">
            {results.roast}
          </div>

          {/* Share CTAs */}
          <div className="mx-auto mb-10 flex items-center justify-center gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`I just checked if my SRE brain is fried with AI by playing this AI SRE Skill Decay Index from @SigNozHQ and scored ${results.display}. Try it now - https://signoz.io/sre-skill-decay-index/`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-5 py-[10px] font-[family-name:var(--font-jetbrains)] text-xs font-medium text-[var(--text)] no-underline transition-all duration-200 hover:border-[var(--text-dim)] hover:bg-[var(--border)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Share on X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://signoz.io/sre-skill-decay-index/')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-5 py-[10px] font-[family-name:var(--font-jetbrains)] text-xs font-medium text-[var(--text)] no-underline transition-all duration-200 hover:border-[var(--text-dim)] hover:bg-[var(--border)]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Share on LinkedIn
            </a>
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
            <Link
              href="https://newsletter.signoz.io/p/ai-isnt-replacing-sres-its-deskilling"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--accent)] px-7 py-[14px] font-[family-name:var(--font-jetbrains)] text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)] transition-all duration-300 hover:bg-[var(--accent)] hover:text-white no-underline"
            >
              Read the Full Article &rarr;
            </Link>
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
