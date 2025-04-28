'use client'

import React from 'react'
import {
  DollarSign,
  TrendingUp,
  GitBranch,
  BarChart2,
  Puzzle,
  GraduationCap,
  Rocket,
  Users,
  Wallet,
} from 'lucide-react'
import {
  ICON_YEARS_OLD,
  ICON_EMPLOYEES,
  ICON_FUNDING,
  ICON_BUDGET_FRIENDLY,
  ICON_SCALE_GROW,
  ICON_OPEN_SOURCE,
  ICON_ROI,
  ICON_ALL_IN_ONE,
  ICON_COMMUNITY,
} from './icons-constants'

// Client component that renders the icons
export function IconRenderer({
  iconName,
  className = '',
}: {
  iconName: string
  className?: string
}) {
  switch (iconName) {
    // Eligibility icons
    case ICON_YEARS_OLD:
      return <Rocket className={className || 'h-5 w-5 text-yellow-400'} />
    case ICON_EMPLOYEES:
      return <Users className={className || 'h-5 w-5 text-blue-400'} />
    case ICON_FUNDING:
      return <Wallet className={className || 'h-5 w-5 text-green-400'} />

    // Feature icons
    case ICON_BUDGET_FRIENDLY:
      return <DollarSign className={className || 'text-primary text-2xl'} />
    case ICON_SCALE_GROW:
      return <TrendingUp className={className || 'text-2xl text-[#3B82F6]'} />
    case ICON_OPEN_SOURCE:
      return <GitBranch className={className || 'text-2xl text-[#F76B4A]'} />
    case ICON_ROI:
      return <BarChart2 className={className || 'text-2xl text-green-500'} />
    case ICON_ALL_IN_ONE:
      return <Puzzle className={className || 'text-2xl text-purple-500'} />
    case ICON_COMMUNITY:
      return <GraduationCap className={className || 'text-2xl text-yellow-500'} />
    default:
      return null
  }
}
