import { NextResponse } from 'next/server'
import { fetchOpenAPISpec, resolveLatestVersion } from '@/utils/apiReference'
import { API_SPEC_REVALIDATE_SECONDS } from '@/constants/apiReference'

export const runtime = 'nodejs'

const CACHE_CONTROL_HEADER = `public, s-maxage=${API_SPEC_REVALIDATE_SECONDS}, stale-while-revalidate=86400`

const notFoundResponse = () =>
  new NextResponse('Not Found', {
    status: 404,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })

export async function GET(_: Request, { params }: { params: { version: string } }) {
  const raw = params.version
  const version = raw === 'latest' ? await resolveLatestVersion() : raw

  if (!version) return notFoundResponse()

  const spec = await fetchOpenAPISpec(version)
  if (!spec) return notFoundResponse()

  return new NextResponse(spec, {
    headers: {
      'Content-Type': 'text/yaml; charset=utf-8',
      'Cache-Control': CACHE_CONTROL_HEADER,
      Vary: 'Accept',
    },
  })
}
