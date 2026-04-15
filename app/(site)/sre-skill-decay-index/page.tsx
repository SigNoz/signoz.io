import { Metadata } from 'next'
import SRESkillDecayIndex from './SRESkillDecayIndex'
import './animations.css'

export const metadata: Metadata = {
  title: {
    absolute: 'SRE Skill Decay Index | SigNoz',
  },
  description:
    '7 incident scenarios. Zero AI assistance. Find out how much muscle memory you\u2019ve lost since you started letting copilots think for you.',
  openGraph: {
    title: 'SRE Skill Decay Index | SigNoz',
    description:
      '7 incident scenarios. Zero AI assistance. Find out how much muscle memory you\u2019ve lost since you started letting copilots think for you.',
    type: 'website',
    images: [
      {
        url: '/img/sre-skill-decay-index/og-image.webp',
        width: 845,
        height: 565,
        alt: 'SRE Skill Decay Index - How much has AI deskilled you?',
      },
    ],
  },
  twitter: {
    title: 'SRE Skill Decay Index | SigNoz',
    description:
      '7 incident scenarios. Zero AI assistance. Find out how much muscle memory you\u2019ve lost since you started letting copilots think for you.',
    card: 'summary_large_image',
    images: ['/img/sre-skill-decay-index/og-image.webp'],
  },
}

export default function SRESkillDecayIndexPage() {
  return <SRESkillDecayIndex />
}
