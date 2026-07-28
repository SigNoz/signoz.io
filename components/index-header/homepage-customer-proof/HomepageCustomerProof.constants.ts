import EltropyLogo from '@/public/svgs/icons/eltropy.svg'

import type { LogoSpec } from './HomepageCustomerProof.types'

export const clickLocation = 'Homepage Hero Customer Proof'
export const carouselBoardWidth = 3744
export const carouselRailGap = 12
export const carouselCycleWidth = carouselBoardWidth + carouselRailGap
export const carouselDurationSeconds = 202

const customerLogoImagePath = '/img/homepage/customer-logos'
const customerLogoSvgPath = '/svgs/customer-logos'

export const logos = {
  alienIntelligence: {
    imageSrc: `${customerLogoImagePath}/alien-intelligence.webp`,
    name: 'Alien Intelligence',
  },
  ariso: { imageSrc: `${customerLogoImagePath}/ariso.webp`, name: 'Ariso' },
  armur: { imageSrc: `${customerLogoImagePath}/armur-ai.webp`, name: 'Armur AI' },
  auvik: {
    cardWidth: 90,
    imageSrc: `${customerLogoSvgPath}/auvik.svg`,
    isWordmark: true,
    name: 'Auvik',
  },
  blackForestLabs: {
    cardWidth: 116,
    imageSrc: '/svgs/icons/blackforestlabs.svg',
    isWordmark: true,
    name: 'Black Forest Labs',
  },
  blaxel: {
    cardWidth: 92,
    imageSrc: '/svgs/icons/blaxel.svg',
    isWordmark: true,
    name: 'Blaxel',
  },
  cisco: { imageSrc: `${customerLogoSvgPath}/cisco.svg`, name: 'Cisco' },
  eltropy: {
    Logo: EltropyLogo,
    name: 'Eltropy',
    cardWidth: 92,
    viewBox: '72 170 1056 280',
  },
  fiscalNote: { imageSrc: `${customerLogoImagePath}/fiscalnote.webp`, name: 'FiscalNote' },
  flutterwave: {
    cardWidth: 108,
    imageSrc: `${customerLogoSvgPath}/flutterwave.svg`,
    imageClassName: 'brightness-0 invert',
    isWordmark: true,
    name: 'Flutterwave',
  },
  formance: {
    cardWidth: 108,
    imageSrc: '/svgs/icons/formance.svg',
    isWordmark: true,
    name: 'Formance',
  },
  formstack: {
    cardWidth: 104,
    imageSrc: `${customerLogoSvgPath}/formstack.svg`,
    isWordmark: true,
    name: 'Formstack',
  },
  harmonic: { imageSrc: `${customerLogoImagePath}/harmonic.webp`, name: 'Harmonic Inc.' },
  harmonicAi: {
    cardWidth: 110,
    imageSrc: `${customerLogoSvgPath}/harmonic-ai.svg`,
    isWordmark: true,
    name: 'Harmonic.ai',
  },
  inkeep: {
    cardWidth: 104,
    imageSrc: '/svgs/icons/inkeep.svg',
    isWordmark: true,
    name: 'Inkeep',
    quoteWidth: 96,
  },
  kernel: {
    cardWidth: 96,
    imageSrc: '/svgs/icons/kernel.svg',
    isWordmark: true,
    name: 'Kernel',
    quoteWidth: 88,
  },
  kognitos: {
    cardWidth: 116,
    imageSrc: '/svgs/icons/kognitos.svg',
    isWordmark: true,
    name: 'Kognitos',
  },
  lenskart: {
    cardWidth: 108,
    imageSrc: `${customerLogoSvgPath}/lenskart.svg`,
    imageClassName: 'brightness-0 invert',
    isWordmark: true,
    name: 'Lenskart',
  },
  lgElectronics: {
    cardWidth: 102,
    imageSrc: `${customerLogoSvgPath}/lg-electronics.svg`,
    isWordmark: true,
    name: 'LG Electronics',
  },
  moneyhub: { imageSrc: `${customerLogoImagePath}/moneyhub.webp`, name: 'Moneyhub' },
  oracle: {
    cardWidth: 100,
    imageSrc: `${customerLogoSvgPath}/oracle.svg`,
    isWordmark: true,
    name: 'Oracle',
    quoteWidth: 88,
  },
  hedra: {
    imageSrc: '/svgs/icons/hedra.svg',
    isWordmark: true,
    name: 'Hedra',
    cardWidth: 92,
  },
  racingAndSports: {
    imageSrc: `${customerLogoImagePath}/racing-and-sports.webp`,
    name: 'Racing & Sports',
  },
  sailResearch: {
    cardWidth: 98,
    imageSrc: `${customerLogoSvgPath}/sail-research.svg`,
    imageClassName: 'brightness-0 invert',
    isWordmark: true,
    name: 'Sail Research',
  },
  salient: {
    cardWidth: 92,
    imageSrc: '/svgs/icons/salient.svg',
    isWordmark: true,
    name: 'Salient',
  },
  sarvam: {
    cardWidth: 98,
    imageSrc: '/svgs/icons/sarvam.svg',
    isWordmark: true,
    name: 'Sarvam AI',
  },
  shaped: {
    cardWidth: 104,
    imageSrc: '/img/case_study/logos/shaped-logo.svg',
    isWordmark: true,
    name: 'Shaped',
    quoteWidth: 94,
  },
  structureFlow: {
    cardWidth: 108,
    imageSrc: `${customerLogoSvgPath}/structureflow.svg`,
    isWordmark: true,
    name: 'StructureFlow',
  },
  tavus: {
    cardWidth: 88,
    imageSrc: '/svgs/icons/tavus.svg',
    isWordmark: true,
    name: 'Tavus',
  },
  websiteEngineer: {
    imageSrc: `${customerLogoImagePath}/website-engineer.webp`,
    name: 'The Website Engineer',
  },
  xata: { imageSrc: `${customerLogoSvgPath}/xata.svg`, name: 'Xata' },
} satisfies Record<string, LogoSpec>

export const cardClassName =
  'relative h-full overflow-hidden rounded-[18px] bg-signoz_ink-300 text-signoz_vanilla-100 shadow-[0_0_0_1px_rgba(255,255,255,0.035)]'
