import ChangelogRenderer from '@/components/Changelog/Renderer/ChangelogRenderer'
import ChangelogFooter from '@/components/Changelog/Footer/ChangelogFooter'
import ChangelogHeader from '@/components/Changelog/Header/ChangelogHeader'
import { DeploymentType, fetchChangelogEntries } from '@/utils/strapi'
import { isGitHubReleasePublished } from '@/utils/github'
import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'

interface ChangelogProps {
  searchParams: Promise<{
    page?: string
    deploymentType?: string
  }>
}

export const metadata: Metadata = {
  title: 'SigNoz Changelog',
  description: 'SigNoz Changelog | SigNoz',
  openGraph: {
    title: 'SigNoz Changelog | SigNoz',
    description: 'SigNoz Changelog | SigNoz',
    url: `${siteMetadata.siteUrl}/changelog`,
    siteName: siteMetadata.title,
    locale: 'en_US',
    type: 'website',
    images: [siteMetadata.socialBanner],
  },
  twitter: {
    title: 'SigNoz Changelog | SigNoz',
    description: 'SigNoz Changelog | SigNoz',
    images: [siteMetadata.socialBanner],
    site: siteMetadata.twitter,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${siteMetadata.siteUrl}/changelog`,
  },
}

const Changelog = async (props: ChangelogProps) => {
  const searchParams = await props.searchParams
  const currentPage = searchParams?.page ? parseInt(searchParams.page as string, 10) : 1
  const deploymentType = searchParams?.deploymentType
    ? (decodeURIComponent(searchParams.deploymentType) as DeploymentType)
    : DeploymentType.ALL

  const changelogsResponse = await fetchChangelogEntries({
    page: currentPage,
    pageSize: 10,
    deployment_type: deploymentType,
  })

  let changelogs = changelogsResponse.changelogs
  let hiddenLatestCount = 0

  if (currentPage === 1 && changelogs.length > 0) {
    const isPublished = await isGitHubReleasePublished(changelogs[0].version)
    if (!isPublished) {
      changelogs = changelogs.slice(1)
      hiddenLatestCount = 1
    }
  } else if (currentPage > 1) {
    const latestResponse = await fetchChangelogEntries({
      page: 1,
      pageSize: 1,
      deployment_type: deploymentType,
    })
    if (latestResponse.changelogs.length > 0) {
      const isPublished = await isGitHubReleasePublished(latestResponse.changelogs[0].version)
      if (!isPublished) {
        hiddenLatestCount = 1
      }
    }
  }

  let pagination = changelogsResponse.pagination
  if (hiddenLatestCount > 0) {
    const adjustedTotal = pagination.total - hiddenLatestCount
    pagination = {
      ...pagination,
      total: adjustedTotal,
      pageCount: Math.ceil(adjustedTotal / pagination.pageSize),
    }
  }

  return (
    <section className="h-auto w-full bg-signoz_ink-500">
      <div className="container relative mx-auto flex flex-col gap-7">
        <div className="bg-dot-pattern masked-dots absolute top-0 h-screen w-full" />
        <div className="z-10 flex w-full flex-col gap-7 py-16">
          <ChangelogHeader />
          <div className="flex max-w-4xl flex-col md:pl-4">
            {changelogs &&
              changelogs.map((entry) => <ChangelogRenderer key={entry.id} changelog={entry} />)}
          </div>
          <ChangelogFooter
            pagination={pagination}
            displayedCount={changelogs.length}
            hiddenLatestCount={hiddenLatestCount}
          />
        </div>
      </div>
    </section>
  )
}

export default Changelog
