import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'

import TrackingLink from '@/components/TrackingLink'
import { HOMEPAGE_INTEGRATION_ICONS } from '@/constants/homepageIntegrationIcons'
import AgentTerminal from './AgentTerminal'
import NozChatPanel from './NozChatPanel'

const agentIntegrations = [
  { label: 'OpenAI', iconSrc: HOMEPAGE_INTEGRATION_ICONS.openai },
  { label: 'Claude', iconSrc: HOMEPAGE_INTEGRATION_ICONS.claude },
  { label: 'Cursor', iconSrc: HOMEPAGE_INTEGRATION_ICONS.cursor },
  { label: 'OpenCode', iconSrc: HOMEPAGE_INTEGRATION_ICONS.opencode },
]

const DOT_GRID = { cols: 16, rows: 2, spacing: 7, highlighted: 5 }

function FrozenDotGrid() {
  const { cols, rows, spacing, highlighted } = DOT_GRID
  const width = (cols - 1) * spacing + 6
  const height = (rows - 1) * spacing + 8
  const dots: ReactNode[] = []

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dots.push(
        <circle
          key={`${row}-${col}`}
          cx={3 + col * spacing}
          cy={4 + row * spacing}
          r={1.6}
          fill={col < highlighted ? 'var(--bg-robin-500)' : 'var(--l3-background-hover)'}
        />
      )
    }
  }

  return (
    <svg
      aria-hidden="true"
      data-markdown-ignore
      className="shrink-0"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
    >
      {dots}
    </svg>
  )
}

function AgentIntegrationIcons() {
  return (
    <div className="flex items-center gap-1.5">
      {agentIntegrations.map((agent) => (
        <span
          key={agent.label}
          aria-label={agent.label}
          className="group relative flex size-5 items-center justify-center transition-transform duration-200 hover:z-10 hover:-translate-y-1 hover:scale-125 sm:size-6"
          role="img"
          title={agent.label}
        >
          <span
            className="size-full rounded-sm bg-contain bg-center bg-no-repeat drop-shadow-[0_8px_18px_rgba(0,0,0,0.45)]"
            style={{ backgroundImage: `url("${agent.iconSrc}")` }}
          />
        </span>
      ))}
    </div>
  )
}

export default function AgentNativeObservabilitySection() {
  return (
    <section
      className="relative left-1/2 mx-auto w-dvw max-w-none -translate-x-1/2 overflow-hidden bg-[var(--l1-background)] px-5 py-16 sm:px-6 md:py-24 lg:px-20 lg:py-32 wide:px-0"
      data-homepage-agent-native-observability
    >
      <div className="relative mx-auto max-w-8xl">
        <div
          className="pointer-events-none absolute left-4 right-4 top-24 h-[760px] sm:left-6 sm:right-6 lg:left-20 lg:right-20 lg:top-32"
          data-homepage-floating-cta="Explore agent-native observability"
          data-homepage-floating-href="/agent-native-observability/"
          aria-hidden="true"
        />

        <div className="grid gap-5 md:grid-cols-[0.9fr_1fr] md:items-start md:gap-20">
          <h2 className="m-0 max-w-[580px] text-[30px] font-medium leading-[1.12] tracking-[-0.65px] text-[var(--l1-foreground)] sm:text-[38px] sm:leading-[1.1] sm:tracking-[-1.1px] md:text-[46px] md:tracking-[-1.4px]">
            Agent-native observability,
            <br />
            <span className="text-[var(--l3-foreground)]">inside your IDE and SigNoz Cloud.</span>
          </h2>

          <div className="max-w-[560px] md:pt-2">
            <p className="m-0 text-base leading-7 tracking-[-0.15px] text-[var(--l2-foreground)] sm:text-[19px] sm:leading-9 sm:tracking-[-0.28px]">
              Use the SigNoz MCP server to bring telemetry into coding agents, or use Noz, your AI
              teammate inside SigNoz Cloud, to investigate incidents, tune alerts, and build
              dashboards with the same production context your team sees.
            </p>
            <TrackingLink
              className="btn-tactile btn-tactile--secondary mt-6 inline-flex no-underline sm:mt-9"
              clickLocation="Homepage Agent Native Observability Section"
              clickName="Explore MCP and Noz Link"
              clickText="Explore MCP and Noz"
              clickType="Secondary CTA"
              href="/agent-native-observability/"
            >
              Explore MCP and Noz
              <ArrowRight size={14} />
            </TrackingLink>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 sm:mt-20 lg:pr-[440px]">
          <FrozenDotGrid />
          <span className="text-sm text-[var(--l2-foreground)] sm:text-base">
            Work with your agents
          </span>
          <AgentIntegrationIcons />
          <span className="text-sm text-[var(--l3-foreground)] sm:text-base">and more…</span>
        </div>

        <div aria-hidden="true" data-markdown-ignore className="relative mt-6 lg:pb-12">
          <AgentTerminal className="h-[440px] w-full md:h-[560px] lg:h-[600px] lg:w-[74%]" />
          <NozChatPanel className="mx-auto mt-6 h-[540px] w-full max-w-[420px] lg:absolute lg:-top-14 lg:right-0 lg:z-10 lg:mx-0 lg:mt-0 lg:h-[660px] lg:w-[388px] xl:w-[430px]" />
        </div>
      </div>
    </section>
  )
}
