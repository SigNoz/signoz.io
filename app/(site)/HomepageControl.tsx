import { Header } from '@/components/index-header'
import BuildForDevelopers from '@/components/build-for-developers'
import { SigNozFeatures } from '@/components/index-features'
import SigNozStats from '@/components/signoz-stats'
import { Testimonials } from '@/components/testimonials'
import { TrustedByTeams } from '@/components/trusted-by'
import { AgentNativeObservability } from '@/components/agent-native-observability'
import { WhyOpenTelemetry } from '@/components/why-opentelemetry'
import WhySelectSignoz from '@/components/why-select-signoz'
import { GetStarted } from '@/components/GetStarted'

export default function HomepageControl() {
  return (
    <>
      <Header />
      <TrustedByTeams page="homepage" className="max-w-8xl" />
      <SigNozFeatures className="max-w-8xl" />
      <div>
        <AgentNativeObservability className="max-w-8xl" />
      </div>
      <BuildForDevelopers className="max-w-8xl" />
      <WhyOpenTelemetry className="max-w-8xl" />
      <WhySelectSignoz className="max-w-8xl" />
      <SigNozStats className="max-w-8xl" />
      <Testimonials page="homepage" className="max-w-8xl" />
      <GetStarted page="homepage" className="max-w-8xl" />
    </>
  )
}
