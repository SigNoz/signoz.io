import React from 'react'
import type { ComponentType, ReactNode } from 'react'
import type { Doc } from 'contentlayer/generated'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'

type StubProps = {
  children?: ReactNode
  [key: string]: unknown
}

type DocsComponentMap = Record<string, ComponentType<StubProps>>
type MdxTreeNode = {
  type?: string
  name?: string | null
  children?: MdxTreeNode[]
}
type AgentMdxComponentPolicy = 'custom-stub' | 'reviewed-fallback'

const LLM_MONITORING_SLUGS = [
  'codex-monitoring',
  'anthropic-monitoring',
  'groq-observability',
  'openrouter-observability',
  'vercel-ai-sdk-observability',
  'langtrace',
  'openlit',
]
export const KNOWN_AGENT_MDX_COMPONENT_NAMES = [
  'Admonition',
  'APMInstrumentationListicle',
  'DocCard',
  'DocCardContainer',
  'Figure',
  'HostingDecision',
  'IntegrationsListicle',
  'K8sInstallationListicle',
  'KeyPointCallout',
  'LLMMonitoringListicle',
  'LogsInstrumentationListicle',
  'MarketplaceInstallationListicle',
  'SelfHostInstallationListicle',
  'TabItem',
  'Tabs',
  'ToggleHeading',
] as const
export const REVIEWED_FALLBACK_AGENT_MDX_COMPONENT_NAMES = [
  'APMDashboardsListicle',
  'APMQuickStartOverview',
  'AWSMonitoringListicle',
  'AWSOneClickListicle',
  'CHClientWithOutput',
  'CICDMonitoringListicle',
  'CloneRepo',
  'CollectionAgentsListicle',
  'CommonPrerequisites',
  'DashboardActions',
  'DashboardTemplatesListicle',
  'DSConfigIntro',
  'DSConfigOss',
  'DSSendDataEc2',
  'DSSendDataEnd',
  'DSSendDataExternal',
  'DSSendDataIntro',
  'DSSetUpVerify',
  'DSTemplateEC2',
  'DSTemplateExternal',
  'DSTemplateIntro',
  'GetHelp',
  'GetStartedInfrastructureMonitoring',
  'HostMetricsDashboardsListicle',
  'JavaInstrumentationListicle',
  'JavascriptInstrumentationListicle',
  'K8sInstall',
  'K8sNextSteps',
  'K8sOtelDemo',
  'KubernetesDashboardsListicle',
  'LibraryTab',
  'LibraryTabs',
  'LiteLLMDashboardsListicle',
  'LogsQuickStartOverview',
  'MDXButton',
  'MetricsDefinition',
  'MetricsQuickStartOverview',
  'MigrateToSigNoz',
  'MultiNodePart1',
  'MultiNodePart2',
  'PrereqsInstrument',
  'RegionTable',
  'RetentionInfo',
  'SigNozCloud',
  'TraefikMetrics',
  'UpgradeInfo',
  'UseHotRod',
  'WebVitalsGrid',
  'YouTube',
] as const
type KnownAgentMdxComponentName = (typeof KNOWN_AGENT_MDX_COMPONENT_NAMES)[number]

const buildPolicyEntries = (names: readonly string[], policy: AgentMdxComponentPolicy) =>
  names.reduce<Record<string, AgentMdxComponentPolicy>>((accumulator, name) => {
    accumulator[name] = policy
    return accumulator
  }, {})

export const AGENT_MDX_COMPONENT_POLICIES = {
  ...buildPolicyEntries(KNOWN_AGENT_MDX_COMPONENT_NAMES, 'custom-stub'),
  ...buildPolicyEntries(REVIEWED_FALLBACK_AGENT_MDX_COMPONENT_NAMES, 'reviewed-fallback'),
} as const

const toDocsPath = (slug: string): string => `/docs/${slug.replace(/^\/+|\/+$/g, '')}/`

