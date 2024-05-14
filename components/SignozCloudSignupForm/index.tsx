import React, { useState } from 'react'
import ReactGA from 'react-ga4'
import styles from './styles.module.css'

interface ErrorsProps {
  fullName?: string
  workEmail?: string
  companyName?: string
}

ReactGA.initialize('G-6NFJ2Y6NQN')

export default function SignozCloudSignUpForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    workEmail: '',
    companyName: '',
    dataRegion: 'us',
    source: '',
  })

  const [errors, setErrors] = useState<ErrorsProps>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitFailed, setSubmitFailed] = useState(false)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    let errors = {}

    if (!formData.fullName.trim()) {
      errors['fullName'] = 'Full Name is required'
    }

    if (!formData.workEmail.trim()) {
      errors['workEmail'] = 'Work Email is required'
    } else if (!isValidCompanyEmail(formData.workEmail)) {
      errors['workEmail'] = 'Please enter a valid company email'
    }

    if (!formData.companyName.trim()) {
      errors['companyName'] = 'Company Name is required'
    }

    setErrors(errors)

    return Object.keys(errors).length === 0
  }

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  function isValidCompanyEmail(email) {
    // Regular expression pattern to match valid company email domains
    var companyEmailPattern =
      /@(?!gmail|yahoo|hotmail|outlook|live|icloud)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    // Check if the email matches the email format and the company email pattern
    return isValidEmail(email) && companyEmailPattern.test(email)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setSubmitFailed(false)

    const isFormValid = validateForm()

    if (isFormValid) {
      handleSignUp()
    }
  }

  const handleGTMCustomEventTrigger = (payload) => {
    if (window && window?.dataLayer && Array.isArray(window.dataLayer)) {
      window?.dataLayer.push({
        event: 'signoz-cloud-signup-form-submit',
        ...payload,
      })
    }

    // Sending a custom event to GA4 using ReactGA
    ReactGA.event({
      category: 'Signup', // Adjusted to a more general term for the event category
      action: 'Submit', // Simplified action
      label: 'SigNoz Cloud Signup', // Label to provide more context
      nonInteraction: false, // Setting to false as this is an interactive event

      // ReactGA.event({
      //   category: "SigNoz Cloud Signup",
      //   action: "SigNozCloudSignup",
      //   value: 99, // optional, must be a number
      //   nonInteraction: true, // optional, true/false
      //   transport: "xhr", // optional, beacon/xhr/image
      //     ...payload
      // }, {
      //   ...payload
    })
  }

  const handleError = () => {
    setSubmitFailed(true)
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    })
  }

  const handleSignUp = async () => {
    setIsSubmitting(true)
    setSubmitFailed(false)

    const payload = {
      name: formData.fullName,
      email: formData.workEmail,
      company_name: formData.companyName,
      data_region: formData.dataRegion,
      source: formData.source,
    }

    try {
      const response = await fetch('https://signup.signoz.cloud/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (response.ok) {
        setSubmitSuccess(true)
        handleGTMCustomEventTrigger(payload)

        setFormData({
          fullName: '',
          workEmail: '',
          companyName: '',
          dataRegion: 'us',
          source: '',
        })

        window.location.href = 'https://signoz.io/verify-email'
      } else {
        // To do, handle other errors apart from invalid email
        if (response.status === 400) {
          setErrors({
            workEmail: 'Please enter a valid work email.',
          })
        }
      }
    } catch (error) {
      handleError()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className={styles.header}>
        <h2 className="text-2xl font-bold"> Get started with SigNoz </h2>
        <h4 className="m-2 font-bold">
          Try SigNoz free for 30 days with full access to all features
        </h4>
        <h5 className="m-2 text-sm font-bold"> No credit card required</h5>
      </div>

      {!isSubmitting && submitFailed ? (
        <div className={styles.errorContainer}>
          <div
            className="bg-white-300 my-4  block rounded border border-red-400 px-4 py-3 text-center text-orange-400"
            role="alert"
          >
            <div className="my-4 block">
              We're sorry, it looks like something didn't go as planned. Please reach out to us for
              assistance.
            </div>
          </div>

          <a className="button button--primary" href="mailto:cloud-support@signoz.io">
            Contact Support
          </a>
        </div>
      ) : (
        <form className={styles.sigNozCloudSignUpForm}>
          <div className="mb-5">
            <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-900 ">
              Full Name*
            </label>
            <input
              type="text"
              disabled={isSubmitting}
              id="fullName"
              name="fullName"
              className={`block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  ${
                styles.formInput
              } ${errors?.fullName ? styles.hasError : ''}`}
              placeholder=""
              onChange={handleInputChange}
              required
            />

            {errors?.fullName && <span className="text-sm text-red-400">{errors.fullName}</span>}
          </div>
          <div className="mb-5">
            <label htmlFor="workEmail" className="mb-2 block text-sm font-medium text-gray-900 ">
              Work Email*
            </label>
            <input
              type="email"
              disabled={isSubmitting}
              id="workEmail"
              name="workEmail"
              className={`block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  ${
                styles.formInput
              } ${errors?.fullName ? styles.hasError : ''}`}
              onChange={handleInputChange}
              required
            />

            {errors?.workEmail && <span className="text-sm text-red-400">{errors.workEmail}</span>}
          </div>

          <div className="mb-5">
            <label htmlFor="companyName" className="mb-2 block text-sm font-medium text-gray-900 ">
              Company Name*
            </label>
            <input
              type="text"
              id="companyName"
              disabled={isSubmitting}
              name="companyName"
              className={`block w-full rounded-sm border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-900  ${
                styles.formInput
              } ${errors?.fullName ? styles.hasError : ''}`}
              onChange={handleInputChange}
              required
            />

            {errors?.companyName && (
              <span className="text-sm text-red-400">{errors.companyName}</span>
            )}
          </div>

          <div className="mb-5">
            <label htmlFor="dataRegion" className="mb-2 block text-sm font-medium text-gray-900  ">
              Data Region*
            </label>
            <select
              id="dataRegion"
              name="dataRegion"
              disabled={isSubmitting}
              className="block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 "
              onChange={handleInputChange}
            >
              <option value="us" className={styles.dataRegionOption}>
                United States
              </option>
              <option value="eu" className={styles.dataRegionOption}>
                Europe
              </option>
              <option value="in" className={styles.dataRegionOption}>
                India
              </option>
            </select>
          </div>

          <div className="mb-5">
            <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-900 ">
              Where did you hear about us?
            </label>
            <textarea
              id="source"
              name="source"
              disabled={isSubmitting}
              rows={4}
              className={`block w-full rounded-sm border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900  ${styles.source}`}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <button
            className={`h-10 w-4/12 cursor-pointer rounded-none border-none bg-primary-400 text-sm outline-none hover:bg-primary-500 ${styles.getStartedBtn}`}
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <div className={styles.submittingForm}>
                {/* <Spin indicator={<LoadingOutlined style={{ fontSize: 18 }} spin />} /> */}
                Submitting
              </div>
            ) : (
              'Get Started'
            )}
          </button>
        </form>
      )}
    </>
  )
}
