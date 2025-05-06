'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Loader2 } from 'lucide-react'
import { EXPERIMENTS } from '../../constants/experiments'

interface ErrorsProps {
  fullName?: string
  workEmail?: string
  companyName?: string
  termsOfService?: string
}

interface FormState {
  fullName: string
  workEmail: string
  companyName: string
  dataRegion: string
  source: string
  termsOfServiceAccepted: boolean
}

interface Region {
  name: string
  id: string
  iconURL: string
}

// Variant Navbar component
export const VariantNavbar = () => {
  return (
    <div className="header-bg fixed left-0 right-0 top-0 z-[30] mx-auto box-border flex h-[56px] w-full items-center border-b border-signoz_slate-500 px-4 text-signoz_vanilla-100 backdrop-blur-[20px] md:px-8 lg:px-8">
      <div className="container flex w-full items-center justify-between text-signoz_vanilla-100">
        <div className="flex justify-start">
          <Link href="/" className="-m-1.5 flex items-center gap-2 p-1.5">
            <Image
              className="h-5 w-auto"
              src="/img/SigNozLogo-orange.svg"
              width={160}
              height={60}
              alt=""
            />
            <span className="text-[17.111px] font-medium">SigNoz</span>
          </Link>
        </div>
        <div className="flex items-center">
          <Link
            href="/docs"
            className="flex items-center truncate px-1.5 py-1 text-sm font-normal hover:text-signoz_robin-500"
          >
            Read Documentation
          </Link>
        </div>
      </div>
    </div>
  )
}

// Error state component
const ErrorState: React.FC = () => {
  return (
    <div className="welcome-container mt-[32px] flex flex-col items-center">
      <div className="text-md rounded-[6px] border border-[#1D212D] bg-signoz_ink-300 p-[24px]">
        <div>
          {' '}
          We're sorry, it looks like something didn't go as planned. Please reach out to us for
          assistance.
        </div>
      </div>

      <a
        type="submit"
        className="mt-[28px] flex w-full items-center justify-center gap-4 rounded-full bg-signoz_cherry-500 px-[16px] py-[8px] text-sm font-medium"
        href="mailto:cloud-support@signoz.io"
      >
        <span className="text-xs leading-5">Contact cloud support</span>
        <ArrowRight size={14} />
      </a>
    </div>
  )
}

// Experiment variant component
export const ExperimentVariant: React.FC<{
  formData: FormState
  errors: ErrorsProps
  isSubmitting: boolean
  submitFailed: boolean
  handleInputChange: (event: any) => void
  handleRegionChange: (region: string) => void
  handleSubmit: (event: any) => void
  regions: Region[]
}> = ({
  formData,
  errors,
  isSubmitting,
  submitFailed,
  handleInputChange,
  handleRegionChange,
  handleSubmit,
  regions,
}) => {
  // Variant signup form
  const SignupForm = () => {
    return (
      <form className="w-100 mt-[24px]">
        <div className="mb-[28px]">
          <label htmlFor="workEmail" className="mb-2 block font-medium">
            Work email
          </label>
          <input
            type="email"
            id="workEmail"
            disabled={isSubmitting}
            name="workEmail"
            value={formData.workEmail}
            autoComplete="off"
            onChange={handleInputChange}
            placeholder="E.g. bart@simpsonmail.com"
            className="w-full rounded-sm border border-solid border-signoz_slate-400 bg-signoz_ink-300 px-3 py-1.5 text-sm tracking-normal text-stone-300"
          />

          {errors?.workEmail && <div className="mt-2 text-xs text-red-400">{errors.workEmail}</div>}
        </div>

        <div className="data-regions mb-[28px]">
          <label className="mb-2 block font-medium" htmlFor="dataRegion">
            Data region
          </label>

          <div className="mt-2 flex max-w-full flex-wrap gap-3 leading-[129%] tracking-normal">
            {regions.map((region) => (
              <button
                type="button"
                key={region.id}
                className={`flex min-w-44 gap-4 self-start whitespace-nowrap rounded-sm border border-solid p-3 text-sm leading-[129%] tracking-normal ${region.id === formData.dataRegion ? 'border-[#4e74f866] bg-[#4e74f833]' : 'border-signoz_slate-400 bg-signoz_ink-300'}`}
                onClick={() => {
                  handleRegionChange(region.id)
                }}
              >
                <Image
                  loading="lazy"
                  src={region.iconURL}
                  alt={`${region} flag`}
                  className="aspect-square w-5 shrink-0"
                  width={20}
                  height={20}
                />
                <span className="">{region.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-[28px] space-y-2.5 rounded-md border border-signoz_slate-500/30 bg-signoz_ink-400/30 p-3.5">
          <div className="flex items-start gap-2.5">
            <input
              type="checkbox"
              id="termsOfServiceAccepted"
              name="termsOfServiceAccepted"
              checked={formData.termsOfServiceAccepted}
              onChange={handleInputChange}
              className="mt-0.5 h-4 w-4 rounded border border-gray-500 bg-transparent accent-signoz_robin-500"
            />
            <label htmlFor="termsOfServiceAccepted" className="text-sm text-stone-300">
              I agree to the{' '}
              <a
                href="https://signoz.io/terms-of-service/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-signoz_robin-500 hover:underline"
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="https://signoz.io/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-signoz_robin-500 hover:underline"
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>
          {errors?.termsOfService && (
            <div className="ml-6.5 text-xs text-red-400">{errors.termsOfService}</div>
          )}
        </div>

        <button
          disabled={isSubmitting}
          onClick={handleSubmit}
          className={`mb-[16px] flex w-full items-center justify-center rounded-full bg-signoz_cherry-500 py-2 pl-4 pr-3 font-medium ${isSubmitting ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2 text-sm">
              Starting your free 30-day trial
              <Loader2 size={16} className="animate-spin" />{' '}
            </div>
          ) : (
            <span className="flex items-center gap-1.5 px-px text-sm">
              Start Your Free Trial Now!
              <ArrowRight size={16} />
            </span>
          )}
        </button>
        <p className="mt-4 text-center leading-[129%] tracking-normal text-stone-300">
          No credit card required. Cancel anytime.
        </p>
      </form>
    )
  }

  return (
    <section className="signup-form-section flex w-full flex-col bg-signoz_ink-500 max-md:ml-0 max-md:w-full lg:w-[70%] xl:w-[60%]">
      <div className="flex w-full grow flex-col justify-center px-8 py-4 text-sm leading-5 text-white max-md:mt-10 max-md:max-w-full lg:px-12 lg:py-8 xl:px-36 xl:py-8">
        <h1 className="mt-11 text-3xl font-bold leading-8 text-signoz_robin-500 max-md:mt-10 max-md:max-w-full">
          Join SigNoz Cloud Today!
        </h1>
        <p className="w-100 text-md mt-2 text-base leading-6 text-signoz_vanilla-100 max-md:max-w-full">
          <span className="font-bold">30-day free trial</span> with all premium features. No
          installation needed - get started in under 5 minutes!
        </p>

        {!isSubmitting && submitFailed ? <ErrorState /> : <SignupForm />}
      </div>
    </section>
  )
}
