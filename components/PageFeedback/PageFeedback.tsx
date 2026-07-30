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
  const [isDesktop, setIsDesktop] = useState(false)
  const controlsRef = useRef<HTMLDivElement>(null)
  const modeRef = useRef<FeedbackMode>(null)

  useEffect(() => {
    if (!showThanks) return
    const timeout = window.setTimeout(() => setShowThanks(false), 3200)
    return () => window.clearTimeout(timeout)
  }, [showThanks])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)')
    let previousMatches = mediaQuery.matches
    setIsDesktop(previousMatches)

    const syncDesktop = () => {
      const matches = mediaQuery.matches
      if (previousMatches === matches) return
      previousMatches = matches
      setIsDesktop(matches)
      modeRef.current = null
      setMode(null)
      setShowThanks(false)
      setReason('')
      setDetails('')
      setComment('')
      setSubmitError('')
    }

    mediaQuery.addEventListener('change', syncDesktop)
    return () => mediaQuery.removeEventListener('change', syncDesktop)
  }, [])

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
          side={isDesktop ? 'bottom' : 'top'}
          align="start"
          sideOffset={8}
          avoidCollisions={isDesktop}
          className="!z-20 !max-h-[min(calc(100dvh-7rem),480px)] !w-[min(100vw-2rem,280px)] !overflow-y-auto !border-[var(--l2-border)] !bg-[var(--l2-background-60)] !p-1.5 !pt-3 !shadow-[4px_10px_16px_rgba(0,0,0,0.2)] !backdrop-blur-[20px]"
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
            <form className="flex flex-col gap-1" onSubmit={submitReasons}>
              <div className="flex flex-col gap-1 px-2.5 pb-1">
                <h3 className="m-0 text-[13px] font-medium leading-5 tracking-[-0.065px] text-[var(--l2-foreground-hover)]">
                  {mode === 'yes' ? 'What did you like?' : 'What needs improvement'}
                </h3>
                <p className="m-0 text-[11px] leading-[18px] tracking-[-0.055px] text-[var(--l2-foreground)]">
                  {mode === 'yes'
                    ? 'Pick the option that best describes your experience.'
                    : 'Pick the issue(s) that blocked you. You can add details after selecting one.'}
                </p>
              </div>
              <div className="overflow-hidden rounded-[4px] border border-[var(--l2-border)]">
                {reasonOptions.map((option) => {
                  const isSelected = reason === option.value
                  return (
                    <div
                      key={option.value}
                      className="border-b border-[var(--l2-border)] last:border-b-0"
                    >
                      <label
                        className={cn(
                          'flex h-8 w-full cursor-pointer items-center gap-2.5 bg-[var(--l2-background-60)] px-2.5 py-2 transition-colors hover:bg-[var(--l2-background-hover)]'
                        )}
                      >
                        <Checkbox
                          value={isSelected}
                          aria-label={option.value}
                          onChange={(checked) => {
                            setSubmitError('')
                            if (checked) {
                              setReason(option.value)
                              setDetails('')
                              return
                            }
                            setReason('')
                            setDetails('')
                          }}
                        />
                        <span className="min-w-0 text-[11px] leading-none text-[var(--l2-foreground)]">
                          {option.value}
                        </span>
                      </label>
                      {isSelected && (
                        <textarea
                          className="min-h-14 w-full resize-y border-x-0 border-b-0 border-t border-[var(--l2-border)] bg-[var(--l2-background-60)] p-2.5 text-[11px] leading-[18px] text-[var(--l1-foreground-hover)] shadow-none outline-none ring-0 placeholder:text-[var(--l3-foreground)] focus:border-x-0 focus:border-b-0 focus:border-t focus:border-[var(--l2-border)] focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                          placeholder="Optional: Provide more details..."
                          aria-label={`Additional details for ${option.value}`}
                          value={details}
                          onChange={(e) => setDetails(e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
              <Button
                type="submit"
                color="secondary"
                variant="solid"
                size="sm"
                loading={isSubmitting}
                prefix={<Check size={14} aria-hidden="true" />}
                className="!mt-0 !h-8 !w-full !rounded-[2px] !bg-[var(--l3-background-60)] !text-[12px] !font-medium !text-[var(--l1-foreground)] hover:!bg-[var(--l3-background-hover)]"
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
                className="min-h-28 w-full resize-y rounded-[4px] border border-[var(--l2-border)] bg-[var(--l2-background-60)] p-2.5 text-sm text-[var(--l1-foreground-hover)] placeholder:text-[var(--l3-foreground)] focus:border-[var(--primary-background)] focus:outline-none"
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
                color="secondary"
                variant="solid"
                size="sm"
                loading={isSubmitting}
                prefix={<Check size={14} aria-hidden="true" />}
                className="!h-8 !w-full !rounded-[2px] !bg-[var(--l3-background-60)] !text-[12px] !font-medium !text-[var(--l1-foreground)] hover:!bg-[var(--l3-background-hover)]"
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
