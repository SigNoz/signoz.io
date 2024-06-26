---
id: infinite-retention-aws-s3
title: Infinite Retention of OpenTelemetry Data in AWS S3
description: Infinite Retention of OpenTelemetry Data in AWS S3
---

## Overview

It is a common practice to backup any data for longer durations due to
compliance and audit purposes. You can use [AWS S3 Exporter][1] to
retain the OpenTelemetry data as long as we need.

## Limitation of AWS S3 Exporter

- Data in AWS S3 is inaccessible in SigNoz UI
- Need to use third-party tool like **Amazon Athena** to query data
- Due to limitation of AWS S3 Exporter, you won't be able differentiate
  different signals like logs, metrics, and traces - hence the need of
  including different prefixes

:::info
If you want to query data stored in AWS S3 using **SigNoz** and do not
have the requirement for infinite or very long retention period, then use
[SigNoz's AWS S3 Retention][4] instead.
:::

## Prerequisites

- Running instance of OpenTelemetry Collector (if not running already, see [Installation Page][3])
- Access to AWS S3 Bucket either using AWS credentials as environment variables
  or IAM roles for ECS tasks or EC2 instances (for more details, [see here][4])

## Adding AWS S3 Exporter

In our example, we will use `awss3` exporter for retaining logs data,
where we will be using `us-east-1` region and `otel-data-backup` bucket.

```yaml
exporters:
  awss3/logs:
    s3uploader:
      region: 'us-east-1'
      s3_bucket: 'otel-data-backup'
      s3_prefix: 'logs'
      s3_partition: 'minute'
service:
  pipelines:
    logs:
      exporters: [otlp, awss3/logs]
```

Similarly, we can add it for `metrics` and `traces` pipelines as well with
different prefixes to retain metrics and traces data respectively.

The above configuration needs to be added for your respective OtelCollector(s).

- In case of **SigNoz Self-hosted**, you can add it in SigNoz OtelCollector
configuration to retain all incoming data of `logs` pipelines.
- In case of **SigNoz Cloud**, you will need to update all OtelCollector
configuration that is sending data.
- For **K8s-Infra** helm chart, you can add it in the `otelAgent` configuration.
- For any **Standalone OtelCollector** deployments that is directly sending
data to SigNoz, you can add it in its respective configuration.

List of all supported configuration of `awss3` exporter can be found [here][1].

---

If you have any feedback or facing issues, feel free to join our slack
community to get help!

[![SigNoz Slack community][5]][6]

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/awss3exporter
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/awss3exporter#aws-credential-configuration
[3]: /docs/install/
[4]: /docs/userguide/retention-period#configuring-cold-storage---amazon-s3
[5]: /img/blog/common/join_slack_cta.webp
[6]: https://signoz.io/slack
