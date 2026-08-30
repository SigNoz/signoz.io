import { Typography } from '@signozhq/ui/typography'
import CustomLink from '@/components/Link'

export default function K8sNextSteps() {
  return (
    <ul>
      <li>
        <CustomLink
          href="https://signoz.io/docs/opentelemetry-collection-agents/k8s/k8s-infra/overview/"
          className="text-[var(--accent-primary)] hover:underline"
        >
          <Typography.Text as="span" className="text-inherit">
            Collect Telemetry from your K8s Clusters
          </Typography.Text>
        </CustomLink>
      </li>
      <li>
        <CustomLink
          href="https://signoz.io/docs/opentelemetry-collection-agents/k8s/otel-operator/overview/#opentelemetry-auto-instrumentation-injection"
          className="text-[var(--accent-primary)] hover:underline"
        >
          <Typography.Text as="span" className="text-inherit">
            Use OpenTelemetry Operator for automatic instrumentation
          </Typography.Text>
        </CustomLink>
      </li>
    </ul>
  )
}
