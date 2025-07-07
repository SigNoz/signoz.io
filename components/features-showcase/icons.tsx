import React from 'react'
import dynamic from 'next/dynamic'
import { LucideServer, Server } from 'lucide-react'
import Image from 'next/image'

// Type for icon loaders
type IconLoader = () => Promise<{ default: React.ComponentType<{ className?: string }> }>

// Icon component wrappers with loading states
const IconWrapper: React.FC<{ 
  icon: React.ReactNode | IconLoader
  className?: string 
}> = ({ icon, className }) => {
  if (React.isValidElement(icon)) {
    return <>{icon}</>
  }
  
  // For dynamic imports (future use)
  const DynamicIcon = dynamic(icon as IconLoader, {
    loading: () => <div className={`${className} animate-pulse bg-gray-300 rounded`} />,
  })
  
  return <DynamicIcon className={className} />
}

// Centralized icon definitions with lazy loading capability
export const techIcons = {
  // Languages
  javascript: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiJavascript })),
    className: 'h-5 w-5 text-yellow-500',
    name: 'JavaScript',
  },
  python: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiPython })),
    className: 'h-5 w-5 text-blue-500',
    name: 'Python',
  },
  go: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiGo })),
    className: 'h-5 w-5 text-cyan-500',
    name: 'Go',
  },
  dotnet: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiDotnet })),
    className: 'h-5 w-5 text-purple-500',
    name: '.NET',
  },
  nodejs: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiNodedotjs })),
    className: 'h-5 w-5 text-green-500',
    name: 'NodeJS',
  },
  
  // Infrastructure
  kubernetes: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiKubernetes })),
    className: 'h-5 w-5 text-blue-600',
    name: 'Kubernetes',
  },
  docker: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiDocker })),
    className: 'h-5 w-5 text-blue-400',
    name: 'Docker',
  },
  aws: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiAmazonwebservices })),
    className: 'h-5 w-5 text-orange-400',
    name: 'AWS',
  },
  
  // Databases
  postgresql: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiPostgresql })),
    className: 'h-5 w-5 text-blue-600',
    name: 'PostgreSQL',
  },
  redis: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiRedis })),
    className: 'h-5 w-5 text-red-500',
    name: 'Redis',
  },
  mongodb: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiMongodb })),
    className: 'h-5 w-5 text-green-600',
    name: 'MongoDB',
  },
  
  // Other tools
  prometheus: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiPrometheus })),
    className: 'h-5 w-5 text-orange-500',
    name: 'Prometheus',
  },
  kafka: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiApachekafka })),
    className: 'h-5 w-5 text-white',
    name: 'Apache Kafka',
  },
  nginx: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiNginx })),
    className: 'h-5 w-5 text-green-600',
    name: 'Nginx',
  },
  temporal: {
    icon: () => import('react-icons/si').then(mod => ({ default: mod.SiTemporal })),
    className: 'h-5 w-5 text-purple-500',
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
    icon: () => import('react-icons/fa').then(mod => ({ default: mod.FaFileAlt })),
    className: 'h-5 w-5 text-orange-500',
    name: 'Log Files',
  },
}

// Helper function to get icon component
export const getIcon = (iconKey: keyof typeof techIcons) => {
  const iconConfig = techIcons[iconKey]
  if (!iconConfig) return null
  
  if (React.isValidElement(iconConfig.icon)) {
    return iconConfig.icon
  }
  
  // For dynamic imports
  return <IconWrapper icon={iconConfig.icon} className={iconConfig.className} />
}

// Export type for use in data.tsx
export type TechIconKey = keyof typeof techIcons