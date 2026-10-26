import Image from 'next/image'
import { cn } from 'app/lib/utils'
import FeatureButton from '../FeatureButton'
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
    <div className={cn('bg-[var(--l1-background)] p-6', className)}>
      {hasContent && (
        <div className={cn('mb-8 max-w-4xl', contentClassName)}>
          {title && <h2 className="mb-6 text-[var(--l1-foreground)]">{title}</h2>}
          {description && (
            <div className="mb-8 leading-relaxed text-[var(--l2-foreground)]">{description}</div>
          )}
          {button && <FeatureButton button={button} />}
        </div>
      )}

      {children}

      {imageElement
        ? imageElement
        : image && (
            <Image
              src={image}
              alt={imageAlt}
              width={1440}
              height={810}
              sizes="(max-width: 768px) 100vw, 80vw"
              className={cn('mb-8', imageClassName)}
            />
          )}
    </div>
  )
}

export default FeatureShowcase
