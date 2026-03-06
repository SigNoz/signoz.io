#!/usr/bin/env python3
"""Rank SigNoz docs and API reference results for a query.

This script searches two first-class corpora:
- https://signoz.io/docs/
- https://signoz.io/api-reference/ (indexed from /openAPISpec/api.yaml)

It uses a local cache and progressive hydration to avoid crawling every page on each run.
"""

from __future__ import annotations

import argparse
import concurrent.futures
import datetime as dt
import hashlib
import html
import json
import math
import os
import re
import sys
import textwrap
import time
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Sequence, Set, Tuple
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen

# Support both module import (`python -m ...`) and direct script execution/programmatic loading.
try:
    if __package__:
        from .scoring_adjustments import (
            CONFIDENCE_SCORING,
            FINAL_COMPONENT_CLAMPS,
            INGESTION_SCORING,
            INTENT_ALIGNMENT_SCORING,
            ONBOARDING_SCORING,
            OPERATION_SPECIFICITY_SCORING,
            RANKING_COMPONENT_WEIGHTS,
            TOKEN_SPECIFICITY_SCORING,
            TOPIC_ALIGNMENT_SCORING,
            TROUBLESHOOTING_SCORING,
            clamp,
        )
    else:
        raise ImportError("No package context")
except ImportError:
    SCRIPT_DIR = Path(__file__).resolve().parent
    if str(SCRIPT_DIR) not in sys.path:
        sys.path.insert(0, str(SCRIPT_DIR))
    from scoring_adjustments import (
        CONFIDENCE_SCORING,
        FINAL_COMPONENT_CLAMPS,
        INGESTION_SCORING,
        INTENT_ALIGNMENT_SCORING,
        ONBOARDING_SCORING,
        OPERATION_SPECIFICITY_SCORING,
        RANKING_COMPONENT_WEIGHTS,
        TOKEN_SPECIFICITY_SCORING,
        TOPIC_ALIGNMENT_SCORING,
        TROUBLESHOOTING_SCORING,
        clamp,
    )

CACHE_DIR = Path.home() / ".cache" / "signoz-docs"
CATALOG_PATH = CACHE_DIR / "catalog.json"
CONTENT_INDEX_PATH = CACHE_DIR / "content_index.jsonl"
API_INDEX_PATH = CACHE_DIR / "api_index.jsonl"
STATE_PATH = CACHE_DIR / "state.json"

SITEMAP_URL = "https://signoz.io/sitemap.xml"
API_REFERENCE_URL = "https://signoz.io/api-reference/"
OPENAPI_SPEC_URL = "https://signoz.io/openAPISpec/api.yaml"

CACHE_TTL_SECONDS = 24 * 60 * 60
HTTP_TIMEOUT = 20
USER_AGENT = "signoz-docs-skill/2.0 (+https://signoz.io)"
HTTP_METHODS = {"get", "post", "put", "patch", "delete", "head", "options", "trace"}

DEFAULT_QUERY_CONFIG: Dict[str, Any] = {
    "intent_keywords": {},
    "synonyms": {},
    "source_boosts": {"general": {"docs": 0.8, "api": 0.65}},
    "intent_url_hints": {},
}
QUERY_CONFIG_KEYS = ("intent_keywords", "synonyms", "source_boosts", "intent_url_hints")

TOKEN_RE = re.compile(r"[a-z0-9]+")
URL_TOKEN_RE = re.compile(r"[a-z0-9]+")
STOPWORDS = {
    "a",
    "an",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "do",
    "for",
    "from",
    "how",
    "i",
    "in",
    "is",
    "it",
    "my",
    "of",
    "on",
    "or",
    "that",
    "the",
    "to",
    "with",
    "you",
    "your",
    "what",
    "when",
    "where",
    "which",
    "who",
    "why",
    "can",
}
COMMON_FAILURE_TERMS = {
    "troubleshooting",
    "troubleshoot",
    "error",
    "errors",
    "failed",
    "failure",
    "missing",
    "timeout",
    "issue",
    "issues",
    "problem",
    "problems",
    "unable",
    "cannot",
    "not",
}

TROUBLESHOOTING_TERMS = COMMON_FAILURE_TERMS | {"debug", "faq", "faqs", "no"}

COMMON_API_TERMS = {
    "api",
    "endpoint",
    "endpoints",
    "openapi",
    "swagger",
    "operation",
    "operations",
    "operationid",
    "curl",
    "token",
    "auth",
    "authentication",
    "header",
    "headers",
    "authorization",
    "authorisation",
}

API_EXPLICIT_TERMS = set(COMMON_API_TERMS)

GENERIC_OPERATION_TERMS = COMMON_API_TERMS | {
    "get",
    "post",
    "put",
    "patch",
    "delete",
    "list",
    "all",
    "show",
    "fetch",
    "signoz",
    "request",
    "requests",
    "response",
    "key",
    "keys",
    "authenticate",
    "apikey",
    "api-key",
    "use",
    "using",
    "http",
    "can",
    "signoz-api-key",
    "needed",
    "need",
}

ACTION_TO_METHODS: Dict[str, Set[str]] = {
    "create": {"post"},
    "delete": {"delete"},
    "update": {"put", "patch"},
    "get": {"get"},
}

ACTION_QUERY_TERMS: Dict[str, Set[str]] = {
    "create": {"create", "add", "new", "insert"},
    "delete": {"delete", "remove", "destroy"},
    "update": {"update", "edit", "modify", "change", "patch"},
    "get": {"get", "list", "show", "fetch", "read"},
}

FAILURE_QUERY_TERMS = COMMON_FAILURE_TERMS | {"showing"}

SEND_LOG_TERMS = {"send", "sending", "ship", "shipping", "stream", "export", "forward", "ingest", "ingestion"}

ONBOARDING_TERMS = {
    "account",
    "signup",
    "login",
    "quickstart",
    "onboarding",
    "register",
    "start",
    "started",
    "getting",
    "beginners",
}

ONBOARDING_PHRASES = (
    "sign up",
    "signup",
    "log in",
    "login",
    "create account",
    "create a signoz cloud account",
    "cloud quickstart",
    "get started",
)

CLOUD_PROVIDER_DOC_PATTERNS = (
    "/docs/gcp-monitoring/",
    "/docs/aws-monitoring/",
    "/docs/azure-monitoring/",
)

LOW_SIGNAL_TERMS = {
    "cloud",
    "api",
    "signoz",
    "docs",
    "request",
    "requests",
    "question",
    "help",
    "needed",
    "need",
}

HIGH_SIGNAL_TERMS = {
    "otlp",
    "opentelemetry",
    "otel",
    "collector",
    "ingestion",
    "endpoint",
    "self-hosted",
    "selfhost",
    "nodejs",
    "header",
    "headers",
    "authorization",
    "authorisation",
    "signoz-api-key",
    "api-key",
    "apikey",
}

COMPOUND_TERM_EXPANSIONS: Dict[str, Sequence[str]] = {
    "nodejs": ("node", "js"),
    "nextjs": ("next", "js"),
    "nuxtjs": ("nuxt", "js"),
    "nestjs": ("nest", "js"),
    "selfhost": ("self", "host", "self-hosted"),
    "selfhosted": ("self", "host", "self-hosted"),
    "apikey": ("api", "key", "api-key", "signoz-api-key"),
}

OTLP_SETUP_TERMS = {
    "otlp",
    "otel",
    "opentelemetry",
    "collector",
    "ingestion",
    "ingest",
    "receiver",
    "exporter",
}

ENDPOINT_TERMS = {
    "endpoint",
    "endpoints",
    "url",
    "host",
    "port",
    "grpc",
    "http",
}

SIGNOZ_SCOPE_TERMS = {
    "signoz",
    "cloud",
    "self",
    "selfhost",
    "self-hosted",
    "hosted",
}

API_AUTH_TERMS = {
    "auth",
    "authentication",
    "authorization",
    "authorisation",
    "token",
    "header",
    "headers",
    "key",
    "keys",
    "apikey",
    "api-key",
    "signoz-api-key",
}

def utc_now() -> dt.datetime:
    return dt.datetime.now(dt.timezone.utc)


def iso_now() -> str:
    return utc_now().isoformat()


def parse_iso(value: Optional[str]) -> Optional[dt.datetime]:
    if not value:
        return None
    try:
        parsed = dt.datetime.fromisoformat(value)
    except ValueError:
        return None
    if parsed.tzinfo is None:
        return parsed.replace(tzinfo=dt.timezone.utc)
    return parsed.astimezone(dt.timezone.utc)


def is_stale(ts: Optional[str], ttl_seconds: int = CACHE_TTL_SECONDS) -> bool:
    parsed = parse_iso(ts)
    if parsed is None:
        return True
    age = (utc_now() - parsed).total_seconds()
    return age >= ttl_seconds


def normalize_url(url: str) -> str:
    url = url.strip()
    if not url:
        return url
    parsed = urlparse(url)
    cleaned_path = parsed.path or "/"
    if cleaned_path != "/" and cleaned_path.endswith("/"):
        cleaned_path = cleaned_path[:-1]
    normalized = f"{parsed.scheme}://{parsed.netloc}{cleaned_path}"
    if parsed.query:
        normalized = f"{normalized}?{parsed.query}"
    return normalized


def titleize_slug(text: str) -> str:
    text = text.replace("_", "-").strip("-")
    if not text:
        return "SigNoz Docs"
    words = [w for w in text.split("-") if w]
    return " ".join(word.capitalize() for word in words)


def slug_from_url(url: str) -> str:
    parsed = urlparse(url)
    path = parsed.path.strip("/")
    if path.startswith("docs/"):
        path = path[len("docs/") :]
    return path


def fallback_title_for_url(url: str, source: str) -> str:
    if source == "api":
        return "SigNoz API Reference"
    slug = slug_from_url(url)
    if not slug:
        return "SigNoz Docs"
    return titleize_slug(slug.split("/")[-1])


def tokenize(text: str) -> List[str]:
    return TOKEN_RE.findall((text or "").lower())


def safe_lower(text: Optional[str]) -> str:
    return (text or "").lower()


def sha256_text(text: str) -> str:
    return hashlib.sha256(text.encode("utf-8", errors="ignore")).hexdigest()


