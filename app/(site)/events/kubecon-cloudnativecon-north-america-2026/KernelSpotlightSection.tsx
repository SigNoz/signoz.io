import Image from 'next/image'
import { ArrowRight, CircleCheck } from 'lucide-react'

import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'

import { SPOTLIGHT } from './KubeconPage.constants'

/**
 * The quote card stays light in dark mode, matching the homepage quote cards.
 */
const QUOTE_CARD_BACKGROUND = 'linear-gradient(160deg, #dbe6fb 0%, #ece4fa 60%, #f6e9fb 100%)'
const QUOTE_INK = '#16181d'
const QUOTE_SUB = '#5a6070'

export default function KernelSpotlightSection() {
  return (
    <section className="pt-16 lg:pt-20">
      <SectionLayout variant="no-border" className="px-4 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,870fr)_minmax(0,482fr)] lg:gap-8">
          <div>
            <h2 className="m-0 text-2xl font-medium leading-tight tracking-[-0.02em] sm:text-3xl">
              <span className="text-[var(--l3-foreground)]">{SPOTLIGHT.eyebrow}</span>{' '}
              <span className="text-[var(--l1-foreground)]">{SPOTLIGHT.customer}</span>
            </h2>
            <p className="m-0 mt-2 text-sm leading-6 text-[var(--l2-foreground)]">
              {SPOTLIGHT.tagline}
            </p>

            <figure
              className="m-0 mt-10 flex min-h-[30rem] flex-col justify-between gap-10 rounded-lg p-8"
              style={{ background: QUOTE_CARD_BACKGROUND }}
            >
              <blockquote
                className="m-0 max-w-[36rem] !border-0 !pl-0 text-2xl font-normal leading-9 tracking-[-0.01em] sm:text-[1.75rem] sm:leading-[2.6rem]"
                style={{ color: QUOTE_INK }}
              >
                {SPOTLIGHT.quote}
              </blockquote>
              <figcaption className="flex items-center gap-4">
                <Image
                  src={SPOTLIGHT.logo}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 shrink-0 object-contain"
                  style={{ filter: 'brightness(0)' }}
                />
                <span aria-hidden="true" className="h-10 w-px bg-black/15" />
                <span className="min-w-0">
                  <span className="block text-sm font-medium" style={{ color: QUOTE_INK }}>
                    {SPOTLIGHT.author}
                  </span>
                  <span className="mt-0.5 block text-sm" style={{ color: QUOTE_SUB }}>
                    {SPOTLIGHT.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          </div>

          <div className="flex flex-col lg:pl-8">
            {SPOTLIGHT.blocks.map((block, index) => (
              <div
                key={block.title}
                className={
                  index === 0
                    ? 'pb-6'
                    : 'border-0 border-t border-solid border-[var(--l2-border)] py-6'
                }
              >
                <h3 className="m-0 text-base font-medium leading-6 text-[var(--l1-foreground)]">
                  {block.title}
                </h3>
                <p className="m-0 mt-2 text-sm leading-6 text-[var(--l2-foreground)]">
                  {block.description}
                </p>
              </div>
            ))}

            <div className="border-0 border-t border-solid border-[var(--l2-border)] pt-6">
              <h3 className="m-0 text-base font-medium leading-6 text-[var(--l1-foreground)]">
                {SPOTLIGHT.impact.title}
              </h3>

              <ul className="m-0 mt-4 flex list-none flex-col gap-4 p-0">
                <li className="flex items-center gap-2 text-sm leading-6">
                  <CircleCheck
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-[var(--accent-primary)]"
                  />
                  <span className="text-[var(--l1-foreground)]">
                    {SPOTLIGHT.impact.latency.from}
                  </span>
                  <ArrowRight
                    size={12}
                    aria-hidden="true"
                    className="text-[var(--l2-foreground)]"
                  />
                  <span className="text-[var(--l1-foreground)]">{SPOTLIGHT.impact.latency.to}</span>
                  <span className="text-[var(--l2-foreground)]">
                    {SPOTLIGHT.impact.latency.label}
                  </span>
                </li>

                {SPOTLIGHT.impact.items.map((item) => (
                  <li key={item.title} className="flex gap-2">
                    <CircleCheck
                      size={16}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-[var(--accent-primary)]"
                    />
                    <span>
                      <span className="block text-sm leading-6 text-[var(--l1-foreground)]">
                        {item.title}
                      </span>
                      <span className="block text-sm leading-6 text-[var(--l2-foreground)]">
                        {item.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <ButtonGroup
                buttons={SPOTLIGHT.buttons}
                className="mt-6 !items-start !justify-start"
              />
            </div>
          </div>
        </div>
      </SectionLayout>
    </section>
  )
}
