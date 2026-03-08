"""Centralized scoring knobs for find_signoz_docs.py.

Keep numeric tuning values in this module so ranking behavior is easier to audit
and tune against the eval suite.
"""

from __future__ import annotations

from typing import Dict, Final


def clamp(value: float, low: float, high: float) -> float:
    return max(low, min(high, value))


RANKING_COMPONENT_WEIGHTS: Final[Dict[str, float]] = {
    "bm25_body": 0.40,
    "bm25_title": 0.23,
    "exact_phrase": 0.14,
    "intent_alignment": 0.10,
    "source_boost": 0.05,
    "troubleshooting_boost": 0.20,
    "operation_boost": 0.20,
    "onboarding_boost": 0.18,
    "ingestion_boost": 0.20,
    "specificity_boost": 0.18,
}

FINAL_COMPONENT_CLAMPS: Final[Dict[str, Dict[str, float]]] = {
    "troubleshooting_boost": {"min": -1.5, "max": 1.5},
}

CONFIDENCE_SCORING: Final[Dict[str, float]] = {
    "base_weight": 0.45,
    "topic_weight": 0.45,
    "top_gap_weight": 0.10,
    "top_gap_norm_divisor": 0.35,
    "relative_drop_penalty": 0.08,
    "relative_drop_divisor": 0.5,
    "rank_penalty_step": 0.04,
    "rank_penalty_cap": 0.22,
}

ONBOARDING_SCORING: Final[Dict[str, float]] = {
    "cloud_quickstart": 1.6,
    "cloud_home": 1.35,
    "what_is_signoz": 1.15,
    "introduction": 0.95,
    "cloud_ingestion_overview": 0.7,
    "cloud_provider_penalty": -0.95,
    "self_host_install": 1.55,
    "self_host_docker": 1.3,
    "self_host_kubernetes": 1.2,
    "self_host_cloud_provider_penalty": -0.55,
    "clamp_min": -1.5,
    "clamp_max": 1.8,
}

INGESTION_SCORING: Final[Dict[str, float]] = {
    "ingestion_docs": 1.2,
    "collector_config": 1.5,
    "collector_general": 0.85,
    "instrumentation_opentelemetry": 0.45,
    "endpoint_signal": 0.35,
    "cloud_path_bonus": 0.75,
    "cloud_self_host_penalty": -0.45,
    "self_host_path_bonus": 0.9,
    "self_host_cloud_penalty": -1.0,
    "cloud_provider_penalty": -1.6,
    "clamp_min": -2.0,
    "clamp_max": 2.0,
}

TOKEN_SPECIFICITY_SCORING: Final[Dict[str, float]] = {
    "nodejs_bonus": 1.35,
    "nextjs_penalty": -1.2,
    "nuxtjs_penalty": -0.75,
    "api_auth_bonus": 0.95,
    "api_reference_home_bonus": 0.45,
    "non_api_auth_penalty": -0.45,
    "clamp_min": -2.0,
    "clamp_max": 2.0,
}

INTENT_ALIGNMENT_SCORING: Final[Dict[str, float]] = {
    "general_default": 0.6,
    "api_auth_high": 1.7,
    "api_matches_2plus": 1.6,
    "api_matches_1": 1.3,
    "api_auth_reference_home": 1.0,
    "api_default": 0.7,
    "api_reference_docs_hint": 0.45,
    "api_auth_non_api": 0.05,
    "api_non_api": 0.1,
    "api_or_operations_no_hints_api_source": 0.7,
    "instrumentation_no_hints_docs_source": 0.6,
    "no_hints_default": 0.2,
    "hint_base": 0.45,
    "hint_step": 0.2,
    "hint_cap": 1.0,
}

TROUBLESHOOTING_SCORING: Final[Dict[str, float]] = {
    "intent_term_match": 1.0,
    "strong_domain_match": 1.2,
    "weak_domain_match": 0.55,
    "active_domain_match": 1.35,
    "active_domain_miss": -0.35,
    "generic_faq_penalty": -1.2,
    "generic_troubleshooting_penalty": -0.45,
    "other_domain_penalty": -1.0,
    "logs_out_of_domain_penalty": -1.2,
    "logs_alerts_or_migration_penalty": -0.85,
    "traces_out_of_domain_penalty": -0.75,
    "api_source_penalty": -0.35,
    "send_logs_failure_penalty": -1.25,
    "clamp_min": -2.0,
    "clamp_max": 2.0,
}

OPERATION_SPECIFICITY_SCORING: Final[Dict[str, float]] = {
    "auth_term_bonus": 0.85,
    "expected_method_bonus": 0.9,
    "unexpected_method_penalty": -0.5,
    "action_match_step": 0.2,
    "action_match_cap": 0.4,
    "action_miss_penalty": -0.2,
    "matches_2plus_base": 1.1,
    "matches_1_base": 0.75,
    "matches_0_base": 0.25,
    "api_reference_home_auth": 0.75,
    "api_reference_home_specific_terms": -1.1,
    "api_reference_home_default": -0.25,
}

TOPIC_ALIGNMENT_SCORING: Final[Dict[str, float]] = {
    "base": 0.2,
    "coverage_multiplier": 0.55,
    "api_source_bonus": 0.14,
    "troubleshooting_url_bonus": 0.2,
    "otlp_relevant_bonus": 0.36,
    "api_auth_bonus": 0.4,
    "api_auth_non_api_penalty": -0.22,
    "cloud_quickstart_bonus": 0.35,
    "cloud_home_bonus": 0.3,
    "cloud_intro_bonus": 0.25,
    "send_logs_failure_penalty": -0.25,
    "clamp_min": 0.0,
    "clamp_max": 1.0,
}
