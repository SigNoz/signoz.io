export type SubmissionRelayPayload = {
  email: string
  signupId: string
  source?: string
  createdAt?: string
  formName?: string
  pageLocation?: string
  pageUrl?: string
  formId?: string
  conversionId?: string
  dataRegion?: string
  connector?: string
  method?: string
  details?: Record<string, unknown>
}
