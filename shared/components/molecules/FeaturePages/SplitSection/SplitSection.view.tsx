import React from 'react'
import Image from 'next/image'
import GridLayout from '../GridLayout'
import Divider from '../Divider'
import FeatureButton from '../FeatureButton'
import { cn } from 'app/lib/utils'
import { SplitSectionPanel, SplitSectionProps } from './SplitSection.types'

function isPanelConfig(value: SplitSectionPanel | React.ReactNode): value is SplitSectionPanel {
  return (
    typeof value === 'object' &&
    value !== null &&
    !React.isValidElement(value) &&
    'title' in value &&
    'description' in value
  )
}

const PanelContent: React.FC<{ panel: SplitSectionPanel }> = ({ panel }) => {
  return (
    <div className={cn('flex h-full w-full flex-col px-6', panel.className)}>
      <div className={cn('flex flex-col justify-between', panel.contentClassName)}>
        <h2 className="mb-6 text-signoz_vanilla-100">{panel.title}</h2>
        {panel.description && (
          <div className="mb-8 leading-relaxed text-signoz_vanilla-400">{panel.description}</div>
        )}
      </div>

      {panel.button && (
        <FeatureButton button={panel.button} className="mb-8 flex w-fit items-center gap-2" />
      )}

      {panel.imageElement
        ? panel.imageElement
        : panel.image && (
            <Image
              src={panel.image}
              alt={panel.imageAlt || ''}
              width={1440}
              height={810}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={panel.imageClassName}
            />
          )}
    </div>
  )
}

const SplitSection: React.FC<SplitSectionProps> = ({
  left,
  right,
  withVerticalDivider = false,
  className,
}) => {
  const leftContent = isPanelConfig(left) ? <PanelContent panel={left} /> : left
  const rightContent = isPanelConfig(right) ? <PanelContent panel={right} /> : right

  if (withVerticalDivider) {
    return (
      <div className={cn('bg-signoz_ink-500', className)}>
        <GridLayout variant="split" className="!gap-y-0">
          <div className="relative flex h-full w-full flex-col">
            {leftContent}
            <Divider orientation="vertical" className="absolute right-0 top-0 hidden lg:block" />
          </div>
          <div className="flex h-full w-full flex-col">{rightContent}</div>
        </GridLayout>
      </div>
    )
  }

  return (
    <div className={cn('bg-signoz_ink-500', className)}>
      <GridLayout variant="split">
        <div className="flex h-full w-full flex-col">{leftContent}</div>
        <div className="flex h-full w-full flex-col">{rightContent}</div>
      </GridLayout>
    </div>
  )
}

export default SplitSection
