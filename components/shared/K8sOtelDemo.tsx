import { RegionAwareCode, RegionAwarePre } from '@/components/Region/RegionAwareComponents'

export default function K8sOtelDemo() {
  return (
    <>
      <p>
        The OpenTelemetry Demo is a microservice-based distributed system intended to illustrate the
        implementation of OpenTelemetry in a near real-world environment. See more details at{' '}
        <a
          href="https://opentelemetry.io/ecosystem/demo/"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          OpenTelemetry Demo
        </a>
        .
      </p>
      <ol>
        <li>
          <p>Get the address of the SigNoz collector:</p>
          <RegionAwarePre>
            <RegionAwareCode className="language-bash">{`kubectl get -n <namespace> svc/signoz-otel-collector`}</RegionAwareCode>
          </RegionAwarePre>
          <p>
            This value will be used in the next step to configure the OpenTelemetry Demo to send
            data to the SigNoz collector.
          </p>
        </li>
        <li>
          <p>
            Create a <code>values.yaml</code> file that will contain the configuration for the chart
            and send it to your SigNoz installation:
          </p>
          <RegionAwarePre>
            <RegionAwareCode className="language-yaml">{`default:
  env:
    - name: OTEL_SERVICE_NAME
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: "metadata.labels['app.kubernetes.io/component']"
    - name: OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE
      value: cumulative
    - name: OTEL_RESOURCE_ATTRIBUTES
      value: 'service.name=$(OTEL_SERVICE_NAME),service.namespace=opentelemetry-demo,service.version={{ .Chart.appVersion }}'
    - name: OTEL_COLLECTOR_NAME
      value: signoz-otel-collector.<namespace>.svc.cluster.local`}</RegionAwareCode>
          </RegionAwarePre>
          <p>
            Note: The <code>OTEL_COLLECTOR_NAME</code> is the address obtained in the previous step.
          </p>
        </li>
        <li>
          <p>Install OpenTelemetry Demo:</p>
          <RegionAwarePre>
            <RegionAwareCode className="language-bash">{`helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
helm install otel-demo open-telemetry/opentelemetry-demo -f values.yaml`}</RegionAwareCode>
          </RegionAwarePre>
          <p>
            More details on the installation can be found{' '}
            <a
              href="https://opentelemetry.io/docs/demo/kubernetes-deployment/"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              here
            </a>
            .
          </p>
        </li>
      </ol>
    </>
  )
}
