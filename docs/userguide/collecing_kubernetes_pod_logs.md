---
title: Collecting Kubernetes pod logs
id: collect_kubernetes_pod_logs
---

# Collecting Kubernetes Pod logs

When you deploy SigNoz to your kubernetes cluster it will automatically start collecting all the pod logs. It will automatically parse out different attributes from the logs like name, namespace, container name, uid etc. But if you want to parse specific attributes from certain kind of logs you can use different kinds of operators provided by opentelemetry [here](./logs.md#operators-for-parsing-and-manipulating-logs) 

### Steps to disable automatic pod logs collection
* Modify the `values.yaml` file in [charts](https://github.com/SigNoz/charts/blob/main/charts/signoz/values.yaml)
  ```yaml {7}
  ...
    service:
      ...
      pipelines:
        ...
        logs:
          receivers: [otlp]
          processors: [batch]
          exporters: [clickhouselogsexporter]
  ```
  Here we have modified the value of receivers from `[filelog/k8s, otlp]` to `[otlp]`

### Filter/Exclude logs

* **Using exclude key in filelog receiver** : If you want to exclude logs of certain pods we can do that by modifying the filelog reciever in `values.yaml` file in [charts](https://github.com/SigNoz/charts/blob/main/charts/signoz/values.yaml).
  ```yaml {4}
  receivers:
    filelog/k8s:
      include: [  "/var/log/pods/*/*/*.log" ]
      exclude: [ "/var/log/pods/*/<pod-name>/*.log" ]
      start_at: end
  ...
  ```
  Here we are using exclude key in the filelog config to exclude logs of a certain Pod.

* **Using filter operator in filelog receiver** : You can also use the filter operator to filter out logs
  ```yaml {3-6}
  ....
    operators:
      - type: filter
        expr: 'body matches "^LOG: .* END$"'
        drop_ratio: 1.0
  ....
  ```
  Here we are matching logs using an expression and dropping the entire log by setting `drop_ratio: 1.0` . You can read more about the filter operator [here](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/filter.md)

* Now you can restart the otel collector pod so that new changes are applied.