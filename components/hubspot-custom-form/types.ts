import type { HubspotField } from '../../types/hubspotForm'

export type SelectVariant = 'pills' | 'radio'

export type FieldRendererProps = {
  field: HubspotField
  value: string | string[] | boolean
  error?: string
  touched: boolean
  onChange: (value: string | string[] | boolean) => void
  onBlur: () => void
  disabled: boolean
  selectVariant?: SelectVariant
}
