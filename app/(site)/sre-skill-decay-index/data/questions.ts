import { QuizQuestion } from '../types'

export const questions: QuizQuestion[] = [
  {
    scenario:
      'ALERT: HTTP 503s spiking on checkout-service. CPU is 12%, memory is flat, no recent deploys. Dashboards show healthy pods. Your AI incident assistant is unreachable.',
    question:
      'You SSH into the pod. Healthy resource usage, but requests are hanging. What do you check next?',
    olly: 'welding',

    options: [
      {
        text: 'Run ss -s to check socket states \u2014 if TIME_WAIT or CLOSE_WAIT sockets are piling up, the connection pool to a downstream dependency is leaking',
        score: 0,
        category: 'incident',
      },
      {
        text: 'Restart the pod \u2014 if 503s clear, it was transient; if they return, escalate to the platform team',
        score: 2,
        category: 'incident',
      },
      {
        text: 'Open the monitoring dashboards and wait for a pattern to emerge over the next few minutes',
        score: 1,
        category: 'incident',
      },
      {
        text: 'Open the service\u2019s GitHub repo and search recent PRs for anything touching HTTP client config',
        score: 3,
        category: 'incident',
      },
    ],
  },
  {
    scenario:
      'INCIDENT: Your metrics backend is OOM-killed twice in 30 minutes. Dashboards return "query timed out." A deploy went out 2 hours ago to the user-activity service adding new instrumentation.',
    question:
      'You suspect a cardinality explosion from the new instrumentation. How do you confirm and isolate it?',
    olly: 'welding-side',
    options: [
      {
        text: 'Query the metrics backend to find which metric name has the most active time series, then inspect the new deploy\u2019s metric labels for unbounded values like user_id or session_id',
        score: 0,
        category: 'observability',
      },
      {
        text: 'Roll back the user-activity deploy immediately \u2014 if the metrics backend recovers, you\u2019ve found your culprit',
        score: 1,
        category: 'observability',
      },
      {
        text: 'Increase the metrics backend\u2019s memory limits and restart it so dashboards come back, then investigate at a less urgent pace',
        score: 2,
        category: 'observability',
      },
      {
        text: 'Page the observability team \u2014 metrics backend internals aren\u2019t something most SREs should be debugging directly',
        score: 3,
        category: 'observability',
      },
    ],
  },
  {
    scenario:
      'INCIDENT: p99 latency on API gateway jumped from 200ms to 12s. All downstream services report healthy. No error spikes in logs. Users are reporting intermittent hangs, not errors.',
    question: 'Latency is through the roof but nothing looks broken. What\u2019s your theory?',
    olly: 'hangglider',
    options: [
      {
        text: 'A single slow downstream dependency is exhausting the gateway\u2019s thread pool \u2014 healthy services are now queued behind the slow one, and the lack of errors means requests are hanging, not failing',
        score: 0,
        category: 'debugging',
      },
      {
        text: 'The API gateway is under a DDoS or bot attack \u2014 the traffic pattern is overwhelming the load balancer',
        score: 2,
        category: 'debugging',
      },
      {
        text: 'There\u2019s a DNS resolution delay \u2014 every request is waiting on a TTL expiry before the connection is established',
        score: 1,
        category: 'debugging',
      },
      {
        text: 'The metrics are misleading \u2014 the sampling window is too wide to see the actual error spikes, so you need to narrow the time range',
        score: 3,
        category: 'debugging',
      },
    ],
  },
  {
    scenario:
      'ALERT: OOMKilled on recommendation-service. You don\u2019t own this service. The owning team is in a different timezone and offline. SLA breach in 15 minutes. The last deploy was 6 days ago.',
    question:
      'This service was stable for days and nobody deployed. What\u2019s your diagnostic approach?',
    olly: 'space',
    options: [
      {
        text: 'Check the pod\u2019s cgroup memory usage against its limits, look at dmesg | grep oom on the node to see what process was killed and its oom_score, then check if traffic patterns or upstream request shapes changed',
        score: 0,
        category: 'architecture',
      },
      {
        text: 'Bump the memory limits in the deployment spec and re-apply \u2014 buy time now, root cause later',
        score: 2,
        category: 'architecture',
      },
      {
        text: 'Check the node \u2014 if other pods on the same node are also struggling, it\u2019s a noisy neighbor problem, not the service itself',
        score: 1,
        category: 'architecture',
      },
      {
        text: 'Search Slack for past OOM incidents on this service and follow whatever runbook the team used last time',
        score: 3,
        category: 'architecture',
      },
    ],
  },
  {
    scenario:
      'REVIEW: A junior engineer\u2019s postmortem reads: "Root cause: the database ran out of connections during peak traffic. Fix: increased max_connections from 100 to 500."',
    question: 'What\u2019s wrong with this root cause analysis?',
    olly: 'thinking',
    options: [
      {
        text: 'It\u2019s treating the symptom as the cause \u2014 you need to know why connections weren\u2019t being released: a leak, missing connection pooling, or long-running transactions holding connections open under load',
        score: 0,
        category: 'incident',
      },
      {
        text: 'The fix is technically sound \u2014 100 connections is too low for production and 500 is a reasonable limit for most databases',
        score: 3,
        category: 'incident',
      },
      {
        text: 'It\u2019s missing a timeline \u2014 a good postmortem should show exactly when the connections were exhausted and correlate that with deploy or traffic events',
        score: 1,
        category: 'incident',
      },
      {
        text: 'The postmortem should have included more stakeholders and a broader blast radius analysis before focusing on the technical root cause',
        score: 2,
        category: 'incident',
      },
    ],
  },
  {
    scenario:
      'MEETING: Your VP asks you to explain why a checkout failure in service A caused a complete outage in the unrelated search service B. Both share no code and no direct API calls.',
    question: 'How are two seemingly unrelated services coupled?',
    olly: 'jedi',
    options: [
      {
        text: 'Shared infrastructure \u2014 they likely share a database connection pool, a service mesh sidecar with a global connection limit, a DNS resolver, or a node where resource contention on one starves the other',
        score: 0,
        category: 'debugging',
      },
      {
        text: 'It\u2019s coincidence \u2014 two independent failures happened simultaneously and the correlation is misleading',
        score: 3,
        category: 'debugging',
      },
      {
        text: 'Service A\u2019s failure generated a spike in user retries that overwhelmed the load balancer, which sits in front of both services',
        score: 1,
        category: 'debugging',
      },
      {
        text: 'There must be an undocumented API call between them \u2014 check the service mesh traffic logs to find the hidden dependency',
        score: 2,
        category: 'debugging',
      },
    ],
  },
  {
    scenario:
      'REFLECTION: You\u2019re triaging a novel production issue at 2 AM. Your traces show nothing, your runbook doesn\u2019t cover this case, and your AI assistant keeps suggesting things you\u2019ve already tried.',
    question: 'Be honest. What happens next?',
    olly: 'sleeping',
    options: [
      {
        text: 'You drop to first principles \u2014 isolate the blast radius, check what changed recently across infra, deps, and config, and start bisecting the system to narrow the failure domain',
        score: 0,
        category: 'meta',
      },
      {
        text: 'You keep feeding the AI more context and rephrasing your question \u2014 eventually it\u2019ll get there with the right prompt',
        score: 3,
        category: 'meta',
      },
      {
        text: 'You escalate immediately and pull in every senior engineer you can reach \u2014 novel incidents shouldn\u2019t be solo debugged at 2 AM',
        score: 1,
        category: 'meta',
      },
      {
        text: 'You mitigate what you can \u2014 redirect traffic, increase replicas, toggle feature flags \u2014 and defer root cause to morning when you have full team support',
        score: 2,
        category: 'meta',
      },
    ],
  },
]
