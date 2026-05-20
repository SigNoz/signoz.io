---
name: check-docs-impact
description: Analyse a merged PR in the SigNoz main repo and determine whether it requires documentation changes. Takes a PR number or commit SHA, checks routing, feature flags, and UI impact, then outputs a yes/no verdict with a detailed checklist. Use when asked to "check docs impact", "does this PR need docs", or before syncing main repo changes to docs.
argument-hint: "<PR-number or commit-SHA>"
allowed-tools: Read Glob Grep Bash(git *) Bash(gh *) Bash(ls *) Agent
---

# Check Docs Impact

Analyse a merged PR from the SigNoz main repo (`SigNoz/signoz`) and determine whether it requires documentation updates in `signoz.io`.

## Inputs

- **PR number** (e.g. `11170`) — fetched via `gh pr view 11170 --repo SigNoz/signoz`
- **Commit SHA** — used directly with `git show`
- If neither provided, ask the user.

## Paths

- **Main repo**: find the local signoz repo. Default: `../signoz` relative to the signoz.io repo root. If not found, ask.
- **Docs repo**: current working directory (signoz.io).

---

## Phase 1 — Gather PR Context

### 1a. Get PR metadata

```bash
gh pr view <PR> --repo SigNoz/signoz --json title,body,labels,mergedAt,mergeCommit,files
```

Record:
- **Title** and **body** (for intent)
- **Labels** (look for `feature`, `bug`, `breaking-change`, `docs-needed`)
- **Merge commit SHA**

### 1b. Get changed files

```bash
# from the local signoz repo
cd <signoz-repo>
git fetch origin main
git show <merge-sha> --stat
```

Categorise every changed file:

| Category | Glob pattern |
|---|---|
| Frontend pages | `frontend/src/pages/**` |
| Frontend containers | `frontend/src/container/**` |
| Frontend components | `frontend/src/components/**` |
| Routes/nav | `frontend/src/AppRoutes/**`, `frontend/src/constants/routes.ts` |
| API layer | `frontend/src/api/**`, `frontend/src/hooks/**` |
| Backend handlers | `pkg/query-service/**`, `ee/query-service/**` |
| Config/deploy | `deploy/**`, `docker/**`, `*.yaml` |
| Styles only | `*.scss`, `*.styles.*` |
| Tests only | `*.test.*`, `*.spec.*` |
| Docs/chore | `*.md`, `.github/**`, `Makefile` |

### 1c. Quick exit check

If ALL changed files fall into **Styles only**, **Tests only**, or **Docs/chore** → output:

```
VERDICT: NO — no docs impact
Reason: Changes are cosmetic/test/chore only, no user-facing behavior change.
```

Stop here.

---

## Phase 2 — Is the Change Reachable by Users?

This is the most critical phase. Code existing in the repo does NOT mean users can see it.

### 2a. Check routing

If the PR adds or modifies page-level components (`frontend/src/pages/**`):

```bash
# What does the route actually load?
grep -n "<ComponentName>" frontend/src/AppRoutes/pageComponents.ts
grep -n "<ROUTE_CONSTANT>" frontend/src/AppRoutes/routes.ts
```

Trace the full chain:
1. `constants/routes.ts` — does the URL path exist?
2. `AppRoutes/pageComponents.ts` — does it import the NEW component?
3. `AppRoutes/routes.ts` — is the route wired to the new component?

If the new component is NOT imported in `pageComponents.ts` or NOT assigned to a route → **the code is unreachable**.

Output:
```
GATE FAILED: Not routed
The component exists at <path> but is not imported in pageComponents.ts.
Users cannot reach this code.
```

### 2b. Check feature flags

```bash
grep -rn "featureFlag\|FeatureKeys\|feature_flag\|isFeatureEnabled" <changed-files>
grep -rn "behind.*feature\|gated\|disabled.*default" <merge-commit-message>
```

If the code is wrapped in a feature flag check → **users won't see it until the flag is enabled**.

Output:
```
GATE FAILED: Behind feature flag
Feature flag: <flag-name>
Users will not see this until the flag is enabled by default.
```

### 2c. Check preference/localStorage gates

```bash
grep -rn "localStorage\|LOCALSTORAGE\|preferOld\|prefer_old\|prefer_new" <changed-files>
```

If there's a preference toggle that defaults to the OLD view → **users see old UI by default**.

### 2d. Check conditional rendering

```bash
# Look for gates that hide the new UI
grep -rn "isEnabled\|showNew\|useNew\|enableV" <changed-files>
```

If all gates pass → the change IS reachable. Proceed.

---

## Phase 3 — Classify the Impact

### 3a. New user-facing feature

**Signals:**
- PR title starts with `feat:`
- New files in `frontend/src/pages/` or `frontend/src/container/`
- New route added to `constants/routes.ts`
- New sidebar entry in the frontend

