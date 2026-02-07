---
date: 2025-12-28
id: api-gateway
title: Monitor AWS API Gateway with SigNoz
description: Collect API Gateway metrics and logs using one-click integration or manual setup.
doc_type: howto
---

## Overview

Amazon API Gateway is a fully managed service for creating and publishing APIs. SigNoz helps you monitor API performance, error rates, and latency.

## Prerequisites

- AWS account with appropriate permissions
- SigNoz Cloud account or Self-Hosted SigNoz

<Tabs>
<TabItem value="one-click" label="One-Click Integration" default>

## One-Click Integration

<Admonition type="info">
One-Click Integration is available for **SigNoz Cloud** only and includes pre-built dashboards. This method uses AWS CloudFormation and CloudWatch, which may incur additional AWS charges.
</Admonition>

### Step 1: Connect Your AWS Account

Follow the [One-Click AWS Integrations Guide](https://signoz.io/docs/integrations/aws/api-gateway/) to:
1. Deploy the CloudFormation stack
2. Connect your AWS account to SigNoz

### Step 2: Enable API Gateway Monitoring

Once connected, SigNoz will auto-discover your API Gateway APIs and begin collecting:
- **CloudWatch Metrics**: Request count, latency, error rates
- **Access Logs**: (if enabled and published to CloudWatch)

### What's Collected

| Data Type | Source | Examples |
|-----------|--------|----------|
| Metrics | CloudWatch | `Count`, `Latency`, `IntegrationLatency`, `5XXError`, `CacheHitCount`, `CacheMissCount` |
| Logs | CloudWatch Logs | Access logs |

### Pre-built Dashboards

Navigate to **Dashboards** and search for "API Gateway" to find automatically imported dashboards.

</TabItem>
<TabItem value="manual" label="Manual Setup">

## Manual Setup (CloudWatch Exporter)

<Admonition type="info">
Manual setup works for both **SigNoz Cloud** and **Self-Hosted**. You'll need to set up your own dashboards.
</Admonition>

To collect API Gateway metrics manually, you can use the <a href="https://github.com/prometheus/cloudwatch_exporter" target="_blank" rel="noopener noreferrer nofollow">Prometheus CloudWatch Exporter</a>. This tool scrapes metrics from AWS CloudWatch and exposes them in Prometheus format, which the OpenTelemetry Collector can then scrape and forward to SigNoz.

### Prerequisites

Before proceeding, ensure you have:

- **OpenTelemetry Collector** installed and configured. See [Get Started with OTel Collector](https://signoz.io/docs/opentelemetry-collection-agents/get-started/).
- **Java 11 or higher** installed on the host machine (for JAR-based setup), or **Docker** (for container-based setup).
- **AWS credentials** configured via environment variables (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`), IAM role, or `~/.aws/credentials`.
- **IAM permissions** for the credentials:
  - `cloudwatch:ListMetrics`
  - `cloudwatch:GetMetricStatistics`

### Where to Run the CloudWatch Exporter

The CloudWatch Exporter should run on a machine that:
1. Has network access to AWS CloudWatch APIs.
2. Has AWS credentials configured.
3. Is network-accessible from your OpenTelemetry Collector.

For **SigNoz Cloud** users, run the exporter on any EC2 instance, VM, or container with AWS credentials. The OTel Collector on the same host will forward metrics to SigNoz Cloud.

For **Self-Hosted** users, run the exporter on the same host as your OTel Collector, or ensure network connectivity between them.

### Step 1: Create Configuration File

Create a file named `api-gateway-metrics.yaml` with the following configuration:

```yaml:api-gateway-metrics.yaml
region: <aws-region>
metrics:
  - aws_namespace: AWS/ApiGateway
    aws_metric_name: Count
    aws_dimensions: [ApiName, Stage]
    aws_statistics: [Sum]

  - aws_namespace: AWS/ApiGateway
    aws_metric_name: Latency
    aws_dimensions: [ApiName, Stage]
    aws_statistics: [Average]
    aws_extended_statistics: [p99]

  - aws_namespace: AWS/ApiGateway
    aws_metric_name: IntegrationLatency
    aws_dimensions: [ApiName, Stage]
    aws_statistics: [Average]
    aws_extended_statistics: [p99]

  - aws_namespace: AWS/ApiGateway
    aws_metric_name: 4XXError
    aws_dimensions: [ApiName, Stage]
    aws_statistics: [Sum]

  - aws_namespace: AWS/ApiGateway
    aws_metric_name: 5XXError
    aws_dimensions: [ApiName, Stage]
    aws_statistics: [Sum]
```

Verify these values:
- `<aws-region>`: Your AWS region where API Gateway APIs are deployed (e.g., `us-east-1`, `eu-west-1`, `ap-south-1`).

See <a href="https://github.com/prometheus/cloudwatch_exporter/tree/master/examples" target="_blank" rel="noopener noreferrer nofollow">example configurations</a> for more service templates.

### Step 2: Download and Run the Exporter

<Tabs>
<TabItem value="jar" label="JAR File" default>

Download the CloudWatch Exporter JAR file using `curl`:

```bash
curl -LO https://repo1.maven.org/maven2/io/prometheus/cloudwatch/cloudwatch_exporter/0.16.0/cloudwatch_exporter-0.16.0-jar-with-dependencies.jar
```

Run the exporter with Java:

```bash
java -jar cloudwatch_exporter-0.16.0-jar-with-dependencies.jar 9106 api-gateway-metrics.yaml
```

This starts the exporter on port `9106`.

</TabItem>
<TabItem value="docker" label="Docker">

Run the CloudWatch Exporter as a <a href="https://github.com/prometheus/cloudwatch_exporter#docker-images" target="_blank" rel="noopener noreferrer nofollow">Docker container</a>:

```bash
docker run -d \
  --name cloudwatch-exporter \
  -p 9106:9106 \
  -v $(pwd)/api-gateway-metrics.yaml:/config/config.yml \
  -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
  -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
  prom/cloudwatch-exporter
```

Replace the AWS credential environment variables with your actual credentials or use an IAM role if running on EC2.

</TabItem>
</Tabs>

Verify the exporter is running by checking the metrics endpoint:

```bash
curl http://localhost:9106/metrics | grep aws_apigateway
```

You should see metrics like `aws_apigateway_count_sum`, `aws_apigateway_latency_average`, etc.

### Step 3: Configure OpenTelemetry Collector

Add the following `prometheus` receiver to your existing `otel-collector-config.yaml` to scrape the CloudWatch Exporter:

```yaml:otel-collector-config.yaml
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: 'api-gateway-cloudwatch'
          scrape_interval: 60s
          static_configs:
            - targets: ['<exporter-host>:9106']
```

Verify these values:
- `<exporter-host>`: The hostname or IP where the CloudWatch Exporter is running. Use `localhost` if running on the same machine.

Enable the `prometheus` receiver in your metrics pipeline by updating the `service` section:

```yaml:otel-collector-config.yaml
service:
  pipelines:
    metrics:
      receivers: [otlp, prometheus]
      processors: [batch]
      exporters: [otlp]
```

<Admonition type="note">
Append these configurations to your existing `otel-collector-config.yaml`. Do not replace your entire configuration file.
</Admonition>

Restart your OpenTelemetry Collector to apply the changes.

### Validate

To confirm that API Gateway metrics are flowing to SigNoz:

1. Navigate to **Dashboards** → **New Dashboard** → **New Panel** in SigNoz.
2. In the query builder, search for metrics starting with `aws_apigateway_` (e.g., `aws_apigateway_count_sum`).
3. Verify that metrics appear with `api_name` and `stage` labels matching your APIs.

If you see metrics with appropriate labels, your setup is working correctly.

### Collecting Access Logs

If API Gateway access logs are enabled and sent to CloudWatch, use the `awscloudwatch` receiver:

```yaml
receivers:
  awscloudwatch:
    region: <aws-region>
    logs:
      poll_interval: 1m
      groups:
        named:
          /aws/api-gateway/<api-name>:
```

Replace `<aws-region>` and `<api-name>` with your actual values.

See [Send CloudWatch Logs to SigNoz](https://signoz.io/docs/userguide/send-cloudwatch-logs-to-signoz/) for full configuration.

</TabItem>
</Tabs>

## Next Steps

Once API Gateway metrics are flowing to SigNoz, you can:

- **Set up alerts** for critical metrics like error rates or latency. See [Alerts](https://signoz.io/docs/alerts/).
- **Create dashboards** to visualize API performance. See [Dashboards](https://signoz.io/docs/userguide/manage-dashboards/).
- **Collect access logs** for detailed request analysis. See [Send CloudWatch Logs to SigNoz](https://signoz.io/docs/userguide/send-cloudwatch-logs-to-signoz/).
