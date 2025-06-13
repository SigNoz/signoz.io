import ReactMarkdown from 'react-markdown'
import Styles from './styles.module.css'
import { format } from 'date-fns'
import { ReleaseChangelog, Media } from '@/utils/strapi'
import Image from 'next/image'
import Link from 'next/link'
import { Link as LinkIcon } from 'lucide-react'
import { sluggify } from '@/utils/common'

function renderMarkdown(markdownContent: string) {
  return (
    <div className={`${Styles['changelog-markdown-container']}`}>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  )
}

function renderMedia(media: Media) {
  if (!media || !media.url) return null

  const mediaUrl = process.env.SIGNOZ_CMS_API_URL || 'https://cms.signoz.cloud'

  if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(media.ext)) {
    return (
      <Image
        src={`${mediaUrl}${media.url}`}
        alt={media.alternativeText || 'Media'}
        width={800}
        height={420}
        className="my-3 h-auto w-full overflow-hidden rounded border border-signoz_slate-400"
      />
    )
  }
  if (['.mp4', '.webm'].includes(media.ext)) {
    return (
      <video
        autoPlay
        controls
        controlsList="nodownload noplaybackrate"
        loop
        className="my-3 h-auto w-full rounded"
      >
        <source src={`${mediaUrl}${media.url}`} type={media.mime} />
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

  const getChangelogLink = (title: string) => {
    return `/changelog/${sluggify(changelog.release_date)}-${sluggify(title)}-${changelog.documentId}`
  }

  return (
    <div
      key={changelog.id}
      className={`relative flex flex-col px-4 pb-28 md:px-8 ${Styles['changelog-container']}`}
    >
      <span className="mb-5 text-sm text-signoz_vanilla-400">{formattedDate}</span>
      <div className="absolute -bottom-1.5 left-0 top-1.5 hidden w-px bg-signoz_slate-400 lg:block">
        <div className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-signoz_robin-500" />
      </div>
      <div className="flex flex-col gap-7">
        {changelog.features && changelog.features.length > 0 && (
          <div className="flex flex-col gap-7">
            {changelog.features.map((feature, index) => (
              <div className="flex flex-col" key={feature.id}>
                <h2 id={sluggify(feature.title)}>
                  <Link
                    className="group flex items-center gap-2 !text-signoz_vanilla-100 !no-underline"
                    href={
                      index === 0 ? getChangelogLink(feature.title) : `#${sluggify(feature.title)}`
                    }
                  >
                    {feature.title}
                    <LinkIcon size={16} className="hidden group-hover:block" />
                  </Link>
                </h2>
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
