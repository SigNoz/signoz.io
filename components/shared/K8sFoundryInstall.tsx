import { RegionAwareCode, RegionAwarePre } from '@/components/Region/RegionAwareComponents'
import Admonition from '@/components/Admonition/Admonition'
import RetentionInfo from '@/components/shared/RetentionInfo'

export default function K8sFoundryInstall() {
  return (
    <>
      <Admonition type="info" title="What is Foundry?" defaultCollapsed={true}>
        <p>
          Foundry is an open-source CLI that runs your self-hosted observability stack as code. One
          declarative config provisions the infrastructure, installs the SigNoz backend, and sets up
          OpenTelemetry collection on bare metal, containers, or Kubernetes. Learn more about{' '}
          <a
            href="https://github.com/SigNoz/foundry"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Foundry
          </a>
          .
        </p>
      </Admonition>
      <h3>Step 1: Install foundryctl</h3>
      <RegionAwarePre>
        <RegionAwareCode className="language-bash">{`curl -fsSL https://signoz.io/foundry.sh | bash`}</RegionAwareCode>
      </RegionAwarePre>
      <p>
        For manual install (Windows PowerShell, air-gapped, etc.) or PATH setup, see the{' '}
        <a
          href="https://github.com/SigNoz/foundry/blob/main/docs/getting-started.md"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          foundry getting-started guide
        </a>
        .
      </p>
      <h3>Step 2: Create casting.yaml</h3>
      <p>
        Create a casting file that targets Kubernetes with <code>flavor: helm</code> and{' '}
        <code>mode: kubernetes</code>:
      </p>
      <RegionAwarePre>
        <RegionAwareCode className="language-yaml">{`apiVersion: v1alpha1
kind: Installation
metadata:
  name: signoz
spec:
  deployment:
    flavor: helm
    mode: kubernetes
  telemetrykeeper:
    kind: zookeeper`}</RegionAwareCode>
      </RegionAwarePre>
      <p>
        The SigNoz Helm chart ships ZooKeeper as the ClickHouse keeper, so the casting states{' '}
        <code>telemetrykeeper.kind: zookeeper</code>.
      </p>
      <p>
        Foundry installs the <code>signoz</code> release into the <code>signoz</code> namespace,
        taken from <code>metadata.name</code>. Set the{' '}
        <code>foundry.signoz.io/kubernetes-namespace</code> annotation under <code>metadata</code>{' '}
        to use a different namespace.
      </p>
      <p>
        For all configuration options, see the{' '}
        <a
          href="https://github.com/SigNoz/foundry/blob/main/docs/reference/casting-file.md"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          casting file reference
        </a>{' '}
        and the{' '}
        <a
          href="https://github.com/SigNoz/foundry/tree/main/docs/examples/kubernetes/helm"
          target="_blank"
          rel="noopener noreferrer nofollow"
        >
          Kubernetes Helm example
        </a>
        .
      </p>
      <Admonition type="info" title="Storage class">
        <p>
          Foundry leaves <code>global.storageClass</code> unset, so the chart uses the default
          StorageClass of your cluster. To pin a storage class, add a patch to the casting:
        </p>
        <RegionAwarePre>
          <RegionAwareCode className="language-yaml">{`spec:
  patches:
    - target: deployment/values.yaml
      operations:
        - op: add
          path: /global
          value:
            storageClass: <storage-class>`}</RegionAwareCode>
        </RegionAwarePre>
        <p>
          The generated <code>values.yaml</code> has no <code>global</code> section, so the patch
          adds it as a whole.
        </p>
        <p>
          Patches apply to the generated <code>values.yaml</code> before Foundry installs the chart.
          See the{' '}
          <a
            href="https://github.com/SigNoz/foundry/tree/main/docs/examples/kubernetes/helm-patches"
            target="_blank"
            rel="noopener noreferrer nofollow"
          >
            Helm patches example
          </a>{' '}
          for resources, tolerations, and persistence size.
        </p>
      </Admonition>
      <h3>Step 3: Deploy</h3>
      <RegionAwarePre>
        <RegionAwareCode className="language-bash">{`foundryctl cast -f casting.yaml`}</RegionAwareCode>
      </RegionAwarePre>
      <p>
        <code>cast</code> checks that <code>helm</code> and <code>kubectl</code> are available,
        renders <code>pours/deployment/values.yaml</code>, and installs the <code>signoz</code>{' '}
        release from the chart at <code>https://charts.signoz.io</code>. Running <code>cast</code>{' '}
        again upgrades the release in place.
      </p>
      <Admonition type="tip" title="Skip cast and run helm directly" defaultCollapsed={true}>
        <p>
          <code>cast</code> chains Foundry&apos;s three stages:
        </p>
        <ul>
          <li>
            <code>gauge</code> checks your environment
          </li>
          <li>
            <code>forge</code> renders <code>values.yaml</code> into <code>pours/</code> and writes{' '}
            <code>casting.yaml.lock</code>
          </li>
          <li>
            <code>cast</code> installs the release
          </li>
        </ul>
        <p>
          If you prefer to manage the release yourself, render the values with <code>forge</code>,
          inspect them, and install the chart with Helm:
        </p>
        <RegionAwarePre>
          <RegionAwareCode className="language-bash">{`foundryctl gauge -f casting.yaml   # validate prerequisites
foundryctl forge -f casting.yaml   # generate values.yaml
helm repo add signoz https://charts.signoz.io
helm repo update
helm upgrade --install signoz signoz/signoz \\
   --namespace signoz --create-namespace \\
   -f pours/deployment/values.yaml`}</RegionAwareCode>
        </RegionAwarePre>
      </Admonition>
      <h3>Test the installation</h3>
      <ol>
        <li>
          <p>
            In another terminal, port-forward signoz on its http port. (By default, signoz exposes
            its http server on port 8080.)
          </p>
          <RegionAwarePre>
            <RegionAwareCode className="language-bash">{`kubectl port-forward -n signoz svc/signoz 8080:8080`}</RegionAwareCode>
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
