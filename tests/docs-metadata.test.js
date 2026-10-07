const { describe, it, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert')
const {
  extractFrontmatter,
  resolveDateSkipReason,
  validateMetadata,
} = require('../scripts/check-docs-metadata')
const fs = require('fs')
const path = require('path')
const os = require('os')

describe('check-docs-metadata', () => {
  let tempDir

  beforeEach(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'docs-metadata-test-'))
  })

  afterEach(() => {
    if (tempDir) {
      fs.rmSync(tempDir, { recursive: true, force: true })
    }
  })

  function createTestFile(filename, content) {
    const filePath = path.join(tempDir, filename)
    fs.writeFileSync(filePath, content, 'utf8')
    return filePath
  }

  describe('extractFrontmatter', () => {
    it('should extract frontmatter from valid MDX file', () => {
      const content = `---
title: Test Document
date: 2024-01-15
description: A test document for validation
tags: ["test", "example"]
---

# Content here
`
      const filePath = createTestFile('test.mdx', content)
      const frontmatter = extractFrontmatter(filePath)

      assert.ok(frontmatter.includes('title: Test Document'))
      assert.ok(frontmatter.includes('date: 2024-01-15'))
      assert.ok(frontmatter.includes('description: A test document for validation'))
      assert.ok(frontmatter.includes('tags: ["test", "example"]'))
    })

    it('should return empty string for file without frontmatter', () => {
      const content = `# Just content, no frontmatter`
      const filePath = createTestFile('no-frontmatter.mdx', content)
      const frontmatter = extractFrontmatter(filePath)

      assert.strictEqual(frontmatter, '')
    })

    it('should return null for non-existent file', () => {
      const frontmatter = extractFrontmatter('/non/existent/file.mdx')
      assert.strictEqual(frontmatter, null)
    })
  })

  describe('validateMetadata', () => {
    it('should pass validation for valid metadata with current date', () => {
      const today = new Date().toISOString().split('T')[0]
      const content = `---
title: Valid Document
date: ${today}
description: A valid document with all required fields
tags: ["SigNoz Cloud", "Self-Host"]
---

# Content
`
      const filePath = createTestFile('valid.mdx', content)
      const { errors, warnings } = validateMetadata(filePath)

      assert.strictEqual(errors.length, 0)
      assert.strictEqual(warnings.length, 0)
    })

    it('should error when date is missing', () => {
      const content = `---
title: No Date Document
description: A document without a date
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('no-date.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.some((e) => e.startsWith('missing date')))
    })

    it('should error when title is missing', () => {
      const today = new Date().toISOString().split('T')[0]
      const content = `---
date: ${today}
description: A document without a title
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('no-title.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.includes('missing title'))
    })

    it('should error when description is missing', () => {
      const today = new Date().toISOString().split('T')[0]
      const content = `---
title: No Description Document
date: ${today}
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('no-description.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.includes('missing description'))
    })

    it('should error when description is empty', () => {
      const today = new Date().toISOString().split('T')[0]
      const content = `---
title: Empty Description Document
date: ${today}
description: ""
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('empty-description.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.includes('description cannot be empty'))
    })

    it('should error for invalid date format', () => {
      const content = `---
title: Invalid Date Format
date: 01/15/2024
description: A document with invalid date format
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('invalid-date.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.some((e) => e.includes('invalid') && e.includes('format')))
    })

    it('should error for dates more than 7 days in the future', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 10) // 10 days in the future
      const futureDateStr = futureDate.toISOString().split('T')[0]

      const content = `---
title: Future Date Document
date: ${futureDateStr}
description: A document with a future date
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('future-date.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.some((e) => e.includes('cannot be more than 7 days in the future')))
    })

    it('should allow dates up to 7 days in the future', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 5) // 5 days in the future
      const futureDateStr = futureDate.toISOString().split('T')[0]

      const content = `---
title: Near Future Date Document
date: ${futureDateStr}
description: A document with a near future date
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('near-future-date.mdx', content)
      const { errors, warnings } = validateMetadata(filePath)

      assert.strictEqual(errors.length, 0)
      assert.strictEqual(warnings.length, 0)
    })

    it('should error for dates more than 7 days in the past', () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 10) // 10 days in the past
      const pastDateStr = pastDate.toISOString().split('T')[0]

      const content = `---
title: Old Date Document
date: ${pastDateStr}
description: A document with an old date
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('old-date.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.some((e) => e.includes('cannot be more than 7 days in the past')))
    })

    it('should allow dates up to 7 days in the past', () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 5) // 5 days in the past
      const pastDateStr = pastDate.toISOString().split('T')[0]

      const content = `---
title: Recent Past Date Document
date: ${pastDateStr}
description: A document with a recent past date
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('recent-past-date.mdx', content)
      const { errors, warnings } = validateMetadata(filePath)

      assert.strictEqual(errors.length, 0)
      assert.strictEqual(warnings.length, 0)
    })

    it("should allow today's date", () => {
      const today = new Date()
      const todayStr = today.toISOString().split('T')[0]

      const content = `---
title: Today's Date Document
date: ${todayStr}
description: A document with today's date
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('today-date.mdx', content)
      const { errors, warnings } = validateMetadata(filePath)

      assert.strictEqual(errors.length, 0)
      assert.strictEqual(warnings.length, 0)
    })

    it('should allow date exactly 7 days in the past', () => {
      const pastDate = new Date()
      pastDate.setDate(pastDate.getDate() - 7) // Exactly 7 days in the past
      const pastDateStr = pastDate.toISOString().split('T')[0]

      const content = `---
title: Seven Days Past Document
date: ${pastDateStr}
description: A document with date exactly 7 days in the past
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('seven-days-past.mdx', content)
      const { errors, warnings } = validateMetadata(filePath)

      assert.strictEqual(errors.length, 0)
      assert.strictEqual(warnings.length, 0)
    })

    it('should allow date exactly 7 days in the future', () => {
      const futureDate = new Date()
      futureDate.setDate(futureDate.getDate() + 7) // Exactly 7 days in the future
      const futureDateStr = futureDate.toISOString().split('T')[0]

      const content = `---
title: Seven Days Future Document
date: ${futureDateStr}
description: A document with date exactly 7 days in the future
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('seven-days-future.mdx', content)
      const { errors, warnings } = validateMetadata(filePath)

      assert.strictEqual(errors.length, 0)
      assert.strictEqual(warnings.length, 0)
    })

    it('should allow older dates when only title and description change', () => {
      const oldDate = new Date()
      oldDate.setDate(oldDate.getDate() - 30)
      const oldDateStr = oldDate.toISOString().split('T')[0]

      const previousContent = `---
title: Previous Title
date: ${oldDateStr}
description: Previous description
tags: ["test"]
---

# Content
`

      const currentContent = `---
title: Updated Title
date: ${oldDateStr}
description: Updated description
tags: ["test"]
---

# Content
`

      const filePath = createTestFile('metadata-only-change.mdx', currentContent)
      const { errors, warnings } = validateMetadata(filePath, { previousContent })

      assert.strictEqual(errors.length, 0)
      assert.strictEqual(warnings.length, 0)
    })

    it('should allow older dates when previousContent has no trailing newline', () => {
      const oldDate = new Date()
      oldDate.setDate(oldDate.getDate() - 30)
      const oldDateStr = oldDate.toISOString().split('T')[0]

      const previousContent = `---
title: Previous Title
date: ${oldDateStr}
description: Previous description
tags: ["test"]
---

# Content`

      const currentContent = `---
title: Updated Title
date: ${oldDateStr}
description: Updated description
tags: ["test"]
---

# Content
`

      const filePath = createTestFile('trimmed-previous.mdx', currentContent)
      const { errors, warnings } = validateMetadata(filePath, { previousContent })

      assert.strictEqual(errors.length, 0)
      assert.strictEqual(warnings.length, 0)
    })

    it('should still require a recent date when body content changes', () => {
      const oldDate = new Date()
      oldDate.setDate(oldDate.getDate() - 30)
      const oldDateStr = oldDate.toISOString().split('T')[0]

      const previousContent = `---
title: Existing Title
date: ${oldDateStr}
description: Existing description
tags: ["test"]
---

# Content
`

      const currentContent = `---
title: Existing Title
date: ${oldDateStr}
description: Existing description
tags: ["test"]
---

# Updated Content
`

      const filePath = createTestFile('body-change-old-date.mdx', currentContent)
      const { errors } = validateMetadata(filePath, { previousContent })

      assert.ok(errors.some((e) => e.includes('cannot be more than 7 days in the past')))
    })

    it('should warn when tags is not an array', () => {
      const today = new Date().toISOString().split('T')[0]
      const content = `---
title: Wrong Tags Format
date: ${today}
description: A document with wrong tags format
tags: test
---

# Content
`
      const filePath = createTestFile('wrong-tags.mdx', content)
      const { errors, warnings } = validateMetadata(filePath)

      assert.strictEqual(errors.length, 0)
      assert.ok(warnings.includes('tags must be an array'))
    })

    it('should allow empty tags array', () => {
      const today = new Date().toISOString().split('T')[0]
      const content = `---
title: Empty Tags
date: ${today}
description: A document with empty tags array
tags: []
---

# Content
`
      const filePath = createTestFile('empty-tags.mdx', content)
      const { errors, warnings } = validateMetadata(filePath)

      assert.strictEqual(errors.length, 0)
      assert.strictEqual(warnings.length, 0)
    })

    it('should handle files with no frontmatter', () => {
      const content = `# Just content`
      const filePath = createTestFile('no-frontmatter.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.length > 0)
      assert.ok(errors.some((e) => e.startsWith('missing date')))
      assert.ok(errors.includes('missing title'))
      assert.ok(errors.includes('missing description'))
    })

    it('should error for non-existent file', () => {
      const { errors } = validateMetadata('/non/existent/file.mdx')

      assert.ok(errors.includes('file not found'))
    })

    it('should handle multiple errors and warnings', () => {
      const content = `---
date: invalid-date
---

# Content
`
      const filePath = createTestFile('multiple-issues.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.length > 1)
      assert.ok(errors.includes('missing title'))
      assert.ok(errors.includes('missing description'))
      assert.ok(errors.some((e) => e.includes('invalid') && e.includes('format')))
    })

    // Date field combination validation tests
    it('should accept published_date + updated_date (new-style)', () => {
      const today = new Date().toISOString().split('T')[0]
      const content = `---
title: New Style Dates
published_date: ${today}
updated_date: ${today}
description: Both new-style date fields
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('new-style-dates.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.strictEqual(errors.length, 0)
    })

    it('should accept published_date only', () => {
      const today = new Date().toISOString().split('T')[0]
      const content = `---
title: Published Only
published_date: ${today}
description: Only published_date set
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('published-only.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.strictEqual(errors.length, 0)
    })

    it('should reject date combined with published_date', () => {
      const today = new Date().toISOString().split('T')[0]
      const content = `---
title: Mixed Date Fields
published_date: ${today}
date: ${today}
description: Both date and published_date
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('mixed-date-published.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.some((e) => e.includes('date must not be combined')))
    })

    it('should reject date combined with updated_date', () => {
      const today = new Date().toISOString().split('T')[0]
      const content = `---
title: Mixed Date Fields
date: ${today}
updated_date: ${today}
description: Both date and updated_date
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('mixed-date-updated.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.some((e) => e.includes('date must not be combined')))
    })

    it('should reject updated_date without published_date', () => {
      const today = new Date().toISOString().split('T')[0]
      const content = `---
title: Updated Only
updated_date: ${today}
description: Only updated_date set
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('updated-only.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.some((e) => e.includes('updated_date requires published_date')))
    })

    it('should reject all three date fields combined', () => {
      const today = new Date().toISOString().split('T')[0]
      const content = `---
title: All Three Dates
published_date: ${today}
updated_date: ${today}
date: ${today}
description: All three date fields
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('all-three-dates.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.some((e) => e.includes('date must not be combined')))
    })
  })

  describe('skipDateEnforcement', () => {
    function oldDatedDoc() {
      const oldDate = new Date()
      oldDate.setDate(oldDate.getDate() - 30)
      const oldDateStr = oldDate.toISOString().split('T')[0]

      return `---
title: Existing Title
published_date: 2024-01-15
updated_date: ${oldDateStr}
description: Existing description
tags: ["test"]
---

# Content
`
    }

    it('should skip the date recency error when skipDateEnforcement is set', () => {
      const filePath = createTestFile('skip-date.mdx', oldDatedDoc())
      const { errors } = validateMetadata(filePath, { skipDateEnforcement: true })

      assert.strictEqual(errors.length, 0)
    })

    it('should still report the date recency error without skipDateEnforcement', () => {
      const filePath = createTestFile('no-skip-date.mdx', oldDatedDoc())
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.some((e) => e.includes('cannot be more than 7 days in the past')))
    })

    it('should still report missing required fields when skipDateEnforcement is set', () => {
      const content = `---
published_date: 2024-01-15
---

# Content
`
      const filePath = createTestFile('skip-date-missing-fields.mdx', content)
      const { errors } = validateMetadata(filePath, { skipDateEnforcement: true })

      assert.ok(errors.some((e) => e.includes('missing title')))
      assert.ok(errors.some((e) => e.includes('missing description')))
    })

    it('should still report an invalid date format when skipDateEnforcement is set', () => {
      const content = `---
title: Existing Title
published_date: 15-01-2024
description: Existing description
---

# Content
`
      const filePath = createTestFile('skip-date-bad-format.mdx', content)
      const { errors } = validateMetadata(filePath, { skipDateEnforcement: true })

      assert.ok(errors.some((e) => e.includes('invalid published_date format')))
    })
  })

  describe('resolveDateSkipReason', () => {
    const savedEnv = {}
    const managedKeys = ['SKIP_DATE_CHECK', 'PR_TITLE']

    beforeEach(() => {
      for (const key of managedKeys) {
        savedEnv[key] = process.env[key]
        delete process.env[key]
      }
    })

    afterEach(() => {
      for (const key of managedKeys) {
        if (savedEnv[key] === undefined) {
          delete process.env[key]
        } else {
          process.env[key] = savedEnv[key]
        }
      }
    })

    it('should return null when nothing asks for a skip', () => {
      assert.strictEqual(resolveDateSkipReason({ isPreCommit: true }), null)
    })

    it('should skip when SKIP_DATE_CHECK is truthy', () => {
      process.env.SKIP_DATE_CHECK = '1'
      assert.ok(resolveDateSkipReason({ isPreCommit: true }).includes('SKIP_DATE_CHECK'))

      process.env.SKIP_DATE_CHECK = 'true'
      assert.ok(resolveDateSkipReason({ isPreCommit: true }).includes('SKIP_DATE_CHECK'))
    })

    it('should not skip when SKIP_DATE_CHECK is false', () => {
      // The label lookup in the workflow yields the string "false"
      process.env.SKIP_DATE_CHECK = 'false'
      assert.strictEqual(resolveDateSkipReason({ isPreCommit: true }), null)
    })

    it('should skip when the pull request title holds the marker', () => {
      process.env.PR_TITLE = 'chore(docs): fix a broken link [skip-date]'
      const reason = resolveDateSkipReason({ isPreCommit: true })

      assert.ok(reason.includes('pull request title'))
    })

    it('should not read commit messages during a pre-commit run', () => {
      assert.strictEqual(resolveDateSkipReason({ comparisonRef: 'HEAD', isPreCommit: true }), null)
    })
  })
})
