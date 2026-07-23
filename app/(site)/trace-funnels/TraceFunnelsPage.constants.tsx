import { Atom } from 'lucide-react'
import { BUTTON_CLASS_NAME } from '@/shared/components/molecules/FeaturePages/constants'

export const TRACE_FUNNELS_HEADER_BUTTONS = [
  {
    text: 'Start your free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Trace Funnels Hero Start Trial',
      clickLocation: 'Trace Funnels Hero',
      clickText: 'Start your free trial',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/trace-funnels/overview/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Trace Funnels Hero Docs',
      clickLocation: 'Trace Funnels Hero',
      clickText: 'Read Documentation',
    },
  },
]

export const DEFINE_MULTI_STEP_SEQUENCES_PANEL = {
  title: 'Define multi-step sequences',
  description: (
    <>
      <p className="leading-relaxed text-signoz_vanilla-400">
        Build funnels with unlimited steps. Each step filters traces by service name, operation,
        HTTP status code, or any custom attribute from your instrumentation. Use operators like
        CONTAINS, REGEX, IN, or EXISTS.
      </p>
      <p className="leading-relaxed text-signoz_vanilla-400">
        Save funnel definitions to reuse across different time ranges or share with your team.
      </p>
    </>
  ),
  className: 'justify-center',
}

export const DEFINE_MULTI_STEP_SEQUENCES_IMAGE = {
  src: '/img/trace-funnels/funnel_step_definition.png',
  alt: 'Defining funnel steps',
}

export const IDENTIFY_PROBLEM_TRACES_PANEL = {
  title: 'Identify problem traces',
  description:
    'See the top 5 slowest traces for each step transition and view all traces with errors separately. Each trace shows its transition duration, making it easy to spot outliers. Click any trace ID to jump to the full trace visualization for detailed debugging.',
}

export const IDENTIFY_PROBLEM_TRACES_IMAGE = {
  src: '/img/trace-funnels/identify-problem-traces.png',
  alt: 'Identify problem traces',
}

export const ANALYZE_REQUEST_FLOWS_SHOWCASE = {
  title: 'Analyze request flows across multiple trace ids',
  description:
    'A single trace shows one request. Trace funnels aggregate thousands of traces with the same request flow to reveal system-wide issues that individual trace inspection misses.',
  button: {
    text: 'Read Documentation',
    href: '/docs/trace-funnels/overview/',
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Trace Funnels Analyze Request Docs Button',
      clickLocation: 'Trace Funnels Analyze Section',
      clickText: 'Read Documentation',
    },
  },
}

export const ANALYZE_REQUEST_FLOWS_IMAGES = [
  {
    src: '/img/trace-funnels/analyze-request-flows-across-multiple-trace-ids-1.png',
    alt: 'Analyze request flows across multiple trace ids',
  },
  {
    src: '/img/trace-funnels/analyze-request-flows-across-multiple-trace-ids-2.png',
    alt: 'Analyze request flows across multiple trace ids',
  },
]

export const ANALYZE_REQUEST_FLOW_CARDS = [
  {
    icon: <Atom />,
    title: 'Step Transition Analysis',
    description:
      'Compare performance between different step transitions. See if Step 1→2 takes 100ms while Step 2→3 takes 1ms across all matching traces.',
  },
  {
    icon: <Atom />,
    title: 'Error Clustering',
    description:
      'View which step transitions generate how many errors and see the trace IDs causing failures at each transition point..',
  },
  {
    icon: <Atom />,
    title: 'Conversion Tracking',
    description:
      'See what percentage of traces complete each step. A 32% drop between steps reveals systematic problems, not isolated incidents.',
  },
]

export const SEE_DROP_OFFS_SHOWCASE = {
  title: 'See drop-offs between steps',
  description:
    'Each funnel step shows how many traces reached it and what percentage converted from the previous step. View aggregate metrics like average rate, average duration, error count and p99 latency for each transition. Visualize where traces drop off in your sequence and compare performance between different steps to identify bottlenecks.',
  image: '/img/trace-funnels/see-drop-offs-between-steps.png',
  imageAlt: 'See drop-offs between steps',
}

export const STOP_LOSING_USERS_BUTTONS = [
  {
    text: 'Start your free trial',
    href: '/teams/',
    variant: 'default' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Primary CTA',
      clickName: 'Trace Funnels Banner Start Trial',
      clickLocation: 'Trace Funnels Bottom Banner',
      clickText: 'Start your free trial',
    },
  },
  {
    text: 'Read Documentation',
    href: '/docs/trace-funnels/overview/',
    variant: 'secondary' as const,
    className: BUTTON_CLASS_NAME,
    tracking: {
      clickType: 'Secondary CTA',
      clickName: 'Trace Funnels Banner Docs',
      clickLocation: 'Trace Funnels Bottom Banner',
      clickText: 'Read Documentation',
    },
  },
]
