---
name: docs-link-lint
description: Scan and fix docs MDX files for link compliance, frontmatter metadata, and external link formatting. Use when asked to "fix links", "lint docs", "check URLs", "check metadata", or before pushing docs changes. Triggers on docs MDX files.
when_to_use: User says fix links, lint docs, check URLs, fix metadata, fix dates, fix descriptions, push docs, or review docs for compliance. Also trigger before any git push of docs changes.
argument-hint: "[path or --branch]"
allowed-tools: Read Edit Glob Grep Bash(grep *) Bash(git diff *) Bash(git show *) Bash(sed *) Bash(for *) Bash(echo *) Bash(find *)
---

# Docs Link Lint

Scan docs MDX files and fix all link compliance issues, frontmatter metadata, and external link formatting in a single pass.

## Rules

### Rule 1: All Internal URLs Must Be Absolute

Every link pointing to a signoz.io docs page must use the full `https://signoz.io/` prefix. This applies in three contexts:

**Markdown links:**
```
BAD:  [Query Builder](/docs/userguide/query-builder-v5/)
GOOD: [Query Builder](https://signoz.io/docs/userguide/query-builder-v5/)
```

**JSX/HTML href attributes (DocCard, etc.):**
```
BAD:  href="/docs/alerts-management/metrics-based-alerts"
GOOD: href="https://signoz.io/docs/alerts-management/metrics-based-alerts"
```

**`<a>` tags with internal paths:**
```
BAD:  <a href="/docs/logs-pipelines/introduction/">log pipelines</a>
GOOD: <a href="https://signoz.io/docs/logs-pipelines/introduction/">log pipelines</a>
```

### Rule 2: External Links Must Use `<a>` Tags

Any link to a URL NOT starting with `https://signoz.io` must use an HTML `<a>` tag with `target="_blank"` and `rel="noopener noreferrer nofollow"`.

```
BAD:  [OpenTelemetry docs](https://opentelemetry.io/docs/concepts/signals/traces/)
GOOD: <a href="https://opentelemetry.io/docs/concepts/signals/traces/" target="_blank" rel="noopener noreferrer nofollow">OpenTelemetry docs</a>
```

**Exceptions — do NOT convert:**
- Links inside fenced code blocks (``` or indented code)
- Links inside frontmatter YAML
- Links inside HTML/JSX comments
- `signoz.io/blog/*` links (these are internal, keep as markdown)

### Rule 3: Frontmatter Must Have Current Date and Description

For every file you edit:
- `date:` must be today's date in `YYYY-MM-DD` format
- `description:` must be present and non-empty — if missing, add a concise SEO-friendly one-liner based on the page title and content

## Procedure

### Step 1: Collect Files

Determine target files from arguments:
- **Path to file(s):** lint those specific files
- **Path to directory:** lint all `*.mdx` files recursively in that directory
- **`--branch`:** use `git diff main...HEAD --name-only -- '*.mdx'` to get files changed on the current branch
- **No arguments:** ask the user what to scan

### Step 2: Scan All Files

Run these grep commands against all target files to find issues:

```bash
# Relative href attributes
grep -rn 'href="/docs/' <files>

# Relative markdown links
grep -rn '](/docs/' <files>

# External markdown links (exclude signoz.io)
grep -rn '\[.*\](https\?://' <files> | grep -v signoz.io

# Missing descriptions
# Check each file's frontmatter for presence of description: field

# Stale dates
# Check each file's date: field against today
```

### Step 3: Report Findings

Show a summary table BEFORE making any edits:

```
| Issue Type          | Files Affected | Total Instances |
|---------------------|---------------|-----------------|
| Relative href       | X             | Y               |
| Relative markdown   | X             | Y               |
| External markdown   | X             | Y               |
| Missing description | X             | Y               |
| Stale date          | X             | Y               |
```

If zero issues found, report "All clean" and stop.

### Step 4: Fix Issues

Use the Edit tool. Prefer `replace_all: true` for bulk replacements within a file:

1. `href="/docs/` → `href="https://signoz.io/docs/` (replace_all per file)
2. `](/docs/` → `](https://signoz.io/docs/` (replace_all per file)
3. `<a href="/docs/` → `<a href="https://signoz.io/docs/` (replace_all per file)
4. External markdown links → `<a>` tags (one by one, carefully preserving link text)
5. Update `date:` to today
6. Add `description:` if missing

**For efficiency:** Use an Agent subagent for large file sets (10+ files). The agent can handle all edits autonomously.

### Step 5: Verify

Re-run the EXACT same grep commands from Step 2. Every category must return zero results. If any issues remain, fix them and verify again.

### Step 6: Final Report

Show:
- Number of files fixed
- Number of issues resolved per category
- "All clean" confirmation or list of remaining issues

## Important Constraints

- NEVER change links that are already correct
- NEVER touch content inside fenced code blocks
- NEVER convert `signoz.io` links to `<a>` tags — only non-signoz external URLs need `<a>` tags
- ALWAYS verify after fixing — never assume fixes worked without re-scanning
- When adding a missing `description`, keep it under 160 characters for SEO
- For `date:`, always use today's actual date, not a hardcoded value
