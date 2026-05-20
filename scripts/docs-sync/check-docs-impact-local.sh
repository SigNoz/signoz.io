#!/usr/bin/env bash
###############################################################################
# check-docs-impact-local.sh
#
# Local dry-run checker for docs impact from a SigNoz/signoz PR.
#
# This is intentionally safe by default:
# - does not create issues unless --create-issue is passed
# - does not create branches
# - does not commit
# - does not push
#
# Usage:
#   ./scripts/docs-sync/check-docs-impact-local.sh --pr 11212
#   ./scripts/docs-sync/check-docs-impact-local.sh --pr 11212 --json
#   ./scripts/docs-sync/check-docs-impact-local.sh --pr 11212 --create-issue
#   ./scripts/docs-sync/check-docs-impact-local.sh --recent 20
#   ./scripts/docs-sync/check-docs-impact-local.sh --watch --recent 20 --interval 300
#
# Requirements:
#   - gh CLI authenticated with read access to SigNoz/signoz
#   - jq
#   - rg
###############################################################################

set -euo pipefail

PRODUCT_REPO="${PRODUCT_REPO:-SigNoz/signoz}"
DOCS_REPO="${DOCS_REPO:-SigNoz/signoz.io}"
OUT_DIR="${OUT_DIR:-/tmp/signoz-docs-impact}"
CREATE_ISSUE=false
PRINT_JSON=false
WATCH=false
INTERVAL=300
PR_NUMBER=""
RECENT_COUNT=""

mkdir -p "$OUT_DIR"

usage() {
  cat <<'EOF'
Usage:
  check-docs-impact-local.sh --pr <number> [--json] [--create-issue]
  check-docs-impact-local.sh --recent <count> [--json]
  check-docs-impact-local.sh --watch --recent <count> [--interval <seconds>]

Environment:
  PRODUCT_REPO=SigNoz/signoz
  DOCS_REPO=SigNoz/signoz.io
  OUT_DIR=/tmp/signoz-docs-impact

Notes:
  Default mode is dry-run. It only writes local reports under OUT_DIR.
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --pr)
      PR_NUMBER="${2:-}"
      shift 2
      ;;
    --recent)
      RECENT_COUNT="${2:-}"
      shift 2
      ;;
    --create-issue)
      CREATE_ISSUE=true
      shift
      ;;
    --json)
      PRINT_JSON=true
      shift
      ;;
    --watch)
      WATCH=true
      shift
      ;;
    --interval)
      INTERVAL="${2:-300}"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown argument: $1" >&2
      usage
      exit 1
      ;;
  esac
done

need_cmd() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

need_cmd gh
need_cmd jq
need_cmd rg

json_array_contains_name() {
  local json_file="$1"
  local label="$2"
  jq -e --arg label "$label" '[.labels[].name] | index($label)' "$json_file" >/dev/null
}

file_paths_query() {
  jq -r '.files[].path'
}

has_any_file_match() {
  local json_file="$1"
  local pattern="$2"
  file_paths_query < "$json_file" | rg -q "$pattern"
}

count_file_match() {
  local json_file="$1"
  local pattern="$2"
  file_paths_query < "$json_file" | rg "$pattern" | wc -l | tr -d ' '
}

keyword_terms_from_title() {
  local title="$1"
  printf '%s\n' "$title" \
    | sed -E 's/^(feat|fix|chore|refactor|test|ci|docs)(\([^)]+\))?:[[:space:]]*//I' \
    | tr '[:upper:]' '[:lower:]' \
    | tr -cs 'a-z0-9' '\n' \
    | awk 'length($0) >= 4' \
    | rg -v '^(signoz|with|from|into|page|using|update|added|changes)$' \
    | head -8
}

