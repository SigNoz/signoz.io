import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'

import { SCALE } from './KubeconPage.constants'

export default function ScaleStatsSection() {
  return (
    <section className="border-0 border-y border-solid border-[var(--l2-border)] py-0">
      <SectionLayout variant="no-border" className="px-4 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(0,291fr)_repeat(3,minmax(0,357fr))]">
          <div className="flex flex-col justify-between gap-8 py-6 pr-4 xl:pr-12">
            <div>
              <p className="m-0 flex items-center gap-2 text-xs font-medium uppercase leading-5 tracking-[0.08em] text-[var(--l2-foreground)]">
                <span
                  aria-hidden="true"
                  className="inline-block h-3 w-[3px] rounded-sm bg-[var(--accent-primary)]"
                />
                {SCALE.eyebrow}
              </p>
              <h2 className="m-0 mt-3 max-w-[20rem] text-2xl font-medium leading-tight tracking-[-0.02em] text-[var(--l1-foreground)] sm:text-3xl">
                {SCALE.title}
              </h2>
            </div>
            <ButtonGroup buttons={SCALE.buttons} className="!items-start !justify-start" />
          </div>

          {SCALE.stats.map((stat) => (
            <article
              key={stat.value}
              className="flex flex-col gap-8 border-0 border-solid border-[var(--l2-border)] py-8 md:border-l md:px-8 xl:px-12"
            >
              <div>
                <p className="m-0 text-2xl font-medium leading-8 tracking-[-0.02em] text-[var(--l1-foreground)]">
                  {stat.value}
                </p>
                <p className="m-0 mt-1 text-xs font-medium uppercase leading-5 tracking-[0.08em] text-[var(--l2-foreground)]">
                  {stat.label}
                </p>
              </div>
              <p className="m-0 max-w-[16.2rem] text-base leading-8 text-[var(--l1-foreground)]">
                {stat.description}
              </p>
            </article>
          ))}
        </div>
      </SectionLayout>
    </section>
  )
}
