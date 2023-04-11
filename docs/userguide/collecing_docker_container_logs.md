---
title: Collecting Docker container logs
id: collect_docker_logs
---

# Collecting Docker container logs

With SigNoz you can collect all your docker container logs and perform different queries on top of it.
Below are the steps to collect docker container logs.

##  Steps for collecting logs if SigNoz is running on the same host.
Once you deploy SigNoz in docker, it will automatically start collecting logs of all the docker containers. 

### Disable automatic container log collection.
You can disable automatic container logs collection by modifying the `otel-collector-config.yaml` file which is present inside `deploy/docker/clickhouse-setup`

  ```yaml {5}
  ...
  service:
    pipelines:
      logs:
        receivers: [otlp]
        processors: [batch]
        exporters: [clickhouselogsexporter]
  ...
  ```
  Here we have modified the value of recerivers from `[otlp, filelog/dockercontainers]` to `[otlp]`.
  Now you can restart SigNoz and the changes will be applied.

### Filter/Exclude logs
If you want to exclude some containers you can exclude them based the container id or using a filter operator.

* **Using exclude key in filelog receiver** : We will modify the filelog reciever in `otel-collector-config.yaml` file which is present inside `deploy/docker/clickhouse-setup`
  ```yaml {4}
  receivers:
    filelog/dockercontainers:
      include: [  "/var/lib/docker/containers/*/*.log" ]
      exclude: [ "/var/lib/docker/containers/*/<container_id>.log" ]
      start_at: end
  ...
  ```
  Here we are using exclude key in the filelog config to exclude logs of a certain container.

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

* Now we can restart the otel collector container so that new changes are applied and the docker container logs will be visible in SigNoz.

## Steps for collecting logs if SigNoz is running on a different host.

If you have a signoz running on a different host then you will have to run a otel-collector to export logs from your host to the host where SigNoz is running.

* We will create a `otel-collector-config.yaml`
  ```yaml
  receivers:
    filelog/containers:
      include: [  "/var/lib/docker/containers/*/*.log" ]
      start_at: end
      include_file_path: true
      include_file_name: false
      operators:
      - type: json_parser
        id: parser-docker
        output: extract_metadata_from_filepath
        timestamp:
          parse_from: attributes.time
          layout: '%Y-%m-%dT%H:%M:%S.%LZ'
      # Extract metadata from file path
      - type: regex_parser
        id: extract_metadata_from_filepath
        regex: '^.*containers/(?P<container_id>[^_]+)/.*log$'
        parse_from: attributes["log.file.path"]
        output: parse_body
      - type: move
        id: parse_body
        from: attributes.log
        to: body
        output: add_source
      - type: add
        id: add_source
        field: resource["source"]
        value: "docker"
      - type: remove
        id: time
        field: attributes.time
  processors:
    batch:
      send_batch_size: 10000
      send_batch_max_size: 11000
      timeout: 10s
  exporters:
    otlp/log:
      endpoint: http://<host>:<port>
      tls:
        insecure: true
  service:
    pipelines:
      logs:
        receivers: [filelog/containers]
        processors: [batch]
        exporters: [ otlp/log ]
  ```
  Here we are parsing the logs and extracting different values like timestamp, body and removing duplicate fields using different operators that are available. You can read more about operators [here](./logs.md#operators-for-parsing-and-manipulating-logs)

  The parsed logs are batched up using the batch processor and then exported to the host where signoz is deployed. The `otlp/log` exporter here uses a http endpoint but if you want to use https you will have to provide the certificate and the key. You can read more about it [here](https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md)

  For finding the right host and port for your SigNoz cluster please follow the guide [here](../install/troubleshooting.md#signoz-otel-collector-address-grid).  

* We will start our otel-collector container and mount the docker container path so that the logs can be read for all containers.
  ```
  docker run -d --name signoz-host-otel-collector --user root -v /var/lib/docker/containers:/var/lib/docker/containers:ro -v $(pwd)/otel-collector-config.yaml:/etc/otel/config.yaml signoz/signoz-otel-collector:0.55.0-rc.3
  ```

* If there are no errors your logs will be exported and visible on the SigNoz UI. 