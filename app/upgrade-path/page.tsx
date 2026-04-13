import { allDocs } from 'contentlayer/generated'
import type { Doc } from 'contentlayer/generated'
import UpgradePathTool from './components/UpgradePathTool'
import upgradeSchema from '@/constants/upgradeSchema.json'

function getUpgradeDocsBySlug(): Record<string, Doc> {
  const guideUrls = Array.from(
    new Set(
      Object.values(upgradeSchema.releases)
        .map((release) => release.guideUrl)
        .filter(Boolean)
    )
  )

  return Object.fromEntries(
    guideUrls
      .map((guideUrl) => {
        const slug = decodeURI(
          `${guideUrl.replace('https://signoz.io/docs/', '').replace(/^\/+/, '')}`
        )
        const doc = allDocs.find((candidate) => candidate.slug === slug)

        return doc ? [slug, doc] : null
      })
      .filter(Boolean) as [string, Doc][]
  )
}

function UpgradePathToolPage() {
  const docsBySlug = getUpgradeDocsBySlug()

  return (
    <>
      <header className="relative !mx-auto">
        <div className="absolute bottom-0 left-[12px] right-[12px] top-0 z-[0] border !border-b-0 !border-t-0 border-dashed border-signoz_slate-400 md:left-[24px] md:right-[24px]" />
        <div className="bg-dot-pattern masked-dots absolute top-0 flex h-screen w-full items-center justify-center" />
        <div className="relative !mx-auto flex min-h-screen flex-col items-center border !border-b-0 border-dashed border-signoz_slate-400 pb-4 pt-12 md:pt-[4rem]">
          <UpgradePathTool docsBySlug={docsBySlug} />
        </div>
      </header>
    </>
  )
}

export default UpgradePathToolPage
