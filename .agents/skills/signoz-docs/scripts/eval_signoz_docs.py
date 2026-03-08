#!/usr/bin/env python3
"""Evaluate signoz-docs retrieval quality against a curated query set."""

from __future__ import annotations

import argparse
import json
import re
import subprocess
import sys
from pathlib import Path
from typing import Any, Dict, List, Sequence


def load_json_config(path: Path) -> Dict[str, Any]:
    raw = path.read_text(encoding="utf-8")
    loaded_json = json.loads(raw)
    if isinstance(loaded_json, dict):
        return loaded_json
    raise ValueError(f"Unsupported evaluation config format at {path}. Expected a JSON object.")


def regex_match_any(urls: Sequence[str], patterns: Sequence[str]) -> bool:
    for url in urls:
        for pattern in patterns:
            if re.search(pattern, url):
                return True
    return False


def regex_match_any_topk(urls: Sequence[str], patterns: Sequence[str], k: int) -> bool:
    if k <= 0:
        return False
    return regex_match_any(urls[:k], patterns)


def run_query(
    script_path: Path,
    query: str,
    *,
    k: int,
    refresh: str,
    intent: str | None = None,
    include_sources: str | None = None,
) -> Dict[str, Any]:
    cmd = [
        sys.executable,
        str(script_path),
        "--query",
        query,
        "--k",
        str(k),
        "--format",
        "json",
        "--refresh",
        refresh,
    ]
    if intent:
        cmd.extend(["--intent", intent])
    if include_sources:
        cmd.extend(["--include-sources", include_sources])

    proc = subprocess.run(cmd, capture_output=True, text=True)
    if proc.returncode != 0:
        raise RuntimeError(f"Query failed: {query}\n{proc.stderr.strip()}")

    payload = json.loads(proc.stdout)
    if not isinstance(payload, dict):
        raise RuntimeError(f"Unexpected response shape for query: {query}")
    return payload


def build_report(config: Dict[str, Any], script_path: Path, k: int | None, refresh: str) -> Dict[str, Any]:
    defaults = config.get("defaults", {}) if isinstance(config.get("defaults"), dict) else {}
    thresholds = config.get("thresholds", {}) if isinstance(config.get("thresholds"), dict) else {}
    cases = config.get("cases", [])

    if not isinstance(cases, list) or not cases:
        raise ValueError("Evaluation config requires a non-empty 'cases' list")

    effective_k = int(k or defaults.get("k", 5))
    top1_threshold = float(thresholds.get("top1", 0.75))
    top3_threshold = float(thresholds.get("top3", 0.92))

    results: List[Dict[str, Any]] = []
    top1_hits = 0
    top3_hits = 0
    critical_failures = 0
    top2_domain_cases = 0
    top2_domain_hits = 0
    top2_domain_failures = 0

    for idx, case in enumerate(cases, start=1):
        if not isinstance(case, dict):
            raise ValueError(f"Case {idx} must be a mapping")

        query = str(case.get("query", "")).strip()
        if not query:
            raise ValueError(f"Case {idx} has empty query")

        expected = case.get("expect", [])
        if not isinstance(expected, list) or not expected:
            raise ValueError(f"Case {idx} has no expected URL regex patterns")
        expected_patterns = [str(item) for item in expected]
        top2_expect = case.get("top2_expect", [])
        top2_patterns: List[str] = []
        if top2_expect:
            if not isinstance(top2_expect, list):
                raise ValueError(f"Case {idx} has invalid top2_expect (must be a list)")
            top2_patterns = [str(item) for item in top2_expect if str(item).strip()]

        payload = run_query(
            script_path,
            query,
            k=effective_k,
            refresh=refresh,
            intent=str(case.get("intent", "")).strip() or None,
            include_sources=str(case.get("include_sources", "")).strip() or None,
        )
        urls = [str(row.get("url", "")) for row in payload.get("results", []) if isinstance(row, dict)]

        top1 = urls[:1]
        top3 = urls[:3]
        top1_hit = regex_match_any(top1, expected_patterns)
        top3_hit = regex_match_any(top3, expected_patterns)
        top2_domain_hit = None
        if top2_patterns:
            top2_domain_cases += 1
            top2_domain_hit = regex_match_any_topk(urls, top2_patterns, 2)
            if top2_domain_hit:
                top2_domain_hits += 1
            else:
                top2_domain_failures += 1

        if top1_hit:
            top1_hits += 1
        if top3_hit:
            top3_hits += 1

        critical = bool(case.get("critical", False))
        if critical and not top3_hit:
            critical_failures += 1

        results.append(
            {
                "id": str(case.get("id", f"case_{idx}")),
                "query": query,
                "intent": payload.get("intent"),
                "critical": critical,
                "expected": expected_patterns,
                "top1_hit": top1_hit,
                "top3_hit": top3_hit,
                "top2_domain_hit": top2_domain_hit,
                "top2_expected": top2_patterns or None,
                "top_urls": urls[:3],
                "top_confidence": (
                    payload.get("results", [{}])[0].get("confidence")
                    if payload.get("results")
                    else None
                ),
            }
        )

    total = len(results)
    top1_rate = top1_hits / total
    top3_rate = top3_hits / total

    threshold_pass = top1_rate >= top1_threshold and top3_rate >= top3_threshold and critical_failures == 0

    return {
        "k": effective_k,
        "refresh": refresh,
        "thresholds": {
            "top1": top1_threshold,
            "top3": top3_threshold,
        },
        "summary": {
            "total": total,
            "top1_hits": top1_hits,
            "top3_hits": top3_hits,
            "top1_rate": round(top1_rate, 4),
            "top3_rate": round(top3_rate, 4),
            "critical_failures": critical_failures,
            "top2_domain_cases": top2_domain_cases,
            "top2_domain_hits": top2_domain_hits,
            "top2_domain_rate": (round(top2_domain_hits / top2_domain_cases, 4) if top2_domain_cases else None),
            "top2_domain_failures": top2_domain_failures,
            "pass": threshold_pass,
        },
        "results": results,
    }


