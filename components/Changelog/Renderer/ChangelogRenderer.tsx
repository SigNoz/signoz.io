'use client'

import ReactMarkdown from 'react-markdown'
import Styles from './styles.module.css'
import { format } from 'date-fns'
import { ReleaseChangelog, Media } from '@/utils/strapi'
import Image from 'next/image'
import { sluggify } from '@/utils/common'
import { SupportedImageTypes, SupportedVideoTypes } from '@/utils/strapi'
import ChangelogTitle from '@/components/Changelog/Title/ChangelogTitle'
import Link from 'next/link'

function renderMarkdown(markdownContent: string) {
  return <ReactMarkdown>{markdownContent}</ReactMarkdown>
}

function renderMedia(media: Media) {
  if (!media || !media.url) return null

  if (SupportedImageTypes.includes(media.ext)) {
    return (
      <Image
        src={media.url}
        alt={media.alternativeText || 'Media'}
        width={800}
        height={420}
        className="border-border my-3 h-auto w-full overflow-hidden rounded border"
      />
    )
  }
  if (SupportedVideoTypes.includes(media.ext)) {
    return (
      <video
        autoPlay
        controls
        controlsList="nodownload noplaybackrate"
        loop
        className="border-border my-3 h-auto w-full rounded border"
      >
        <source src={media.url} type={media.mime} />
        Your browser does not support the video tag.
      </video>
    )
  }

  return null
}

interface ChangelogRendererProps {
  changelog: ReleaseChangelog
}

const ChangelogRenderer: React.FC<ChangelogRendererProps> = ({ changelog }) => {
  const formattedDate = format(new Date(changelog.release_date), 'MMMM dd, yyyy')

  const getChangelogLink = (title: string, hash?: string) => {
    if (hash) {
      return `/changelog/${sluggify(changelog.release_date)}-${sluggify(title)}-${changelog.documentId}#${hash}`
    }

    return `/changelog/${sluggify(changelog.release_date)}-${sluggify(title)}-${changelog.documentId}`
  }

  return (
    <div
      key={changelog.id}
      className={`relative flex flex-col px-4 pb-28 md:px-8 ${Styles['changelog-container']}`}
    >
      <div className="mb-5 flex flex-col gap-2">
        <Link
          target="_blank"
          href={`https://github.com/signoz/signoz/releases/tag/${changelog.version}`}
          className="border-border bg-background !text-l1-foreground hover:bg-l3-background active:bg-muted inline-flex w-fit items-center gap-1.5 rounded-full border px-2 py-1 text-xs !no-underline transition-colors"
        >
          {changelog.version}
        </Link>
        <span className="text-muted-foreground text-sm">{formattedDate}</span>
      </div>
      <div className="bg-muted absolute top-1.5 -bottom-16 left-0 hidden w-px lg:block">
        <div className="bg-primary absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full" />
      </div>
      <div className="flex flex-col gap-7">
        {changelog.features && changelog.features.length > 0 && (
          <div className="flex flex-col gap-7">
            {changelog.features.map((feature, index) => (
              <div className="flex flex-col" key={feature.id}>
                <ChangelogTitle
                  title={feature.title}
                  link={
                    index === 0
                      ? getChangelogLink(feature.title)
                      : getChangelogLink(changelog.features[0].title, sluggify(feature.title))
                  }
                />
                {feature.media && renderMedia(feature.media)}
                {renderMarkdown(feature.description)}
              </div>
            ))}
          </div>
        )}
        {changelog.bug_fixes && (
          <div className="flex flex-col">
            <h2>Bug Fixes</h2>
            {renderMarkdown(changelog.bug_fixes)}
          </div>
        )}
        {changelog.maintenance && (
          <div className="flex flex-col">
            <h2>Maintenance</h2>
            {renderMarkdown(changelog.maintenance)}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChangelogRenderer
