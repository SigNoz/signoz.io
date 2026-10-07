const { describe, it } = require('node:test')
const assert = require('node:assert')
const { buildCommentBody, MARKER } = require('../scripts/pr-comment-docs-metadata')

describe('pr-comment-docs-metadata', () => {
  describe('buildCommentBody', () => {
    it('should return null when no file has an error', () => {
      const body = buildCommentBody({ status: 'success', invalidFiles: [], warningFiles: [] })

      assert.strictEqual(body, null)
    })

    it('should return null when only warnings are present', () => {
      const body = buildCommentBody({
        status: 'success',
        invalidFiles: [],
        warningFiles: [{ file: 'data/docs/a.mdx', issues: ['tags must be an array'] }],
      })

      assert.strictEqual(body, null)
    })

    it('should start the body with the sticky marker', () => {
      const body = buildCommentBody({
        status: 'failure',
        invalidFiles: [{ file: 'data/docs/a.mdx', issues: ['missing title'] }],
        warningFiles: [],
      })

      assert.ok(body.startsWith(MARKER))
    })

    it('should list each file and each error', () => {
      const body = buildCommentBody({
        status: 'failure',
        invalidFiles: [
          { file: 'data/docs/a.mdx', issues: ['missing title'] },
          { file: 'data/docs/b.mdx', issues: ['missing description'] },
        ],
        warningFiles: [],
      })

      assert.ok(body.includes('data/docs/a.mdx'))
      assert.ok(body.includes('missing title'))
      assert.ok(body.includes('data/docs/b.mdx'))
      assert.ok(body.includes('missing description'))
    })

    it('should add a fix hint for a known error', () => {
      const body = buildCommentBody({
        status: 'failure',
        invalidFiles: [
          {
            file: 'data/docs/a.mdx',
            issues: ['updated_date cannot be more than 7 days in the past'],
          },
        ],
        warningFiles: [],
      })

      assert.ok(body.includes('Set `updated_date` to today'))
    })

    it('should keep an unknown error in the body without a hint', () => {
      const body = buildCommentBody({
        status: 'failure',
        invalidFiles: [{ file: 'data/docs/a.mdx', issues: ['some new rule failed'] }],
        warningFiles: [],
      })

      assert.ok(body.includes('some new rule failed'))
    })

    it('should put warnings in a collapsed section', () => {
      const body = buildCommentBody({
        status: 'failure',
        invalidFiles: [{ file: 'data/docs/a.mdx', issues: ['missing title'] }],
        warningFiles: [{ file: 'data/docs/b.mdx', issues: ['tags must be an array'] }],
      })

      assert.ok(body.includes('<details>'))
      assert.ok(body.includes('tags must be an array'))
    })

    it('should explain every way to skip the date rule', () => {
      const body = buildCommentBody({
        status: 'failure',
        invalidFiles: [{ file: 'data/docs/a.mdx', issues: ['missing title'] }],
        warningFiles: [],
      })

      assert.ok(body.includes('skip-date-check'))
      assert.ok(body.includes('[skip-date]'))
    })
  })
})
