import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import TrackingLink from '@/components/TrackingLink'
import { cn } from 'app/lib/utils'
import { FeatureShowcaseProps } from './FeatureShowcase.types'

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  title,
  description,
  image,
  imageAlt = '',
  imageElement,
  button,
  children,
  contentClassName,
  imageClassName,
  className,
}) => {
  const hasContent = title || description || button

  return (
    <div className={cn('bg-signoz_ink-500 p-6', className)}>
      {hasContent && (
        <div className={cn('mb-8 max-w-4xl', contentClassName)}>
          {title && <h2 className="mb-6 text-signoz_vanilla-100">{title}</h2>}
          {description && (
            <div className="mb-8 leading-relaxed text-signoz_vanilla-400">{description}</div>
          )}

          {button &&
            (button.tracking ? (
              <Button
                variant="secondary"
                rounded="full"
                className="flex w-fit items-center gap-2"
                asChild
              >
                <TrackingLink
                  href={button.href}
                  clickType={button.tracking.clickType}
                  clickName={button.tracking.clickName || `${button.text} Button`}
                  clickLocation={button.tracking.clickLocation || 'Feature Page'}
                  clickText={button.tracking.clickText || button.text}
                >
                  {button.text}
                  <ArrowRight size={14} />
                </TrackingLink>
              </Button>
            ) : (
              <Button
                variant="secondary"
                rounded="full"
                className="flex w-fit items-center gap-2"
                to={button.href}
              >
                {button.text}
                <ArrowRight size={14} />
              </Button>
            ))}
        </div>
      )}

      {children}

      {imageElement
        ? imageElement
        : image && (
            <Image
              src={image}
              alt={imageAlt}
              width={10000}
              height={10000}
              className={cn('mb-8', imageClassName)}
            />
          )}
    </div>
  )
}

export default FeatureShowcase
