import Link from 'next/link'
import { fetchAvailableAPIVersions } from '@/utils/apiReference'
import { API_SPEC_REVALIDATE_SECONDS } from '@/constants/apiReference'

export const revalidate = API_SPEC_REVALIDATE_SECONDS

export default async function APIReferenceVersionsPage() {
  const versions = await fetchAvailableAPIVersions()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold text-white">SigNoz API Reference</h1>
      <p className="mb-8 text-gray-400">Select a version to view the API documentation.</p>

      {versions.length === 0 ? (
        <p className="text-gray-500">No API versions available at this time.</p>
      ) : (
        <div className="grid gap-3">
          {versions.map((v, index) => (
            <Link
              key={v.version}
              href={`/api-reference/${v.version}/`}
              className="flex items-center justify-between rounded-lg border border-signoz_slate-400 bg-signoz_slate-500/50 px-5 py-4 transition-colors hover:border-primary-600 hover:bg-signoz_slate-400"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-medium text-white">{v.version}</span>
                {index === 0 && (
                  <span className="rounded-full bg-primary-600 px-2.5 py-0.5 text-xs font-medium text-white">
                    Latest
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500">
                {new Date(v.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
