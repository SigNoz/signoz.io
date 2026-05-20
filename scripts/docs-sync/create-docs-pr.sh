#!/bin/bash
###############################################################################
# create-docs-pr.sh — Run from the signoz.io repo root
#
# Usage:
#   ./scripts/docs-sync/create-docs-pr.sh <issue-number>
#   ./scripts/docs-sync/create-docs-pr.sh 456
#   ./scripts/docs-sync/create-docs-pr.sh --poll       # check all open docs-sync issues
#
# What it does:
#   1. Reads a docs-sync issue from signoz.io
#   2. Parses the machine-readable JSON payload
#   3. Searches existing docs for affected pages
#   4. Creates a branch and draft PR with a checklist
#
# Requirements:
#   - gh CLI authenticated
#   - Run from signoz.io repo root (needs access to data/docs/)
#   - jq installed
###############################################################################

set -euo pipefail

DOCS_REPO="SigNoz/signoz.io"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log()  { echo -e "${BLUE}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
ok()   { echo -e "${GREEN}[OK]${NC} $1"; }
err()  { echo -e "${RED}[ERR]${NC} $1"; }

# -------------------------------------------------------------------
# Docs path mapping: product area → likely docs file(s)
# -------------------------------------------------------------------
get_docs_path() {
  case "$1" in
    trace-details)      echo "data/docs/userguide/span-details.mdx" ;;
    logs-explorer)      echo "data/docs/product-features/logs-explorer.mdx" ;;
    dashboards)         echo "data/docs/userguide/manage-dashboards.mdx" ;;
    alerts)             echo "data/docs/alerts-management" ;;
    onboarding)         echo "data/docs/instrumentation" ;;
    infra-monitoring)   echo "data/docs/infrastructure-monitoring" ;;
    settings)           echo "data/docs/userguide" ;;
    traces-explorer)    echo "data/docs/userguide/traces.mdx" ;;
    api-monitoring)     echo "data/docs/product-features/api-monitoring" ;;
    metrics-explorer)   echo "data/docs/product-features/metrics-explorer" ;;
    *)                  echo "" ;;
  esac
}

# -------------------------------------------------------------------
# Poll mode: process all open docs-sync issues without PRs
# -------------------------------------------------------------------
poll_open_issues() {
  log "Checking open docs-sync issues..."

  local issues
  issues=$(gh issue list --repo "$DOCS_REPO" --label "docs-sync" --state open \
    --json number,title,labels \
    --jq '.[] | select(.labels | map(.name) | (contains(["pr-created"]) or contains(["blocked-not-routed"]) or contains(["blocked-feature-flag"])) | not) | .number')

  if [ -z "$issues" ]; then
    ok "No open docs-sync issues need PRs."
    return
  fi

  for issue_num in $issues; do
    log "Issue #${issue_num}: processing..."
    process_single_issue "$issue_num"
    echo ""
  done
}

