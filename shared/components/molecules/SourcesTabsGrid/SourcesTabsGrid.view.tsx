'use client'

import React from 'react'
import Image from 'next/image'
import { Badge } from '@signozhq/ui/badge'
import TrackingLink from '@/components/TrackingLink'
import { Card } from '@/components/ui/Card'
import Tabs from '@/components/Tabs'
import TabItem from '@/components/TabItem'
import IconGrid from '@/shared/components/molecules/FeaturePages/IconGrid'
import {
  CLOUD_ICONS,
  CONTAINER_ICONS,
  POPULAR_TOOLS_ICONS,
  EXISTING_AGENTS_ICONS,
  DIRECT_INTEGRATIONS,
} from './SourcesTabsGrid.constants'
import { usePathname } from 'next/navigation'

const SourcesTabsGrid: React.FC = () => {
  const pathname = usePathname()

  const sourcesTabContent = (
    <div className="flex min-h-52 flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <IconGrid
          icons={CLOUD_ICONS}
          title="CLOUD"
          className="border-r-1 border-dashed border-signoz_slate-400 pr-4"
        />
        <IconGrid icons={CONTAINER_ICONS} title="CONTAINERS" />
      </div>

      <div className="border-b-1 border-dashed border-signoz_slate-400" />

      <IconGrid icons={POPULAR_TOOLS_ICONS} title="POPULAR TOOLS" />

      <TrackingLink
        className="flex w-fit items-center justify-center gap-2 text-xs"
        href="/docs/logs-management/send-logs-to-signoz/"
        clickType="Inline Link"
        clickName={`View Sources Link - ${pathname}`}
        clickLocation={`Supported Sources Tab - ${pathname}`}
        clickText="VIEW ALL 50+ SOURCES"
      >
        VIEW ALL 50+ SOURCES
      </TrackingLink>
    </div>
  )

  const methodsTabContent = (
    <div className="flex min-h-52 flex-col gap-8">
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <h3 className="m-0 text-xs font-medium uppercase text-signoz_vanilla-400">
              OPENTELEMETRY
            </h3>
            <Badge color="vanilla" className="text-xs">
              Recommended
            </Badge>
          </div>
          <div className="flex items-center gap-8">
            <Image
              src="/img/website/opentelemetry-icon-color.svg"
              alt="OpenTelemetry"
              className="h-8"
              width={32}
              height={32}
            />
          </div>
        </div>
        <IconGrid icons={EXISTING_AGENTS_ICONS} title="EXISTING AGENTS" />
      </div>

      <div>
        <h3 className="mb-4 text-xs font-medium uppercase text-signoz_vanilla-400">
          DIRECT INTEGRATIONS
        </h3>
        <div className="flex flex-wrap gap-2">
          {DIRECT_INTEGRATIONS.map((integration, index) => (
            <Badge key={index} color="vanilla" className="rounded-sm">
              {integration}
            </Badge>
          ))}
        </div>
      </div>

      <TrackingLink
        className="justify-start text-xs"
        href="/docs/logs-management/send-logs-to-signoz/"
        clickType="Inline Link"
        clickName={`View Integration Guides Link - ${pathname}`}
        clickLocation={`Collection Methods Tab - ${pathname}`}
        clickText="VIEW INTEGRATION GUIDES"
      >
        VIEW INTEGRATION GUIDES
      </TrackingLink>
    </div>
  )

  return (
    <Card className="[&>div]:border-1 bg-signoz_ink-400 [&>*]:p-4">
      <Tabs entityName="sources">
        <TabItem value="supported-sources" label="Supported Sources">
          {sourcesTabContent}
        </TabItem>
        <TabItem value="collection-methods" label="Collection Methods">
          {methodsTabContent}
        </TabItem>
      </Tabs>
    </Card>
  )
}

export default SourcesTabsGrid
