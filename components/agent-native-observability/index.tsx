import { BookOpen, ArrowRight, MessageSquareText, Zap, BookText, Unlock } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import IconTitleDescriptionCardGrid from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import { IconTitleDescriptionCardData } from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import { cn } from '../../app/lib/utils'
import AgentNativeObservabilitySection from '@/components/index-agent-native-observability/AgentNativeObservability'

const AGENT_FEATURES: IconTitleDescriptionCardData[] = [
  {
    icon: <MessageSquareText size={14} className="text-muted-foreground" />,
    iconText: 'NATURAL LANGUAGE OBSERVABILITY',
    title: 'Talk to your observability stack in English',
    description:
      '"Create a latency dashboard for my payment service". Build with zero manual intervention.',
  },
  {
    icon: <Zap size={14} className="text-muted-foreground" />,
    iconText: 'END-TO-END DEBUGGING',
    title: 'From alert to root cause to fix. In one session.',
    description:
      'Connect to your Kubernetes, Git, Jira, Cloud Provider CLIs and use them to find the root cause.',
  },
  {
    icon: <BookText size={14} className="text-muted-foreground" />,
    iconText: 'TEAM KNOWLEDGE',
    title: "Teach your team's debugging heuristics. Not someone else's.",
    description:
      'Codify your best practices in your skills.md and share with your team in a GitHub repo.',
  },
  {
    icon: <Unlock size={14} className="text-muted-foreground" />,
    iconText: 'OPEN STANDARDS',
    title: 'Based on Open Standards. No lock-in. Ever.',
    description: 'Built on OpenTelemetry - the standard coding agents are already trained on.',
  },
]

function AgentNativeObservabilityControl({ className }: { className?: string }) {
  return (
    <>
      <section
        className={cn(
          'max-w-8xl border-border mx-auto w-full border !border-t-0 !border-b-0 border-dashed',
          className
        )}
      >
        <div className="bg-blur-ellipse-207 container">
          <div className="grid place-items-center py-8 text-center md:py-28">
            <h2 className="text-sakura-100 text-3xl leading-[3.5rem] font-semibold sm:text-4xl">
              Introducing Agent Native Observability
            </h2>
            <p className="text-l1-foreground max-w-3xl text-center text-xs font-medium sm:text-base">
              Connect SigNoz to your coding agents (e.g. Claude Code, Cursor) and debug production
              issues without leaving your dev environment. Traces, logs, metrics, service topology,
              and your actual codebase - all in one place. Or use Noz, our new AI teammate
              out-of-the-box.
            </p>
            <TrackingLink
              href="/docs/ai/signoz-mcp-server/"
              target="_blank"
              clickType="Secondary CTA"
              clickName="Agent Native Observability Learn More"
              clickText="Learn More - SigNoz MCP Docs"
              clickLocation="Agent Native Observability Section"
              className="border-l2-border bg-muted text-foreground mt-3 mb-3 flex h-10 items-center justify-center gap-1.5 rounded-full border px-4 py-2 text-[10px] leading-5 font-medium shadow-[0_0_20px_0_rgba(242,71,105,0.20)] sm:text-sm"
            >
              <BookOpen className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              Learn More
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </TrackingLink>
          </div>
        </div>
      </section>

      <SectionLayout variant="bordered" className="!mt-0 !border-t-0 !p-0">
        <IconTitleDescriptionCardGrid
          cards={AGENT_FEATURES}
          className="grid-cols-1 md:grid-cols-2"
        />
      </SectionLayout>
    </>
  )
}

export const AgentNativeObservability = ({
  className,
  variant = 'control',
}: {
  className?: string
  variant?: 'control' | 'ai-agents'
}) => {
  if (variant === 'ai-agents') {
    return <AgentNativeObservabilitySection />
  }

  return <AgentNativeObservabilityControl className={className} />
}
