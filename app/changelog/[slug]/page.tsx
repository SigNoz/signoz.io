import ChangelogHeader from '@/components/Changelog/Header/ChangelogHeader'
import ChangelogRenderer from '@/components/Changelog/Renderer/ChangelogRenderer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { fetchChangelogById } from 'utils/strapi'
import { notFound } from 'next/navigation'
import { ChangelogByIdApiResponse } from 'utils/strapi'

export const dynamicParams = false

export default async function Page({ params }: { params: { slug: string } }) {
  const changelogId = params.slug.split('-').pop()
  let changelogResponse: ChangelogByIdApiResponse | null = null
  try {
    changelogResponse = await fetchChangelogById(changelogId as string)
  } catch (error) {
    notFound()
  }

  return (
    <section className="h-auto w-full bg-signoz_ink-500">
      <div className="container relative mx-auto flex flex-col gap-7">
        <div className="bg-dot-pattern masked-dots absolute top-0 h-screen w-full" />
        <div className="z-10 flex w-full flex-col gap-7 py-16">
          <ChangelogHeader showFilters={false} />
          <div className="relative mb-10 px-4 md:px-8">
            <div className="absolute -bottom-20 left-0 top-2 hidden w-px bg-signoz_slate-400 lg:block">
              <div className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-signoz_slate-400" />
            </div>
            <Link
              className="flex items-center gap-2 text-base text-signoz_vanilla-400"
              href="/changelog"
            >
              <ArrowLeft size={16} />
              Back to all posts
            </Link>
          </div>
          <div className="flex max-w-4xl flex-col">
            {changelogResponse && changelogResponse.data && (
              <ChangelogRenderer changelog={changelogResponse.data} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