const getStringProp = (props: StubProps, key: string): string | null => {
  const value = props[key]
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

const getFirstStringProp = (props: StubProps, keys: string[]): string | null => {
  for (const key of keys) {
    const value = getStringProp(props, key)
    if (value) {
      return value
    }
  }

  return null
}

const formatLabel = (value: string): string =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ')

const hasRenderableChildren = (children: ReactNode): boolean => {
  const nodes = React.Children.toArray(children)
  return nodes.length > 0
}

const buildLabeledContent = (label: string | null, children?: ReactNode): ReactNode[] => {
  const nodes: ReactNode[] = []

  if (label) {
    nodes.push(
      React.createElement('p', { key: 'label' }, React.createElement('strong', null, label))
    )
  }

  if (hasRenderableChildren(children)) {
    nodes.push(React.createElement(React.Fragment, { key: 'children' }, children))
  }

  return nodes
}

const toDocListItems = (docs: Doc[]): Array<{ slug: string; title: string; href: string }> => {
  const seen = new Set<string>()
  const items: Array<{ slug: string; title: string; href: string }> = []

  for (const doc of docs) {
    const slug = typeof doc.slug === 'string' ? doc.slug.trim() : ''
    if (!slug || seen.has(slug)) {
      continue
    }

    seen.add(slug)
    const title =
      typeof doc.title === 'string' && doc.title.trim().length > 0 ? doc.title.trim() : slug

    items.push({
      slug,
      title,
      href: toDocsPath(slug),
    })
  }

  items.sort((left, right) => left.title.localeCompare(right.title))
  return items
}

const selectDocsByRules = (
  docs: Doc[],
  options: {
    prefixes?: string[]
    exactSlugs?: string[]
  }
): Doc[] => {
  const prefixes = options.prefixes || []
  const exactSlugs = new Set(options.exactSlugs || [])

  return docs.filter((doc) => {
    const slug = doc.slug || ''
    if (!slug) return false
    if (exactSlugs.has(slug)) return true

    return prefixes.some((prefix) => {
      if (!prefix) return false
      const normalizedPrefix = prefix.endsWith('/') ? prefix : `${prefix}/`
      return slug === prefix || slug.startsWith(prefix) || slug.startsWith(normalizedPrefix)
    })
  })
}

const createDocListComponent = (
  allDocs: Doc[],
  title: string,
  options: {
    prefixes?: string[]
    exactSlugs?: string[]
  }
): ComponentType<StubProps> => {
  const DocListComponent = () => {
    const docs = toDocListItems(selectDocsByRules(allDocs, options))

    if (docs.length === 0) {
      return React.createElement('p', null, `${title}: No guides found.`)
    }

    return React.createElement(
      'section',
      null,
      React.createElement('h2', null, title),
      React.createElement(
        'ul',
        null,
        ...docs.map((doc) =>
          React.createElement(
            'li',
            { key: doc.slug },
            React.createElement('a', { href: doc.href }, doc.title)
          )
        )
      )
    )
  }

  DocListComponent.displayName = `${title.replace(/[^a-zA-Z0-9]+/g, '') || 'DocList'}Stub`

  return DocListComponent
}

const createUnknownComponentStub = (name: string): ComponentType<StubProps> => {
  const UnknownComponentStub = (props: StubProps) => {
    const text = getFirstStringProp(props, ['title', 'label', 'name'])

    if (hasRenderableChildren(props.children)) {
      return React.createElement('div', null, ...buildLabeledContent(text, props.children))
    }

    const href = getStringProp(props, 'href')

    if (href) {
      return React.createElement('p', null, React.createElement('a', { href }, text || href))
    }

    return React.createElement('p', null, text || `Component: ${name}`)
  }

  UnknownComponentStub.displayName = `${name}Stub`

  return UnknownComponentStub
}

const createKnownComponentStubs = (
  allDocs: Doc[]
): Record<KnownAgentMdxComponentName, ComponentType<StubProps>> => ({
  Figure: (props) => {
    const src = getStringProp(props, 'src')
    const alt = getStringProp(props, 'alt') || ''
    const caption = getStringProp(props, 'caption')

    if (!src) {
      const UnknownFigure = createUnknownComponentStub('Figure')
      return React.createElement(UnknownFigure, props)
    }

    return React.createElement(
      'figure',
      null,
      React.createElement('img', { src, alt }),
      caption ? React.createElement('figcaption', null, caption) : null
    )
  },
  DocCard: (props) => {
    const href = getStringProp(props, 'href')
    const title = getStringProp(props, 'title') || getStringProp(props, 'name')

    if (!href) {
      const UnknownDocCard = createUnknownComponentStub('DocCard')
      return React.createElement(UnknownDocCard, props)
    }

    return React.createElement('p', null, React.createElement('a', { href }, title || href))
  },
  DocCardContainer: (props) => React.createElement('div', null, props.children),
  Admonition: (props) => {
    const title = getStringProp(props, 'title')
    const type = getStringProp(props, 'type')
    const labelParts = [type ? formatLabel(type) : null, title].filter(Boolean) as string[]
    const label = labelParts.join(': ')

    return React.createElement('blockquote', null, ...buildLabeledContent(label, props.children))
  },
  KeyPointCallout: (props) => {
    const title = getFirstStringProp(props, ['title', 'label', 'name'])

    return React.createElement('section', null, ...buildLabeledContent(title, props.children))
  },
  Tabs: (props) => React.createElement('div', null, props.children),
  TabItem: (props) => {
    const label = getStringProp(props, 'label')
    return React.createElement(
      'section',
      null,
      label ? React.createElement('h3', null, label) : null,
      props.children
    )
  },
  ToggleHeading: (props) => React.createElement('div', null, props.children),
  HostingDecision: () =>
    React.createElement(
      'ul',
      null,
      React.createElement(
        'li',
        null,
        React.createElement(
          'a',
          { href: '/blog/cloud-vs-self-hosted-deployment-guide/' },
          'Compare Self Host vs Cloud'
        )
      ),
      React.createElement(
        'li',
        null,
        React.createElement('a', { href: '/teams/' }, 'Get Started - Free')
      )
    ),
  APMInstrumentationListicle: createDocListComponent(allDocs, 'APM Instrumentation Guides', {
    prefixes: ['instrumentation/'],
    exactSlugs: ['frontend-monitoring'],
  }),
  LogsInstrumentationListicle: createDocListComponent(allDocs, 'Logs Collection Guides', {
    prefixes: [
      'logs-management/send-logs/',
      'userguide/collect_',
      'userguide/fluent',
      'userguide/send-logs-http',
      'userguide/heroku_logs_to_signoz',
      'userguide/vercel_logs_to_signoz',
    ],
  }),
  SelfHostInstallationListicle: createDocListComponent(allDocs, 'Self-Host Installation Guides', {
    exactSlugs: [
      'install/docker',
      'install/docker-swarm',
      'install/docker-selinux',
      'install/linux',
      'install/digital-ocean',
      'install/argocd',
      'install/ecs',
      'install/azure-container-apps',
      'install/marketplaces',
    ],
    prefixes: ['install/kubernetes/'],
  }),
  K8sInstallationListicle: createDocListComponent(allDocs, 'Kubernetes Installation Guides', {
    prefixes: ['install/kubernetes/'],
  }),
  MarketplaceInstallationListicle: createDocListComponent(
    allDocs,
    'Marketplace Installation Guides',
    {
      exactSlugs: ['install/marketplaces'],
    }
  ),
  IntegrationsListicle: createDocListComponent(allDocs, 'Integrations Guides', {
    prefixes: ['integrations/'],
  }),
  LLMMonitoringListicle: createDocListComponent(allDocs, 'LLM Monitoring Guides', {
    exactSlugs: LLM_MONITORING_SLUGS,
  }),
})

export const extractMdxComponentNames = (rawMdx: string): string[] => {
  const tree = unified().use(remarkParse).use(remarkMdx).parse(rawMdx) as MdxTreeNode
  const names = new Set<string>()

  const visit = (node: MdxTreeNode) => {
    if (
      (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
      typeof node.name === 'string' &&
      /^[A-Z]/.test(node.name)
    ) {
      names.add(node.name)
    }

    if (Array.isArray(node.children)) {
      node.children.forEach((child) => visit(child))
    }
  }

  visit(tree)

  return Array.from(names)
}

export const buildAgentMdxComponentsForDoc = (doc: Doc, allDocs: Doc[]): DocsComponentMap => {
  const componentNames = extractMdxComponentNames(doc.body.raw)
  const knownStubs = createKnownComponentStubs(allDocs)
  const unreviewedComponentNames = componentNames.filter(
    (componentName) =>
      !Object.prototype.hasOwnProperty.call(AGENT_MDX_COMPONENT_POLICIES, componentName)
  )

  if (unreviewedComponentNames.length > 0) {
    console.warn(
      `Review agent markdown handling for MDX components in "${doc.slug}": ${unreviewedComponentNames.join(', ')}`
    )
  }

  return componentNames.reduce<DocsComponentMap>((accumulator, componentName) => {
    accumulator[componentName] = Object.prototype.hasOwnProperty.call(knownStubs, componentName)
      ? knownStubs[componentName as KnownAgentMdxComponentName]
      : createUnknownComponentStub(componentName)
    return accumulator
  }, {})
}
