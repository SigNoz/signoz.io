import CustomLink from '@/components/Link'

export default function K8sNextSteps() {
  return (
    <ul>
      <li>
        <CustomLink href="https://signoz.io/docs/collection-agents/k8s/k8s-infra/overview/">
          Collect Telemetry from your K8s Clusters
        </CustomLink>
      </li>
      <li>
        <CustomLink href="https://signoz.io/docs/tutorial/opentelemetry-operator-usage/#opentelemetry-auto-instrumentation-injection">
          Use OpenTelemetry Operator for automatic instrumentation
        </CustomLink>
      </li>
    </ul>
  )
}
