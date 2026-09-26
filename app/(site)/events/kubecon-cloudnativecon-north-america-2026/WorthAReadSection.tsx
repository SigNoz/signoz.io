import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

import TrackingLink from '@/components/TrackingLink'
import { buttonVariants } from '@/components/ui/Button'
import SectionLayout from '@/shared/components/molecules/FeaturePages/SectionLayout'
import { cn } from 'app/lib/utils'

import { WORTH_A_READ } from './KubeconPage.constants'

export default function WorthAReadSection() {
  return (
    <section className="pt-16 lg:pt-20">
      <SectionLayout variant="no-border" className="px-4 md:px-10">
        <h2 className="m-0 text-2xl font-medium leading-tight tracking-[-0.02em] text-[var(--l1-foreground)] sm:text-3xl">
          {WORTH_A_READ.title}
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-[minmax(0,439fr)_minmax(0,480fr)_minmax(0,440fr)]">
          {WORTH_A_READ.articles.map((article, index) => (
            <article
              key={article.href}
              className={cn(
                'flex flex-col gap-6 border-0 border-solid border-[var(--l2-border)] py-5',
                index > 0 && 'md:border-l md:pl-10',
                index < WORTH_A_READ.articles.length - 1 && 'md:pr-10'
              )}
            >
              <div className="overflow-hidden rounded-md border border-solid border-[var(--l2-border)] bg-[var(--l2-background)]">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt=""
                    width={800}
                    height={320}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="aspect-[400/160] w-full object-cover"
                  />
                ) : (
                  <div className="aspect-[400/160] w-full" />
                )}
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <h3 className="m-0 text-lg font-medium leading-7 text-[var(--l1-foreground)]">
                  {article.title}
                </h3>
                <p className="m-0 text-sm leading-6 text-[var(--l2-foreground)]">
                  {article.description}
                </p>
              </div>

              <TrackingLink
                href={article.href}
                clickType="Secondary CTA"
                clickName="Blog Post Link"
                clickText={article.title}
                clickLocation="KubeCon NA 2026 Worth a Read"
                className={cn(
                  buttonVariants({ variant: 'tactileSecondary' }),
                  'w-fit no-underline'
                )}
              >
                {WORTH_A_READ.ctaLabel}
                <ArrowRight size={12} aria-hidden="true" />
              </TrackingLink>
            </article>
          ))}
        </div>
      </SectionLayout>
    </section>
  )
}
