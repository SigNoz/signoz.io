'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useLogEvent } from './useLogEvent'
import {
  createSubmissionRelayId,
  sendSubmissionRelayInBackground,
} from '@/utils/submissionRelayClient'

export interface SignupErrors {
  fullName?: string
  workEmail?: string
  companyName?: string
  termsOfService?: string
  apiError?: string
}

export interface UseSignupFormOptions {
  /** Where the form is rendered, used in tracking events */
  source: string
  /** Called on unrecoverable error (default: scroll to top) */
  onError?: () => void
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const isValidEmail = (email: string) => EMAIL_REGEX.test(email)

export function useSignupForm({ source, onError }: UseSignupFormOptions) {
  const [errors, setErrors] = useState<SignupErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitFailed, setSubmitFailed] = useState(false)
  const router = useRouter()
  const logEvent = useLogEvent()

  const handleError = useCallback(() => {
    setSubmitFailed(true)
    if (onError) {
      onError()
    } else {
      window.scrollTo({ top: 100, behavior: 'smooth' })
    }
  }, [onError])

  const handleGTMCustomEventTrigger = useCallback((payload: Record<string, any>) => {
    if (window && (window as any).dataLayer && Array.isArray((window as any).dataLayer)) {
      ;(window as any).dataLayer.push({
        event: 'signoz-cloud-signup-form-submit',
        ...payload,
      })
    }
    localStorage.setItem('prevSignupEmail', payload.email)
  }, [])

  const validatePayload = useCallback(
    (payload: { email: string; preferences: { terms_of_service_accepted: boolean } }) => {
      const newErrors: SignupErrors = {}

      if (!payload.email.trim()) {
        newErrors.workEmail = 'Work email is required'
      } else if (!isValidEmail(payload.email)) {
        newErrors.workEmail = 'Please enter a valid company email'
      }

      if (!payload.preferences.terms_of_service_accepted) {
        newErrors.termsOfService = 'You must accept the Terms of Service to continue'
      }

      const isValid = Object.keys(newErrors).length === 0

      if (!isValid) {
        logEvent({
          eventType: 'track',
          eventName: 'Sign Up Validation Failed',
          attributes: {
            errors: newErrors,
            email: payload.email,
            source,
          },
        })
      }

      setErrors(newErrors)
      return isValid
    },
    [logEvent]
  )

  const validateSocialSignupPayload = useCallback(
    (payload: { connector: string; preferences: { terms_of_service_accepted: boolean } }) => {
      const newErrors: SignupErrors = {}
      if (!payload.preferences.terms_of_service_accepted) {
        newErrors.termsOfService = 'You must accept the Terms of Service to continue'
      }

      const isValid = Object.keys(newErrors).length === 0

      if (!isValid) {
        logEvent({
          eventType: 'track',
          eventName: 'Social Sign Up Validation Failed',
          attributes: {
            errors: newErrors,
            connector: payload.connector,
            source,
          },
        })
      }

      setErrors(newErrors)
      return isValid
    },
    [logEvent]
  )

