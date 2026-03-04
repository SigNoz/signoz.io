Find the most relevant SigNoz docs and API references for: "$ARGUMENTS".

Workflow:

1. Run:
```bash
python3 scripts/find_signoz_docs.py --query "$ARGUMENTS" --k 8 --format markdown
```
   Run this command from the `signoz-docs` skill directory.
2. Return a prioritized shortlist with links.
3. Include a one-line reason per link.
4. Prefer instrumentation/setup pages for setup questions.
5. Prefer `#/operations/...` links for endpoint-specific API questions.
