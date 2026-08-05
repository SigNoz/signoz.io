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
  formattedPublishedDate?: string | null
  formattedUpdatedDate?: string | null
  primaryTags: string[]
  hiddenTags: string[]
  hiddenTagsTitle?: string
}

export const ARTICLE_META_CARD_CLASS =
  'rounded-xl border border-[var(--l2-border)] bg-[var(--l1-background)] p-4 shadow-lg'

export default function ArticleMetaDetailsCard({
  authors,
  readingTimeText,
  formattedPublishedDate,
  formattedUpdatedDate,
  primaryTags,
  hiddenTags,
  hiddenTagsTitle,
}: MetaCardProps) {
  const primaryAuthor = authors[0]

  return (
    <div className={`mb-0 text-sm text-[var(--l1-foreground)] ${ARTICLE_META_CARD_CLASS}`}>
      <div className="flex flex-col gap-3">
        {authors.length > 0 && (
          <div className="flex items-center gap-3">
            {primaryAuthor?.image && (
              <Image
                src={primaryAuthor.image}
                alt={primaryAuthor.name}
                width={36}
                height={36}
                className="m-0 h-9 w-9 rounded-full border border-[var(--l2-border)] object-cover"
              />
            )}
            <div className="flex flex-col gap-1">
              <span className="text-xs uppercase text-[var(--l3-foreground)]">
                Author{authors.length > 1 ? 's' : ''}
              </span>
              <span>
                {authors.map((author, idx) => (
                  <span key={`${author.name}-${idx}`} className="text-[var(--l1-foreground-hover)]">
                    {author.url ? (
                      <Link
                        href={author.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="!text-[var(--l1-foreground)] transition-colors hover:!text-[var(--primary-background)]"
                        prefetch={false}
                      >
                        {author.name}
                      </Link>
                    ) : (
                      author.name
                    )}
                    {idx < authors.length - 1 && (
                      <span className="text-[var(--l3-foreground)]">, </span>
                    )}
                  </span>
                ))}
              </span>
            </div>
          </div>
        )}

        {readingTimeText && (
          <div className="flex items-center justify-between text-[var(--l1-foreground)]">
            <span className="text-xs uppercase tracking-wide text-[var(--l3-foreground)]">
              Read Time
            </span>
            <span>{readingTimeText}</span>
          </div>
        )}

        {formattedPublishedDate && (
          <div className="flex items-center justify-between text-[var(--l1-foreground)]">
            <span className="text-xs uppercase tracking-wide text-[var(--l3-foreground)]">
              Published
            </span>
            <span>{formattedPublishedDate}</span>
          </div>
        )}

        {formattedUpdatedDate && (
          <div className="flex items-center justify-between text-[var(--l1-foreground)]">
            <span className="text-xs uppercase tracking-wide text-[var(--l3-foreground)]">
              Last Updated
            </span>
            <span>{formattedUpdatedDate}</span>
          </div>
        )}

        {primaryTags.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-wide text-[var(--l3-foreground)]">
              Tags
            </span>
            <div className="flex flex-wrap gap-2">
              {primaryTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--l2-border)] px-2 py-1 text-xs text-[var(--l1-foreground)]"
                >
                  {tag}
                </span>
              ))}
              {hiddenTags.length > 0 && (
                <span
                  className="rounded-full border border-[var(--l2-border)] px-2 py-1 text-xs text-[var(--l3-foreground)]"
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
