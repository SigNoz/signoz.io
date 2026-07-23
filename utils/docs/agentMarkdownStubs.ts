import React from 'react'
import type { ComponentType, ReactNode } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkMdx from 'remark-mdx'
import { getListicleConfig, getListicleItems } from '../../constants/listicles/utils'
import type { ListicleConfig } from '../../components/Listicle/types'

const HOSTING_DECISION_ITEMS = [
  {
    name: 'Compare Self Host vs Cloud',
    href: '/blog/cloud-vs-self-hosted-deployment-guide/',
    clickName: 'Compare Self Host vs Cloud',
  },
  {
    name: 'Get Started - Free',
    href: '/teams/',
    clickName: 'Get Started - Free',
  },
] as const

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
  'Figure',
  'HostingDecision',
  'KeyPointCallout',
  'Listicle',
  'MCPInstallButton',
  'RegionTable',
  'TabItem',
  'Tabs',
  'ToggleHeading',
  'TroubleshootingWizard',
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
type StubListTitle = string | ((props: StubProps) => string)

const createItemListStub = (
  items: StubListItem[] | ((props: StubProps) => StubListItem[]),
  title: StubListTitle
): ComponentType<StubProps> => {
  const ItemListStub = (props: StubProps) => {
    const resolvedItems = typeof items === 'function' ? items(props) : items
    const resolvedTitle = typeof title === 'function' ? title(props) : title

    if (resolvedItems.length === 0) {
      return React.createElement('p', null, `${resolvedTitle}: No items found.`)
    }

    return React.createElement(
      'section',
      null,
      React.createElement('h2', null, resolvedTitle),
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

  const displayTitle = typeof title === 'string' ? title : 'ItemList'
  ItemListStub.displayName = `${displayTitle.replace(/[^a-zA-Z0-9]+/g, '') || 'ItemList'}Stub`

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

// The TroubleshootingWizard renders as an interactive click-through on the page.
// For agent markdown we emit its decision tree as static text so the logic is
// still readable without the UI. The full explanations live in the surrounding
// prose (Steps 1-3 and "Common errors and fixes"), which agents also receive.
const createTroubleshootingWizardStub = (): ComponentType<StubProps> => {
  const li = (text: string, children?: ReactNode) =>
    React.createElement('li', null, text, children ?? null)
  const ul = (...items: ReactNode[]) => React.createElement('ul', null, ...items)

  const TroubleshootingWizardStub = () =>
    React.createElement(
      'section',
      null,
      React.createElement(
        'p',
        null,
        React.createElement(
          'strong',
          null,
          'Interactive troubleshooter (rendered as a clickable wizard on the page). Decision tree:'
        )
      ),
      React.createElement(
        'ol',
        null,
        li(
          'Set OTEL_<SIGNAL>_EXPORTER=console, restart, and exercise the code path.',
          ul(
            li(
              'No data in the console: instrumentation problem. Check SDK init order, runtime version support, third-party library support, and that the code path ran.'
            ),
            li('Data in the console: continue.')
          )
        ),
        li(
          'Enable OTEL_LOG_LEVEL=debug (or your language equivalent) and read the export errors.',
          ul(
            li('401 / 403 / Unauthenticated: wrong, expired, or revoked ingestion key.'),
            li(
              '404 Not Found: wrong endpoint or path. Remove any trailing slash, use the correct signal path, and note SigNoz Cloud uses port 443.'
            ),
            li('Connection refused / timeout / no such host: check the topology below.'),
            li('Exports succeed but nothing appears in SigNoz: wrong region.'),
            li('No errors: check the topology below.')
          )
        ),
        li(
          'Topology:',
          ul(
            li(
              'Direct to SigNoz Cloud: run curl -v https://ingest.<region>.signoz.cloud:443. Fails to connect means a firewall or network policy; connects but no data means the key, endpoint, or region is wrong.'
            ),
            li(
              'Through a Collector: add the Collector debug exporter. Data in the Collector logs means a Collector-to-SigNoz export problem (otlphttp endpoint/key/region, exporter wired into the pipeline). Nothing in the Collector logs means an app-to-Collector problem (OTEL_EXPORTER_OTLP_ENDPOINT, ports 4317/4318, network).'
            )
          )
        )
      )
    )

  TroubleshootingWizardStub.displayName = 'TroubleshootingWizardStub'
  return TroubleshootingWizardStub
}

const createKnownComponentStubs = (
  listicleConfigs: Map<string, ListicleConfig>
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
  TroubleshootingWizard: createTroubleshootingWizardStub(),
  RegionTable: () => {
    return React.createElement(
      'p',
      null,
      'SigNoz Cloud region and endpoint reference is available in the rendered docs.'
    )
  },
  HostingDecision: createItemListStub([...HOSTING_DECISION_ITEMS], 'Hosting Options'),
  Listicle: createItemListStub(
    (props) => {
      const name = getStringProp(props, 'name')
      const config = name ? (listicleConfigs.get(name) ?? null) : null
      if (!config) return []
      return getListicleItems(config, { sectionId: getStringProp(props, 'defaultSection') })
    },
    (props) => {
      const name = getStringProp(props, 'name')
      const config = name ? (listicleConfigs.get(name) ?? null) : null
      return config?.markdownTitle || 'Listicle'
    }
  ),
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

const LISTICLE_NAME_PATTERN = /<Listicle\s[^>]*name=["']([^"']+)["']/g

const extractListicleNames = (rawMdx: string): string[] => {
  const names = new Set<string>()
  for (const match of rawMdx.matchAll(LISTICLE_NAME_PATTERN)) {
    names.add(match[1])
  }
  return Array.from(names)
}

const prefetchListicleConfigs = async (names: string[]): Promise<Map<string, ListicleConfig>> => {
  const configs = new Map<string, ListicleConfig>()
  const results = await Promise.all(
    names.map(async (name) => {
      const config = await getListicleConfig(name)
      return [name, config] as const
    })
  )
  for (const [name, config] of results) {
    if (config) configs.set(name, config)
  }
  return configs
}

export const buildAgentMdxComponentsForDoc = async (doc: {
  slug?: string
  body: { raw: string }
}): Promise<DocsComponentMap> => {
  const componentNames = extractMdxComponentNames(doc.body.raw)

  const listicleNames = extractListicleNames(doc.body.raw)
  const listicleConfigMap = await prefetchListicleConfigs(listicleNames)

  const knownStubs = createKnownComponentStubs(listicleConfigMap)
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
