import Image from 'next/image'
import TrackingLink from '@/components/TrackingLink'
import Button from '@/components/ui/Button'

export const TRUSTED_BY_LOGOS = [
  { src: '/svgs/icons/eltropy.svg', alt: 'Eltropy' },
  { src: '/svgs/icons/omnicell.svg', alt: 'Omnicell' },
  { src: '/img/users/salesforce.svg', alt: 'Salesforce' },
  { src: '/img/users/comcast.svg', alt: 'Comcast' },
  { src: '/svgs/icons/parallel-ai.svg', alt: 'Parallel AI' },
  { src: '/svgs/icons/blackforestlabs.svg', alt: 'Blackforest Labs' },
  { src: '/svgs/icons/blaxel.svg', alt: 'Blaxel' },
  { src: '/svgs/icons/sarvam.svg', alt: 'sarvam logo' },
]

export const FEATURE_CARDS = [
  {
    title: 'From alert to root cause to fix. In one session.',
    description: (
      <div>
        <p>
          Use SigNoz connected with your coding agent to get the full picture: traces, logs,
          metrics, service topology, and deployment history — in one query. Your codebase is already
          loaded. Correlate production telemetry with the actual code that caused it.
        </p>
        <p className="mt-3">
          Connect to Kubernetes, Git, Jira via your cloud provider CLI in your dev environment.
          Investigate issues, diagnose root cause, and fix without leaving your env.
        </p>
        <Button asChild variant="secondary" rounded="full" className="mt-4">
          <TrackingLink
            href="/docs/ai/signoz-mcp-server/"
            clickType="Secondary CTA"
            clickName="Agent Native Feature 1 Learn More"
            clickLocation="Agent Native Observability Page"
            clickText="Learn more"
          >
            Learn more
          </TrackingLink>
        </Button>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    description: (
      <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-lg">
        <Image
          src="/img/agent-native-observability/image-2.webp"
          alt="Coding agent investigating an ECS service OOM issue — tracing root cause from alert to fix"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>
    ),
  },
  {
    description: (
      <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-lg">
        <Image
          src="/img/agent-native-observability/image-3.webp"
          alt="skill.md file defining custom debugging heuristics — latency propagation, backpressure, cascading failures"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />
      </div>
    ),
  },
  {
    title: "Teach it your team's debugging heuristics. Not someone else's.",
    description: (
      <div>
        <p>
          AI SRE tools apply one-size-fits-all reasoning. SigNoz MCP with Claude Code, Cursor, and
          other coding agents lets developers customize reasoning by codifying best practices in
          your skills.md and sharing with your team in a GitHub repo. Show it your runbooks, your
          service topology, your escalation paths and let the coding agents investigate and pinpoint
          the issue.
        </p>
        <Button asChild variant="secondary" rounded="full" className="mt-4">
          <TrackingLink
            href="/docs/ai/agent-skills/"
            clickType="Secondary CTA"
            clickName="Agent Native Feature 3 Learn More"
            clickLocation="Agent Native Observability Page"
            clickText="Learn more"
          >
            Learn more
          </TrackingLink>
        </Button>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    title: 'Plugged into your tribal knowledge. No third-party detours.',
    description: (
      <div>
        <p>
          Connect directly to the tools your team already uses — GitHub, Jira, Kubernetes — with no
          routing through third-party connectors or external networks. Agents leverage your existing
          runbooks, docs, and best practices to pinpoint issues fast. Team knowledge stays in the
          systems your team already trusts.
        </p>
        <p className="mt-3">
          Most AI SRE tools hit an adoption wall here: limited access to internal tools means
          limited reasoning. With SigNoz MCP and coding agents, you work inside your environment,
          not around it.
        </p>
        <Button asChild variant="secondary" rounded="full" className="mt-4">
          <TrackingLink
            href="https://youtube.com/playlist?list=PL0N8FjJpzGl-pTr0H7UrX6rdLGsiVPolw&si=SvFwmnw-pjmj5zKD"
            clickType="Secondary CTA"
            clickName="Agent Native Feature 4 Watch Video"
            clickLocation="Agent Native Observability Page"
            clickText="Watch Video"
          >
            Watch Video
          </TrackingLink>
        </Button>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
  {
    description: (
      <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-lg bg-signoz_ink-500">
        <Image
          src="/img/graphics/homepage/feature-graphic-5.svg"
          alt="GitHub, Slack, GitLab, and Jira connected to SigNoz — tribal knowledge and integrations flow"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />
      </div>
    ),
  },
  {
    description: (
      <div className="relative h-full min-h-[300px] w-full overflow-hidden rounded-lg bg-signoz_ink-500">
        <Image
          src="/img/graphics/homepage/feature-graphic-otel.webp"
          alt="SigNoz built on top of OpenTelemetry — isometric layers showing the open-standards foundation"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />
      </div>
    ),
  },
  {
    title: 'Open by design. No lock-in. Ever.',
    description: (
      <div>
        <p>
          SigNoz is a neutral data layer for AI-assisted debugging. Built on OpenTelemetry, the CNCF
          standard — your instrumentation, your agents, and your investigation data stay yours.
          Extend across vendors. Port across tools. Define your own debugging workflows and share
          them as reusable skills. The open investigation format SigNoz uses becomes a standard your
          entire team can build on.
        </p>
      </div>
    ),
    className: 'flex-col items-start justify-center gap-4',
  },
]