  const handleSignUp = useCallback(
    async (payload: {
      email: string
      region: { name: string }
      preferences: { terms_of_service_accepted: boolean; opted_email_updates: boolean }
    }) => {
      setSubmitFailed(false)
      const isValid = validatePayload(payload)

      if (!isValid) return

      setIsSubmitting(true)

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (response.ok) {
          setSubmitSuccess(true)
          handleGTMCustomEventTrigger(payload)

          localStorage.setItem('app_user_id', payload.email)

          logEvent({
            eventType: 'identify',
            eventName: 'User Signed Up',
            attributes: {
              email: payload.email,
              dataRegion: payload.region.name,
              method: 'email_signup',
            },
          })

          const domain = payload.email.split('@')[1] || 'unknown_domain'
          logEvent({
            eventType: 'group',
            eventName: 'User Associated with Company',
            groupId: domain,
            attributes: { domain },
          })

          localStorage.setItem('workEmail', payload.email)
          localStorage.setItem('region', payload.region.name)

          sendSubmissionRelayInBackground({
            email: payload.email,
            signupId: createSubmissionRelayId(`${source}-email`),
            source: `${source}-email-signup`,
            createdAt: new Date().toISOString(),
            pageLocation: window.location.pathname,
            dataRegion: payload.region.name,
            method: 'email_signup',
          })

          router.push('/verify-email')
        } else {
          const errorData = await response.json()

          logEvent({
            eventType: 'track',
            eventName: 'Sign Up API Error',
            attributes: {
              error: errorData.error,
              status: response.status,
              email: payload.email,
              region: payload.region.name,
              source,
            },
          })

          setErrors({ apiError: errorData.error })
          handleError()
        }
      } catch (error) {
        logEvent({
          eventType: 'track',
          eventName: 'Sign Up Exception',
          attributes: {
            errorMessage: error instanceof Error ? error.message : String(error),
            email: payload.email,
            source,
          },
        })
        handleError()
      } finally {
        setIsSubmitting(false)
      }
    },
    [handleError, handleGTMCustomEventTrigger, logEvent, router, validatePayload, source]
  )

  const handleSocialSignup = useCallback(
    async (payload: {
      region: { name: string }
      preferences: { terms_of_service_accepted: boolean; opted_email_updates: boolean }
      connector: string
    }) => {
      setSubmitFailed(false)
      if (!validateSocialSignupPayload(payload)) {
        return
      }
      setIsSubmitting(true)

      logEvent({
        eventType: 'track',
        eventName: 'Teams Page Social Signup Redirect Initiated',
        attributes: {
          connector: payload.connector,
          region: payload.region.name,
        },
      })

      localStorage.setItem('region', payload.region.name)
      window.location.href = `${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/connectors/${payload.connector}/url`
    },
    [validateSocialSignupPayload, logEvent]
  )

  const handleSocialSignupCallback = useCallback(
    async (payload: { code: string }) => {
      setSubmitFailed(false)
      setIsSubmitting(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CONTROL_PLANE_URL}/connectors/me/users`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          }
        )

        if (response.ok) {
          const responseData = await response.json()

          const data_region = localStorage.getItem('region')
          setSubmitSuccess(true)
          handleGTMCustomEventTrigger({ ...responseData?.data, region: data_region })

          localStorage.setItem('app_user_id', responseData.data.email)

          logEvent({
            eventType: 'identify',
            eventName: 'User Signed Up',
            attributes: {
              email: responseData.data.email,
              dataRegion: data_region,
              method: 'social_signup',
            },
          })

          const domain = responseData.data.email.split('@')[1] || 'unknown_domain'
          logEvent({
            eventType: 'group',
            eventName: 'User Associated with Company',
            groupId: domain,
            attributes: { domain },
          })

          sendSubmissionRelayInBackground({
            email: responseData.data.email,
            signupId: responseData.data.code || createSubmissionRelayId(`${source}-social`),
            source: `${source}-social-signup`,
            createdAt: new Date().toISOString(),
            pageLocation: window.location.pathname,
            dataRegion: data_region || undefined,
            connector: (payload as any).connector,
            method: 'social_signup',
          })

          router.push(
            `/users?email=${encodeURIComponent(responseData.data.email)}&code=${responseData.data.code}&region=${data_region}`
          )
        } else {
          const errorData = await response.json()

          logEvent({
            eventName: 'Social Signup Error',
            eventType: 'track',
            attributes: {
              errorData: errorData,
              errorType: 'API Error',
              status: response.status,
              ...payload,
            },
          })

          setErrors({ apiError: errorData.error })
          handleError()
        }
      } catch (error) {
        logEvent({
          eventName: 'Social Signup Error',
          eventType: 'track',
          attributes: {
            errorType: 'Catch Block Error',
            error,
            errorMessage: error instanceof Error ? error.message : String(error),
            ...payload,
          },
        })

        handleError()
      } finally {
        setIsSubmitting(false)
      }
    },
    [handleError, handleGTMCustomEventTrigger, logEvent, router, source]
  )

  return {
    errors,
    setErrors,
    isSubmitting,
    submitSuccess,
    submitFailed,
    setSubmitFailed,
    handleSignUp,
    handleSocialSignup,
    handleSocialSignupCallback,
    handleError,
    logEvent,
  }
}
