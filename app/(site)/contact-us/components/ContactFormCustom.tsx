'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLogEvent } from '@/hooks/useLogEvent'
import {
  createSubmissionRelayId,
  sendSubmissionRelayInBackground,
} from '@/utils/submissionRelayClient'
import { flattenSubmissionValues } from '@/utils/hubspotTracking'
import { Check, CheckCircle, Loader2 } from 'lucide-react'
import { contactUsData } from '../data'

const { FORM_ID, FORM_NAME, SUBMIT_URL } = contactUsData

const HOSTING_OPTIONS = [
  { label: 'Enterprise Cloud', value: 'Enterprise Cloud' },
  { label: 'BYOC', value: 'Managed by SigNoz in your cloud (BYOC)' },
  { label: 'Self-Hosted', value: 'Self Host with support contract (Enterprise Self-Hosted)' },
]

const TOOLS = [
  { label: 'Datadog', value: 'Datadog' },
  { label: 'New Relic', value: 'New Relic' },
  { label: 'Grafana (LGTM)', value: 'Grafana(LTM)' },
  { label: 'Splunk', value: 'Splunk' },
  { label: 'Cloudwatch', value: 'Cloudwatch' },
  { label: 'Others', value: 'Others' },
]

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="block text-[11px] font-medium tracking-wide text-gray-500 uppercase">
    {children}
  </span>
)

const Field = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-2">{children}</div>
)

export default function ContactFormCustom() {
  const pathname = usePathname()
  const logEvent = useLogEvent()

  const [email, setEmail] = useState('')
  const [hosting, setHosting] = useState('')
  const [scale, setScale] = useState('')
  const [tools, setTools] = useState<string[]>([])
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hostingError, setHostingError] = useState(false)

  const toggleTool = (value: string) =>
    setTools((prev) => (prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!hosting) {
      setHostingError(true)
      return
    }

    setLoading(true)

    const fields = [
      { objectTypeId: '0-1', name: 'email', value: email },
      { objectTypeId: '0-2', name: 'teams_deployment_option', value: hosting },
      ...(scale ? [{ objectTypeId: '0-2', name: 'current_scale', value: scale }] : []),
      ...(tools.length
        ? [{ objectTypeId: '0-2', name: 'existing_tools', value: tools.join(';') }]
        : []),
      ...(description ? [{ objectTypeId: '0-2', name: 'description', value: description }] : []),
    ]

    try {
      const res = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields,
          context: {
            pageUri: `https://signoz.io${pathname}${window.location.search}`,
            pageName: 'Contact Us',
          },
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message || 'Submission failed')
      }

      const submissionValues: Record<string, string> = {
        email,
        teams_deployment_option: hosting,
        ...(scale ? { current_scale: scale } : {}),
        ...(tools.length ? { existing_tools: tools.join(';') } : {}),
        ...(description ? { description } : {}),
      }

      logEvent({
        eventName: 'HubSpot Form Submitted',
        eventType: 'track',
        attributes: {
          pageLocation: pathname,
          formName: FORM_NAME,
          hubspot_form_id: FORM_ID,
          hubspot_form_name: FORM_NAME,
          hubspot_event_name: '',
          hubspot_conversion_id: '',
          hubspot_redirect_url: '',
          hubspot_message_origin: '',
          hubspot_page_path: pathname,
          hubspot_page_url: window.location.href,
          ...flattenSubmissionValues(submissionValues),
        },
      })

      sendSubmissionRelayInBackground({
        email,
        signupId: createSubmissionRelayId('hubspot'),
        source: 'hubspot-form',
        createdAt: new Date().toISOString(),
        formName: FORM_NAME,
        pageLocation: pathname,
        pageUrl: window.location.href,
        formId: FORM_ID,
        conversionId: '',
        details: submissionValues,
      })

      logEvent({
        eventName: 'Website Click',
        eventType: 'track',
        attributes: {
          clickType: 'Form Submit',
          clickName: 'Contact Us Form Submit',
          clickLocation: 'contact_us_page',
          pageLocation: pathname,
        },
      })

      setSuccess(true)
    } catch (err: any) {
      setError(err?.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
        <CheckCircle className="text-primary h-7 w-7" />
        <h3 className="text-muted-foreground text-lg font-semibold">We'll be in touch soon.</h3>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Email */}
      <Field>
        <Label>Work Email *</Label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className="border-border bg-card text-muted-foreground focus:border-primary focus:ring-ring w-full rounded-md border px-4 py-3 text-sm placeholder-gray-500/50 transition outline-none focus:ring-1"
        />
      </Field>

      {/* Hosting setup - Pill selectors */}
      <Field>
        <Label>Preferred Hosting *</Label>
        <div className="flex flex-wrap gap-2">
          {HOSTING_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                setHosting(opt.value)
                setHostingError(false)
              }}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                hosting === opt.value
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-card hover:border-l2-border hover:text-muted-foreground text-gray-400'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {hostingError && <p className="text-xs text-red-400">Please select a hosting option.</p>}
      </Field>

      {/* Current scale */}
      <Field>
        <Label>Current Scale</Label>
        <input
          type="text"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
          placeholder="e.g. 5B logs/month, 10K requests/sec"
          className="border-border bg-card text-muted-foreground focus:border-primary focus:ring-ring w-full rounded-md border px-4 py-3 text-sm placeholder-gray-500/50 transition outline-none focus:ring-1"
        />
      </Field>

      {/* Observability tools - checklist style */}
      <Field>
        <div className="flex items-baseline justify-between">
          <Label>Current Tools</Label>
          <span className="text-[10px] text-gray-500">choose as many as you like</span>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {TOOLS.map((tool) => (
            <label key={tool.value} className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={tools.includes(tool.value)}
                onChange={() => toggleTool(tool.value)}
                className="sr-only"
              />
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${
                  tools.includes(tool.value)
                    ? 'border-primary bg-primary'
                    : 'border-l3-border bg-transparent'
                }`}
              >
                {tools.includes(tool.value) && (
                  <Check className="h-3 w-3 text-white" strokeWidth={2.5} />
                )}
              </span>
              <span className="text-muted-foreground text-sm">{tool.label}</span>
            </label>
          ))}
        </div>
      </Field>

      {/* Description */}
      <Field>
        <Label>What got you interested in SigNoz?</Label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="border-border bg-card text-muted-foreground focus:border-primary focus:ring-ring w-full resize-none rounded-md border px-4 py-3 text-sm placeholder-gray-500/50 transition outline-none focus:ring-1"
        />
      </Field>

      {error && (
        <p className="rounded border border-red-900/50 bg-red-900/20 px-3 py-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-primary hover:bg-primary/90 flex h-[44px] w-full items-center justify-center gap-2 rounded-md text-sm font-semibold text-white transition disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {loading ? 'Submitting…' : 'Book a Demo'}
      </button>
    </form>
  )
}
