import {
  ICON_YEARS_OLD,
  ICON_EMPLOYEES,
  ICON_FUNDING,
  ICON_BUDGET_FRIENDLY,
  ICON_SCALE_GROW,
  ICON_OPEN_SOURCE,
  ICON_ROI,
  ICON_ALL_IN_ONE,
  ICON_COMMUNITY,
} from './icons-constants'

// StartUps Main Data
export const StartUpsData = {
  TITLE: 'SigNoz for Startups',
  DESC: "Observability That Doesn't Burn Your Startup Budget",
  PRICE: {
    originalPrice: '$49',
    discountedPrice: '$19',
    period: 'month',
  },
  PORTAL_ID: '22308423',
  FORM_ID: '93cf9682-374a-489f-92c6-d3f2d34862e1',
  ELIGIBILITY_POINTS: [
    {
      title: 'Less than 3 years old',
      iconName: ICON_YEARS_OLD,
      bgColor: 'bg-yellow-500/10',
      textColor: 'text-yellow-400',
    },
    {
      title: 'Fewer than 30 employees',
      iconName: ICON_EMPLOYEES,
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
    },
    {
      title: 'Raised less than $6 million',
      iconName: ICON_FUNDING,
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
    },
  ],
}

// Features Data
export const featureItems = [
  {
    iconName: ICON_BUDGET_FRIENDLY,
    title: 'Budget-Friendly',
    description:
      'Special pricing tailored for startups with limited resources. 50% off standard pricing.',
    bgColor: 'bg-primary/10',
    hoverBorder: 'hover:border-primary/40',
    hoverShadow: 'hover:shadow-primary/5',
  },
  {
    iconName: ICON_SCALE_GROW,
    title: 'Scale as You Grow',
    description:
      'Start small and scale your observability as your startup expands, without upfront costs.',
    bgColor: 'bg-[#3B82F6]/10',
    hoverBorder: 'hover:border-[#3B82F6]/40',
    hoverShadow: 'hover:shadow-[#3B82F6]/5',
  },
  {
    iconName: ICON_OPEN_SOURCE,
    title: 'Open Source Core',
    description:
      'Built on OpenTelemetry, avoiding vendor lock-in while providing flexible deployment options.',
    bgColor: 'bg-[#F76B4A]/10',
    hoverBorder: 'hover:border-[#F76B4A]/40',
    hoverShadow: 'hover:shadow-[#F76B4A]/5',
  },
  {
    iconName: ICON_ROI,
    title: '9X ROI vs DataDog',
    description:
      'SigNoz provides up to 9X return on investment compared to DataDog for growing startups.',
    bgColor: 'bg-green-500/10',
    hoverBorder: 'hover:border-green-500/40',
    hoverShadow: 'hover:shadow-green-500/5',
  },
  {
    iconName: ICON_ALL_IN_ONE,
    title: 'All-in-One Solution',
    description:
      'Metrics, traces, and logs in a single platform. No need for multiple tool subscriptions.',
    bgColor: 'bg-purple-500/10',
    hoverBorder: 'hover:border-purple-500/40',
    hoverShadow: 'hover:shadow-purple-500/5',
  },
  {
    iconName: ICON_COMMUNITY,
    title: 'Startup Community',
    description:
      'Join a community of fellow startups to share observability best practices and insights.',
    bgColor: 'bg-yellow-500/10',
    hoverBorder: 'hover:border-yellow-500/40',
    hoverShadow: 'hover:shadow-yellow-500/5',
  },
]

// Testimonials Data
export const testimonials = [
  {
    quote:
      "SigNoz is easy, simple, and affordable. It's made me very happy. I'm very happy with SigNoz. Now I'm about to go on vacation for a week, and I'm going to sleep beautifully because I know that if something's wrong, I'm going to get paged about it.",
    name: 'Shiv Ansal',
    title: 'Co-founder & CTO, Bands',
    logo: '/img/case_study/logos/bands-logo.png',
  },
  {
    quote:
      'The experience with SigNoz has been great. The open-source nature and OpenTelemetry support make it a perfect fit for our growing fintech infrastructure.',
    name: 'Alexandre Moray',
    title: 'Senior Software Engineer',
    logo: '/img/case_study/logos/linkcy-logo-white-1.png',
  },
  {
    quote:
      'The ingestion rates and search speeds with SigNoz have significantly improved our troubleshooting speed.',
    name: 'Avneesh Kumar',
    title: 'VP of Engineering at Mailmodo',
    logo: '/img/case_study/mailmodo-logo-white.svg',
  },
]

// FAQ Items Data
export const faqItems = [
  {
    question: 'Who is eligible for the SigNoz Startup Program?',
    answer:
      'Startups that are less than 3 years old, have fewer than 30 employees, and have raised less than $6 million in funding are eligible for our startup program.',
  },
  {
    question: 'What comes included in $19?',
    answer:
      "Our usage-based pricing is applicable for any data you send to SigNoz. If your usage doesn't cross $19, your monthly bill will be $19. If it does, final bill will be calculated based on the amount of data you sent to SigNoz.",
  },
  {
    question: 'How long does the startup pricing last?',
    answer:
      'The startup pricing is available for 12 months. After that, you will transition to our regular pricing plans, which will be matched to your usage needs.',
  },
  {
    question: 'Can we cancel our subscription at any time?',
    answer:
      'Yes, you can cancel your subscription at any time with no penalties. We believe in providing value, not locking you into contracts.',
  },
]
