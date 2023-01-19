---
title: Collecting Kubernetes pod logs
id: collect_kubernetes_pod_logs
---

# Collecting Kubernetes Pod logs

When you deploy SigNoz to your kubernetes cluster it will automatically start collecting all the pod logs. It will automatically parse out different attributes from the logs like name, namespace, container name, uid etc. But if you want to parse specific attributes from certain kind of logs you can use different kinds of operators provided by opentelemetry [here](./logs.md#operators-for-parsing-and-manipulating-logs) 

### Steps to disable automatic pod logs collection
* Modify/Create the `override-values.yaml` file
  ```yaml
  k8s-infra:
    presets:
      logsCollection:
        enabled: false
  ```
  You can apply this yaml file by running the following command
  ```
  helm -n platform upgrade my-release signoz/signoz -f override-values.yaml
  ```  

  In case of external K8s cluster where only k8s-infra chart is installed, users can disable log collections by including the following in `override-values.yaml` :
  ```yaml
  presets:
    logsCollection:
      enabled: false
  ```
  You can apply this yaml file by running the following command
  ```
  helm -n platform upgrade my-release signoz/k8s-infra -f override-values.yaml
  ```  

  Once the above is applied to your k8s cluster, logs collection will be disabled.
### Steps to Filter/Exclude logs collection

* **Excluding certain log files** : If you want to exclude logs of certain pods/namespace you can do it using the following config in `override-values.yaml`.
  ```yaml
  k8s-infra:
  presets:
    logCollection:
      # whether to enable log collection
      enabled: true
      blacklist:
        # whether to enable blacklisting
        enabled: true
        # whether to exclude signoz logs
        signozLogs: false
        # which namespaces to exclude
        namespaces:
          - kube-system
        # which pods to exclude
        pods:
          - hotrod
          - locust
        # which containers to exclude
        containers: []
        # additional exclude rules
        additionalExclude: []
  ```
 

* **Using filter operator in filelog receiver** : You can also use the filter operator to filter out logs by changing the operators here [charts](https://github.com/SigNoz/charts/blob/main/charts/k8s-infra/values.yaml).
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
