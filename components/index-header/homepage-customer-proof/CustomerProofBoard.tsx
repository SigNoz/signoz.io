import { memo } from 'react'

import { cn } from 'app/lib/utils'

import { FeaturedQuoteCard, LogoCard, QuoteCard } from './CustomerProofCards'
import { logos } from './HomepageCustomerProof.constants'
import type { BentoCellProps } from './HomepageCustomerProof.types'

function BentoCell({ children, column, columnSpan = 1, row, rowSpan = 1 }: BentoCellProps) {
  return (
    <div
      className="min-h-0 min-w-0"
      style={{
        gridColumn: `${column} / span ${columnSpan}`,
        gridRow: `${row} / span ${rowSpan}`,
      }}
    >
      {children}
    </div>
  )
}

export const BentoBoard = memo(function BentoBoard({ isClone }: { isClone: boolean }) {
  return (
    <div
      aria-hidden={isClone ? true : undefined}
      className={cn(
        'grid h-[264px] w-[var(--proof-board-width)] shrink-0 grid-cols-[repeat(24,minmax(0,1fr))] grid-rows-3 gap-3 pl-3',
        isClone && 'motion-reduce:hidden'
      )}
      data-proof-clone={isClone ? 'true' : undefined}
    >
      <BentoCell column={1} columnSpan={2} row={1}>
        <LogoCard isClone={isClone} logo={logos.lenskart} />
      </BentoCell>
      <BentoCell column={3} row={1}>
        <LogoCard isClone={isClone} logo={logos.sarvam} />
      </BentoCell>
      <BentoCell column={4} columnSpan={3} row={1} rowSpan={2}>
        <FeaturedQuoteCard
          attribution="Mark Nelson · Oracle"
          href="https://www.linkedin.com/posts/marknelson6_oracle-backend-for-microservices-and-ai-activity-7366870519129731073-cgU2"
          isClone={isClone}
          logo={logos.oracle}
          quote="We’ve transitioned from Grafana to SigNoz, offering a simplified, unified monitoring, logging, and alerting experience."
          theme="Migrated from Grafana"
        />
      </BentoCell>
      <BentoCell column={7} columnSpan={2} row={1}>
        <LogoCard isClone={isClone} logo={logos.hedra} />
      </BentoCell>
      <BentoCell column={9} columnSpan={4} row={1}>
        <QuoteCard
          attribution="Leo Blondel · CTO · Alien Intelligence"
          href="/blog/alien-intelligence-ai-sre-workflow-signoz/#what-leo-built-at-alien-intelligence"
          isClone={isClone}
          logo={logos.alienIntelligence}
          quote="Datadog came back and said, ‘The trial’s over — it’s going to cost you over $2K.’ I was like, ‘Sorry, what?’"
          theme="Datadog pricing"
        />
      </BentoCell>
      <BentoCell column={13} row={1}>
        <LogoCard isClone={isClone} logo={logos.eltropy} />
      </BentoCell>
      <BentoCell column={14} columnSpan={3} row={1}>
        <QuoteCard
          attribution="Doug Drechsel · Oracle Developers"
          href="https://medium.com/oracledevs/observability-the-smart-way-automating-metrics-in-java-microservices-2f82340114cb"
          isClone={isClone}
          logo={logos.oracle}
          quote="We chose SigNoz to tie it all together."
          theme="Unified observability"
        />
      </BentoCell>
      <BentoCell column={17} row={1}>
        <LogoCard isClone={isClone} logo={logos.salient} />
      </BentoCell>
      <BentoCell column={18} columnSpan={3} row={1}>
        <QuoteCard
          attribution="Akhil Sharma · Armur AI"
          href="https://www.linkedin.com/posts/akhilsails_at-armur-ai-we-removed-all-observability-activity-7363461664848957440-LbW2"
          isClone={isClone}
          logo={logos.armur}
          quote="At Armur AI, we removed all observability tools and have been using only one — SigNoz."
          theme="Consolidated to SigNoz"
        />
      </BentoCell>
      <BentoCell column={21} columnSpan={2} row={1}>
        <LogoCard isClone={isClone} logo={logos.cisco} />
      </BentoCell>
      <BentoCell column={23} row={1}>
        <LogoCard isClone={isClone} logo={logos.blackForestLabs} />
      </BentoCell>
      <BentoCell column={24} row={1}>
        <LogoCard isClone={isClone} logo={logos.harmonicAi} />
      </BentoCell>

      <BentoCell column={1} columnSpan={2} row={2} rowSpan={2}>
        <FeaturedQuoteCard
          attribution="Inkeep"
          href="https://docs.inkeep.com/get-started/traces"
          isClone={isClone}
          logo={logos.inkeep}
          quote="We’ve been using SigNoz as a first-class dependency in our new agent framework."
          theme="Agent framework"
        />
      </BentoCell>
      <BentoCell column={3} row={2}>
        <LogoCard isClone={isClone} logo={logos.flutterwave} />
      </BentoCell>
      <BentoCell column={7} columnSpan={2} row={2} rowSpan={2}>
        <FeaturedQuoteCard
          attribution="Karl Lyons · Shaped"
          href="/case-study/shaped/"
          isClone={isClone}
          logo={logos.shaped}
          quote="Every single time we have an issue, SigNoz is always the first place to check."
          theme="Migrated from CloudWatch + Honeycomb"
        />
      </BentoCell>
      <BentoCell column={9} columnSpan={3} row={2}>
        <QuoteCard
          attribution="Doug Drechsel · Oracle"
          href="https://www.linkedin.com/posts/dougdrechsel_streamlining-kafka-microservices-and-observability-activity-7457462317891588097-H8nC"
          isClone={isClone}
          logo={logos.oracle}
          quote="One environment variable. Full Kafka observability. Zero code changes."
          theme="Kafka · Zero code changes"
        />
      </BentoCell>
      <BentoCell column={12} row={2}>
        <LogoCard isClone={isClone} logo={logos.structureFlow} />
      </BentoCell>
      <BentoCell column={13} row={2}>
        <LogoCard isClone={isClone} logo={logos.formstack} />
      </BentoCell>
      <BentoCell column={14} row={2}>
        <LogoCard isClone={isClone} logo={logos.tavus} />
      </BentoCell>
      <BentoCell column={15} columnSpan={3} row={2}>
        <QuoteCard
          attribution="Eugene Evenwel · The Website Engineer"
          href="https://thewebsiteengineer.com/blog/how-we-saved-90-on-our-monitoring-bill-by-dropping-new-relic-for-signoz/"
          isClone={isClone}
          logo={logos.websiteEngineer}
          quote="We made the switch to self-hosted SigNoz — and haven’t looked back since."
          theme="Migrated from New Relic"
        />
      </BentoCell>
      <BentoCell column={18} columnSpan={2} row={2}>
        <LogoCard isClone={isClone} logo={logos.lgElectronics} />
      </BentoCell>
      <BentoCell column={20} columnSpan={3} row={2}>
        <QuoteCard
          attribution="Andrew · @buzahuza"
          href="https://x.com/buzahuza/status/1943072730825232893"
          isClone={isClone}
          quote="We replaced our Grafana–Prometheus–Alertmanager–Loki stack with it and we are happy."
          theme="Replaced Grafana stack"
        />
      </BentoCell>
      <BentoCell column={23} row={2}>
        <LogoCard isClone={isClone} logo={logos.kognitos} />
      </BentoCell>
      <BentoCell column={24} row={2}>
        <LogoCard isClone={isClone} logo={logos.racingAndSports} />
      </BentoCell>

      <BentoCell column={3} row={3}>
        <LogoCard isClone={isClone} logo={logos.auvik} />
      </BentoCell>
      <BentoCell column={4} columnSpan={3} row={3}>
        <QuoteCard
          attribution="Hiro Tamada · Kernel"
          href="/case-study/kernel/"
          isClone={isClone}
          logo={logos.kernel}
          quote="SigNoz MCP has been a very big part of our engineering life."
          theme="Agent-native triage"
        />
      </BentoCell>
      <BentoCell column={9} row={3}>
        <LogoCard isClone={isClone} logo={logos.moneyhub} />
      </BentoCell>
      <BentoCell column={10} row={3}>
        <LogoCard isClone={isClone} logo={logos.blaxel} />
      </BentoCell>
      <BentoCell column={11} columnSpan={2} row={3}>
        <LogoCard isClone={isClone} logo={logos.harmonic} />
      </BentoCell>
      <BentoCell column={13} columnSpan={2} row={3}>
        <LogoCard isClone={isClone} logo={logos.fiscalNote} />
      </BentoCell>
      <BentoCell column={15} columnSpan={2} row={3}>
        <LogoCard isClone={isClone} logo={logos.xata} />
      </BentoCell>
      <BentoCell column={17} columnSpan={3} row={3}>
        <QuoteCard
          attribution="Stelios Pavlidis · Founder · Whatoblock.com"
          href="https://www.linkedin.com/posts/steliospavlidis_observability-devops-sre-activity-7417883949152174080-vGcf"
          isClone={isClone}
          quote="Without centralized tracing and logging, this would have taken much longer to isolate."
          theme="Across 200+ nodes"
        />
      </BentoCell>
      <BentoCell column={20} row={3}>
        <LogoCard isClone={isClone} logo={logos.sailResearch} />
      </BentoCell>
      <BentoCell column={21} columnSpan={3} row={3}>
        <QuoteCard
          attribution="Shawn Zhu · Ariso"
          href="https://ariso.ai/blog/signoz-mcp-the-morning-after"
          isClone={isClone}
          logo={logos.ariso}
          quote="Now I have a context-aware ops assistant."
          theme="Agent-native response"
        />
      </BentoCell>
      <BentoCell column={24} row={3}>
        <LogoCard isClone={isClone} logo={logos.formance} />
      </BentoCell>
    </div>
  )
})
