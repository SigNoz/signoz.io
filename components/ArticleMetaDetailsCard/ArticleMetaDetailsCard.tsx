import Link from 'next/link'
import Image from 'next/image'

export type RenderedAuthor = {
  name: string
  url?: string
  image?: string
}

interface MetaCardProps {
  authors: RenderedAuthor[]
  readingTimeText?: string | null
  formattedUpdatedDate?: string | null
  primaryTags: string[]
  hiddenTags: string[]
  hiddenTagsTitle?: string
}

export default function ArticleMetaDetailsCard({
  authors,
  readingTimeText,
  formattedUpdatedDate,
  primaryTags,
  hiddenTags,
  hiddenTagsTitle,
}: MetaCardProps) {
  const primaryAuthor = authors[0]

  return (
    <div className="mb-6 rounded-xl border border-signoz_ink-300/80 bg-signoz_ink-500/50 p-4 text-sm text-white/90 shadow-lg">
      <div className="flex flex-col gap-3">
        {authors.length > 0 && (
          <div className="flex items-center gap-3">
            {primaryAuthor?.image && (
              <Image
                src={primaryAuthor.image}
                alt={primaryAuthor.name}
                width={36}
                height={36}
                className="m-0 h-9 w-9 rounded-full border border-white/10 object-cover"
              />
            )}
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase text-white/60">
                Author{authors.length > 1 ? 's' : ''}
              </span>
              <span>
                {authors.map((author, idx) => (
                  <span key={`${author.name}-${idx}`} className="text-white">
                    {author.url ? (
                      <Link
                        href={author.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="!text-gray-200 transition-colors hover:text-signoz_robin-400"
                      >
                        {author.name}
                      </Link>
                    ) : (
                      author.name
                    )}
                    {idx < authors.length - 1 && <span className="text-white/60">, </span>}
                  </span>
                ))}
              </span>
            </div>
          </div>
        )}

        {readingTimeText && (
          <div className="flex items-center justify-between text-white/80">
            <span className="text-xs uppercase tracking-wide text-white/60">Read Time</span>
            <span>{readingTimeText}</span>
          </div>
        )}

        {formattedUpdatedDate && (
          <div className="flex items-center justify-between text-white/80">
            <span className="text-xs uppercase tracking-wide text-white/60">Last Updated</span>
            <span>{formattedUpdatedDate}</span>
          </div>
        )}

        {primaryTags.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-white/60">Tags</span>
            <div className="flex flex-wrap gap-2">
              {primaryTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/90"
                >
                  {tag}
                </span>
              ))}
              {hiddenTags.length > 0 && (
                <span
                  className="rounded-full border border-white/10 px-2 py-1 text-xs text-white/70"
                  title={hiddenTagsTitle}
                >
                  +{hiddenTags.length} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
