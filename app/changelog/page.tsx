import ChangelogRenderer from '@/components/Changelog/Renderer/ChangelogRenderer'
import ChangelogFooter from '@/components/Changelog/Footer/ChangelogFooter'
import ChangelogHeader from '@/components/Changelog/Header/ChangelogHeader'
import { DeploymentType, fetchChangelogEntries } from '../../utils/strapi'

interface ChangelogProps {
  searchParams: {
    page?: string
    deploymentType?: string
  }
}

const Changelog = async ({ searchParams }: ChangelogProps) => {
  const currentPage = searchParams?.page ? parseInt(searchParams.page as string, 10) : 1
  const deploymentType = searchParams?.deploymentType
    ? (decodeURIComponent(searchParams.deploymentType) as DeploymentType)
    : DeploymentType.ALL

  const changelogsResponse = await fetchChangelogEntries({
    page: currentPage,
    pageSize: 10,
    deployment_type: deploymentType,
  })

  return (
    <section className="h-auto w-full bg-signoz_ink-500">
      <div className="container relative mx-auto flex flex-col gap-7">
        <div className="bg-dot-pattern masked-dots absolute top-0 h-screen w-full" />
        <div className="z-10 flex w-full flex-col gap-7 py-16">
          <ChangelogHeader />
          <div className="flex max-w-4xl flex-col md:pl-4">
            {changelogsResponse &&
              changelogsResponse.changelogs.map((entry) => (
                <ChangelogRenderer key={entry.id} changelog={entry} />
              ))}
          </div>
          <ChangelogFooter pagination={changelogsResponse.pagination} />
        </div>
      </div>
    </section>
  )
}

export default Changelog
