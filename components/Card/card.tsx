import React from 'react'
import Image, { type StaticImageData } from 'next/image'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { cn } from '../../app/lib/utils'

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
  logo?: string | StaticImageData | React.ReactNode
  logoSize?: number
  subTitleSize?: number
  img?: string | StaticImageData
  imgClassName?: string
  imgAlt?: string
  imgSizes?: string
  imgWidth?: number
  imgHeight?: number
  border?: Boolean
  sectionName?: string
  className?: string
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
  imgClassName,
  imgAlt,
  imgSizes,
  imgWidth,
  imgHeight,
  logoSize = 16,
  subTitleSize = 1,
  sectionName = 'Features',
  className = '',
}) => {
  const logoSizeClassnames =
    logoSize === 24 ? 'w-6 h-6 fill-vanilla-400' : 'w-4 h-4 fill-vanilla-400'

  const subTitleSizeClassnames =
    subTitleSize === 2 ? 'text-2xl font-semibold' : 'text-base font-semibold'

  const descriptionArray = Array.isArray(description)
    ? description
    : description
      ? [description]
      : []

  const featureImageAlt =
    imgAlt ??
    (subTitle
      ? `${subTitle} in SigNoz`
      : title
        ? `${title} in SigNoz`
        : iconTag
          ? `SigNoz ${iconTag.replace(/_/g, ' ')} interface`
          : 'SigNoz product interface')

  const logoAlt = iconTag?.trim() ? `${iconTag} icon` : title ? `${title} icon` : 'Feature icon'
  const isRenderableLogo = React.isValidElement(logo)
  const isStringLogo = typeof logo === 'string'
  const isStaticImage = typeof img !== 'string'

  return (
    <div
      className={cn(
        'border-border bg-background col-span-2 border !border-r-0 !border-b-0 border-dashed p-9 sm:col-span-1',
        className
      )}
    >
      <div className="mb-4 flex items-center">
        {logo ? (
          isRenderableLogo ? (
            <span className={`${logoSizeClassnames} mr-2.5`}>{logo}</span>
          ) : (
            <Image
              src={logo as string | StaticImageData}
              alt={logoAlt}
              {...(isStringLogo ? { width: logoSize, height: logoSize } : {})}
              className={`${logoSizeClassnames} mr-2.5`}
            />
          )
        ) : null}
        <span className="text-muted-foreground text-sm font-medium tracking-[0.05em] uppercase">
          {iconTag}
        </span>
        <span className="text-l1-foreground text-2xl font-semibold">{title}</span>
      </div>

      <div>
        <span className="text-muted-foreground font-mono text-2xl font-normal">{number}</span>
        {subTitle ? (
          <p className={`${subTitleSizeClassnames} text-foreground m-0 pt-4`}>{subTitle}</p>
        ) : null}
      </div>

      <div>
        {text ? (
          <span className="text-muted-foreground my-3 block max-w-md text-xl leading-9 font-semibold">
            {text}
          </span>
        ) : null}
      </div>

      <div>
        {stats ? (
          <p className="text-l1-foreground mb-2 block pt-4 font-mono text-[32px] leading-10 font-semibold">
            {stats}
          </p>
        ) : null}
      </div>

      {descriptionArray.map((desc, index) => (
        <p key={index} className="text-muted-foreground mt-2 mb-3 text-base leading-9 font-normal">
          {desc}
        </p>
      ))}
      {img ? (
        <Image
          src={img}
          alt={featureImageAlt}
          {...(isStaticImage ? {} : { width: imgWidth, height: imgHeight })}
          sizes={imgSizes ?? '(max-width: 640px) 100vw, (max-width: 1280px) 80vw, 600px'}
          quality={90}
          loading="lazy"
          className={cn(`card-background h-auto w-auto border-none`, imgClassName)}
        />
      ) : null}

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
            <Button variant="legacySecondary" className="flex-center mt-6 mb-4">
              {buttonText} <ArrowRight size={14} />
            </Button>
          </TrackingLink>
        ) : (
          <Button variant="legacySecondary" className="flex-center mt-6 mb-4">
            {buttonText} <ArrowRight size={14} />
          </Button>
        )
      ) : null}
    </div>
  )
}

export default Card
