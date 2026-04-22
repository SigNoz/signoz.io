import { DraftingCompassIcon } from 'lucide-react'

export const DraftingCompass = ({ isActive }: { isActive: boolean }) => {
  return <DraftingCompassIcon className={`h-4 w-4 ${isActive ? 'opacity-100' : 'opacity-50'}`} />
}

export const LogsIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <img
      src="/img/index_features/logs.svg"
      alt="Logs Icon"
      className={`h-4 w-4 ${isActive ? 'opacity-100' : 'opacity-50'}`}
    />
  )
}

export const MetricsIcon = ({ isActive }: { isActive: boolean }) => {
  return (
    <img
      src="/img/index_features/bar-chart-2.svg"
      alt="Metrics Icon"
      className={`h-4 w-4 ${isActive ? 'opacity-100' : 'opacity-50'}`}
    />
  )
}
