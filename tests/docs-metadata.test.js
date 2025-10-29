const { describe, it, beforeEach, afterEach } = require('node:test')
const assert = require('node:assert')
const { extractFrontmatter, validateMetadata } = require('../scripts/check-docs-metadata')
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
    it('should pass validation for valid metadata', () => {
      const content = `---
title: Valid Document
date: 2024-01-15
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

    it('should warn when tags are missing', () => {
      const content = `---
title: No Tags Document
date: 2024-01-15
description: A document without tags
---

# Content
`
      const filePath = createTestFile('no-tags.mdx', content)
      const { errors, warnings } = validateMetadata(filePath)

      assert.strictEqual(errors.length, 0)
      assert.ok(warnings.includes('missing tags'))
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

      assert.ok(errors.includes('missing date'))
    })

    it('should error when title is missing', () => {
      const content = `---
date: 2024-01-15
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
      const content = `---
title: No Description Document
date: 2024-01-15
tags: ["test"]
---

# Content
`
      const filePath = createTestFile('no-description.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.includes('missing description'))
    })

    it('should error when description is empty', () => {
      const content = `---
title: Empty Description Document
date: 2024-01-15
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

      assert.ok(errors.includes('invalid date format - use YYYY-MM-DD'))
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

      assert.ok(errors.includes('date cannot be more than 7 days in the future'))
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

    it('should warn when tags is not an array', () => {
      const content = `---
title: Wrong Tags Format
date: 2024-01-15
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

    it('should warn when tags array is empty', () => {
      const content = `---
title: Empty Tags
date: 2024-01-15
description: A document with empty tags array
tags: []
---

# Content
`
      const filePath = createTestFile('empty-tags.mdx', content)
      const { errors, warnings } = validateMetadata(filePath)

      assert.strictEqual(errors.length, 0)
      assert.ok(warnings.includes('tags array cannot be empty'))
    })

    it('should handle files with no frontmatter', () => {
      const content = `# Just content`
      const filePath = createTestFile('no-frontmatter.mdx', content)
      const { errors } = validateMetadata(filePath)

      assert.ok(errors.length > 0)
      assert.ok(errors.includes('missing date'))
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
      const { errors, warnings } = validateMetadata(filePath)

      assert.ok(errors.length > 1)
      assert.ok(warnings.includes('missing tags'))
      assert.ok(errors.includes('missing title'))
      assert.ok(errors.includes('missing description'))
      assert.ok(errors.includes('invalid date format - use YYYY-MM-DD'))
    })
  })
})
