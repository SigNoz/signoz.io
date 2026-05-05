'use client'

import { useCallback, useEffect, useReducer, useMemo } from 'react'
import Cookies from 'js-cookie'
import { useLogEvent } from '@/hooks/useLogEvent'
import {
  createSubmissionRelayId,
  sendSubmissionRelayInBackground,
} from '@/utils/submissionRelayClient'
import { flattenSubmissionValues } from '@/utils/hubspotTracking'
import type {
  HubspotFormDefinition,
  HubspotField,
  FormValues,
  FormErrors,
  FormStatus,
  HubspotSubmissionField,
  HubspotSubmissionPayload,
} from '../../types/hubspotForm'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMAIL_FIELD_NAMES = new Set(['email', 'workemail', 'companyemail', 'businessemail'])

type FormState = {
  values: FormValues
  errors: FormErrors
  touched: Record<string, boolean>
  status: FormStatus
  definition: HubspotFormDefinition | null
  definitionError: string | null
  submitError: string | null
}

type FormAction =
  | { type: 'SET_DEFINITION'; definition: HubspotFormDefinition }
  | { type: 'SET_DEFINITION_ERROR'; error: string }
  | { type: 'SET_VALUE'; name: string; value: string | string[] | boolean }
  | { type: 'SET_TOUCHED'; name: string }
  | { type: 'SET_ALL_TOUCHED'; names: string[] }
  | { type: 'SET_ERRORS'; errors: FormErrors }
  | { type: 'SET_STATUS'; status: FormStatus }
  | { type: 'SET_SUBMIT_ERROR'; error: string | null }
  | { type: 'RESET' }

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_DEFINITION':
      return { ...state, definition: action.definition, status: 'idle' }
    case 'SET_DEFINITION_ERROR':
      return { ...state, definitionError: action.error, status: 'error' }
    case 'SET_VALUE':
      return { ...state, values: { ...state.values, [action.name]: action.value } }
    case 'SET_TOUCHED':
      return { ...state, touched: { ...state.touched, [action.name]: true } }
    case 'SET_ALL_TOUCHED': {
      const touched = { ...state.touched }
      action.names.forEach((n) => {
        touched[n] = true
      })
      return { ...state, touched }
    }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors }
    case 'SET_STATUS':
      return { ...state, status: action.status }
    case 'SET_SUBMIT_ERROR':
      return { ...state, submitError: action.error }
    case 'RESET':
      return { ...initialState, definition: state.definition }
    default:
      return state
  }
}

const initialState: FormState = {
  values: {},
  errors: {},
  touched: {},
  status: 'loading',
  definition: null,
  definitionError: null,
  submitError: null,
}

function getAllFields(definition: HubspotFormDefinition): HubspotField[] {
  return definition.fieldGroups.flatMap((group) => group.fields)
}

function getInitialValues(fields: HubspotField[]): FormValues {
  const values: FormValues = {}
  for (const field of fields) {
    if (field.defaultValue !== undefined && field.defaultValue !== '') {
      if (field.fieldType === 'multiple_checkboxes') {
        values[field.name] = field.defaultValue.split(';')
      } else if (field.fieldType === 'checkbox' || field.fieldType === 'booleancheckbox') {
        values[field.name] = field.defaultValue === 'true'
      } else {
        values[field.name] = field.defaultValue
      }
    } else if (field.fieldType === 'multiple_checkboxes') {
      values[field.name] = []
    } else if (field.fieldType === 'checkbox' || field.fieldType === 'booleancheckbox') {
      values[field.name] = false
    } else {
      values[field.name] = ''
    }
  }
  return values
}

function validateField(
  field: HubspotField,
  value: string | string[] | boolean
): string | undefined {
  if (field.required) {
    if (value === '' || value === false || (Array.isArray(value) && value.length === 0)) {
      return 'This field is required'
    }
  }

  if (typeof value === 'string' && value) {
    if (field.fieldType === 'email') {
      if (!EMAIL_REGEX.test(value)) {
        return 'Please enter a valid email address'
      }
      const domain = value.split('@')[1]?.toLowerCase()
      if (
        domain &&
        field.validation?.blockedEmailDomains?.length &&
        field.validation.blockedEmailDomains.some((d) => d.toLowerCase() === domain)
      ) {
        return 'Please use your work email address'
      }
    }

    if (field.fieldType === 'number') {
      const num = Number(value)
      if (isNaN(num)) return 'Please enter a valid number'
      if (
        field.validation?.minAllowedValue !== undefined &&
        num < field.validation.minAllowedValue
      ) {
        return `Value must be at least ${field.validation.minAllowedValue}`
      }
      if (
        field.validation?.maxAllowedValue !== undefined &&
        num > field.validation.maxAllowedValue
      ) {
        return `Value must be at most ${field.validation.maxAllowedValue}`
      }
    }
  }

  return undefined
}

