import { RegionAwareCode, RegionAwarePre } from '@/components/Region/RegionAwareComponents'
import RetentionInfo from '@/components/shared/RetentionInfo'

export default function K8sInstall() {
  return (
    <>
      <h3>Helm Installation</h3>
      <p>
        The SigNoz Helm{' '}
        <a
          href="https://github.com/SigNoz/charts"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          chart
        </a>{' '}
        will install the following components into your Kubernetes cluster:
      </p>
      <ul>
        <li>SigNoz</li>
        <li>SigNoz Collector</li>
        <li>Clickhouse</li>
        <li>Zookeeper</li>
      </ul>
      <ol>
        <li>
          <p>Find a storage class to use in your cluster:</p>
          <RegionAwarePre>
            <RegionAwareCode className="language-bash">{`kubectl get storageclass`}</RegionAwareCode>
          </RegionAwarePre>
        </li>
        <li>
          <p>
            Create a <code>values.yaml</code> file that will contain the configuration for the
            chart. Here is a minimal example to get started:
          </p>
          <RegionAwarePre>
            <RegionAwareCode className="language-yaml">{`global:
  storageClass: <storage-class>

clickhouse:
  installCustomStorageClass: true`}</RegionAwareCode>
          </RegionAwarePre>
          <p>
            You can find an exhaustive list of the parameters{' '}
            <a
              href="https://github.com/SigNoz/charts/tree/main/charts/signoz#configuration"
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              here
            </a>
            .
          </p>
        </li>
        <li>
          <p>Install SigNoz:</p>
          <RegionAwarePre>
            <RegionAwareCode className="language-bash">{`helm repo add signoz https://charts.signoz.io
helm repo update
helm install signoz signoz/signoz \\
   --namespace <namespace> --create-namespace \\
   --wait \\
   --timeout 1h \\
   -f values.yaml`}</RegionAwareCode>
          </RegionAwarePre>
        </li>
      </ol>
      <h3>Test the installation</h3>
      <ol>
        <li>
          <p>
            In another terminal, port-forward signoz on its http port. (By default, signoz exposes
            its http server on port 8080.)
          </p>
          <RegionAwarePre>
            <RegionAwareCode className="language-bash">{`kubectl port-forward -n <namespace> svc/signoz 8080:8080`}</RegionAwareCode>
          </RegionAwarePre>
        </li>
        <li>
          <p>Run the following command to check the health of signoz:</p>
          <RegionAwarePre>
            <RegionAwareCode className="language-bash">{`curl -X GET http://localhost:8080/api/v1/health`}</RegionAwareCode>
          </RegionAwarePre>
        </li>
        <li>
          <p>If the installation is successful, you should see the following output:</p>
          <RegionAwarePre>
            <RegionAwareCode className="language-bash">{`{"status":"ok"}`}</RegionAwareCode>
          </RegionAwarePre>
        </li>
      </ol>
      <RetentionInfo />
    </>
  )
}
