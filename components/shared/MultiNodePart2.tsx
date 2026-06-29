import { RegionAwareCode, RegionAwarePre } from '@/components/Region/RegionAwareComponents'

export default function MultiNodePart2() {
  return (
    <>
      <p>
        (Optional) After the migration files run once in all clickhouse instances and healthy SigNoz
        cluster is verified, you need to make sure migration files do not run for every{' '}
        <code>otel-collector</code> container restart.
      </p>
      <p>
        You can do that by toggling back <code>DOCKER_MULTI_NODE_CLUSTER</code> environment variable
        back to <code>false</code>.
      </p>
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
