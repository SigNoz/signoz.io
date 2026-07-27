import { HomepageHeroRedesign } from '@/components/index-header'
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
      <FeatureBento />
      <AgentNativeObservabilitySection />
      <WhySignoz />
      <HomepageGetStarted />
      <Pricing />
      <Faq />
    </div>
  )
}
