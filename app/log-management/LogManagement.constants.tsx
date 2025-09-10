import TabItem from "@/components/TabItem";
import Tabs from "@/components/Tabs";
import Button from "@/components/ui/Button";
import { Badge } from "@signozhq/badge";
import Image from "next/image";
import AutoCarousel from "./AutoCarousel";
import { Atom, Coins, DatabaseZap } from "lucide-react";
import { Card } from "@/components/ui/Card";

const CORRELATION_IMAGES = [
  {
    src: "/img/log-management/Logs-to-Metrics.png",
    alt: "Correlation Example 1"
  },
  {
    src: "/img/log-management/APM-to-Logs.png",
    alt: "Correlation Example 2"
  },
  {
    src: "/img/log-management/trace_id.png",
    alt: "Correlation Example 3"
  }
];

export const FEATURES = [
    {
      title: "Ingest Logs from Anywhere",
      description: "Get native infrastructure support to securely store logs from anywhere. With multiple collection methods to pick up, and bring your own tools to make data ingestion powered by OpenTelemetry standards.",
      buttonText: "Read Documentation",
      buttonLink: "/docs/userguide/logs/",
      component: (
        <Card className="p-0 w-full bg-transparent [&>div]:border-1 [&>*]:p-4">
        <Tabs entityName="sources">
          <TabItem value="supported-sources" label="Supported Sources">
            <div className="flex flex-col gap-4 min-h-52">
              <div className="grid grid-cols-2 gap-4">
                <div className="border-r-1 border-signoz_slate-400 border-dashed">
                  <h3 className="mb-4 text-sm font-medium uppercase text-signoz_vanilla-400 text-xs">CLOUD</h3>
                  <div className="flex justify-start items-center gap-4">
                    <div className="flex items-center">
                      <Image src="/img/icons/aws-icon.svg" alt="AWS" className="h-8" width={32} height={32} />
                    </div>
                    <div className="flex items-center">
                      <Image src="/img/icons/gcp-icon.svg" alt="Google Cloud" className="h-8" width={32} height={32} />
                    </div>
                    <div className="flex items-center">
                      <Image src="/img/icons/azure-icon.svg" alt="Azure" className="h-8" width={32} height={32} />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-sm font-medium uppercase text-signoz_vanilla-400 text-xs">CONTAINERS</h3>
                  <div className="flex justify-start items-center gap-4">
                    <div className="flex items-center">
                      <Image src="/img/icons/docker-icon.svg" alt="Docker" className="h-8" width={32} height={32} />
                    </div>
                    <div className="flex items-center">
                      <Image src="/img/icons/kubernetes-icon.svg" alt="Kubernetes" className="h-8" width={32} height={32} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b-1 border-signoz_slate-400 border-dashed" />
  
              <div>
                <h3 className="mb-4 text-sm font-medium uppercase text-signoz_vanilla-400 text-xs">POPULAR TOOLS</h3>
                <div className="flex justify-start items-center gap-4">
                  <div className="flex items-center">
                    <Image src="/img/icons/heroku-icon.svg" alt="Heroku" className="h-8" width={32} height={32} />
                  </div>
                  <div className="flex items-center">
                    <Image src="/img/icons/fluentd-icon.svg" alt="Fluentd" className="h-8" width={32} height={32} />
                  </div>
                  <div className="flex items-center">
                    <Image src="/img/icons/vercel-icon.svg" alt="Vercel" className="h-8" width={32} height={32} />
                  </div>
                  <div className="flex items-center">
                    <Image src="/img/icons/redis-icon.svg" alt="Redis" className="h-8" width={32} height={32} />
                  </div>
                  <div className="flex items-center">
                    <Image src="/img/icons/mongo-icon.svg" alt="Mongo" className="h-8" width={32} height={32} />
                  </div>
                  <div className="flex items-center">
                    <Image src="/img/icons/nginx-icon.svg" alt="Nginx" className="h-8" width={32} height={32} />
                  </div>
                </div>
              </div>
              <Button variant="ghost" to="/docs/logs-management/send-logs-to-signoz/" rounded="full" size={null} className="flex justify-center items-center gap-2 w-fit hover:bg-transparent text-xs">
                VIEW ALL 50+ SOURCES
              </Button>
            </div>
          </TabItem>
          <TabItem value="collection-methods" label="Collection Methods">
            <div className="flex flex-col gap-8 min-h-52">
              <div className="flex items-center md:flex-row flex-col gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-sm font-medium uppercase text-signoz_vanilla-400 m-0 text-xs">OPENTELEMETRY</h3>
                    <Badge color="vanilla" className="text-xs">Recommended</Badge>
                  </div>
                  <div className="flex items-center gap-8">
                    <Image src="/img/website/opentelemetry-icon-color.svg" alt="OpenTelemetry" className="h-8" width={32} height={32} />
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-sm font-medium uppercase text-signoz_vanilla-400 text-xs">EXISTING AGENTS</h3>
                  <div className="flex justify-start items-center gap-4">
                    <div className="flex items-center">
                      <Image src="/img/icons/fluentd-icon.svg" alt="Fluentd" className="h-8" width={32} height={32} />
                    </div>
                    <div className="flex items-center">
                      <Image src="/img/icons/fluentbit-icon.svg" alt="Fluentbit" className="h-8" width={32} height={32} />
                    </div>
                    <div className="flex items-center">
                      <Image src="/img/icons/logstash-icon.svg" alt="Logstash" className="h-8" width={32} height={32} />
                    </div>
                  </div>
                </div>
              </div>
  
              <div>
                <h3 className="mb-4 text-sm font-medium uppercase text-signoz_vanilla-400 text-xs">DIRECT INTEGRATIONS</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge color="vanilla" className="rounded-sm">HTTP Endpoints</Badge>
                  <Badge color="vanilla" className="rounded-sm">SDK Integrations</Badge>
                  <Badge color="vanilla" className="rounded-sm">Legacy support</Badge>
                </div>
              </div>
  
              {/* View Integration Guides */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" rounded="full" size={null} className="hover:bg-transparent text-xs" to="/docs/logs-management/send-logs-to-signoz/">
                  VIEW INTEGRATION GUIDES
                </Button>
              </div>
            </div>
          </TabItem>
        </Tabs>
        </Card>
      )
    },
    {
      title: "Process on the Fly",
      description: "A powerful log pipeline helps you analyze everything you ingest, including service maps, application logs, and exceptions. Monitoring is effortless using lifecycle alerts including storage usage limits. Manual data manipulation is eliminated.",
      buttonText: "Read Documentation",
      buttonLink: "/docs/logs-pipelines/concepts/",
      component: <Image src="/img/log-management/process-logs.png" alt="Process on the Fly" width={10000} height={10000} />
    },
    {
      title: "Correlate your Signals",
      description: "Monitor logs and traces automatically and easily debug from APM traces to related logs. Metrics correlation is log-based, and easy to add with OpenTelemetry standards.",
      buttonText: "Read Blog",
      buttonLink: "/opentelemetry/correlating-traces-logs-metrics-nodejs/",
      component: <AutoCarousel images={CORRELATION_IMAGES} />
    },
    {
      title: "Analyze the Logs",
      description: "Optimized columnar storage design provides the high performance capabilities to scale storage and query millions of logs. Use dynamic alerts, advanced dashboards, and more integrated metrics to get advanced correlation filtering.",
      buttonText: "Read Documentation",
      buttonLink: "/docs/userguide/logs_query_builder/",
      component: <Image src="/img/log-management/analyse-the-logs.png" alt="Analyze the Logs" width={10000} height={10000} />
    }
  ]

  export const TESTIMONIALS = [
    {
      name: "Charlie Shen",
      role: "Lead DevOps Engineer, Brainfish",
      testimonial: "I've studied more than 10 observability tools in the market. We eventually landed on SigNoz, which says a lot. Compared to Elastic Cloud, it's a breeze with SigNoz.",
      image: "/img/case_study/profile-photos/brainfish.webp"
    },
    {
      name: "Niranjan Ravichandra",
      role: "Co-founder & CTO, Cedana",
      testimonial: "Getting started with SigNoz was incredibly easy. We were able to set up the OpenTelemetry collector quickly and start monitoring our systems almost immediately.",
      image: "/img/case_study/profile-photos/cedana.webp"
    },
    {
      name: "Poonkuyilan V",
      role: "IT Infrastructure Lead, The Hindu",
      testimonial: "Recently, we configured alerts for pod restarts and were able to quickly identify and resolve the root cause before it escalated. Additionally, SigNoz's tracing capabilities helped us spot unwanted calls to third-party systems, allowing us to optimize our applications.",
      image: "/img/case_study/profile-photos/the-hindu.png"
    },
    {
      name: "Avneesh Kumar",
      role: "VP of Engineering, Mailmodo",
      testimonial: "We have started saving almost six hours on a daily basis, which we can now invest in other tech debts and backlogs. The best thing about SigNoz is that it's open source. I can go into the source code and look at what's happening. That's a great confidence booster for long-term usage.",
      image: "/img/case_study/profile-photos/mailmodo.webp"
    },
    {
      name: "Khushhal Reddy",
      role: "Senior Backend Engineer, Kiwi",
      testimonial: "SigNoz is something we use daily. If I have ten tabs open, six of them are SigNoz. We used traces and it helped us take 30 seconds down to 3 seconds.",
      image: "/img/case_study/profile-photos/kiwi.webp"
    }
  ];

  export const CARDS = [
    {
      icon: <Atom />, 
      title: "Advanced Query Builder", 
      description: "Auto-suggestions, JSON filtering, and one-click dashboard creation without learning complex syntax."
    }, 
    {
      icon: <Coins />, 
      title: "Transparent Pricing", 
      description: "Starts at $0.30 per GB with no user seat limitations or hidden retention fees."
    }, 
    {
      icon: <DatabaseZap />, 
      title: "Smart Tiered Storage", 
      description: "Configurable hot retention periods to balance query performance for long-term compliance needs."
    }
  ];