# Send Data Doc Template

```mdx
## Overview

<What telemetry this guide sends to SigNoz and for which technology>

<!-- Mention OpenTelemetry in the title, slug, and overview. -->
<!-- Use direct export to SigNoz Cloud as the primary path. -->

<KeyPointCallout title="Using self-hosted SigNoz?" defaultCollapsed={true}>
  Most steps are identical. Update the endpoint and remove the ingestion key
  header as shown in [Cloud ->
  Self-Hosted](https://signoz.io/docs/ingestion/cloud-vs-self-hosted/#cloud-to-self-hosted).
</KeyPointCallout>

## Prerequisites

- <Access, runtime, package, or environment prerequisites>

## Steps

<!-- If VM, Kubernetes, Docker, or Windows materially differ, split the flow with Tabs/TabItem. -->
<!-- Keep the happy path minimal and platform-specific only where necessary. -->

1. <Install or configure OpenTelemetry>
2. <Add direct export to SigNoz Cloud>
3. <Run or restart the app>

<!-- For Collector config, show only the snippet to append and tell users where to enable it. -->
<!-- Do not present a full otel-collector-config.yaml replacement unless the page is explicitly a full clean-room setup. -->

## Validate

- <Where traces, logs, or metrics should appear in SigNoz>
- <What success looks like>

<details>
<ToggleHeading>
## Troubleshooting
</ToggleHeading>

### <Symptom or error>

- Likely cause: <cause>
- Fix: <action>
- Verify: <result>

</details>

<details>
<ToggleHeading>
## Setup OpenTelemetry Collector (Optional)
</ToggleHeading>

<Explain when to use the Collector and link to the switch-to-collector guide.>
<Show only the config snippet to append and the pipeline change required to enable it.>

</details>

## Next steps

- <Dashboard, alerting, trace, or deeper guide links>
```
