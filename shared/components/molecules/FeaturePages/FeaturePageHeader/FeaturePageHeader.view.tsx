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
}) => {
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

      <div className="relative !mx-auto flex max-w-8xl flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 px-2 pb-4 pt-12 text-center md:!w-[80vw] md:px-5 md:pt-[4rem]">
        <h1 className="text-gradient z-[1] my-4 !p-3 text-2xl font-semibold tracking-tight dark:text-white sm:my-5 sm:text-3xl md:leading-[3.5rem] lg:text-[44px]">
          {title}
        </h1>

        <p className="m-0 p-3 text-lg font-normal leading-8 text-signoz_vanilla-400 sm:p-0">
          {description}
        </p>
      </div>

      <div className="relative z-[1] !mx-auto flex max-w-8xl flex-col items-center gap-4 border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 pb-12 pt-4 md:!w-[80vw]">
        {(buttonGroup || (buttons && buttons.length > 0)) && (
          <div className="flex flex-col items-center justify-center gap-3 md:flex-row">
            {buttonGroup ?? (buttons && <ButtonGroup buttons={buttons} />)}
          </div>
        )}
        {buttonDescription && (
          <div className="text-center text-sm text-signoz_vanilla-400">{buttonDescription}</div>
        )}
      </div>

      <SectionLayout variant={sectionLayoutVariant} className={sectionLayoutClassName}>
        {heroContent}
      </SectionLayout>
    </header>
  )
}

export default FeaturePageHeader
