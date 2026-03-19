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
  COLLECTION_AGENTS_ITEMS,
  getAllCollectionAgentsItems,
  getAllAPMInstrumentationItems,
  getAllJavaInstrumentationItems,
  getAllJavascriptInstrumentationItems,
  getAllLogsInstrumentationItems,
  getAllIntegrationsItems,
  getAllCICDMonitoringItems,
  getAllAWSMonitoringItems,
  getAllAWSOneClickItems,
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
  'APMDashboardsListicle',
  'APMInstrumentationListicle',
  'APMQuickStartOverview',
  'AWSMonitoringListicle',
  'AWSOneClickListicle',
  'CICDMonitoringListicle',
  'CollectionAgentsListicle',
  'DashboardTemplatesListicle',
  'DocCard',
  'DocCardContainer',
  'Figure',
  'HostingDecision',
  'HostMetricsDashboardsListicle',
  'IntegrationsListicle',
  'JavaInstrumentationListicle',
  'JavascriptInstrumentationListicle',
  'K8sInstallationListicle',
  'KeyPointCallout',
  'KubernetesDashboardsListicle',
  'LiteLLMDashboardsListicle',
  'LLMMonitoringListicle',
  'LogsInstrumentationListicle',
  'LogsQuickStartOverview',
  'MarketplaceInstallationListicle',
  'MetricsQuickStartOverview',
  'MigrateToSigNoz',
  'SelfHostInstallationListicle',
  'TabItem',
  'Tabs',
  'ToggleHeading',
  'WebVitalsGrid',
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
  'PrereqsInstrument',
  'RegionTable',
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
  HostingDecision: createItemListStub(HOSTING_DECISION_ITEMS, 'Hosting Options'),
  APMDashboardsListicle: createItemListStub(APM_DASHBOARDS_ITEMS, 'APM Dashboards'),
  APMInstrumentationListicle: createItemListStub(
    getAllAPMInstrumentationItems(),
    'APM Instrumentation Guides'
  ),
  APMQuickStartOverview: createItemListStub(APM_QUICK_START_ITEMS, 'APM Quick Start'),
  AWSMonitoringListicle: createItemListStub(getAllAWSMonitoringItems(), 'AWS Monitoring Guides'),
  AWSOneClickListicle: createItemListStub(getAllAWSOneClickItems(), 'AWS One-Click Integrations'),
  CICDMonitoringListicle: createItemListStub(
    getAllCICDMonitoringItems(),
    'CI/CD Monitoring Guides'
  ),
  CollectionAgentsListicle: createItemListStub((props) => {
    const platform = getStringProp(props, 'platform')

    switch (platform) {
      case 'docker':
        return COLLECTION_AGENTS_ITEMS.docker
      case 'ecs':
        return COLLECTION_AGENTS_ITEMS.ecs
      case 'kubernetes':
        return COLLECTION_AGENTS_ITEMS.kubernetes
      case 'vm':
        return COLLECTION_AGENTS_ITEMS.vm
      default:
        return getAllCollectionAgentsItems()
    }
  }, 'Collection Agents'),
  DashboardTemplatesListicle: createItemListStub(DASHBOARD_TEMPLATES_ITEMS, 'Dashboard Templates'),
  HostMetricsDashboardsListicle: createItemListStub(
    HOST_METRICS_DASHBOARDS_ITEMS,
    'Host Metrics Dashboards'
  ),
  IntegrationsListicle: createItemListStub(getAllIntegrationsItems(), 'Integrations Guides'),
  JavaInstrumentationListicle: createItemListStub(
    getAllJavaInstrumentationItems(),
    'Java Instrumentation Guides'
  ),
  JavascriptInstrumentationListicle: createItemListStub(
    getAllJavascriptInstrumentationItems(),
    'JavaScript Instrumentation Guides'
  ),
  K8sInstallationListicle: createItemListStub(
    K8S_INSTALLATION_ITEMS,
    'Kubernetes Installation Guides'
  ),
  KubernetesDashboardsListicle: createItemListStub(
    KUBERNETES_DASHBOARDS_ITEMS,
    'Kubernetes Dashboards'
  ),
  LiteLLMDashboardsListicle: createItemListStub(LITELLM_DASHBOARDS_ITEMS, 'LiteLLM Dashboards'),
  LLMMonitoringListicle: createItemListStub(LLM_MONITORING_ITEMS, 'LLM Monitoring Guides'),
  LogsInstrumentationListicle: createItemListStub(
    getAllLogsInstrumentationItems(),
    'Logs Collection Guides'
  ),
  LogsQuickStartOverview: createItemListStub(LOGS_QUICK_START_ITEMS, 'Logs Quick Start'),
  MarketplaceInstallationListicle: createItemListStub(
    MARKETPLACE_INSTALLATION_ITEMS,
    'Marketplace Installation Guides'
  ),
  MetricsQuickStartOverview: createItemListStub(
    getAllMetricsQuickStartItems(),
    'Metrics Quick Start'
  ),
  MigrateToSigNoz: createItemListStub(MIGRATE_TO_SIGNOZ_ITEMS, 'Migrate to SigNoz'),
  SelfHostInstallationListicle: createItemListStub(
    getAllSelfHostInstallationItems(),
    'Self-Host Installation Guides'
  ),
  WebVitalsGrid: createItemListStub(WEB_VITALS_ITEMS, 'Web Vitals'),
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
