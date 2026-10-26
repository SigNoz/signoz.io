import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import LegalDocument from '@/components/legal/LegalDocument'
import { getLegalDoc, getLegalDocs } from '@/utils/legal'

type PageProps = {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return getLegalDocs().map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = getLegalDoc(slug)
  if (!doc) return {}

  const title = `${doc.title} | SigNoz`
  const url = `${siteMetadata.siteUrl}/legal/${doc.slug}/`

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title,
      description: doc.description,
      url,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'website',
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      title,
      description: doc.description,
      images: [siteMetadata.socialBanner],
      site: siteMetadata.twitter,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: url,
    },
  }
}

export default async function LegalDocumentPage({ params }: PageProps) {
  const { slug } = await params
  const doc = getLegalDoc(slug)
  if (!doc) notFound()

  return <LegalDocument doc={doc} />
}
