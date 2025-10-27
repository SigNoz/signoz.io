import KubeconHeroSection from './HeroSection'
import TalksLayout from './TalksLayout'
import { Card } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'
import MerchandiseSection from './MerchandiseSection'
import CTASection from './CTASection'

const talks = {
  title: 'Talks from SigNoz Team',
  viewSchedule: 'View Full Schedule',
  viewScheduleLink: 'https://colocatedeventsna2025.sched.com/',
  items1: [
    {
      date: '// WED NOV 13',
      time: '// 2:05 PM EST',
      title: 'Beyond Production: End-to-end CI/CD Observability with OpenTelemetry',
      speakers: 'Ekansh Gupta & Haardik Dharma',
      link: 'https://colocatedeventsna2025.sched.com/event/28D4A/beyond-production-end-to-end-cicd-observability-with-opentelemetry-ekansh-gupta-signoz-haardik-dharma-nyu?iframe=no&w=100%&sidebar=yes&bg=no',
    },
    {
      time: '// 3:20 PM EST',
      title: 'Building Secure MLOps Pipelines with KitOps + Argo Workflows',
      speakers: 'Ekansh Gupta & Shivay Lamba',
      link: 'https://colocatedeventsna2025.sched.com/event/28D7e/building-secure-mlops-pipelines-with-kitops-+-argo-workflows-shivay-lamba-couchbase-ekansh-gupta-signoz?iframe=no&w=100%&sidebar=yes&bg=no',
    },
    {
      time: '// 4:35 PM EST',
      title: 'Skip the Deployment Queue: Automated Rollouts and Rollbacks using OpenFeature',
      speakers: 'Ekansh Gupta & Shivay Lamba',
      link: 'https://colocatedeventsna2025.sched.com/event/28D7z/skip-the-deployment-queue-automated-rollouts-and-rollbacks-using-openfeature-ekansh-gupta-signoz-shivay-lamba-couchbase?iframe=no&w=100%&sidebar=yes&bg=no',
    },
  ],
  items2: [
    {
      time: '// 4 PM EST',
      title: 'Designing Platforms with Judgement: Agentic Flows with K8GP',
      speakers: 'Ekansh Gupta & Shivay Lamba',
      link: 'https://kccncna2025.sched.com/event/27Fb7/designing-platforms-with-judgment-agentic-flows-with-mcp-shivay-lamba-couchbase-ekansh-gupta-signoz?iframe=yes&w=100%&sidebar=yes&bg=no',
    },
    {
      time: '// 5:41 PM EST',
      title: 'Tracing the Untraceable: OpenTelemetry for Vibe-coded LLM Apps',
      speakers: 'Pranay Prateek',
      link: 'https://kccncna2025.sched.com/event/27Fcf/cl-lightning-talk-tracing-the-untraceable-opentelemetry-for-vibe-coded-llm-apps-pranay-prateek-signoz?iframe=no&w=100%25&sidebar=yes&bg=no',
    },
  ],
}

const KubeConPage: React.FC = () => {
  return (
    <div className="mx-auto min-h-screen w-[100vw] border-x border-dashed border-signoz_slate-400 md:w-[80vw]">
      <KubeconHeroSection />

      <TalksLayout
        title={talks.title}
        viewSchedule={talks.viewSchedule}
        viewScheduleLink={talks.viewScheduleLink}
      >
        <div className="mb-4 font-mono text-xs">{`// WED NOV 10`}</div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {talks.items1.map((talk, index) => (
            <Card
              key={index}
              className="rounded-lg bg-signoz_ink-500/50 transition-colors duration-200 [&>*]:border-1 [&>*]:border-solid [&>*]:border-signoz_slate-200/50"
            >
              <div className="px-6 py-4">
                <div className="mb-4 font-mono text-xs">{talk.time}</div>
                <h4 className="mb-3 font-semibold">{talk.title}</h4>
                <span className="flex items-center justify-between gap-2 text-gray-400">
                  {talk.speakers}
                  <Button
                    variant="secondary"
                    href={talk.link}
                    rounded="full"
                    className="flex w-fit items-center gap-2"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </span>
              </div>
            </Card>
          ))}
        </div>
        <div className="my-4 font-mono text-xs">{`// WED NOV 12`}</div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {talks.items2.map((talk, index) => (
            <Card
              key={index}
              className="rounded-lg bg-signoz_ink-500/50 transition-colors duration-200 [&>*]:border-1 [&>*]:border-solid [&>*]:border-signoz_slate-200/50"
            >
              <div className="px-6 py-4">
                <div className="mb-4 font-mono text-xs">{talk.time}</div>
                <h4 className="mb-3 font-semibold">{talk.title}</h4>
                <span className="flex items-center justify-between gap-2 text-gray-400">
                  {talk.speakers}
                  <Button
                    variant="secondary"
                    rounded="full"
                    className="flex w-fit items-center gap-2"
                    href={talk.link}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </span>
              </div>
            </Card>
          ))}
        </div>
      </TalksLayout>

      <MerchandiseSection />

      <CTASection />
    </div>
  )
}

export default KubeConPage
