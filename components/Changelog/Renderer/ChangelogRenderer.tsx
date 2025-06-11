import ReactMarkdown from 'react-markdown'
import Styles from './styles.module.css'
import { format } from 'date-fns'
import { ReleaseChangelog, Media } from '@/utils/strapi'
import Image from 'next/image'

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
        alt={media.documentId || 'Media'}
        width={800}
        height={600}
        className="my-3 h-auto w-full rounded"
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

  return (
    <div
      key={changelog.id}
      className={`relative flex flex-col px-4 md:px-8 lg:pb-28 ${Styles['changelog-container']}`}
    >
      <span className="mb-5 text-sm text-signoz_vanilla-400">{formattedDate}</span>
      <div className="absolute -bottom-1.5 left-0 top-1.5 hidden w-px bg-signoz_slate-400 lg:block">
        <div className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-signoz_robin-500" />
      </div>
      <div className="flex flex-col gap-7">
        {changelog.features && changelog.features.length > 0 && (
          <div className="flex flex-col gap-7">
            {changelog.features.map((feature) => (
              <div className="flex flex-col" key={feature.id}>
                <h2>{feature.title}</h2>
                {feature.media && renderMedia(feature.media)}
                {renderMarkdown(feature.description)}
              </div>
            ))}
          </div>
        )}
        {changelog.bug_fixes && changelog.bug_fixes.length > 0 && (
          <div className="flex flex-col">
            <h2>Bug Fixes</h2>
            <ul>
              {changelog.bug_fixes.map((bugFix, index) => (
                <li key={index}>{bugFix}</li>
              ))}
            </ul>
          </div>
        )}
        {changelog.maintenance && changelog.maintenance.length > 0 && (
          <div className="flex flex-col">
            <h2>Maintenance</h2>
            <ul>
              {changelog.maintenance.map((maintenance, idx) => (
                <li key={idx}>{maintenance}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChangelogRenderer
