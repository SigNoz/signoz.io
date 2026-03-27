import type { ComponentItem } from './types'

export const K8S_INSTALLATION_ITEMS: ComponentItem[] = [
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
    name: 'Openshift',
    href: '/docs/install/kubernetes/openshift',
    clickName: 'Deploy to OpenShift',
  },
  {
    name: 'Kustomize',
    href: '/docs/setup/kubernetes/kustomize',
    clickName: 'Deploy with Kustomize',
  },
]
