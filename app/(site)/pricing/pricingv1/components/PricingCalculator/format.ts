// Format numbers for display
export const formatNumber = (number: number) =>
  number.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 0 })

// Format bytes (GB, TB) for display
export const formatBytes = (size: number) => {
  if (size < 1000) {
    return `${formatNumber(size)} GB`
  }
  return `${formatNumber(size / 1000)} TB`
}

// Format metrics (million, billion) for display
export const formatMetrics = (size: number) => {
  if (size < 1000) {
    return `${formatNumber(size)} mn`
  }
  return `${formatNumber(size / 1000)} bn`
}

export const formatTracesAndLogsRetentionLabel = (days: number) =>
  days === 365 ? '1 year' : `${days} days`
