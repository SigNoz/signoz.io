# Docs Frontmatter Template

```yaml
---
date: <YYYY-MM-DD> # Use today's date or a date in last 7 days
id: <unique-id-or-slug>
title: <Title in Sentence Case>
description: <1-2 line summary with key terms>
doc_type: <howto|tutorial|reference|explanation>
# tags:
#   - SigNoz Cloud
---
```

Notes:

- Omit `tags` when the doc applies to both Cloud and Self-Host.
- Use `tags: [Self-Host]` or `tags: [SigNoz Cloud]` only when the page is environment-specific.
