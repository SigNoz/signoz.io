import type { ComponentItem } from './types'
import { APM_QUICK_START_ITEMS } from './apmQuickStart'
import { LOGS_QUICK_START_ITEMS } from './logsQuickStart'
import { MIGRATE_TO_SIGNOZ_ITEMS } from './migrateToSignoz'
import { LLM_MONITORING_ITEMS } from './llmMonitoring'
import { AZURE_ONE_CLICK_ITEMS } from './azureOneClick'
import { APM_DASHBOARDS_ITEMS } from './apmDashboards'
import { HOST_METRICS_DASHBOARDS_ITEMS } from './hostMetricsDashboards'
import { KUBERNETES_DASHBOARDS_ITEMS } from './kubernetesDashboards'
import { LITELLM_DASHBOARDS_ITEMS } from './litellmDashboards'
import { K8S_INSTALLATION_ITEMS } from './k8sInstallation'
import { MARKETPLACE_INSTALLATION_ITEMS } from './marketplaceInstallation'
import { WEB_VITALS_ITEMS } from './webVitals'
import { APM_INSTRUMENTATION_ITEMS } from './apmInstrumentation'
import { JAVASCRIPT_INSTRUMENTATION_ITEMS } from './javascriptInstrumentation'
import { JAVA_INSTRUMENTATION_ITEMS } from './javaInstrumentation'
import { LOGS_INSTRUMENTATION_ITEMS } from './logsInstrumentation'
import { METRICS_QUICK_START_ITEMS } from './metricsQuickStart'
import { COLLECTION_AGENTS_ITEMS } from './collectionAgents'
import { SELF_HOST_INSTALLATION_ITEMS } from './selfHostInstallation'
import { AWS_MONITORING_ITEMS } from './awsMonitoring'
import { AWS_ONE_CLICK_ITEMS } from './awsOneClick'
import { CICD_MONITORING_ITEMS } from './cicdMonitoring'
import { INTEGRATIONS_ITEMS } from './integrations'
import { DASHBOARD_TEMPLATES_ITEMS } from './dashboardTemplates'

export interface ListicleSubsectionDef {
  id: string
  title: string
  trackingName?: string
}

export interface ListicleSectionDef {
  id: string
  label: string
  title?: string
  trackingName?: string
  /** Key in the data object if different from id (e.g. id='web-servers' but data key='webServers') */
  dataKey?: string
  /** For nested data within a section (e.g. cloud: { aws: [], azure: [], gcp: [] }) */
  subsections?: ListicleSubsectionDef[]
}

type FlatItems = readonly ComponentItem[]
type SectionedItems = Record<string, FlatItems | Record<string, FlatItems>>

export interface ListicleConfig {
  items: FlatItems | SectionedItems
  sections?: ListicleSectionDef[]
  gridCols?: string
  sectionName?: string
  viewAllHref?: string
  viewAllText?: string
  title?: string
  description?: string
  searchable?: boolean
  searchPlaceholder?: string
  hashNavigation?: boolean
  /** Show all sections without tab navigation */
  staticSections?: boolean
}

