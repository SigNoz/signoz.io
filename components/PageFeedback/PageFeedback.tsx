'use client'

import React, { useId, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { QUERY_PARAMS } from '../../constants/queryParams'
import { ONBOARDING_SOURCE } from '../../constants/globals'
import { cn } from 'app/lib/utils'

interface AdditionalDetails {
  [key: string]: string
}

interface PageFeedbackProps {
  placement?: 'default' | 'toc'
}

const negativeOptions = [
  {
    value: 'Inaccurate',
    description: "Doesn't accurately describe the product or feature.",
  },
  {
    value: "Couldn't find what I was looking for",
    description: 'Missing important information.',
  },
  { value: 'Hard to understand', description: 'Too complicated or unclear.' },
  {
    value: 'Code sample errors',
    description: 'One or more code samples are incorrect.',
  },
  { value: 'Another reason', description: '' },
]

const positiveOptions = [
  { value: 'Accurate', description: 'Accurately describes the product or feature.' },
  { value: 'Solved my problem', description: 'Helped me resolve an issue.' },
  { value: 'Easy to understand', description: 'Easy to follow and comprehend.' },
  {
    value: 'Helped me decide to use the product',
    description: 'Convinced me to adopt the product or feature.',
  },
  { value: 'Another reason', description: '' },
]

interface FeedbackOption {
  value: string
  description: string
}

interface FeedbackFormProps {
  title: string
  helpText: string
  options: FeedbackOption[]
  selectedValue: string
  fieldName: string
  idPrefix: string
  onSelect: (value: string) => void
  additionalDetails: AdditionalDetails
  onTextAreaChange: (option: string, value: string) => void
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isSubmitting: boolean
  submitError: string
  formClassName: string
  titleClassName: string
  helpTextClassName: string
  optionGroupClassName: string
  optionCardClassName: (isSelected: boolean) => string
  optionLabelClassName: string
  radioClassName: string
  optionTextClassName: string
  optionDescriptionClassName: string
  textAreaClassName: string
  formActionsClassName: string
  submitButtonClassName: string
  errorTextClassName: string
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  title,
  helpText,
  options,
  selectedValue,
  fieldName,
  idPrefix,
  onSelect,
  additionalDetails,
  onTextAreaChange,
  onSubmit,
  isSubmitting,
  submitError,
  formClassName,
  titleClassName,
  helpTextClassName,
  optionGroupClassName,
  optionCardClassName,
  optionLabelClassName,
  radioClassName,
  optionTextClassName,
  optionDescriptionClassName,
  textAreaClassName,
  formActionsClassName,
  submitButtonClassName,
  errorTextClassName,
}) => (
  <form className={formClassName} onSubmit={onSubmit}>
    <h3 className={titleClassName}>{title}</h3>
    <p className={helpTextClassName}>{helpText}</p>
    <div className={optionGroupClassName}>
      {options.map((option, index) => {
        const inputId = `${idPrefix}-${index}`
        const isSelected = selectedValue === option.value
        return (
          <div className={optionCardClassName(isSelected)} key={option.value}>
            <label className={optionLabelClassName} htmlFor={inputId}>
              <input
                id={inputId}
                className={radioClassName}
                type="radio"
                name={fieldName}
                value={option.value}
                checked={isSelected}
                onChange={(e) => onSelect(e.target.value)}
              />
              <span className="flex min-w-0 flex-col gap-[3px]">
                <span className={optionTextClassName}>{option.value}</span>
                {option.description && (
                  <span className={optionDescriptionClassName}>{option.description}</span>
                )}
              </span>
            </label>
            {isSelected && (
              <textarea
                className={textAreaClassName}
                placeholder="Optional: Provide more details..."
                aria-label={`Additional details for ${option.value}`}
                value={additionalDetails[option.value] || ''}
                onChange={(e) => onTextAreaChange(option.value, e.target.value)}
              />
            )}
          </div>
        )
      })}
    </div>
    <div className={formActionsClassName}>
      <button className={submitButtonClassName} type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
      {submitError && (
        <p className={errorTextClassName} role="alert">
          {submitError}
        </p>
      )}
    </div>
  </form>
)

