#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
export INIT_CWD="$ROOT"

INTERVAL_SEC="${VERCEL_BUILD_MEMORY_INTERVAL:-5}"

should_log_memory() {
  if [ "${VERCEL_BUILD_MEMORY_LOG:-}" = "0" ]; then
    return 1
  fi
  if [ "${VERCEL_BUILD_MEMORY_LOG:-}" = "1" ]; then
    return 0
  fi
  if [ "${VERCEL:-}" = "1" ]; then
    return 0
  fi
  if [ "${CI:-}" = "1" ]; then
    return 0
  fi
  return 1
}

# --- kb helpers ---
kb_to_mb() {
  awk -v kb="${1:-0}" 'BEGIN { printf "%.1f", kb/1024 }'
}

# Linux: read VmRSS kb for pid
proc_rss_kb() {
  local pid="$1"
  if [ -r "/proc/${pid}/status" ]; then
    grep -E '^VmRSS:' "/proc/${pid}/status" 2>/dev/null | awk '{print $2}'
  fi
}

# Recursive children PIDs (Linux + macOS pgrep)
collect_descendants() {
  local pid="$1"
  echo "$pid"
  local children
  children=$(pgrep -P "$pid" 2>/dev/null || true)
  for c in $children; do
    collect_descendants "$c"
  done
}

# Sum RSS for pid tree (Linux /proc)
tree_rss_kb() {
  local root="$1"
  local total=0
  local p
  for p in $(collect_descendants "$root"); do
    local kb
    kb=$(proc_rss_kb "$p")
    if [ -n "${kb:-}" ] && [ "$kb" -ge 0 ] 2>/dev/null; then
      total=$((total + kb))
    fi
  done
  echo "$total"
}

# Sum RSS for all processes whose comm looks like node (Linux)
all_node_rss_kb() {
  local total=0
  for pid_dir in /proc/[0-9]*; do
    local pid="${pid_dir##*/}"
    if [ -r "/proc/$pid/status" ] && [ -r "/proc/$pid/comm" ]; then
      if grep -q '^node$' "/proc/$pid/comm" 2>/dev/null; then
        local kb
        kb=$(proc_rss_kb "$pid")
        if [ -n "${kb:-}" ]; then
          total=$((total + kb))
        fi
      fi
    fi
  done
  echo "$total"
}

# macOS: ps "rss" is resident set size in kilobytes (same units as Linux VmRSS).
sample_tree_rss_kb_macos() {
  local root="$1"
  local total=0
  local p
  for p in $(collect_descendants "$root"); do
    local rss_kb
    rss_kb=$(ps -o rss= -p "$p" 2>/dev/null | tr -d ' ' || true)
    if [ -n "${rss_kb:-}" ] && [ "$rss_kb" -ge 0 ] 2>/dev/null; then
      total=$((total + rss_kb))
    fi
  done
  echo "$total"
}

sample_all_node_rss_kb_macos() {
  ps -ax -o rss= -o comm= 2>/dev/null | awk '$2 == "node" { sum += $1 } END { print sum + 0 }'
}

mem_available_mb_linux() {
  if [ -r /proc/meminfo ]; then
    grep -E '^MemAvailable:' /proc/meminfo | awk '{printf "%.0f", $2/1024}'
  fi
}

print_host_mem() {
  echo "[build-memory] --- host memory snapshot ---"
  if [ -r /proc/meminfo ]; then
    local avail
    avail=$(mem_available_mb_linux || echo "")
    local total
    total=$(grep -E '^MemTotal:' /proc/meminfo | awk '{printf "%.0f", $2/1024}')
    echo "[build-memory] MemTotal≈${total}MiB  MemAvailable≈${avail}MiB  (Linux /proc/meminfo)"
    if [ -r /sys/fs/cgroup/memory.max ]; then
      local cmax
      cmax=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo "")
      if [ -n "$cmax" ] && [ "$cmax" != "max" ]; then
        echo "[build-memory] cgroup memory.max≈$(awk -v b="$cmax" 'BEGIN{printf "%.0f", b/1024/1024}')MiB (cgroup v2)"
      fi
    fi
  elif command -v sysctl >/dev/null 2>&1; then
    local hw
    hw=$(sysctl -n hw.memsize 2>/dev/null || echo "")
    if [ -n "$hw" ]; then
      echo "[build-memory] hw.memsize≈$(awk -v b="$hw" 'BEGIN{printf "%.0f", b/1024/1024}')MiB (macOS)"
    fi
  fi
  echo "[build-memory] NODE_OPTIONS=${NODE_OPTIONS:-<unset>}"
  echo "[build-memory] node $(node -v 2>/dev/null || echo '?')  platform=$(uname -s)  interval=${INTERVAL_SEC}s"
  echo "[build-memory] legend: see header comments in scripts/build-with-memory-log.sh"
  echo "[build-memory] --------------------------------------"
}

