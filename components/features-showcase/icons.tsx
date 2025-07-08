import React from 'react'
import { Server } from 'lucide-react'
import Image from 'next/image'
import { 
  SiJavascript, 
  SiPython, 
  SiGo, 
  SiDotnet, 
  SiNodedotjs,
  SiKubernetes,
  SiDocker,
  SiAmazonwebservices,
  SiPostgresql,
  SiRedis,
  SiMongodb,
  SiPrometheus,
  SiApachekafka,
  SiNginx,
  SiTemporal
} from 'react-icons/si'
import { FaFileAlt } from 'react-icons/fa'

// Base icon configuration type
type IconConfig = {
  name: string
  icon: React.ReactNode
}

// Centralized icon definitions with lazy loading capability
export const techIcons: Record<string, IconConfig> = {
  // Languages
  javascript: {
    icon: <SiJavascript className="h-5 w-5 text-yellow-500" />,
    name: 'JavaScript',
  },
  python: {
    icon: <SiPython className="h-5 w-5 text-blue-500" />,
    name: 'Python',
  },
  go: {
    icon: <SiGo className="h-5 w-5 text-cyan-500" />,
    name: 'Go',
  },
  dotnet: {
    icon: <SiDotnet className="h-5 w-5 text-purple-500" />,
    name: '.NET',
  },
  nodejs: {
    icon: <SiNodedotjs className="h-5 w-5 text-green-500" />,
    name: 'NodeJS',
  },

  // Infrastructure
  kubernetes: {
    icon: <SiKubernetes className="h-5 w-5 text-blue-600" />,
    name: 'Kubernetes',
  },
  docker: {
    icon: <SiDocker className="h-5 w-5 text-blue-400" />,
    name: 'Docker',
  },
  aws: {
    icon: <SiAmazonwebservices className="h-5 w-5 text-orange-400" />,
    name: 'AWS',
  },

  // Databases
  postgresql: {
    icon: <SiPostgresql className="h-5 w-5 text-blue-600" />,
    name: 'PostgreSQL',
  },
  redis: {
    icon: <SiRedis className="h-5 w-5 text-red-500" />,
    name: 'Redis',
  },
  mongodb: {
    icon: <SiMongodb className="h-5 w-5 text-green-600" />,
    name: 'MongoDB',
  },

  // Other tools
  prometheus: {
    icon: <SiPrometheus className="h-5 w-5 text-orange-500" />,
    name: 'Prometheus',
  },
  kafka: {
    icon: <SiApachekafka className="h-5 w-5 text-white" />,
    name: 'Apache Kafka',
  },
  nginx: {
    icon: <SiNginx className="h-5 w-5 text-green-600" />,
    name: 'Nginx',
  },
  temporal: {
    icon: <SiTemporal className="h-5 w-5 text-purple-500" />,
    name: 'Temporal',
  },

  // Static icons (already lightweight)
  java: {
    icon: <Image src="/img/icons/java-icon.svg" alt="Java" width={20} height={20} />,
    name: 'Java',
  },
  hostMonitoring: {
    icon: <Server className="h-5 w-5 text-orange-500" />,
    name: 'Host Monitoring',
  },
  logFiles: {
    icon: <FaFileAlt className="h-5 w-5 text-orange-500" />,
    name: 'Log Files',
  },
}

// Helper function to get icon component
export const getIcon = (iconKey: keyof typeof techIcons) => {
  const iconConfig = techIcons[iconKey]
  if (!iconConfig) return null
  return iconConfig.icon
}

// Export type for use in data.tsx
export type TechIconKey = keyof typeof techIcons
