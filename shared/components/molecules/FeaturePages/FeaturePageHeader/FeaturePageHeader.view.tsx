import Image from 'next/image'
import ButtonGroup from '../ButtonGroup'
import SectionLayout from '../SectionLayout'
import { FeaturePageHeaderProps } from './FeaturePageHeader.types'
import { cn } from 'app/lib/utils'

const FeaturePageHeader: React.FC<FeaturePageHeaderProps> = ({
  title,
  description,
  buttons,
  buttonGroup,
  heroImage,
  heroImageAlt = '',
  children,
  sectionLayoutVariant = 'bordered',
  sectionLayoutClassName = '!mt-0 max-md:-mb-[3rem]',
  className = '',
  buttonDescription = '',
  align = 'center',
}) => {
  const isLeft = align === 'left'
  const heroContent =
    typeof heroImage === 'string' ? (
      <div className="relative z-[1] w-full">
        <Image
          src={heroImage}
          alt={heroImageAlt}
          className="w-full rounded-xl object-contain"
          width={1440}
          height={720}
          sizes="(max-width: 768px) 100vw, 80vw"
          priority
        />
      </div>
    ) : (
      (heroImage ?? children)
    )

  return (
    <header className={cn('max-w-8xl relative !mx-auto', className)}>
      <div className="border-border absolute top-0 right-[12px] bottom-0 left-[12px] z-[0] border !border-t-0 !border-b-0 border-dashed md:right-[24px] md:left-[24px]" />

      <div
        className={cn(
          'max-w-8xl border-border relative !mx-auto flex flex-col border !border-b-0 border-dashed px-6 pt-12 pb-4 md:px-8 md:pt-[4rem]',
          isLeft ? 'items-start text-left' : 'items-center text-center'
        )}
      >
        <h1
          className={cn(
            'text-gradient z-[1] my-4 text-2xl font-semibold tracking-tight sm:my-5 sm:text-3xl md:leading-[3.5rem] lg:text-[44px] dark:text-white',
            isLeft ? '!px-0 !py-3' : '!p-3'
          )}
        >
          {title}
        </h1>

        <p
          className={cn(
            'text-muted-foreground m-0 text-lg leading-normal font-normal sm:p-0 sm:leading-8',
            isLeft ? 'px-0 py-3' : 'p-3'
          )}
        >
          {description}
        </p>
      </div>

      <div
        className={cn(
          'max-w-8xl border-border relative z-[1] !mx-auto flex flex-col gap-4 border !border-t-0 !border-b-0 border-dashed px-6 pt-4 pb-12 md:px-8',
          isLeft ? 'items-start' : 'items-center'
        )}
      >
        {(buttonGroup || (buttons && buttons.length > 0)) && (
          <div
            className={cn(
              'flex flex-col gap-3 md:flex-row',
              isLeft ? 'items-start' : 'items-center justify-center'
            )}
          >
            {buttonGroup ?? (buttons && <ButtonGroup buttons={buttons} />)}
          </div>
        )}
        {buttonDescription && (
          <div
            className={cn('text-muted-foreground text-sm', isLeft ? 'text-left' : 'text-center')}
          >
            {buttonDescription}
          </div>
        )}
      </div>

      <SectionLayout variant={sectionLayoutVariant} className={sectionLayoutClassName}>
        {heroContent}
      </SectionLayout>
    </header>
  )
}

export default FeaturePageHeader
