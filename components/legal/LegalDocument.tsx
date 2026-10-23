import ReactMarkdown from 'react-markdown'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import OpenInAI from '@/components/OpenInAI'
import { LEGAL_PAGE_CLASSES } from '@/components/legal/legalPageClasses'
import { BASE_URL } from '@/utils/breadcrumbTypes'
import { formatLegalDate, type LegalDoc } from '@/utils/legal'
import { LEGAL_REMARK_PLUGINS } from '@/utils/legalMarkdown'

export default function LegalDocument({ doc }: { doc: LegalDoc }) {
  const pageUrl = `/legal/${doc.slug}/`
  const breadcrumbs = [
    { name: 'Home', url: `${BASE_URL}/` },
    { name: 'Legal', url: `${BASE_URL}/legal/` },
    { name: doc.title, url: `${BASE_URL}${pageUrl}` },
  ]

  return (
    <div className={LEGAL_PAGE_CLASSES}>
      <Breadcrumb crumbs={breadcrumbs} />
      <div className="mt-2 flex items-start justify-between gap-4">
        <div>
          <h1 className="m-0 text-3xl leading-tight text-[var(--l1-foreground)]">{doc.title}</h1>
          {doc.lastUpdated && (
            <p className="m-0 mt-2 text-sm text-[var(--l3-foreground)]">
              Last updated{' '}
              <time dateTime={doc.lastUpdated}>{formatLegalDate(doc.lastUpdated)}</time>
            </p>
          )}
        </div>
        <OpenInAI
          markdownContent={doc.content}
          pageUrl={pageUrl}
          className="shrink-0"
          copyLabel="Copy markdown"
          docSlug={`legal/${doc.slug}`}
          aiVariant="explain"
        />
      </div>

      <article className="prose prose-slate max-w-none break-words py-6 dark:prose-invert prose-h2:text-xl md:text-justify">
        <ReactMarkdown remarkPlugins={LEGAL_REMARK_PLUGINS} components={{ h1: 'h2' }}>
          {doc.content}
        </ReactMarkdown>
      </article>
    </div>
  )
}
