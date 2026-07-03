import { HomepageHeroRedesign } from '@/components/index-header'
import { TrustedByTeams } from '@/components/trusted-by'
import { GetStarted } from '@/components/GetStarted'
import HomepageFloatingCta from '@/components/homepage-floating-cta/HomepageFloatingCta'
import Faq from '@/components/index-faq/Faq'
import AgentNativeObservabilitySection from '@/components/index-agent-native-observability/AgentNativeObservability'
import FeatureBento from '@/components/index-feature-bento/FeatureBento'
import WhySignoz from '@/components/index-why-signoz/WhySignoz'
import Pricing from '@/components/index-pricing/Pricing'
import HomepageGetStarted from '@/components/index-get-started/HomepageGetStarted'

export default function HomepageRedesign() {
  return (
    <div className="homepage-hero-redesign-variant">
      <HomepageHeroRedesign />
      <TrustedByTeams
        page="homepage"
        variant="marquee"
        className="relative left-1/2 w-[calc(100dvw-8px)] max-w-none -translate-x-1/2 px-4 sm:px-6 lg:px-20"
      />
      <WhySignoz />
      <FeatureBento />
      <AgentNativeObservabilitySection />
      <HomepageGetStarted />
      <Pricing />
      <Faq />
      <GetStarted page="homepage" className="max-w-8xl" withIcon />
      <HomepageFloatingCta />
    </div>
  )
}