def read_json(path: Path, default: Any) -> Any:
    if not path.exists():
        return default
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return default


def write_json(path: Path, payload: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(f"{path.name}.{os.getpid()}.{time.time_ns()}.tmp")
    tmp.write_text(json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    tmp.replace(path)


def read_jsonl(path: Path) -> List[Dict[str, Any]]:
    if not path.exists():
        return []
    rows: List[Dict[str, Any]] = []
    with path.open("r", encoding="utf-8") as handle:
        for line in handle:
            line = line.strip()
            if not line:
                continue
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError:
                continue
    return rows


def write_jsonl(path: Path, rows: Sequence[Dict[str, Any]], sort_key: str = "url") -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    ordered = sorted(rows, key=lambda row: str(row.get(sort_key, "")))
    tmp = path.with_name(f"{path.name}.{os.getpid()}.{time.time_ns()}.tmp")
    with tmp.open("w", encoding="utf-8") as handle:
        for row in ordered:
            handle.write(json.dumps(row, ensure_ascii=False, sort_keys=True) + "\n")
    tmp.replace(path)


def load_query_config(path: Path) -> Dict[str, Any]:
    config = json.loads(json.dumps(DEFAULT_QUERY_CONFIG))
    loaded = read_json(path, default={})
    if not isinstance(loaded, dict):
        return config

    for top_key in QUERY_CONFIG_KEYS:
        value = loaded.get(top_key)
        if isinstance(value, dict):
            config[top_key] = value

    general_boosts = config["source_boosts"].get("general")
    if not isinstance(general_boosts, dict):
        config["source_boosts"]["general"] = {"docs": 0.8, "api": 0.65}
    else:
        general_boosts.setdefault("docs", 0.8)
        general_boosts.setdefault("api", 0.65)

    return config


def fetch_http(
    url: str,
    *,
    method: str = "GET",
    headers: Optional[Dict[str, str]] = None,
    timeout: int = HTTP_TIMEOUT,
) -> Tuple[int, Dict[str, str], bytes]:
    req_headers = {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml,text/yaml,text/plain,*/*",
    }
    if headers:
        req_headers.update(headers)

    request = Request(url, headers=req_headers, method=method)

    try:
        with urlopen(request, timeout=timeout) as response:  # nosec B310 - controlled URLs
            body = response.read()
            resp_headers = {k.lower(): v for k, v in response.headers.items()}
            return int(response.status), resp_headers, body
    except HTTPError as exc:
        body = exc.read() if hasattr(exc, "read") else b""
        resp_headers = {k.lower(): v for k, v in (exc.headers.items() if exc.headers else [])}
        return int(exc.code), resp_headers, body
    except URLError as exc:
        raise RuntimeError(f"Network error fetching {url}: {exc}") from exc


def conditional_headers(etag: Optional[str], last_modified: Optional[str]) -> Dict[str, str]:
    headers: Dict[str, str] = {}
    if etag:
        headers["If-None-Match"] = etag
    if last_modified:
        headers["If-Modified-Since"] = last_modified
    return headers


def parse_sitemap_docs(xml_text: str) -> List[str]:
    pattern = re.compile(r"<loc>\s*(https://signoz\.io/docs/[^<]+)\s*</loc>", re.IGNORECASE)
    urls = {normalize_url(match.group(1)) for match in pattern.finditer(xml_text)}
    return sorted(url for url in urls if url.startswith("https://signoz.io/docs/"))


def extract_main_html(html_text: str) -> str:
    main_match = re.search(r"<main\b[^>]*>(.*?)</main>", html_text, flags=re.IGNORECASE | re.DOTALL)
    if main_match:
        return main_match.group(1)
    article_match = re.search(r"<article\b[^>]*>(.*?)</article>", html_text, flags=re.IGNORECASE | re.DOTALL)
    if article_match:
        return article_match.group(1)
    return html_text


def clean_html_text(block: str) -> str:
    block = re.sub(r"<script\b[^>]*>.*?</script>", " ", block, flags=re.IGNORECASE | re.DOTALL)
    block = re.sub(r"<style\b[^>]*>.*?</style>", " ", block, flags=re.IGNORECASE | re.DOTALL)
    block = re.sub(r"<noscript\b[^>]*>.*?</noscript>", " ", block, flags=re.IGNORECASE | re.DOTALL)
    block = re.sub(r"<svg\b[^>]*>.*?</svg>", " ", block, flags=re.IGNORECASE | re.DOTALL)
    block = re.sub(r"<[^>]+>", " ", block)
    block = html.unescape(block)
    block = re.sub(r"\s+", " ", block).strip()
    return block


def extract_doc_content(url: str, html_text: str) -> Dict[str, Any]:
    title_match = re.search(r"<title>(.*?)</title>", html_text, flags=re.IGNORECASE | re.DOTALL)
    h1_match = re.search(r"<h1\b[^>]*>(.*?)</h1>", html_text, flags=re.IGNORECASE | re.DOTALL)
    canonical_match = re.search(
        r"<link\s+[^>]*rel=[\"']canonical[\"'][^>]*href=[\"']([^\"']+)[\"']",
        html_text,
        flags=re.IGNORECASE,
    )

    raw_title = ""
    if h1_match:
        raw_title = clean_html_text(h1_match.group(1))
    if not raw_title and title_match:
        raw_title = clean_html_text(title_match.group(1))

    if raw_title and "|" in raw_title:
        raw_title = raw_title.split("|", 1)[0].strip()

    if not raw_title:
        raw_title = fallback_title_for_url(url, "docs")

    body_html = extract_main_html(html_text)
    text = clean_html_text(body_html)

    return {
        "title": raw_title,
        "text": text,
        "canonical_url": normalize_url(canonical_match.group(1)) if canonical_match else normalize_url(url),
    }


def parse_openapi_operations(spec_text: str) -> Tuple[str, List[Dict[str, Any]]]:
    lines = spec_text.splitlines()
    info_title = "SigNoz API"
    in_info = False

    current_path: Optional[str] = None
    current_method: Optional[str] = None
    current_op: Dict[str, Any] = {}
    current_param: Dict[str, str] = {}
    in_parameters = False
    in_security = False

    records: List[Dict[str, Any]] = []

    def parse_yaml_scalar(stripped_line: str) -> str:
        if ":" not in stripped_line:
            return ""
        return stripped_line.split(":", 1)[1].strip().strip("\"'")

    def finalize_param() -> None:
        nonlocal current_param
        if not current_param:
            return
        name = str(current_param.get("name", "")).strip()
        location = str(current_param.get("in", "")).strip()
        if name:
            current_op.setdefault("parameters", []).append({"name": name, "in": location})
        current_param = {}

    def finalize_current() -> None:
        nonlocal current_method, current_op, in_parameters, in_security
        if not current_method:
            return
        finalize_param()
        in_parameters = False
        in_security = False
        operation_id = str(current_op.get("operation_id", "")).strip()
        if not operation_id:
            current_method = None
            current_op = {}
            return

        path = str(current_op.get("path", "")).strip()
        method = str(current_op.get("method", "")).strip().lower()
        summary = str(current_op.get("summary", "")).strip()
        description = str(current_op.get("description", "")).strip()
        parameters = current_op.get("parameters", [])
        security = current_op.get("security", [])

        clean_summary = summary if summary else titleize_slug(operation_id)
        title = f"{clean_summary} ({method.upper()})" if method else clean_summary
        api_url = f"{API_REFERENCE_URL}#/operations/{operation_id}"

        parameter_tokens: List[str] = []
        auth_tokens: Set[str] = set()
        for param in parameters:
            if not isinstance(param, dict):
                continue
            param_name = safe_lower(param.get("name"))
            param_in = safe_lower(param.get("in"))
            if param_name:
                parameter_tokens.append(param_name)
            if param_in:
                parameter_tokens.append(param_in)
            haystack = f"{param_name} {param_in}"
            if any(token in haystack for token in ("auth", "token", "key", "header", "authorization", "api-key")):
                auth_tokens.update({"auth", "token", "key", "header", "authorization", "signoz-api-key"})

        security_tokens: List[str] = []
        for scheme in security:
            token = safe_lower(scheme)
            if not token:
                continue
            security_tokens.append(token)
            if any(part in token for part in ("auth", "token", "key", "oauth", "bearer")):
                auth_tokens.update({"auth", "authentication", "authorization", "token", "api-key"})

        text_parts = [
            title,
            operation_id,
            method,
            path,
            summary,
            description,
            " ".join(parameter_tokens),
            " ".join(security_tokens),
        ]
        if auth_tokens:
            text_parts.append("authentication authorization auth header headers api key signoz-api-key token")
        text = " ".join(part for part in text_parts if part).strip()

        records.append(
            {
                "source": "api",
                "url": api_url,
                "title": title,
                "summary": summary,
                "description": description,
                "operation_id": operation_id,
                "path": path,
                "method": method,
                "parameters": parameters,
                "security": security,
                "text": text,
            }
        )
        current_method = None
        current_op = {}

    for raw_line in lines:
        line = raw_line.rstrip("\n")
        if not line.strip():
            continue

        indent = len(line) - len(line.lstrip(" "))
        stripped = line.strip()

        if indent == 0 and stripped.startswith("info:"):
            in_info = True
            continue
        if indent == 0 and stripped.endswith(":") and not stripped.startswith("info:"):
            in_info = False

        if in_info and indent == 2 and stripped.startswith("title:"):
            info_title = stripped.split(":", 1)[1].strip().strip("\"'") or info_title

        if indent == 2 and stripped.endswith(":"):
            maybe_path = stripped[:-1].strip().strip("\"'")
            if maybe_path.startswith("/"):
                finalize_current()
                current_path = maybe_path
                continue

        if indent == 4 and stripped.endswith(":"):
            maybe_method = stripped[:-1].strip().lower()
            if maybe_method in HTTP_METHODS:
                finalize_current()
                current_method = maybe_method
                current_op = {
                    "path": current_path or "",
                    "method": maybe_method,
                    "summary": "",
                    "description": "",
                    "operation_id": "",
                    "parameters": [],
                    "security": [],
                }
                current_param = {}
                in_parameters = False
                in_security = False
                continue
            if current_method:
                finalize_current()

        if current_method and indent <= 4 and not (indent == 4 and stripped.endswith(":")):
            finalize_current()

        if not current_method:
            continue

        if in_parameters and indent <= 6 and not stripped.startswith("parameters:"):
            finalize_param()
            in_parameters = False
        if in_security and indent <= 6 and not stripped.startswith("security:"):
            in_security = False

        if indent == 6 and stripped.startswith("parameters:"):
            in_parameters = True
            in_security = False
            finalize_param()
            continue

        if indent == 6 and stripped.startswith("security:"):
            in_security = True
            in_parameters = False
            finalize_param()
            continue

        if in_parameters:
            if indent >= 8 and stripped.startswith("- "):
                finalize_param()
                current_param = {}
                inline = stripped[2:].strip()
                if inline.startswith("name:"):
                    current_param["name"] = parse_yaml_scalar(inline)
            elif indent >= 10 and stripped.startswith("name:"):
                current_param["name"] = parse_yaml_scalar(stripped)
            elif indent >= 10 and stripped.startswith("in:"):
                current_param["in"] = parse_yaml_scalar(stripped)
            continue

        if in_security:
            if indent >= 8 and stripped.startswith("- "):
                inline = stripped[2:].strip()
                if inline:
                    scheme = inline.split(":", 1)[0].strip().strip("\"'")
                    if scheme:
                        current_op.setdefault("security", []).append(scheme)
            continue

        if indent >= 6 and stripped.startswith("operationId:"):
            current_op["operation_id"] = parse_yaml_scalar(stripped)
        elif indent >= 6 and stripped.startswith("summary:"):
            current_op["summary"] = parse_yaml_scalar(stripped)
        elif indent >= 6 and stripped.startswith("description:"):
            desc_value = parse_yaml_scalar(stripped)
            if desc_value and desc_value != "|":
                current_op["description"] = desc_value

    finalize_current()

    unique: Dict[str, Dict[str, Any]] = {}
    for record in records:
        unique[record["url"]] = record

    return info_title, [unique[url] for url in sorted(unique.keys())]


def load_state() -> Dict[str, Any]:
    state = read_json(STATE_PATH, default={})
    if not isinstance(state, dict):
        state = {}
    state.setdefault("version", 2)
    state.setdefault("sources", {})
    state["sources"].setdefault("sitemap", {})
    state["sources"].setdefault("api_spec", {})
    return state


def load_catalog() -> Dict[str, Any]:
    catalog = read_json(CATALOG_PATH, default={})
    if not isinstance(catalog, dict):
        catalog = {}
    catalog.setdefault("version", 2)
    catalog.setdefault("generated_at", "")
    catalog.setdefault("records", [])
    if not isinstance(catalog["records"], list):
        catalog["records"] = []
    return catalog


def index_by_url(records: Sequence[Dict[str, Any]]) -> Dict[str, Dict[str, Any]]:
    indexed: Dict[str, Dict[str, Any]] = {}
    for row in records:
        url = str(row.get("url", "")).strip()
        if not url:
            continue
        indexed[url] = row
    return indexed


def update_docs_catalog(
    catalog: Dict[str, Any],
    state: Dict[str, Any],
    refresh_mode: str,
    warnings: List[str],
) -> None:
    existing_records = catalog.get("records", [])
    docs_existing = {row["url"]: row for row in existing_records if row.get("source") == "docs" and row.get("url")}

    if refresh_mode == "off":
        return

    sitemap_state = state["sources"].get("sitemap", {})
    headers = {}
    if refresh_mode == "auto":
        headers = conditional_headers(sitemap_state.get("etag"), sitemap_state.get("last_modified"))

    try:
        status, resp_headers, body = fetch_http(SITEMAP_URL, headers=headers)
    except Exception as exc:
        warnings.append(f"Failed to fetch sitemap: {exc}")
        return

    sitemap_state["checked_at"] = iso_now()

    if status == 304:
        state["sources"]["sitemap"] = sitemap_state
        return

    if status != 200:
        warnings.append(f"Sitemap fetch returned HTTP {status}")
        state["sources"]["sitemap"] = sitemap_state
        return

    xml_text = body.decode("utf-8", errors="replace")
    docs_urls = parse_sitemap_docs(xml_text)

    sitemap_state["etag"] = resp_headers.get("etag")
    sitemap_state["last_modified"] = resp_headers.get("last-modified")
    sitemap_state["fetched_at"] = iso_now()
    state["sources"]["sitemap"] = sitemap_state

    merged_docs: List[Dict[str, Any]] = []
    now_ts = iso_now()

    for url in docs_urls:
        previous = docs_existing.get(url, {})
        slug = slug_from_url(url)
        default_title = fallback_title_for_url(url, "docs")
        merged_docs.append(
            {
                "id": previous.get("id") or f"docs:{url}",
                "source": "docs",
                "url": url,
                "slug": slug,
                "title": previous.get("title") or default_title,
                "operation_id": None,
                "path": None,
                "method": None,
                "summary": previous.get("summary", ""),
                "checked_at": now_ts,
                "fetched_at": previous.get("fetched_at"),
                "etag": previous.get("etag"),
                "last_modified": previous.get("last_modified"),
                "content_hash": previous.get("content_hash"),
            }
        )

    non_docs = [row for row in existing_records if row.get("source") != "docs"]
    catalog["records"] = non_docs + merged_docs


def update_api_index(
    state: Dict[str, Any],
    refresh_mode: str,
    warnings: List[str],
) -> List[Dict[str, Any]]:
    existing_api_rows = read_jsonl(API_INDEX_PATH)

    if refresh_mode == "off":
        return existing_api_rows

    api_state = state["sources"].get("api_spec", {})
    headers = {}
    if refresh_mode == "auto":
        headers = conditional_headers(api_state.get("etag"), api_state.get("last_modified"))

    try:
        status, resp_headers, body = fetch_http(OPENAPI_SPEC_URL, headers=headers)
    except Exception as exc:
        warnings.append(f"Failed to fetch OpenAPI spec: {exc}")
        return existing_api_rows

    api_state["checked_at"] = iso_now()

    if status == 304:
        state["sources"]["api_spec"] = api_state
        return existing_api_rows

    if status != 200:
        warnings.append(f"OpenAPI spec fetch returned HTTP {status}")
        state["sources"]["api_spec"] = api_state
        return existing_api_rows

    spec_text = body.decode("utf-8", errors="replace")
    api_title, operation_rows = parse_openapi_operations(spec_text)

    fetched_at = iso_now()
    api_rows: List[Dict[str, Any]] = [
        {
            "source": "api",
            "url": API_REFERENCE_URL,
            "title": api_title or "SigNoz API Reference",
            "summary": "SigNoz API reference home",
            "description": "Browse SigNoz REST API endpoints and schemas",
            "operation_id": "",
            "path": "",
            "method": "",
            "text": (
                f"{api_title} API reference OpenAPI endpoints authentication authorization "
                "api-key signoz-api-key header token"
            ),
            "checked_at": fetched_at,
            "fetched_at": fetched_at,
            "etag": resp_headers.get("etag"),
            "last_modified": resp_headers.get("last-modified"),
            "content_hash": sha256_text(spec_text),
        }
    ]

    for op in operation_rows:
        row = dict(op)
        row["checked_at"] = fetched_at
        row["fetched_at"] = fetched_at
        row["etag"] = resp_headers.get("etag")
        row["last_modified"] = resp_headers.get("last-modified")
        row["content_hash"] = sha256_text(row.get("text", ""))
        api_rows.append(row)

    api_state["etag"] = resp_headers.get("etag")
    api_state["last_modified"] = resp_headers.get("last-modified")
    api_state["fetched_at"] = fetched_at
    state["sources"]["api_spec"] = api_state

    write_jsonl(API_INDEX_PATH, api_rows)
    return api_rows


def sync_catalog_with_api(catalog: Dict[str, Any], api_rows: Sequence[Dict[str, Any]]) -> None:
    existing = catalog.get("records", [])
    non_api = [row for row in existing if row.get("source") != "api"]

    api_catalog: List[Dict[str, Any]] = []
    for row in api_rows:
        url = row.get("url")
        if not url:
            continue
        api_catalog.append(
            {
                "id": f"api:{url}",
                "source": "api",
                "url": url,
                "slug": "api-reference",
                "title": row.get("title") or fallback_title_for_url(url, "api"),
                "operation_id": row.get("operation_id") or None,
                "path": row.get("path") or None,
                "method": row.get("method") or None,
                "summary": row.get("summary") or "",
                "checked_at": row.get("checked_at"),
                "fetched_at": row.get("fetched_at"),
                "etag": row.get("etag"),
                "last_modified": row.get("last_modified"),
                "content_hash": row.get("content_hash"),
            }
        )

    catalog["records"] = non_api + api_catalog


def needs_doc_fetch(
    url: str,
    content_index: Dict[str, Dict[str, Any]],
    refresh_mode: str,
) -> bool:
    if refresh_mode == "off":
        return False
    existing = content_index.get(url)
    if not existing:
        return True
    return is_stale(existing.get("fetched_at"), CACHE_TTL_SECONDS)


def fetch_doc(
    url: str,
    previous: Optional[Dict[str, Any]],
    refresh_mode: str,
) -> Tuple[str, Optional[Dict[str, Any]], Optional[str]]:
    headers: Dict[str, str] = {}
    if refresh_mode == "auto" and previous:
        headers = conditional_headers(previous.get("etag"), previous.get("last_modified"))

    fetch_url = url
    redirect_hops = 0

    while True:
        try:
            status, resp_headers, body = fetch_http(fetch_url, headers=headers)
        except Exception as exc:
            return url, None, f"Failed to fetch {fetch_url}: {exc}"

        if status in {301, 302, 303, 307, 308} and resp_headers.get("location") and redirect_hops < 5:
            fetch_url = urljoin(fetch_url, resp_headers["location"])
            headers = {}
            redirect_hops += 1
            continue
        break

    checked_at = iso_now()

    if status == 304 and previous:
        updated = dict(previous)
        updated["checked_at"] = checked_at
        return url, updated, None

    if status != 200:
        return url, None, f"HTTP {status} while fetching {fetch_url}"

    html_text = body.decode("utf-8", errors="replace")
    extracted = extract_doc_content(fetch_url, html_text)
    text = extracted.get("text", "")

    row = {
        "url": normalize_url(extracted.get("canonical_url", url)),
        "title": extracted.get("title") or fallback_title_for_url(url, "docs"),
        "text": text,
        "checked_at": checked_at,
        "fetched_at": checked_at,
        "etag": resp_headers.get("etag"),
        "last_modified": resp_headers.get("last-modified"),
        "content_hash": sha256_text(text),
    }
    return url, row, None


def hydrate_candidate_docs(
    urls: Sequence[str],
    content_index: Dict[str, Dict[str, Any]],
    refresh_mode: str,
    warnings: List[str],
) -> None:
    targets = [url for url in urls if needs_doc_fetch(url, content_index, refresh_mode)]
    if not targets:
        return

    workers = min(8, max(2, len(targets)))

    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as pool:
        futures = [pool.submit(fetch_doc, url, content_index.get(url), refresh_mode) for url in targets]
        for future in concurrent.futures.as_completed(futures):
            url, row, error = future.result()
            if error:
                warnings.append(error)
                continue
            if row is None:
                continue
            canonical_url = row.get("url", url)
            content_index[canonical_url] = row
            if canonical_url != url:
                content_index[url] = row


def parse_include_sources(raw: str) -> Set[str]:
    parts = [part.strip().lower() for part in raw.split(",") if part.strip()]
    valid = {"docs", "api"}
    if not parts:
        raise ValueError("--include-sources must include at least one of: docs,api")
    invalid = sorted({part for part in parts if part not in valid})
    if invalid:
        joined = ",".join(invalid)
        raise ValueError(f"--include-sources contains invalid value(s): {joined}. Allowed values: docs,api")
    return set(parts)


def query_has_phrase(query: str, phrases: Sequence[str]) -> bool:
    lowered = safe_lower(query)
    return any(phrase in lowered for phrase in phrases)


def detect_action_intents(query_terms: Sequence[str]) -> Set[str]:
    actions: Set[str] = set()
    term_set = set(query_terms)
    for action, terms in ACTION_QUERY_TERMS.items():
        if term_set & terms:
            actions.add(action)
    return actions


def is_cloud_onboarding_query(query_terms: Sequence[str], query: str) -> bool:
    term_set = set(query_terms)
    has_cloud = "cloud" in term_set
    has_onboarding_signal = bool(term_set & ONBOARDING_TERMS) or query_has_phrase(query, ONBOARDING_PHRASES)
    return has_cloud and has_onboarding_signal


def is_self_host_install_query(query_terms: Sequence[str]) -> bool:
    term_set = set(query_terms)
    install_terms = {"install", "installation", "self", "selfhost", "docker", "kubernetes", "helm", "k8s"}
    return bool(term_set & install_terms)


def is_provider_monitoring_query(query_terms: Sequence[str]) -> bool:
    terms = set(query_terms)
    provider_terms = {"aws", "gcp", "azure", "eks", "ec2", "rds", "s3", "cloudwatch", "lambda", "gke", "aks"}
    monitoring_terms = {"monitor", "monitoring", "metrics", "integration", "one", "click", "manual"}
    return bool(terms & provider_terms) and bool(terms & monitoring_terms)


def is_otlp_endpoint_setup_query(query_terms: Sequence[str], query: str) -> bool:
    terms = set(query_terms)
    has_setup_signal = bool(terms & OTLP_SETUP_TERMS)
    has_endpoint_signal = bool(terms & ENDPOINT_TERMS) or query_has_phrase(
        query,
        ("otlp endpoint", "collector endpoint", "ingestion endpoint"),
    )
    has_scope = bool(terms & SIGNOZ_SCOPE_TERMS) or "signoz" in safe_lower(query)
    return has_setup_signal and has_endpoint_signal and has_scope


def is_api_auth_query(query_terms: Sequence[str], query: str) -> bool:
    terms = set(query_terms)
    strict_api_terms = API_EXPLICIT_TERMS - {
        "token",
        "auth",
        "authentication",
        "header",
        "headers",
        "authorization",
        "authorisation",
    }
    has_api_signal = bool(terms & strict_api_terms) or query_has_phrase(
        query,
        ("api request", "api requests", "api endpoint", "signoz api"),
    )
    has_auth_signal = bool(terms & API_AUTH_TERMS) or query_has_phrase(
        query,
        ("api key", "signoz-api-key", "auth header", "authorization header"),
    )
    return has_api_signal and has_auth_signal


def term_importance_weight(term: str) -> float:
    token = term.strip().lower()
    if not token:
        return 0.0
    if token in HIGH_SIGNAL_TERMS:
        return 1.25
    if token in LOW_SIGNAL_TERMS:
        return 0.45
    if len(token) <= 2:
        return 0.6
    return 1.0


def onboarding_relevance_adjustment(record: Dict[str, Any], query_terms: Sequence[str], query: str) -> float:
    url = safe_lower(record.get("url"))
    terms = set(query_terms)
    cloud_onboarding = is_cloud_onboarding_query(query_terms, query)
    self_host_install = is_self_host_install_query(query_terms) and "cloud" not in terms

    if not cloud_onboarding and not self_host_install:
        return 0.0

    boost = 0.0

    if cloud_onboarding:
        if "/docs/cloud/quickstart" in url:
            boost += ONBOARDING_SCORING["cloud_quickstart"]
        elif url.rstrip("/") == "https://signoz.io/docs/cloud":
            boost += ONBOARDING_SCORING["cloud_home"]
        elif "/docs/what-is-signoz" in url:
            boost += ONBOARDING_SCORING["what_is_signoz"]
        elif "/docs/introduction" in url:
            boost += ONBOARDING_SCORING["introduction"]
        elif "/docs/ingestion/signoz-cloud/overview" in url:
            boost += ONBOARDING_SCORING["cloud_ingestion_overview"]

        if any(pattern in url for pattern in CLOUD_PROVIDER_DOC_PATTERNS):
            boost += ONBOARDING_SCORING["cloud_provider_penalty"]

    if self_host_install:
        if "/docs/install/self-host" in url:
            boost += ONBOARDING_SCORING["self_host_install"]
        elif "/docs/install/docker" in url:
            boost += ONBOARDING_SCORING["self_host_docker"]
        elif "/docs/install/kubernetes" in url:
            boost += ONBOARDING_SCORING["self_host_kubernetes"]
        elif any(pattern in url for pattern in CLOUD_PROVIDER_DOC_PATTERNS):
            boost += ONBOARDING_SCORING["self_host_cloud_provider_penalty"]

    return clamp(boost, ONBOARDING_SCORING["clamp_min"], ONBOARDING_SCORING["clamp_max"])


def ingestion_setup_adjustment(record: Dict[str, Any], query_terms: Sequence[str], query: str, intent: str) -> float:
    terms = set(query_terms)
    if intent not in {"instrumentation", "general"} and not is_otlp_endpoint_setup_query(query_terms, query):
        return 0.0

    setup_query = is_otlp_endpoint_setup_query(query_terms, query) or bool(terms & {"ingestion", "collector", "otlp"})
    if not setup_query:
        return 0.0

    url = safe_lower(record.get("url"))
    title = safe_lower(record.get("title"))
    summary = safe_lower(record.get("summary"))
    body = safe_lower(record.get("body"))
    haystack = f"{url} {title} {summary} {body}"

    boost = 0.0

    if "/docs/ingestion/" in url:
        boost += INGESTION_SCORING["ingestion_docs"]
    if "/docs/opentelemetry-collection-agents/opentelemetry-collector/configuration" in url:
        boost += INGESTION_SCORING["collector_config"]
    elif "/docs/opentelemetry-collection-agents/" in url:
        boost += INGESTION_SCORING["collector_general"]
    if "/docs/instrumentation/" in url and "opentelemetry" in url:
        boost += INGESTION_SCORING["instrumentation_opentelemetry"]

    if "endpoint" in terms and ("otlp" in haystack or "endpoint" in haystack):
        boost += INGESTION_SCORING["endpoint_signal"]

    cloud_query = "cloud" in terms
    self_host_query = bool({"self", "selfhost", "self-hosted", "hosted"} & terms) and not cloud_query

    if cloud_query:
        if "/docs/ingestion/signoz-cloud/" in url:
            boost += INGESTION_SCORING["cloud_path_bonus"]
        if "/docs/ingestion/self-hosted/" in url:
            boost += INGESTION_SCORING["cloud_self_host_penalty"]
    if self_host_query:
        if "/docs/ingestion/self-hosted/" in url:
            boost += INGESTION_SCORING["self_host_path_bonus"]
        if "/docs/ingestion/signoz-cloud/" in url and "/docs/ingestion/cloud-vs-self-hosted" not in url:
            boost += INGESTION_SCORING["self_host_cloud_penalty"]

    if any(pattern in url for pattern in CLOUD_PROVIDER_DOC_PATTERNS) and not is_provider_monitoring_query(query_terms):
        boost += INGESTION_SCORING["cloud_provider_penalty"]

    return clamp(boost, INGESTION_SCORING["clamp_min"], INGESTION_SCORING["clamp_max"])


def token_specificity_adjustment(record: Dict[str, Any], query_terms: Sequence[str], query: str) -> float:
    terms = set(query_terms)
    if not terms:
        return 0.0

    url = safe_lower(record.get("url"))
    title = safe_lower(record.get("title"))
    summary = safe_lower(record.get("summary"))
    body = safe_lower(record.get("body"))
    source = str(record.get("source", "docs"))
    haystack = f"{url} {title} {summary} {body}"

    boost = 0.0

    if "nodejs" in terms:
        if "opentelemetry-nodejs" in url:
            boost += TOKEN_SPECIFICITY_SCORING["nodejs_bonus"]
        if "opentelemetry-nextjs" in url:
            boost += TOKEN_SPECIFICITY_SCORING["nextjs_penalty"]
        if "opentelemetry-nuxtjs" in url:
            boost += TOKEN_SPECIFICITY_SCORING["nuxtjs_penalty"]

    if is_api_auth_query(query_terms, query):
        if source == "api":
            if "header" in haystack or "signoz-api-key" in haystack or "authorization" in haystack:
                boost += TOKEN_SPECIFICITY_SCORING["api_auth_bonus"]
            if url.rstrip("/") == API_REFERENCE_URL.rstrip("/").lower():
                boost += TOKEN_SPECIFICITY_SCORING["api_reference_home_bonus"]
        else:
            boost += TOKEN_SPECIFICITY_SCORING["non_api_auth_penalty"]

    return clamp(boost, TOKEN_SPECIFICITY_SCORING["clamp_min"], TOKEN_SPECIFICITY_SCORING["clamp_max"])


def detect_intent(query_terms: Sequence[str], config: Dict[str, Any], query: str = "") -> str:
    intents = ["instrumentation", "api", "operations", "troubleshooting"]
    keywords = config.get("intent_keywords", {})

    scores = {intent: 0 for intent in intents}
    terms = list(query_terms)
    term_set = set(terms)
    query_text = " ".join(terms)

    if is_cloud_onboarding_query(terms, query):
        return "general"
    if is_otlp_endpoint_setup_query(terms, query):
        return "instrumentation"
    if bool(term_set & OTLP_SETUP_TERMS):
        has_explicit_api_signal = bool(term_set & API_EXPLICIT_TERMS) or query_has_phrase(
            query,
            ("api request", "api requests", "api endpoint", "signoz api"),
        )
        if not has_explicit_api_signal:
            return "instrumentation"
    if is_api_auth_query(terms, query):
        return "operations"

    def keyword_weight(raw_keyword: str) -> int:
        keyword = (raw_keyword or "").strip().lower()
        if not keyword:
            return 0

        key_terms = tokenize(keyword)
        if not key_terms:
            return 1 if keyword in query_text else 0

        if all(part in term_set for part in key_terms):
            return 2
        if len(key_terms) >= 2:
            # Avoid broad false positives from compound hints (e.g., "signoz-api-key")
            # when only one generic token overlaps.
            matches = sum(1 for part in key_terms if part in term_set)
            return 1 if matches >= 2 else 0
        if any(part in term_set for part in key_terms):
            return 1
        return 0

    for intent in intents:
        for token in keywords.get(intent, []):
            scores[intent] += keyword_weight(str(token))

    if scores["troubleshooting"] >= 2:
        # Keep explicit API-operation queries in operations intent even if they include
        # terms like "error" or "missing".
        explicit_operation_signals = {
            "operation",
            "operationid",
            "endpoint",
            "endpoints",
            "#/operations",
        }
        explicit_operation_query = bool(term_set & explicit_operation_signals)
        if explicit_operation_query and scores["operations"] >= 2:
            return "operations"
        if scores["operations"] >= 3 or (scores["api"] >= 3 and scores["operations"] >= 2):
            return "operations"
        return "troubleshooting"

    if scores["operations"] >= 2:
        if bool(set(terms) & OTLP_SETUP_TERMS):
            return "instrumentation"
        return "operations"
    if scores["api"] > 0:
        explicit_api_query = bool(term_set & API_EXPLICIT_TERMS)
        if explicit_api_query and scores["api"] >= scores["instrumentation"]:
            return "api"
        if scores["instrumentation"] > 0:
            return "instrumentation"
        if scores["troubleshooting"] > 0:
            return "troubleshooting"
        return "general"
    if scores["instrumentation"] > 0:
        return "instrumentation"
    if scores["troubleshooting"] > 0:
        return "troubleshooting"
    return "general"


def expand_terms(query_terms: Sequence[str], config: Dict[str, Any]) -> List[str]:
    synonyms = config.get("synonyms", {})
    expanded: List[str] = []
    seen: Set[str] = set()

    for term in query_terms:
        if term not in seen:
            expanded.append(term)
            seen.add(term)
        for alt in synonyms.get(term, []):
            alt_token = str(alt).lower()
            if alt_token not in seen:
                expanded.append(alt_token)
                seen.add(alt_token)
        for alt in COMPOUND_TERM_EXPANSIONS.get(term, ()):
            alt_token = str(alt).lower()
            if alt_token not in seen:
                expanded.append(alt_token)
                seen.add(alt_token)
    return expanded


def filter_query_terms(tokens: Sequence[str]) -> List[str]:
    filtered = [token for token in tokens if token not in STOPWORDS]
    if filtered:
        return filtered
    return list(tokens)


def lexical_match_score(record: Dict[str, Any], terms: Sequence[str]) -> float:
    title = safe_lower(record.get("title"))
    summary = safe_lower(record.get("summary"))
    url = safe_lower(record.get("url"))
    operation_id = safe_lower(record.get("operation_id"))
    slug = safe_lower(record.get("slug"))
    body = safe_lower(record.get("body"))

    title_tokens = set(tokenize(title.replace(".", " ")))
    summary_tokens = set(tokenize(summary.replace(".", " ")))
    slug_tokens = set(tokenize(slug.replace("/", " ")))
    operation_tokens = set(tokenize(operation_id.replace("_", " ").replace("-", " ")))
    url_tokens = set(URL_TOKEN_RE.findall(url))
    body_tokens = set(tokenize(body))

    score = 0.0
    for term in terms:
        token = term.strip().lower()
        if not token:
            continue
        weight = term_importance_weight(token)
        if weight <= 0:
            continue

        if token in title_tokens:
            score += 2.9 * weight
        elif token in title:
            score += 2.0 * weight

        if token in summary_tokens:
            score += 1.8 * weight
        elif token in summary:
            score += 1.2 * weight

        if token in slug_tokens:
            score += 2.2 * weight
        elif token in slug:
            score += 1.4 * weight

        if token in operation_tokens:
            score += 3.1 * weight
        elif token in operation_id:
            score += 2.2 * weight

        if token in url_tokens:
            score += 1.4 * weight
        elif token in url:
            score += 0.9 * weight

        if token in body_tokens:
            score += 0.25 * weight
    return score


def bm25_scores(
    docs: Sequence[Dict[str, Any]],
    query_terms: Sequence[str],
    field: str,
    *,
    k1: float = 1.5,
    b: float = 0.75,
) -> Dict[str, float]:
    tokenized: Dict[str, List[str]] = {}
    doc_freq: Dict[str, int] = {}
    doc_lengths: Dict[str, int] = {}

    for doc in docs:
        doc_id = doc["url"]
        tokens = tokenize(str(doc.get(field, "")))
        tokenized[doc_id] = tokens
        doc_lengths[doc_id] = len(tokens)
        for token in set(tokens):
            doc_freq[token] = doc_freq.get(token, 0) + 1

    n_docs = len(docs)
    avgdl = (sum(doc_lengths.values()) / n_docs) if n_docs else 1.0
    scores: Dict[str, float] = {}

    unique_terms = list(dict.fromkeys(query_terms))

    for doc in docs:
        doc_id = doc["url"]
        tokens = tokenized.get(doc_id, [])
        length = doc_lengths.get(doc_id, 0)
        tf_counts: Dict[str, int] = {}
        for token in tokens:
            tf_counts[token] = tf_counts.get(token, 0) + 1

        score = 0.0
        for term in unique_terms:
            tf = tf_counts.get(term, 0)
            if tf <= 0:
                continue
            df = doc_freq.get(term, 0)
            idf = math.log(1.0 + ((n_docs - df + 0.5) / (df + 0.5)))
            denom = tf + k1 * (1 - b + b * (length / avgdl if avgdl else 0.0))
            score += idf * ((tf * (k1 + 1)) / (denom if denom else 1.0))

        scores[doc_id] = score

    return scores


def normalize_score_map(raw: Dict[str, float]) -> Dict[str, float]:
    if not raw:
        return {}
    max_val = max(raw.values())
    if max_val <= 0:
        return {key: 0.0 for key in raw}
    return {key: val / max_val for key, val in raw.items()}


def exact_phrase_score(record: Dict[str, Any], phrase: str) -> float:
    if not phrase:
        return 0.0
    body = safe_lower(record.get("body"))
    title = safe_lower(record.get("title"))
    phrase = phrase.strip().lower()
    if not phrase:
        return 0.0
    if phrase in title:
        return 1.0
    if phrase in body:
        return 0.8
    parts = phrase.split()
    if len(parts) >= 2:
        bigram = " ".join(parts[:2])
        if bigram in title or bigram in body:
            return 0.4
    return 0.0


def intent_alignment_score(
    record: Dict[str, Any],
    intent: str,
    config: Dict[str, Any],
    query_terms: Sequence[str],
) -> float:
    if intent == "general":
        return INTENT_ALIGNMENT_SCORING["general_default"]

    source = str(record.get("source", ""))

    if intent in {"api", "operations"}:
        auth_query = bool(set(query_terms) & API_AUTH_TERMS)
        if source == "api":
            op_haystack = " ".join(
                [
                    safe_lower(record.get("operation_id")),
                    safe_lower(record.get("path")),
                    safe_lower(record.get("title")),
                    safe_lower(record.get("summary")),
                    safe_lower(record.get("body")),
                ]
            )
            generic = GENERIC_OPERATION_TERMS | {"create", "update"}
            terms = [term for term in query_terms if term and term not in generic]
            matches = sum(1 for term in terms if term in op_haystack)
            if auth_query and any(token in op_haystack for token in ("header", "signoz-api-key", "authorization")):
                return INTENT_ALIGNMENT_SCORING["api_auth_high"]
            if matches >= 2:
                return INTENT_ALIGNMENT_SCORING["api_matches_2plus"]
            if matches == 1:
                return INTENT_ALIGNMENT_SCORING["api_matches_1"]
            if auth_query and safe_lower(record.get("url")).rstrip("/") == API_REFERENCE_URL.rstrip("/").lower():
                return INTENT_ALIGNMENT_SCORING["api_auth_reference_home"]
            return INTENT_ALIGNMENT_SCORING["api_default"]
        # De-prioritize non-API pages for API-specific queries.
        if "/api-reference" in safe_lower(record.get("url")):
            return INTENT_ALIGNMENT_SCORING["api_reference_docs_hint"]
        if auth_query:
            return INTENT_ALIGNMENT_SCORING["api_auth_non_api"]
        return INTENT_ALIGNMENT_SCORING["api_non_api"]

    hints = [str(item).lower() for item in config.get("intent_url_hints", {}).get(intent, [])]
    haystack = " ".join(
        [
            safe_lower(record.get("url")),
            safe_lower(record.get("title")),
            safe_lower(record.get("summary")),
            safe_lower(record.get("operation_id")),
        ]
    )

    matches = sum(1 for hint in hints if hint and hint in haystack)
    if matches == 0:
        if intent in {"api", "operations"} and source == "api":
            return INTENT_ALIGNMENT_SCORING["api_or_operations_no_hints_api_source"]
        if intent == "instrumentation" and source == "docs":
            return INTENT_ALIGNMENT_SCORING["instrumentation_no_hints_docs_source"]
        return INTENT_ALIGNMENT_SCORING["no_hints_default"]
    return clamp(
        INTENT_ALIGNMENT_SCORING["hint_base"] + INTENT_ALIGNMENT_SCORING["hint_step"] * matches,
        0.0,
        INTENT_ALIGNMENT_SCORING["hint_cap"],
    )


def source_boost_score(record: Dict[str, Any], intent: str, config: Dict[str, Any]) -> float:
    source = str(record.get("source", "docs"))
    boost_table = config.get("source_boosts", {})
    intent_map = boost_table.get(intent) or boost_table.get("general") or {}
    value = float(intent_map.get(source, 0.5))
    return max(0.0, min(1.0, value))


def troubleshooting_domain_boost(record: Dict[str, Any], query_terms: Sequence[str], intent: str) -> float:
    if intent != "troubleshooting":
        return 0.0

    terms = set(query_terms)
    url = safe_lower(record.get("url"))
    source = str(record.get("source", "docs"))
    haystack = " ".join(
        [
            url,
            safe_lower(record.get("title")),
            safe_lower(record.get("summary")),
            safe_lower(record.get("body")),
        ]
    )

    boost = 0.0

    if terms & TROUBLESHOOTING_TERMS:
        if "/troubleshooting" in url or "/faq" in url or " troubleshooting " in f" {haystack} ":
            boost += TROUBLESHOOTING_SCORING["intent_term_match"]

    def add_if_match(term_group: Set[str], strong_patterns: Sequence[str], weak_patterns: Sequence[str]) -> None:
        nonlocal boost
        if not (terms & term_group):
            return
        if any(pattern in url for pattern in strong_patterns):
            boost += TROUBLESHOOTING_SCORING["strong_domain_match"]
            return
        if any(pattern in url for pattern in weak_patterns):
            boost += TROUBLESHOOTING_SCORING["weak_domain_match"]

    add_if_match(
        {"logs", "log"},
        [
            "/docs/logs-management/troubleshooting",
            "/docs/logs-management/troubleshooting/faqs",
            "/docs/userguide/search-troubleshooting",
        ],
        ["/docs/logs-management/troubleshooting"],
    )
    add_if_match(
        {"metrics", "metric"},
        ["/docs/metrics-management/troubleshooting"],
        ["/docs/metrics-management/"],
    )
    add_if_match(
        {"dashboards", "dashboard"},
        ["/docs/dashboards/troubleshooting"],
        ["/docs/dashboards/"],
    )
    add_if_match(
        {"traces", "trace"},
        ["/docs/traces-management/troubleshooting"],
        ["/docs/traces-management/"],
    )
    add_if_match(
        {"alerts", "alert"},
        ["/docs/alerts-management/troubleshooting"],
        ["/docs/alerts-management/"],
    )
    add_if_match(
        {"clickhouse", "query"},
        [
            "/docs/userguide/query-troubleshooting-faqs",
            "/docs/operate/clickhouse",
            "/docs/userguide/logs_clickhouse_queries",
        ],
        ["/docs/operate/clickhouse", "/docs/userguide/"],
    )
    add_if_match(
        {"aws"},
        ["/docs/aws-monitoring/troubleshooting"],
        ["/docs/aws-monitoring/"],
    )

    domain_terms: Dict[str, Set[str]] = {
        "logs": {"logs", "log"},
        "metrics": {"metrics", "metric"},
        "dashboards": {"dashboards", "dashboard"},
        "traces": {"traces", "trace"},
        "alerts": {"alerts", "alert"},
        "clickhouse": {"clickhouse", "query"},
        "aws": {"aws"},
    }
    domain_patterns: Dict[str, Sequence[str]] = {
        "logs": [
            "/docs/logs-management/troubleshooting",
            "/docs/logs-management/troubleshooting/faqs",
            "/docs/userguide/search-troubleshooting",
        ],
        "metrics": ["/docs/metrics-management/"],
        "dashboards": ["/docs/dashboards/"],
        "traces": ["/docs/traces-management/"],
        "alerts": ["/docs/alerts-management/"],
        "clickhouse": [
            "/docs/operate/clickhouse",
            "/docs/integrations/clickhouse",
            "/docs/userguide/query-troubleshooting-faqs",
            "/docs/userguide/logs_clickhouse_queries",
        ],
        "aws": ["/docs/aws-monitoring/"],
    }

    active_domains = [name for name, keys in domain_terms.items() if terms & keys]
    if active_domains:
        matches_active = any(any(pattern in url for pattern in domain_patterns[name]) for name in active_domains)
        if matches_active:
            boost += TROUBLESHOOTING_SCORING["active_domain_match"]
        else:
            # Domain-specific troubleshooting questions should avoid generic pages.
            boost += TROUBLESHOOTING_SCORING["active_domain_miss"]
            if "/docs/faqs/troubleshooting" in url:
                boost += TROUBLESHOOTING_SCORING["generic_faq_penalty"]
            elif "/troubleshooting" in url or "/faq" in url:
                boost += TROUBLESHOOTING_SCORING["generic_troubleshooting_penalty"]

            matches_other = any(
                any(pattern in url for pattern in domain_patterns[name])
                for name in domain_patterns
                if name not in active_domains
            )
            if matches_other:
                boost += TROUBLESHOOTING_SCORING["other_domain_penalty"]

        # Keep troubleshooting results tightly in-domain when the query is explicit.
        if "logs" in active_domains and not any(pattern in url for pattern in domain_patterns["logs"]):
            boost += TROUBLESHOOTING_SCORING["logs_out_of_domain_penalty"]
            if "/docs/alerts-management/" in url or "/docs/migration/" in url:
                boost += TROUBLESHOOTING_SCORING["logs_alerts_or_migration_penalty"]
        if "traces" in active_domains and not any(pattern in url for pattern in domain_patterns["traces"]):
            boost += TROUBLESHOOTING_SCORING["traces_out_of_domain_penalty"]

    # Troubleshooting intent should generally prioritize docs pages over API operations.
    if source == "api":
        boost += TROUBLESHOOTING_SCORING["api_source_penalty"]

    failure_query = bool(terms & FAILURE_QUERY_TERMS)
    explicit_send_logs_query = bool(terms & SEND_LOG_TERMS)
    if failure_query and not explicit_send_logs_query and "/send-logs/" in url:
        boost += TROUBLESHOOTING_SCORING["send_logs_failure_penalty"]

    return clamp(boost, TROUBLESHOOTING_SCORING["clamp_min"], TROUBLESHOOTING_SCORING["clamp_max"])


def operation_specificity_adjustment(record: Dict[str, Any], intent: str, query_terms: Sequence[str]) -> float:
    if intent not in {"api", "operations"}:
        return 0.0
    if str(record.get("source", "")) != "api":
        return 0.0

    op_id = safe_lower(record.get("operation_id"))
    path = safe_lower(record.get("path"))
    title = safe_lower(record.get("title"))
    summary = safe_lower(record.get("summary"))
    url = safe_lower(record.get("url"))
    method = safe_lower(record.get("method"))
    terms_set = set(query_terms)
    auth_query = bool(terms_set & API_AUTH_TERMS)

    specific_terms = [term for term in query_terms if term and term not in GENERIC_OPERATION_TERMS]
    action_intents = detect_action_intents(query_terms)

    if op_id:
        haystack = " ".join([op_id, path, title, summary])
        matches = sum(1 for term in specific_terms if term in haystack)
        action_bonus = 0.0
        if auth_query and any(token in haystack for token in ("header", "signoz-api-key", "authorization")):
            action_bonus += OPERATION_SPECIFICITY_SCORING["auth_term_bonus"]

        if action_intents:
            expected_methods: Set[str] = set()
            for action in action_intents:
                expected_methods.update(ACTION_TO_METHODS.get(action, set()))

            if method and method in expected_methods:
                action_bonus += OPERATION_SPECIFICITY_SCORING["expected_method_bonus"]
            elif method and expected_methods:
                action_bonus += OPERATION_SPECIFICITY_SCORING["unexpected_method_penalty"]

            action_matches = sum(1 for action in action_intents if action in haystack)
            if action_matches > 0:
                action_bonus += min(
                    OPERATION_SPECIFICITY_SCORING["action_match_cap"],
                    OPERATION_SPECIFICITY_SCORING["action_match_step"] * action_matches,
                )
            else:
                action_bonus += OPERATION_SPECIFICITY_SCORING["action_miss_penalty"]

        if matches >= 2:
            return OPERATION_SPECIFICITY_SCORING["matches_2plus_base"] + action_bonus
        if matches == 1:
            return OPERATION_SPECIFICITY_SCORING["matches_1_base"] + action_bonus
        return OPERATION_SPECIFICITY_SCORING["matches_0_base"] + action_bonus

    if url.rstrip("/") == API_REFERENCE_URL.rstrip("/").lower():
        if auth_query:
            return OPERATION_SPECIFICITY_SCORING["api_reference_home_auth"]
        if specific_terms:
            return OPERATION_SPECIFICITY_SCORING["api_reference_home_specific_terms"]
        return OPERATION_SPECIFICITY_SCORING["api_reference_home_default"]

    return 0.0


def build_snippet(text: str, terms: Sequence[str], max_chars: int = 220) -> str:
    if not text:
        return ""

    clean = re.sub(r"\s+", " ", text).strip()
    if not clean:
        return ""

    lowered = clean.lower()
    best_idx = -1

    for term in terms:
        idx = lowered.find(term.lower())
        if idx != -1 and (best_idx == -1 or idx < best_idx):
            best_idx = idx

    if best_idx == -1:
        snippet = clean[:max_chars]
        return snippet + ("..." if len(clean) > max_chars else "")

    start = max(0, best_idx - (max_chars // 3))
    end = min(len(clean), start + max_chars)
    snippet = clean[start:end].strip()
    if start > 0:
        snippet = "..." + snippet
    if end < len(clean):
        snippet = snippet + "..."
    return snippet


def build_reason(
    record: Dict[str, Any],
    matched_terms: Sequence[str],
    exact_phrase: float,
    intent_boost: float,
    source_boost: float,
    intent: str,
    troubleshooting_boost: float,
) -> str:
    reasons: List[str] = []

    if matched_terms:
        reasons.append("matched terms: " + ", ".join(matched_terms[:4]))
    if exact_phrase >= 0.8:
        reasons.append("exact phrase match")
    elif exact_phrase >= 0.4:
        reasons.append("partial phrase match")

    if intent != "general" and intent_boost >= 0.7:
        reasons.append(f"strong {intent} intent alignment")

    if source_boost >= 0.85:
        reasons.append(f"preferred {record.get('source', 'docs')} source for this intent")
    if troubleshooting_boost >= 0.8:
        reasons.append("strong troubleshooting-context match")

    if not reasons:
        reasons.append("relevant lexical match")

    return "; ".join(reasons)


def compose_record_views(
    catalog: Dict[str, Any],
    content_rows: Dict[str, Dict[str, Any]],
    api_rows: Dict[str, Dict[str, Any]],
    include_sources: Set[str],
) -> List[Dict[str, Any]]:
    views: List[Dict[str, Any]] = []

    for row in catalog.get("records", []):
        source = str(row.get("source", "")).strip()
        if source not in include_sources:
            continue

        url = str(row.get("url", "")).strip()
        if not url:
            continue

        view: Dict[str, Any] = {
            "source": source,
            "url": url,
            "slug": row.get("slug") or slug_from_url(url),
            "title": row.get("title") or fallback_title_for_url(url, source),
            "summary": row.get("summary") or "",
            "operation_id": row.get("operation_id") or "",
            "path": row.get("path") or "",
            "method": row.get("method") or "",
            "body": "",
        }

        if source == "docs":
            content = content_rows.get(url)
            if content:
                view["title"] = content.get("title") or view["title"]
                view["body"] = content.get("text") or ""
                view["summary"] = content.get("text", "")[:280]
        elif source == "api":
            api = api_rows.get(url)
            if api:
                view["title"] = api.get("title") or view["title"]
                view["summary"] = api.get("summary") or view["summary"]
                view["operation_id"] = api.get("operation_id") or view["operation_id"]
                view["path"] = api.get("path") or view["path"]
                view["method"] = api.get("method") or view["method"]
                view["body"] = api.get("text") or ""

        if not view["body"]:
            fallback = " ".join(
                [
                    str(view.get("title", "")),
                    str(view.get("summary", "")),
                    str(view.get("slug", "")),
                    str(view.get("operation_id", "")),
                    str(view.get("path", "")),
                ]
            )
            view["body"] = fallback

        views.append(view)

    dedup: Dict[str, Dict[str, Any]] = {}
    for record in views:
        dedup[record["url"]] = record
    return [dedup[url] for url in sorted(dedup.keys())]


def topic_alignment_score(
    record: Dict[str, Any],
    query_terms: Sequence[str],
    query: str,
    intent: str,
) -> float:
    url = safe_lower(record.get("url"))
    title = safe_lower(record.get("title"))
    summary = safe_lower(record.get("summary"))
    body = safe_lower(record.get("body"))
    source = str(record.get("source", "docs"))
    haystack = f"{title} {summary} {body} {url}"
    terms = set(query_terms)

    meaningful_terms = [term for term in query_terms if term not in STOPWORDS and term not in {"signoz", "docs"}]
    if not meaningful_terms:
        meaningful_terms = list(query_terms)

    matched = sum(1 for term in meaningful_terms if term and term in haystack)
    coverage = matched / max(1, len(meaningful_terms))
    score = TOPIC_ALIGNMENT_SCORING["base"] + TOPIC_ALIGNMENT_SCORING["coverage_multiplier"] * min(1.0, coverage)

    if intent in {"api", "operations"} and source == "api":
        score += TOPIC_ALIGNMENT_SCORING["api_source_bonus"]
    if intent == "troubleshooting" and ("/troubleshooting" in url or "/faq" in url):
        score += TOPIC_ALIGNMENT_SCORING["troubleshooting_url_bonus"]

    if is_otlp_endpoint_setup_query(query_terms, query):
        if "/docs/ingestion/" in url or "/docs/opentelemetry-collection-agents/" in url:
            score += TOPIC_ALIGNMENT_SCORING["otlp_relevant_bonus"]

    if is_api_auth_query(query_terms, query):
        if source == "api" and any(token in haystack for token in ("header", "signoz-api-key", "authorization")):
            score += TOPIC_ALIGNMENT_SCORING["api_auth_bonus"]
        elif source != "api":
            score += TOPIC_ALIGNMENT_SCORING["api_auth_non_api_penalty"]

    if is_cloud_onboarding_query(query_terms, query):
        if "/docs/cloud/quickstart" in url:
            score += TOPIC_ALIGNMENT_SCORING["cloud_quickstart_bonus"]
        elif url.rstrip("/") == "https://signoz.io/docs/cloud":
            score += TOPIC_ALIGNMENT_SCORING["cloud_home_bonus"]
        elif "/docs/what-is-signoz" in url or "/docs/introduction" in url:
            score += TOPIC_ALIGNMENT_SCORING["cloud_intro_bonus"]

    failure_query = bool(terms & FAILURE_QUERY_TERMS)
    explicit_send_logs_query = bool(terms & SEND_LOG_TERMS)
    if failure_query and not explicit_send_logs_query and "/send-logs/" in url:
        score += TOPIC_ALIGNMENT_SCORING["send_logs_failure_penalty"]

    return clamp(score, TOPIC_ALIGNMENT_SCORING["clamp_min"], TOPIC_ALIGNMENT_SCORING["clamp_max"])


def calibrate_confidence(rows: List[Dict[str, Any]]) -> None:
    if not rows:
        return

    top_score = float(rows[0].get("score", 0.0))
    second_score = float(rows[1].get("score", 0.0)) if len(rows) > 1 else 0.0
    top_gap = max(0.0, top_score - second_score)
    top_gap_norm = min(1.0, top_gap / CONFIDENCE_SCORING["top_gap_norm_divisor"])

    for idx, row in enumerate(rows):
        base = clamp(float(row.get("score", 0.0)), 0.0, 1.0)
        topic = clamp(float(row.pop("_topic_alignment", 0.5)), 0.0, 1.0)

        confidence = CONFIDENCE_SCORING["base_weight"] * base + CONFIDENCE_SCORING["topic_weight"] * topic
        if idx == 0:
            confidence += CONFIDENCE_SCORING["top_gap_weight"] * top_gap_norm
        else:
            relative_drop = clamp(
                (top_score - float(row.get("score", 0.0))) / CONFIDENCE_SCORING["relative_drop_divisor"],
                0.0,
                1.0,
            )
            confidence -= CONFIDENCE_SCORING["relative_drop_penalty"] * relative_drop

        confidence -= min(
            CONFIDENCE_SCORING["rank_penalty_cap"],
            CONFIDENCE_SCORING["rank_penalty_step"] * idx,
        )
        row["confidence"] = round(clamp(confidence, 0.0, 1.0), 4)


def rank_results(
    records: Sequence[Dict[str, Any]],
    query: str,
    intent: str,
    config: Dict[str, Any],
    k: int,
) -> List[Dict[str, Any]]:
    query_terms = filter_query_terms(tokenize(query))
    expanded_terms = expand_terms(query_terms, config)
    setup_query = is_otlp_endpoint_setup_query(expanded_terms, query)

    lexical_rows = []
    for record in records:
        lexical = lexical_match_score(record, expanded_terms)
        lexical_rows.append((lexical, record))

    lexical_rows.sort(key=lambda item: (-item[0], item[1]["url"]))

    candidate_pool_size = max(80, k * 12)
    candidates = [row for _, row in lexical_rows[:candidate_pool_size]]

    if intent in {"api", "operations"}:
        api_candidates = [row for _, row in lexical_rows if row.get("source") == "api"][: max(30, k * 5)]
        existing_urls = {row["url"] for row in candidates}
        for row in api_candidates:
            if row["url"] not in existing_urls:
                candidates.append(row)
                existing_urls.add(row["url"])

    if intent == "instrumentation":
        docs_candidates = [row for _, row in lexical_rows if row.get("source") == "docs"][: max(30, k * 5)]
        existing_urls = {row["url"] for row in candidates}
        for row in docs_candidates:
            if row["url"] not in existing_urls:
                candidates.append(row)
                existing_urls.add(row["url"])

    if setup_query:
        ingestion_candidates = [
            row
            for _, row in lexical_rows
            if row.get("source") == "docs"
            and (
                "/docs/ingestion/" in safe_lower(row.get("url"))
                or "/docs/opentelemetry-collection-agents/" in safe_lower(row.get("url"))
                or "/docs/instrumentation/" in safe_lower(row.get("url"))
            )
        ][: max(50, k * 8)]
        existing_urls = {row["url"] for row in candidates}
        for row in ingestion_candidates:
            if row["url"] not in existing_urls:
                candidates.append(row)
                existing_urls.add(row["url"])

    if intent == "troubleshooting":
        trouble_docs = [
            row
            for _, row in lexical_rows
            if row.get("source") == "docs"
            and (
                "troubleshooting" in safe_lower(row.get("url"))
                or "/faq" in safe_lower(row.get("url"))
                or "troubleshooting" in safe_lower(row.get("title"))
            )
        ][: max(50, k * 8)]
        existing_urls = {row["url"] for row in candidates}
        for row in trouble_docs:
            if row["url"] not in existing_urls:
                candidates.append(row)
                existing_urls.add(row["url"])

    bm25_body_raw = bm25_scores(candidates, expanded_terms, "body")
    bm25_title_raw = bm25_scores(candidates, expanded_terms, "title")
    bm25_body = normalize_score_map(bm25_body_raw)
    bm25_title = normalize_score_map(bm25_title_raw)

    query_phrase = " ".join(query_terms)
    ranked: List[Dict[str, Any]] = []

    for record in candidates:
        url = record["url"]
        body_text = str(record.get("body", ""))
        title_text = str(record.get("title", ""))

        phrase_score = exact_phrase_score(record, query_phrase)
        intent_boost = intent_alignment_score(record, intent, config, expanded_terms)
        source_boost = source_boost_score(record, intent, config)
        troubleshooting_boost = troubleshooting_domain_boost(record, expanded_terms, intent)
        operation_boost = operation_specificity_adjustment(record, intent, expanded_terms)
        onboarding_boost = onboarding_relevance_adjustment(record, expanded_terms, query)
        ingestion_boost = ingestion_setup_adjustment(record, expanded_terms, query, intent)
        specificity_boost = token_specificity_adjustment(record, expanded_terms, query)
        topic_alignment = topic_alignment_score(record, expanded_terms, query, intent)

        troubleshooting_component = clamp(
            troubleshooting_boost,
            FINAL_COMPONENT_CLAMPS["troubleshooting_boost"]["min"],
            FINAL_COMPONENT_CLAMPS["troubleshooting_boost"]["max"],
        )
        final_score = (
            RANKING_COMPONENT_WEIGHTS["bm25_body"] * bm25_body.get(url, 0.0)
            + RANKING_COMPONENT_WEIGHTS["bm25_title"] * bm25_title.get(url, 0.0)
            + RANKING_COMPONENT_WEIGHTS["exact_phrase"] * phrase_score
            + RANKING_COMPONENT_WEIGHTS["intent_alignment"] * intent_boost
            + RANKING_COMPONENT_WEIGHTS["source_boost"] * source_boost
            + RANKING_COMPONENT_WEIGHTS["troubleshooting_boost"] * troubleshooting_component
            + RANKING_COMPONENT_WEIGHTS["operation_boost"] * operation_boost
            + RANKING_COMPONENT_WEIGHTS["onboarding_boost"] * onboarding_boost
            + RANKING_COMPONENT_WEIGHTS["ingestion_boost"] * ingestion_boost
            + RANKING_COMPONENT_WEIGHTS["specificity_boost"] * specificity_boost
        )

        combined_text = f"{title_text} {body_text}".lower()
        matched_terms = [term for term in expanded_terms if term in combined_text]
        matched_terms = list(dict.fromkeys(matched_terms))

        snippet = build_snippet(body_text, expanded_terms)
        reason = build_reason(
            record,
            matched_terms,
            phrase_score,
            intent_boost,
            source_boost,
            intent,
            troubleshooting_boost,
        )

        ranked.append(
            {
                "url": url,
                "title": title_text or fallback_title_for_url(url, str(record.get("source", "docs"))),
                "source": record.get("source", "docs"),
                "score": round(final_score, 6),
                "why": reason,
                "snippet": snippet,
                "matched_terms": matched_terms[:10],
                "_topic_alignment": round(topic_alignment, 6),
            }
        )

    ranked.sort(key=lambda row: (-row["score"], row["url"]))

    deduped: List[Dict[str, Any]] = []
    seen_urls: Set[str] = set()
    for row in ranked:
        if row["url"] in seen_urls:
            continue
        deduped.append(row)
        seen_urls.add(row["url"])
        if len(deduped) >= k:
            break

    for idx, row in enumerate(deduped, start=1):
        row["rank"] = idx

    calibrate_confidence(deduped)

    return deduped


def render_markdown(payload: Dict[str, Any]) -> str:
    lines: List[str] = []
    lines.append(f"Query: {payload['query']}")
    lines.append(f"Intent: {payload['intent']}")
    lines.append("")

    results = payload.get("results", [])
    if not results:
        lines.append("No results found.")
        return "\n".join(lines)

    for row in results:
        lines.append(
            f"{row['rank']}. [{row['title']}]({row['url']}) (`{row['source']}` | score {row['score']:.3f} | confidence {row['confidence']:.2f})"
        )
        lines.append(f"   Why: {row['why']}")
        if row.get("snippet"):
            lines.append(f"   Snippet: {row['snippet']}")
        lines.append("")

    if payload.get("warnings"):
        lines.append("Warnings:")
        for warning in payload["warnings"]:
            lines.append(f"- {warning}")

    return "\n".join(lines).rstrip() + "\n"


def validate_args(args: argparse.Namespace) -> None:
    if not args.query or not args.query.strip():
        raise ValueError("--query is required and cannot be empty")
    if args.k <= 0:
        raise ValueError("--k must be >= 1")


def parse_args(argv: Optional[Sequence[str]] = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        prog="find_signoz_docs.py",
        description="Search and rank SigNoz docs + API reference resources",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent(
            """
            Examples:
              python3 find_signoz_docs.py --query "instrument nodejs with otlp" --k 8 --format markdown
              python3 find_signoz_docs.py --query "list dashboards api" --format json --intent api
            """
        ),
    )
    parser.add_argument("--query", required=True, help="Search query")
    parser.add_argument("--k", type=int, default=8, help="Number of results to return (default: 8)")
    parser.add_argument("--format", choices=["json", "markdown"], default="markdown", help="Output format")
    parser.add_argument(
        "--refresh",
        choices=["auto", "force", "off"],
        default="auto",
        help="Refresh mode: auto (conditional), force (full source refresh), off (cache only)",
    )
    parser.add_argument(
        "--intent",
        choices=["auto", "instrumentation", "api", "operations", "troubleshooting", "general"],
        default="auto",
        help="Intent override",
    )
    parser.add_argument(
        "--include-sources",
        default="docs,api",
        help="Comma-separated source filter: docs,api",
    )
    return parser.parse_args(argv)


def main(argv: Optional[Sequence[str]] = None) -> int:
    args = parse_args(argv)
    try:
        validate_args(args)
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    CACHE_DIR.mkdir(parents=True, exist_ok=True)

    include_sources: Set[str]
    try:
        include_sources = parse_include_sources(args.include_sources)
    except ValueError as exc:
        print(str(exc), file=sys.stderr)
        return 2

    script_dir = Path(__file__).resolve().parent
    config_path = script_dir.parent / "references" / "query_intents.json"
    config = load_query_config(config_path)

    warnings: List[str] = []

    state = load_state()
    catalog = load_catalog()

    refresh_mode = args.refresh
    if refresh_mode == "force":
        if "docs" in include_sources:
            state["sources"]["sitemap"].pop("etag", None)
            state["sources"]["sitemap"].pop("last_modified", None)
        if "api" in include_sources:
            state["sources"]["api_spec"].pop("etag", None)
            state["sources"]["api_spec"].pop("last_modified", None)

    if "docs" in include_sources:
        update_docs_catalog(catalog, state, refresh_mode, warnings)

    api_rows = read_jsonl(API_INDEX_PATH)
    if "api" in include_sources:
        api_rows = update_api_index(state, refresh_mode, warnings)
        if not api_rows:
            api_rows = read_jsonl(API_INDEX_PATH)
    api_map = index_by_url(api_rows)

    if "api" in include_sources:
        sync_catalog_with_api(catalog, api_rows)
    catalog["generated_at"] = iso_now()

    content_rows = read_jsonl(CONTENT_INDEX_PATH)
    content_map = index_by_url(content_rows)

    records_pre = compose_record_views(catalog, content_map, api_map, include_sources)

    query_terms = tokenize(args.query)
    expanded_terms = expand_terms(query_terms, config)

    detected_intent = detect_intent(query_terms, config, args.query)
    effective_intent = detected_intent if args.intent == "auto" else args.intent

    lexical_sorted = sorted(
        records_pre,
        key=lambda rec: (-lexical_match_score(rec, expanded_terms), rec["url"]),
    )

    prefetch_n = max(16, args.k * 4)
    prefetch_docs = [row["url"] for row in lexical_sorted[:prefetch_n] if row.get("source") == "docs"]

    hydrate_candidate_docs(prefetch_docs, content_map, refresh_mode, warnings)

    records = compose_record_views(catalog, content_map, api_map, include_sources)
    results = rank_results(records, args.query, effective_intent, config, args.k)

    # Update docs catalog metadata from hydrated content
    if catalog.get("records"):
        unique_content_meta = {
            str(row.get("url", "")).strip(): row
            for row in content_map.values()
            if str(row.get("url", "")).strip()
        }
        content_meta = index_by_url(list(unique_content_meta.values()))
        for row in catalog["records"]:
            if row.get("source") != "docs":
                continue
            url = row.get("url")
            meta = content_meta.get(url)
            if not meta:
                continue
            row["title"] = meta.get("title") or row.get("title")
            row["checked_at"] = meta.get("checked_at") or row.get("checked_at")
            row["fetched_at"] = meta.get("fetched_at") or row.get("fetched_at")
            row["etag"] = meta.get("etag") or row.get("etag")
            row["last_modified"] = meta.get("last_modified") or row.get("last_modified")
            row["content_hash"] = meta.get("content_hash") or row.get("content_hash")

    payload = {
        "query": args.query,
        "intent": effective_intent,
        "generated_at": iso_now(),
        "results": [
            {
                "rank": row["rank"],
                "title": row["title"],
                "url": row["url"],
                "source": row["source"],
                "score": row["score"],
                "confidence": row["confidence"],
                "why": row["why"],
                "snippet": row["snippet"],
                "matched_terms": row["matched_terms"],
            }
            for row in results
        ],
    }

    if warnings:
        payload["warnings"] = warnings

    write_json(STATE_PATH, state)
    write_json(CATALOG_PATH, catalog)
    unique_content_rows = {
        str(row.get("url", "")).strip(): row
        for row in content_map.values()
        if str(row.get("url", "")).strip()
    }
    write_jsonl(CONTENT_INDEX_PATH, list(unique_content_rows.values()))
    if "api" in include_sources and api_rows:
        write_jsonl(API_INDEX_PATH, api_rows)

    if args.format == "json":
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        print(render_markdown(payload), end="")

    if warnings:
        for warning in warnings:
            print(f"[warn] {warning}", file=sys.stderr)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
