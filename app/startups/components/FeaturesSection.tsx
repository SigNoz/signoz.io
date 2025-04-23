import React from 'react'
import { DollarSign, TrendingUp, GitBranch, Headphones, Puzzle, GraduationCap } from 'lucide-react'
import FeatureItem from './FeatureItem'

// Static data that can be server-rendered
export const featureItems = [
  {
    icon: <DollarSign className="text-primary text-2xl" />,
    title: 'Budget-Friendly',
    description:
      'Special pricing tailored for startups with limited resources. 50% off standard pricing.',
    bgColor: 'bg-primary/10',
    hoverBorder: 'hover:border-primary/40',
    hoverShadow: 'hover:shadow-primary/5',
  },
  {
    icon: <TrendingUp className="text-2xl text-[#3B82F6]" />,
    title: 'Scale as You Grow',
    description:
      'Start small and scale your observability as your startup expands, without upfront costs.',
    bgColor: 'bg-[#3B82F6]/10',
    hoverBorder: 'hover:border-[#3B82F6]/40',
    hoverShadow: 'hover:shadow-[#3B82F6]/5',
  },
  {
    icon: <GitBranch className="text-2xl text-[#F76B4A]" />,
    title: 'Open Source Core',
    description:
      'Built on OpenTelemetry, avoiding vendor lock-in while providing flexible deployment options.',
    bgColor: 'bg-[#F76B4A]/10',
    hoverBorder: 'hover:border-[#F76B4A]/40',
    hoverShadow: 'hover:shadow-[#F76B4A]/5',
  },
  {
    icon: <Headphones className="text-2xl text-green-500" />,
    title: 'Dedicated Support',
    description:
      'Priority access to our technical team for implementation and troubleshooting assistance.',
    bgColor: 'bg-green-500/10',
    hoverBorder: 'hover:border-green-500/40',
    hoverShadow: 'hover:shadow-green-500/5',
  },
  {
    icon: <Puzzle className="text-2xl text-purple-500" />,
    title: 'All-in-One Solution',
    description:
      'Metrics, traces, and logs in a single platform. No need for multiple tool subscriptions.',
    bgColor: 'bg-purple-500/10',
    hoverBorder: 'hover:border-purple-500/40',
    hoverShadow: 'hover:shadow-purple-500/5',
  },
  {
    icon: <GraduationCap className="text-2xl text-yellow-500" />,
    title: 'Startup Community',
    description:
      'Join a community of fellow startups to share observability best practices and insights.',
    bgColor: 'bg-yellow-500/10',
    hoverBorder: 'hover:border-yellow-500/40',
    hoverShadow: 'hover:shadow-yellow-500/5',
  },
]

export default function FeaturesSection() {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Why Startups <span className="gradient-text pinkish-gradient">Choose SigNoz</span>
          </h2>
          <p className="text-lg text-gray-300">
            Get all the observability tools you need without the enterprise price tag.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featureItems.map((feature, index) => (
            <FeatureItem key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
