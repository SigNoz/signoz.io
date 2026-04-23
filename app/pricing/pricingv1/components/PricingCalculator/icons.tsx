import Image from 'next/image'
import { DraftingCompassIcon } from 'lucide-react'
import logsIconUrl from '@/public/img/index_features/logs.svg?url'
import barChartIconUrl from '@/public/img/index_features/bar-chart-2.svg?url'

export const DraftingCompass = ({ isActive }: { isActive: boolean }) => {
  return <DraftingCompassIcon className={`h-4 w-4 ${isActive ? 'opacity-100' : 'opacity-50'}`} />
}

export const LogsIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <Image
      src={logsIconUrl}
      alt="Logs Icon"
      width={16}
      height={16}
      className={`h-4 w-4 ${isActive ? 'opacity-100' : 'opacity-50'}`}
    />
  )
}

export const MetricsIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <Image
      src={barChartIconUrl}
      alt="Metrics Icon"
      width={16}
      height={16}
      className={`h-4 w-4 ${isActive ? 'opacity-100' : 'opacity-50'}`}
    />
  )
}