**Docs action needed:** New docs page or new section in existing page.

### 3b. Changed existing UI

**Signals:**
- Modified files in `frontend/src/container/` or `frontend/src/pages/` that are already documented
- New props, new tabs, new buttons, new panels in existing components

**Check what's documented:**
```bash
# In the docs repo, search for terms related to the changed component
grep -rn "<feature-keyword>" data/docs/
```

**Docs action needed:** Update existing section. Possibly new screenshots.

### 3c. Changed API endpoint

**Signals:**
- Modified files in `pkg/query-service/` or `ee/query-service/`
- New or changed HTTP handlers, request/response types
- OpenAPI spec changes

**Docs action needed:** Update API reference docs.

### 3d. Config or deployment change

**Signals:**
- Modified `deploy/`, `docker/`, Helm charts, config YAML files
- New environment variables

**Docs action needed:** Update installation or configuration docs.

### 3e. Change exists but is NOT yet user-visible

**Signals:**
- Failed gate in Phase 2 (not routed, behind flag, preference gate)

**Docs action needed:** NONE yet. But flag it for future tracking.

---

## Phase 4 — Verify Against Actual UI

Before writing any docs, ALWAYS do this:

### 4a. Trace the render path

Starting from the route, follow the component tree:
1. `routes.ts` → which component?
2. `pageComponents.ts` → which file is lazy-loaded?
3. Read that file's default export → what does it render?
4. Read each child component's JSX `return` → what does the user actually see?

### 4b. Read the actual JSX

For every feature you plan to document, find the component that renders it and read the `return (...)` block. Only document what appears in the JSX.

### 4c. Cross-reference with existing docs

```bash
grep -rn "<keyword>" data/docs/userguide/
ls public/img/docs/apm-and-distributed-tracing/
```

Check if screenshots exist and if they match the current UI.

---

## Phase 5 — Output

### Format

Output a structured report:

```
## PR: <title> (#<number>)

### Verdict: YES / NO / NOT YET

### Reason
<1-2 sentences explaining the verdict>

### Routing Check
- Route: <URL path> → <component> ✅/❌
- Feature flag: <none / flag-name> ✅/❌
- Preference gate: <none / gate-name> ✅/❌

### Impact Classification
- Type: <new feature / changed UI / API change / config change / not visible yet>
- Area: <trace details / logs explorer / dashboards / alerts / etc.>

### Files to Update in Docs
| Docs file | What to change |
|---|---|
| data/docs/userguide/<file>.mdx | <description> |

### Screenshots Needed
- [ ] <description of screenshot needed>

### Component Reference (for verification)
| What to document | Verify in this file |
|---|---|
| <feature> | <frontend/src/path/Component.tsx> |
```

---

## Key Component Map

Use this to quickly find which component renders what:

| Product area | Route | Entry component | Key child components |
|---|---|---|---|
| Trace Details | `/trace/:id` | `pages/TraceDetailV2/` | `container/PaginatedTraceFlamegraph/`, `container/TraceWaterfall/`, `container/SpanDetailsDrawer/` |
| Logs Explorer | `/logs/logs-explorer` | `pages/LogsExplorer/` | `container/LogsExplorerList/`, `container/LogDetailedView/` |
| Dashboards | `/dashboard/:id` | `pages/DashboardPage/` | `container/GridCardLayout/`, `container/NewWidget/` |
| Dashboard List | `/dashboard` | `pages/DashboardsListPage/` | `container/ListOfDashboard/` |
| Alerts | `/alerts` | `pages/AlertList/` | `container/ListAlertRules/` |
| Create Alert | `/alerts/new` | `pages/AlertsNew/` | `container/CreateAlertRule/` |
| Services/APM | `/services` | `pages/Services/` | `container/ServiceApplication/` |
| Onboarding | `/onboarding` | `container/OnboardingContainer/` | `modules/onboarding/` |
| Settings | `/settings` | `pages/Settings/` | various sub-containers |
| Infra Monitoring | `/infrastructure-monitoring/*` | `pages/InfrastructureMonitoring/` | sub-pages per entity type |
| Traces Explorer | `/traces-explorer` | `pages/TracesExplorer/` | `container/TracesExplorer/` |
| Metrics Explorer | `/metrics-explorer/*` | `pages/MetricsExplorer/` | sub-pages |
| API Monitoring | `/api-monitoring/*` | `pages/ApiMonitoring/` | sub-pages |

---

## Important Constraints

- NEVER document features that failed Phase 2 gates (not routed, behind flag)
- NEVER assume code in the repo means users can see it
- ALWAYS trace the render path from route → component → JSX before documenting
- ALWAYS check existing docs before writing — the feature may already be documented
- When in doubt, output "NOT YET" with an explanation rather than guessing
