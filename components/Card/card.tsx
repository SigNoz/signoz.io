import React, { useMemo } from 'react'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/Button/Button'
import TrackingLink from '@/components/TrackingLink'

type CardProps = {
  number?: string
  icon?: string
  iconTag?: string
  title?: string
  subTitle?: string
  stats?: string
  description?: string | string[] | React.ReactNode
  text?: string
  info?: string
  buttonText?: string
  buttonLink?: string
  logo?: string
  logoSize?: number
  subTitleSize?: number
  img?: string
  border?: Boolean
  sectionName?: string
}

const Card: React.FC<CardProps> = ({
  number,
  iconTag,
  title,
  subTitle,
  stats,
  description,
  text,
  buttonText,
  buttonLink,
  logo,
  img,
  logoSize = 16,
  subTitleSize = 1,
  sectionName = 'Features',
}) => {
  const logoSizeClassnames = useMemo(() => {
    if (logoSize === 16) {
      return 'w-4 h-4 fill-signoz_vanilla-400'
    }

    if (logoSize === 24) {
      return 'w-6 h-6 fill-signoz_vanilla-400'
    }
  }, [logoSize])

  const subTitleSizeClassnames = useMemo(() => {
    if (subTitleSize === 1) {
      return 'text-base font-semibold'
    }

    if (subTitleSize === 2) {
      return 'text-2xl font-semibold'
    }
  }, [subTitleSize])

  const descriptionArray = Array.isArray(description)
    ? description
    : description
      ? [description]
      : []

  return (
    <div
      className={`col-span-2 border !border-b-0 !border-r-0 border-dashed border-signoz_slate-400 bg-signoz_ink-500 p-9 sm:col-span-1`}
    >
      <div className="mb-4 flex items-center">
        {logo ? (
          <img src={logo} alt={`${iconTag} Logo`} className={`${logoSizeClassnames} mr-2.5`} />
        ) : null}
        <span className="text-sm font-medium uppercase tracking-[0.05em] text-signoz_vanilla-400">
          {iconTag}
        </span>
        <span className="text-2xl font-semibold text-signoz_vanilla-100">{title}</span>
      </div>

      <div>
        <span className="font-mono text-2xl font-normal text-signoz_slate-50">{number}</span>
        {subTitle ? (
          <p className={`${subTitleSizeClassnames} m-0 pt-4 text-signoz_vanilla-100`}>{subTitle}</p>
        ) : null}
      </div>

      <div>
        {text ? (
          <span className="my-3 block max-w-md text-xl font-semibold leading-9 text-signoz_vanilla-400">
            {text}
          </span>
        ) : null}
      </div>

      <div>
        {stats ? (
          <p className="mb-2 block pt-4 font-mono text-[32px] font-semibold leading-10 text-signoz_vanilla-100">
            {stats}
          </p>
        ) : null}
      </div>

      {descriptionArray.map((desc, index) => (
        <p
          key={index}
          className="mb-3 mt-2 text-base font-normal leading-9 text-signoz_vanilla-400"
        >
          {desc}
        </p>
      ))}
      {img ? <img src={img} className="card-background h-auto w-auto border-none" /> : null}

      {buttonText ? (
        buttonLink ? (
          <TrackingLink
            href={buttonLink}
            clickType="Secondary CTA"
            clickName={`${title || 'Feature'} Link`}
            clickText={buttonText}
            clickLocation={sectionName}
            className="inline-block"
          >
            <Button type={Button.TYPES.SECONDARY} className="flex-center mb-4 mt-6">
              {buttonText} <ArrowRight size={14} />
            </Button>
          </TrackingLink>
        ) : (
          <Button type={Button.TYPES.SECONDARY} className="flex-center mb-4 mt-6">
            {buttonText} <ArrowRight size={14} />
          </Button>
        )
      ) : null}
    </div>
  )
}

export default Card
