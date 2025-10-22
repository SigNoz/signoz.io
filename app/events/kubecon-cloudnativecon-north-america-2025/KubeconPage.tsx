import KubeconHeroSection from './HeroSection';
import TalksLayout from './TalksLayout';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import MerchandiseSection from './MerchandiseSection';
import CTASection from './CTASection';

const talks = {
  title: "Talks from SigNoz Team",
  viewSchedule: "View Full Schedule",
  viewScheduleLink: "https://colocatedeventsna2025.sched.com/",
  items1: [
    {
      date: "// WED NOV 13",
      time: "// 2:05 PM EST",
      title: "Beyond Production: End-to-end CI/CD Observability with OpenTelemetry",
      speakers: "Ekansh Gupta & Haardik Dharma",
      link: "https://colocatedeventsna2025.sched.com/event/28D4A/beyond-production-end-to-end-cicd-observability-with-opentelemetry-ekansh-gupta-signoz-haardik-dharma-nyu?iframe=no&w=100%&sidebar=yes&bg=no"
    },
    {
      time: "// 3:20 PM EST",
      title: "Building Secure MLOps Pipelines with KitOps + Argo Workflows",
      speakers: "Ekansh Gupta & Shivay Lamba",
      link: "https://colocatedeventsna2025.sched.com/event/28D7e/building-secure-mlops-pipelines-with-kitops-+-argo-workflows-shivay-lamba-couchbase-ekansh-gupta-signoz?iframe=no&w=100%&sidebar=yes&bg=no"
    },
    {
      time: "// 4:35 PM EST",
      title: "Skip the Deployment Queue: Automated Rollouts and Rollbacks using OpenFeature",
      speakers: "Ekansh Gupta & Shivay Lamba",
      link: "https://colocatedeventsna2025.sched.com/event/28D7z/skip-the-deployment-queue-automated-rollouts-and-rollbacks-using-openfeature-ekansh-gupta-signoz-shivay-lamba-couchbase?iframe=no&w=100%&sidebar=yes&bg=no"
    }
  ],
  items2: [
    {
      time: "// 4 PM EST",
      title: "Designing Platforms with Judgement: Agentic Flows with K8GP",
      speakers: "Ekansh Gupta & Shivay Lamba",
      link: "https://kccncna2025.sched.com/event/27Fb7/designing-platforms-with-judgment-agentic-flows-with-mcp-shivay-lamba-couchbase-ekansh-gupta-signoz?iframe=yes&w=100%&sidebar=yes&bg=no"
    },
    {
      time: "// 5:41 PM EST",
      title: "Tracing the Untraceable: OpenTelemetry for Vibe-coded LLM Apps",
      speakers: "Pranay Prateek",
      link: "https://kccncna2025.sched.com/event/27Fcf/cl-lightning-talk-tracing-the-untraceable-opentelemetry-for-vibe-coded-llm-apps-pranay-prateek-signoz?iframe=no&w=100%25&sidebar=yes&bg=no"
    }
  ]
};

const KubeConPage: React.FC = () => {
  return (
    <div className="min-h-screen w-[80vw] mx-auto border-x border-dashed border-signoz_slate-400">
      <KubeconHeroSection /> 

      <TalksLayout
        title={talks.title}
        viewSchedule={talks.viewSchedule}
        viewScheduleLink={talks.viewScheduleLink}
      >
        <div className="font-mono mb-4 text-xs">{`// WED NOV 10`}</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {talks.items1.map((talk, index) => (
            <Card
              key={index}
              className="rounded-lg transition-colors duration-200 bg-signoz_ink-500/50 [&>*]:border-1 [&>*]:border-solid [&>*]:border-signoz_slate-200/50"
            >
              <div className="py-4 px-6">
                <div className="text-xs font-mono mb-4">{talk.time}</div>
                <h4 className="font-semibold mb-3">{talk.title}</h4>
                <span className="text-gray-400 flex items-center gap-2 justify-between">
                  {talk.speakers} 
                  <Button variant="secondary" href={talk.link} rounded="full" className="flex items-center gap-2 w-fit">
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </span>
              </div>
            </Card>
          ))}
        </div>
        <div className="font-mono my-4 text-xs">{`// WED NOV 12`}</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {talks.items2.map((talk, index) => (
            <Card
              key={index}
              className="rounded-lg transition-colors duration-200 bg-signoz_ink-500/50 [&>*]:border-1 [&>*]:border-solid [&>*]:border-signoz_slate-200/50"
            >
              <div className="py-4 px-6">
                <div className="font-mono mb-4 text-xs">{talk.time}</div>
                <h4 className="font-semibold mb-3">{talk.title}</h4>
                <span className="text-gray-400 flex items-center gap-2 justify-between">
                  {talk.speakers} 
                  <Button variant="secondary" rounded="full" className="flex items-center gap-2 w-fit" href={talk.link}>
                    <ArrowRight className="w-5 h-5" />
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
  );
};

export default KubeConPage;