export type HubspotFieldOption = {
  label: string
  value: string
  description?: string
  displayOrder?: number
}

export type HubspotFieldValidation = {
  blockedEmailDomains?: string[]
  minAllowedValue?: number
  maxAllowedValue?: number
  useDefaultBlockList?: boolean
}

export type HubspotDependentFieldFilter = {
  operator: string
  strValue?: string
  strValues?: string[]
  boolValue?: boolean
  numberValue?: number
}

export type HubspotDependentFieldConfig = {
  filters: HubspotDependentFieldFilter[]
  formFieldAction: string
  dependentFormField: HubspotField
}

export type HubspotFieldType =
  | 'single_line_text'
  | 'email'
  | 'phone'
  | 'number'
  | 'multi_line_text'
  | 'dropdown'
  | 'radio'
  | 'checkbox'
  | 'booleancheckbox'
  | 'multiple_checkboxes'
  | 'date'
  | 'file'

export type HubspotField = {
  fieldType: HubspotFieldType
  objectTypeId: string
  name: string
  label: string
  required: boolean
  hidden: boolean
  placeholder?: string
  defaultValue?: string
  description?: string
  validation?: HubspotFieldValidation
  options?: HubspotFieldOption[]
  dependentFieldFilters?: HubspotDependentFieldConfig[]
}

export type HubspotFieldGroup = {
  groupType: string
  richTextType?: string
  richText?: string
  fields: HubspotField[]
}

export type HubspotFormDefinition = {
  id: string
  name: string
  fieldGroups: HubspotFieldGroup[]
  submitButtonText?: string
  legalConsentOptions?: Record<string, unknown>
  redirect?: string
  thankYouMessage?: string
}

export type HubspotSubmissionField = {
  objectTypeId: string
  name: string
  value: string
}

export type HubspotSubmissionContext = {
  hutk?: string
  pageUri: string
  pageName: string
}

export type HubspotSubmissionPayload = {
  submittedAt: number
  fields: HubspotSubmissionField[]
  context: HubspotSubmissionContext
  legalConsentOptions?: Record<string, unknown>
}

export type FormValues = Record<string, string | string[] | boolean>

export type FormErrors = Record<string, string>

export type FormStatus = 'idle' | 'loading' | 'submitting' | 'success' | 'error'
