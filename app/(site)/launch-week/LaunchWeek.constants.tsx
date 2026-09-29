import { BookOpen } from 'lucide-react'

const BUTTON_CLASS_NAME = 'flex h-full w-full items-center justify-center gap-1'

export const LAUNCH_WEEK_6_ANNOUNCEMENTS = [
  {
    title: 'Keynote: Observability for engineering-first teams',
    description:
      'Teams building AI infrastructure, agent platforms, and dev tools push observability to its limits. System performance is a core part of the product. Our CEO, Pranay, shares why they choose SigNoz, as they\u2019re our largest cohort of customers.',
    image: '/img/blog/2025/09/interactive-dashboards.webp',
    date: 'Monday - October 12',
    time: '9:00 AM PT',
    registrationUrl: 'https://luma.com/ixczfyuq',
  },
  {
    title: 'New Trace Detail View',
    description:
      'Built for high-volume, AI-scale traces. The new flame graph renders up to 100,000 spans at once. The waterfall supports unlimited spans. New error highlighting, filters, and search take you to the spans you need, however large the trace.',
    image: '/img/blog/2025/09/query-builder-v5.webp',
    date: 'Monday - October 12',
    time: '9:30 AM PT',
    registrationUrl: 'https://luma.com/5c8so1z5',
  },
  {
    title: 'MCP Workshop',
    description:
      "We launched SigNoz MCP earlier this year. Since then, agents have become primary users of SigNoz. In this workshop, we'll walk through useful real-world MCP workflows and show how agents can investigate observability data.",
    image: '/img/blog/2025/09/oss-improvements.webp',
    date: 'Tuesday - October 13',
    time: '9:00 AM PT',
    registrationUrl: 'https://luma.com/a8pzbqqt',
  },
  {
    title: 'Infrastructure Monitoring Experience',
    description:
      "We've upgraded infrastructure monitoring for deeper visibility into resource health and faster troubleshooting. See more health and performance signals, a new container view, improved search and filters, and a new query engine.",
    image: '/img/blog/2025/09/trace-operators.webp',
    date: 'Wednesday - October 14',
    time: '9:00 AM PT',
    registrationUrl: 'https://luma.com/gam9999u',
  },
  {
    title: 'JSON-native Logs',
    description:
      'SigNoz Cloud now parses JSON log bodies at ingestion and stores them as native JSON, making queries 30% faster. Filter and group by nested body fields directly. Plus, full-text search now covers attributes and resource metadata.',
    image: '/img/blog/2025/09/cost-meter.webp',
    date: 'Thursday - October 15',
    time: '9:00 AM PT',
    registrationUrl: 'https://luma.com/j3k51i73',
  },
  {
    title: 'Fine-grained RBAC',
    description:
      'SigNoz has built one of the most flexible access control models in the observability space. Get precise control over what each user or agent can access, scoped down to individual resources.',
    image: '/img/events/launch-week-5/launch-week-5-cover.webp',
    date: 'Friday - October 16',
    time: '9:00 AM PT',
    registrationUrl: 'https://luma.com/9zyc50cx',
  },
] as const

export const LAUNCH_WEEK_CTA_BUTTONS = [
  {
    text: 'Get Started - Free',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Launch Week 6 Bottom Banner Start Trial',
      clickLocation: 'Launch Week 6 Bottom Banner',
      clickText: 'Get Started - Free',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/introduction/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    icon: <BookOpen size={14} />,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Launch Week 6 Bottom Banner Read Documentation',
      clickLocation: 'Launch Week 6 Bottom Banner',
      clickText: 'Read Documentation',
    },
  },
]
