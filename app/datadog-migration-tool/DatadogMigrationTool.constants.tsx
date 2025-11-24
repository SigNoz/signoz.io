import { Atom, CalendarPlus, Wrench, Rose } from 'lucide-react'

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
