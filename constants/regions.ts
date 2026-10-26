export interface Region {
  name: string
  id: string
  iconURL: string
}

export const REGIONS: Region[] = [
  { name: 'United States', id: 'us2', iconURL: '/svgs/icons/us.svg' },
  { name: 'Europe', id: 'eu2', iconURL: '/svgs/icons/eu.svg' },
  { name: 'India', id: 'in2', iconURL: '/svgs/icons/india.svg' },
]