search_docs_for_terms() {
  local title="$1"
  local out_file="$2"
  : > "$out_file"

  while IFS= read -r term; do
    [[ -z "$term" ]] && continue
    rg -n --glob '*.mdx' --glob '*.md' "$term" data/docs constants/docsSideNav.ts 2>/dev/null \
      | head -10 \
      >> "$out_file" || true
  done < <(keyword_terms_from_title "$title")
}

guess_product_areas() {
  local json_file="$1"
  local title="$2"
  local areas=()
  local text
  text="$(printf '%s\n%s\n' "$title" "$(file_paths_query < "$json_file")" | tr '[:upper:]' '[:lower:]')"

  [[ "$text" == *trace* ]] && areas+=("traces")
  [[ "$text" == *log* ]] && areas+=("logs")
  [[ "$text" == *dashboard* ]] && areas+=("dashboards")
  [[ "$text" == *alert* ]] && areas+=("alerts")
  [[ "$text" == *infra* || "$text" == *k8s* || "$text" == *kubernetes* ]] && areas+=("infrastructure-monitoring")
  [[ "$text" == *serviceaccount* || "$text" == *service-account* || "$text" == *authz* || "$text" == *member* || "$text" == *role* ]] && areas+=("iam-settings")
  [[ "$text" == *query* ]] && areas+=("query-builder")
  [[ "$text" == *onboarding* ]] && areas+=("onboarding")
  [[ "$text" == *api* || "$text" == *openapi* ]] && areas+=("api")

  if [[ ${#areas[@]} -eq 0 ]]; then
    areas+=("unknown")
  fi

  printf '%s\n' "${areas[@]}" | sort -u
}

docs_path_hints_for_area() {
  case "$1" in
    traces) echo "data/docs/userguide/span-details.mdx data/docs/userguide/traces.mdx data/docs/traces-management" ;;
    logs) echo "data/docs/product-features/logs-explorer.mdx data/docs/userguide/logs_query_builder.mdx data/docs/logs-management" ;;
    dashboards) echo "data/docs/userguide/manage-dashboards.mdx data/docs/dashboards" ;;
    alerts) echo "data/docs/alerts-management data/docs/userguide/alerts-management.mdx" ;;
    infrastructure-monitoring) echo "data/docs/infrastructure-monitoring" ;;
    iam-settings) echo "data/docs/manage/administrator-guide data/docs/product-features/invite-team-member.mdx" ;;
    query-builder) echo "data/docs/product-features/query-builder.mdx data/docs/userguide/query-builder-v5.mdx data/docs/userguide/create-a-custom-query.mdx" ;;
    onboarding) echo "data/docs/instrumentation data/docs/opentelemetry-collection-agents" ;;
    api) echo "data/docs/*api* data/docs/**/*api*" ;;
    *) echo "data/docs" ;;
  esac
}

