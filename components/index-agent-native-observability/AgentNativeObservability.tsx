import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import TrackingLink from '@/components/TrackingLink'
import { HOMEPAGE_INTEGRATION_ICONS } from '@/constants/homepageIntegrationIcons'
import AgentTerminal from './agent-terminal'
import AnimatedDotGrid from './AnimatedDotGrid'
import NozChatPanel from './NozChatPanel'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from 'app/lib/utils'

const agentIntegrations = [
  { label: 'OpenAI', iconSrc: HOMEPAGE_INTEGRATION_ICONS.openai },
  { label: 'Claude', iconSrc: HOMEPAGE_INTEGRATION_ICONS.claude },
  { label: 'Cursor', iconSrc: HOMEPAGE_INTEGRATION_ICONS.cursor },
  { label: 'OpenCode', iconSrc: HOMEPAGE_INTEGRATION_ICONS.opencode },
]

function AgentIntegrationIcons() {
  return (
    <div className="flex items-center">
      {agentIntegrations.map((agent, index) => (
        <span
          key={agent.label}
          className="relative flex size-6 items-center justify-center rounded-full border border-[var(--l2-border)] bg-[var(--l2-background)] first:ml-0 sm:size-7 [&:not(:first-child)]:-ml-2"
          style={{ zIndex: index + 1 }}
          title={agent.label}
        >
          <Image
            src={agent.iconSrc}
            alt={agent.label}
            width={16}
            height={16}
            className="size-3.5 object-contain sm:size-4"
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
              className={cn(
                buttonVariants({ variant: 'tactileSecondary' }),
                'mt-6 no-underline sm:mt-9'
              )}
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
          <AnimatedDotGrid />
          <span className="text-sm text-[var(--l2-foreground)] sm:text-base">
            Work with your agents
          </span>
          <AgentIntegrationIcons />
          <span className="text-sm text-[var(--l3-foreground)] sm:text-base">and more…</span>
        </div>

        <div aria-hidden="true" data-markdown-ignore className="relative mt-6 lg:pb-16">
          <AgentTerminal className="hidden w-full md:flex md:h-[560px] lg:h-[600px] lg:w-[74%]" />
          <NozChatPanel className="mx-auto mt-6 h-[540px] w-full max-w-[420px] lg:absolute lg:-top-14 lg:right-0 lg:z-10 lg:mx-0 lg:mt-0 lg:h-[700px] lg:w-[388px] xl:w-[430px]" />
        </div>
      </div>
    </section>
  )
}
