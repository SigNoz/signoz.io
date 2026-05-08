import { Category, RecentDiagnostic, SeverityLevel } from '../types'

/** Single source of truth for severity-level colors */
export const SEVERITY_COLORS: Record<SeverityLevel, string> = {
  low: '#00ff9d',
  mid: '#ffb020',
  high: '#ff3d3d',
  critical: '#ff3d3d',
}

export const CATEGORY_LABELS: Record<Category, string> = {
  incident: 'Incident Response Muscle',
  observability: 'Observability Fluency',
  debugging: 'Debugging Instinct',
  architecture: 'System Mental Models',
  meta: 'Self-Awareness',
}

export const ROASTS: Record<SeverityLevel, string[]> = {
  low: [
    'You still think in systems, not suggestions. Bainbridge would be proud.',
    'Your incident response instincts are intact. For now.',
  ],
  mid: [
    'You\u2019re in the uncanny valley of deskilling \u2014 fast enough to feel competent, rusty enough to struggle when the AI can\u2019t help.',
    'You\u2019re reading the SparkNotes version of your own systems.',
  ],
  high: [
    'You\u2019ve traded deep understanding for dashboard confidence. When the next novel outage hits, you\u2019ll be staring at logs like they\u2019re in a foreign language.',
    'Your AI assistant has become your load-bearing wall.',
  ],
  critical: [
    'You\u2019ve achieved the full Bainbridge Paradox \u2014 automated into the worst possible position.',
    'You don\u2019t use AI as a tool. AI uses you as an approval button.',
  ],
}

export const SEVERITY_CONFIG: Record<SeverityLevel, { label: string }> = {
  low: { label: 'Minimal Decay \u2014 Muscles Intact' },
  mid: { label: 'Moderate Decay \u2014 The Rust Is Showing' },
  high: { label: 'Significant Decay \u2014 AI-Dependent' },
  critical: { label: 'Critical Decay \u2014 Full Bainbridge Paradox' },
}

/**
 * Pre-built Tailwind class maps derived from SEVERITY_COLORS.
 * Classes are written out in full so Tailwind's scanner can detect them.
 */
export const SEVERITY_TEXT: Record<SeverityLevel, string> = {
  low: 'text-[#00ff9d]',
  mid: 'text-[#ffb020]',
  high: 'text-[#ff3d3d]',
  critical: 'text-[#ff3d3d]',
}

export const SEVERITY_BG: Record<SeverityLevel, string> = {
  low: 'bg-[#00ff9d]',
  mid: 'bg-[#ffb020]',
  high: 'bg-[#ff3d3d]',
  critical: 'bg-[#ff3d3d]',
}

export const RECENT_DIAGNOSTICS: RecentDiagnostic[] = [
  { role: 'SRE, 6 YOE', score: 7.2, roast: 'Knows how to kubectl but forgot why.' },
  { role: 'Platform Eng, 4 YOE', score: 5.8, roast: 'Still writes Terraform by hand. Respect.' },
  {
    role: 'DevOps Lead, 8 YOE',
    score: 8.4,
    roast: 'Automates the automation. Can\u2019t debug either.',
  },
  { role: 'SRE, 2 YOE', score: 9.1, roast: 'Never debugged without AI. Never-skilled.' },
  {
    role: 'Infra Eng, 5 YOE',
    score: 3.4,
    roast: 'Still SSHes into prod at 3 AM. Unbreakable.',
  },
  {
    role: 'On-call Eng, 3 YOE',
    score: 6.7,
    roast: 'The runbook is the only thing between you and chaos.',
  },
]

export const OLLY_IMAGES: Record<string, { src: string; alt: string; rounded?: boolean }> = {
  sleeping: {
    src: '/img/sre-skill-decay-index/olly-sleeping.webp',
    alt: 'Olly sleeping on the job',
  },
  welding: {
    src: '/img/sre-skill-decay-index/olly-welding-front.webp',
    alt: 'Olly welding',
    rounded: true,
  },
  'welding-side': {
    src: '/img/sre-skill-decay-index/olly-welding-side.webp',
    alt: 'Olly welding from behind',
  },
  thinking: { src: '/img/sre-skill-decay-index/olly-thinking.webp', alt: 'Olly thinking' },
  professor: {
    src: '/img/sre-skill-decay-index/olly-professor.webp',
    alt: 'Olly evaluating',
    rounded: true,
  },
  jedi: { src: '/img/sre-skill-decay-index/olly-jedi.webp', alt: 'Jedi Olly - skills mastered' },
  hangglider: {
    src: '/img/sre-skill-decay-index/olly-hangglider.webp',
    alt: 'Olly hanggliding - things spiraling',
  },
  bush: {
    src: '/img/sre-skill-decay-index/olly-bush.webp',
    alt: 'Olly hiding - skills fading',
  },
  space: {
    src: '/img/sre-skill-decay-index/olly-space.webp',
    alt: 'Space Olly - flying without control',
  },
}

export function getSeverityLevel(score: number): SeverityLevel {
  if (score <= 2.5) return 'low'
  if (score <= 5) return 'mid'
  if (score <= 7.5) return 'high'
  return 'critical'
}

export function getResultOllyKey(level: SeverityLevel): string {
  const map: Record<SeverityLevel, string> = {
    low: 'jedi',
    mid: 'bush',
    high: 'space',
    critical: 'sleeping',
  }
  return map[level]
}

export function getScoreColor(score: number): string {
  return SEVERITY_COLORS[getSeverityLevel(score)]
}
