export type ComparisonCell = {
  supported?: boolean | 'partial'
  text: string | React.ReactNode
}

export type ComparisonTableRow<VendorKey extends string> = {
  feature: string | React.ReactNode
  vendors: Record<VendorKey, ComparisonCell>
}

export type ComparisonTableProps<VendorKey extends string> = {
  vendors: { key: VendorKey; label: string | React.ReactNode }[]
  rows: ComparisonTableRow<VendorKey>[]
  className?: string
}
