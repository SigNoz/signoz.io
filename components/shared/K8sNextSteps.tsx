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
        <CustomLink href="https://signoz.io/docs/opentelemetry-collection-agents/k8s/otel-operator/overview/#opentelemetry-auto-instrumentation-injection">
          Use OpenTelemetry Operator for automatic instrumentation
        </CustomLink>
      </li>
      <li>
        <CustomLink href="https://signoz.io/docs/manage/signoz-operator/overview/">
          Manage SigNoz resources as Kubernetes custom resources with the SigNoz Operator
        </CustomLink>
      </li>
    </ul>
  )
}
