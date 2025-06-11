'use client'
import { useEffect, useState } from 'react'
import Styles from './styles.module.css'
import { Modal, ModalContent, ModalBody, useDisclosure, ModalHeader } from '@nextui-org/react'
import { DeploymentType, DeploymentTypeColors } from '@/utils/strapi'
import { useRouter, useSearchParams } from 'next/navigation'

const ChangelogHeader: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const router = useRouter()
  const searchParams = useSearchParams()
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

  return (
    <div className="flex flex-col gap-3 px-4 md:px-8 lg:px-0">
      <h1 className={`text-3xl font-semibold text-signoz_vanilla-100 ${Styles['header-title']}`}>
        Changelog
      </h1>
      <div className={`flex items-center gap-4 ${Styles['subscribe-cta-container']}`}>
        <button className="text-base text-signoz_robin-400" onClick={handleSubscribeClick}>
          Subscribe for updates
        </button>
        <span className="block h-1 w-1 rounded-full bg-signoz_slate-200" />
        <button className="text-base text-signoz_vanilla-400">Follow us on Twitter</button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.values(DeploymentType).map((type) => (
          <button
            key={type}
            className={`flex items-center gap-1.5 rounded-full border border-signoz_slate-400  py-1 pl-3 pr-2 text-xs text-signoz_vanilla-100 ${
              currentDeploymentType === type ? 'bg-signoz_slate-400' : ''
            }`}
            onClick={() => handleDeploymentTypeChange(type)}
          >
            <span
              className={`block h-1.5 w-1.5 flex-shrink-0 rounded-full ${DeploymentTypeColors[type]}`}
            ></span>
            <span className="uppercase">{type}</span>
          </button>
        ))}
      </div>
      <Modal
        size="xl"
        backdrop="blur"
        placement="top-center"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
        <ModalContent>
          {() => (
            <>
              <ModalBody className="py-10">
                <p>hello</p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ChangelogHeader
