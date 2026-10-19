import { ChartNoAxesColumn, DraftingCompass, Logs, type LucideIcon } from 'lucide-react'

import type { Signal, SignalMeta, Tone, WizardNode } from './TroubleshootingWizard.types'

export const SIGNALS: Record<Signal, SignalMeta> = {
  traces: {
    label: 'Traces',
    unit: 'spans',
    envExporter: 'OTEL_TRACES_EXPORTER',
    signalPath: 'v1/traces',
  },
  logs: {
    label: 'Logs',
    unit: 'log records',
    envExporter: 'OTEL_LOGS_EXPORTER',
    signalPath: 'v1/logs',
  },
  metrics: {
    label: 'Metrics',
    unit: 'metrics',
    envExporter: 'OTEL_METRICS_EXPORTER',
    signalPath: 'v1/metrics',
  },
}

export const SIGNAL_ICONS: Record<Signal, LucideIcon> = {
  traces: DraftingCompass,
  logs: Logs,
  metrics: ChartNoAxesColumn,
}

export const START = 'q_generated'

export function buildTree(m: SignalMeta): Record<string, WizardNode> {
  return {
    q_generated: {
      kind: 'question',
      prompt: (
        <>
          Set <code>{m.envExporter}=console</code>, restart your app, and exercise the code path. Do
          you see {m.unit} printed in your console?
        </>
      ),
      hint: (
        <>
          This checks whether the data exists at all, before worrying about where it goes. Use{' '}
          <code>{m.envExporter}=otlp,console</code> to keep exporting to SigNoz while you look.
          Works for the Java, Node.js, Python, .NET, Ruby, and PHP agents; in Go, add a stdout
          exporter in code instead.
        </>
      ),
      options: [
        { label: `Yes, I see ${m.unit}`, to: 'q_export_errors' },
        { label: 'No, nothing is printed', to: 'r_instrumentation' },
      ],
    },
    q_export_errors: {
      kind: 'question',
      prompt: (
        <>
          Turn on the SDK&apos;s own diagnostic logging (<code>OTEL_LOG_LEVEL=debug</code> or your
          language&apos;s equivalent) and restart. Do you see export errors in your app&apos;s logs?
        </>
      ),
      options: [
        { label: 'Yes, there are export errors', to: 'q_error_kind' },
        { label: 'No, exports look clean', to: 'q_topology' },
      ],
    },
    q_error_kind: {
      kind: 'question',
      prompt: <>What does the error look like?</>,
      options: [
        { label: '401 / 403 / Unauthenticated', to: 'r_key' },
        { label: '404 Not Found', to: 'r_endpoint' },
        { label: 'Connection refused / timeout / no such host', to: 'q_topology' },
        { label: 'Exports succeed, but still nothing in SigNoz', to: 'r_region' },
      ],
    },
    q_topology: {
      kind: 'question',
      prompt: <>How are you sending data to SigNoz?</>,
      options: [
        { label: 'Directly to SigNoz (Cloud or self-hosted)', to: 'r_direct' },
        { label: 'Through an OpenTelemetry Collector', to: 'q_collector_sees' },
      ],
    },
    q_collector_sees: {
      kind: 'question',
      prompt: (
        <>
          Add the Collector&apos;s <code>debug</code> exporter to the pipeline and restart. Do you
          see your {m.unit} in the Collector&apos;s own logs?
        </>
      ),
      hint: (
        <>
          This <code>debug</code> exporter is a Collector pipeline component, different from the
          SDK&apos;s <code>OTEL_LOG_LEVEL=debug</code> above. It tells you what the Collector
          actually receives.
        </>
      ),
      options: [
        { label: `Yes, ${m.unit} show up in the Collector logs`, to: 'r_collector_to_signoz' },
        { label: 'No, the Collector logs show nothing', to: 'r_app_to_collector' },
      ],
    },

    // ---- results ----
    r_instrumentation: {
      kind: 'result',
      tone: 'warning',
      title: 'Instrumentation problem, not networking',
      body: (
        <>
          <p>Your application is not producing telemetry yet. Check, in order:</p>
          <ul>
            <li>
              The instrumentation is loaded <strong>before</strong> your app code runs (for example
              the Java agent via <code>-javaagent</code>, <code>opentelemetry-instrument</code> for
              Python, or requiring the SDK first in Node.js).
            </li>
            <li>Your runtime version is supported by the OpenTelemetry SDK.</li>
            <li>The third-party library you expect to be traced is a supported version.</li>
            <li>
              The request or job you are testing actually ran while instrumentation was active.
            </li>
          </ul>
          <p>
            Details in <a href="#step-1-is-your-application-generating-telemetry">Step 1</a> and the{' '}
            <a href="https://signoz.io/docs/instrumentation/overview/">instrumentation guide</a>.
          </p>
        </>
      ),
    },
    r_key: {
      kind: 'result',
      tone: 'danger',
      title: 'Wrong or expired ingestion key',
      body: (
        <>
          <p>
            A <code>401</code> / <code>403</code> (or gRPC <code>Unauthenticated</code>) means the
            ingestion key is missing, wrong, expired, or revoked.
          </p>
          <ul>
            <li>
              For a direct SDK export, the key goes in the OTLP headers as{' '}
              <code>signoz-ingestion-key=&lt;your-ingestion-key&gt;</code>; for a Collector, under
              the <code>otlphttp</code> exporter <code>headers</code>.
            </li>
            <li>
              Confirm the key under Settings &rarr; Ingestion, and that its limits are not blocking
              data.
            </li>
            <li>
              Self-hosted SigNoz needs no ingestion key by default, so a <code>401</code> there
              usually means a proxy or gateway in front of SigNoz is rejecting the request.
            </li>
          </ul>
          <p>
            See <a href="#quick-debug">Quick debug</a> and{' '}
            <a href="https://signoz.io/docs/ingestion/signoz-cloud/keys/">ingestion keys</a>.
          </p>
        </>
      ),
    },
    r_endpoint: {
      kind: 'result',
      tone: 'danger',
      title: 'Wrong endpoint or path',
      body: (
        <>
          <p>
            A <code>404</code> almost always means the URL is wrong. Check:
          </p>
          <ul>
            <li>
              No trailing slash on the path: use <code>.../{m.signalPath}</code>, not{' '}
              <code>.../{m.signalPath}/</code>.
            </li>
            <li>
              SigNoz Cloud endpoint is <code>https://ingest.&lt;region&gt;.signoz.cloud:443</code>{' '}
              (port <code>443</code>, not <code>4317</code>/<code>4318</code>); self-hosted is{' '}
              <code>http://&lt;signoz-host&gt;:4318</code>.
            </li>
          </ul>
          <p>
            See <a href="#quick-debug">Quick debug</a>.
          </p>
        </>
      ),
    },
    r_region: {
      kind: 'result',
      tone: 'warning',
      title: 'Wrong region, or the wrong view',
      body: (
        <>
          <p>
            <strong>On SigNoz Cloud</strong>, exports that succeed while the account stays empty
            almost always mean the wrong region. The <code>&lt;region&gt;</code> in your endpoint
            must match your account&apos;s region: a key from one region will not authenticate
            against another region&apos;s endpoint, and data sent to the wrong region never reaches
            your account. Confirm it under Settings &rarr; Ingestion, or in the{' '}
            <a href="https://signoz.io/docs/ingestion/signoz-cloud/overview/#endpoint">
              region and endpoint table
            </a>
            .
          </p>
          <p>
            <strong>On self-hosted SigNoz</strong>, there is no region. Confirm you are querying the
            same instance you are exporting to, then widen the time range: recently sent data can
            fall outside a narrow window on either deployment.
          </p>
        </>
      ),
    },
    r_direct: {
      kind: 'result',
      tone: 'info',
      title: 'Test the endpoint directly',
      body: (
        <>
          <p>From the machine running your app, check that the endpoint is reachable:</p>
          <pre className="overflow-x-auto">
            <code>
              # SigNoz Cloud{'\n'}
              curl -v https://ingest.&lt;region&gt;.signoz.cloud:443{'\n\n'}# Self-hosted SigNoz
              {'\n'}
              curl -v http://&lt;signoz-host&gt;:4318
            </code>
          </pre>
          <ul>
            <li>
              If it <strong>fails to connect</strong>, a firewall or network policy is blocking
              outbound access to the endpoint.
            </li>
            <li>
              If it <strong>connects but data still does not appear</strong>, the problem is your
              endpoint, region, or key: see <a href="#quick-debug">Quick debug</a>.
            </li>
          </ul>
        </>
      ),
    },
    r_collector_to_signoz: {
      kind: 'result',
      tone: 'danger',
      title: 'Collector receives data but cannot forward it',
      body: (
        <>
          <p>
            The Collector is receiving your {m.unit}, so the problem is the export to SigNoz. Check
            the <code>otlphttp</code> exporter:
          </p>
          <ul>
            <li>
              The <code>endpoint</code>, region, and <code>signoz-ingestion-key</code> header are
              correct.
            </li>
            <li>
              The exporter is actually wired into the pipeline under <code>service.pipelines</code>:
              defining it is not enough.
            </li>
          </ul>
          <p>
            See <a href="#verify-data-inside-the-collector">Verify data inside the Collector</a>.
          </p>
        </>
      ),
    },
    r_app_to_collector: {
      kind: 'result',
      tone: 'danger',
      title: 'Data is not reaching the Collector',
      body: (
        <>
          <p>Your {m.unit} never arrive at the Collector. Check the app &rarr; Collector hop:</p>
          <ul>
            <li>
              The app&apos;s <code>OTEL_EXPORTER_OTLP_ENDPOINT</code> points at the Collector (for
              example <code>http://&lt;collector-host&gt;:4318</code>).
            </li>
            <li>
              The Collector is listening on the OTLP ports:{' '}
              <code>netstat -tuln | grep -E &apos;4317|4318&apos;</code>.
            </li>
            <li>Port and protocol match: OTLP/HTTP on 4318, OTLP/gRPC on 4317.</li>
            <li>No network policy, security group, or firewall blocks the two.</li>
          </ul>
          <p>
            See{' '}
            <a href="#verify-the-application-can-reach-the-collector">
              Verify the application can reach the Collector
            </a>
            .
          </p>
        </>
      ),
    },
  }
}

export const TONE_TO_ADMONITION: Record<Tone, { type: string; label: string }> = {
  danger: { type: 'danger', label: 'Likely cause' },
  warning: { type: 'warning', label: 'Likely cause' },
  info: { type: 'info', label: 'Next check' },
  success: { type: 'tip', label: 'Resolved' },
}
