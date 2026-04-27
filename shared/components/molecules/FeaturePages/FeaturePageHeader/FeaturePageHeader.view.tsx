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
    <header className={cn('relative !mx-auto max-w-8xl md:!w-[80vw]', className)}>
      <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />

      <div
        className={cn(
          'relative !mx-auto flex max-w-8xl flex-col border !border-b-0 border-dashed border-signoz_slate-400 px-6 pb-4 pt-12 md:!w-[80vw] md:px-8 md:pt-[4rem]',
          isLeft ? 'items-start text-left' : 'items-center text-center'
        )}
      >
        <h1
          className={cn(
            'text-gradient z-[1] my-4 text-2xl font-semibold tracking-tight dark:text-white sm:my-5 sm:text-3xl md:leading-[3.5rem] lg:text-[44px]',
            isLeft ? '!px-0 !py-3' : '!p-3'
          )}
        >
          {title}
        </h1>

        <p
          className={cn(
            'm-0 text-lg font-normal leading-normal text-signoz_vanilla-400 sm:p-0 sm:leading-8',
            isLeft ? 'px-0 py-3' : 'p-3'
          )}
        >
          {description}
        </p>
      </div>

      <div
        className={cn(
          'relative z-[1] !mx-auto flex max-w-8xl flex-col gap-4 border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 px-6 pb-12 pt-4 md:!w-[80vw] md:px-8',
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
            className={cn('text-sm text-signoz_vanilla-400', isLeft ? 'text-left' : 'text-center')}
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
