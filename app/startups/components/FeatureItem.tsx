'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { IconRenderer } from '../icons'

type FeatureItemProps = {
  feature: {
    iconName: string
    title: string
    description: string
    bgColor: string
    hoverBorder: string
    hoverShadow: string
  }
  index: number
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

export default function FeatureItem({ feature, index }: FeatureItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`rounded-xl border border-gray-800 bg-[#1c1c21]/60 p-6 ${feature.hoverBorder} transition-all duration-300 hover:shadow-lg ${feature.hoverShadow}`}
      whileHover={{ y: -5 }}
    >
      <div
        className={`rounded-lg ${feature.bgColor} mb-5 flex h-14 w-14 items-center justify-center`}
      >
        <IconRenderer iconName={feature.iconName} />
      </div>
      <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
      <p className="text-gray-300">{feature.description}</p>
    </motion.div>
  )
}
