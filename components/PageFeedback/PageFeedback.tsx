'use client'

import React, { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Check, PencilLine, X } from 'lucide-react'
import { Button } from '@signozhq/ui/button'
import { Checkbox } from '@signozhq/ui/checkbox'
import { Popover, PopoverAnchor, PopoverContent } from '@signozhq/ui/popover'
import { cn } from 'app/lib/utils'
import { isDocsOnboardingPathname } from '@/utils/docs/onboardingPath'

const ANOTHER_REASON = 'Another reason'

const negativeOptions = [
  { value: 'Inaccurate', description: "Doesn't accurately describe the product or feature." },
  {
    value: "Couldn't find what I was looking for",
    description: 'Missing important information.',
  },
  { value: 'Hard to understand', description: 'Too complicated or unclear.' },
  {
    value: 'Code sample errors',
    description: 'One or more code samples are incorrect.',
  },
  { value: ANOTHER_REASON, description: '' },
]

const positiveOptions = [
  { value: 'Accurate', description: 'Accurately describes the product or feature.' },
  { value: 'Solved my problem', description: 'Helped me resolve an issue.' },
  { value: 'Easy to understand', description: 'Easy to follow and comprehend.' },
  {
    value: 'Helped me decide to use the product',
    description: 'Convinced me to adopt the product or feature.',
  },
  { value: ANOTHER_REASON, description: '' },
]

type FeedbackPayload = {
  helpful?: boolean
  needsImprovement: string
  positiveFeedback: string
  additionalDetails: Record<string, string>
  page: string
}

/** Same production contract: `{ [selectedReason]: details }` when details are non-empty. */
function buildAdditionalDetails(reason: string, details: string): Record<string, string> {
  const trimmed = details.trim()
  return reason && trimmed ? { [reason]: trimmed } : {}
}

