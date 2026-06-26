import CustomLink from '@/components/Link'

export default function K8sNextSteps() {
  return (
    <ul>
      <li>
        <CustomLink href="https://signoz.io/docs/opentelemetry-collection-agents/k8s/k8s-infra/overview/">
          Collect Telemetry from your K8s Clusters
        </CustomLink>
      </li>
      <li>
        <CustomLink href="https://signoz.io/docs/opentelemetry-collection-agents/k8s/otel-operator/overview/">
          Use OpenTelemetry Operator for automatic instrumentation
        </CustomLink>
      </li>
    </ul>
  )
}
