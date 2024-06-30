import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import process from 'process'
import YAML from 'yaml'
import { NextResponse } from 'next/server'

const dataDirectory = path.join(process.cwd(), 'openapi')

export async function GET(Request) {
  const fullPath = path.join(dataDirectory, 'alerts.yaml')
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  return NextResponse.json(YAML.parse(fileContents))
}
