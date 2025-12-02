export type ComparisonTableRow = {
  feature: string
  signoz: React.ReactNode
  langfuse: React.ReactNode
  langsmith: React.ReactNode
  braintrust: React.ReactNode
}

export type ComparisonTableProps = {
  rows: ComparisonTableRow[]
  className?: string
}
