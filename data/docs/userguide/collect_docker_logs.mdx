---
title: Collecting Docker container logs
id: collect_docker_logs
---

# Collecting Docker container logs

With SigNoz you can collect all your docker container logs and perform different queries on top of it.
Below are the steps to collect docker container logs.


## Collect Docker container logs in SigNoz cloud

  * Clone this [repository](https://github.com/SigNoz/docker-container-logs)
  * Update  `otel-collector-config.yaml` and set the values of `<SIGNOZ_INGESTION_KEY>` and `{region}`.
  
  Depending on the choice of your region for SigNoz cloud, the otlp endpoint will vary according to this table.

  | Region | Endpoint                   |
  | ------ | -------------------------- |
  | US     | ingest.us.signoz.cloud:443 |
  | IN     | ingest.in.signoz.cloud:443 |
  | EU     | ingest.eu.signoz.cloud:443 |
  
* Start the containers `docker compose up -d`

* If there are no errors your logs will be exported and will be visible on the SigNoz UI.
  


## Collect Docker container logs in Self-Hosted SigNoz

###  Steps for collecting logs if SigNoz is running on the same host.
Once you deploy SigNoz in docker, it will automatically start collecting logs of all the docker containers, except for the container logs of SigNoz. 

#### Disable automatic container log collection.
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
  Here we have modified the value of receivers from `[otlp, tcplog/docker]` to `[otlp]`.
  Now you can restart SigNoz and the changes will be applied.

#### Filter/Exclude logs
If you want to exclude certain logs you can exclude them based the container name or based on pattern.

* **Using container name** : We will modify the `tcplog/docker` reciever in `otel-collector-config.yaml` file which is present inside `deploy/docker/clickhouse-setup` and add a new operator after `signoz_logs_filter`
  ```yaml {2}
  ...
  - type: filter
    expr: 'attributes.container_name matches "^(<container_name>|<container_name>)'
  ...
  ```
  Replace `<container_name>` with the name of the containers that you want to exclude.

  If you want to collect logs of signoz containers you can remove the names of signoz containers from the filter operator with id `signoz_logs_filter` operator.

* **Based on pattern** : You can also use the filter operator to filter out logs based on a pattern
  ```yaml {3-6}
  ....
    operators:
      - type: filter
        expr: 'body matches "^LOG: .* END$"'
        drop_ratio: 1.0
  ....
  ```
  Here we are matching logs using an expression and dropping the entire log by setting `drop_ratio: 1.0` . You can read more about the filter operator [here](https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/pkg/stanza/docs/operators/filter.md)

* Now we can restart the otel collector container so that new changes are applied and the docker container logs will be dropped for the specified containers.

### Steps for collecting logs if SigNoz is running on a different host.

If you have a signoz running on a different host then you can run logspout on the host and send logs to SigNoz cluster.

* Expose port `2255` of otel-collector by modifying the `docker-compose.yaml` file present inside `deploy/docker/clickhouse-setup`
  ```yaml {6}
  ...
  otel-collector:
      image: signoz/signoz-otel-collector:latest
      command: ["--config=/etc/otel-collector-config.yaml"]
      ports:
        - "2255:2255"
  ```

* Run logspout 
  ```bash
  docker run --net=host --rm --name="logspout" \
          --volume=/var/run/docker.sock:/var/run/docker.sock \
          gliderlabs/logspout \
          syslog+tcp://<host>:2255

  ```

  For finding the right host for your SigNoz cluster please follow the guide [here](../install/troubleshooting.md#signoz-otel-collector-address-grid).  

* If there are no errors your logs will be exported and visible on the SigNoz UI. 