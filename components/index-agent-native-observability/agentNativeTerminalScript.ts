export type TerminalTone = 'ok' | 'bad' | 'warn' | 'info' | 'dim' | 'accent' | 'strong'

export type TerminalAlign = 'l' | 'r'

export type TerminalLogTone = 'ok' | 'bad' | 'warn' | 'info'

export interface TerminalLogLine {
  ts: string
  level: string
  tone: TerminalLogTone
  message: string
}

export type TerminalStep =
  | { type: 'input'; text: string }
  | { type: 'step'; text: string }
  | { type: 'tool'; pending: string; text: string }
  | { type: 'title'; text: string }
  | { type: 'text'; text: string }
  | { type: 'table'; head: string[]; align: TerminalAlign[]; rows: string[][] }
  | { type: 'tree'; lines: string[] }
  | { type: 'logs'; lines: TerminalLogLine[] }
  | { type: 'spacer' }

export interface TerminalSession {
  id: string
  label: string
  steps: TerminalStep[]
}

// Inline tone markup: [[tone:text]].
export const TERMINAL_SESSIONS: TerminalSession[] = [
  {
    id: 'deploy',
    label: 'Deploy check',
    steps: [
      {
        type: 'input',
        text: 'Show me the top operations for the frontend service. For each endpoint, compare p99 latency and error rate from the 30 minutes before 10:00 AM PST vs the 30 minutes after. Flag anything that degraded.',
      },
      {
        type: 'step',
        text: 'Let me check SigNoz for frontend service operations before and after 10:00 AM PST.',
      },
      {
        type: 'tool',
        pending: 'Loading tools…',
        text: 'Loaded tools, used [[strong:SigNoz MCP Server]] integration [[dim:›]]',
      },
      {
        type: 'step',
        text: 'Pulled p99 latency, call volume, and error-rate signals for the top operations.',
      },
      {
        type: 'title',
        text: 'Frontend service — Top operations comparison (30 min before vs after 10:00 AM PST)',
      },
      {
        type: 'table',
        head: ['Operation', 'Calls', 'p99 before', 'p99 after', 'Change', 'Errors', 'Assessment'],
        align: ['l', 'r', 'r', 'r', 'r', 'r', 'l'],
        rows: [
          [
            'GET /api/recommendations',
            '510 → 546',
            '112 ms',
            '[[warn:170 ms]]',
            '[[warn:+52%]]',
            '0.8% → 1.1%',
            '[[warn:p99 degraded]]',
          ],
          [
            'GET /api/products/[productId]',
            '405 → 430',
            '78 ms',
            '[[bad:105 ms]]',
            '[[bad:+35%]]',
            '[[bad:0% → 14.4%]]',
            '[[bad:p99 + errors]]',
          ],
          [
            'GET /api/cart',
            '1156 → 1212',
            '3.78 ms',
            '4.23 ms',
            '+12%',
            '[[bad:0.09% → 2.4%]]',
            '[[bad:errors spiked]]',
          ],
          [
            'GET /api/products/index',
            '192 → 206',
            '77 ms',
            '[[warn:102 ms]]',
            '[[warn:+32%]]',
            '0.5% → 0.6%',
            '[[warn:p99 degraded]]',
          ],
          [
            'POST /api/checkout',
            '288 → 291',
            '240 ms',
            '251 ms',
            '+5%',
            '0.2% → 0.2%',
            '[[ok:stable]]',
          ],
          [
            'GET /api/user/profile',
            '640 → 655',
            '18 ms',
            '17 ms',
            '−6%',
            '0% → 0%',
            '[[ok:stable]]',
          ],
          [
            'POST /api/auth/session',
            '331 → 340',
            '44 ms',
            '43 ms',
            '−2%',
            '0.1% → 0.1%',
            '[[ok:stable]]',
          ],
        ],
      },
      { type: 'spacer' },
      {
        type: 'text',
        text: '[[accent:→]] 4 of 7 operations degraded. [[strong:GET /api/products/{productId}]] is the outlier: errors went 0% → 14.4%, all HTTP 500.',
      },
      {
        type: 'text',
        text: '[[accent:→]] Deploy [[info:frontend@2f9c1ab]] rolled out at 09:58 AM PST, two minutes before the shift. Rollback candidate.',
      },
      { type: 'input', text: 'What are the 500s on that endpoint?' },
      {
        type: 'tool',
        pending: 'Querying logs…',
        text: 'Queried [[strong:SigNoz MCP Server]] — exceptions grouped by message [[dim:›]]',
      },
      {
        type: 'table',
        head: ['Exception', 'Count', 'First seen', 'Service'],
        align: ['l', 'r', 'l', 'l'],
        rows: [
          [
            '[[bad:ConnectionPoolTimeout]] — waited 5000ms for a free connection',
            '58',
            '10:01:12',
            'inventory-svc',
          ],
          ['[[bad:UpstreamRequestTimeout]] — GET /inventory/{sku}', '4', '10:03:44', 'frontend'],
          ['[[warn:JSONDecodeError]] — empty body from inventory-svc', '2', '10:07:03', 'frontend'],
        ],
      },
      { type: 'spacer' },
      {
        type: 'text',
        text: '[[accent:→]] Every 500 traces back to [[strong:inventory-svc]] connection pool exhaustion, not to the frontend deploy itself. The new build raised concurrency on that call from 4 to 16.',
      },
    ],
  },

  {
    id: 'latency',
    label: 'Latency spike',
    steps: [
      {
        type: 'input',
        text: 'p99 on checkout-service jumped at 09:40. Break it down by span so I can see where the time is actually going.',
      },
      {
        type: 'step',
        text: 'Fetching the span-level breakdown for POST /api/checkout across both windows.',
      },
      {
        type: 'tool',
        pending: 'Running query…',
        text: 'Loaded tools, used [[strong:SigNoz MCP Server]] integration [[dim:›]]',
      },
      { type: 'step', text: 'Compared p99 per span, 09:10–09:40 vs 09:40–10:10.' },
      { type: 'title', text: 'checkout-service — p99 contribution by span' },
      {
        type: 'table',
        head: ['Span', 'Per request', 'p99 before', 'p99 after', 'Δ', 'Share of Δ'],
        align: ['l', 'r', 'r', 'r', 'r', 'r'],
        rows: [
          [
            'checkout.handler [[dim:(root)]]',
            '1',
            '243 ms',
            '[[bad:598 ms]]',
            '[[bad:+355 ms]]',
            '100%',
          ],
          [
            'http.client → payments-svc',
            '1',
            '96 ms',
            '[[bad:402 ms]]',
            '[[bad:+306 ms]]',
            '[[bad:86%]]',
          ],
          [
            'http.client → recommendations',
            '1',
            '34 ms',
            '[[warn:96 ms]]',
            '[[warn:+62 ms]]',
            '[[warn:17%]]',
          ],
          ['postgres.query SELECT cart_items', '3', '41 ms', '44 ms', '+3 ms', '1%'],
          ['redis.get session', '2', '2.1 ms', '2.0 ms', '−0.1 ms', '0%'],
          ['checkout.serialize', '1', '9 ms', '9 ms', '—', '0%'],
        ],
      },
      { type: 'spacer' },
      {
        type: 'text',
        text: '[[accent:→]] 86% of the added latency sits in one outbound call: [[strong:payments-svc]]. Everything downstream of Postgres and Redis is flat.',
      },
      {
        type: 'text',
        text: '[[accent:→]] Time inside that span is almost all connect, not response: [[warn:tcp.connect p99 = 311 ms]] against [[warn:http.response p99 = 74 ms]].',
      },
      { type: 'input', text: 'Is payments-svc unhealthy on its own side?' },
      {
        type: 'tool',
        pending: 'Checking service health…',
        text: 'Pulled RED metrics for [[strong:payments-svc]] via [[strong:SigNoz MCP Server]] [[dim:›]]',
      },
      {
        type: 'table',
        head: ['Signal', 'Before 09:40', 'After 09:40', 'Verdict'],
        align: ['l', 'r', 'r', 'l'],
        rows: [
          ['Server-side p99', '88 ms', '91 ms', '[[ok:healthy]]'],
          ['Error rate', '0.1%', '0.1%', '[[ok:healthy]]'],
          ['Requests / sec', '46', '[[warn:171]]', '[[warn:3.7× traffic]]'],
          ['Client pool size', '8', '8', '[[bad:saturated]]'],
          ['Client queue depth p99', '2', '[[bad:34]]', '[[bad:queuing]]'],
        ],
      },
      { type: 'spacer' },
      {
        type: 'text',
        text: '[[accent:→]] payments-svc is fine. The wait is on the [[strong:client side]] of checkout-service: an 8-connection pool absorbing 3.7× the traffic. Raise the pool or cap concurrency before you touch payments.',
      },
    ],
  },

  {
    id: 'trace',
    label: 'Trace lookup',
    steps: [
      {
        type: 'input',
        text: 'Find the slowest traces for GET /api/products/[productId] in the last hour, then show me the span tree for the worst one.',
      },
      {
        type: 'tool',
        pending: 'Searching traces…',
        text: 'Loaded tools, used [[strong:SigNoz MCP Server]] integration [[dim:›]]',
      },
      { type: 'step', text: 'Sorted 1,204 matching traces by duration, descending.' },
      { type: 'title', text: 'Slowest traces — GET /api/products/[productId], last 60 min' },
      {
        type: 'table',
        head: ['Trace ID', 'Started', 'Duration', 'Spans', 'Status'],
        align: ['l', 'l', 'r', 'r', 'l'],
        rows: [
          ['[[info:4f2a91c7d0b83e15]]', '10:04:18', '[[bad:5,412 ms]]', '19', '[[bad:ERROR]]'],
          ['[[info:9c1e77b4aa02f6d3]]', '10:02:51', '[[bad:5,208 ms]]', '17', '[[bad:ERROR]]'],
          ['[[info:b83d02f5619ce4a7]]', '10:06:33', '[[warn:2,940 ms]]', '18', '[[ok:OK]]'],
          ['[[info:1a5c88de3fb27049]]', '09:58:07', '412 ms', '16', '[[ok:OK]]'],
        ],
      },
      { type: 'spacer' },
      { type: 'title', text: 'Span tree — 4f2a91c7d0b83e15' },
      {
        type: 'tree',
        lines: [
          'GET /api/products/[productId]                    [[bad:5,412 ms]]  [[bad:ERROR 500]]',
          '├─ auth.verify                                       6 ms  [[ok:OK]]',
          '├─ postgres.query  SELECT products WHERE id = $1     38 ms  [[ok:OK]]',
          '├─ http.client → inventory-svc                   [[bad:5,289 ms]]  [[bad:ERROR]]',
          '│  ├─ dns.lookup                                    14 ms  [[ok:OK]]',
          '│  ├─ pool.acquire                               [[bad:5,001 ms]]  [[bad:timeout after 5000 ms]]',
          '│  └─ http.response                                 —      [[dim:never sent]]',
          '├─ cache.set  product:sku-8841                        —      [[dim:skipped]]',
          '└─ render.product                                   71 ms  [[warn:served stale payload]]',
        ],
      },
      { type: 'spacer' },
      {
        type: 'text',
        text: '[[accent:→]] 92% of the trace is [[strong:pool.acquire]] waiting on a connection that never frees up. The request dies at the 5s client timeout, so inventory-svc never even sees it.',
      },
      {
        type: 'text',
        text: '[[accent:→]] Same shape in 61 of the 64 error traces this hour. One root cause, not a spread.',
      },
    ],
  },

  {
    id: 'alerts',
    label: 'Alert audit',
    steps: [
      {
        type: 'input',
        text: 'Which alert rules fired in the last 24 hours, and which of them are just noise?',
      },
      {
        type: 'tool',
        pending: 'Reading alert history…',
        text: 'Loaded tools, used [[strong:SigNoz MCP Server]] integration [[dim:›]]',
      },
      {
        type: 'step',
        text: 'Scored each rule on fire count, median duration, and whether anyone acknowledged it.',
      },
      { type: 'title', text: 'Alert rules — last 24 hours' },
      {
        type: 'table',
        head: ['Rule', 'Fires', 'Median duration', 'Acked', 'Verdict'],
        align: ['l', 'r', 'r', 'r', 'l'],
        rows: [
          ['inventory-svc pool saturation', '3', '38 min', '3 / 3', '[[ok:actionable]]'],
          ['frontend 5xx rate > 1%', '2', '21 min', '2 / 2', '[[ok:actionable]]'],
          ['checkout p99 > 500 ms', '9', '4 min', '1 / 9', '[[warn:flapping]]'],
          ['host CPU > 80%', '[[bad:41]]', '90 s', '0 / 41', '[[bad:noisy]]'],
          ['log volume anomaly (all services)', '[[bad:26]]', '2 min', '0 / 26', '[[bad:noisy]]'],
          ['payments-svc absent data', '1', '6 min', '1 / 1', '[[ok:actionable]]'],
        ],
      },
      { type: 'spacer' },
      {
        type: 'text',
        text: '[[accent:→]] Two rules produced [[strong:82 of the 82 unacknowledged pages]]. Nobody has acted on either in 24 hours.',
      },
      { type: 'input', text: 'Fix the CPU one.' },
      { type: 'step', text: 'Here is the change I would make to host CPU > 80%.' },
      {
        type: 'table',
        head: ['Setting', 'Now', 'Proposed', 'Why'],
        align: ['l', 'l', 'l', 'l'],
        rows: [
          ['Threshold', '80%', '92%', 'p95 baseline across the fleet is 84%'],
          [
            'For duration',
            '1 min',
            '10 min',
            'Kills spikes that self-resolve inside a scrape window',
          ],
          ['Grouping', 'per host', 'per host group', '41 fires came from 6 hosts in one ASG'],
          ['Severity', 'critical', 'warning', 'No CPU alert has led to an action this quarter'],
          ['Channel', 'PagerDuty', '#infra-signals', 'Move it off the on-call rotation'],
        ],
      },
      { type: 'spacer' },
      {
        type: 'text',
        text: '[[accent:→]] Applied to yesterday, this fires [[ok:2 times instead of 41]] and still catches the 11:20 PM saturation window. Say the word and I will update the rule.',
      },
    ],
  },

  {
    id: 'logs',
    label: 'Logs',
    steps: [
      {
        type: 'input',
        text: 'Search checkout-service logs between 09:55 and 10:15 for anything mentioning connection or timeout.',
      },
      {
        type: 'tool',
        pending: 'Searching logs…',
        text: 'Loaded tools, used [[strong:SigNoz MCP Server]] integration [[dim:›]]',
      },
      {
        type: 'step',
        text: '214 matches across 4 pods. Showing the first occurrence of each distinct message.',
      },
      { type: 'spacer' },
      {
        type: 'logs',
        lines: [
          {
            ts: '09:58:41',
            level: 'INFO',
            tone: 'info',
            message: 'starting build 2f9c1ab · pool_size=8 max_concurrency=16',
          },
          {
            ts: '10:01:12',
            level: 'WARN',
            tone: 'warn',
            message: 'connection pool at capacity, queuing request sku=8841 waited=1204ms',
          },
          {
            ts: '10:01:19',
            level: 'WARN',
            tone: 'warn',
            message: 'connection pool at capacity, queuing request sku=1097 waited=2890ms',
          },
          {
            ts: '10:01:27',
            level: 'ERROR',
            tone: 'bad',
            message: 'ConnectionPoolTimeout: waited 5000ms for a free connection to inventory-svc',
          },
          {
            ts: '10:03:44',
            level: 'ERROR',
            tone: 'bad',
            message: 'UpstreamRequestTimeout: GET /inventory/8841 deadline exceeded after 5000ms',
          },
          {
            ts: '10:07:03',
            level: 'ERROR',
            tone: 'bad',
            message:
              'JSONDecodeError: expecting value at line 1 column 1 — empty body from inventory-svc',
          },
          {
            ts: '10:11:58',
            level: 'INFO',
            tone: 'info',
            message: 'circuit breaker open for inventory-svc, serving cached catalog',
          },
          {
            ts: '10:14:02',
            level: 'INFO',
            tone: 'ok',
            message: 'circuit breaker half-open, 3 probe requests succeeded',
          },
        ],
      },
      { type: 'spacer' },
      {
        type: 'table',
        head: ['Pod', 'Matches', 'First error', 'Last error'],
        align: ['l', 'r', 'l', 'l'],
        rows: [
          ['[[bad:checkout-7d4f9-x2mq]]', '206', '10:01:27', '10:13:44'],
          ['checkout-7d4f9-b8kl', '5', '10:04:02', '10:04:19'],
          ['checkout-7d4f9-n1vp', '2', '10:06:31', '10:06:31'],
          ['checkout-7d4f9-qz7t', '1', '10:09:10', '10:09:10'],
        ],
      },
      { type: 'spacer' },
      {
        type: 'text',
        text: '[[accent:→]] 96% of matches come from a single pod, [[strong:checkout-7d4f9-x2mq]]. It is the only one that never restarted after the 09:58 rollout, so it kept the old pool config.',
      },
      {
        type: 'text',
        text: '[[accent:→]] Recycling that pod is the cheapest thing to try before rolling anything back.',
      },
    ],
  },
]
