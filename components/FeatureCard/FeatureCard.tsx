import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/Button/Button'

type CardProps = {
  title?: string
  img?: string
  description?: string | string[]
  buttonText?: string
  buttonLink?: string
}

const FeatureCard: React.FC<CardProps> = ({ title, img, description, buttonText, buttonLink }) => {
  return (
    <div
      className={`col-span-2 border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-9 sm:col-span-1`}
    >
      <div className="items-left mb-4 flex flex-col gap-6">
        <p className="text-3xl font-semibold text-signoz_vanilla-100">{title}</p>
        {img ? (
          <img
            src={img}
            alt={title ? title : 'SigNoz product screenshot'}
            className="card-background h-auto w-auto border-none"
          />
        ) : null}
        <p className="mb-3 mt-2 text-base font-normal leading-9 text-signoz_vanilla-400">
          {description}
        </p>
      </div>
      <div className="mt-4">
        {buttonText ? (
          <Button type={Button.TYPES.SECONDARY} className="mb-4 mt-4 max-w-fit">
            <Link href={buttonLink ? buttonLink : ''} className="flex-center" target="_blank">
              {buttonText} <ArrowRight size={14} />
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  )
}

export default FeatureCard
