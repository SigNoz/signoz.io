import { Typography } from '@signozhq/ui/typography'
import { RegionAwareCode, RegionAwarePre } from '@/components/Region/RegionAwareComponents'

export default function MultiNodePart2() {
  return (
    <>
      <Typography.Text as="p">
        (Optional) After the migration files run once in all clickhouse instances and healthy SigNoz
        cluster is verified, you need to make sure migration files do not run for every{' '}
        <code>otel-collector</code> container restart.
      </Typography.Text>
      <Typography.Text as="p">
        You can do that by toggling back <code>DOCKER_MULTI_NODE_CLUSTER</code> environment variable
        back to <code>false</code>.
      </Typography.Text>
      <RegionAwarePre>
        <RegionAwareCode className="language-yaml">
          {`services:
  otel-collector:
    environment:
      - DOCKER_MULTI_NODE_CLUSTER=false`}
        </RegionAwareCode>
      </RegionAwarePre>
    </>
  )
}
