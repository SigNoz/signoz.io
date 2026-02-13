export type ComparisonCell = {
  supported: boolean | 'partial'
  text: string
}

export type ComparisonTableRow<VendorKey extends string> = {
  feature: string
  vendors: Record<VendorKey, ComparisonCell>
}

export type ComparisonTableProps<VendorKey extends string> = {
  vendors: { key: VendorKey; label: string }[]
  rows: ComparisonTableRow<VendorKey>[]
  className?: string
}
