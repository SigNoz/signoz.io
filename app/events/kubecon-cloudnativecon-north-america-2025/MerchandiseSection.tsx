'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Modal, ModalContent, ModalBody, useDisclosure } from '@nextui-org/react'

const merchandise = {
  title: 'Cool merch.',
  subtitle: 'No strings attached.',
  tagline: 'Just drop by!',
  products: [
    { name: 'Hoodie', placeholder: 'hoodie.png' },
    { name: 'T-shirt', placeholder: 't-shirt.png' },
    { name: 'Bag', placeholder: 'bag.png' },
    { name: 'Cap', placeholder: 'cap.png' },
  ],
}

interface Product {
  name: string
  placeholder: string
}

interface MerchandiseSectionProps {
  title?: string
  subtitle?: string
  tagline?: string
  products?: Product[]
}

const MerchandiseSection: React.FC<MerchandiseSectionProps> = ({
  title = merchandise.title,
  subtitle = merchandise.subtitle,
  tagline = merchandise.tagline,
  products = merchandise.products,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState<Product | null>(null)

  const handleImageClick = (product: Product) => {
    setSelectedImage(product)
    onOpen()
  }

  return (
    <>
      <div className="border-t border-dashed border-signoz_slate-500 px-8 py-10">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-start">
            <h2 className="mb-0">{title}</h2>
            <h2 className="mb-0">{subtitle}</h2>
            <h2 className="mb-0">{tagline}</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleImageClick(product)}
              >
                <Image
                  priority={true}
                  src={`/img/events/kubecon-2025/${product.placeholder}`}
                  alt={product.name}
                  width={180}
                  height={180}
                  className="rounded-lg object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        size="2xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="self-center"
      >
        <ModalContent className="bg-transparent">
          {() => (
            <ModalBody className="p-0">
              {selectedImage && (
                <div className="relative h-[80vh] w-full">
                  <Image
                    src={`/img/events/kubecon-2025/${selectedImage.placeholder}`}
                    alt={selectedImage.name}
                    fill
                    priority={true}
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  />
                </div>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default MerchandiseSection
