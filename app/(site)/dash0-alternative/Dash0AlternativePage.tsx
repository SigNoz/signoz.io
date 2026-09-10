'use client'

import { Quote } from 'lucide-react'
import DitherCanvas from '@/components/DitherCanvas/DitherCanvas'
import Figure from '@/components/Figure/Figure'
import HeroCards from '@/shared/components/molecules/FeaturePages/HeroCards'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import Divider from '@/shared/components/molecules/FeaturePages/Divider'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import ComparisonTable from '@/shared/components/molecules/FeaturePages/ComparisonTable'
import UsageBasedPricing from '@/shared/components/molecules/FeaturePages/UsageBasedPricing'
import {
  DASH0_COMPARISON_BLOCKS,
  DASH0_COMPARISON_HEADING,
  DASH0_FINAL_CTA,
  DASH0_FINAL_CTA_BUTTONS,
  DASH0_HERO,
  DASH0_HERO_BUTTONS,
  DASH0_QUOTES,
  DASH0_REASONS,
  DASH0_TLDR,
  DASH0_VENDORS,
  DASH0_VERDICT,
  DASH0_VERDICT_BUTTONS,
  Dash0ComparisonBlock,
} from './Dash0AlternativePage.constants'

const CONTENT_CONTAINER = 'w-full px-6 md:px-8'
const SECTION_CONTAINER = `${CONTENT_CONTAINER} py-10 md:py-14`

const Header: React.FC = () => {
  return (
    <DitherCanvas enableClick>
      <header className="relative pb-14 pt-14 md:pb-20 md:pt-24">
        <div className={`${CONTENT_CONTAINER} flex flex-col items-start gap-4`}>
          <p className="m-0 font-mono text-[11px] uppercase tracking-[0.14em] text-signoz_vanilla-400">
            {DASH0_HERO.eyebrow}
          </p>
          <h1 className="text-gradient m-0 w-fit text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[44px] lg:leading-[3.5rem]">
            {DASH0_HERO.title}
          </h1>
          <p className="m-0 max-w-4xl text-lg leading-8 text-signoz_vanilla-400">
            {DASH0_HERO.description}
          </p>
          <ButtonGroup buttons={DASH0_HERO_BUTTONS} className="mt-4 !items-start !justify-start" />
        </div>
      </header>
    </DitherCanvas>
  )
}