function validateAllFields(fields: HubspotField[], values: FormValues): FormErrors {
  const errors: FormErrors = {}
  for (const field of fields) {
    if (field.hidden) continue
    const error = validateField(field, values[field.name] ?? '')
    if (error) errors[field.name] = error
  }
  return errors
}

function extractEmail(values: FormValues): string | undefined {
  for (const [key, value] of Object.entries(values)) {
    if (typeof value !== 'string') continue
    const normalizedKey = key.toLowerCase().replace(/[^a-z0-9]/g, '')
    if (EMAIL_FIELD_NAMES.has(normalizedKey)) return value
  }
  return undefined
}

function serializeFieldValue(value: string | string[] | boolean): string {
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (Array.isArray(value)) return value.join(';')
  return value
}

function buildSubmissionValues(values: FormValues): Record<string, string> {
  const result: Record<string, string> = {}
  const entries = Object.entries(values) as [string, string | string[] | boolean][]
  for (const [key, value] of entries) {
    const serialized = serializeFieldValue(value)
    if (serialized) result[key] = serialized
  }
  return result
}

type UseHubspotCustomFormOptions = {
  portalId: string
  formId: string
  formName?: string
  initialDefinition?: HubspotFormDefinition
  onSubmitSuccess?: (values: FormValues) => void
}

