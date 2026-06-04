import React from 'react'
import type { ComponentType, ReactNode } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import {
  LLM_MONITORING_ITEMS,
  K8S_INSTALLATION_ITEMS,
  MARKETPLACE_INSTALLATION_ITEMS,
  getAllSelfHostInstallationItems,
  getAllCollectionAgentsItems,
  getAllAPMInstrumentationItems,
  getAllJavaInstrumentationItems,
  getAllJavascriptInstrumentationItems,
  getAllLogsInstrumentationItems,
  getAllIntegrationsItems,
  getAllCICDMonitoringItems,
  getAllAWSMonitoringItems,
  getAllAWSOneClickItems,
  AZURE_ONE_CLICK_ITEMS,
  DASHBOARD_TEMPLATES_ITEMS,
  APM_DASHBOARDS_ITEMS,
  KUBERNETES_DASHBOARDS_ITEMS,
  LITELLM_DASHBOARDS_ITEMS,
  HOST_METRICS_DASHBOARDS_ITEMS,
  APM_QUICK_START_ITEMS,
  LOGS_QUICK_START_ITEMS,
  getAllMetricsQuickStartItems,
  MIGRATE_TO_SIGNOZ_ITEMS,
  WEB_VITALS_ITEMS,
  HOSTING_DECISION_ITEMS,
} from '../../constants/componentItems'

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

