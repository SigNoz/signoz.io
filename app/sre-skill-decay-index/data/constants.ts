import { Category, RecentDiagnostic, SeverityLevel } from '../types'

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

export const SEVERITY_CONFIG: Record<
  SeverityLevel,
  { label: string; color: string; scoreColor: string }
> = {
  low: {
    label: 'Minimal Decay \u2014 Muscles Intact',
    color: '#00ff9d',
    scoreColor: 'text-[#00ff9d]',
  },
  mid: {
    label: 'Moderate Decay \u2014 The Rust Is Showing',
    color: '#ffb020',
    scoreColor: 'text-[#ffb020]',
  },
  high: {
    label: 'Significant Decay \u2014 AI-Dependent',
    color: '#ff3d3d',
    scoreColor: 'text-[#ff3d3d]',
  },
  critical: {
    label: 'Critical Decay \u2014 Full Bainbridge Paradox',
    color: '#ff3d3d',
    scoreColor: 'text-[#ff3d3d]',
  },
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

export const OLLY_IMAGES: Record<string, { src: string; alt: string }> = {
  sleeping: { src: '/img/sre-skill-decay-index/olly-sleeping.png', alt: 'Olly sleeping on the job' },
  welding: { src: '/img/sre-skill-decay-index/olly-welding-front.png', alt: 'Olly welding' },
  thinking: { src: '/img/sre-skill-decay-index/olly-thinking.png', alt: 'Olly thinking' },
  professor: { src: '/img/sre-skill-decay-index/olly-professor.png', alt: 'Olly evaluating' },
  jedi: { src: '/img/sre-skill-decay-index/olly-jedi.png', alt: 'Jedi Olly - skills mastered' },
  bush: {
    src: '/img/sre-skill-decay-index/olly-bush.png',
    alt: 'Olly hiding - skills fading',
  },
  space: {
    src: '/img/sre-skill-decay-index/olly-space.png',
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
  if (score > 7) return '#ff3d3d'
  if (score > 5) return '#ffb020'
  return '#00ff9d'
}
