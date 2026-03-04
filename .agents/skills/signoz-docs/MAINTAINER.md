# SigNoz Docs Skill Maintainer Guide

This document is for maintainers of the `signoz-docs` skill.
It is not required for runtime retrieval usage.

## Runtime Assumptions

- Skill retrieval (`find_signoz_docs.py`) is standard-library only.
- Eval/query-intent configs are JSON only.
- Validation mode is live-network only (against current `signoz.io` docs/API).

## OpenAPI Parser Tradeoff

- `parse_openapi_operations` uses a stdlib-only, indentation-based YAML parser.
- This is intentionally lightweight for runtime portability, but it is not a full YAML implementation.
- It can be fragile for advanced YAML constructs (anchors/aliases, flow style, multiline scalars, complex merges).
- If parsing regresses after OpenAPI spec changes, re-run evals with `--refresh force` and inspect API-operation coverage before tuning ranking logic.

## Validate Retrieval Quality

Run from the `signoz-docs` skill directory:

```bash
python3 scripts/eval_signoz_docs.py --k 5 --refresh auto
```

Optional JSON report:

```bash
python3 scripts/eval_signoz_docs.py --k 5 --refresh auto --format json
```

Refresh source indexes during validation:

```bash
python3 scripts/eval_signoz_docs.py --k 5 --refresh force
```

## Portability Smoke Checks

Use these checks after import/layout changes:

1. Run from skill root:
   - `python3 scripts/find_signoz_docs.py --query "signoz endpoint" --k 1 --format json --refresh off`
2. Run via absolute script path from another CWD:
   - `cd /tmp && python3 /absolute/path/to/find_signoz_docs.py --query "signoz endpoint" --k 1 --format json --refresh off`
3. Programmatic load check:
   - `python3 - <<'PY'`
   - `import importlib.util, pathlib`
   - `p = pathlib.Path("scripts/find_signoz_docs.py").resolve()`
   - `spec = importlib.util.spec_from_file_location("find_signoz_docs", p)`
   - `mod = importlib.util.module_from_spec(spec)`
   - `spec.loader.exec_module(mod)`
   - `print("import ok")`
   - `PY`

## Acceptance Thresholds

The curated eval suite (`references/eval_queries.json`) uses:

- Top-1 >= 75%
- Top-3 >= 92%
- Critical queries must all pass Top-3

Noise-control metric (informational, non-gating):

- Domain-sensitive cases can define `top2_expect`.
- Eval reports Top-2 domain-fit hits/failures separately.
- Pass/fail remains based on Top-1, Top-3, and critical Top-3.

## Confidence Interpretation

For `find_signoz_docs.py` results:

- `>= 0.75`: high confidence
- `0.60 - 0.74`: medium confidence
- `< 0.60`: low confidence (prefer shortlist + one focused follow-up)

## Critical Query Coverage

Critical eval coverage should include:

- Cloud account onboarding
- Self-host installation
- OTEL collector configuration
- OTLP endpoint (cloud and self-hosted phrasing)
- API dashboards and alert-rule operations
- API auth/header guidance
- Logs troubleshooting

## Release Checklist

1. Run syntax checks:
   - `python3 -m py_compile scripts/find_signoz_docs.py scripts/eval_signoz_docs.py`
2. Run smoke checks:
   - valid query returns results
   - empty query exits with code `2`
   - invalid `--include-sources` exits with code `2`
3. Run curated eval:
   - `python3 scripts/eval_signoz_docs.py --k 5 --refresh auto`
4. Spot-check critical behaviors:
   - OTLP endpoint queries should prefer ingestion/collector docs (not unrelated cloud-provider metrics pages)
   - `nodejs` instrumentation query should rank the Node.js page above Next.js
   - API auth-header query should surface API reference/auth-bearing operations

## Live-Network Troubleshooting

If eval results regress unexpectedly:

1. Re-run with fresh indexes:
   - `python3 scripts/eval_signoz_docs.py --k 5 --refresh force`
2. Inspect warnings in eval output (sitemap/spec fetch failures).
3. Re-run once after a short delay to rule out transient network/doc deploy churn.
4. Compare result deltas by query (`--format json`) before changing ranking logic.
