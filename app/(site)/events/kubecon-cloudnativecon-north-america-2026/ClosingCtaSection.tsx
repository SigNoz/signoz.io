import FloatingRingsScene from '@/components/FloatingRingsScene/FloatingRingsScene'
import ButtonGroup from '@/shared/components/molecules/FeaturePages/ButtonGroup'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'

import { CLOSING_CTA } from './KubeconPage.constants'
import styles from './kubecon.module.css'

export default function ClosingCtaSection() {
  return (
    <section className="relative z-0 overflow-visible py-6 lg:py-8">
      <SectionLayout variant="no-border" className="px-4 md:px-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1003fr)_minmax(0,435fr)]">
          <div className="relative z-[1] max-w-[42rem]">
            <h2 className="m-0 text-2xl font-semibold leading-9 tracking-[-0.02em] text-[var(--l1-foreground)] sm:text-[1.75rem] sm:leading-10">
              {CLOSING_CTA.titleLead}
              <br />
              {CLOSING_CTA.titleTrail}
            </h2>
            <p className="m-0 mt-4 text-sm leading-6 text-[var(--l2-foreground)]">
              {CLOSING_CTA.description}
            </p>
            <ButtonGroup
              buttons={CLOSING_CTA.buttons}
              className="mt-10 !items-start !justify-start"
            />
          </div>

          {/*
            Same treatment as the docs intro card: the rings scene is anchored to
            the section and allowed to float past its bottom edge.
          */}
          <div className="pointer-events-none relative z-0 hidden min-h-[16.5rem] self-stretch overflow-visible lg:block">
            {/* Pushed down so the stack reads as rising out of the section below. */}
            <div className="absolute inset-x-0 -bottom-36 top-16">
              <FloatingRingsScene
                src={CLOSING_CTA.image}
                alt={CLOSING_CTA.imageAlt}
                className={styles.ctaRings}
              />
            </div>
          </div>
        </div>
      </SectionLayout>
    </section>
  )
}
