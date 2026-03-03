import { QuizQuestion } from '../types'

export const questions: QuizQuestion[] = [
  {
    scenario:
      'ALERT: Pod CrashLoopBackOff on payment-service. Grafana dashboards are loading. AI assistant is offline.',
    question:
      'An on-call alert fires at 3 AM. Your AI incident assistant is down. What\u2019s your first instinct?',
    olly: 'welding',
    options: [
      {
        text: 'SSH in, check pod logs, inspect recent deploys, form a hypothesis',
        sub: 'Old school. Muscle memory intact.',
        score: 0,
        category: 'incident',
      },
      {
        text: 'Wait for the AI to come back online \u2014 it\u2019ll correlate faster than me',
        sub: 'Outsourced your instincts.',
        score: 3,
        category: 'incident',
      },
      {
        text: 'Check Slack for similar past incidents, maybe someone posted a runbook',
        sub: 'Collaborative, but dependent.',
        score: 1,
        category: 'incident',
      },
      {
        text: 'Restart the pod and go back to sleep',
        sub: 'Bold strategy.',
        score: 2,
        category: 'incident',
      },
    ],
  },
  {
    scenario:
      'CONTEXT: You\u2019re reviewing a Prometheus query someone wrote. It looks wrong but you can\u2019t articulate why.',
    question:
      'When was the last time you wrote a PromQL query from scratch without autocomplete or AI suggestion?',
    olly: 'welding',
    options: [
      {
        text: 'This week \u2014 I still write them by hand regularly',
        sub: 'Your fingers remember.',
        score: 0,
        category: 'observability',
      },
      {
        text: 'A few months ago, maybe? I mostly edit AI-generated ones now',
        sub: 'Editing \u2260 understanding.',
        score: 2,
        category: 'observability',
      },
      {
        text: 'I can\u2019t remember',
        sub: 'The atrophy is real.',
        score: 3,
        category: 'observability',
      },
      {
        text: 'I use the visual query builder exclusively',
        sub: 'You skipped the CLI era entirely.',
        score: 2,
        category: 'observability',
      },
    ],
  },
  {
    scenario:
      'INCIDENT: Latency spike across 3 microservices. Traces show normal spans. Metrics look healthy. Users are complaining.',
    question:
      'The obvious signals look fine but something is clearly broken. How do you approach this?',
    olly: 'thinking',
    options: [
      {
        text: 'Correlate deploy timestamps, check network layer, inspect DNS and connection pools',
        sub: 'You still think in systems.',
        score: 0,
        category: 'debugging',
      },
      {
        text: 'Paste the symptoms into ChatGPT/Claude and see what it suggests',
        sub: 'AI as your senior engineer.',
        score: 3,
        category: 'debugging',
      },
      {
        text: 'Widen the time window on dashboards and look for patterns',
        sub: 'Reasonable but shallow.',
        score: 1,
        category: 'debugging',
      },
      {
        text: 'Escalate to the team lead \u2014 this is above my level',
        sub: 'Was it always above your level?',
        score: 2,
        category: 'debugging',
      },
    ],
  },
  {
    scenario:
      'TASK: Your team asks you to explain the full request lifecycle through your system \u2014 from load balancer to database and back.',
    question:
      'Could you whiteboard your system\u2019s architecture from memory right now?',
    olly: 'thinking',
    options: [
      {
        text: 'Yes \u2014 I know every hop, every queue, every failure point',
        sub: 'Living documentation.',
        score: 0,
        category: 'architecture',
      },
      {
        text: 'Mostly, but I\u2019d need to check service mesh configs for the details',
        sub: 'Core is there, edges are fuzzy.',
        score: 1,
        category: 'architecture',
      },
      {
        text: 'I\u2019d need to pull up the AI-generated dependency map first',
        sub: 'You\u2019re navigating with GPS in your own neighborhood.',
        score: 3,
        category: 'architecture',
      },
      {
        text: 'I could describe my services, but not how they talk to each other',
        sub: 'Islands without bridges.',
        score: 2,
        category: 'architecture',
      },
    ],
  },
  {
    scenario:
      'DISCUSSION: A junior SRE asks you to review their incident postmortem. The root cause analysis looks off.',
    question:
      'How confident are you in your ability to identify a flawed root cause analysis?',
    olly: 'professor',
    options: [
      {
        text: 'Very \u2014 I\u2019ve written enough postmortems to smell a shallow one',
        sub: 'Pattern recognition from repetition.',
        score: 0,
        category: 'incident',
      },
      {
        text: 'I\u2019d run it through an AI to check the logic first',
        sub: 'You need a second opinion from a machine.',
        score: 3,
        category: 'incident',
      },
      {
        text: 'I could spot obvious issues, but subtle gaps would slip by me',
        sub: 'Honest \u2014 and concerning.',
        score: 2,
        category: 'incident',
      },
      {
        text: 'I haven\u2019t written a postmortem in a while \u2014 AI drafts them now',
        sub: 'You stopped practicing the hardest skill.',
        score: 3,
        category: 'incident',
      },
    ],
  },
  {
    scenario:
      'ALERT: OOMKilled on a service you don\u2019t own. The owning team is asleep. SLA breach in 20 minutes.',
    question:
      'You\u2019re alone on-call for a service you\u2019ve never touched. Clock is ticking.',
    olly: 'professor',
    options: [
      {
        text: 'Check resource limits, recent commits, heap dumps \u2014 escalate if I can\u2019t find it in 10',
        sub: 'Methodical under pressure.',
        score: 0,
        category: 'debugging',
      },
      {
        text: 'Bump the memory limits, add a restart policy, deal with root cause tomorrow',
        sub: 'Duct tape SRE.',
        score: 2,
        category: 'debugging',
      },
      {
        text: 'Search Slack history for past OOMs on this service',
        sub: 'Research, not reasoning.',
        score: 1,
        category: 'debugging',
      },
      {
        text: 'I\u2019d be frozen for a few minutes without AI to guide me',
        sub: 'The 3 AM truth.',
        score: 3,
        category: 'debugging',
      },
    ],
  },
  {
    scenario:
      'REFLECTION: Think about how you\u2019ve solved problems over the past 6 months compared to 2 years ago.',
    question:
      'Be brutally honest: has AI made you a better or worse engineer?',
    olly: 'professor',
    options: [
      {
        text: 'Better \u2014 I use AI as a tool but I still drive the thinking',
        sub: 'The ideal. Are you sure?',
        score: 0,
        category: 'meta',
      },
      {
        text: 'Faster, but probably not deeper. I ship more but understand less.',
        sub: 'The productivity trap.',
        score: 2,
        category: 'meta',
      },
      {
        text: 'I can\u2019t separate my thinking from AI\u2019s anymore',
        sub: 'The most honest answer here.',
        score: 3,
        category: 'meta',
      },
      {
        text: 'Worse, and I know it. But I can\u2019t stop.',
        sub: 'Self-aware decay.',
        score: 3,
        category: 'meta',
      },
    ],
  },
]
