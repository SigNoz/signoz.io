import { notFound, redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { parseSemverTag } from '@/utils/semverTags'
import {
  fetchOpenAPISpec,
  fetchAvailableAPIVersions,
  resolveLatestVersion,
} from '@/utils/apiReference'
import siteMetadata from '@/data/siteMetadata'
import OpenAPISpec from '@/components/OpenAPISpec'
import APIVersionSwitcher from '@/components/APIVersionSwitcher'

export const revalidate = 86400 // 24h — see API_SPEC_REVALIDATE_SECONDS

interface PageProps {
  params: Promise<{ version: string }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const { version } = params

  if (version === 'latest') {
    return { title: 'SigNoz API Reference | SigNoz' }
  }

  return {
    title: `SigNoz API Reference (${version}) | SigNoz`,
    description: `API reference documentation for SigNoz ${version}`,
    openGraph: {
      title: `SigNoz API Reference (${version}) | SigNoz`,
      description: `API reference documentation for SigNoz ${version}`,
      url: `${siteMetadata.siteUrl}/api-reference/${version}/`,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'website',
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      title: `SigNoz API Reference (${version}) | SigNoz`,
      description: `API reference documentation for SigNoz ${version}`,
      images: [siteMetadata.socialBanner],
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/api-reference/${version}/`,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function APIReferencePage(props: PageProps) {
  const params = await props.params
  const { version } = params

  if (version === 'latest') {
    const latestVersion = await resolveLatestVersion()
    if (!latestVersion) notFound()
    redirect(`/api-reference/${latestVersion}/`)
  }

  if (!parseSemverTag(version)) notFound()

  const [specContent, versionInfos] = await Promise.all([
    fetchOpenAPISpec(version),
    fetchAvailableAPIVersions(),
  ])

  if (!specContent) notFound()

  const availableVersions = versionInfos.map((v) => v.version)

  return (
    <div className="relative">
      <APIVersionSwitcher currentVersion={version} availableVersions={availableVersions} />
      <OpenAPISpec specContent={specContent} />
    </div>
  )
}
