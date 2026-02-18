---
name: signoz-website-frontend-pr-review
description: Review SigNoz frontend pull requests using this skill's rubric and project-specific standards from CONTRIBUTING.md. Use when asked to review JS/TS/React/Next.js changes for duplication, architecture, App Router best practices, performance, maintainability, and accessibility.
---

# SigNoz Frontend PR Review

Review frontend pull requests with a strict, actionable, high-impact-first approach.

## Scope

Apply this skill when changed files include frontend code such as:

- `**/*.js`, `**/*.jsx`, `**/*.ts`, `**/*.tsx`
- `app/**`, `components/**`, `layouts/**`, `hooks/**`, `utils/**`, `constants/**`
- related config files when they affect frontend behavior

If a PR includes docs too, use this skill for code review only.

## Source of Truth

- Use this skill file as the frontend review rubric.
- Apply project-specific constraints from `CONTRIBUTING.md` for code standards.

## Review Process

1. Get PR context and changed files.
2. Scan for high-impact issues first (duplication, architecture, performance).
3. Evaluate against the categories below.
4. Leave inline comments for specific issues only.
5. Post exactly one concise summary grouped by severity.

## Review Categories

### 1) DRY and duplication

- Find duplicated logic and repeated patterns.
- Check copy-paste blocks across files.
- Flag code that should be extracted into shared utilities/hooks/components.
- Verify no duplication of existing helpers in `utils/`, `hooks/`, `app/lib/utils.ts`.
- Verify no duplication of reusable UI in `shared/components/` or `components/ui/`.

### 2) Component design and architecture

- Check decomposition and single responsibility.
- Flag prop drilling where composition/context is more suitable.
- Validate correct server vs client component boundaries.
- Check component placement by purpose:
  - shared/reusable -> `shared/components/` or `components/ui/`
  - page-specific -> route-local or co-located
  - feature-specific -> feature folders
- For shared components, verify pattern: `ComponentName.types.ts`, `ComponentName.view.tsx`, `index.tsx` where applicable.

### 3) Next.js 14 App Router practices

- Validate App Router patterns (not Pages Router patterns).
- Check data-fetching boundaries (server components, server actions, route handlers).
- Verify usage of:
  - `next/image`
  - metadata API (`metadata` / `generateMetadata`)
  - `next/dynamic` when needed
  - `next/link` for navigation
  - `next/navigation` hooks (not `next/router`)
- Check presence/usage of route-level loading/error handling where relevant (`loading.tsx`, `error.tsx`, suspense boundaries).

### 4) React 18 practices

- Hooks correctness (`useEffect` deps, cleanup, memoization where needed).
- List key correctness.
- Avoid unnecessary re-renders.
- State management quality and anti-patterns (no direct mutation).

### 5) TypeScript quality

- Minimize/justify `any`.
- Validate type safety and interfaces.
- Check missing return types where clarity matters.
- Check type imports/exports and generic usage.
- Flag avoidable unsafe assertions.

### 6) Performance

- Spot expensive render-path work and memoization gaps.
- Flag likely N+1 fetch patterns.
- Check code-splitting/lazy loading opportunities.
- Verify unoptimized image/asset handling.
- Prefer server components to reduce client bundle when possible.

### 7) Maintainability

- Flag overly complex functions/components.
- Check naming quality.
- Replace magic numbers/strings with constants where appropriate.
- Check logging/error messages quality.
- Flag stale TODO/FIXME items when they introduce risk.

### 8) Folder structure and organization

- Validate placement under `app/`, `components/`, `shared/components/`, `layouts/`, `hooks/`, `utils/`, `constants/`.
- Ensure separation of concerns and consistent naming.
- Flag misplaced/orphaned files.
- Check proper path alias usage.

### 9) Styling and CSS

- Check Tailwind consistency and duplication.
- Flag avoidable inline styles.
- Check responsive utilities and token consistency where applicable.

### 10) Dependencies and imports

- Remove unused imports.
- Check import order/organization.
- Flag circular dependencies.
- Avoid duplicate functionality from existing deps.
- Ensure new deps are justified (per `CONTRIBUTING.md`).

### 11) Project-specific rules (`CONTRIBUTING.md`)

- Prefer existing icon libs (`lucide-react`, `react-icons`).
- Prefer existing UI primitives in `components/ui`.
- Keep types/constants co-located and exported appropriately.
- Avoid concurrent async invocations in handlers (loading/ref guards).
- Be deliberate with DOM cleanup/transforms.
- Justify dependency additions.

### 12) Error handling and edge cases

- Verify async error handling (`try/catch` where needed).
- Check null/undefined handling.
- Validate loading/error state handling.
- Look for race conditions.

### 13) Accessibility (A11Y)

- Validate ARIA labels and semantic HTML.
- Check keyboard navigation/focus behavior.
- Check contrast and screen-reader compatibility basics.

## Commenting Rules

- Comment only on actual issues; no praise-only comments.
- Prioritize high-impact issues first.
- Be specific: file path, line context, function/component names.
- Suggest concrete fixes (include concise code suggestions when helpful).
- Group related issues when appropriate.
- If no issues in a category, do not mention that category.

## Output Format

### Inline findings

For each finding include:

- short title
- impact
- exact suggested fix
- file reference
- severity (`Critical`, `High`, `Medium`, `Low`)

### One summary comment

Post exactly one concise summary that:

1. Separates Documentation findings from Code findings (if docs were also reviewed)
2. Groups code findings by severity (`Critical`, `High`, `Medium`, `Low`)
3. Highlights highest-priority fixes
4. References inline comments
5. Stays concise and actionable

## Suggested Commands

```bash
# PR context
gh pr view <PR_NUMBER>
gh pr diff <PR_NUMBER>

# find similar code
find components shared -name "*.tsx" -type f
rg -n "<pattern>" utils hooks app/lib components shared

# inspect imports and usage
rg -n "^import " app components hooks utils shared
```

## Guardrails

- Prefer existing patterns over introducing new abstractions by default.
- Avoid speculative refactors outside PR scope unless there is clear risk reduction.
- Keep feedback decision-oriented and implementable without ambiguity.
