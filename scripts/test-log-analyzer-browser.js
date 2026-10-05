// Run against a local production build. Supply an installed Playwright module if it is not on NODE_PATH:
// PLAYWRIGHT_MODULE=/path/to/playwright node scripts/test-log-analyzer-browser.js
const assert = require('node:assert/strict')
const fs = require('node:fs/promises')
const os = require('node:os')
const path = require('node:path')
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright')

const baseURL = process.env.LOG_ANALYZER_URL || 'http://127.0.0.1:3100/log-analyzer/'
assert(['localhost', '127.0.0.1'].includes(new URL(baseURL).hostname), 'Use a local preview only')
const marker = 'LOCAL_LOG_QA_7d0893'

async function main() {
  const artifacts = await fs.mkdtemp(path.join(os.tmpdir(), 'log-analyzer-browser-'))
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  const page = await context.newPage()
  page.setDefaultTimeout(15_000)
  const errors = []
  const requests = []
  page.on('pageerror', (error) => errors.push(error.message))
  context.on('request', (request) => requests.push(`${request.url()} ${request.postData() || ''}`))
  const results = []
  async function check(name, run) {
    const started = Date.now()
    await run()
    const result = { name, milliseconds: Date.now() - started }
    results.push(result)
    console.log('PASS', JSON.stringify(result))
  }
  async function expectText(text) {
    await page.getByText(text, { exact: true }).first().waitFor()
  }
  async function openImport() {
    if (!(await page.getByRole('dialog', { name: 'Import local logs' }).isVisible())) {
      await page.locator('button[aria-controls="log-import-panel"]').click()
    }
  }
  async function upload(name, buffer, count) {
    await openImport()
    if (buffer.length >= 50 * 1024 * 1024) {
      const file = path.join(artifacts, name)
      await fs.writeFile(file, buffer)
      await page.locator('#log-file-input').setInputFiles(file)
    } else {
      await page.locator('#log-file-input').setInputFiles({ name, mimeType: 'text/plain', buffer })
    }
    await expectText(`Showing ${count.toLocaleString('en-US')} logs`)
    await page.getByRole('dialog', { name: 'Import local logs' }).waitFor({ state: 'hidden' })
  }
  async function paste(text, count) {
    await openImport()
    await page.getByRole('textbox', { name: 'Paste or upload logs' }).fill(text)
    await page.getByRole('button', { name: 'Analyze', exact: true }).click()
    await expectText(`Showing ${count.toLocaleString('en-US')} logs`)
    await page.getByRole('dialog', { name: 'Import local logs' }).waitFor({ state: 'hidden' })
  }
  async function download(format) {
    const downloadPromise = page.waitForEvent('download')
    await page.getByLabel('Export filtered logs').selectOption(format)
    const result = await downloadPromise
    const destination = path.join(artifacts, result.suggestedFilename())
    await result.saveAs(destination)
    return fs.readFile(destination, 'utf8')
  }
  try {
    await page.goto(baseURL, { waitUntil: 'networkidle' })
    await check('page and sample import; newest record first', async () => {
      await page.getByRole('heading', { name: 'Free Online Log Analyzer', exact: true }).waitFor()
      await page.getByRole('button', { name: 'Use sample', exact: true }).click()
      await expectText('Showing 7 logs')
      const rows = page.locator('button').filter({ hasText: /2026-08-31 10:14:/ })
      assert.match(await rows.first().innerText(), /10:14:24.902/)
      await rows.first().click()
      await page.getByLabel('Log details', { exact: true }).waitFor()
      await page.getByRole('button', { name: 'Close log details' }).click()
    })
    await check('paste, filter, and all export formats', async () => {
      await paste(
        [
          {
            timestamp: '2026-08-31T10:00:00Z',
            body: `${marker} old`,
            service: 'api',
            details: { retry: 1 },
          },
          {
            timestamp: '2026-08-31T10:01:00Z',
            body: `${marker} new, "quoted"`,
            service: 'api',
            details: { retry: 2 },
          },
          { timestamp: '2026-08-31T10:02:00Z', body: 'exclude', service: 'worker' },
        ]
          .map((record) => JSON.stringify(record))
          .join('\n'),
        3
      )
      await page.getByLabel('Filter value', { exact: true }).fill(marker)
      await page.getByRole('button', { name: 'Run Query', exact: true }).click()
      await expectText('Showing 2 logs')
      const jsonl = (await download('jsonl')).split('\n').map((line) => JSON.parse(line))
      assert.equal(jsonl.length, 2)
      assert.equal(jsonl[0].body, `${marker} new, "quoted"`)
      assert.deepEqual(jsonl[0].details, { retry: 2 })
      const csv = await download('csv')
      assert.match(csv, /new, ""quoted""/)
      assert.match(csv, /\{""retry"":2\}/)
      assert(!csv.includes('exclude'))
      const text = await download('txt')
      assert.equal(text.split('\n').length, 2)
      assert.equal(JSON.parse(text.split('\n')[0]).body, jsonl[0].body)
    })
    await check('CSV, TSV, JSON array, and plain-text upload', async () => {
      const fixtures = [
        ['logs.csv', `timestamp,body\n2026-08-31T10:00:00Z,"${marker}, CSV"`],
        ['logs.tsv', `timestamp\tbody\n2026-08-31T10:00:00Z\t${marker} TSV`],
        ['logs.json', JSON.stringify([{ timestamp: '2026-08-31T10:00:00Z', body: marker }])],
        ['logs.log', `2026-08-31T10:00:00Z INFO ${marker}`],
      ]
      for (const [name, input] of fixtures) await upload(name, Buffer.from(input), 1)
    })
    await check('time buckets, dotted group names, Having, and missing timestamps', async () => {
      await paste(JSON.stringify([{ body: marker }, { timestamp: 'invalid', body: marker }]), 2)
      await page.getByRole('tab', { name: 'Time Series', exact: true }).click()
      await expectText('No valid timestamps to chart.')
      await page.getByRole('tab', { name: 'List View', exact: true }).click()
      await paste(
        JSON.stringify([
          { timestamp: '2026-08-31T10:00:00Z', service: 'api.v1', body: marker },
          { timestamp: '2026-08-31T10:00:00Z', service: 'api.v1', body: marker },
          { timestamp: '2026-08-31T10:00:00Z', service: 'api.v1', body: marker },
          { timestamp: '2026-08-31T10:03:00Z', service: 'other', body: marker },
        ]),
        4
      )
      await page.getByRole('switch', { name: 'Show frequency chart' }).click()
      await page.locator('[aria-label="Log frequency chart"] [title="3 logs"]').waitFor()
      await page.locator('[aria-label="Log frequency chart"] [title="1 logs"]').waitFor()
      await page.getByRole('switch', { name: 'Show frequency chart' }).click()
      await page.getByRole('tab', { name: 'Time Series', exact: true }).click()
      await page.getByLabel('Group logs by').selectOption('service')
      await page.waitForFunction(
        () => document.querySelectorAll('.recharts-line-curve').length === 2
      )
      await page.getByLabel('Having operator').selectOption('>')
      await page.getByLabel('Having value', { exact: true }).fill('3')
      await expectText('No series match the Having condition.')
      await page.getByLabel('Having operator').selectOption('')
      await page.getByLabel('Group logs by').selectOption('')
      await page.getByRole('tab', { name: 'List View', exact: true }).click()
    })
    const largeLine =
      JSON.stringify({ timestamp: '2026-08-31T10:00:00Z', body: marker, duration_ms: 42 }) + '\n'
    await check(
      '200,000-record upload, virtualization, filter after scrolling, and charts',
      async () => {
        const buffer = Buffer.from(
          largeLine.repeat(199_999) +
            JSON.stringify({
              timestamp: '2026-08-31T10:00:00Z',
              body: `${marker} only-once`,
              duration_ms: 42,
            }) +
            '\n'
        )
        console.log(
          'FIXTURE',
          JSON.stringify({ name: 'many-records.jsonl', bytes: buffer.length, records: 200_000 })
        )
        await upload('many-records.jsonl', buffer, 200_000)
        const rows = page.getByRole('button').filter({ hasText: marker })
        assert((await rows.count()) < 60, 'Rows must remain virtualized')
        await rows.first().evaluate((button) => {
          const viewport = button.parentElement.parentElement
          viewport.scrollTop = 100_000
          viewport.dispatchEvent(new Event('scroll'))
        })
        await page.getByLabel('Filter value', { exact: true }).fill('only-once')
        await page.getByRole('button', { name: 'Run Query', exact: true }).click()
        await expectText('Showing 1 logs')
        await page.getByRole('button').filter({ hasText: 'only-once' }).first().waitFor()
        await page.getByLabel('Filter value', { exact: true }).fill('')
        await page.getByRole('button', { name: 'Run Query', exact: true }).click()
        await expectText('Showing 200,000 logs')
        await page.getByRole('tab', { name: 'Table', exact: true }).click()
        await page.getByRole('cell', { name: '200,000', exact: true }).waitFor()
        await page.getByLabel('Aggregation function').selectOption('max')
        await page.getByRole('cell', { name: '42', exact: true }).waitFor()
        await page.getByRole('tab', { name: 'Time Series', exact: true }).click()
        await page.locator('.recharts-line-curve').first().waitFor()
        await page.getByRole('tab', { name: 'List View', exact: true }).click()
        const exported = await download('jsonl')
        assert.equal(exported.split('\n').length, 200_000)
        await page.getByRole('switch', { name: 'Show frequency chart' }).click()
        await expectText('200,000 timestamped events')
        await page.screenshot({ path: path.join(artifacts, 'desktop-large.png') })
      }
    )
    const limit = 50 * 1024 * 1024
    const boundary = Buffer.alloc(limit, ' ')
    boundary.write(largeLine.repeat(Math.floor(limit / largeLine.length)))
    await check('exact 50 MiB upload limit', async () => {
      await upload('boundary.jsonl', boundary, Math.floor(limit / largeLine.length))
    })
    await check('over-limit upload and 20 MiB paste limit', async () => {
      await openImport()
      const tooLarge = path.join(artifacts, 'too-large.jsonl')
      await fs.writeFile(tooLarge, Buffer.alloc(limit + 1, ' '))
      await page.locator('#log-file-input').setInputFiles(tooLarge)
      await expectText('The file is larger than 50 MB. Use a smaller sample for this browser tool.')
      await page
        .getByRole('textbox', { name: 'Paste or upload logs' })
        .fill('x'.repeat(20 * 1024 * 1024 + 1))
      await page.getByRole('button', { name: 'Analyze', exact: true }).click()
      await expectText('Pasted input is limited to 20 MB. Upload larger files instead.')
    })
    await check('cancel large import and recover with sample', async () => {
      await page.locator('#log-file-input').setInputFiles(path.join(artifacts, 'boundary.jsonl'))
      await page.getByRole('button', { name: 'Cancel', exact: true }).click()
      await expectText('Analysis canceled. Your file stayed in this browser.')
      await page.getByRole('button', { name: 'Use sample', exact: true }).click()
      await expectText('Showing 7 logs')
      // Wait past the normal large-file completion time to detect a stale result after cancellation.
      await page.waitForTimeout(3_000)
      await expectText('Showing 7 logs')
    })
    await check('375px mobile import, filter, details, export, and full view', async () => {
      await page.setViewportSize({ width: 375, height: 812 })
      await page.reload({ waitUntil: 'networkidle' })
      await paste(JSON.stringify({ timestamp: '2026-08-31T10:00:00Z', body: marker }), 1)
      await page.getByLabel('Filter value', { exact: true }).fill(marker)
      await page.getByRole('button', { name: 'Run Query', exact: true }).click()
      await expectText('Showing 1 logs')
      await page.screenshot({ path: path.join(artifacts, 'mobile-before-check.png') })
      assert(
        await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
        'No page-level horizontal overflow'
      )
      await page.getByRole('button').filter({ hasText: marker }).first().click()
      await page.getByRole('button', { name: 'Close log details' }).click()
      assert.equal(JSON.parse(await download('jsonl')).body, marker)
      await page.getByRole('button', { name: 'Open in full view' }).click()
      await page.screenshot({ path: path.join(artifacts, 'mobile-full.png') })
      await page.getByRole('button', { name: 'Exit full view' }).click()
      await page.screenshot({ path: path.join(artifacts, 'mobile.png') })
    })
    await check('no log content in network requests or browser errors', async () => {
      assert(
        !requests.some((request) => request.includes(marker)),
        'Raw log content must not leave the browser'
      )
      assert.deepEqual(errors, [])
      assert.equal(await page.locator('[data-nextjs-dialog], .vite-error-overlay').count(), 0)
    })
    await fs.writeFile(
      path.join(artifacts, 'results.json'),
      JSON.stringify({ baseURL, results, errors, networkRequests: requests.length }, null, 2)
    )
    console.log('ARTIFACTS', artifacts)
  } catch (error) {
    await page.screenshot({ path: path.join(artifacts, 'failure.png') }).catch(() => {})
    console.error('ARTIFACTS', artifacts)
    throw error
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
