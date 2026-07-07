import Image from 'next/image'
import Link from 'next/link'
import { CategoryScore, SeverityLevel } from '../types'
import {
  OLLY_IMAGES,
  getResultOllyKey,
  SEVERITY_CONFIG,
  SEVERITY_TEXT,
  SEVERITY_BG,
} from '../data/constants'
import { Twitter, Linkedin } from '@/components/social-icons/SolidIcons'
import SkillBreakdownChart from './SkillBreakdownChart'
import RecentDiagnostics from './RecentDiagnostics'

const SHARE_LABELS: Record<SeverityLevel, string> = {
  low: 'Minimal Decay',
  mid: 'Moderate Decay',
  high: 'Significant Decay',
  critical: 'Critical Decay',
}

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

  const shareText = `I just checked if my SRE brain is fried with AI by playing the SRE Skill Decay Index and scored ${results.display}/10 — ${SHARE_LABELS[results.level]}. Try it now → https://signoz.io/sre-skill-decay-index/`

  return (
    <section className="px-6 pb-[120px] pt-20 text-center">
      {/* Branding */}
      <div className="mb-8 font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.12em] text-[var(--text-dim)] opacity-60">
        <a
          href="https://signoz.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--text-dim)] no-underline transition-colors duration-200 hover:text-[var(--accent)]"
        >
          SigNoz
        </a>
      </div>

      <div className="mx-auto max-w-[720px]">
        {/* Results card */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-10 pb-[60px] max-md:px-6 max-md:py-10">
          {/* Top accent bar */}
          <div
            className={`absolute left-0 right-0 top-0 h-[3px] ${LEVEL_TOP_BAR[results.level]}`}
          />

          {/* Result Olly */}
          <Image
            src={ollyData.src}
            alt={ollyData.alt}
            width={250}
            height={250}
            className={`mx-auto mb-5 block h-auto max-h-[250px] w-[250px] object-contain ${isCritical ? 'brightness-[0.6] drop-shadow-[0_0_20px_rgba(255,61,61,0.4)] grayscale-[0.4]' : ''}`}
            style={{ animation: 'ollyBob 3.5s ease-in-out infinite' }}
          />

          {/* Score label */}
          <div className="mb-3 font-[family-name:var(--font-jetbrains)] text-[11px] uppercase tracking-[0.15em] text-[var(--text-dim)]">
            Your Skill Decay Index
          </div>

          {/* Score number */}
          <div
            className={`mb-2 font-[family-name:var(--font-syne)] text-[56px] font-extrabold leading-none max-md:text-[64px] ${SCORE_STYLE[results.level]}`}
            style={{ animation: 'scoreReveal 1s ease' }}
          >
            {results.display}
          </div>

          {/* Level label */}
          <div
            className={`mb-8 font-[family-name:var(--font-jetbrains)] text-[13px] font-semibold uppercase tracking-[0.1em] ${SEVERITY_TEXT[results.level]}`}
          >
            {results.label}
          </div>

          {/* Roast */}
          <div className="mx-auto mb-8 max-w-[520px] text-lg leading-relaxed text-[var(--text)] before:content-[open-quote] after:content-[close-quote]">
            {results.roast}
          </div>

          {/* Share CTAs */}
          <div className="mx-auto mb-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-5 py-[10px] font-[family-name:var(--font-jetbrains)] text-xs font-medium text-[var(--text)] no-underline transition-all duration-200 hover:border-[var(--text-dim)] hover:bg-[var(--border)]"
            >
              <Twitter width={16} height={16} className="fill-current" />
              Share on X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://signoz.io/sre-skill-decay-index/')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-5 py-[10px] font-[family-name:var(--font-jetbrains)] text-xs font-medium text-[var(--text)] no-underline transition-all duration-200 hover:border-[var(--text-dim)] hover:bg-[var(--border)]"
            >
              <Linkedin width={16} height={16} className="fill-current" />
              Share on LinkedIn
            </a>
            <button
              onClick={() => navigator.clipboard.writeText(shareText)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-5 py-[10px] font-[family-name:var(--font-jetbrains)] text-xs font-medium text-[var(--text)] transition-all duration-200 hover:border-[var(--text-dim)] hover:bg-[var(--border)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
              Copy
            </button>
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
              &mdash; the more you automate, the worse you get at the exact moments automation
              fails.
            </p>
            <Link
              href="https://newsletter.signoz.io/p/ai-isnt-replacing-sres-its-deskilling"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--accent)] px-7 py-[14px] font-[family-name:var(--font-jetbrains)] text-xs font-semibold uppercase tracking-[0.08em] text-[var(--accent)] no-underline transition-all duration-300 hover:bg-[var(--accent)] hover:text-white"
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
