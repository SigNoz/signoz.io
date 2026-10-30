import {
  buildRelatedPageLinksIntro,
  type RelatedPageLinks as RelatedPageLinksEntry,
} from '@/utils/docs/buildMarkdownDocument'

const REVEAL_ON_FOCUS_CLASSES =
  'focus-within:not-sr-only focus-within:fixed focus-within:left-4 focus-within:top-4 focus-within:z-[1300] focus-within:max-w-[calc(100vw-2rem)] focus-within:rounded-md focus-within:border focus-within:border-[var(--l1-border)] focus-within:bg-[var(--l1-background)] focus-within:p-4 focus-within:text-sm focus-within:text-[var(--l1-foreground)] focus-within:shadow-lg'

export default function RelatedPageLinks({ entry }: { entry: RelatedPageLinksEntry | null }) {
  if (!entry || entry.links.length === 0) return null

  return (
    <div className={`sr-only ${REVEAL_ON_FOCUS_CLASSES}`} data-markdown-ignore>
      <p>{buildRelatedPageLinksIntro(entry.title)}</p>
      <ol className="mt-2 list-decimal pl-5">
        {entry.links.map((url) => (
          <li key={url}>
            <a href={url} className="break-all underline">
              {url}
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
