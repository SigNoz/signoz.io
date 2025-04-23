'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, GitBranch, BarChart2 Puzzle, GraduationCap } from 'lucide-react'

const featureItems = [
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
    icon: <BarChart2 className="text-2xl text-green-500" />,
    title: '9X ROI vs DataDog',
    description:
      'SigNoz provides up to 9X return on investment compared to DataDog for growing startups.',
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const Features = () => {
  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold">
            Why Startups <span className="gradient-text pinkish-gradient">Choose SigNoz</span>
          </h2>
          <p className="text-lg text-gray-300">All your observability needs at one place.</p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {featureItems.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`rounded-xl border border-gray-800 bg-[#1c1c21]/60 p-6 ${feature.hoverBorder} transition-all duration-300 hover:shadow-lg ${feature.hoverShadow}`}
              whileHover={{ y: -5 }}
            >
              <div
                className={`rounded-lg ${feature.bgColor} mb-5 flex h-14 w-14 items-center justify-center`}
              >
                {feature.icon}
              </div>
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Features