monitor_loop() {
  local root_pid="$1"
  local phase="$2"
  local start
  start=$(date +%s)
  local peak_kb=0

  while kill -0 "$root_pid" 2>/dev/null; do
    local now elapsed
    now=$(date +%s)
    elapsed=$((now - start))

    local tree_kb all_kb
    if [ -d "/proc/${root_pid}" ]; then
      tree_kb=$(tree_rss_kb "$root_pid")
      all_kb=$(all_node_rss_kb)
    else
      tree_kb=$(sample_tree_rss_kb_macos "$root_pid")
      all_kb=$(sample_all_node_rss_kb_macos)
    fi

    if [ -z "$tree_kb" ] || [ "$tree_kb" -lt 0 ] 2>/dev/null; then
      tree_kb=0
    fi
    if [ "$tree_kb" -gt "$peak_kb" ]; then
      peak_kb=$tree_kb
    fi

    local tree_mb all_mb peak_mb
    tree_mb=$(kb_to_mb "$tree_kb")
    all_mb=$(kb_to_mb "$all_kb")
    peak_mb=$(kb_to_mb "$peak_kb")

    # Top 5 node processes by RSS (Linux)
    local top_line=""
    if [ -d /proc ]; then
      top_line=$(
        for pid_dir in /proc/[0-9]*; do
          pid="${pid_dir##*/}"
          if [ -r "/proc/$pid/comm" ] && grep -q '^node$' "/proc/$pid/comm" 2>/dev/null; then
            kb=$(proc_rss_kb "$pid")
            if [ -n "${kb:-}" ]; then
              echo "$kb $pid"
            fi
          fi
        done | sort -nr | head -5 | awk '{printf "%spid=%s:%.1fMiB ", (NR>1?", ":""), $2, $1/1024}'
      )
    fi

    echo "[build-memory] t=${elapsed}s phase=${phase} node_tree=${tree_mb}MiB node_all=${all_mb}MiB peak_tree=${peak_mb}MiB | top_rss: ${top_line:-n/a}"

    sleep "$INTERVAL_SEC"
  done
}

run_build_plain() {
  export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=8192}"
  "$ROOT/node_modules/.bin/cross-env" INIT_CWD="$ROOT" "$ROOT/node_modules/.bin/next" build
  "$ROOT/node_modules/.bin/cross-env" NODE_OPTIONS='--experimental-json-modules' node ./scripts/postbuild.mjs
}

run_build_monitored() {
  print_host_mem

  export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=8192}"

  echo "[build-memory] starting: next build (memory samples every ${INTERVAL_SEC}s)"
  "$ROOT/node_modules/.bin/cross-env" INIT_CWD="$ROOT" "$ROOT/node_modules/.bin/next" build &
  local next_pid=$!

  monitor_loop "$next_pid" "next-build" &
  local mon_pid=$!

  local ec=0
  wait "$next_pid" || ec=$?

  kill "$mon_pid" 2>/dev/null || true
  wait "$mon_pid" 2>/dev/null || true

  if [ "$ec" -ne 0 ]; then
    echo "[build-memory] next build exited with code $ec"
    exit "$ec"
  fi

  echo "[build-memory] starting: postbuild.mjs (short sample)"
  "$ROOT/node_modules/.bin/cross-env" NODE_OPTIONS='--experimental-json-modules' node ./scripts/postbuild.mjs &
  local post_pid=$!
  monitor_loop "$post_pid" "postbuild" &
  mon_pid=$!
  wait "$post_pid" || ec=$?
  kill "$mon_pid" 2>/dev/null || true
  wait "$mon_pid" 2>/dev/null || true

  echo "[build-memory] build finished (postbuild exit=${ec})"
  exit "$ec"
}

if should_log_memory; then
  run_build_monitored
else
  run_build_plain
fi