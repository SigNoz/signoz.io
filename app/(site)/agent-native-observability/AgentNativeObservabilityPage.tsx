'use client'

import { ArrowRight, Loader2, Check } from 'lucide-react'
import DOMPurify from 'dompurify'
import Button from '@/components/ui/Button'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import FeaturePageHeader from '@/shared/components/molecules/FeaturePages/FeaturePageHeader'
import IconTitleDescriptionCardGrid from '@/shared/components/molecules/FeaturePages/IconTitleDescriptionCard'
import FeaturePageLayout from '@/shared/components/molecules/FeaturePages/FeaturePageLayout'
import { TRUSTED_BY_LOGOS, FEATURE_CARDS } from './AgentNativeObservabilityPage.constants'
import TrackingLink from '@/components/TrackingLink'
import Image from 'next/image'
import { useHubspotCustomForm } from '@/components/hubspot-custom-form/useHubspotCustomForm'
import DitherCanvas from '@/components/DitherCanvas/DitherCanvas'
import agentNativeHeroImageUrl from '@/public/img/platform/AgentNativeObservabilityMeta.svg?url'

const Header: React.FC = () => {
  const headerButtonGroup = (
    <div className="flex flex-col items-start gap-3 md:flex-row">
      <Button
        asChild
        variant="default"
        rounded="full"
        className="!w-fit min-w-[200px] items-center gap-2"
      >
        <TrackingLink
          href="#ai-assistant"
          clickType="Primary CTA"
          clickName="Agent Native Page Hero Noz: SigNoz AI Assistant"
          clickLocation="Agent Native Observability Page Hero"
          clickText="Noz: SigNoz AI Assistant"
        >
          Noz: SigNoz AI Assistant
          <ArrowRight size={14} />
        </TrackingLink>
      </Button>
      <Button
        asChild
        variant="secondary"
        rounded="full"
        className="!w-fit min-w-[200px] items-center gap-2"
      >
        <TrackingLink
          href="/docs/ai/signoz-mcp-server/"
          clickType="Secondary CTA"
          clickName="Agent Native Page Hero Connect SigNoz MCP"
          clickLocation="Agent Native Observability Page Hero"
          clickText="Connect SigNoz MCP"
        >
          Connect SigNoz MCP
          <ArrowRight size={14} />
        </TrackingLink>
      </Button>
    </div>
  )

  return (
    <DitherCanvas enableClick>
      <FeaturePageHeader
        title={
          <>
            <NozAnimatedIcon size={40} />
            Introducing Agent Native <br /> Observability
          </>
        }
        description={
          <span className="text-base">
            Connect SigNoz to your coding agents (e.g. Claude Code, Cursor) and debug production
            issues without leaving your dev environment. <br className="hidden md:block" /> Traces,
            logs, metrics, service topology, and your actual codebase — all in one place. Or use
            Noz, our new AI Assistant out-of-the-box. No AI SRE required.
          </span>
        }
        buttonGroup={headerButtonGroup}
        sectionLayoutClassName="!mt-0 !border-x-1 !border-dashed !border-signoz_slate-400 max-md:-mb-[3rem]"
        heroImage={
          <Image
            src={agentNativeHeroImageUrl}
            alt="Agent Native Observability hero"
            className="w-full rounded-xl object-contain"
            width={1440}
            height={720}
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
          />
        }
        buttonDescription={
          <div className="text-sm text-signoz_vanilla-400">
            No learning new Dashboard UX. In-context Observability in your workflows.
          </div>
        }
        className="mt-0"
        align="left"
      />
    </DitherCanvas>
  )
}