const TldrSection: React.FC = () => {
  return (
    <section className="w-full border-y border-dashed border-[var(--l2-border)]">
      <div className="border-b border-dashed border-[var(--l2-border)] py-2 text-center font-mono text-[11px] tracking-[0.16em] text-[var(--l2-foreground)]">
        {DASH0_TLDR.heading}
      </div>
      <div className="grid w-full md:grid-cols-2">
        {DASH0_TLDR.columns.map((column, index) => (
          <div
            key={column.label}
            className={
              index === 0
                ? 'flex flex-col gap-3 border-b border-dashed border-[var(--l2-border)] px-6 py-8 md:border-b-0 md:border-r md:px-8'
                : 'flex flex-col gap-3 px-6 py-8 md:px-8'
            }
          >
            <p
              className={`m-0 font-mono text-[13px] font-medium ${
                column.highlight ? 'text-signoz_robin-400' : 'text-[var(--l2-foreground)]'
              }`}
            >
              {column.label}
            </p>
            <p className="m-0 max-w-xl text-base leading-relaxed text-[var(--l2-foreground)]">
              {column.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

const WhyEngineersChoose: React.FC = () => {
  return (
    <section className={SECTION_CONTAINER}>
      <h2 className="m-0 text-3xl font-semibold tracking-tight text-[var(--l1-foreground)] md:text-4xl">
        Why engineers choose SigNoz Cloud over Dash0
      </h2>
      <div className="mt-10">
        {DASH0_REASONS.map((reason, index) => (
          <div
            key={reason.title}
            className={`grid grid-cols-[44px_1fr] gap-4 border-t border-[var(--l1-border)] py-7 ${
              index === DASH0_REASONS.length - 1 ? 'border-b' : ''
            }`}
          >
            <div
              className="pt-1 font-mono text-sm text-[var(--l2-foreground)]"
              data-markdown-ignore=""
            >
              {String(index + 1).padStart(2, '0')}
            </div>
            <div>
              <h4 className="m-0 text-lg font-semibold leading-snug text-[var(--l1-foreground)] md:text-[19px]">
                {reason.title}
              </h4>
              <p className="mb-0 mt-2 max-w-3xl text-base leading-relaxed text-[var(--l2-foreground)]">
                {reason.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

const QuotesSection: React.FC = () => {
  return (
    <section className="w-full">
      <HeroCards
        layoutVariant="full-width"
        className="!mt-0 !px-0"
        cards={DASH0_QUOTES.map((item) => ({
          icon: <Quote size={24} className="text-[var(--l1-foreground)]" />,
          title: item.company,
          description: item.quote,
        }))}
      />
    </section>
  )
}

const ScreenshotPair: React.FC<{
  screenshots: NonNullable<Dash0ComparisonBlock['screenshots']>
}> = ({ screenshots }) => {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-2">
      {screenshots.map((shot) => (
        <div key={shot.src} className="flex flex-col gap-2">
          <p className="m-0 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--l2-foreground)]">
            {shot.label}
          </p>
          <div className="overflow-hidden rounded border border-[var(--l2-border)]">
            <Figure
              src={shot.src}
              alt={shot.alt}
              caption=""
              width={shot.width}
              height={shot.height}
              className="theme-invert m-0 w-full rounded-none object-contain"
              figureClassName="m-0"
              captionClassName="hidden"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const ComparisonBlock: React.FC<{ block: Dash0ComparisonBlock }> = ({ block }) => {
  return (
    <div className="border-t border-[var(--l1-border)] py-9">
      <h3 className="m-0 text-2xl font-semibold text-[var(--l1-foreground)]">{block.title}</h3>
      <p className="mb-0 mt-4 max-w-4xl text-base leading-relaxed text-[var(--l2-foreground)] [&_strong]:text-[var(--l1-foreground)]">
        {block.description}
      </p>
      {block.screenshots && <ScreenshotPair screenshots={block.screenshots} />}
      {block.tableLabel && (
        <p className="mb-0 mt-6 text-[15px] font-semibold text-[var(--l1-foreground)]">
          {block.tableLabel}
        </p>
      )}
      <ComparisonTable
        variant="striped"
        vendors={DASH0_VENDORS}
        rows={block.rows}
        featureColumnLabel="Capability"
        className={block.tableLabel ? 'mt-2' : 'mt-6'}
      />
    </div>
  )
}

const FeatureComparison: React.FC = () => {
  return (
    <section className={SECTION_CONTAINER}>
      <h2 className="m-0 text-3xl font-semibold tracking-tight text-[var(--l1-foreground)] md:text-4xl">
        {DASH0_COMPARISON_HEADING}
      </h2>
      <div className="mt-10 flex flex-col gap-2">
        {DASH0_COMPARISON_BLOCKS.map((block) => (
          <ComparisonBlock key={block.id} block={block} />
        ))}
      </div>
    </section>
  )
}

const VerdictSection: React.FC = () => {
  return (
    <section className={SECTION_CONTAINER}>
      <h2 className="m-0 max-w-3xl text-3xl font-semibold tracking-tight text-[var(--l1-foreground)] md:text-4xl">
        {DASH0_VERDICT.title}
      </h2>
      <div className="mt-5 flex max-w-4xl flex-col gap-4">
        {DASH0_VERDICT.paragraphs.map((paragraph) => (
          <p key={paragraph} className="m-0 text-base leading-relaxed text-[var(--l2-foreground)]">
            {paragraph}
          </p>
        ))}
      </div>
      <ButtonGroup buttons={DASH0_VERDICT_BUTTONS} className="mt-8 !items-start !justify-start" />
    </section>
  )
}

const FinalCtaSection: React.FC = () => {
  return (
    <section className={SECTION_CONTAINER}>
      <div className="flex flex-col items-center text-center">
        <h2 className="m-0 text-3xl font-semibold tracking-tight text-[var(--l1-foreground)] md:text-4xl">
          {DASH0_FINAL_CTA.title}
        </h2>
        <div className="mx-auto mt-6 flex max-w-[76ch] flex-col gap-4">
          {DASH0_FINAL_CTA.paragraphs.map((paragraph) => (
            <p key={paragraph} className="m-0 text-lg leading-relaxed text-[var(--l2-foreground)]">
              {paragraph}
            </p>
          ))}
        </div>
        <ButtonGroup buttons={DASH0_FINAL_CTA_BUTTONS} className="mt-9" />
      </div>
    </section>
  )
}

const Dash0AlternativePage: React.FC = () => {
  return (
    <FeaturePageLayout showProductNav={false}>
      <SectionLayout variant="bordered" className="!px-0">
        <Header />
        <TldrSection />
        <WhyEngineersChoose />
        <Divider />
        <QuotesSection />
        <Divider />
        <FeatureComparison />
      </SectionLayout>
      <UsageBasedPricing
        show={['logs', 'traces', 'metrics']}
        sectionDescription="SigNoz Cloud and Dash0 both offer simple, transparent, usage-based pricing. Customers using both platforms with similar workloads often find the pricing comparable. However, they bill on different usage meters."
      />
      <SectionLayout variant="bordered" className="!px-0">
        <VerdictSection />
        <Divider />
        <FinalCtaSection />
      </SectionLayout>
    </FeaturePageLayout>
  )
}

export default Dash0AlternativePage