# -------------------------------------------------------------------
# Process a single issue
# -------------------------------------------------------------------
process_single_issue() {
  local ISSUE_NUM="$1"

  # -----------------------------------------------------------------
  # 1. Fetch issue
  # -----------------------------------------------------------------
  log "Fetching issue #${ISSUE_NUM}..."
  local issue_json
  issue_json=$(gh issue view "$ISSUE_NUM" --repo "$DOCS_REPO" --json title,body,labels)

  local issue_title issue_body
  issue_title=$(echo "$issue_json" | jq -r '.title')
  issue_body=$(echo "$issue_json" | jq -r '.body')

  # -----------------------------------------------------------------
  # 2. Extract JSON payload
  # -----------------------------------------------------------------
  log "Parsing payload..."
  local payload
  payload=$(echo "$issue_body" | sed -n '/```json/,/```/p' | sed '1d;$d')

  if [ -z "$payload" ]; then
    err "No JSON payload found in issue #${ISSUE_NUM}."
    return
  fi

  # Extract fields
  local pr_number pr_title pr_url pr_author
  pr_number=$(echo "$payload" | jq -r '.source_pr.number')
  pr_title=$(echo "$payload" | jq -r '.source_pr.title')
  pr_url=$(echo "$payload" | jq -r '.source_pr.url')
  pr_author=$(echo "$payload" | jq -r '.source_pr.author')

  local impact_type has_ui_changes route_status flag_gated
  impact_type=$(echo "$payload" | jq -r '.analysis.impact_type')
  has_ui_changes=$(echo "$payload" | jq -r '.analysis.has_ui_changes')
  route_status=$(echo "$payload" | jq -r '.analysis.route_check.routed')
  flag_gated=$(echo "$payload" | jq -r '.analysis.feature_flag_check.gated')

  local impact_areas
  impact_areas=$(echo "$payload" | jq -r '.analysis.impact_areas[]' 2>/dev/null || true)

  # -----------------------------------------------------------------
  # 3. Gate checks
  # -----------------------------------------------------------------
  if [ "$route_status" = "NO" ]; then
    warn "PR #${pr_number}: NOT ROUTED — skipping."
    gh issue comment "$ISSUE_NUM" --repo "$DOCS_REPO" \
      --body "🚫 Skipping — code is not routed to users yet. Will re-check when enabled."
    gh issue edit "$ISSUE_NUM" --repo "$DOCS_REPO" --add-label "blocked-not-routed"
    return
  fi

  if [ "$flag_gated" = "true" ]; then
    warn "PR #${pr_number}: BEHIND FEATURE FLAG — skipping."
    gh issue comment "$ISSUE_NUM" --repo "$DOCS_REPO" \
      --body "🚫 Skipping — feature is behind a flag. Will re-check when enabled by default."
    gh issue edit "$ISSUE_NUM" --repo "$DOCS_REPO" --add-label "blocked-feature-flag"
    return
  fi

  # -----------------------------------------------------------------
  # 4. Search existing docs
  # -----------------------------------------------------------------
  log "Searching existing docs..."

  local affected_docs=""

  # Search by product area mapping
  for area in $impact_areas; do
    local docs_path
    docs_path=$(get_docs_path "$area")
    if [ -n "$docs_path" ] && [ -e "$docs_path" ]; then
      if [ -d "$docs_path" ]; then
        local found
        found=$(find "$docs_path" -name "*.mdx" 2>/dev/null | head -10)
        affected_docs="$affected_docs $found"
      else
        affected_docs="$affected_docs $docs_path"
      fi
    fi
  done

  # Search by keywords from PR title
  local search_terms
  search_terms=$(echo "$pr_title" | sed 's/^feat[\s(/:]*//' | sed 's/#[0-9]*//g' | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9' '\n' | awk 'length > 3' | head -5)

  for term in $search_terms; do
    local grep_results
    grep_results=$(grep -rl "$term" data/docs/ --include="*.mdx" 2>/dev/null | head -5 || true)
    if [ -n "$grep_results" ]; then
      affected_docs="$affected_docs $grep_results"
    fi
  done

  # Deduplicate
  affected_docs=$(echo "$affected_docs" | tr ' ' '\n' | sort -u | grep -v '^$' | head -15)

  # -----------------------------------------------------------------
  # 5. Print summary
  # -----------------------------------------------------------------
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo -e "  Issue: ${BLUE}#${ISSUE_NUM}${NC} — PR #${pr_number}: ${pr_title}"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo -e "  Impact: ${impact_type} | Areas: ${impact_areas:-unknown}"
  echo -e "  UI changes: ${has_ui_changes}"
  echo ""
  if [ -n "$affected_docs" ]; then
    echo "  Docs files that may need updates:"
    echo "$affected_docs" | while read -r f; do
      echo "    - $f"
    done
  else
    echo "  No existing docs found — may need a new page."
  fi
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo ""

  read -p "Create draft PR? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    log "Skipped."
    return
  fi

  # -----------------------------------------------------------------
  # 6. Create branch
  # -----------------------------------------------------------------
  local branch_name="docs-sync/pr-${pr_number}"

  git fetch origin main --quiet
  git checkout -b "$branch_name" origin/main 2>/dev/null || git checkout "$branch_name"

  # -----------------------------------------------------------------
  # 7. Create checklist file
  # -----------------------------------------------------------------
  local checklist_path=".docs-sync/pr-${pr_number}-checklist.md"
  mkdir -p .docs-sync

  cat > "$checklist_path" <<CHECKLISTEOF
# Docs Update Checklist

Source: [${pr_title}](${pr_url}) (#${pr_number})

## Impact
- **Type:** ${impact_type}
- **Areas:** $(echo "$impact_areas" | tr '\n' ', ' | sed 's/,$//')
- **UI Changes:** ${has_ui_changes}

## Docs Files to Review
$(if [ -n "$affected_docs" ]; then
  echo "$affected_docs" | while read -r f; do echo "- [ ] \`$f\`"; done
else
  echo "- [ ] _No existing docs found — new page may be needed_"
fi)

## Screenshots
$(if [ "$has_ui_changes" = "true" ]; then
  for area in $impact_areas; do
    case "$area" in
      trace-details)      echo "- [ ] **trace-details**: navigate to \`/trace/<any-trace-id>\`" ;;
      logs-explorer)      echo "- [ ] **logs-explorer**: navigate to \`/logs/logs-explorer\`" ;;
      dashboards)         echo "- [ ] **dashboards**: navigate to \`/dashboard\`" ;;
      alerts)             echo "- [ ] **alerts**: navigate to \`/alerts\`" ;;
      *)                  echo "- [ ] **${area}**: capture relevant UI" ;;
    esac
  done
