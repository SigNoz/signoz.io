'use client'

import React, { useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@signozhq/ui/button'
import { TabsRoot, TabsList, TabsTrigger } from '@signozhq/ui/tabs'

import tabStyles from '@/components/Tabs.module.css'

import Admonition from '@/components/Admonition/Admonition'

/**
 * TroubleshootingWizard
 *
 * An interactive, click-through version of the "why is my telemetry not showing
 * up in SigNoz" decision tree. It mirrors the written Steps 1-3 and the
 * "Quick debug" section on the same page, so it is an additive
 * convenience: the full guidance still lives in the prose (which is what the
 * agent markdown and Copy Markdown capture).
 *
 * Presentation is composed entirely from existing pieces: design-system Tabs
 * for the signal switch, design-system Buttons for the answers, and the docs
 * Admonition for results, so it matches the rest of the docs.
 */

type Signal = 'traces' | 'logs' | 'metrics'

type SignalMeta = {
  label: string
  unit: string
  envExporter: string
  signalPath: string
}

const SIGNALS: Record<Signal, SignalMeta> = {
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

type Tone = 'danger' | 'warning' | 'info' | 'success'

type Option = { label: string; to: string }

type QuestionNode = {
  kind: 'question'
  prompt: React.ReactNode
  hint?: React.ReactNode
  options: Option[]
}

type ResultNode = {
  kind: 'result'
  tone: Tone
  title: string
  body: React.ReactNode
}

type Node = QuestionNode | ResultNode

const START = 'q_generated'

// Small inline helpers so the tree stays readable.
const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-signoz_ink-200 px-1 py-0.5 font-mono text-[0.85em] text-signoz_vanilla-100">
    {children}
  </code>
)

const DocLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} className="text-signoz_robin-500 underline hover:text-signoz_robin-400">
    {children}
  </a>
)