export const KNOWN_AGENT_MDX_COMPONENT_NAMES = [
  'Admonition',
  'DocCard',
  'DocCardContainer',
  'DocsListicle',
  'Figure',
  'HostingDecision',
  'KeyPointCallout',
  'MCPInstallButton',
  'RegionTable',
  'TabItem',
  'Tabs',
  'ToggleHeading',
] as const
export const REVIEWED_FALLBACK_AGENT_MDX_COMPONENT_NAMES = [
  'CHClientWithOutput',
  'CloneRepo',
  'CommonPrerequisites',
  'DashboardActions',
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
  'K8sInstall',
  'K8sNextSteps',
  'K8sOtelDemo',
  'LibraryTab',
  'LibraryTabs',
  'MDXButton',
  'MetricsDefinition',
  'MultiNodePart1',
  'MultiNodePart2',
  'OtelOperatorAutoInstrumentation',
  'OtelOperatorOTLPEndpoint',
  'PrereqsInstrument',
  'RetentionInfo',
  'SigNozCloud',
  'TraefikMetrics',
  'UpgradeInfo',
  'UseHotRod',
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

const MCP_INSTALL_REGIONS = ['us', 'eu', 'in', 'us2', 'eu2', 'in2'] as const

const buildMcpInstallLink = (client: string, region: string): string | null => {
  const mcpUrl = `https://mcp.${region}.signoz.cloud/mcp`

  switch (client) {
    case 'cursor': {
      const config = Buffer.from(JSON.stringify({ url: mcpUrl }), 'utf8').toString('base64')
      return `cursor://anysphere.cursor-deeplink/mcp/install?name=SigNoz&config=${config}`
    }
    case 'vscode': {
      const json = JSON.stringify({
        name: 'signoz',
        config: { type: 'http', url: mcpUrl },
      })
      return `vscode:mcp/install?${encodeURIComponent(json)}`
    }
    default:
      return null
  }
}

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

type StubListItem = { name: string; href: string }

const createItemListStub = (
  items: StubListItem[] | ((props: StubProps) => StubListItem[]),
  title: string
): ComponentType<StubProps> => {
  const ItemListStub = (props: StubProps) => {
    const resolvedItems = typeof items === 'function' ? items(props) : items

    if (resolvedItems.length === 0) {
      return React.createElement('p', null, `${title}: No items found.`)
    }

    return React.createElement(
      'section',
      null,
      React.createElement('h2', null, title),
      React.createElement(
        'ul',
        null,
        ...resolvedItems.map((item, index) =>
          React.createElement(
            'li',
            { key: `${item.href}-${index}` },
            React.createElement('a', { href: item.href }, item.name)
          )
        )
      )
    )
  }

  ItemListStub.displayName = `${title.replace(/[^a-zA-Z0-9]+/g, '') || 'ItemList'}Stub`

  return ItemListStub
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

const LISTICLE_STUB_MAP: Record<string, { items: StubListItem[]; title: string }> = {
  apmQuickStart: { items: [...APM_QUICK_START_ITEMS], title: 'APM Quick Start' },
  logsQuickStart: { items: [...LOGS_QUICK_START_ITEMS], title: 'Logs Quick Start' },
  migrateToSignoz: { items: [...MIGRATE_TO_SIGNOZ_ITEMS], title: 'Migrate to SigNoz' },
  llmMonitoring: { items: [...LLM_MONITORING_ITEMS], title: 'LLM Monitoring Guides' },
  azureOneClick: { items: [...AZURE_ONE_CLICK_ITEMS], title: 'Azure One-Click Integrations' },
  apmDashboards: { items: [...APM_DASHBOARDS_ITEMS], title: 'APM Dashboards' },
  hostMetricsDashboards: {
    items: [...HOST_METRICS_DASHBOARDS_ITEMS],
    title: 'Host Metrics Dashboards',
  },
  kubernetesDashboards: {
    items: [...KUBERNETES_DASHBOARDS_ITEMS],
    title: 'Kubernetes Dashboards',
  },
  litellmDashboards: { items: [...LITELLM_DASHBOARDS_ITEMS], title: 'LiteLLM Dashboards' },
  k8sInstallation: {
    items: [...K8S_INSTALLATION_ITEMS],
    title: 'Kubernetes Installation Guides',
  },
  marketplaceInstallation: {
    items: [...MARKETPLACE_INSTALLATION_ITEMS],
    title: 'Marketplace Installation Guides',
  },
  webVitals: { items: [...WEB_VITALS_ITEMS], title: 'Web Vitals' },
  apmInstrumentation: {
    items: getAllAPMInstrumentationItems(),
    title: 'APM Instrumentation Guides',
  },
  javascriptInstrumentation: {
    items: getAllJavascriptInstrumentationItems(),
    title: 'JavaScript Instrumentation Guides',
  },
  javaInstrumentation: {
    items: getAllJavaInstrumentationItems(),
    title: 'Java Instrumentation Guides',
  },
  logsInstrumentation: {
    items: getAllLogsInstrumentationItems(),
    title: 'Logs Collection Guides',
  },
  metricsQuickStart: { items: getAllMetricsQuickStartItems(), title: 'Metrics Quick Start' },
  collectionAgents: { items: getAllCollectionAgentsItems(), title: 'Collection Agents' },
  selfHostInstallation: {
    items: getAllSelfHostInstallationItems(),
    title: 'Self-Host Installation Guides',
  },
  awsMonitoring: { items: getAllAWSMonitoringItems(), title: 'AWS Monitoring Guides' },
  awsOneClick: { items: getAllAWSOneClickItems(), title: 'AWS One-Click Integrations' },
  cicdMonitoring: { items: getAllCICDMonitoringItems(), title: 'CI/CD Monitoring Guides' },
  integrations: { items: getAllIntegrationsItems(), title: 'Integrations Guides' },
  dashboardTemplates: { items: [...DASHBOARD_TEMPLATES_ITEMS], title: 'Dashboard Templates' },
}

const createKnownComponentStubs = (): Record<
  KnownAgentMdxComponentName,
  ComponentType<StubProps>
> => ({
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
  MCPInstallButton: (props) => {
    const client = getStringProp(props, 'client')
    const content = hasRenderableChildren(props.children) ? props.children : null

    if (!content) {
      return React.createElement('p', null, `Install MCP server${client ? ` in ${client}` : ''}`)
    }

    if (!client) {
      return React.createElement('p', null, content)
    }

    return React.createElement(
      'section',
      null,
      React.createElement(
        'ul',
        null,
        ...MCP_INSTALL_REGIONS.map((region) => {
          const href = buildMcpInstallLink(client, region)
          if (!href) {
            return null
          }

          return React.createElement(
            'li',
            { key: `${client}-${region}` },
            React.createElement('a', { href }, `${content} (${region.toUpperCase()})`)
          )
        }).filter(Boolean)
      )
    )
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
  RegionTable: () => {
    return React.createElement(
      'p',
      null,
      'SigNoz Cloud region and endpoint reference is available in the rendered docs.'
    )
  },
  HostingDecision: createItemListStub(HOSTING_DECISION_ITEMS, 'Hosting Options'),
  DocsListicle: (props: StubProps) => {
    const dataKey = getStringProp(props, 'dataKey')
    if (!dataKey) {
      return React.createElement('p', null, 'DocsListicle: missing dataKey')
    }
    const config = LISTICLE_STUB_MAP[dataKey]
    if (!config) {
      return React.createElement('p', null, `DocsListicle: unknown dataKey "${dataKey}"`)
    }
    const Stub = createItemListStub(config.items, config.title)
    return React.createElement(Stub, props)
  },
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

export const buildAgentMdxComponentsForDoc = (doc: {
  slug?: string
  body: { raw: string }
}): DocsComponentMap => {
  const componentNames = extractMdxComponentNames(doc.body.raw)
  const knownStubs = createKnownComponentStubs()
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
