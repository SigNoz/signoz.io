import type { ListicleConfig } from '@/components/Listicle/types'

import apmInstrumentation from './apm-instrumentation.json'
import apmDashboards from './apm-dashboards.json'
import awsMonitoring from './aws-monitoring.json'
import awsOneClick from './aws-one-click.json'
import azureOneClick from './azure-one-click.json'
import cicdMonitoring from './cicd-monitoring.json'
import collectionAgents from './collection-agents.json'
import dashboardTemplates from './dashboard-templates.json'
import hostMetricsDashboards from './host-metrics-dashboards.json'
import integrations from './integrations.json'
import javaInstrumentation from './java-instrumentation.json'
import javascriptInstrumentation from './javascript-instrumentation.json'
import k8sInstallation from './k8s-installation.json'
import kubernetesDashboards from './kubernetes-dashboards.json'
import litellmDashboards from './litellm-dashboards.json'
import llmMonitoring from './llm-monitoring.json'
import logsInstrumentation from './logs-instrumentation.json'
import marketplaceInstallation from './marketplace-installation.json'
import selfHostInstallation from './self-host-installation.json'

export const listicleConfigs: Record<string, ListicleConfig> = {
  'apm-instrumentation': apmInstrumentation as unknown as ListicleConfig,
  'apm-dashboards': apmDashboards as unknown as ListicleConfig,
  'aws-monitoring': awsMonitoring as unknown as ListicleConfig,
  'aws-one-click': awsOneClick as unknown as ListicleConfig,
  'azure-one-click': azureOneClick as unknown as ListicleConfig,
  'cicd-monitoring': cicdMonitoring as unknown as ListicleConfig,
  'collection-agents': collectionAgents as unknown as ListicleConfig,
  'dashboard-templates': dashboardTemplates as unknown as ListicleConfig,
  'host-metrics-dashboards': hostMetricsDashboards as unknown as ListicleConfig,
  integrations: integrations as unknown as ListicleConfig,
  'java-instrumentation': javaInstrumentation as unknown as ListicleConfig,
  'javascript-instrumentation': javascriptInstrumentation as unknown as ListicleConfig,
  'k8s-installation': k8sInstallation as unknown as ListicleConfig,
  'kubernetes-dashboards': kubernetesDashboards as unknown as ListicleConfig,
  'litellm-dashboards': litellmDashboards as unknown as ListicleConfig,
  'llm-monitoring': llmMonitoring as unknown as ListicleConfig,
  'logs-instrumentation': logsInstrumentation as unknown as ListicleConfig,
  'marketplace-installation': marketplaceInstallation as unknown as ListicleConfig,
  'self-host-installation': selfHostInstallation as unknown as ListicleConfig,
}
