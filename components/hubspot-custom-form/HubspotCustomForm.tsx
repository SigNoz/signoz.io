'use client'

import React from 'react'
import { Loader2 } from 'lucide-react'
import type { HubspotFormDefinition, FormValues } from '../../types/hubspotForm'
import type { SelectVariant } from './types'
import { useHubspotCustomForm } from './useHubspotCustomForm'
import { getFieldRenderer } from './fieldRegistry'
import HiddenField from './fields/HiddenField'
import HubspotCustomFormSkeleton from './HubspotCustomFormSkeleton'
import HubspotCustomFormError from './HubspotCustomFormError'
import HubspotCustomFormSuccess from './HubspotCustomFormSuccess'

export type HubspotCustomFormProps = {
  portalId: string
  formId: string
  formName?: string
  initialDefinition?: HubspotFormDefinition
  submitButtonText?: string
  onSubmitSuccess?: (values: FormValues) => void
  className?: string
  renderSuccess?: () => React.ReactNode
  selectVariant?: SelectVariant
}

export default function HubspotCustomForm({
  portalId,
  formId,
  formName,
  initialDefinition,
  submitButtonText: submitButtonTextOverride,
  onSubmitSuccess,
  className,
  renderSuccess,
  selectVariant,
}: HubspotCustomFormProps) {
  const {
    definition,
    definitionLoading,
    definitionError,
    values,
    errors,
    touched,
    status,
    submitError,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    retryFetch,
    submitButtonText,
  } = useHubspotCustomForm({
    portalId,
    formId,
    formName,
    initialDefinition,
    onSubmitSuccess,
  })

  if (definitionLoading) {
    return <HubspotCustomFormSkeleton />
  }

  if (definitionError) {
    return <HubspotCustomFormError message={definitionError} onRetry={retryFetch} />
  }

  if (status === 'success') {
    if (renderSuccess) return <>{renderSuccess()}</>
    return <HubspotCustomFormSuccess message={definition?.thankYouMessage} />
  }

  if (!definition) return null

  const isSubmitting = status === 'submitting'
  const resolvedSubmitText = submitButtonTextOverride || submitButtonText

  return (
    <form noValidate onSubmit={handleSubmit} className={`flex flex-col gap-6 ${className || ''}`}>
      {definition.fieldGroups.map((group, groupIdx) => {
        const visibleFields = group.fields.filter((f) => !f.hidden)
        const hiddenFields = group.fields.filter((f) => f.hidden)

        if (group.richText && visibleFields.length === 0) {
          return (
            <div
              key={`rich-${groupIdx}`}
              className="text-sm text-signoz_vanilla-300 [&_h1]:m-0 [&_h2]:m-0 [&_h3]:m-0 [&_h4]:m-0 [&_h5]:m-0 [&_h6]:m-0 [&_p]:m-0"
              dangerouslySetInnerHTML={{ __html: group.richText }}
            />
          )
        }

        return (
          <React.Fragment key={`group-${groupIdx}`}>
            {hiddenFields.map((field) => (
              <HiddenField
                key={field.name}
                field={field}
                value={values[field.name] ?? field.defaultValue ?? ''}
                touched={false}
                onChange={(val) => setFieldValue(field.name, val)}
                onBlur={() => {}}
                disabled={false}
              />
            ))}

            {visibleFields.length > 1 ? (
              <div
                className="grid gap-4"
                style={{ gridTemplateColumns: `repeat(${visibleFields.length}, 1fr)` }}
              >
                {visibleFields.map((field) => {
                  const FieldComponent = getFieldRenderer(field.fieldType)
                  return (
                    <FieldComponent
                      key={field.name}
                      field={field}
                      value={values[field.name] ?? ''}
                      error={errors[field.name]}
                      touched={touched[field.name] || false}
                      onChange={(val) => setFieldValue(field.name, val)}
                      onBlur={() => setFieldTouched(field.name)}
                      disabled={isSubmitting}
                      selectVariant={selectVariant}
                    />
                  )
                })}
              </div>
            ) : (
              visibleFields.map((field) => {
                const FieldComponent = getFieldRenderer(field.fieldType)
                return (
                  <FieldComponent
                    key={field.name}
                    field={field}
                    value={values[field.name] ?? ''}
                    error={errors[field.name]}
                    touched={touched[field.name] || false}
                    onChange={(val) => setFieldValue(field.name, val)}
                    onBlur={() => setFieldTouched(field.name)}
                    disabled={isSubmitting}
                    selectVariant={selectVariant}
                  />
                )
              })
            )}
          </React.Fragment>
        )
      })}

      {submitError && (
        <p className="rounded border border-red-900/50 bg-red-900/20 px-3 py-2 text-sm text-red-300">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex h-[44px] w-full items-center justify-center gap-2 rounded-md bg-signoz_robin-500 text-sm font-semibold text-white transition hover:bg-signoz_robin-500/90 disabled:opacity-60"
      >
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {isSubmitting ? 'Submitting\u2026' : resolvedSubmitText}
      </button>
    </form>
  )
}
