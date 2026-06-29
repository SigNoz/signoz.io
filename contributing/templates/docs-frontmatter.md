# Docs Frontmatter Template

```yaml
---
date: <YYYY-MM-DD> # Use today's date or a date in last 7 days
title: <Title in Sentence Case>
description: <1-2 line summary with key terms>
doc_type: <howto|tutorial|reference|explanation>
# tags:
#   - SigNoz Cloud
---
```

Notes:

- `id` and `slug` are no longer used in docs frontmatter. The URL comes from the file path. No `.` in the filename; use hyphens for version segments.
- Omit `tags` when the doc applies to both Cloud and Self-Host.
- Use `tags: [Self-Host]` or `tags: [SigNoz Cloud]` only when the page is environment-specific.
