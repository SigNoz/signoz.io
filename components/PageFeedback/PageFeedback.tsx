'use client'

import React, { useId, useRef, useState } from 'react'
import styles from './PageFeedback.module.css'
import { useSearchParams } from 'next/navigation'
import { QUERY_PARAMS } from '../../constants/queryParams'
import { ONBOARDING_SOURCE } from '../../constants/globals'

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

const cx = (...classNames: Array<string | false | undefined>) =>
  classNames.filter(Boolean).join(' ')

const PageFeedback: React.FC<PageFeedbackProps> = ({ placement = 'default' }) => {
  const [helpful, setHelpful] = useState<boolean | null>(null)
  const [needsImprovement, setNeedsImprovement] = useState<string>('')
  const [positiveFeedback, setPositiveFeedback] = useState<string>('')
  const [additionalDetails, setAdditionalDetails] = useState<AdditionalDetails>({})
  const [submitted, setSubmitted] = useState<boolean>(false)
  const [submitError, setSubmitError] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const feedbackRef = useRef<HTMLDivElement>(null)
  const feedbackFieldPrefix = useId().replace(/:/g, '')

  const searchParams = useSearchParams()
  const source = searchParams.get(QUERY_PARAMS.SOURCE)

  // Use environment variables
  const apiUrl = process.env.NEXT_PUBLIC_SIGNOZ_CMS_API_URL
  const feedbackPath = process.env.NEXT_PUBLIC_SIGNOZ_CMS_FEEDBACK_PATH
  const isTocPlacement = placement === 'toc'
  const helpfulQuestion = isTocPlacement ? 'Is this page helpful?' : 'Was this page helpful?'
  const feedbackClassName = [
    styles.feedbackContainer,
    isTocPlacement ? styles.feedbackContainerToc : '',
  ]
    .filter(Boolean)
    .join(' ')
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

    // Only include details for the currently selected reason
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
      <div ref={feedbackRef} className={feedbackClassName}>
        <div className={styles.separatorLine}></div>
        <section
          className={cx(styles.panel, isTocPlacement && styles.panelToc, styles.successPanel)}
        >
          <h3 className={styles.title}>Thank you for your feedback.</h3>
          <p className={styles.helpText}>
            Your response helps us keep docs clear, accurate, and actionable.
          </p>
        </section>
      </div>
    )
  }

  return (
    <div ref={feedbackRef} className={feedbackClassName}>
      <div className={styles.separatorLine}></div>
      <section
        className={cx(
          styles.panel,
          isTocPlacement && styles.panelToc,
          helpful === null && !isTocPlacement && styles.panelChoice
        )}
      >
        {helpful === null && (
          <>
            <h3 className={styles.title}>{helpfulQuestion}</h3>
            <p className={styles.helpText}>Your response helps us improve this page.</p>
            <div className={cx(styles.buttonGroup, styles.buttonGroupChoice)}>
              <button
                type="button"
                className={cx(styles.button, styles.choiceButton)}
                aria-pressed={helpful === true}
                onClick={() => {
                  setSubmitError('')
                  setHelpful(true)
                }}
              >
                <span className={styles.choiceIcon} aria-hidden="true">
                  👍
                </span>
                <span>Yes</span>
              </button>
              <button
                type="button"
                className={cx(styles.button, styles.choiceButton)}
                aria-pressed={helpful === false}
                onClick={() => {
                  setSubmitError('')
                  setHelpful(false)
                }}
              >
                <span className={styles.choiceIcon} aria-hidden="true">
                  👎
                </span>
                <span>No</span>
              </button>
            </div>
          </>
        )}

        {helpful === false && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.title}>What needs improvement?</h3>
            <p className={styles.helpText}>
              Pick the issue that blocked you. You can add details after selecting one.
            </p>
            <div className={styles.optionGroup}>
              {negativeOptions.map((option, index) => {
                const inputId = `${feedbackFieldPrefix}-negative-${index}`
                const isSelected = needsImprovement === option.value
                return (
                  <div
                    className={cx(
                      styles.option,
                      styles.optionCard,
                      isSelected && styles.optionCardSelected
                    )}
                    key={option.value}
                  >
                    <label
                      className={cx(styles.optionLabel, styles.optionLabelCard)}
                      htmlFor={inputId}
                    >
                      <input
                        id={inputId}
                        className={styles.optionRadio}
                        type="radio"
                        name={needsImprovementFieldName}
                        value={option.value}
                        checked={needsImprovement === option.value}
                        onChange={(e) => selectNegativeReason(e.target.value)}
                      />
                      <span className={styles.optionBody}>
                        <span className={styles.optionText}>{option.value}</span>
                        {option.description && (
                          <span className={styles.optionDescription}>{option.description}</span>
                        )}
                      </span>
                    </label>
                    {needsImprovement === option.value && (
                      <textarea
                        className={styles.textArea}
                        placeholder="Optional: Provide more details..."
                        aria-label={`Additional details for ${option.value}`}
                        value={additionalDetails[option.value] || ''}
                        onChange={(e) => handleTextAreaChange(option.value, e.target.value)}
                      />
                    )}
                  </div>
                )
              })}
            </div>
            <div className={styles.formActions}>
              <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              {submitError && (
                <p className={styles.errorText} role="alert">
                  {submitError}
                </p>
              )}
            </div>
          </form>
        )}

        {helpful === true && (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.title}>What did you like?</h3>
            <p className={styles.helpText}>Pick the option that best describes your experience.</p>
            <div className={cx(styles.optionGroup, styles.optionGroupPositive)}>
              {positiveOptions.map((option, index) => {
                const inputId = `${feedbackFieldPrefix}-positive-${index}`
                const isSelected = positiveFeedback === option.value
                return (
                  <div
                    className={cx(
                      styles.option,
                      styles.optionCard,
                      isSelected && styles.optionCardSelected
                    )}
                    key={option.value}
                  >
                    <label
                      className={cx(styles.optionLabel, styles.optionLabelCard)}
                      htmlFor={inputId}
                    >
                      <input
                        id={inputId}
                        className={styles.optionRadio}
                        type="radio"
                        name={positiveFeedbackFieldName}
                        value={option.value}
                        checked={positiveFeedback === option.value}
                        onChange={(e) => selectPositiveReason(e.target.value)}
                      />
                      <span className={styles.optionBody}>
                        <span className={styles.optionText}>{option.value}</span>
                        {option.description && (
                          <span className={styles.optionDescription}>{option.description}</span>
                        )}
                      </span>
                    </label>
                    {positiveFeedback === option.value && (
                      <textarea
                        className={styles.textArea}
                        placeholder="Optional: Provide more details..."
                        aria-label={`Additional details for ${option.value}`}
                        value={additionalDetails[option.value] || ''}
                        onChange={(e) => handleTextAreaChange(option.value, e.target.value)}
                      />
                    )}
                  </div>
                )
              })}
            </div>
            <div className={styles.formActions}>
              <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              {submitError && (
                <p className={styles.errorText} role="alert">
                  {submitError}
                </p>
              )}
            </div>
          </form>
        )}
      </section>
    </div>
  )
}

export default PageFeedback
