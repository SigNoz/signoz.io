'use client'
import { useEffect, useState } from 'react'
import Styles from './styles.module.css'
import { AppModal as Modal } from '@/components/ui/Modal'
import { useDisclosure } from '@/hooks/useDisclosure'
import { DeploymentType, DeploymentTypeColors, DeploymentTypeLabels } from '@/utils/strapi'
import { useRouter, useSearchParams } from 'next/navigation'
import { Check, Loader2 } from 'lucide-react'
import { saveChangelogSubscription } from '@/utils/strapi'
import Link from 'next/link'

interface ErrorsProps {
  email?: string
}

interface Props {
  showFilters?: boolean
}

const ChangelogHeader: React.FC<Props> = ({ showFilters = true }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const router = useRouter()
  const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<ErrorsProps>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [currentDeploymentType, setCurrentDeploymentType] = useState<DeploymentType>(
    DeploymentType.ALL
  )

  useEffect(() => {
    const deploymentType = searchParams.get('deploymentType')
    const decodedDeploymentType = deploymentType ? decodeURIComponent(deploymentType) : undefined

    let deploymentTypeFromParams = Object.values(DeploymentType).includes(
      decodedDeploymentType as DeploymentType
    )
      ? (decodedDeploymentType as DeploymentType)
      : DeploymentType.ALL

    setCurrentDeploymentType(deploymentTypeFromParams)
  }, [])

  const handleSubscribeClick = () => {
    onOpen()
  }

  const handleDeploymentTypeChange = (type: DeploymentType) => {
    setCurrentDeploymentType(type)
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set('deploymentType', encodeURIComponent(type))
    router.push(`/changelog?${queryParams.toString()}`, { scroll: false })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    if (!email) {
      setErrors((prev) => ({ ...prev, email: 'Email is required' }))
      return
    } else if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: 'Please enter a valid email' }))
      return
    }

    setIsSubmitting(true)
    const savedSuccessFully = await saveChangelogSubscription(email)
    setIsSubmitting(false)
    if (!savedSuccessFully) {
      setErrors((prev) => ({ ...prev, email: 'Failed to save email. Please try again.' }))
      return
    }
    setEmail('')
    onClose()
  }

  return (
    <div className="flex flex-col gap-3 px-4 md:px-8 lg:px-0">
      <h1 className={`text-l1-foreground text-3xl font-semibold ${Styles['header-title']}`}>
        Changelog
      </h1>
      <div
        className={`${Styles['subscribe-cta-container']} flex flex-wrap items-center gap-x-4 gap-y-2`}
      >
        <button
          className="text-accent-primary hover:text-robin-200 text-base"
          onClick={handleSubscribeClick}
        >
          Subscribe for updates
        </button>
        <span className="bg-secondary block h-1 w-1 rounded-full"></span>
        <Link
          href="https://www.linkedin.com/company/signozio"
          target="_blank"
          className="text-muted-foreground hover:text-l1-foreground text-base"
        >
          Follow us on LinkedIn
        </Link>
      </div>
      {showFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {Object.values(DeploymentType).map((type) => (
            <button
              key={type}
              className={`border-border bg-background text-l1-foreground hover:bg-l3-background active:bg-muted flex items-center gap-1.5 rounded-full border py-1 pr-2 pl-3 text-xs transition-colors ${
                currentDeploymentType === type ? 'bg-muted' : ''
              }`}
              onClick={() => handleDeploymentTypeChange(type)}
            >
              <span
                className={`block h-1.5 w-1.5 flex-shrink-0 rounded-full ${DeploymentTypeColors[type]} ${type === DeploymentType.OSS_ONLY ? 'bg-sienna-500' : ''}`}
              ></span>
              <span className="font-medium tracking-wide uppercase">
                {DeploymentTypeLabels[type]}
              </span>
            </button>
          ))}
        </div>
      )}
      <Modal
        size="xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        panelClassName="overflow-hidden rounded-lg bg-card p-0"
      >
        <div className="flex flex-col">
          <p className={`text-l1-foreground p-4 text-sm ${Styles['subscription-modal-header']}`}>
            Get notified when we ship something new
          </p>
          <span className="bg-muted block h-px w-full"></span>
          <div className="px-4 pt-3 pb-4">
            <form className="flex flex-col gap-2" onSubmit={handleEmailSubmit}>
              <label htmlFor="email" className="text-l1-foreground text-sm">
                Enter your email
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="email"
                  disabled={isSubmitting}
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Eg. johndoe@example.com"
                  className="border-border bg-l3-background w-full rounded-l-sm border border-r-0 border-solid px-3 py-1.5 text-sm tracking-normal text-stone-300"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary text-l1-foreground active:bg-primary-background-hover flex w-32 items-center justify-center gap-1 rounded-r-sm px-4 text-xs"
                >
                  {isSubmitting ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <>
                      <Check size={16} />
                      Subscribe
                    </>
                  )}
                </button>
              </div>
              {errors.email && (
                <span className="text-danger-foreground text-xs">{errors.email}</span>
              )}
            </form>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ChangelogHeader
