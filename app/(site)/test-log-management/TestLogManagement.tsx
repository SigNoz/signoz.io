'use client'

import React from 'react'
import { ArrowRight, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import SigNozStats from '@/shared/components/molecules/FeaturePages/SignozStats'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import CustomerStoriesSection from '@/shared/components/molecules/FeaturePages/CustomerStoriesSection'
import ComparisonTable from '@/shared/components/molecules/FeaturePages/ComparisonTable'
import CarouselCards from '@/shared/components/molecules/FeaturePages/CarouselCards'
import FAQAccordion from '@/components/FAQAccordion/FAQAccordion'
import {
  WHY_SIGNOZ_CARDS,
  PIPELINE_STEPS,
  PIPELINE_EXAMPLES,
  QUERY_BUILDER_FEATURES,
  CORRELATION_STEPS,
  CORRELATION_CAROUSEL_DATA,
  COMPARISON_VENDORS,
  COMPARISON_ROWS,
  FAQ_ITEMS,
} from './TestLogManagement.constants'

// ─── Hero ────────────────────────────────────────────────────────────

const Header: React.FC = () => {
  const headerButtons = [
    {
      text: 'Get started free',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'Log Management Hero Start Trial',
        clickLocation: 'Log Management Hero',
        clickText: 'Get started free',
      },
    },
    {
      text: 'Read the docs',
      href: '/docs/introduction/',
      variant: 'secondary' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Log Management Hero Docs',
        clickLocation: 'Log Management Hero',
        clickText: 'Read the docs',
      },
    },
  ]

  return (
    <FeaturePageHeader
      title={
        <>
          Log Management Software for <br /> High-Performance Log Analytics
        </>
      }
      description="Collect logs from every service into one fast store, search them in seconds, and connect any line to the metric or trace behind it."
      buttons={headerButtons}
      buttonDescription={<ChipRow />}
      heroImage={<TerminalMock />}
      heroImageAlt="Log management terminal"
    />
  )
}

// ─── Terminal mock (hero visual) ─────────────────────────────────────

