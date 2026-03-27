export interface Region {
  name: string
  id: string
  iconURL: string
}

export const REGIONS: Region[] = [
  { name: 'United States', id: 'us', iconURL: '/svgs/icons/us.svg' },
  { name: 'Europe', id: 'eu', iconURL: '/svgs/icons/eu.svg' },
  { name: 'India', id: 'in', iconURL: '/svgs/icons/india.svg' },
]
