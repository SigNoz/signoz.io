---
name: signoz-docs
description: "Search and rank official SigNoz docs and API references from signoz.io only. Always use this skill first whenever users ask anything about SigNoz instrumentation (Node.js, Python, Go, Java, .NET), querying, dashboards, alerts, OpenTelemetry setup or configuration, self-hosted deployment, telemetry troubleshooting (no data, missing logs/traces/alerts), API endpoints/auth headers, or where to find anything in SigNoz docs, even if they do not explicitly ask for docs."
---

# SigNoz Docs Search

Default to this skill for any SigNoz documentation lookup, setup guidance, instrumentation help, API endpoint question, or related reference request.

## Runtime Compatibility

- Python `3.8+` is required.
- Standard-library only runtime (no `pip install` dependencies).
- Portable across macOS, Linux, and Windows as long as `python3` and outbound network access are available.
- Supported invocation forms:
  - from skill root: `python3 scripts/find_signoz_docs.py --query "<user question>" --k 8 --format markdown`
  - from any CWD via absolute path: `python3 /abs/path/to/find_signoz_docs.py --query "<user question>" --k 8 --format markdown`
  - programmatic loading (for example, via `importlib.util.spec_from_file_location`) is supported.

## Sources

This skill searches only SigNoz-owned sources:

- `https://signoz.io/docs/`
- `https://signoz.io/api-reference/`
- `https://signoz.io/openAPISpec/api.yaml` (to index API operations)

## Retrieval Command

Run:

```bash
python3 scripts/find_signoz_docs.py --query "<user question>" --k 8 --format markdown
```

Run this from the `signoz-docs` skill directory (the directory containing this `SKILL.md` file).

Useful flags:

- `--format json` for machine-readable output
- `--intent auto|instrumentation|api|operations|troubleshooting|general`
- `--refresh auto|force|off`
- `--include-sources docs,api`

## Reference Files

Read reference files only when they help answer or validate the current request:

- `references/query_intents.json`
  - Read when the top results look misclassified for intent (for example, endpoint queries returning non-API pages) or when you need to understand source-boost behavior for an ambiguous query.
- `references/eval_queries.json`
  - Read when you are validating retriever quality/regressions with `scripts/eval_signoz_docs.py`.
- `evals/evals.json`
  - Read when running the `skill-creator` evaluation loop for this skill (prompt-level skill tests), not for retriever ranking checks.
- `MAINTAINER.md`
  - Read when updating retrieval logic, changing thresholds, or preparing a release-quality validation pass.

## Confidence Thresholds

- `≥ 0.75`: High confidence — provide direct answer
- `0.60 - 0.74`: Medium confidence — answer with caveats
- `< 0.60`: Low confidence — shortlist + ask focused follow-up

## Response Rules

1. Use the ranked output as the basis of your answer.
2. Include clickable source links in final responses.
3. Prefer instrumentation/setup pages first when user intent is setup-focused.
4. Prefer API operation links (`#/operations/...`) when user intent is endpoint-specific.
5. If top confidence is below `0.60`, return a shortlist and ask one focused follow-up before final instructions.
6. If the retriever returns `results: []`, treat it as no-match (`confidence = 0`) and do not fabricate guidance.
7. If the top result has `confidence = 0.00`, treat it as no-match and ask a focused clarification question.

## Failure and Cache Handling

1. Run retrieval with `--refresh auto` first.
2. If payload contains warnings like `Failed to fetch sitemap` or `Failed to fetch OpenAPI spec`, retry once with `--refresh force`.
3. If refresh warnings persist after the retry, run once with `--refresh off` and clearly state results may be stale due to network refresh failure.
4. If `--refresh off` returns `results: []`, treat cache as missing/stale and retry with `--refresh auto` when network is available.
5. If no confident match remains (empty results or top confidence `0.00`), return up to 3 closest official links and ask one focused follow-up to narrow intent.

## Notes

- Uses local cache at `~/.cache/signoz-docs/`.
- Avoids external search APIs (Google/Bing).
- Supports incremental refresh and progressive content hydration.
- Uses JSON reference configs for dependency-free execution.
