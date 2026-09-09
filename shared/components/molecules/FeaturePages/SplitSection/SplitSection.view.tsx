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

const PanelBody: React.FC<{ panel: SplitSectionPanel }> = ({ panel }) => {
  return (
    <>
      <div className={cn('flex flex-col justify-between', panel.contentClassName)}>
        <h2 className="mb-6 text-[var(--l1-foreground)]">{panel.title}</h2>
        {panel.description && (
          <div className="mb-8 leading-relaxed text-[var(--l2-foreground)]">
            {panel.description}
          </div>
        )}
      </div>

      {panel.button && (
        <FeatureButton button={panel.button} className="mb-8 flex w-fit items-center gap-2" />
      )}
    </>
  )
}

const PanelImage: React.FC<{ panel: SplitSectionPanel }> = ({ panel }) => {
  return (
    <>
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
    </>
  )
}

const PanelContent: React.FC<{ panel: SplitSectionPanel }> = ({ panel }) => {
  return (
    <div className={cn('flex h-full w-full flex-col px-6', panel.className)}>
      <PanelBody panel={panel} />
      <PanelImage panel={panel} />
    </div>
  )
}

const SplitSection: React.FC<SplitSectionProps> = ({
  left,
  right,
  withVerticalDivider = false,
  alignImages = false,
  className,
}) => {
  const leftContent = isPanelConfig(left) ? <PanelContent panel={left} /> : left
  const rightContent = isPanelConfig(right) ? <PanelContent panel={right} /> : right

  // Text blocks share the first grid row, so both images start on the same horizontal line
  // even when one panel has a button or a longer description.
  if (alignImages && isPanelConfig(left) && isPanelConfig(right)) {
    return (
      <div className={cn('bg-[var(--l1-background)]', className)}>
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_1fr]">
            <div className="order-1 flex w-full flex-col px-6 pt-10 lg:col-start-1 lg:row-start-1">
              <PanelBody panel={left} />
            </div>
            <div className="order-2 w-full px-6 pb-10 lg:col-start-1 lg:row-start-2">
              <PanelImage panel={left} />
            </div>
            <div className="order-3 flex w-full flex-col px-6 pt-10 lg:col-start-2 lg:row-start-1">
              <PanelBody panel={right} />
            </div>
            <div className="order-4 w-full px-6 pb-10 lg:col-start-2 lg:row-start-2">
              <PanelImage panel={right} />
            </div>
          </div>
          {withVerticalDivider && (
            <Divider orientation="vertical" className="absolute left-1/2 top-0 hidden lg:block" />
          )}
        </div>
      </div>
    )
  }

  if (withVerticalDivider) {
    return (
      <div className={cn('bg-[var(--l1-background)]', className)}>
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
    <div className={cn('bg-[var(--l1-background)]', className)}>
      <GridLayout variant="split">
        <div className="flex h-full w-full flex-col">{leftContent}</div>
        <div className="flex h-full w-full flex-col">{rightContent}</div>
      </GridLayout>
    </div>
  )
}

export default SplitSection
