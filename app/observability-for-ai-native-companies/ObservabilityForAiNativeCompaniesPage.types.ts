export type ComparisonCell = {
  supported: boolean | 'partial'
  text: string
}

export type VendorKey = 'signoz' | 'langfuse' | 'langsmith' | 'braintrust'
export type TraditionalVendorKey = 'signoz' | 'datadog' | 'honeycomb' | 'grafana'

export type ComparisonTableRow = {
  feature: string
  vendors: Record<VendorKey, ComparisonCell>
}

export type TraditionalComparisonTableRow = {
  feature: string
  vendors: Record<TraditionalVendorKey, ComparisonCell>
}

export type ComparisonTableProps = {
  vendors: { key: VendorKey; label: string }[]
  rows: ComparisonTableRow[]
  className?: string
}

export type TraditionalComparisonTableProps = {
  vendors: { key: TraditionalVendorKey; label: string }[]
  rows: TraditionalComparisonTableRow[]
  className?: string
}
