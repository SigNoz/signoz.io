import { Typography } from '@signozhq/ui/typography'
import { RegionAwareCode, RegionAwarePre } from '@/components/Region/RegionAwareComponents'

export default function CHClientWithOutput() {
  return (
    <>
      <Typography.Text as="p">
        Inside the bash shell, run the following to create clickhouse client:
      </Typography.Text>
      <RegionAwarePre>
        <RegionAwareCode className="language-bash">{`clickhouse client`}</RegionAwareCode>
      </RegionAwarePre>
      <Typography.Text as="p">Output should be similar to this:</Typography.Text>
      <RegionAwarePre>
        <RegionAwareCode className="language-output">
          {`ClickHouse client version 22.4.5.9 (official build).
Connecting to localhost:9000 as user default.
Connected to ClickHouse server version 22.4.5 revision 54455.

5c6e8128ba12 :)`}
        </RegionAwareCode>
      </RegionAwarePre>
    </>
  )
}