const PageFeedback: React.FC<PageFeedbackProps> = ({ placement = 'default' }) => {
  const [helpful, setHelpful] = useState<boolean | null>(null)
  const [needsImprovement, setNeedsImprovement] = useState<string>('')
  const [positiveFeedback, setPositiveFeedback] = useState<string>('')
  const [additionalDetails, setAdditionalDetails] = useState<AdditionalDetails>({})
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const feedbackFieldPrefix = useId().replace(/:/g, '')

  const searchParams = useSearchParams()
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  const apiUrl = process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL
  const feedbackPath = process.env.NEXT_PUBLIC_SIGNOZ_CMS_FEEDBACK_PATH
  const isTocPlacement = placement === 'toc'
  const helpfulQuestion = isTocPlacement ? 'Is this page helpful?' : 'Was this page helpful?'

  const containerClassName = cn(
    'font-sans text-[#edf2ff] max-w-[560px] mx-auto mt-6 mb-0 pt-[14px] pb-[10px]',
    isTocPlacement &&
      'w-full max-w-full mt-1 mb-0 pt-[2px] pb-0 shrink-0 min-h-0 overflow-visible relative z-[2]'
  )

  const separatorClassName = cn(
    'w-full h-px mb-3 bg-[rgba(126,142,177,0.4)]',
    isTocPlacement && 'bg-[rgba(60,65,82,0.65)] mb-1'
  )

  const panelBaseClassName = cn(
    'border-0 rounded-none p-0 bg-transparent',
    isTocPlacement &&
      'border border-[rgba(42,46,55,0.8)] rounded-lg bg-[rgba(11,12,14,0.5)] max-h-[min(42vh,480px)] overflow-hidden flex flex-col p-[14px] md:p-[8px_10px_6px]'
  )

  const titleClassName = cn(
    'm-0 text-[clamp(1.02rem,0.96rem+0.3vw,1.16rem)] font-semibold leading-[1.3] [text-wrap:balance] text-[#edf2ff]',
    isTocPlacement && 'text-[13px]'
  )

  const helpTextClassName = cn(
    'my-[8px] mb-[14px] text-[13px] leading-[1.45] text-[#c3cde6] [text-wrap:pretty]',
    isTocPlacement && 'my-[6px] mb-[8px] text-[12px] leading-[1.35]'
  )

  const buttonGroupChoiceClassName = isTocPlacement
    ? 'flex w-fit self-start flex-wrap gap-1.5'
    : 'flex flex-wrap justify-stretch gap-2 md:justify-center md:gap-3'

  const choiceButtonClassName = cn(
    'inline-flex items-center justify-center gap-2 border border-[rgba(78,116,248,0.32)] rounded-[10px] cursor-pointer text-[#edf2ff] transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signoz_robin-300 hover:border-[rgba(78,116,248,0.56)] hover:bg-[rgba(20,29,46,0.52)]',
    isTocPlacement
      ? 'px-[9px] py-[6px] text-[12px] min-w-[86px] flex-[0_0_auto] rounded-lg md:min-w-[76px]'
      : 'px-4 py-[9px] text-sm min-w-0 flex-1 md:flex-none md:min-w-[88px]'
  )

  const choiceIconClassName = cn(
    'inline-flex items-center justify-center',
    isTocPlacement ? 'w-[14px] h-[14px] text-[12px]' : 'w-[18px] h-[18px] text-sm'
  )

  const formClassName = cn('flex flex-col', isTocPlacement && 'h-full min-h-0 overflow-hidden')

  const optionGroupClassName = cn(
    'grid gap-2 mb-3',
    isTocPlacement && 'flex-1 min-h-0 overflow-y-auto pr-0.5 gap-1.5 mb-1'
  )

  const optionLabelClassName = cn(
    'flex items-start gap-[10px] cursor-pointer',
    isTocPlacement && 'gap-1.5'
  )

  const radioClassName = cn(
    'w-[18px] h-[18px] mt-px shrink-0 cursor-pointer accent-signoz_robin-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signoz_robin-300',
    isTocPlacement && 'w-4 h-4 mt-0'
  )

  const optionTextClassName = cn(
    'text-sm font-semibold leading-[1.35] text-[#edf2ff]',
    isTocPlacement && 'text-[12px] leading-[1.3] [overflow-wrap:anywhere]'
  )

  const optionDescriptionClassName = cn(
    'text-[12px] leading-[1.35] text-[#c3cde6] [text-wrap:pretty]',
    isTocPlacement && 'leading-[1.25]'
  )

  const textAreaClassName = isTocPlacement
    ? 'mt-1 min-h-[68px] w-full rounded-lg border border-[rgba(78,116,248,0.32)] bg-[rgba(12,16,27,0.78)] p-1.5 text-[12px] leading-[1.35] text-[#edf2ff] placeholder:text-[#91a2c8] resize-y transition-colors motion-reduce:transition-none focus:outline-none focus:border-signoz_robin-500'
    : 'mt-1 min-h-[88px] w-full rounded-lg border border-[rgba(78,116,248,0.32)] bg-[rgba(12,16,27,0.78)] p-[10px] text-[13px] leading-[1.45] text-[#edf2ff] placeholder:text-[#91a2c8] resize-y transition-colors motion-reduce:transition-none focus:outline-none focus:border-signoz_robin-500 md:w-[calc(100%-30px)] md:ml-[30px]'

  const formActionsClassName = cn(
    'mt-0.5 flex flex-col items-center gap-2',
    isTocPlacement &&
      'shrink-0 mt-0 gap-1 px-0 pt-1 pb-[1px] border-t border-[rgba(60,65,82,0.45)] bg-[rgba(11,12,14,0.5)]'
  )

  const submitButtonClassName = cn(
    'self-center mt-0.5 border border-signoz_robin-600 rounded-lg bg-signoz_robin-500 text-[#f5f8ff] px-4 py-[9px] text-sm font-semibold cursor-pointer transition motion-reduce:transition-none hover:bg-signoz_robin-600 hover:border-signoz_robin-600 hover:brightness-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signoz_robin-300 disabled:opacity-[0.62] disabled:cursor-not-allowed',
    isTocPlacement && 'mt-0 min-h-[30px] px-[10px] py-[5px] text-[12px] leading-[1.2]'
  )

  const errorTextClassName = cn(
    'm-0 text-[#ffb8c2] text-[12px] leading-[1.45] text-center',
    isTocPlacement && 'leading-[1.3]'
  )

  const needsImprovementFieldName = `${feedbackFieldPrefix}-needsImprovement`
  const positiveFeedbackFieldName = `${feedbackFieldPrefix}-positiveFeedback`

  const selectNegativeReason = (value: string) => {
    setNeedsImprovement(value)
    setSubmitError('')
  }

  const selectPositiveReason = (value: string) => {
    setPositiveFeedback(value)
    setSubmitError('')
  }

  const handleTextAreaChange = (option: string, value: string) => {
    setAdditionalDetails({
      ...additionalDetails,
      [option]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError('')

    if (!(helpful ? positiveFeedback : needsImprovement)) {
      setSubmitError('Please select an option before submitting feedback.')
      return
    }

    if (!apiUrl || !feedbackPath) {
      setSubmitError('Feedback service is unavailable right now.')
      return
    }

    const selectedReason = helpful ? positiveFeedback : needsImprovement
    const filteredDetails: AdditionalDetails =
      selectedReason && additionalDetails[selectedReason]
        ? { [selectedReason]: additionalDetails[selectedReason] }
        : {}

    const data = {
      helpful,
      needsImprovement: helpful === false ? needsImprovement : '',
      positiveFeedback: helpful === true ? positiveFeedback : '',
      additionalDetails: filteredDetails,
      page: window.location.href,
    }

    try {
      setIsSubmitting(true)
      const response = await fetch(`${apiUrl}${feedbackPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        setSubmitError('Could not submit feedback. Please try again.')
        console.error('Error submitting feedback:', response.statusText)
      }
    } catch (error) {
      setSubmitError('Could not submit feedback. Please try again.')
      console.error('Error submitting feedback:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (source === ONBOARDING_SOURCE) {
    return null
  }

  if (submitted) {
    return (
      <div className={containerClassName}>
        <div className={separatorClassName}></div>
        <section
          className={cn(
            panelBaseClassName,
            isTocPlacement
              ? 'text-left'
              : 'rounded-[10px] border border-[rgba(78,116,248,0.24)] bg-[rgba(10,15,27,0.42)] p-3 text-left'
          )}
        >
          <h3 className={titleClassName}>Thank you for your feedback.</h3>
          <p className={helpTextClassName}>
            Your response helps us keep docs clear, accurate, and actionable.
          </p>
        </section>
      </div>
    )
  }

  return (
    <div className={containerClassName}>
      <div className={separatorClassName}></div>
      <section
        className={cn(panelBaseClassName, helpful === null && !isTocPlacement && 'text-center')}
      >
        {helpful === null && (
          <>
            <h3 className={titleClassName}>{helpfulQuestion}</h3>
            <p className={cn(helpTextClassName, !isTocPlacement && 'mb-3')}>
              Your response helps us improve this page.
            </p>
            <div className={buttonGroupChoiceClassName}>
              <button
                type="button"
                className={choiceButtonClassName}
                onClick={() => {
                  setSubmitError('')
                  setHelpful(true)
                }}
              >
                <span className={choiceIconClassName} aria-hidden="true">
                  👍
                </span>
                <span>Yes</span>
              </button>
              <button
                type="button"
                className={choiceButtonClassName}
                onClick={() => {
                  setSubmitError('')
                  setHelpful(false)
                }}
              >
                <span className={choiceIconClassName} aria-hidden="true">
                  👎
                </span>
                <span>No</span>
              </button>
            </div>
          </>
        )}

        {helpful !== null && (
          <FeedbackForm
            title={helpful ? 'What did you like?' : 'What needs improvement?'}
            helpText={
              helpful
                ? 'Pick the option that best describes your experience.'
                : 'Pick the issue that blocked you. You can add details after selecting one.'
            }
            options={helpful ? positiveOptions : negativeOptions}
            selectedValue={helpful ? positiveFeedback : needsImprovement}
            fieldName={helpful ? positiveFeedbackFieldName : needsImprovementFieldName}
            idPrefix={`${feedbackFieldPrefix}-${helpful ? 'positive' : 'negative'}`}
            onSelect={helpful ? selectPositiveReason : selectNegativeReason}
            additionalDetails={additionalDetails}
            onTextAreaChange={handleTextAreaChange}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitError={submitError}
            formClassName={formClassName}
            titleClassName={titleClassName}
            helpTextClassName={helpTextClassName}
            optionGroupClassName={optionGroupClassName}
            optionCardClassName={(isSelected: boolean) =>
              cn(
                'flex flex-col gap-2 rounded-[10px] border p-[10px_11px] transition-colors motion-reduce:transition-none',
                isTocPlacement
                  ? 'rounded-lg border-[rgba(78,116,248,0.32)] bg-[rgba(18,19,23,0.72)] p-[6px_8px] hover:border-[rgba(78,116,248,0.56)] hover:bg-[rgba(22,24,29,0.9)]'
                  : 'border-[rgba(78,116,248,0.32)] bg-[rgba(14,21,36,0.68)] hover:border-[rgba(78,116,248,0.56)] hover:bg-[rgba(20,29,46,0.76)]',
                isSelected && 'border-[rgba(78,116,248,0.72)] bg-[rgba(31,44,78,0.88)]'
              )
            }
            optionLabelClassName={optionLabelClassName}
            radioClassName={radioClassName}
            optionTextClassName={optionTextClassName}
            optionDescriptionClassName={optionDescriptionClassName}
            textAreaClassName={textAreaClassName}
            formActionsClassName={formActionsClassName}
            submitButtonClassName={submitButtonClassName}
            errorTextClassName={errorTextClassName}
          />
        )}
      </section>
    </div>
  )
}

export default PageFeedback
