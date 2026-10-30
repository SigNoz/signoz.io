import type { NextRequest } from 'next/server'
import { proxyToProbo } from '@/utils/consent/proboProxy'

type Context = { params: Promise<{ path: string[] }> }

export async function GET(request: NextRequest, { params }: Context) {
  return proxyToProbo(request, (await params).path)
}

export async function POST(request: NextRequest, { params }: Context) {
  return proxyToProbo(request, (await params).path)
}