export const LISTICLE_REGISTRY: Record<string, ListicleConfig> = {
  // ── Flat displays ──────────────────────────────────────────────────
  apmQuickStart: {
    items: APM_QUICK_START_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    sectionName: 'Instrumentation Languages Section',
    viewAllHref: '/docs/instrumentation/',
    viewAllText: 'View all languages and frameworks',
  },
  logsQuickStart: {
    items: LOGS_QUICK_START_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    sectionName: 'Logs Sources Section',
    viewAllHref: '/docs/logs-management/send-logs-to-signoz',
    viewAllText: 'View all log sources',
  },
  migrateToSignoz: {
    items: MIGRATE_TO_SIGNOZ_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4',
    sectionName: 'Vendors Migrate Section',
    viewAllText: 'View all migration guides',
  },
  llmMonitoring: {
    items: LLM_MONITORING_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4',
    sectionName: 'LLM Monitoring Integrations Section',
    viewAllText: 'View all LLM Monitoring Integrations',
  },
  azureOneClick: {
    items: AZURE_ONE_CLICK_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    sectionName: 'Azure One-Click Integrations',
  },
  apmDashboards: {
    items: APM_DASHBOARDS_ITEMS,
    gridCols: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
    sectionName: 'APM Dashboards Section',
    viewAllText: 'View all APM dashboards',
  },
  hostMetricsDashboards: {
    items: HOST_METRICS_DASHBOARDS_ITEMS,
    gridCols: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2',
    sectionName: 'Host Metrics Dashboards Section',
    viewAllText: 'View all Host Metrics dashboards',
  },
  kubernetesDashboards: {
    items: KUBERNETES_DASHBOARDS_ITEMS,
    gridCols: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2',
    sectionName: 'Kubernetes Dashboards Section',
    viewAllText: 'View all Kubernetes dashboards',
  },
  litellmDashboards: {
    items: LITELLM_DASHBOARDS_ITEMS,
    gridCols: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3',
    sectionName: 'LiteLLM Dashboards Section',
    viewAllText: 'View all LiteLLM dashboards',
  },
  k8sInstallation: {
    items: K8S_INSTALLATION_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    sectionName: 'Kubernetes',
    title: 'Install on Kubernetes',
  },
  marketplaceInstallation: {
    items: MARKETPLACE_INSTALLATION_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3',
    sectionName: 'all',
  },
  webVitals: {
    items: WEB_VITALS_ITEMS,
    gridCols: 'grid-cols-2',
    sectionName: 'Web Vitals Section',
    title: 'Web Vitals',
    description: 'Send web vitals to SigNoz using OpenTelemetry',
  },

  // ── Tabbed displays ────────────────────────────────────────────────
  apmInstrumentation: {
    items: APM_INSTRUMENTATION_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    sections: [
      { id: 'all', label: 'All' },
      { id: 'javascript', label: 'JavaScript', trackingName: 'JavaScript Frameworks' },
      { id: 'python', label: 'Python', trackingName: 'Python Frameworks' },
      { id: 'java', label: 'Java', trackingName: 'Java Frameworks' },
      { id: 'other', label: 'Other Languages' },
      { id: 'mobile', label: 'Mobile', trackingName: 'Mobile Frameworks' },
      { id: 'additional', label: 'Additional', trackingName: 'Additional Options' },
    ],
  },
  javascriptInstrumentation: {
    items: JAVASCRIPT_INSTRUMENTATION_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    sections: [
      { id: 'all', label: 'All' },
      {
        id: 'server',
        label: 'Back-end & Fullstack',
        title: 'Back-end & Fullstack Runtimes',
        trackingName: 'JavaScript Back-end Section',
      },
      { id: 'frontend', label: 'Frontend Monitoring', trackingName: 'JavaScript Frontend Section' },
      {
        id: 'advanced',
        label: 'Manual & Advanced',
        title: 'Manual & Advanced Control',
        trackingName: 'JavaScript Advanced Section',
      },
    ],
  },
  logsInstrumentation: {
    items: LOGS_INSTRUMENTATION_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    sections: [
      { id: 'all', label: 'All' },
      {
        id: 'platforms',
        label: 'Platforms',
        title: 'Container & Platform Logs',
        trackingName: 'Platform Logs',
      },
      {
        id: 'languages',
        label: 'Languages & Frameworks',
        title: 'Language & Framework Logs',
        trackingName: 'Language Logs',
      },
      {
        id: 'collectors',
        label: 'Collectors & Agents',
        title: 'Log Collectors & Agents',
        trackingName: 'Log Collectors',
      },
      {
        id: 'cloud',
        label: 'Cloud',
        title: 'Cloud Logs',
        subsections: [
          { id: 'aws', title: 'AWS', trackingName: 'AWS Services' },
          { id: 'azure', title: 'Azure', trackingName: 'Azure Services' },
          { id: 'gcp', title: 'GCP', trackingName: 'GCP' },
        ],
      },
    ],
  },
  metricsQuickStart: {
    items: METRICS_QUICK_START_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    hashNavigation: true,
    sections: [
      { id: 'all', label: 'All' },
      { id: 'collection', label: 'Collection', trackingName: 'Collection Metrics' },
      { id: 'infrastructure', label: 'Infrastructure', trackingName: 'Infrastructure Metrics' },
      { id: 'applications', label: 'Applications', trackingName: 'Application Metrics' },
      { id: 'databases', label: 'Databases', trackingName: 'Database Metrics' },
      {
        id: 'web-servers',
        label: 'Web Servers',
        dataKey: 'webServers',
        trackingName: 'Web Server Metrics',
      },
      { id: 'messaging', label: 'Messaging', trackingName: 'Messaging Metrics' },
      { id: 'runtimes', label: 'Runtimes', trackingName: 'Runtime Metrics' },
      {
        id: 'cloud-platforms',
        label: 'Cloud Platforms',
        dataKey: 'cloudPlatforms',
        trackingName: 'Cloud Platform Metrics',
      },
    ],
  },
  collectionAgents: {
    items: COLLECTION_AGENTS_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    sections: [
      { id: 'all', label: 'All' },
      { id: 'docker', label: 'Docker', title: 'Collection Agent on Docker' },
      { id: 'ecs', label: 'ECS', title: 'Collection Agent on AWS ECS' },
      { id: 'kubernetes', label: 'Kubernetes', title: 'Collection Agent on Kubernetes' },
      { id: 'vm', label: 'VM', title: 'Collection Agent on VM' },
    ],
  },
  selfHostInstallation: {
    items: SELF_HOST_INSTALLATION_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    sections: [
      { id: 'all', label: 'All' },
      { id: 'docker', label: 'Docker', title: 'Install on Docker' },
      { id: 'binary', label: 'Binary', title: 'Install Binary' },
      { id: 'kubernetes', label: 'Kubernetes', title: 'Install on Kubernetes' },
      { id: 'others', label: 'Others', title: 'Install on Others' },
    ],
  },
  awsMonitoring: {
    items: AWS_MONITORING_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    sections: [
      { id: 'all', label: 'All' },
      { id: 'compute', label: 'Compute' },
      { id: 'databases', label: 'Databases' },
      { id: 'networking', label: 'Networking' },
      { id: 'messaging', label: 'Messaging' },
      { id: 'storage', label: 'Storage' },
    ],
  },
  awsOneClick: {
    items: AWS_ONE_CLICK_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    sections: [
      { id: 'all', label: 'All' },
      { id: 'compute', label: 'Compute' },
      { id: 'databases', label: 'Databases' },
      { id: 'networking', label: 'Networking' },
      { id: 'messaging', label: 'Messaging' },
    ],
  },
  cicdMonitoring: {
    items: CICD_MONITORING_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    sections: [
      { id: 'all', label: 'All' },
      { id: 'github', label: 'GitHub', trackingName: 'GitHub Monitoring' },
      { id: 'jenkins', label: 'Jenkins', trackingName: 'Jenkins Monitoring' },
      { id: 'argocd', label: 'ArgoCD', trackingName: 'ArgoCD Monitoring' },
      { id: 'gitlab', label: 'GitLab', trackingName: 'GitLab Monitoring' },
    ],
  },
  integrations: {
    items: INTEGRATIONS_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    sections: [
      { id: 'all', label: 'All' },
      { id: 'temporal', label: 'Temporal', trackingName: 'Temporal Integrations' },
      { id: 'databases', label: 'Databases', trackingName: 'Database Integrations' },
      { id: 'aws', label: 'AWS', title: 'AWS Integrations', trackingName: 'AWS Integrations' },
      {
        id: 'azure',
        label: 'Azure',
        title: 'Azure Integrations',
        trackingName: 'Azure Integrations',
      },
      {
        id: 'other',
        label: 'Other',
        title: 'Other Integrations',
        trackingName: 'Other Integrations',
      },
    ],
  },

  // ── Static sections (no tabs, show all) ────────────────────────────
  javaInstrumentation: {
    items: JAVA_INSTRUMENTATION_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
    staticSections: true,
    sections: [
      { id: 'frameworks', label: 'Java Frameworks', trackingName: 'Java Frameworks Section' },
      { id: 'advanced', label: 'Advanced', trackingName: 'Java Advanced Section' },
    ],
  },

  // ── Searchable display ─────────────────────────────────────────────
  dashboardTemplates: {
    items: DASHBOARD_TEMPLATES_ITEMS,
    gridCols: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4',
    sectionName: 'Dashboard Templates Section',
    viewAllText: 'View all dashboard templates',
    searchable: true,
    searchPlaceholder: 'Search dashboard templates...',
  },
}