def render_text(report: Dict[str, Any]) -> str:
    summary = report["summary"]
    thresholds = report["thresholds"]

    lines: List[str] = []
    lines.append("SigNoz Docs Retrieval Eval")
    lines.append(f"k={report['k']} refresh={report['refresh']}")
    lines.append(
        f"Top1: {summary['top1_hits']}/{summary['total']} ({summary['top1_rate']:.2%}) | threshold {thresholds['top1']:.2%}"
    )
    lines.append(
        f"Top3: {summary['top3_hits']}/{summary['total']} ({summary['top3_rate']:.2%}) | threshold {thresholds['top3']:.2%}"
    )
    if summary.get("top2_domain_cases", 0):
        lines.append(
            "Top2 domain-fit: "
            f"{summary['top2_domain_hits']}/{summary['top2_domain_cases']} "
            f"({summary['top2_domain_rate']:.2%})"
        )
    lines.append(f"Critical failures: {summary['critical_failures']}")
    lines.append(f"Result: {'PASS' if summary['pass'] else 'FAIL'}")
    lines.append("")

    failures = [row for row in report["results"] if not row["top3_hit"]]
    if failures:
        lines.append("Top-3 failures:")
        for row in failures:
            lines.append(f"- {row['id']} | intent={row['intent']} | critical={row['critical']}")
            lines.append(f"  query: {row['query']}")
            lines.append(f"  top3: {row['top_urls']}")
    else:
        lines.append("No top-3 failures.")

    domain_failures = [row for row in report["results"] if row.get("top2_domain_hit") is False]
    if domain_failures:
        lines.append("")
        lines.append("Top-2 domain-fit misses (informational):")
        for row in domain_failures:
            lines.append(f"- {row['id']} | intent={row['intent']}")
            lines.append(f"  query: {row['query']}")
            lines.append(f"  top3: {row['top_urls']}")

    return "\n".join(lines)


def parse_args(argv: Sequence[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Evaluate signoz-docs retrieval quality")
    parser.add_argument(
        "--cases",
        default="references/eval_queries.json",
        help="Path to eval config JSON, relative to skill root by default",
    )
    parser.add_argument("--k", type=int, default=None, help="Override top-k used for retrieval")
    parser.add_argument(
        "--refresh",
        choices=["auto", "force", "off"],
        default="auto",
        help="Refresh mode passed to find_signoz_docs.py",
    )
    parser.add_argument("--format", choices=["text", "json"], default="text", help="Output format")
    return parser.parse_args(argv)


def main(argv: Sequence[str] | None = None) -> int:
    args = parse_args(argv)

    script_dir = Path(__file__).resolve().parent
    skill_root = script_dir.parent
    cases_path = Path(args.cases)
    if not cases_path.is_absolute():
        cases_path = skill_root / cases_path

    retrieval_script = script_dir / "find_signoz_docs.py"

    if not cases_path.exists():
        print(f"Cases file not found: {cases_path}", file=sys.stderr)
        return 2

    try:
        config = load_json_config(cases_path)
        report = build_report(config, retrieval_script, args.k, args.refresh)
    except Exception as exc:
        print(f"Evaluation failed: {exc}", file=sys.stderr)
        return 1

    if args.format == "json":
        print(json.dumps(report, ensure_ascii=False, indent=2))
    else:
        print(render_text(report))

    return 0 if report["summary"].get("pass") else 1


if __name__ == "__main__":
    raise SystemExit(main())