function buildTree(m: SignalMeta): Record<string, Node> {
  return {
    q_generated: {
      kind: 'question',
      prompt: (
        <>
          Set <Code>{m.envExporter}=console</Code>, restart your app, and exercise the code path. Do
          you see {m.unit} printed in your console?
        </>
      ),
      hint: (
        <>
          This checks whether the data exists at all, before worrying about where it goes. Use{' '}
          <Code>{m.envExporter}=otlp,console</Code> to keep exporting to SigNoz while you look.
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
          Turn on the SDK&apos;s own diagnostic logging (<Code>OTEL_LOG_LEVEL=debug</Code> or your
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
          Add the Collector&apos;s <Code>debug</Code> exporter to the pipeline and restart. Do you
          see your {m.unit} in the Collector&apos;s own logs?
        </>
      ),
      hint: (
        <>
          This <Code>debug</Code> exporter is a Collector pipeline component, different from the
          SDK&apos;s <Code>OTEL_LOG_LEVEL=debug</Code> above. It tells you what the Collector
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
              the Java agent via <Code>-javaagent</Code>, <Code>opentelemetry-instrument</Code> for
              Python, or requiring the SDK first in Node.js).
            </li>
            <li>Your runtime version is supported by the OpenTelemetry SDK.</li>
            <li>The third-party library you expect to be traced is a supported version.</li>
            <li>
              The request or job you are testing actually ran while instrumentation was active.
            </li>
          </ul>
          <p>
            Details in{' '}
            <DocLink href="#step-1-is-your-application-generating-telemetry">Step 1</DocLink> and
            the{' '}
            <DocLink href="https://signoz.io/docs/instrumentation/overview/">
              instrumentation guide
            </DocLink>
            .
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
            A <Code>401</Code> / <Code>403</Code> (or gRPC <Code>Unauthenticated</Code>) means the
            ingestion key is missing, wrong, expired, or revoked.
          </p>
          <ul>
            <li>
              For a direct SDK export, the key goes in the OTLP headers as{' '}
              <Code>signoz-ingestion-key=&lt;your-ingestion-key&gt;</Code>; for a Collector, under
              the <Code>otlphttp</Code> exporter <Code>headers</Code>.
            </li>
            <li>
              Confirm the key under Settings &rarr; Ingestion, and that its limits are not blocking
              data.
            </li>
            <li>
              Self-hosted SigNoz needs no ingestion key by default, so a <Code>401</Code> there
              usually means a proxy or gateway in front of SigNoz is rejecting the request.
            </li>
          </ul>
          <p>
            See <DocLink href="#quick-debug">Quick debug</DocLink> and{' '}
            <DocLink href="https://signoz.io/docs/ingestion/signoz-cloud/keys/">
              ingestion keys
            </DocLink>
            .
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
            A <Code>404</Code> almost always means the URL is wrong. Check:
          </p>
          <ul>
            <li>
              No trailing slash on the path: use <Code>.../{m.signalPath}</Code>, not{' '}
              <Code>.../{m.signalPath}/</Code>.
            </li>
            <li>
              SigNoz Cloud endpoint is <Code>https://ingest.&lt;region&gt;.signoz.cloud:443</Code>{' '}
              (port <Code>443</Code>, not <Code>4317</Code>/<Code>4318</Code>); self-hosted is{' '}
              <Code>http://&lt;signoz-host&gt;:4318</Code>.
            </li>
          </ul>
          <p>
            See <DocLink href="#quick-debug">Quick debug</DocLink>.
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
            almost always mean the wrong region. The <Code>&lt;region&gt;</Code> in your endpoint
            must match your account&apos;s region: a key from one region will not authenticate
            against another region&apos;s endpoint, and data sent to the wrong region never reaches
            your account. Confirm it under Settings &rarr; Ingestion, or in the{' '}
            <DocLink href="https://signoz.io/docs/ingestion/signoz-cloud/overview/#endpoint">
              region and endpoint table
            </DocLink>
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
          <pre className="overflow-x-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
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
              endpoint, region, or key: see <DocLink href="#quick-debug">Quick debug</DocLink>.
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
            the <Code>otlphttp</Code> exporter:
          </p>
          <ul>
            <li>
              The <Code>endpoint</Code>, region, and <Code>signoz-ingestion-key</Code> header are
              correct.
            </li>
            <li>
              The exporter is actually wired into the pipeline under <Code>service.pipelines</Code>:
              defining it is not enough.
            </li>
          </ul>
          <p>
            See{' '}
            <DocLink href="#verify-data-inside-the-collector">
              Verify data inside the Collector
            </DocLink>
            .
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
              The app&apos;s <Code>OTEL_EXPORTER_OTLP_ENDPOINT</Code> points at the Collector (for
              example <Code>http://&lt;collector-host&gt;:4318</Code>).
            </li>
            <li>
              The Collector is listening on the OTLP ports:{' '}
              <Code>netstat -tuln | grep -E &apos;4317|4318&apos;</Code>.
            </li>
            <li>Port and protocol match: OTLP/HTTP on 4318, OTLP/gRPC on 4317.</li>
            <li>No network policy, security group, or firewall blocks the two.</li>
          </ul>
          <p>
            See{' '}
            <DocLink href="#verify-the-application-can-reach-the-collector">
              Verify the application can reach the Collector
            </DocLink>
            .
          </p>
        </>
      ),
    },
  }
}

// Result panels reuse the docs Admonition (which wraps the design-system
// Callout), so a wizard answer looks exactly like every other callout on the
// page rather than a bespoke widget.
const TONE_TO_ADMONITION: Record<Tone, { type: string; label: string }> = {
  danger: { type: 'danger', label: 'Likely cause' },
  warning: { type: 'warning', label: 'Likely cause' },
  info: { type: 'info', label: 'Next check' },
  success: { type: 'tip', label: 'Resolved' },
}

export default function TroubleshootingWizard() {
  const [signal, setSignal] = useState<Signal>('traces')
  const [history, setHistory] = useState<string[]>([START])

  const meta = SIGNALS[signal]
  const tree = useMemo(() => buildTree(meta), [meta])
  const currentId = history[history.length - 1]
  const node = tree[currentId]

  const reset = (next?: Signal) => {
    if (next) setSignal(next)
    setHistory([START])
  }

  const answer = (to: string) => setHistory((h) => [...h, to])
  const back = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h))

  return (
    <div className="not-prose my-6 rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 p-5">
      <div className="mb-4">
        <p className="m-0 text-sm font-semibold text-signoz_vanilla-100">
          Interactive troubleshooter
        </p>
        <p className="m-0 mt-0.5 text-xs text-signoz_vanilla-400">
          Answer a few questions to find where your data is getting lost.
        </p>
      </div>

      <TabsRoot
        value={signal}
        onValueChange={(value) => reset(value as Signal)}
        activationMode="manual"
        className={`${tabStyles.root} w-full [&>div:first-child]:overflow-x-auto`}
        style={
          {
            '--tab-list-wrapper-secondary-padding-left': '0px',
            '--tab-border-spacer-min-width': 'var(--spacing-5)',
          } as React.CSSProperties
        }
      >
        <TabsList variant="secondary">
          {(Object.keys(SIGNALS) as Signal[]).map((s) => (
            <TabsTrigger key={s} value={s} variant="secondary">
              {SIGNALS[s].label}
            </TabsTrigger>
          ))}
        </TabsList>
      </TabsRoot>

      <div className="mt-5">
        {node.kind === 'question' ? (
          <div>
            <p className="m-0 max-w-3xl text-[15px] font-medium leading-6 text-signoz_vanilla-100">
              {node.prompt}
            </p>
            {node.hint ? (
              <p className="m-0 mt-2 max-w-3xl text-[13px] leading-5 text-signoz_vanilla-400">
                {node.hint}
              </p>
            ) : null}
            <div className="mt-4 flex flex-col gap-2">
              {node.options.map((opt) => (
                <Button
                  key={opt.to + opt.label}
                  variant="outlined"
                  color="secondary"
                  onClick={() => answer(opt.to)}
                  suffix={<ArrowRight />}
                  className="!h-auto w-full !justify-between !py-3 text-left !text-sm !text-signoz_vanilla-100"
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <Admonition
            type={TONE_TO_ADMONITION[node.tone].type}
            title={`${TONE_TO_ADMONITION[node.tone].label}: ${node.title}`}
          >
            {node.body}
          </Admonition>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 border-t border-signoz_slate-400 pt-3">
        <Button
          variant="ghost"
          color="secondary"
          size="sm"
          onClick={back}
          disabled={history.length <= 1}
        >
          Back
        </Button>
        <Button variant="ghost" color="secondary" size="sm" onClick={() => reset()}>
          Start over
        </Button>
        <span className="ml-auto text-xs text-signoz_vanilla-400">Step {history.length}</span>
      </div>
    </div>
  )
}