export function useHubspotCustomForm({
  portalId,
  formId,
  formName,
  initialDefinition,
  onSubmitSuccess,
}: UseHubspotCustomFormOptions) {
  const logEvent = useLogEvent()
  const [state, dispatch] = useReducer(formReducer, {
    ...initialState,
    definition: initialDefinition || null,
    status: initialDefinition ? 'idle' : 'loading',
  })

  useEffect(() => {
    if (state.definition) {
      const fields = getAllFields(state.definition)
      const initialValues = getInitialValues(fields)
      const entries = Object.entries(initialValues) as [string, string | string[] | boolean][]
      for (const [name, value] of entries) {
        dispatch({ type: 'SET_VALUE', name, value })
      }
    }
  }, [state.definition])

  const fetchDefinition = useCallback(async () => {
    const resolvedFormName = formName || formId
    const commonAttributes = {
      hubspot_form_id: formId,
      hubspot_form_name: resolvedFormName,
      hubspot_portal_id: portalId,
      hubspot_page_path: typeof window !== 'undefined' ? window.location.pathname : '',
      hubspot_page_url: typeof window !== 'undefined' ? window.location.href : '',
    }

    if (initialDefinition) {
      dispatch({ type: 'SET_DEFINITION', definition: initialDefinition })
      logEvent({
        eventName: 'HubSpot Form Loaded',
        eventType: 'track',
        attributes: {
          ...commonAttributes,
          hubspot_load_source: 'initial_definition',
          hubspot_field_count: String(
            initialDefinition.fieldGroups.flatMap((g) => g.fields).length
          ),
        },
      })
      return
    }

    dispatch({ type: 'SET_STATUS', status: 'loading' })
    const fetchStart = Date.now()

    try {
      const res = await fetch(`/api/hubspot-form/${formId}`)
      if (!res.ok) {
        throw new Error(`Failed to load form (${res.status})`)
      }
      const definition: HubspotFormDefinition = await res.json()
      dispatch({ type: 'SET_DEFINITION', definition })

      logEvent({
        eventName: 'HubSpot Form Loaded',
        eventType: 'track',
        attributes: {
          ...commonAttributes,
          hubspot_load_source: 'api',
          hubspot_load_duration_ms: String(Date.now() - fetchStart),
          hubspot_field_count: String(definition.fieldGroups.flatMap((g) => g.fields).length),
        },
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load form'

      dispatch({
        type: 'SET_DEFINITION_ERROR',
        error: errorMessage,
      })

      logEvent({
        eventName: 'HubSpot Form Failed to Load',
        eventType: 'track',
        attributes: {
          ...commonAttributes,
          hubspot_error_message: errorMessage,
          hubspot_load_duration_ms: String(Date.now() - fetchStart),
          hubspot_user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
          hubspot_online: typeof navigator !== 'undefined' ? String(navigator.onLine) : '',
          hubspot_connection_type:
            typeof navigator !== 'undefined' &&
            'connection' in navigator &&
            navigator.connection &&
            typeof navigator.connection === 'object' &&
            'effectiveType' in navigator.connection
              ? String(navigator.connection.effectiveType)
              : '',
        },
      })
    }
  }, [formId, formName, portalId, initialDefinition, logEvent])

  useEffect(() => {
    void fetchDefinition()
  }, [fetchDefinition])

  const setFieldValue = useCallback(
    (name: string, value: string | string[] | boolean) => {
      dispatch({ type: 'SET_VALUE', name, value })

      if (state.touched[name] && state.definition) {
        const field = getAllFields(state.definition).find((f) => f.name === name)
        if (field) {
          const fieldError = validateField(field, value)
          const updatedErrors = { ...state.errors }
          if (fieldError) {
            updatedErrors[name] = fieldError
          } else {
            delete updatedErrors[name]
          }
          dispatch({ type: 'SET_ERRORS', errors: updatedErrors })
        }
      }
    },
    [state.touched, state.errors, state.definition]
  )

  const setFieldTouched = useCallback(
    (name: string) => {
      dispatch({ type: 'SET_TOUCHED', name })

      if (state.definition) {
        const field = getAllFields(state.definition).find((f) => f.name === name)
        if (field) {
          const value = state.values[name] ?? ''
          const fieldError = validateField(field, value)
          const updatedErrors = { ...state.errors }
          if (fieldError) {
            updatedErrors[name] = fieldError
          } else {
            delete updatedErrors[name]
          }
          dispatch({ type: 'SET_ERRORS', errors: updatedErrors })
        }
      }
    },
    [state.definition, state.values, state.errors]
  )

  const visibleFields = useMemo(() => {
    if (!state.definition) return []
    return getAllFields(state.definition).filter((f) => !f.hidden)
  }, [state.definition])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!state.definition) return

      const allFields = getAllFields(state.definition)
      const visible = allFields.filter((f) => !f.hidden)

      dispatch({ type: 'SET_ALL_TOUCHED', names: visible.map((f) => f.name) })

      const errors = validateAllFields(allFields, state.values)
      dispatch({ type: 'SET_ERRORS', errors })
      if (Object.keys(errors).length > 0) return

      dispatch({ type: 'SET_STATUS', status: 'submitting' })
      dispatch({ type: 'SET_SUBMIT_ERROR', error: null })

      const submissionFields: HubspotSubmissionField[] = allFields
        .filter((f) => {
          const val = state.values[f.name]
          return val !== undefined && val !== '' && !(Array.isArray(val) && val.length === 0)
        })
        .map((f) => ({
          objectTypeId: f.objectTypeId,
          name: f.name,
          value: serializeFieldValue(state.values[f.name] ?? ''),
        }))

      const hutk = Cookies.get('hubspotutk')

      const payload: HubspotSubmissionPayload = {
        submittedAt: Date.now(),
        fields: submissionFields,
        context: {
          ...(hutk ? { hutk } : {}),
          pageUri: window.location.href,
          pageName: document.title,
        },
        ...(state.definition.legalConsentOptions &&
        (state.definition.legalConsentOptions as Record<string, unknown>).type !== 'none'
          ? { legalConsentOptions: state.definition.legalConsentOptions }
          : {}),
      }

      try {
        const res = await fetch(
          `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        )

        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.message || `Submission failed (${res.status})`)
        }

        dispatch({ type: 'SET_STATUS', status: 'success' })

        const resolvedFormName = formName || state.definition.name || formId
        const submissionValues = buildSubmissionValues(state.values)

        logEvent({
          eventName: 'HubSpot Form Submitted',
          eventType: 'track',
          attributes: {
            pageLocation: window.location.pathname,
            formName: resolvedFormName,
            hubspot_form_id: formId,
            hubspot_form_name: resolvedFormName,
            hubspot_event_name: '',
            hubspot_conversion_id: '',
            hubspot_redirect_url: '',
            hubspot_message_origin: '',
            hubspot_page_path: window.location.pathname,
            hubspot_page_url: window.location.href,
            ...flattenSubmissionValues(submissionValues),
          },
        })

        const email = extractEmail(state.values)
        if (email) {
          sendSubmissionRelayInBackground({
            email,
            signupId: createSubmissionRelayId('hubspot'),
            source: 'hubspot-form',
            createdAt: new Date().toISOString(),
            formName: resolvedFormName,
            pageLocation: window.location.pathname,
            pageUrl: window.location.href,
            formId,
            conversionId: '',
            details: submissionValues,
          })
        }

        onSubmitSuccess?.(state.values)

        // Handle redirect if configured in HubSpot
        if (state.definition.redirect) {
          setTimeout(() => {
            window.location.href = state.definition!.redirect!
          }, 1500)
        }
      } catch (err) {
        dispatch({ type: 'SET_STATUS', status: 'idle' })
        dispatch({
          type: 'SET_SUBMIT_ERROR',
          error: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
        })
      }
    },
    [state.definition, state.values, portalId, formId, formName, logEvent, onSubmitSuccess]
  )

  return {
    definition: state.definition,
    definitionLoading: state.status === 'loading',
    definitionError: state.definitionError,
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    status: state.status,
    submitError: state.submitError,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    retryFetch: fetchDefinition,
    visibleFields,
    submitButtonText: state.definition?.submitButtonText || 'Submit',
  }
}
