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
    <div className="border-border/80 bg-background/50 text-foreground mb-6 rounded-xl border p-4 text-sm shadow-lg">
      <div className="flex flex-col gap-3">
        {authors.length > 0 && (
          <div className="flex items-center gap-3">
            {primaryAuthor?.image && (
              <Image
                src={primaryAuthor.image}
                alt={primaryAuthor.name}
                width={36}
                height={36}
                className="border-border m-0 h-9 w-9 rounded-full border object-cover"
              />
            )}
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs uppercase">
                Author{authors.length > 1 ? 's' : ''}
              </span>
              <span>
                {authors.map((author, idx) => (
                  <span key={`${author.name}-${idx}`} className="text-foreground">
                    {author.url ? (
                      <Link
                        href={author.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="!text-muted-foreground hover:text-accent-primary transition-colors"
                        prefetch={false}
                      >
                        {author.name}
                      </Link>
                    ) : (
                      author.name
                    )}
                    {idx < authors.length - 1 && <span className="text-muted-foreground">, </span>}
                  </span>
                ))}
              </span>
            </div>
          </div>
        )}

        {readingTimeText && (
          <div className="text-foreground/80 flex items-center justify-between">
            <span className="text-muted-foreground text-xs tracking-wide uppercase">Read Time</span>
            <span>{readingTimeText}</span>
          </div>
        )}

        {formattedPublishedDate && (
          <div className="text-foreground/80 flex items-center justify-between">
            <span className="text-muted-foreground text-xs tracking-wide uppercase">Published</span>
            <span>{formattedPublishedDate}</span>
          </div>
        )}

        {formattedUpdatedDate && (
          <div className="text-foreground/80 flex items-center justify-between">
            <span className="text-muted-foreground text-xs tracking-wide uppercase">
              Last Updated
            </span>
            <span>{formattedUpdatedDate}</span>
          </div>
        )}

        {primaryTags.length > 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-xs tracking-wide uppercase">Tags</span>
            <div className="flex flex-wrap gap-2">
              {primaryTags.map((tag) => (
                <span
                  key={tag}
                  className="border-border text-foreground rounded-full border px-2 py-1 text-xs"
                >
                  {tag}
                </span>
              ))}
              {hiddenTags.length > 0 && (
                <span
                  className="border-border text-foreground/70 rounded-full border px-2 py-1 text-xs"
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
