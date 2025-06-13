import ChangelogHeader from '@/components/Changelog/Header/ChangelogHeader'
import ChangelogRenderer from '@/components/Changelog/Renderer/ChangelogRenderer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { fetchChangelogById } from 'utils/strapi'

export default async function Page({ params }: { params: { slug: string } }) {
  const changelogId = params.slug.split('-').pop()
  const changelogResponse = await fetchChangelogById(changelogId as string)

  return (
    <section className="h-auto w-full bg-signoz_ink-500">
      <div className="container relative mx-auto flex flex-col gap-7">
        <div className="bg-dot-pattern masked-dots absolute top-0 h-screen w-full" />
        <div className="z-10 flex w-full flex-col gap-7 py-16">
          <ChangelogHeader showFilters={false} />
          <Link
            className="flex items-center gap-2 text-base text-signoz_vanilla-400"
            href="/changelog"
          >
            <ArrowLeft size={16} />
            Back to all posts
          </Link>
          <div className="flex max-w-4xl flex-col">
            {changelogResponse.data && <ChangelogRenderer changelog={changelogResponse.data} />}
          </div>
        </div>
      </div>
    </section>
  )
}
