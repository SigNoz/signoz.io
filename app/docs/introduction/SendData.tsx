'use client'

import React from 'react'
import { ArrowRight, LucideDraftingCompass, LucideScrollText, LucideChartNoAxesColumn } from 'lucide-react'
import { 
  SiJavascript, 
  SiPython, 
  SiOpenjdk, 
  SiGo, 
  SiKubernetes, 
  SiDocker 
} from 'react-icons/si'
import TrackingLink from '@/components/TrackingLink'

interface LanguageLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  clickName: string;
}

interface CardData {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  clickName: string;
  clickText: string;
  languages: LanguageLink[];
  viewAllHref: string;
}

export default function SendData() {
  const cardData: CardData[] = [
    {
      title: "Auto Instrument",
      description: "Automatic instrumentation for popular frameworks",
      href: "/docs/instrumentation/",
      icon: <LucideDraftingCompass size={20} className="text-signoz_robin-500" />,
      clickName: "Auto Instrument Card",
      clickText: "Auto Instrument",
      languages: [
        {
          name: "JavaScript",
          href: "/docs/instrumentation/javascript/",
          icon: <SiJavascript className="w-5 h-5 text-yellow-500" />,
          clickName: "JavaScript Link"
        },
        {
          name: "Python",
          href: "/docs/instrumentation/python/",
          icon: <SiPython className="w-5 h-5 text-blue-500" />,
          clickName: "Python Link"
        },
        {
          name: "Java",
          href: "/docs/instrumentation/java/",
          icon: <img src="/img/icons/java-icon.svg" alt="Java" className="w-5 h-5" />,
          clickName: "Java Link"
        },
        {
          name: "Go",
          href: "/docs/instrumentation/golang/",
          icon: <SiGo className="w-5 h-5 text-cyan-500" />,
          clickName: "Go Link"
        }
      ],
      viewAllHref: "/docs/instrumentation/"
    },
    {
      title: "Send Logs",
      description: "Configure log collection and analysis",
      href: "/docs/userguide/logs/",
      icon: <LucideScrollText size={20} className="text-signoz_robin-500" />,
      clickName: "Send Logs Card",
      clickText: "Send Logs",
      languages: [
        {
          name: "Kubernetes",
          href: "/docs/userguide/collect_kubernetes_pod_logs/",
          icon: <SiKubernetes className="w-5 h-5 text-blue-600" />,
          clickName: "Kubernetes Link"
        },
        {
          name: "Docker",
          href: "/docs/userguide/collect_docker_logs/",
          icon: <SiDocker className="w-5 h-5 text-blue-400" />,
          clickName: "Docker Link"
        },
        {
          name: "Python",
          href: "/docs/userguide/python-logs-auto-instrumentation/",
          icon: <SiPython className="w-5 h-5 text-blue-500" />,
          clickName: "Python Logs Link"
        },
        {
          name: "JavaScript",
          href: "/docs/logs-management/send-logs/nodejs-pino-logs/",
          icon: <SiJavascript className="w-5 h-5 text-yellow-500" />,
          clickName: "JavaScript Logs Link"
        }
      ],
      viewAllHref: "/docs/userguide/logs/"
    },
    {
      title: "Send Metrics",
      description: "Configure metrics collection and visualization",
      href: "/docs/userguide/send-metrics-cloud/",
      icon: <LucideChartNoAxesColumn size={20} className="text-signoz_robin-500" />,
      clickName: "Send Metrics Card",
      clickText: "Send Metrics",
      languages: [
        {
          name: "Docker",
          href: "/docs/metrics-management/docker-container-metrics/",
          icon: <SiDocker className="w-5 h-5 text-blue-400" />,
          clickName: "Docker Metrics Link"
        },
        {
          name: "JavaScript",
          href: "/docs/instrumentation/manual-instrumentation/javascript/opentelemetry-nodejs/#set-up-custom-metrics",
          icon: <SiJavascript className="w-5 h-5 text-yellow-500" />,
          clickName: "JavaScript Metrics Link"
        },
        {
          name: "Python",
          href: "/docs/userguide/send-metrics-cloud/",
          icon: <SiPython className="w-5 h-5 text-blue-500" />,
          clickName: "Python Metrics Link"
        },
        {
          name: "Go",
          href: "/docs/userguide/send-metrics-cloud/",
          icon: <SiGo className="w-5 h-5 text-cyan-500" />,
          clickName: "Go Metrics Link"
        }
      ],
      viewAllHref: "/docs/userguide/send-metrics-cloud/"
    }
  ];

  return (
    <div className="mb-12 w-full max-w-7xl mx-auto">
      <div className="text-left mb-6">
        <h2 className="text-2xl font-semibold mb-2 text-signoz_vanilla-100">
          Start sending data to SigNoz
        </h2>
        <p className="text-signoz_vanilla-400 text-base">
          Connect your application to SigNoz in just a few minutes
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {cardData.map((card, index) => (
          <TrackingLink
            key={index}
            href={card.href}
            className="flex flex-col p-4 rounded-lg border border-signoz_slate-400 bg-signoz_ink-400 hover:bg-signoz_ink-300 hover:border-signoz_robin-500 transition-all"
            clickType="Card Click"
            clickName={card.clickName}
            clickText={card.clickText}
            clickLocation="Send Data Section"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-signoz_robin-500/10 text-signoz_robin-500">
                {card.icon}
              </div>
              <div>
                <h3 className="font-bold mb-1 text-base text-signoz_vanilla-100">{card.title}</h3>
                <p className="text-sm mb-0 text-signoz_vanilla-400">{card.description}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 my-2">
              {card.languages.map((lang, langIndex) => (
                <TrackingLink
                  key={langIndex}
                  href={lang.href}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-signoz_robin-500/10 transition-colors"
                  clickType="Secondary CTA"
                  clickName={lang.clickName}
                  clickText={lang.name}
                  clickLocation="Send Data Section"
                >
                  {lang.icon}
                  <span className="text-sm text-signoz_vanilla-100">{lang.name}</span>
                  <ArrowRight className="ml-1 h-3 w-3 text-signoz_vanilla-400" />
                </TrackingLink>
              ))}
            </div>
            <div className="mt-4 text-sm">
              <div className="text-signoz_robin-500 inline-flex items-center hover:text-signoz_robin-400 transition-colors">
                View all options <ArrowRight className="ml-1 h-3 w-3" />
              </div>
            </div>
          </TrackingLink>
        ))}
      </div>
    </div>
  )
}
