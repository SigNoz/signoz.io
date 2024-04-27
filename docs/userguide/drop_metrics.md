---
id: drop-metrics
title: Guide to drop metrics
sidebar_label: Drop Metrics
---

import GetHelp from '../shared/get-help.md'


The filter processor in OpenTelemetry allows you to drop metrics based on their name, label values, or other attributes. This is useful if you want to exclude certain metrics from being sent to SigNoz.

The filter processor is configured in the `processors::filter` section of the `otel-collector-config.yaml` file.

:::note

The processor needs to be added to the metrics pipeline to take effect. 

    metrics:
      receivers: [otlp]
      processors: [filter/drop_metrics_by_name, batch]
      exporters: [otlp]
:::


1. Drop metrics by name

```yaml
processors:
  filter/drop_metrics_by_name:
    metrics:
      exclude:
        match_type: strict
        metric_names:
          - http.client.request.body.size
          - http.client.response.body.size
```

2. Drop metrics by name regex

```yaml
processors:
  filter/drop_metrics_by_name_regex:
    metrics:
      exclude:
        match_type: regexp
        metric_names:
          - http.client.*
```


3. Drop metrics by resource attributes (like service.name, host.name, k8s.pod.name, etc.)

```yaml
processors:
  filter/drop_metrics_by_label_values:
    metrics:
      metric:
        - resource.attributes["k8s.pod.name"] == "test-pod"
```

4. Drop metrics by resource attributes regex

```yaml
processors:
  filter/drop_metrics_by_label_values_regex:
    metrics:
      metric:
        - IsMatch(resource.attributes["k8s.pod.name"], "test-pod-.*")
```

5. Drop metrics by metric attributes (like http.method, message.operation, etc.)

```yaml
processors:
  filter/drop_metrics_by_label_values:
    metrics:
      datapoint:
        - attributes["http.method"] == "GET"
```

6. Drop metrics by metric attributes regex

```yaml
processors:
  filter/drop_metrics_by_label_values_regex:
    metrics:
      datapoint:
        - IsMatch(attributes["http.method"], "GET|POST")
```

Refer to the [OpenTelemetry documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/filterprocessor) for more details on how to configure the filter processor.

## Get Help

<GetHelp />
