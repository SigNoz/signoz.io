'use client'

import Image from 'next/image'
import { FileCode } from 'lucide-react'
import type { IconType } from 'react-icons'
import {
  SiAngular,
  SiDotnet,
  SiElixir,
  SiGo,
  SiJavascript,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPython,
  SiReact,
  SiRubyonrails,
  SiRust,
  SiSpring,
  SiTypescript,
} from 'react-icons/si'

import { normalizeLanguage } from './navigation'

const brandColors: Record<string, string> = {
  javascript: '#f7df1e',
  typescript: '#3178c6',
  nodejs: '#539e43',
  nextjs: '#ffffff',
  nestjs: '#e0234e',
  python: '#3776ab',
  java: '#f89820',
  spring: '#6db33f',
  dotnet: '#512bd4',
  net: '#512bd4',
  golang: '#00add8',
  go: '#00add8',
  php: '#777bb4',
  ruby: '#cc342d',
  rust: '#dea584',
  angular: '#dd0031',
  react: '#61dafb',
}

const iconMap: Record<string, IconType> = {
  javascript: SiJavascript,
  typescript: SiTypescript,
  nodejs: SiNodedotjs,
  node: SiNodedotjs,
  nextjs: SiNextdotjs,
  nestjs: SiNestjs,
  python: SiPython,
  spring: SiSpring,
  dotnet: SiDotnet,
  net: SiDotnet,
  golang: SiGo,
  go: SiGo,
  php: SiPhp,
  ruby: SiRubyonrails,
  rust: SiRust,
  angular: SiAngular,
  react: SiReact,
  elixir: SiElixir,
}

export function LanguageIcon({ lang }: { lang: string }) {
  const normalized = normalizeLanguage(lang)
  const size = 16
  const IconComp = iconMap[normalized]
  const color = brandColors[normalized] || '#9ca3af'

  if (normalized === 'java') {
    return (
      <Image
        src="/img/icons/java-icon.svg"
        alt="Java"
        width={size}
        height={size}
        className="h-[16px] w-[16px]"
      />
    )
  }

  if (IconComp) {
    return <IconComp size={size} color={color} />
  }

  return <FileCode size={size} color={color} />
}