else
  echo "- No screenshots needed"
fi)

## Source Files (reference)
$(echo "$payload" | jq -r '.files.frontend_pages[]? // empty' | head -10 | while read -r f; do echo "- \`$f\`"; done)
$(echo "$payload" | jq -r '.files.frontend_containers[]? // empty' | head -10 | while read -r f; do echo "- \`$f\`"; done)
CHECKLISTEOF

  git add "$checklist_path"
  git commit -m "docs-sync: add checklist for ${pr_title} (#${pr_number})"

  # -----------------------------------------------------------------
  # 8. Push and create PR
  # -----------------------------------------------------------------
  git push -u origin "$branch_name"

  local docs_list=""
  if [ -n "$affected_docs" ]; then
    docs_list=$(echo "$affected_docs" | while read -r f; do echo "- [ ] \`$f\`"; done)
  else
    docs_list="- [ ] _No matches — may need a new docs page_"
  fi

  local pr_url_new
  pr_url_new=$(gh pr create \
    --repo "$DOCS_REPO" \
    --title "[docs-sync] ${pr_title}" \
    --draft \
    --body "$(cat <<PRBODYEOF
## Docs Update for [${pr_title}](${pr_url})

> Auto-created from SigNoz/signoz#${pr_number} via issue #${ISSUE_NUM}

### What changed
- **Impact type:** \`${impact_type}\`
- **Product area:** $(echo "$impact_areas" | tr '\n' ', ' | sed 's/,$//')
- **UI changes:** ${has_ui_changes}

### Docs files likely affected
${docs_list}

### How to complete this PR
1. Review the checklist in \`.docs-sync/pr-${pr_number}-checklist.md\`
2. Update the affected docs files
3. Add screenshots if UI changed
4. Delete the checklist file
5. Mark as ready for review

Closes #${ISSUE_NUM}
PRBODYEOF
)" 2>&1)

  ok "Draft PR created: ${pr_url_new}"

  # Comment on the issue
  gh issue comment "$ISSUE_NUM" --repo "$DOCS_REPO" \
    --body "✅ Draft PR created: ${pr_url_new}"
  gh issue edit "$ISSUE_NUM" --repo "$DOCS_REPO" --add-label "pr-created"

  # Go back to main
  git checkout main --quiet
}

# -------------------------------------------------------------------
# Main
# -------------------------------------------------------------------
if [ "${1:-}" = "--poll" ]; then
  poll_open_issues
elif [ -n "${1:-}" ]; then
  process_single_issue "$1"
else
  echo "Usage:"
  echo "  $0 <issue-number>   Process a specific docs-sync issue"
  echo "  $0 --poll            Check all open docs-sync issues"
  exit 1
fi
