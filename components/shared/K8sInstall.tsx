import { Typography } from '@signozhq/ui/typography'
import { RegionAwareCode, RegionAwarePre } from '@/components/Region/RegionAwareComponents'
import RetentionInfo from '@/components/shared/RetentionInfo'

export default function K8sInstall() {
  return (
    <>
      <Typography.Title level={3}>Helm Installation</Typography.Title>
      <Typography.Text as="p">
        The SigNoz Helm{' '}
        <a
          href="https://github.com/SigNoz/charts"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-[var(--accent-primary)] hover:underline"
        >
          chart
        </a>{' '}
        will install the following components into your Kubernetes cluster:
      </Typography.Text>
      <ul>
        <li>SigNoz</li>
        <li>SigNoz Collector</li>
        <li>Clickhouse</li>
        <li>Zookeeper</li>
      </ul>
      <ol>
        <li>
          <Typography.Text as="p">Find a storage class to use in your cluster:</Typography.Text>
          <RegionAwarePre>
            <RegionAwareCode className="language-bash">{`kubectl get storageclass`}</RegionAwareCode>
          </RegionAwarePre>
        </li>
        <li>
          <Typography.Text as="p">
            Create a <code>values.yaml</code> file that will contain the configuration for the
            chart. Here is a minimal example to get started:
          </Typography.Text>
          <RegionAwarePre>
            <RegionAwareCode className="language-yaml">{`global:
  storageClass: <storage-class>

clickhouse:
  installCustomStorageClass: true`}</RegionAwareCode>
          </RegionAwarePre>
          <Typography.Text as="p">
            You can find an exhaustive list of the parameters{' '}
            <a
              href="https://github.com/SigNoz/charts/tree/main/charts/signoz#configuration"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="text-[var(--accent-primary)] hover:underline"
            >
              here
            </a>
            .
          </Typography.Text>
        </li>
        <li>
          <Typography.Text as="p">Install SigNoz:</Typography.Text>
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
      <Typography.Title level={3}>Test the installation</Typography.Title>
      <ol>
        <li>
          <Typography.Text as="p">
            In another terminal, port-forward signoz on its http port. (By default, signoz exposes
            its http server on port 8080.)
          </Typography.Text>
          <RegionAwarePre>
            <RegionAwareCode className="language-bash">{`kubectl port-forward -n <namespace> svc/signoz 8080:8080`}</RegionAwareCode>
          </RegionAwarePre>
        </li>
        <li>
          <Typography.Text as="p">
            Run the following command to check the health of signoz:
          </Typography.Text>
          <RegionAwarePre>
            <RegionAwareCode className="language-bash">{`curl -X GET http://localhost:8080/api/v1/health`}</RegionAwareCode>
          </RegionAwarePre>
        </li>
        <li>
          <Typography.Text as="p">
            If the installation is successful, you should see the following output:
          </Typography.Text>
          <RegionAwarePre>
            <RegionAwareCode className="language-bash">{`{"status":"ok"}`}</RegionAwareCode>
          </RegionAwarePre>
        </li>
      </ol>
      <RetentionInfo />
    </>
  )
}