const TerminalMock: React.FC = () => {
  const lines = [
    {
      ts: '10:42:01.338',
      level: 'INFO',
      levelColor: 'text-signoz_forest-500',
      service: 'checkout',
      msg: 'order placed',
      traceId: 'trace_id=9f3a..e1',
    },
    {
      ts: '10:42:01.901',
      level: 'WARN',
      levelColor: 'text-signoz_amber-500',
      service: 'payments',
      msg: 'retrying gateway, attempt=2',
      traceId: 'trace_id=9f3a..e1',
    },
    {
      ts: '10:42:02.114',
      level: 'ERROR',
      levelColor: 'text-signoz_cherry-500',
      service: 'payments',
      msg: 'gateway timeout after 5000ms',
      traceId: 'trace_id=9f3a..e1',
    },
    {
      ts: '10:42:02.118',
      level: 'ERROR',
      levelColor: 'text-signoz_cherry-500',
      service: 'checkout',
      msg: 'order rolled back, status=502',
      traceId: 'trace_id=9f3a..e1',
    },
  ]

  return (
    <div className="relative z-[1] w-full overflow-hidden rounded-xl border border-signoz_slate-400 bg-signoz_ink-500">
      <div className="flex items-center gap-2 border-b border-signoz_slate-400 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-red-500" />
        <span className="h-3 w-3 rounded-full bg-yellow-500" />
        <span className="h-3 w-3 rounded-full bg-green-500" />
        <span className="ml-2 font-mono text-xs text-signoz_vanilla-400">
          signoz / logs explorer
        </span>
      </div>
      <div className="overflow-x-auto px-5 py-4">
        {lines.map((l, i) => (
          <div key={i} className="flex gap-3 whitespace-nowrap font-mono text-[13px] leading-7">
            <span className="text-signoz_vanilla-400/50">{l.ts}</span>
            <span className={`font-semibold ${l.levelColor}`}>{l.level.padEnd(5)}</span>
            <span className="text-signoz_robin-400">{l.service}</span>
            <span className="text-signoz_vanilla-300">{l.msg}</span>
            <span className="text-signoz_forest-400">{l.traceId}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Chip row ────────────────────────────────────────────────────────

const ChipRow: React.FC = () => {
  const chips = [
    { label: 'OpenTelemetry-native', color: 'bg-signoz_forest-500' },
    { label: 'Powered by ClickHouse', color: 'bg-signoz_cherry-500' },
    { label: 'Apache 2.0 open source', color: 'bg-signoz_robin-500' },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-3 pt-4">
      {chips.map((c) => (
        <span
          key={c.label}
          className="flex items-center gap-2 rounded-full border border-signoz_slate-400 bg-signoz_ink-400 px-4 py-2 font-mono text-xs text-signoz_vanilla-400"
        >
          <span className={`h-2 w-2 rounded-full ${c.color}`} />
          {c.label}
        </span>
      ))}
    </div>
  )
}

// ─── Why SigNoz section header ───────────────────────────────────────

const WhySigNozHeader: React.FC = () => {
  return (
    <div className="bg-signoz_ink-500 px-6 pb-2 pt-10">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-signoz_cherry-500">
        Why SigNoz
      </p>
      <h2 className="mb-6 text-signoz_vanilla-100">
        Log management software built for modern engineering teams
      </h2>
      <p className="max-w-3xl leading-relaxed text-signoz_vanilla-400">
        Most teams piece logging together from several tools and still lose context the moment an
        incident starts. SigNoz takes a different route. Collection, storage, search, and
        correlation sit in one platform built on open standards, so your logs stay useful from the
        first byte ingested to the line that explains the outage.
      </p>
    </div>
  )
}

// ─── Ingestion flow diagram ──────────────────────────────────────────

const IngestionSection: React.FC = () => {
  const sources = [
    { icon: '\u2601', label: 'Cloud platforms' },
    { icon: '\u2630', label: 'Containers' },
    { icon: '\u23F8', label: 'Databases' },
    { icon: '</>', label: 'Applications' },
  ]

  const agentTags = [
    'Kubernetes',
    'Docker',
    'AWS',
    'GCP',
    'Azure',
    'Fluent Bit',
    'Fluentd',
    'Logstash',
    '+ 50 more sources',
  ]

  return (
    <div className="border-t border-dashed border-signoz_slate-400 bg-signoz_ink-500 px-6 py-10">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-signoz_cherry-500">
        Ingestion
      </p>
      <h2 className="mb-6 text-signoz_vanilla-100">Ingest logs from any source</h2>
      <p className="mb-8 max-w-3xl leading-relaxed text-signoz_vanilla-400">
        SigNoz accepts logs from your entire stack through the OpenTelemetry Collector or the log
        agents you already run. Point your sources at the collector, and SigNoz handles receiving,
        batching, and storage.
      </p>

      <div className="mb-8 grid items-center gap-4 md:grid-cols-[1.1fr_auto_1fr_auto_0.8fr]">
        <div className="rounded-xl border border-signoz_slate-400 bg-signoz_ink-400 p-5">
          <h4 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-signoz_vanilla-400">
            Sources
          </h4>
          {sources.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 py-1.5 text-sm text-signoz_vanilla-300"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-signoz_forest-500/15 font-mono text-xs font-semibold text-signoz_forest-500">
                {s.icon}
              </span>
              {s.label}
            </div>
          ))}
        </div>

        <span className="hidden text-2xl text-signoz_cherry-500 md:block">&rarr;</span>

        <div className="rounded-xl border border-signoz_cherry-500 bg-signoz_ink-400 p-5 text-center shadow-[0_0_0_4px_rgba(229,72,77,0.12)]">
          <p className="text-base font-semibold text-signoz_vanilla-100">OpenTelemetry Collector</p>
          <p className="mt-1 text-sm text-signoz_vanilla-400">
            or your existing Fluent Bit, Fluentd, and Logstash agents
          </p>
        </div>

        <span className="hidden text-2xl text-signoz_cherry-500 md:block">&rarr;</span>

        <div className="rounded-xl border border-signoz_forest-500 bg-signoz_ink-400 p-5 text-center shadow-[0_0_0_4px_rgba(37,225,146,0.12)]">
          <p className="text-base font-semibold text-signoz_forest-500">SigNoz</p>
          <p className="mt-1 text-sm text-signoz_vanilla-400">ClickHouse storage</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {agentTags.map((t) => (
          <span
            key={t}
            className="rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 px-3 py-2 font-mono text-xs text-signoz_vanilla-300"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── Pipeline steps ──────────────────────────────────────────────────

const PipelineSection: React.FC = () => {
  return (
    <div className="border-t border-dashed border-signoz_slate-400 bg-signoz_ink-500 px-6 py-10">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-signoz_cherry-500">
        Pipelines
      </p>
      <h2 className="mb-6 text-signoz_vanilla-100">
        Parse, transform, and secure logs before storage
      </h2>
      <p className="mb-8 max-w-3xl leading-relaxed text-signoz_vanilla-400">
        Logs rarely arrive clean. SigNoz lets you build processing pipelines in a visual UI that run
        before data reaches storage, so what you query is already structured, consistent, and safe
        to keep.
      </p>

      <div className="mb-8 grid gap-0 md:grid-cols-4">
        {PIPELINE_STEPS.map((s, i) => (
          <div
            key={s.num}
            className={`relative border border-signoz_slate-400 bg-signoz_ink-400 p-5 ${
              i === 0
                ? 'rounded-t-xl md:rounded-l-xl md:rounded-tr-none'
                : i === PIPELINE_STEPS.length - 1
                  ? 'rounded-b-xl md:rounded-r-xl md:rounded-bl-none'
                  : ''
            }`}
          >
            <span className="font-mono text-[11px] tracking-widest text-signoz_cherry-500">
              STEP {s.num}
            </span>
            <h4 className="mb-2 mt-2 text-base font-semibold text-signoz_vanilla-100">{s.title}</h4>
            <p className="text-sm leading-relaxed text-signoz_vanilla-400">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {PIPELINE_EXAMPLES.map((ex) => (
          <div
            key={ex.label}
            className="overflow-hidden rounded-xl border border-signoz_slate-400 bg-signoz_ink-500"
          >
            <div className="border-b border-signoz_slate-400 bg-signoz_ink-400/50 px-4 py-3 font-mono text-[11px] uppercase tracking-widest text-signoz_vanilla-400">
              {ex.label}
            </div>
            <div className="px-4 py-4 font-mono text-[13px] leading-7">
              <span className="text-signoz_vanilla-400">{ex.raw}</span>
              <span className="my-2 block text-center text-signoz_cherry-500">&darr;</span>
              {ex.output.map((line, j) => (
                <span
                  key={j}
                  className={`block ${ex.isMasked ? 'text-signoz_cherry-400' : 'text-signoz_forest-400'}`}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Pill component for query builder ────────────────────────────────

const Pill: React.FC<{
  variant: 'attr' | 'op' | 'val' | 'logic'
  children: React.ReactNode
}> = ({ variant, children }) => {
  const styles = {
    attr: 'text-signoz_robin-400 bg-signoz_robin-500/14 border-transparent',
    op: 'text-signoz_cherry-400 bg-signoz_cherry-500/14 border-transparent',
    val: 'text-signoz_forest-400 bg-signoz_forest-500/14 border-transparent',
    logic: 'text-signoz_vanilla-400 bg-transparent border-signoz_slate-400',
  }

  return (
    <span className={`rounded-lg border px-3 py-1 font-mono text-[12px] ${styles[variant]}`}>
      {children}
    </span>
  )
}

// ─── Query builder visual ────────────────────────────────────────────

const QueryBuilderSection: React.FC = () => {
  const bars = [
    { name: 'payments', width: 92, count: '1,204' },
    { name: 'checkout', width: 61, count: '803' },
    { name: 'cart', width: 24, count: '312' },
    { name: 'catalog', width: 9, count: '118' },
  ]

  return (
    <div className="border-t border-dashed border-signoz_slate-400 bg-signoz_ink-500 px-6 py-10">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-signoz_cherry-500">
        Search &amp; Analytics
      </p>
      <h2 className="mb-6 text-signoz_vanilla-100">Search and analyze logs at scale</h2>
      <p className="mb-8 max-w-3xl leading-relaxed text-signoz_vanilla-400">
        Build queries visually, run them against ClickHouse, and turn the results into dashboards.
        The query builder reads from your real log attributes, so you spend time investigating
        rather than memorizing syntax.
      </p>

      <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Query builder mock */}
        <div className="overflow-hidden rounded-xl border border-signoz_slate-400 bg-signoz_ink-500 shadow-[0_40px_90px_rgba(0,0,0,0.5)]">
          <div className="flex border-b border-signoz_slate-400">
            <span className="border-b-2 border-signoz_cherry-500 bg-signoz_ink-400/30 px-4 py-3 text-sm text-signoz_vanilla-100">
              Query Builder
            </span>
            <span className="px-4 py-3 text-sm text-signoz_vanilla-400">ClickHouse SQL</span>
            <span className="px-4 py-3 text-sm text-signoz_vanilla-400">Saved Views</span>
          </div>

          <div className="p-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="w-14 font-mono text-[11px] text-signoz_vanilla-400">WHERE</span>
              <Pill variant="attr">severity</Pill>
              <Pill variant="op">=</Pill>
              <Pill variant="val">ERROR</Pill>
              <Pill variant="logic">AND</Pill>
              <Pill variant="attr">status</Pill>
              <Pill variant="op">IN</Pill>
              <Pill variant="val">(500, 502, 503)</Pill>
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="w-14 font-mono text-[11px] text-signoz_vanilla-400">AGG</span>
              <Pill variant="op">COUNT</Pill>
              <Pill variant="logic">GROUP BY</Pill>
              <Pill variant="attr">service.name</Pill>
            </div>

            <div className="border-t border-signoz_slate-400 pt-4">
              {bars.map((b) => (
                <div key={b.name} className="my-2 flex items-center gap-3 font-mono text-[13px]">
                  <span className="w-24 text-signoz_vanilla-300">{b.name}</span>
                  <div className="h-2.5 flex-1 overflow-hidden rounded bg-signoz_ink-300">
                    <div
                      className="h-full rounded bg-gradient-to-r from-signoz_cherry-500 to-signoz_cherry-400"
                      style={{ width: `${b.width}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-signoz_vanilla-400">{b.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature list */}
        <div>
          <ul className="mb-6 list-none p-0">
            {QUERY_BUILDER_FEATURES.map((f, i) => (
              <li
                key={i}
                className="flex gap-4 border-b border-signoz_slate-400 py-4 last:border-b-0"
              >
                <span className="bg-signoz_cherry-500/12 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg font-mono text-sm font-semibold text-signoz_cherry-500">
                  {i + 1}
                </span>
                <div>
                  <h4 className="m-0 text-base font-semibold text-signoz_vanilla-100">{f.title}</h4>
                  <p className="mb-0 mt-1 text-sm leading-relaxed text-signoz_vanilla-400">
                    {f.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div
            className="rounded-lg border border-signoz_slate-400 border-l-signoz_cherry-500 bg-signoz_ink-400 p-4"
            style={{ borderLeftWidth: '3px' }}
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-signoz_cherry-500">
              Example query
            </p>
            <p className="m-0 font-mono text-[13px] leading-relaxed text-signoz_vanilla-300">
              Count <span className="text-signoz_cherry-400">5xx</span> responses in the last hour,
              grouped by <span className="text-signoz_robin-400">service.name</span>, to find which
              service is failing fastest.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Correlation section ─────────────────────────────────────────────

const CorrelationSection: React.FC = () => {
  const colorMap = {
    amber: {
      label: 'text-signoz_amber-500',
      dot: 'bg-signoz_amber-500',
    },
    cherry: {
      label: 'text-signoz_cherry-500',
      dot: 'bg-signoz_cherry-500',
    },
    robin: {
      label: 'text-signoz_robin-400',
      dot: 'bg-signoz_robin-400',
    },
    forest: {
      label: 'text-signoz_forest-500',
      dot: 'bg-signoz_forest-500',
    },
  }

  return (
    <div className="border-t border-dashed border-signoz_slate-400 bg-signoz_ink-500 px-6 py-10">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-signoz_cherry-500">
        Correlation
      </p>
      <h2 className="mb-6 text-signoz_vanilla-100">Correlate logs with metrics and traces</h2>
      <p className="mb-8 max-w-3xl leading-relaxed text-signoz_vanilla-400">
        During an incident, the fastest path to a fix is following one signal into the next. SigNoz
        links logs, metrics, and traces through shared trace IDs, so a single investigation flows
        from the first alert to the root cause.
      </p>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CORRELATION_STEPS.map((step) => {
          const colors = colorMap[step.color]
          return (
            <div
              key={step.number}
              className="relative rounded-xl border border-signoz_slate-400 bg-signoz_ink-400 p-5"
            >
              <span className="absolute right-4 top-4 text-2xl font-extrabold text-signoz_vanilla-100/[0.07]">
                {step.number}
              </span>
              <div
                className={`mb-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest ${colors.label}`}
              >
                <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
                {step.label}
              </div>
              <h4 className="mb-2 text-base font-semibold text-signoz_vanilla-100">{step.title}</h4>
              <p className="m-0 text-sm leading-relaxed text-signoz_vanilla-400">
                {step.description}
              </p>
            </div>
          )
        })}
      </div>

      <p className="mx-auto max-w-2xl text-center text-base leading-relaxed text-signoz_vanilla-400 md:text-lg">
        This is what makes SigNoz{' '}
        <span className="font-semibold text-signoz_cherry-500">
          more than a standalone log viewer.
        </span>{' '}
        The next signal you need is one click away, not in another tool.
      </p>
    </div>
  )
}

// ─── Correlation screenshots carousel ────────────────────────────────

const CorrelationCarousel: React.FC = () => {
  return <CarouselCards cards={CORRELATION_CAROUSEL_DATA} />
}

// ─── Retention & Cost section ────────────────────────────────────────

const RetentionCostSection: React.FC = () => {
  return (
    <div className="border-t border-dashed border-signoz_slate-400 bg-signoz_ink-500 px-6 py-10">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-signoz_cherry-500">
        Retention, Deployment &amp; Cost
      </p>
      <h2 className="mb-6 text-signoz_vanilla-100">Control log retention, deployment, and cost</h2>
      <p className="mb-8 max-w-3xl leading-relaxed text-signoz_vanilla-400">
        You decide how long logs stay fast, where they live, and what you pay. SigNoz keeps recent
        data hot for quick queries, moves older data to cheaper storage, and prices by usage so the
        bill stays predictable.
      </p>

      <div className="grid items-start gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <div className="mb-6 w-fit rounded-xl bg-signoz_ink-400">
            <table className="m-0 text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
              <thead>
                <tr>
                  {['Tier', 'Best for', 'Speed', 'Cost'].map((h) => (
                    <th
                      key={h}
                      className="border-b border-signoz_slate-400 bg-signoz_ink-300/30 px-5 py-3 text-left font-mono text-[11px] uppercase tracking-widest text-signoz_vanilla-400"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-signoz_vanilla-400">
                <tr>
                  <td className="border-b border-signoz_slate-400 px-5 py-3 font-mono text-xs font-semibold text-signoz_cherry-500">
                    Hot storage
                  </td>
                  <td className="border-b border-signoz_slate-400 px-5 py-3">
                    Recent, frequently queried logs
                  </td>
                  <td className="border-b border-signoz_slate-400 px-5 py-3">Fastest</td>
                  <td className="border-b border-signoz_slate-400 px-5 py-3">Higher per GB</td>
                </tr>
                <tr>
                  <td className="border-signoz_slate-400 px-5 py-3 font-mono text-xs font-semibold text-signoz_aqua-500">
                    Cold storage
                  </td>
                  <td className="border-signoz_slate-400 px-5 py-3">
                    Older logs kept for compliance
                  </td>
                  <td className="border-signoz_slate-400 px-5 py-3">Still queryable</td>
                  <td className="border-signoz_slate-400 px-5 py-3">Lower per GB</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-signoz_slate-400 bg-signoz_ink-400 p-5">
              <span className="mb-2 block font-mono text-[11px] text-signoz_forest-500">
                DEPLOYMENT
              </span>
              <h4 className="mb-1 text-base font-semibold text-signoz_vanilla-100">SigNoz Cloud</h4>
              <p className="m-0 text-sm leading-relaxed text-signoz_vanilla-400">
                Fully managed and SOC 2 compliant. Your data can stay in the US, EU, or India
                region.
              </p>
            </div>
            <div className="rounded-xl border border-signoz_slate-400 bg-signoz_ink-400 p-5">
              <span className="mb-2 block font-mono text-[11px] text-signoz_forest-500">
                DEPLOYMENT
              </span>
              <h4 className="mb-1 text-base font-semibold text-signoz_vanilla-100">Self-hosted</h4>
              <p className="m-0 text-sm leading-relaxed text-signoz_vanilla-400">
                Apache 2.0 open source, built on open standards, for tighter security and data
                residency control.
              </p>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {['Data residency: US', 'EU', 'India'].map((tag) => (
              <span
                key={tag}
                className="rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 px-3 py-2 font-mono text-xs text-signoz_vanilla-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-signoz_cherry-500 bg-signoz_ink-400 p-7 shadow-[0_0_0_4px_rgba(229,72,77,0.12)]">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-signoz_cherry-500">
            Usage-based pricing
          </p>
          <p className="mb-1 text-4xl font-extrabold tracking-tight text-signoz_vanilla-100">
            $0.30
            <span className="ml-1 text-lg font-medium text-signoz_vanilla-400">/ GB of logs</span>
          </p>
          <ul className="mb-6 mt-5 list-none space-y-3 p-0">
            {[
              'No per-user seat fees, so cost does not grow with your team',
              'Choose a retention period that fits your use case',
              'One usage-based bill instead of surprise overage charges',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-signoz_vanilla-400">
                <Check size={16} className="mt-0.5 flex-shrink-0 text-signoz_forest-500" />
                {item}
              </li>
            ))}
          </ul>
          <Button
            variant="default"
            rounded="full"
            className="flex w-full items-center justify-center gap-2"
            asChild
          >
            <TrackingLink
              href="/pricing/"
              clickType="Primary CTA"
              clickName="Log Management Calculate Bill"
              clickLocation="Log Management Retention Section"
              clickText="Calculate your bill"
            >
              Calculate your bill
              <ArrowRight size={14} />
            </TrackingLink>
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── Comparison section ──────────────────────────────────────────────

const ComparisonSection: React.FC = () => {
  return (
    <div className="border-t border-dashed border-signoz_slate-400 bg-signoz_ink-500 px-6 py-10">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-signoz_cherry-500">
        Comparison
      </p>
      <h2 className="mb-6 text-signoz_vanilla-100">
        Compare SigNoz with legacy log management software
      </h2>
      <p className="mb-8 max-w-3xl leading-relaxed text-signoz_vanilla-400">
        A quick look at how SigNoz lines up against established tools across the dimensions that
        shape day-to-day log work.
      </p>

      <ComparisonTable vendors={COMPARISON_VENDORS} rows={COMPARISON_ROWS} className="rounded-xl" />

      <p className="mt-4 max-w-3xl text-xs text-signoz_vanilla-400/60">
        Comparison reflects general product positioning and the dimensions listed above. Vendor
        features and pricing models change over time, so confirm current details with each provider
        before you decide.
      </p>
    </div>
  )
}

// ─── FAQ section ─────────────────────────────────────────────────────

const FAQSection: React.FC = () => {
  return (
    <div className="border-t border-dashed border-signoz_slate-400 bg-signoz_ink-500 px-6 py-10">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-signoz_cherry-500">FAQ</p>
      <h2 className="mb-8 text-signoz_vanilla-100">Frequently asked questions</h2>
      <div className="mx-auto max-w-3xl">
        <FAQAccordion faqs={FAQ_ITEMS} />
      </div>
    </div>
  )
}

// ─── Final CTA banner ────────────────────────────────────────────────

const FinalCTA: React.FC = () => {
  const ctaButtons = [
    {
      text: 'Get started free',
      href: '/teams/',
      variant: 'default' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Primary CTA',
        clickName: 'Log Management CTA Start Trial',
        clickLocation: 'Log Management CTA Banner',
        clickText: 'Get started free',
      },
    },
    {
      text: 'Read the docs',
      href: '/docs/introduction/',
      variant: 'secondary' as const,
      className: 'flex-center',
      tracking: {
        clickType: 'Secondary CTA',
        clickName: 'Log Management CTA Docs',
        clickLocation: 'Log Management CTA Banner',
        clickText: 'Read the docs',
      },
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center border-t border-dashed border-signoz_slate-400 bg-signoz_ink-500 px-6 py-20">
      <h2 className="mb-4 text-center text-3xl font-bold text-signoz_vanilla-100 md:text-4xl">
        Start managing your logs <br /> the open way
      </h2>
      <p className="mb-6 max-w-xl text-center text-signoz_vanilla-400">
        Send your first logs to SigNoz in minutes, then search, analyze, and correlate them across
        your whole stack.
      </p>
      <ButtonGroup buttons={ctaButtons} />
    </div>
  )
}

// ─── Main component ──────────────────────────────────────────────────

const TestLogManagement: React.FC = () => {
  return (
    <FeaturePageLayout>
      <Header />

      <SectionLayout variant="bordered" className="!px-0">
        <WhySigNozHeader />
        <HeroCards cards={WHY_SIGNOZ_CARDS} cols={4} layoutVariant="no-border" className="!mt-0" />
        <IngestionSection />
        <PipelineSection />
        <QueryBuilderSection />
        <CorrelationSection />
        <CorrelationCarousel />
        <RetentionCostSection />
        <ComparisonSection />
        <FAQSection />
        <FinalCTA />
      </SectionLayout>

      <UsageBasedPricing show={['logs']} />
      <SigNozStats />
      <CustomerStoriesSection
        tracking={{
          clickName: 'Log Management Customer Stories Button',
          clickLocation: 'Log Management Testimonials',
        }}
      />
    </FeaturePageLayout>
  )
}

export default TestLogManagement
