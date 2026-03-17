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
        url: '/img/sre-skill-decay-index/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SRE Skill Decay Index - How much has AI deskilled you?',
      },
    ],
  },
  twitter: {
    title: 'SRE Skill Decay Index | SigNoz',
    description:
      '7 incident scenarios. Zero AI assistance. Find out how much muscle memory you\u2019ve lost since you started letting copilots think for you.',
    card: 'summary_large_image',
    images: ['/img/sre-skill-decay-index/og-image.png'],
  },
}

export default function SRESkillDecayIndexPage() {
  return <SRESkillDecayIndex />
}