const TrustedByTeams: React.FC = () => {
  return (
    <div className="!border-b-1 relative mx-auto flex max-w-8xl flex-col items-center justify-center gap-10 overflow-hidden border !border-t-0 border-dashed border-signoz_slate-400 py-16 md:w-[80vw]">
      <div className="text-center text-sm font-semibold uppercase tracking-[0.05em] text-signoz_vanilla-400">
        Trusted by the <span className="text-signoz_vanilla-100">best platform teams</span>
      </div>
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-16 gap-y-10 px-4">
        {TRUSTED_BY_LOGOS.map((logo) => (
          <div key={logo.alt} className="flex h-12 items-center justify-center">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={140}
              height={48}
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="w-full text-center">
        <Button
          variant="secondary"
          rounded="full"
          className="mx-auto flex w-fit items-center gap-2"
          asChild
        >
          <TrackingLink
            href="/case-study/"
            clickType="Secondary CTA"
            clickName="Agent Native Page Customer Stories Button"
            clickLocation="Agent Native Observability Page Logos"
            clickText="Read customer stories"
          >
            <span>Read customer stories</span>
            <ArrowRight size={14} />
          </TrackingLink>
        </Button>
      </div>
    </div>
  )
}

const EarlyAccessForm: React.FC = () => {
  const {
    definition,
    values,
    errors,
    touched,
    status,
    submitError,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
  } = useHubspotCustomForm({
    portalId: '22308423',
    formId: '3789c0c2-72d1-4adf-95d9-83587f8d9fda',
    formName: 'Agent Native AI Assistant Early Access',
  })

  const isSubmitting = status === 'submitting'

  if (status === 'success') {
    const thankYouMessage = definition?.thankYouMessage
    return (
      <div className="flex items-center gap-2 py-1">
        {thankYouMessage ? (
          <div
            className="text-sm text-signoz_vanilla-300 [&_p]:mb-1 [&_p]:last:mb-0"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thankYouMessage) }}
          />
        ) : (
          <span className="text-sm text-signoz_vanilla-300">We&apos;ll be in touch soon.</span>
        )}
      </div>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="relative flex flex-col gap-1.5 pb-5">
      <div className="flex h-10 items-stretch gap-2">
        <input
          type="email"
          aria-label="Email address for early access"
          placeholder="you@company.com"
          autoComplete="off"
          value={typeof values.email === 'string' ? values.email : ''}
          onChange={(e) => setFieldValue('email', e.target.value)}
          onBlur={() => setFieldTouched('email')}
          disabled={isSubmitting}
          className="min-w-0 flex-1 rounded-full border border-signoz_slate-400 bg-signoz_ink-300 px-4 text-sm text-stone-300 placeholder-gray-500/50 focus:outline-none disabled:opacity-60"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          isButton
          variant="default"
          className="gap-1 rounded-full"
        >
          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          Submit
        </Button>
      </div>
      <div className="absolute -bottom-3 left-0">
        {touched.email && errors.email ? (
          <span className="text-xs text-signoz_cherry-500">{errors.email}</span>
        ) : submitError ? (
          <span className="text-xs text-signoz_cherry-500">{submitError}</span>
        ) : null}
      </div>
    </form>
  )
}

const NozAnimatedIcon: React.FC<{ size?: number }> = ({ size = 40 }) => (
  <div className="noz-btn" style={{ width: size, height: size }}>
    <svg
      className="noz-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible', width: size, height: size, display: 'block' }}
    >
      <style>{`
        .noz-icon .noz-arm-left {
          transform-origin: 4.18383px 13.4752px;
          transform: rotate(0deg);
          transition: transform 0.55s cubic-bezier(0.34, 1.7, 0.5, 1);
          will-change: transform;
        }
        .noz-icon .noz-arm-wiggle {
          transform-origin: 4.18383px 13.4752px;
          transform: rotate(0deg);
          will-change: transform;
        }
        .noz-icon .noz-head {
          transform-origin: 12.02px 18.37px;
          transform: rotate(0deg);
          transition: transform 0.5s cubic-bezier(0.34, 1.7, 0.5, 1);
          will-change: transform;
        }
        .noz-btn:hover .noz-icon .noz-arm-left {
          transform: rotate(145deg) scale(1, 1.7);
        }
        .noz-btn:hover .noz-icon .noz-arm-wiggle {
          animation: noz-wave-wiggle 0.7s ease-in-out 0.2s infinite;
        }
        .noz-btn:hover .noz-icon .noz-head {
          transform: rotate(9deg);
        }
        @keyframes noz-wave-wiggle {
          0%, 100% { transform: rotate(0deg); }
          25%      { transform: rotate(20deg); }
          75%      { transform: rotate(-20deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .noz-icon .noz-arm-left,
          .noz-icon .noz-arm-wiggle,
          .noz-icon .noz-head {
            transition: none;
            animation: none !important;
          }
        }
      `}</style>
      <rect x="4.35938" y="8.49908" width="15.4569" height="11.978" rx="1.76147" fill="#E5484D" />
      <rect x="6.87012" y="19.0679" width="3.34679" height="3.69908" rx="0.880734" fill="#E5484D" />
      <rect x="13.916" y="19.0679" width="3.34679" height="3.69908" rx="0.880734" fill="#E5484D" />
      <rect x="18.7598" y="13.4752" width="2.11376" height="3.69908" rx="0.880734" fill="#E5484D" />
      <g className="noz-arm-left">
        <g className="noz-arm-wiggle">
          <rect
            x="3.12695"
            y="13.4752"
            width="2.11376"
            height="3.69908"
            rx="0.880734"
            fill="#E5484D"
          />
        </g>
      </g>
      <g className="noz-head">
        <circle cx="12.0217" cy="14.4881" r="3.87523" fill="#F5F5F5" />
        <path
          d="M12.0237 12.8024C12.0237 13.7328 11.2673 14.4892 10.337 14.4892C10.0339 14.4892 9.74926 14.4101 9.50152 14.2678C9.47517 14.5551 9.49888 14.8502 9.57795 15.1428C9.93901 16.4921 11.3279 17.2933 12.6773 16.9323C14.0267 16.5712 14.8279 15.1823 14.4668 13.8329C14.1453 12.6285 13.0041 11.8616 11.8023 11.967C11.942 12.2121 12.0237 12.4967 12.0237 12.8024Z"
          fill="#0A0C10"
        />
        <path
          d="M8.33833 7.94578L9.83358 4.31319C10.1302 3.59261 10.6676 2.99939 11.355 2.63299L13.9181 1.26684C14.1327 1.15169 14.3804 1.34885 14.3194 1.58439L13.6703 4.06892C13.6511 4.14046 13.6424 4.21374 13.6424 4.28876C13.6424 4.39868 13.6633 4.5086 13.7052 4.61154L15.0382 7.94578H11.4248L11.6307 7.32813L12.3356 7.09259C12.449 7.05421 12.5257 6.94778 12.5257 6.82739C12.5257 6.707 12.449 6.60057 12.3356 6.56218L11.6307 6.32664L11.3951 5.62176C11.3568 5.51009 11.2503 5.43333 11.1299 5.43333C11.0096 5.43333 10.9031 5.5101 10.8647 5.6235L10.6292 6.32839L9.92431 6.56393C9.8109 6.60231 9.73413 6.70874 9.73413 6.82913C9.73413 6.94952 9.8109 7.05595 9.92431 7.09434L10.6292 7.32988L10.8351 7.94752H8.33833V7.94578ZM12.1 3.43558C12.0808 3.378 12.0285 3.33962 11.9674 3.33962C11.9064 3.33962 11.854 3.378 11.8348 3.43558L11.7179 3.78802L11.3655 3.90492C11.3079 3.92411 11.2695 3.97645 11.2695 4.03752C11.2695 4.09859 11.3079 4.15093 11.3655 4.17012L11.7179 4.28702L11.8348 4.63946C11.854 4.69704 11.9064 4.73542 11.9674 4.73542C12.0285 4.73542 12.0808 4.69704 12.1 4.63946L12.2169 4.28702L12.5694 4.17012C12.6269 4.15093 12.6653 4.09859 12.6653 4.03752C12.6653 3.97645 12.6269 3.92411 12.5694 3.90492L12.2169 3.78802L12.1 3.43558ZM7.78 7.91088H15.5965C15.9053 7.91088 16.1548 8.16038 16.1548 8.4692C16.1548 8.77803 15.9053 9.02753 15.5965 9.02753H7.78C7.47118 9.02753 7.22168 8.77803 7.22168 8.4692C7.22168 8.16038 7.47118 7.91088 7.78 7.91088Z"
          fill="#4E74F8"
        />
      </g>
    </svg>
  </div>
)

const InContextObservability: React.FC = () => {
  return (
    <SectionLayout
      variant="bordered"
      className="flex flex-col items-center justify-center gap-10 !px-8 !py-20 md:!px-0"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-4 text-4xl font-semibold text-signoz_vanilla-100">
          Powerful, In-context Observability
        </h2>
        <p className="text-lg text-signoz_vanilla-400">
          In the tools you need. At the time you need.
        </p>
      </div>
      <div className="mx-auto w-full overflow-hidden border-y border-dashed border-signoz_slate-400/50">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <DitherCanvas
            fadeToLeft
            enableClick
            className="border-b border-dashed border-signoz_slate-400/50 md:border-b-0 md:border-r"
          >
            <div className="flex h-full flex-col gap-4 p-8">
              <div>
                <Image
                  src="/img/agent-native-observability/mcp-server-icon.svg"
                  alt="SigNoz MCP Server icon"
                  width={36}
                  height={36}
                />
              </div>
              <h3 className="m-0 text-2xl font-bold text-signoz_vanilla-100">SigNoz MCP Server</h3>
              <p className="text-sm leading-relaxed text-signoz_vanilla-400">
                Plug directly into Claude Code, Cursor in minutes. Get full observability context -
                traces, logs, metrics, service topology, deployment history - in every session.
                Start debugging in your terminal.
              </p>
              <div className="mt-auto pb-5 pt-4">
                <Button
                  asChild
                  variant="default"
                  rounded="full"
                  className="!w-fit items-center gap-2"
                >
                  <TrackingLink
                    href="/docs/ai/signoz-mcp-server/"
                    clickType="Primary CTA"
                    clickName="Agent Native Page MCP Server Get Started"
                    clickLocation="Agent Native Observability Page In-Context Section"
                    clickText="Get started in minutes"
                  >
                    Get started in minutes
                    <ArrowRight size={14} />
                  </TrackingLink>
                </Button>
              </div>
            </div>
          </DitherCanvas>
          <DitherCanvas fadeToLeft enableClick id="ai-assistant">
            <div className="flex h-full flex-col gap-4 p-8">
              <NozAnimatedIcon size={40} />
              <h3 className="m-0 text-2xl font-bold text-signoz_vanilla-100">
                Noz : SigNoz AI Assistant
              </h3>
              <p className="text-sm leading-relaxed text-signoz_vanilla-400">
                A sidepane as you work, or full-screen view to dig in. Ask about logs, traces,
                metrics in plain English - pulls up the right explorer view with the query.
              </p>
              <div className="mt-auto">
                <p className="mb-2 text-sm font-semibold text-signoz_vanilla-100">
                  Get early access
                </p>
                <EarlyAccessForm />
              </div>
            </div>
          </DitherCanvas>
        </div>
      </div>
    </SectionLayout>
  )
}

const FeatureSections: React.FC = () => {
  return (
    <section className="relative mx-auto max-w-8xl overflow-hidden border-t border-dashed border-signoz_slate-400 pt-14 md:w-[80vw]">
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
        <div className="flex flex-col items-center gap-14 text-2xl font-medium leading-[3.25rem] text-signoz_sienna-100">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-center text-4xl font-semibold text-signoz_vanilla-100">
              Why Agent Native Observability
            </h2>
            <div className="text-center text-base text-signoz_vanilla-400">
              Debug faster. Ship with confidence. All from your dev environment.
            </div>
          </div>
          <SectionLayout variant="no-border" className="!mx-auto !p-0">
            <IconTitleDescriptionCardGrid cards={FEATURE_CARDS} variant="lg" />
          </SectionLayout>
        </div>
      </div>
    </section>
  )
}

const BottomCTA: React.FC = () => {
  return (
    <SectionLayout
      variant="full-width"
      className="flex flex-col items-center justify-center gap-6 !px-8 !py-20 md:!px-0"
    >
      <h2 className="mx-auto mb-6 max-w-4xl text-center text-4xl font-semibold text-signoz_vanilla-100">
        No more context-switching to a <br className="hidden md:block" /> separate observability
        tool.
      </h2>
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
          <Button asChild variant="default" rounded="full" className="!w-fit items-center gap-2">
            <TrackingLink
              href="#ai-assistant"
              clickType="Primary CTA"
              clickName="Agent Native Page Bottom CTA Noz: SigNoz AI Assistant"
              clickLocation="Agent Native Observability Page Bottom CTA"
              clickText="Noz: SigNoz AI Assistant"
            >
              Noz: SigNoz AI Assistant
              <ArrowRight size={14} />
            </TrackingLink>
          </Button>
          <Button asChild variant="secondary" rounded="full" className="!w-fit items-center gap-2">
            <TrackingLink
              href="/docs/ai/signoz-mcp-server/"
              clickType="Secondary CTA"
              clickName="Agent Native Page Bottom CTA Connect MCP"
              clickLocation="Agent Native Observability Page Bottom CTA"
              clickText="Connect SigNoz MCP"
            >
              Connect SigNoz MCP
              <ArrowRight size={14} />
            </TrackingLink>
          </Button>
        </div>
      </div>
    </SectionLayout>
  )
}

const AgentNativeObservabilityPage: React.FC = () => {
  return (
    <FeaturePageLayout showProductNav={false}>
      <Header />
      <TrustedByTeams />
      <InContextObservability />

      <SectionLayout variant="bordered" className="!px-0">
        <FeatureSections />
        <BottomCTA />
      </SectionLayout>
    </FeaturePageLayout>
  )
}

export default AgentNativeObservabilityPage
