---
title: FluentD to SigNoz
id: fluentd_to_signoz
---

# FluentD to SigNoz

If you use fluentD to collect logs in your stack with this tutotrial you will be able to send logs from fluentD to SigNoz.

At SigNoz we use opentelemetry collector to recieve logs which supports the fluentforward protocol. So you can forward your logs from your fluentD agent to opentelemetry collector

## Steps:
* Add fluentforward reciever to your `otel-collector-config.yaml` which is present inside `deploy/docker/clickhouse-setup`
    ```
    receivers:
      fluentforward:
        endpoint: 0.0.0.0:24224
    ```
    Here we have used port 24224 for listing in fluentforward protocol, but you can change it to a port you want.
    You can read more about fluentforward receiver [here](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/fluentforwardreceiver).

* Uncomment the exporter and pipleline for logs and make the following change in `otel-collector-config.yaml`
    ```
    exporters:
      ...
      
      clickhouselogsexporter:
      dsn: tcp://clickhouse:9000/
      timeout: 5s
      sending_queue:
        queue_size: 100
      retry_on_failure:
        enabled: true
        initial_interval: 5s
        max_interval: 30s
        max_elapsed_time: 300s
      
      ...

    service:
      ...

      logs:
        receivers: [ otlp, fluentforward ]
        processors: [ batch ]
        exporters: [  clickhouselogsexporter ]
    ```
    Here we are adding our clickhouse exporter and creating a pipeline which will collect logs from `fluentforward` receiver, processing it using batch processor and export it to clickhouse.

* Change the fluentD config to forward the logs to otel collector.
    ```
    <source>
      @type sample
      sample [{"message": "my log data", "source": "myhost"}, {"message": "my log data 1", "source": "myhost1"}]
      tag sample
      rate 10000
    </source>

    <match sample>
      @type forward
      send_timeout 60s
      recover_wait 10s
      hard_timeout 60s

      <server>
        name myserver1
        host otel-collector-host
        port 24224
      </server>
    </match>
    ```
    In this example we are generating sample logs and then forwarding them to the otel collector which is listening on  port 24224.
    `otel-collector-host` has to be replaced by the host where otel-collector is running. For more info check [troubleshooting](../install/troubleshooting.md#signoz-otel-collector-address-grid). 
*  Once you make this changes you can restart fluentD and SignNoz, and you will be able to see the logs in SigNoz.
*  To properly transform your existing log model into opentelemetry [log](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/logs/data-model.md) model you can use the different processors provided by opentelemetry. [link](./logs.md#processors-available-for-processing-logs)
  
    eg:- 
    ```
    processors:
      logstransform:
        operators:
          - type: trace_parser
            trace_id:
              parse_from: attributes.trace_id
            span_id:
              parse_from: attributes.span_id
          - type: remove
            field: attributes.trace_id
          - type: remove
            field: attributes.span_id
    ```
    The operations in the above processor will parse the trace_id and span_id from log to opentelemetry log model and remove them from attributes.