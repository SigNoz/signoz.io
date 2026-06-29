export const agentPromptTabs = [
  {
    label: 'Deploy check',
    promptLead:
      'Show me the top operations for the frontend service. For each endpoint, compare p99 latency and error rate from the 30 minutes before 10:00 AM PST vs the 30 minutes after. ',
    promptTail: 'Flag anything that degraded.',
    breakBeforePromptTail: true,
    toolLine: 'Let me check SigNoz for frontend service operations before and after 10:00 AM PST.',
    signalLine: 'Pulled p99 latency, call volume, and error-rate signals for the top operations.',
    responseTitle:
      'Frontend service - Top operations comparison (30 min before vs after 10:00 AM PST)',
    columns: ['Operation', 'Calls', 'p99 before', 'p99 after', 'Change', 'Errors', 'Assessment'],
    rows: [
      [
        'GET /api/recommendations',
        '510 -> 540',
        '112 ms',
        '170 ms',
        '+52%',
        '0.8% -> 1.1%',
        'p99 degraded',
      ],
      [
        'GET /api/products/[productId]',
        '405 -> 430',
        '78 ms',
        '105 ms',
        '+35%',
        '0% -> 14.4%',
        'p99 + errors',
      ],
      [
        'GET /api/cart',
        '1156 -> 1250',
        '3.78 ms',
        '4.23 ms',
        '+12%',
        '0.09% -> 2.0%',
        'errors spiked',
      ],
      [
        'GET /api/products/index',
        '192 -> 205',
        '77 ms',
        '103 ms',
        '+33%',
        '0.5% -> 0.5%',
        'p99 degraded',
      ],
      ['GET /api/currency', '215 -> 228', '210 ms', '250 ms', '+19%', '0% -> 0%', 'minor'],
      ['GET /api/data', '142 -> 136', '104 ms', '98 ms', '-6%', '0% -> 0%', 'ok'],
    ],
    findingsTitle: 'Things that degraded after deployment:',
    findings: [
      'GET /api/products/[productId] - p99 rose 35% and error rate jumped from 0% to 14.4%.',
      'GET /api/cart - error rate spiked from 0.09% to 2.0%, a 22x increase.',
      'GET /api/recommendations - p99 jumped 52%, the largest latency regression.',
    ],
  },
  {
    label: 'Latency spike',
    promptLead:
      'Why did p99 latency for frontend jump after the deploy? Break it down by service, span, and dependency ',
    promptTail: 'so I can see where time moved.',
    toolLine: 'Let me inspect slow checkout traces and compare them with a healthy baseline.',
    signalLine:
      'Compared span trees, p50/p99 buckets, downstream service latency, and warning logs.',
    responseTitle: 'Latency spike - checkout-service p99 breakdown',
    columns: ['Span or signal', 'Healthy', 'Spike', 'Change', 'Readout'],
    rows: [
      ['POST /api/checkout', '387 ms', '4,712 ms', '+1117%', 'systemic'],
      ['ProcessPayment', '291 ms', '4,480 ms', '+1439%', 'bottleneck'],
      ['ChargeCard', '248 ms', '4,430 ms', '+1686%', 'downstream'],
      ['checkout p50', '~400 ms', '3.8 s', '+850%', 'all requests'],
      ['checkout p99', '~400 ms', '4.7 s', '+1075%', 'page-worthy'],
      ['error rate', '0%', '12%', '+12 pts', 'timeouts'],
    ],
    findingsTitle: 'Where the time moved:',
    findings: [
      '95% of the slow trace is inside ProcessPayment, specifically ChargeCard.',
      'Both p50 and p99 jumped together, so this is not a tail-only issue.',
      'Payment-service logs show a Stripe endpoint region change at the spike time.',
    ],
  },
  {
    label: 'Trace lookup',
    promptLead:
      'Reconstruct trace bfb5cbf1e2fc0eadf86352a3bd659d34 end to end and point me to the slow span ',
    promptTail: 'with related logs.',
    toolLine: 'Let me pull the trace path, span timings, and related logs from SigNoz.',
    signalLine:
      'Parsed the flamegraph, waterfall timing, span attributes, and logs linked by trace_id.',
    responseTitle: 'Trace bfb5cbf1... - support-ticket reconstruction',
    columns: ['Step', 'Service', 'Status', 'Readout'],
    rows: [
      ['api-gateway /api/checkout', 'api-gateway', 'OK', '823 ms'],
      ['auth-service /verify-token', 'auth-service', 'OK', '12 ms'],
      ['checkout-service /process', 'checkout-service', 'FAILED', '798 ms'],
      ['inventory-service /reserve', 'inventory-service', 'OK', '45 ms'],
      ['payment-service /charge', 'payment-service', 'FAILED', '680 ms'],
      ['stripe.com/v1/charges', 'stripe', '402', 'card_declined'],
    ],
    findingsTitle: 'Trace readout:',
    findings: [
      'The card was declined by Stripe, but payment-service re-raised it as InternalServerError.',
      'order-service was never called because payment failed first.',
      'This should be shown to the customer as Payment declined, not a generic 500.',
    ],
  },
  {
    label: 'Alert audit',
    promptLead:
      'Which alerts fired in the last 24 hours without matching service degradation? Suggest thresholds ',
    promptTail: 'we should tune.',
    toolLine: 'Let me compare alert history with service metrics and incident signals in SigNoz.',
    signalLine:
      'Checked alert transitions against service error rate, p99 latency, and recovery windows.',
    responseTitle: 'Alert audit - last 24 hours',
    columns: ['Alert', 'Severity', 'Class', 'Readout'],
    rows: [
      ['Database Connection Pool', 'critical', 'VALID', '8/9 firings showed severe degradation'],
      ['High Error Rate checkout', 'critical', 'VALID', '6/6 firings matched error-rate increase'],
      ['Cart Service Latency', 'warning', 'FLAPPING', '78 fires/day with no sampled degradation'],
      ['Frontend 5xx Errors', 'warning', 'FLAPPING', 'oscillates around threshold'],
      ['API Gateway Timeout', 'warning', 'NOISY', '120 fires/day, auto-resolves under 1 min'],
      ['test-alert', 'critical', 'STALE', 'firing since Apr 10 with invalid rule'],
    ],
    findingsTitle: 'Noise to tune first:',
    findings: [
      'Keep the database and checkout alerts; they correlate with real service degradation.',
      'Tune cart latency and frontend 5xx thresholds because they flap around noise.',
      'Fix API Gateway Timeout first for volume, and delete the stale test alert.',
    ],
  },
  {
    label: 'Logs',
    promptLead:
      'Show me recent error or warning logs related to search indexing or index lag, then find ',
    promptTail: 'what changed upstream.',
    toolLine: 'Let me search SigNoz logs for indexing lag, malformed events, and upstream deploys.',
    signalLine:
      'Grouped warning logs by service, counted malformed events, and checked deploy logs.',
    responseTitle: 'Search indexing lag - log investigation',
    columns: ['Signal', 'Service', 'Count', 'Readout'],
    rows: [
      ['Index lag warnings', 'search-indexer', '34', '4h+ behind head'],
      ['Malformed events', 'search-indexer', '9,847', 'sku_id and price schema mismatch'],
      ['Dead letter queue', 'search-indexer', '9,214', '~6,800 products affected'],
      ['Deployment started', 'catalog-pipeline', '1', 'v2.14.0 -> v2.15.0'],
      ['Schema migration', 'catalog-pipeline', '2 changes', 'sku_id nested, price stringified'],
      ['Throughput', 'search-indexer', '12/sec', 'normal is ~340/sec'],
    ],
    findingsTitle: 'Log correlation:',
    findings: [
      'The indexer is not down; it is stuck retrying malformed events from catalog-pipeline.',
      'The break starts after the v2.15.0 schema migration and backfill.',
      'Rollback catalog-pipeline or hotfix search-indexer, then replay the DLQ.',
    ],
  },
]

export const thinkingVerbs = ['Channelling', 'Contemplating', 'Metamorphosing']

export const signozMcpToolLine = 'Loaded tools, used SigNoz MCP Server integration ›'
