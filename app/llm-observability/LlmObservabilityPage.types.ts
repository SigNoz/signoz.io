export type ComparisonCell = {
  supported: boolean
  text: string
}

export type VendorKey = 'signoz' | 'langfuse' | 'langsmith' | 'braintrust'

export type ComparisonTableRow = {
  feature: string
  vendors: Record<VendorKey, ComparisonCell>
}

export type ComparisonTableProps = {
  rows: ComparisonTableRow[]
  className?: string
}
