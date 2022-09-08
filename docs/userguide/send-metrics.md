---
id: send-metrics
title: Send Metrics to SigNoz
sidebar_label: Send Metrics
---

import GetHelp from '../shared/get-help.md'
import SaveChangesRestart from '../shared/save-changes-and-restart.md'


By default, when you install SigNoz, only the [Hostmetric receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md) is enabled. Before you can query other metrics, you must first enable additional receivers in SigNoz.

There are two ways in which you can send metrics to SigNoz using OpenTelemetry:
- [Enable a Specific Metric Receiver](#enable-a-specific-metric-receiver)
- [Enable a Prometheus Receiver](#enable-a-prometheus-receiver)
- [Find Metrics available in SigNoz](#find-metrics-available-in-signoz)
  - [Metrics from Hostmetrics receiver](#metrics-from-hostmetrics-receiver)
- [Related Videos](#related-videos)
- [Get Help](#get-help)

Depending on your choice, use one of the sections below.

## Enable a Specific Metric Receiver

SigNoz supports all the receivers that are listed in the [opentelemetry-collector-contrib](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver) GitHub repository. To configure a new metric receiver, you must edit the `receivers` section of the `deploy/docker/clickhouse-setup/otel-collector-config.yaml` file. The following example shows the default configuration in which the `hostmetrics` receiver is enabled:

```yaml {14-22}
receivers:
  otlp/spanmetrics:
    protocols:
      grpc:
        endpoint: "localhost:12345"
  otlp:
    protocols:
      grpc:
      http:
  jaeger:
    protocols:
      grpc:
      thrift_http:
  hostmetrics:
    collection_interval: 30s
    scrapers:
      cpu:
      load:
      memory:
      disk:
      filesystem:
      network:
processors:
  batch:
    send_batch_size: 1000
    timeout: 10s
# This file was truncated for brevity
```

To enable a new OpenTelemetry receiver, follow the steps below:

1. Move into the directory in which you installed SigNoz, and open the `deploy/docker/clickhouse-setup/otel-collector-config.yaml` file in a plain-text editor.
2. Configure your receivers. The following example shows how you can enable a receiver named `examplereceiver`:
  ```yaml {23,24}
  receivers:
    otlp/spanmetrics:
      protocols:
        grpc:
          endpoint: "localhost:12345"
    otlp:
      protocols:
        grpc:
        http:
    jaeger:
      protocols:
        grpc:
        thrift_http:
    hostmetrics:
      collection_interval: 30s
      scrapers:
        cpu:
        load:
        memory:
        disk:
        filesystem:
        network:
    examplereceiver:
      endpoint: 1.2.3.4:8080
  processors:
    batch:
      send_batch_size: 1000
      timeout: 10s
  # This file was truncated for brevity.
  ```
  For details about configuring OpenTelemetry receivers, see the [README](https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/README.md) page of the `opentelemetry-collector` GitHub repository.
3. <SaveChangesRestart /> 

## Enable a Prometheus Receiver

SigNoz supports all the exporters that are listed on the [Exporters and Integrations](https://prometheus.io/docs/instrumenting/exporters/) page of the Prometheus documentation. If you have a running Prometheus instance, and you expose metrics in Prometheus, then you can scrape them in SigNoz by configuring Prometheus receivers in the `receivers.prometheus.config.scrape_configs` section of the `deploy/docker/clickhouse-setup/otel-collector-metrics-config.yaml` file.

To enable a Prometheus receiver, follow the steps below:
1. Open the `deploy/docker/clickhouse-setup/otel-collector-metrics-config.yaml` file in a plain-text editor.
2. Enable a new Prometheus receiver. Depending on your use case, there are two ways in which you can enable a new Prometheus exporter:
    - **By creating a new job**: The following example shows how you can enable a Prometheus receiver by creating a new job named `my-new-job`:
      ```yaml {15-18}
      receivers:
        otlp:
          protocols:
            grpc:
            http:

        # Data sources: metrics
        prometheus:
          config:
            scrape_configs:
              - job_name: "otel-collector"
                scrape_interval: 30s
                static_configs:
                  - targets: ["otel-collector:8889"]
              - job_name: "my-new-job"
                scrape_interval: 30s
                static_configs:
                  - targets: ["localhost:8080"]          
      processors:
        batch:
          send_batch_size: 1000
          timeout: 10s
      # This file was truncated for brevity.
      ```
    - **By adding a new target to an existing job**: The following example shows the default `otel-collector` job to which a new target (`localhost:8080`) was added:
      ```yaml {14}
      receivers:
        otlp:
          protocols:
            grpc:
            http:

        # Data sources: metrics
        prometheus:
          config:
            scrape_configs:
              - job_name: "otel-collector"
                scrape_interval: 30s
                static_configs:
                  - targets: ["otel-collector:8889", "localhost:8080"]       
      processors:
        batch:
          send_batch_size: 1000
          timeout: 10s
      # This file was truncated for brevity.
      ```
    Note that all the jobs are scraped in parallel, and all targets inside a job are scraped serially. For more details about configuring jobs and targets, see the following sections of the Prometheus documentation:
      - [<Scrape_config>](https://prometheus.io/docs/prometheus/latest/configuration/configuration/#scrape_config)
      - [Jobs and Instances](https://prometheus.io/docs/concepts/jobs_instances/)
3. <SaveChangesRestart />

## Find Metrics available in SigNoz

You can connect to SigNoz'a clickhouse instance and find the metrics SigNoz is storing. As of now this is bit of manual process, we are bringing capbilities to auto-suggest available metrics soon.

You can follow the below steps

1. [Install ClickHouse client](https://clickhouse.com/docs/en/getting-started/install/)

2. Connect to the ClickHouse container
  ````
  docker exec -it clickhouse-setup_clickhouse_1 bash
  ````
3. Run the clickhouse-client command to connect to the database service
  ````
  clickhouse client --host <SigNoz IP>  --port 9000
  ````
4. Run the query to list metrics
  ````
  select DISTINCT(JSONExtractString(time_series.labels,'__name__')) as metrics from signoz_metrics.time_series
  ````
5. If needed, dump in a csv file and parse it locally
  ```
  select DISTINCT(labels) from signoz_metrics.time_series INTO OUTFILE 'output.csv' 
  ```

You can use this metrics to plot in the [Dashboard](/docs/userguide/manage-dashboards) section

### Metrics from Hostmetrics receiver

Metrics which are available if hostmetrics is enabled. This is enabled in SigNoz default installation.

| Metrics | Description |
| --- | ----- |
| `system_filesystem_usage_total` | |
| `system_network_dropped_total` | |
| `system_cpu_time_total` | |
| `system_disk_merged_total` | |
| `system_disk_io_time_total` | |
| `system_disk_operations_total` | |
| `system_network_errors_total` | |
| `system_network_io_total` | |
| `system_disk_weighted_io_time_total` | |
| `system_network_packets_total` | |
| `system_disk_operation_time_total` | |
| `system_cpu_load_average_5m` | |
| `system_memory_usage_total` | |
| `system_disk_pending_operations_total` | |
| `system_disk_io_total` | |
| `system_cpu_load_average_15m` | |
| `system_cpu_load_average_1m` | |

## Related Videos

- [How to view Prometheus Metrics in SigNoz](https://youtu.be/QGJYNYzfM9o)

## Get Help

<GetHelp />
