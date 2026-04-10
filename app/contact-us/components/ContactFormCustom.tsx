'use client'

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLogEvent } from '@/hooks/useLogEvent'
import { Loader2 } from 'lucide-react'

const PORTAL_ID = '22308423'
const FORM_ID = 'cf4128d5-51f1-46aa-ae4a-552bcff20f8c'
const SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`

const HOSTING_OPTIONS = [
  { label: 'Enterprise Cloud', value: 'Enterprise Cloud' },
  { label: 'Managed by SigNoz in your cloud (BYOC)', value: 'Managed by SigNoz in your cloud (BYOC)' },
  {
    label: 'Self Host with support contract (Enterprise Self-Hosted)',
    value: 'Self Host with support contract (Enterprise Self-Hosted)',
  },
]

const TOOLS = [
  { label: 'Datadog', value: 'Datadog' },
  { label: 'New Relic', value: 'New Relic' },
  { label: 'Grafana (LTM)', value: 'Grafana(LTM)' },
  { label: 'Splunk', value: 'Splunk' },
  { label: 'Cloudwatch', value: 'Cloudwatch' },
  { label: 'Others', value: 'Others' },
]

const inputBase =
  'w-full h-[38px] rounded-[6px] border border-[#1D2026] bg-[#111318] px-3 text-sm text-[#ECE8E1] placeholder-[#6B7280]/50 outline-none transition focus:border-[#4E74F8] focus:ring-1 focus:ring-[#4E74F8]'

const Label = ({ children }: { children: React.ReactNode }) => (
  <span className="block text-xs leading-4 text-[#6B7280]">{children}</span>
)

const Field = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-[5px]">{children}</div>
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
    setTools((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value],
    )

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
      ...(tools.length ? [{ objectTypeId: '0-2', name: 'existing_tools', value: tools.join(';') }] : []),
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
        <div className="text-2xl text-[#4E74F8]">✓</div>
        <h3 className="text-lg font-semibold text-[#ECE8E1]">We'll be in touch soon.</h3>
        <p className="text-sm text-[#6B7280]">
          A SigNoz expert will reach out within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Email */}
      <Field>
        <Label>Work Email *</Label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          className={inputBase}
        />
      </Field>

      {/* Hosting setup */}
      <Field>
        <Label>What is your preferred hosting setup? *</Label>
        <div className="flex flex-col gap-2 pt-1">
          {HOSTING_OPTIONS.map((opt) => (
            <label key={opt.value} className="flex cursor-pointer items-start gap-2.5">
              <input
                type="radio"
                name="hosting"
                value={opt.value}
                checked={hosting === opt.value}
                onChange={() => { setHosting(opt.value); setHostingError(false) }}
                className="sr-only"
              />
              <span className="mt-0.5 flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-full border border-[#1D2026] bg-[#111318]">
                {hosting === opt.value && (
                  <span className="h-[6px] w-[6px] rounded-full bg-[#4E74F8]" />
                )}
              </span>
              <span className="text-sm leading-snug text-[#ECE8E1]">{opt.label}</span>
            </label>
          ))}
        </div>
        {hostingError && (
          <p className="mt-1 text-xs text-red-400">Please select a hosting option.</p>
        )}
      </Field>

      {/* Current scale */}
      <Field>
        <Label>What is your current scale?</Label>
        <input
          type="text"
          value={scale}
          onChange={(e) => setScale(e.target.value)}
          placeholder="e.g. 5B logs per month or requests per second"
          className={inputBase}
        />
      </Field>

      {/* Observability tools */}
      <Field>
        <Label>Which observability tool do you currently use?</Label>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-1">
          {TOOLS.map((tool) => (
            <label key={tool.value} className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                value={tool.value}
                checked={tools.includes(tool.value)}
                onChange={() => toggleTool(tool.value)}
                className="sr-only"
              />
              <span className="flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded-[3px] border border-[#1D2026] bg-[#111318]">
                {tools.includes(tool.value) && (
                  <svg className="h-2.5 w-2.5" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1.5 5l2.5 2.5 5-5"
                      stroke="#4E74F8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <span className="text-sm text-[#ECE8E1]">{tool.label}</span>
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
          rows={3}
          className="h-[72px] w-full resize-none rounded-[6px] border border-[#1D2026] bg-[#111318] px-3 py-2 text-sm text-[#ECE8E1] placeholder-[#6B7280]/50 outline-none transition focus:border-[#4E74F8] focus:ring-1 focus:ring-[#4E74F8]"
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
        className="mt-1 flex h-[42px] w-full items-center justify-center gap-2 rounded-[8px] bg-[#4E74F8] text-sm font-semibold text-white transition hover:bg-[#4E74F8]/90 disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {loading ? 'Submitting…' : 'Book a Demo →'}
      </button>
    </form>
  )
}
