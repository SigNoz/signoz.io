#!/usr/bin/env node
/**
 * Syncs data/docs-side-nav/main.json to the Strapi CMS singleton endpoint.
 * PUT ${CMS_API_URL}/api/docs-side-nav
 *
 * Env vars:
 *   DEPLOYMENT_STATUS — "staging" | "live" (selects CMS URL/token)
 *   CMS_API_URL / CMS_STAGING_API_URL
 *   CMS_API_TOKEN / CMS_STAGING_API_TOKEN
 */

const fs = require('fs')
const path = require('path')

const DEPLOYMENT_STATUS = process.env.DEPLOYMENT_STATUS

const CMS_API_URL =
  DEPLOYMENT_STATUS === 'staging' ? process.env.CMS_STAGING_API_URL : process.env.CMS_API_URL
const CMS_API_TOKEN =
  DEPLOYMENT_STATUS === 'staging' ? process.env.CMS_STAGING_API_TOKEN : process.env.CMS_API_TOKEN

const MAX_RETRIES = parseInt(process.env.CMS_MAX_RETRIES || '3', 10)
const INITIAL_RETRY_DELAY_MS = parseInt(process.env.CMS_INITIAL_RETRY_DELAY_MS || '1000', 10)

const JSON_PATH = path.resolve(__dirname, '..', 'data', 'docs-side-nav', 'main.json')

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function syncWithRetry() {
  if (!CMS_API_URL || !CMS_API_TOKEN) {
    console.error('CMS_API_URL and CMS_API_TOKEN are required')
    process.exit(1)
  }

  const raw = fs.readFileSync(JSON_PATH, 'utf8')
  const items = JSON.parse(raw)

  if (!Array.isArray(items) || items.length === 0) {
    console.error('Parsed sidenav JSON is empty or not an array')
    process.exit(1)
  }

  const url = `${CMS_API_URL.replace(/\/$/, '')}/api/docs-side-nav`
  const body = JSON.stringify({ data: { items } })

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      console.log(`PUT ${url} (attempt ${attempt}/${MAX_RETRIES})`)

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CMS_API_TOKEN}`,
        },
        body,
      })

      const text = await res.text()

      if (res.ok) {
        console.log('Sidenav synced to CMS successfully')
        return
      }

      console.warn(`PUT failed (${res.status}): ${text}`)

      if (res.status >= 400 && res.status < 500 && res.status !== 429) {
        console.error('Client error — not retrying')
        process.exit(1)
      }
    } catch (err) {
      console.warn(`Request error: ${err.message}`)
    }

    if (attempt < MAX_RETRIES) {
      const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt - 1)
      console.log(`Retrying in ${delay}ms...`)
      await sleep(delay)
    }
  }

  console.error(`Failed to sync sidenav after ${MAX_RETRIES} attempts`)
  process.exit(1)
}

syncWithRetry().catch((err) => {
  console.error(err)
  process.exit(1)
})
