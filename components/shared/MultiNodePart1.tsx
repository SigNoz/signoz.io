import { Typography } from '@signozhq/ui/typography'
import { RegionAwareCode, RegionAwarePre } from '@/components/Region/RegionAwareComponents'

export default function MultiNodePart1() {
  return (
    <>
      <Typography.Text as="p">
        Next, you will have to toggle <code>DOCKER_MULTI_NODE_CLUSTER</code> environment variable to{' '}
        <code>true</code> to ensure migrations are run on new instances (shards) of clickhouse.
      </Typography.Text>
      <RegionAwarePre>
        <RegionAwareCode className="language-yaml">
          {`services:
  otel-collector:
    environment:
      - DOCKER_MULTI_NODE_CLUSTER=true`}
        </RegionAwareCode>
      </RegionAwarePre>
    </>
  )
}
