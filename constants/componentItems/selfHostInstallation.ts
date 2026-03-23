import type { ComponentItem } from './types'

export const SELF_HOST_INSTALLATION_ITEMS = {
  docker: [
    { name: 'Standalone', href: '/docs/install/docker', clickName: 'Install Docker Standalone' },
    { name: 'Swarm', href: '/docs/install/docker-swarm', clickName: 'Install Docker Swarm' },
    { name: 'SELinux', href: '/docs/install/docker-selinux', clickName: 'Install Docker SELinux' },
  ] satisfies ComponentItem[],
  binary: [
    { name: 'Linux', href: '/docs/install/linux', clickName: 'Install Binary Linux' },
  ] satisfies ComponentItem[],
  kubernetes: [
    { name: 'AWS', href: '/docs/install/kubernetes/aws', clickName: 'Deploy to AWS' },
    { name: 'GCP', href: '/docs/install/kubernetes/gcp', clickName: 'Deploy to GCP' },
    { name: 'AKS', href: '/docs/install/kubernetes/aks', clickName: 'Deploy to AKS' },
    {
      name: 'DigitalOcean',
      href: '/docs/install/digital-ocean',
      clickName: 'Deploy to DigitalOcean',
    },
    {
      name: 'Other Platform',
      href: '/docs/install/kubernetes/others',
      clickName: 'Deploy to Other Platform',
    },
    { name: 'Local', href: '/docs/install/kubernetes/local', clickName: 'Deploy Locally' },
    { name: 'ArgoCD', href: '/docs/install/argocd', clickName: 'Deploy with ArgoCD' },
    {
      name: 'OpenShift',
      href: '/docs/install/kubernetes/openshift',
      clickName: 'Deploy to OpenShift',
    },
  ] satisfies ComponentItem[],
  others: [
    { name: 'ECS', href: '/docs/install/ecs/', clickName: 'Deploy to ECS' },
    {
      name: 'Azure Container Apps',
      href: '/docs/install/azure-container-apps',
      clickName: 'Deploy to Azure Container Apps',
    },
    { name: 'Render', href: '/docs/setup/render', clickName: 'Deploy to Render' },
    { name: 'Railway', href: 'https://railway.com/deploy/signoz', clickName: 'Deploy to Railway' },
    {
      name: 'DigitalOcean (Marketplace)',
      href: 'https://marketplace.digitalocean.com/apps/signoz',
      clickName: 'Deploy to DigitalOcean Marketplace',
    },
    {
      name: 'Vultr',
      href: 'https://www.vultr.com/marketplace/apps/signoz/',
      clickName: 'Deploy to Vultr',
    },
    {
      name: 'Coolify',
      href: 'https://github.com/coollabsio/coolify/blob/v4.x/templates/compose/signoz.yaml',
      clickName: 'Deploy to Coolify',
    },
  ] satisfies ComponentItem[],
} as const

export const getAllSelfHostInstallationItems = (): ComponentItem[] =>
  Object.values(SELF_HOST_INSTALLATION_ITEMS).flat()
