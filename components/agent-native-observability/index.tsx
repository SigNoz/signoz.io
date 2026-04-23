import { BookOpen, ArrowRight, MessageSquareText, Zap, BookText, Unlock } from 'lucide-react'
import TrackingLink from '@/components/TrackingLink'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import IconTitleDescriptionCardGrid from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import { IconTitleDescriptionCardData } from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import { cn } from '../../app/lib/utils'

const AGENT_FEATURES: IconTitleDescriptionCardData[] = [
  {
    icon: <MessageSquareText size={14} className="text-signoz_vanilla-400" />,
    iconText: 'NATURAL LANGUAGE OBSERVABILITY',
    title: 'Talk to your observability stack in English',
    description:
      '"Create a latency dashboard for my payment service". Build with zero manual intervention.',
  },
  {
    icon: <Zap size={14} className="text-signoz_vanilla-400" />,
    iconText: 'END-TO-END DEBUGGING',
    title: 'From alert to root cause to fix. In one session.',
    description:
      'Connect to your Kubernetes, Git, Jira, Cloud Provider CLIs and use them to find the root cause.',
  },
  {
    icon: <BookText size={14} className="text-signoz_vanilla-400" />,
    iconText: 'TEAM KNOWLEDGE',
    title: "Teach your team's debugging heuristics. Not someone else's.",
    description:
      'Codify your best practices in your skills.md and share with your team in a GitHub repo.',
  },
  {
    icon: <Unlock size={14} className="text-signoz_vanilla-400" />,
    iconText: 'OPEN STANDARDS',
    title: 'Based on Open Standards. No lock-in. Ever.',
    description: 'Built on OpenTelemetry - the standard coding agents are already trained on.',
  },
]

export const AgentNativeObservability = ({ className }: { className?: string }) => {
  return (
    <>
      <section
        className={cn(
          'mx-auto w-full border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:w-[80vw]',
          className
        )}
      >
        <div className="bg-blur-ellipse-207 container">
          <div className="grid place-items-center py-8 text-center md:py-28">
            <h2 className="text-3xl font-semibold leading-[3.5rem] text-signoz_sakura-100 sm:text-4xl">
              Introducing Agent Native Observability
            </h2>
            <p className="max-w-3xl text-center text-xs font-medium text-signoz_vanilla-100 sm:text-base">
              Connect SigNoz MCP to your coding agents (eg: Claude Code, Cursor) and debug
              production issues without leaving your dev environment. Traces, logs, metrics, service
              topology, and your actual codebase &mdash; all in one place.
            </p>
            <TrackingLink
              href="/docs/ai/signoz-mcp-server/"
              target="_blank"
              clickType="Secondary CTA"
              clickName="Agent Native Observability Learn More"
              clickText="Learn More - SigNoz MCP Docs"
              clickLocation="Agent Native Observability Section"
              className="mb-3 mt-3 flex h-10 items-center justify-center gap-1.5 rounded-full border border-signoz_slate-200 bg-signoz_slate-400 px-4 py-2 text-[10px] font-medium leading-5 text-white shadow-[0_0_20px_0_rgba(242,71,105,0.20)] sm:text-sm"
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