async function postFeedback(
  apiUrl: string | undefined,
  feedbackPath: string | undefined,
  data: Omit<FeedbackPayload, 'page'>
): Promise<{ ok: boolean; error?: string }> {
  if (!apiUrl || !feedbackPath) {
    return { ok: false, error: 'Feedback service is unavailable right now.' }
  }

  try {
    const response = await fetch(`${apiUrl}${feedbackPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data: { ...data, page: window.location.href },
      }),
    })
    if (!response.ok) {
      return { ok: false, error: 'Could not submit feedback. Please try again.' }
    }
    return { ok: true }
  } catch (error) {
    console.error('Error submitting feedback:', error)
    return { ok: false, error: 'Could not submit feedback. Please try again.' }
  }
}

type FeedbackMode = 'yes' | 'no' | 'comment' | null

const PageFeedback: React.FC = () => {
  const pathname = usePathname()
  const apiUrl = process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL
  const feedbackPath = process.env.NEXT_PUBLIC_SIGNOZ_CMS_FEEDBACK_PATH

  const [mode, setMode] = useState<FeedbackMode>(null)
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [showThanks, setShowThanks] = useState(false)
  const controlsRef = useRef<HTMLDivElement>(null)
  const modeRef = useRef<FeedbackMode>(null)

  useEffect(() => {
    if (!showThanks) return
    const timeout = window.setTimeout(() => setShowThanks(false), 3200)
    return () => window.clearTimeout(timeout)
  }, [showThanks])

  if (isDocsOnboardingPathname(pathname)) return null

  const resetForm = () => {
    setReason('')
    setDetails('')
    setComment('')
    setSubmitError('')
  }

  const close = () => {
    modeRef.current = null
    setMode(null)
    setShowThanks(false)
    resetForm()
  }

  const openMode = (next: Exclude<FeedbackMode, null>) => {
    if (modeRef.current === next) {
      close()
      return
    }
    modeRef.current = next
    resetForm()
    setShowThanks(false)
    setMode(next)
  }

  // Keep clicks on Yes/No/Send feedback from dismissing the popover so they can switch or toggle.
  const keepOpenIfOnControls = (event: Event) => {
    if (event.target instanceof Node && controlsRef.current?.contains(event.target)) {
      event.preventDefault()
    }
  }

  const selectReason = (value: string, checked: boolean | 'indeterminate') => {
    setSubmitError('')
    if (checked === true) {
      setReason(value)
      setDetails('')
      return
    }
    if (reason === value) {
      setReason('')
      setDetails('')
    }
  }

  const finishSubmit = () => {
    modeRef.current = null
    setMode(null)
    resetForm()
    setShowThanks(true)
  }

  const submitReasons = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError('')
    if (!reason) {
      setSubmitError('Please select an option before submitting feedback.')
      return
    }

    const helpful = mode === 'yes'
    setIsSubmitting(true)
    const result = await postFeedback(apiUrl, feedbackPath, {
      helpful,
      needsImprovement: helpful ? '' : reason,
      positiveFeedback: helpful ? reason : '',
      additionalDetails: buildAdditionalDetails(reason, details),
    })
    setIsSubmitting(false)

    if (!result.ok) {
      setSubmitError(result.error || 'Could not submit feedback. Please try again.')
      return
    }
    finishSubmit()
  }

  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError('')
    const trimmed = comment.trim()
    if (!trimmed) {
      setSubmitError('Please enter feedback before submitting.')
      return
    }

    setIsSubmitting(true)
    const result = await postFeedback(apiUrl, feedbackPath, {
      needsImprovement: '',
      positiveFeedback: '',
      additionalDetails: { Freeform: trimmed },
    })
    setIsSubmitting(false)

    if (!result.ok) {
      setSubmitError(result.error || 'Could not submit feedback. Please try again.')
      return
    }
    finishSubmit()
  }

  const isOpen = mode !== null || showThanks
  const reasonOptions = mode === 'yes' ? positiveOptions : negativeOptions
  const showingReasons = mode === 'yes' || mode === 'no'

  return (
    <div className="relative w-full font-sans">
      <p className="m-0 mb-3 text-xs font-medium uppercase tracking-wide text-[var(--l2-foreground)]">
        Is this page helpful
      </p>

      <Popover
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) close()
        }}
      >
        <PopoverAnchor asChild>
          <div ref={controlsRef} className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Button
                type="button"
                size="icon"
                variant="outlined"
                color="secondary"
                aria-label="Yes, this page was helpful"
                aria-pressed={mode === 'yes'}
                className={cn(
                  '!rounded-full',
                  mode === 'yes' &&
                    '!border-transparent !bg-[var(--success-background)] !text-[var(--success-foreground)] hover:!bg-[var(--success-background-hover)]'
                )}
                onClick={() => openMode('yes')}
              >
                <Check size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="outlined"
                color="secondary"
                aria-label="No, this page was not helpful"
                aria-pressed={mode === 'no'}
                className={cn(
                  '!rounded-full',
                  mode === 'no' &&
                    '!border-transparent !bg-[var(--danger-background)] !text-[var(--danger-foreground)] hover:!bg-[var(--danger-background-hover)]'
                )}
                onClick={() => openMode('no')}
              >
                <X size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>
            <div className="h-7 w-px shrink-0 bg-[var(--l2-border)]" aria-hidden="true" />
            <Button
              type="button"
              size="sm"
              variant="outlined"
              color="secondary"
              prefix={<PencilLine size={14} aria-hidden="true" />}
              className="!rounded-full !font-normal"
              onClick={() => openMode('comment')}
            >
              Send feedback
            </Button>
          </div>
        </PopoverAnchor>

        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={8}
          className="!w-[min(100vw-2rem,280px)] !border-[var(--l1-border)] !bg-[var(--l2-background)] !p-3 !shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
          onPointerDownOutside={keepOpenIfOnControls}
          onInteractOutside={keepOpenIfOnControls}
          onFocusOutside={keepOpenIfOnControls}
          onOpenAutoFocus={(event) => {
            if (showThanks && !mode) event.preventDefault()
          }}
        >
          {showThanks && !mode ? (
            <div
              className="flex items-center gap-2 text-xs text-[var(--l1-foreground-hover)]"
              role="status"
            >
              <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--primary-background)] text-[var(--primary-foreground)]">
                <Check size={12} aria-hidden="true" />
              </span>
              Thank you! We have received your feedback.
            </div>
          ) : showingReasons ? (
            <form className="flex flex-col gap-3" onSubmit={submitReasons}>
              <div>
                <h3 className="m-0 text-sm font-semibold text-[var(--l1-foreground-hover)]">
                  {mode === 'yes' ? 'What did you like?' : 'What needs improvement'}
                </h3>
                <p className="mb-0 mt-1 text-xs text-[var(--l2-foreground)]">
                  {mode === 'yes'
                    ? 'Pick the option that best describes your experience.'
                    : 'Pick the issue that blocked you.'}
                </p>
              </div>
              <div
                className="flex max-h-[min(42vh,360px)] flex-col gap-1 overflow-y-auto"
                role="radiogroup"
              >
                {reasonOptions.map((option) => {
                  const isSelected = reason === option.value
                  return (
                    <div key={option.value} className="flex flex-col gap-1.5">
                      <Checkbox
                        color="primary"
                        value={isSelected}
                        onChange={(checked) => selectReason(option.value, checked)}
                        className={cn(
                          'w-full rounded-md px-2 py-1.5 transition-colors hover:bg-[var(--l1-background)]',
                          isSelected && 'bg-[var(--l1-background)]'
                        )}
                      >
                        <span className="min-w-0 text-xs text-[var(--l2-foreground)]">
                          {option.value}
                        </span>
                      </Checkbox>
                      {isSelected && (
                        <textarea
                          className="min-h-14 w-full resize-y rounded-md border border-[var(--l2-border)] bg-[var(--l2-background-60)] p-2 text-xs text-[var(--l1-foreground-hover)] placeholder:text-[var(--l3-foreground)] focus:border-[var(--primary-background)] focus:outline-none"
                          placeholder="Optional: Provide more details..."
                          aria-label={`Additional details for ${option.value}`}
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
              <Button
                type="submit"
                color="primary"
                variant="solid"
                size="sm"
                loading={isSubmitting}
                prefix={<Check size={14} aria-hidden="true" />}
                className="!w-full"
              >
                Submit feedback
              </Button>
              {submitError && (
                <p className="m-0 text-center text-xs text-[var(--danger-foreground)]" role="alert">
                  {submitError}
                </p>
              )}
            </form>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={submitComment}>
              <textarea
                className="min-h-28 w-full resize-y rounded-md border border-[var(--l2-border)] bg-[var(--l2-background-60)] p-2.5 text-sm text-[var(--l1-foreground-hover)] placeholder:text-[var(--l3-foreground)] focus:border-[var(--primary-background)] focus:outline-none"
                placeholder="Help us improve this page..."
                aria-label="Help us improve this page"
                value={comment}
                onChange={(e) => {
                  setSubmitError('')
                  setComment(e.target.value)
                }}
              />
              <Button
                type="submit"
                color="primary"
                variant="solid"
                size="sm"
                loading={isSubmitting}
                prefix={<Check size={14} aria-hidden="true" />}
                className="!w-full"
              >
                Submit feedback
              </Button>
              <p className="m-0 text-center text-xs text-[var(--l2-foreground)]">
                Have a specific issue?{' '}
                <a
                  href="https://signoz.io/support/"
                  className="text-[var(--primary-background)] no-underline hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Support
                </a>
              </p>
              {submitError && (
                <p className="m-0 text-center text-xs text-[var(--danger-foreground)]" role="alert">
                  {submitError}
                </p>
              )}
            </form>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default PageFeedback
