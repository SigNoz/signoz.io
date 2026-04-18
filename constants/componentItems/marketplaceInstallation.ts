import type { ComponentItem } from './types'

export const MARKETPLACE_INSTALLATION_ITEMS: ComponentItem[] = [
  { name: 'Railway', href: 'https://railway.com/deploy/signoz', clickName: 'Deploy to Railway' },
  {
    name: 'DigitalOcean',
    href: 'https://marketplace.digitalocean.com/apps/signoz',
    clickName: 'Deploy to DigitalOcean',
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
]
