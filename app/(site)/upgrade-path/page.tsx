import React from 'react'
import UpgradePathTool from './components/UpgradePathTool'
import upgradeSchema from '@/constants/upgradeSchema.json'
import { STANDARD_GUIDE_URL } from './utils/upgradeUtils'
import { fetchAllDocsForPage } from '@/utils/cachedData'
import { compileMdxSource } from '@/utils/compileMdx'

type RawDoc = Awaited<ReturnType<typeof fetchAllDocsForPage>>[number]

async function getUpgradeDocs(): Promise<{
  docMetaBySlug: Record<string, { title: string }>
  compiledDocsBySlug: Record<string, React.ReactNode>
}> {
  const guideUrls = Array.from(
    new Set([
      ...Object.values(upgradeSchema.releases)
        .map((release) => release.guideUrl)
        .filter(Boolean),
      STANDARD_GUIDE_URL,
    ])
  )

  const docs = await fetchAllDocsForPage()
  const docMetaBySlug: Record<string, { title: string }> = {}
  const compiledDocsBySlug: Record<string, React.ReactNode> = {}

  await Promise.all(
    guideUrls.map(async (guideUrl) => {
      const slug = decodeURI(
        `${guideUrl.replace('https://signoz.io/docs/', '').replace(/^\/+/, '')}`
      )
      const doc = docs.find((candidate: RawDoc) => candidate.slug === slug)
      if (!doc) return

      docMetaBySlug[slug] = { title: doc.title }

      try {
        const { content } = await compileMdxSource(doc.content || '')
        compiledDocsBySlug[slug] = content
      } catch (error) {
        console.error(`Failed to compile upgrade doc "${slug}":`, error)
      }
    })
  )

  return { docMetaBySlug, compiledDocsBySlug }
}

async function UpgradePathToolPage() {
  const { docMetaBySlug, compiledDocsBySlug } = await getUpgradeDocs()

  return (
    <>
      <header className="relative !mx-auto">
        <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="relative !mx-auto flex min-h-screen flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 pb-4 pt-12 md:pt-[4rem]">
          <UpgradePathTool docMetaBySlug={docMetaBySlug} compiledDocsBySlug={compiledDocsBySlug} />
        </div>
      </header>
    </>
  )
}

export default UpgradePathToolPage
