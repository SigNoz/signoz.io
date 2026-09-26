import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'

import { WHY_SIGNOZ } from './KubeconPage.constants'

/**
 * The four values noz collects as badges on his way down the page — keep this
 * list and `NOZ_BADGES` in step.
 */
export default function WhySignozSection() {
  return (
    <section className="relative pb-16 pt-20 lg:pb-24">
      <SectionLayout variant="no-border" className="px-4 md:px-10">
        <h2 className="m-0 max-w-[57.2rem] text-3xl font-medium leading-tight tracking-[-0.02em] text-[var(--l1-foreground)] sm:text-[2.375rem]">
          {WHY_SIGNOZ.title}
        </h2>

        <ul className="m-0 mt-10 max-w-[43rem] list-none p-0">
          {WHY_SIGNOZ.items.map((item, index) => (
            <li
              key={item.title}
              data-noz-anchor
              data-noz-badge-anchor
              className={
                index === 0
                  ? 'pb-8'
                  : 'border-0 border-t border-solid border-[var(--l2-border)] py-8'
              }
            >
              <h3 className="m-0 text-[1.1875rem] font-medium leading-8 text-[var(--l1-foreground)]">
                {item.title}
              </h3>
              <p className="m-0 mt-1 max-w-[22.6rem] text-sm leading-6 text-[var(--l2-foreground)]">
                {item.description}
              </p>
            </li>
          ))}
        </ul>

        <div data-noz-end="" className="mt-6">
          <ButtonGroup buttons={WHY_SIGNOZ.buttons} className="!items-start !justify-start" />
        </div>
      </SectionLayout>
    </section>
  )
}