analyze_pr() {
  local pr="$1"
  local pr_json="$OUT_DIR/pr-$pr.json"
  local docs_hits="$OUT_DIR/pr-$pr-docs-hits.txt"
  local report_md="$OUT_DIR/pr-$pr-report.md"
  local decision_json="$OUT_DIR/pr-$pr-decision.json"

  echo "Fetching $PRODUCT_REPO#$pr..." >&2
  gh pr view "$pr" \
    --repo "$PRODUCT_REPO" \
    --json number,title,body,labels,files,mergedAt,url,author,mergeCommit \
    > "$pr_json"

  local title url labels body
  title="$(jq -r '.title' "$pr_json")"
  url="$(jq -r '.url' "$pr_json")"
  labels="$(jq -r '[.labels[].name] | join(", ")' "$pr_json")"
  body="$(jq -r '.body // ""' "$pr_json")"

  local frontend_count route_count api_count config_count docs_count test_count style_count lock_count total_count
  local generated_api_count tooling_count feature_flag_file_count
  total_count="$(jq '.files | length' "$pr_json")"
  frontend_count="$(count_file_match "$pr_json" '^frontend/src/(pages|container|components|AppRoutes|constants/routes|hooks|store)/')"
  route_count="$(count_file_match "$pr_json" '^frontend/src/(AppRoutes|constants/routes\.ts)')"
  api_count="$(count_file_match "$pr_json" '^(pkg|ee|cmd|frontend/src/api|docs/api/openapi\.yml)/')"
  config_count="$(count_file_match "$pr_json" '^(deploy|docker|charts|helm)/|(^|/)(values|docker-compose|config).*\.(ya?ml|json)$|\.env')"
  docs_count="$(count_file_match "$pr_json" '^(data/docs|docs|frontend/README\.md|README\.md)')"
  test_count="$(count_file_match "$pr_json" '(\.test\.|\.spec\.|__tests__/|/tests?/)')"
  style_count="$(count_file_match "$pr_json" '(\.scss$|\.css$|\.styles\.|\.module\.scss$)')"
  lock_count="$(count_file_match "$pr_json" '(^|/)(yarn\.lock|pnpm-lock\.yaml|package-lock\.json)$')"
  generated_api_count="$(count_file_match "$pr_json" '^frontend/src/api/generated/|^frontend/src/api/.*/.*\.schemas\.ts$|^frontend/orval\.config\.ts$')"
  tooling_count="$(count_file_match "$pr_json" '(^|/)(package\.json|yarn\.lock|pnpm-lock\.yaml|package-lock\.json|orval\.config\.ts|tsconfig\.json|jest\.config|\.oxlintrc|Makefile)$|^frontend/plugins/|^frontend/scripts/|^\.github/|^tests?/')"
  feature_flag_file_count="$(count_file_match "$pr_json" 'feature|Feature|flag|Flag|registry|features\.ts|featureFlags')"

  local has_docs_required has_docs_not_required has_ui has_api has_config has_routes only_low_signal
  has_docs_required=false
  has_docs_not_required=false
  json_array_contains_name "$pr_json" "docs required" && has_docs_required=true
  json_array_contains_name "$pr_json" "docs not required" && has_docs_not_required=true
  [[ "$frontend_count" -gt 0 ]] && has_ui=true || has_ui=false
  [[ "$api_count" -gt 0 ]] && has_api=true || has_api=false
  [[ "$config_count" -gt 0 ]] && has_config=true || has_config=false
  [[ "$route_count" -gt 0 ]] && has_routes=true || has_routes=false

  local low_signal_count=$((test_count + style_count + lock_count))
  if [[ "$total_count" -gt 0 && "$low_signal_count" -ge "$total_count" ]]; then
    only_low_signal=true
  else
    only_low_signal=false
  fi

  local title_lc body_lc files_text_lc
  title_lc="$(printf '%s' "$title" | tr '[:upper:]' '[:lower:]')"
  body_lc="$(printf '%s' "$body" | tr '[:upper:]' '[:lower:]')"
  files_text_lc="$(file_paths_query < "$pr_json" | tr '[:upper:]' '[:lower:]')"

  local only_generated_or_tooling=false
  if [[ "$total_count" -gt 0 && $((generated_api_count + tooling_count + test_count + lock_count)) -ge "$total_count" ]]; then
    only_generated_or_tooling=true
  fi

  local feature_flag_plumbing_only=false
  if [[ "$feature_flag_file_count" -gt 0 ]] && [[ "$title_lc" == *"feature flag"* || "$title_lc" == *"feature gate"* || "$title_lc" == *"flag gate"* ]]; then
    if [[ "$route_count" -eq 0 && "$config_count" -eq 0 ]]; then
      feature_flag_plumbing_only=true
    fi
  fi

  local bugfix_likely_not_docs=false
  if [[ "$title_lc" =~ ^fix || "$labels" == *"bug"* ]]; then
    if printf '%s\n%s\n' "$title_lc" "$body_lc" | rg -qi 'broken|align|icon|modal|cache|disable|enable|unblock|generate:api|orval|returnspansfrom|typo|crash|loading|style'; then
      bugfix_likely_not_docs=true
    fi
  fi

  local cosmetic_or_visual_only=false
  if printf '%s\n' "$title_lc" | rg -qi 'align|icon|style|spacing|color|typography|rewrite page to use new table component|new table component'; then
    cosmetic_or_visual_only=true
  fi

  local onboarding_order_only=false
  if [[ "$title_lc" == *"onboarding"* ]] && printf '%s\n' "$title_lc" | rg -qi 'shuffle|order|ordering|sort'; then
    onboarding_order_only=true
  fi

  local strong_required_signal=false
  if [[ "$route_count" -gt 0 ]]; then
    strong_required_signal=true
  fi
  if printf '%s\n%s\n' "$title_lc" "$body_lc" | rg -qi 'new (page|route|tab|setting|workflow|api|endpoint|environment variable|env var|config|configuration)|breaking change|migration required|adds? (a )?(new )?(page|route|tab|setting|workflow|api|endpoint|environment variable|env var|config|configuration)|introduces? (a )?(new )?(page|route|tab|setting|workflow|api|endpoint|environment variable|env var|config|configuration)'; then
    strong_required_signal=true
  fi
  if has_any_file_match "$pr_json" '^docs/api/openapi\.yml$' && printf '%s\n%s\n' "$title_lc" "$body_lc" | rg -qi 'new .*api|endpoint|request|response|openapi|public api'; then
    strong_required_signal=true
  fi
  if [[ "$config_count" -gt 0 ]] && printf '%s\n%s\n' "$title_lc" "$body_lc" | rg -qi 'install|deploy|docker|helm|config|environment|env var|default|upgrade|migration'; then
    strong_required_signal=true
  fi

  search_docs_for_terms "$title" "$docs_hits"
  local docs_hit_count
  docs_hit_count="$(wc -l < "$docs_hits" | tr -d ' ')"

  local areas_json
  areas_json="$(guess_product_areas "$pr_json" "$title" | jq -R . | jq -s .)"

  local route_status="not_applicable"
  local feature_flag_status="unknown"
  local screenshot_required="no"
  local decision="not_required"
  local confidence="medium"
  local reason=""

  if [[ "$has_docs_required" == "true" ]]; then
    decision="required"
    confidence="high"
    reason="PR has docs required label."
  elif [[ "$has_docs_not_required" == "true" ]]; then
    decision="not_required"
    confidence="high"
    reason="PR has docs not required label."
  elif [[ "$only_low_signal" == "true" ]]; then
    decision="not_required"
    confidence="high"
    reason="Only tests, styles, or lockfiles changed."
  elif [[ "$only_generated_or_tooling" == "true" ]]; then
    decision="not_required"
    confidence="high"
    reason="Only generated API client, tooling, tests, or dependency files changed."
  elif [[ "$feature_flag_plumbing_only" == "true" ]]; then
    decision="not_required"
    confidence="high"
    reason="Feature flag/gate plumbing changed; docs should wait until the feature is enabled and user-facing."
    feature_flag_status="plumbing_or_gated"
  elif [[ "$onboarding_order_only" == "true" ]]; then
    decision="not_required"
    confidence="high"
    reason="Onboarding ordering changed; this is not useful docs content unless screenshots explicitly depend on that order."
    screenshot_required="no"
  elif [[ "$bugfix_likely_not_docs" == "true" ]]; then
    decision="not_required"
    confidence="high"
    reason="Bug fix appears to restore or polish existing behavior, not change documented behavior."
    if [[ "$cosmetic_or_visual_only" == "true" && "$has_ui" == "true" ]]; then
      screenshot_required="review_only"
    fi
  elif [[ "$cosmetic_or_visual_only" == "true" ]]; then
    decision="not_required"
    confidence="high"
    reason="Cosmetic or implementation-level UI change; no textual docs update inferred."
    screenshot_required="review_only"
  elif [[ "$strong_required_signal" == "true" && ("$has_ui" == "true" || "$has_api" == "true" || "$has_config" == "true") ]]; then
    decision="required"
    confidence="medium"
    reason="PR has a strong user-facing docs signal plus user-surface file changes."
    if [[ "$has_ui" == "true" ]]; then
      screenshot_required="unknown"
    fi
    if [[ "$has_routes" == "true" ]]; then
      route_status="changed_or_possible"
    fi
  elif [[ "$has_ui" == "true" ]]; then
    decision="needs_human_context"
    confidence="low"
    reason="UI files changed, but no strong docs signal was found. Verify only if this screen is already documented or screenshots are known to be stale."
    screenshot_required="unknown"
    if [[ "$has_routes" == "true" ]]; then
      route_status="changed_or_possible"
    else
      route_status="unknown"
    fi
  elif [[ "$has_api" == "true" || "$has_config" == "true" ]]; then
    decision="not_required"
    confidence="medium"
    reason="Backend/API/config files changed, but no public docs signal was found."
  elif [[ "$docs_count" -gt 0 ]]; then
    decision="not_required"
    confidence="medium"
    reason="Docs or internal docs files changed in product repo; no signoz.io docs action inferred."
  else
    decision="not_required"
    confidence="low"
    reason="No strong docs-impact signal detected."
  fi

  if [[ "$decision" != "not_required" ]] && printf '%s\n' "$body" | rg -qi 'screenshot|screen recording|UI|user-facing|changelog|documented behavior'; then
    if [[ "$has_ui" == "true" && "$screenshot_required" == "no" ]]; then
      screenshot_required="unknown"
    fi
  fi

  jq -n \
    --arg product_repo "$PRODUCT_REPO" \
    --arg docs_repo "$DOCS_REPO" \
    --argjson pr_number "$pr" \
    --arg title "$title" \
    --arg url "$url" \
    --arg labels "$labels" \
    --arg decision "$decision" \
    --arg confidence "$confidence" \
    --arg reason "$reason" \
    --arg route_status "$route_status" \
    --arg feature_flag_status "$feature_flag_status" \
    --arg screenshot_required "$screenshot_required" \
    --argjson total_files "$total_count" \
    --argjson frontend_files "$frontend_count" \
    --argjson route_files "$route_count" \
    --argjson api_files "$api_count" \
    --argjson config_files "$config_count" \
    --argjson docs_files "$docs_count" \
    --argjson docs_hit_count "$docs_hit_count" \
    --argjson areas "$areas_json" \
    '{
      source_pr: {
        repo: $product_repo,
        number: $pr_number,
        title: $title,
        url: $url,
        labels: $labels
      },
      docs_decision: $decision,
      confidence: $confidence,
      reason: $reason,
      evidence: {
        product_areas: $areas,
        changed_files: {
          total: $total_files,
          frontend_ui: $frontend_files,
          routes: $route_files,
          api_or_backend: $api_files,
          config_or_deploy: $config_files,
          docs_or_readme: $docs_files
        },
        reachability: {
          route_status: $route_status,
          feature_flag_status: $feature_flag_status
        },
        existing_docs_hits: $docs_hit_count
      },
      screenshot_required: $screenshot_required
    }' > "$decision_json"

  {
    echo "# Docs Impact Report: $PRODUCT_REPO#$pr"
    echo
    echo "- PR: [$title]($url)"
    echo "- Labels: \`${labels:-none}\`"
    echo "- Decision: \`$decision\`"
    echo "- Confidence: \`$confidence\`"
    echo "- Reason: $reason"
    echo "- Screenshot required: \`$screenshot_required\`"
    echo
    echo "## Evidence"
    echo
    echo "- Total changed files: $total_count"
    echo "- Frontend UI files: $frontend_count"
    echo "- Route files: $route_count"
    echo "- API/backend/generated files: $api_count"
    echo "- Config/deploy files: $config_count"
    echo "- Product docs/readme files: $docs_count"
    echo "- Existing docs search hits: $docs_hit_count"
    echo
    echo "## Product Areas"
    echo
    guess_product_areas "$pr_json" "$title" | sed 's/^/- /'
    echo
    echo "## Changed Files"
    echo
    file_paths_query < "$pr_json" | sed 's/^/- `/' | sed 's/$/`/'
    echo
    echo "## Existing Docs Hits"
    echo
    if [[ "$docs_hit_count" -gt 0 ]]; then
      sed 's/^/- /' "$docs_hits"
    else
      echo "- None found from title keywords."
    fi
    echo
    echo "## Next Step"
    echo
    case "$decision" in
      required)
        echo "Create a docs-impact issue with the PR context and suggested target docs."
        ;;
      needs_human_context)
        echo "Create a product-context issue or manually verify route/render path, feature flags, screenshots, and existing docs gap before writing docs."
        ;;
      *)
        echo "No docs issue needed unless a reviewer has product-specific context not visible from the PR metadata."
        ;;
    esac
  } > "$report_md"

  if [[ "$PRINT_JSON" == "true" ]]; then
    cat "$decision_json"
  else
    cat "$report_md"
    echo
    echo "Saved:"
    echo "- $decision_json"
    echo "- $report_md"
  fi

  if [[ "$CREATE_ISSUE" == "true" ]]; then
    if [[ "$decision" == "not_required" ]]; then
      echo "Not creating issue because decision is not_required." >&2
      return 0
    fi

    local issue_body="$OUT_DIR/pr-$pr-docs-issue.md"
    {
      echo "## Source PR"
      echo
      echo "- Product PR: $url"
      echo "- Title: $title"
      echo "- Labels: \`${labels:-none}\`"
      echo
      echo "## Docs Decision"
      echo
      echo "- docs_required: \`$([[ "$decision" == "required" ]] && echo true || echo needs_human_context)\`"
      echo "- classifier_confidence: \`$confidence\`"
      echo "- reason: $reason"
      echo
      echo "## Local Decision JSON"
      echo
      echo '```json'
      cat "$decision_json"
      echo '```'
      echo
      echo "## Existing Docs Search Hits"
      echo
      if [[ "$docs_hit_count" -gt 0 ]]; then
        sed 's/^/- /' "$docs_hits"
      else
        echo "- None found from title keywords."
      fi
      echo
      echo "## Required Human Checks"
      echo
      echo "- [ ] Verify route/render path"
      echo "- [ ] Verify feature flag or preference gate"
      echo "- [ ] Verify exact existing docs gap"
      echo "- [ ] Decide screenshot requirement"
    } > "$issue_body"

    gh issue create \
      --repo "$DOCS_REPO" \
      --title "docs-impact: $PRODUCT_REPO#$pr - $title" \
      --body-file "$issue_body" \
      --label "docs-impact,needs-docs-triage"
  fi
}

run_recent() {
  local count="$1"
  local list_file="$OUT_DIR/recent-$count.json"

  gh pr list --repo "$PRODUCT_REPO" --state merged --limit "$count" --json number,title,mergedAt,url > "$list_file"
  jq -r '.[].number' "$list_file" | while read -r pr; do
    echo
    echo "================================================================================"
    analyze_pr "$pr" || true
  done
}

run_once() {
  if [[ -n "$PR_NUMBER" ]]; then
    analyze_pr "$PR_NUMBER"
  elif [[ -n "$RECENT_COUNT" ]]; then
    run_recent "$RECENT_COUNT"
  else
    usage
    exit 1
  fi
}

if [[ "$WATCH" == "true" ]]; then
  if [[ -z "$RECENT_COUNT" ]]; then
    echo "--watch requires --recent <count>" >&2
    exit 1
  fi

  while true; do
    date
    run_recent "$RECENT_COUNT"
    echo "Sleeping for $INTERVAL seconds..."
    sleep "$INTERVAL"
  done
else
  run_once
fi
