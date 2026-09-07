const fs = require('fs')

// Hidden marker used to find and edit the comment in place
const MARKER = '<!-- docs-metadata-guard -->'

// First match wins, so specific patterns come before general ones
const FIX_GUIDE = [
  ['missing date', 'Add `published_date` to the frontmatter, in `YYYY-MM-DD` format.'],
  ['format - use YYYY-MM-DD', 'Write the date as `YYYY-MM-DD`, for example `2026-08-25`.'],
  ['updated_date cannot be more than 7 days in the past', 'Set `updated_date` to today.'],
  [
    'published_date cannot be more than 7 days in the past',
    'Add `updated_date` with the date of today. Do not change `published_date`.',
  ],
  [
    'date cannot be more than 7 days in the past',
    'Replace the legacy `date` field with `published_date` (the original date) and `updated_date` (the date of today).',
  ],
  ['more than 7 days in the future', 'Set the date to the date of today.'],
  [
    'updated_date requires published_date',
    'Add `published_date` with the original publication date of the doc.',
  ],
  [
    'must not be combined',
    'Use `published_date` and `updated_date`. Remove the legacy `date` field.',
  ],
  ['missing title', 'Add a `title` field to the frontmatter.'],
  ['missing description', 'Add a `description` field to the frontmatter.'],
  ['title cannot be empty', 'Give the `title` field a value.'],
  ['description cannot be empty', 'Give the `description` field a value.'],
]

function fixHintFor(issue) {
  const match = FIX_GUIDE.find(([pattern]) => issue.includes(pattern))
  return match ? match[1] : null
}

function renderFileSection({ file, issues }, icon) {
  let section = `**${icon} \`${file}\`**\n\n`
  for (const issue of issues) {
    const hint = fixHintFor(issue)
    section += `- ${issue}${hint ? `\n  ${hint}` : ''}\n`
  }
  return `${section}\n`
}

/** @returns {string|null} The comment body, or null when no comment is needed. */
function buildCommentBody(report) {
  const invalidFiles = report.invalidFiles || []
  const warningFiles = report.warningFiles || []

  if (invalidFiles.length === 0) {
    return null
  }

  const count = invalidFiles.length
  let body = `${MARKER}\n## Docs metadata check failed\n\n`
  body += count === 1 ? 'The frontmatter of 1 file ' : `The frontmatter of ${count} files `
  body += `${count === 1 ? 'does' : 'do'} not pass the metadata rules. `
  body += 'Fix the problems that follow, then push again. The check runs again on each push.\n\n'

  for (const entry of invalidFiles) {
    body += renderFileSection(entry, '❌')
  }

  if (warningFiles.length > 0) {
    body += '<details>\n<summary>Warnings (these do not block the merge)</summary>\n\n'
    for (const entry of warningFiles) {
      body += renderFileSection(entry, '⚠️')
    }
    body += '</details>\n\n'
  }

  body += '### Date rules\n\n'
  body += 'A doc uses one of these combinations:\n\n'
  body += '- `published_date` and `updated_date`\n'
  body += '- `published_date` alone\n'
  body += '- `date` alone (legacy)\n\n'
  body += 'The most recent date must be within 7 days of today. '
  body += 'When you update an old doc, set `updated_date` to today. '
  body += 'Do not change `published_date`.\n\n'
  body += '### Skip the date rule\n\n'
  body += 'If the change is trivial, such as a typo, a link, or formatting, you can skip the '
  body += 'date rule. Use one of these:\n\n'
  body += '- Add the label `skip-date-check` to this pull request\n'
  body += '- Put `[skip-date]` in the title of this pull request\n'
  body += '- Put `[skip-date]` in a commit message\n\n'
  body += 'The skip covers every doc in this pull request. All other rules stay active.\n'

  return body
}

async function findStickyComment(github, context) {
  const comments = await github.paginate(github.rest.issues.listComments, {
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    per_page: 100,
  })
  return comments.find((comment) => comment.body && comment.body.includes(MARKER))
}

module.exports = async ({ github, context, core }) => {
  if (!context.issue || !context.issue.number) {
    core.info('No pull request in the context. No comment is necessary.')
    return
  }

  const reportPath = process.env.DOCS_METADATA_REPORT
  if (!reportPath || !fs.existsSync(reportPath)) {
    core.info(`No metadata report at ${reportPath || '(path not set)'}. No comment is necessary.`)
    return
  }

  let report
  try {
    report = JSON.parse(fs.readFileSync(reportPath, 'utf8'))
  } catch (error) {
    core.warning(`Unable to read the metadata report: ${error.message}`)
    return
  }

  const body = buildCommentBody(report)
  const existing = await findStickyComment(github, context)

  if (!body) {
    if (existing) {
      await github.rest.issues.deleteComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        comment_id: existing.id,
      })
      core.info('The check passed. The previous comment was deleted.')
    }
    return
  }

  if (existing) {
    await github.rest.issues.updateComment({
      owner: context.repo.owner,
      repo: context.repo.repo,
      comment_id: existing.id,
      body,
    })
    core.info('The previous comment was updated.')
    return
  }

  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.issue.number,
    body,
  })
  core.info('A comment was added to the pull request.')
}

module.exports.buildCommentBody = buildCommentBody
module.exports.MARKER = MARKER
