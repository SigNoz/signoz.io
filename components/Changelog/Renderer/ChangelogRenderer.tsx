import ReactMarkdown from 'react-markdown'
import Styles from './styles.module.css'
import { ReleaseChangelog, Media } from '@/utils/strapi'
import Image from 'next/image'

function renderMarkdown(markdownContent: string) {
  return <ReactMarkdown className={Styles['markdown-container']}>{markdownContent}</ReactMarkdown>
}

function renderMedia(media: Media) {
  if (!media || !media.url) return null

  if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(media.ext)) {
    return (
      <Image
        src={`http://localhost:1337${media.url}`}
        alt={media.documentId || 'Media'}
        width={800}
        height={600}
        className="mb-4 h-auto w-full rounded-lg"
      />
    )
  }
  if (['.mp4', '.webm'].includes(media.ext)) {
    return (
      <video autoPlay muted loop className="mb-8 h-auto w-full">
        <source src={`http://localhost:1337${media.url}`} type={media.mime} />
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
  return (
    <div
      key={changelog.id}
      className={`relative flex flex-col px-4 md:px-8 lg:pb-28 ${Styles['markdown-container']}`}
    >
      <p>{changelog.release_date}</p>
      <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-signoz_slate-400 lg:block">
        <div className="h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-signoz_robin-500" />
      </div>
      {changelog.features && changelog.features.length > 0 && (
        <div className="flex flex-col">
          <h1>Features</h1>
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
        <div>
          <h1>Bug Fixes</h1>
          <ul className="flex flex-col">
            {changelog.bug_fixes.map((bugFix, index) => (
              <li key={index}>{bugFix}</li>
            ))}
          </ul>
        </div>
      )}
      {changelog.maintenance && changelog.maintenance.length > 0 && (
        <div>
          <h1>Maintenance</h1>
          <ul className="flex flex-col">
            {changelog.maintenance.map((maintenance, idx) => (
              <li key={idx}>{maintenance}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ChangelogRenderer
