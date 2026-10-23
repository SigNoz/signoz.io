// Mirrors the "Available Tools" table in data/docs/ai/signoz-mcp-server.mdx.
export const MCP_SERVER_TOOLS: { name: string; description: string }[] = [
  {
    name: 'signoz_get_org_overview',
    description: 'Get the current status and overall posture of your SigNoz deployment',
  },
  {
    name: 'signoz_list_metrics',
    description:
      'Discover active metric names and catalog metadata such as type, temporality, and unit',
  },
  {
    name: 'signoz_query_metrics',
    description:
      'Query a known metric for values, trends, breakdowns, or formulas with metric-aware defaults',
  },
  {
    name: 'signoz_get_top_metrics',
    description:
      'Return top 100 metrics ranked by ingested sample volume with percentages for cost and volume analysis',
  },
  {
    name: 'signoz_check_metric_usage',
    description:
      'Given a list of metric names (up to 50 per call), return which dashboards and alerts reference each one',
  },
  {
    name: 'signoz_check_metric_cardinality',
    description:
      'Return label/attribute keys for a single metric with cardinality counts and sample values, sorted highest-cardinality first',
  },
  {
    name: 'signoz_get_field_keys',
    description: 'Discover available field keys for metrics, traces, or logs',
  },
  { name: 'signoz_get_field_values', description: 'Get possible values for a field key' },
  {
    name: 'signoz_list_alerts',
    description: 'List firing, silenced, or inhibited Alertmanager alert instances',
  },
  {
    name: 'signoz_list_alert_rules',
    description: 'List configured alert rules, including inactive or disabled rules',
  },
  { name: 'signoz_get_alert', description: 'Get an alert rule definition by ID' },
  {
    name: 'signoz_get_alert_history',
    description: "Get a rule's firing and state-transition history (cursor-paginated)",
  },
  { name: 'signoz_create_alert', description: 'Create an alert rule using v2 schema validation' },
  { name: 'signoz_update_alert', description: 'Update an existing alert rule' },
  { name: 'signoz_delete_alert', description: 'Delete an alert rule' },
  { name: 'signoz_list_dashboards', description: 'List all dashboards with summaries' },
  { name: 'signoz_get_dashboard', description: 'Get full dashboard configuration' },
  { name: 'signoz_create_dashboard', description: 'Create a new dashboard' },
  { name: 'signoz_update_dashboard', description: 'Update an existing dashboard' },
  {
    name: 'signoz_patch_dashboard',
    description: 'Apply a partial JSON Patch to a dashboard without resending the whole definition',
  },
  { name: 'signoz_delete_dashboard', description: 'Delete a dashboard by UUID' },
  {
    name: 'signoz_list_dashboard_templates',
    description: 'List the bundled SigNoz dashboard template catalog so the model can pick one',
  },
  {
    name: 'signoz_import_dashboard',
    description: 'Create a dashboard from a curated SigNoz dashboard template by path',
  },
  {
    name: 'signoz_list_services',
    description: 'List APM services with trace activity in a time range',
  },
  { name: 'signoz_get_service_top_operations', description: 'Get top operations for a service' },
  {
    name: 'signoz_list_views',
    description: 'List saved Explorer views for traces, logs, or metrics',
  },
  { name: 'signoz_get_view', description: 'Get a saved Explorer view by UUID' },
  { name: 'signoz_create_view', description: 'Create a saved Explorer view' },
  { name: 'signoz_update_view', description: 'Replace an existing saved Explorer view' },
  { name: 'signoz_delete_view', description: 'Delete a saved Explorer view' },
  {
    name: 'signoz_aggregate_logs',
    description: 'Aggregate logs (count, avg, p99, etc.) with grouping',
  },
  { name: 'signoz_search_logs', description: 'Search logs with flexible filtering' },
  { name: 'signoz_aggregate_traces', description: 'Aggregate trace statistics with grouping' },
  { name: 'signoz_search_traces', description: 'Search traces with flexible filtering' },
  { name: 'signoz_get_trace_details', description: 'Get full trace with all spans' },
  {
    name: 'signoz_execute_builder_query',
    description:
      'Run Query Builder v5 requests the dedicated tools cannot express, including multi-query requests, formulas, PromQL, and ClickHouse SQL',
  },
  {
    name: 'signoz_search_docs',
    description:
      'Search official SigNoz docs for product, setup, instrumentation, config, API, deployment, or troubleshooting questions',
  },
  {
    name: 'signoz_fetch_doc',
    description: 'Fetch full markdown for one official SigNoz docs page or heading',
  },
  { name: 'signoz_list_notification_channels', description: 'List notification channels' },
  {
    name: 'signoz_get_notification_channel',
    description: 'Get a single notification channel by ID',
  },
  {
    name: 'signoz_create_notification_channel',
    description: 'Create a notification channel and send a test notification',
  },
  {
    name: 'signoz_update_notification_channel',
    description: 'Update a notification channel and send a test notification',
  },
  {
    name: 'signoz_delete_notification_channel',
    description: 'Delete a notification channel by ID',
  },
]
