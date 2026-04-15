import {
  Atom,
  CalendarPlus,
  Wrench,
  Rose,
  ChartNoAxesColumn,
  DraftingCompass,
  Grid2x2,
} from 'lucide-react'
import Image from 'next/image'

export const HUBSPOT_DATA = {
  portalId: '22308423',
  formId: 'a2ed7b9f-7de8-44a3-af3c-1f65291c23d2',
}

export const CARDS = [
  {
    icon: <Wrench />,
    title: 'Manual Rebuilding',
    description:
      'Recreating dashboards from scratch means rewriting every query and reconfiguring every panel manually',
  },
  {
    icon: <CalendarPlus />,
    title: 'Weeks of Work',
    description:
      'What took months to build takes weeks to migrate, pulling engineering teams away from actual product work',
  },
  {
    icon: <Rose />,
    title: 'Risk of Loss',
    description:
      'Critical monitoring setups and the context about why dashboards were built this way can be lost during manual migration',
  },
]

export const LLM_POWERED_INTELLIGENCE_CARDS = [
  {
    icon: <Atom />,
    title: 'Intelligent metric mapping',
    description:
      'The LLM automatically matches and translates metric names between Datadog and SigNoz.',
  },
  {
    icon: <Atom />,
    title: 'Context-aware translation',
    description:
      'Understands the intent behind queries and attribute configurations, not just literal syntax matching, ensuring your dashboards work as expected after migration.',
  },
  {
    icon: <Atom />,
    title: 'Query structure adaptation',
    description:
      'Converts Datadog query syntax to SigNoz format while preserving aggregations, filters, groupings, and the logic that makes your dashboards valuable.',
  },
]

export const WHAT_WE_SUPPORT_ITEMS = [
  {
    label: <ChartNoAxesColumn className="h-4 w-4" />,
    title: 'Dashboard Panels',
    description:
      'All your visualization types including time series graphs, bar charts, and tables are preserved with their original layout and styling.',
  },
  {
    label: <DraftingCompass className="h-4 w-4" />,
    title: 'Panel Configurations',
    description:
      'Titles, descriptions, units, display settings, and threshold configurations carry over so your dashboards look and function the same way.',
  },
  {
    label: <Image src="/img/index_features/logs.svg" alt="Logs Icon" width={16} height={16} />,
    title: 'Query Translations',
    description:
      'Complex metric queries with filters, aggregations, and groupings are automatically converted to SigNoz query syntax while maintaining the same data retrieval logic.',
  },
  {
    label: <Grid2x2 className="h-4 w-4" />,
    title: 'Metric Mappings',
    description:
      'The tool intelligently translates metric names and attribute mappings between Datadog and SigNoz, handling differences in naming conventions and data structures.',
  },
] as const
