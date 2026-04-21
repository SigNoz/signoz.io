import { NextResponse } from 'next/server'
import type {
  HubspotFormDefinition,
  HubspotFieldGroup,
  HubspotField,
} from '../../../../types/hubspotForm'

export const runtime = 'nodejs'

const HUBSPOT_API_BASE = process.env.HUBSPOT_API_BASE || ''
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function shapeField(raw: Record<string, unknown>): HubspotField {
  return {
    fieldType: ((raw.fieldType as string) || 'single_line_text') as HubspotField['fieldType'],
    objectTypeId: (raw.objectTypeId as string) || '0-1',
    name: (raw.name as string) || '',
    label: (raw.label as string) || '',
    required: Boolean(raw.required),
    hidden: Boolean(raw.hidden),
    placeholder: (raw.placeholder as string) || undefined,
    defaultValue: (raw.defaultValue as string) || undefined,
    description: (raw.description as string) || undefined,
    validation: raw.validation as HubspotField['validation'],
    options: raw.options as HubspotField['options'],
    dependentFieldFilters: raw.dependentFieldFilters as HubspotField['dependentFieldFilters'],
  }
}

function shapeFieldGroup(raw: Record<string, unknown>): HubspotFieldGroup {
  const rawFields = Array.isArray(raw.fields) ? raw.fields : []
  return {
    groupType: (raw.groupType as string) || 'default_group',
    richTextType: raw.richTextType as string | undefined,
    richText: raw.richText as string | undefined,
    fields: rawFields.map((f: Record<string, unknown>) => shapeField(f)),
  }
}

function shapeFormDefinition(raw: Record<string, unknown>): HubspotFormDefinition {
  const rawFieldGroups = Array.isArray(raw.fieldGroups) ? raw.fieldGroups : []
  const configuration = raw.configuration as Record<string, unknown> | undefined
  const displayOptions = raw.displayOptions as Record<string, unknown> | undefined
  const postSubmitAction = configuration?.postSubmitAction as Record<string, unknown> | undefined

  return {
    id: (raw.id as string) || '',
    name: (raw.name as string) || '',
    fieldGroups: rawFieldGroups.map((g: Record<string, unknown>) => shapeFieldGroup(g)),
    submitButtonText: (displayOptions?.submitButtonText as string) || undefined,
    legalConsentOptions: raw.legalConsentOptions as Record<string, unknown> | undefined,
    redirect: (configuration?.redirect as string) || undefined,
    thankYouMessage: (postSubmitAction?.value as string) || undefined,
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ formId: string }> }) {
  const { formId } = await params

  if (!UUID_REGEX.test(formId)) {
    return NextResponse.json({ error: 'Invalid form ID' }, { status: 400 })
  }

  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN
  if (!token) {
    return NextResponse.json({ error: 'Configuration error' }, { status: 500 })
  }

  try {
    const hubspotRes = await fetch(`${HUBSPOT_API_BASE}/${formId}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    })

    if (!hubspotRes.ok) {
      const status = hubspotRes.status === 404 ? 404 : 500
      return NextResponse.json(
        { error: status === 404 ? 'Form not found' : 'Failed to fetch form' },
        { status }
      )
    }

    const raw = await hubspotRes.json()
    const definition = shapeFormDefinition(raw)

    return NextResponse.json(definition, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch form definition' }, { status: 500 })
  }
}
