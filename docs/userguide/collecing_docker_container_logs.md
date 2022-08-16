---
title: Collecting Docker container logs
id: collect_docker_logs
---

# Collecting Docker container logs

With SigNoz you can collect all your docker container logs and perform different queries on top of it.
Below are the steps to collect docker container logs.

This guide assumes that signoz is running in the same host where your docker containers are running.

## Steps
* Modify the `docker-compose.yaml` file present inside `deploy/docker/clickhouse-setup` to run the OTEL collector as root user and mount the docker container directory as highlighted below.
    ```yaml {5,8}
    ...
    otel-collector:
        image: signoz/signoz-otel-collector:0.55.0-rc.3
        command: ["--config=/etc/otel-collector-config.yaml"]
        user: "root" # required for reading docker container logs
        volumes:
        - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
        - /var/lib/docker/containers:/var/lib/docker/containers:ro
    ...
    ```

* Add the filelog reciever to `otel-collector-config.yaml` which is present inside `deploy/docker/clickhouse-setup`
    ```yaml {2-31}
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
    ...
    ```
    Here we are parsing the logs and extracting different values like timestamp, body and removing duplicate fields using different operators that are available.
    You can read more about operators [here](./logs.md#operators-for-parsing-and-manipulating-logs)

* Next we will modify our pipeline inside `otel-collector-config.yaml` to include the receiver we have created above.
    ```yaml {4}
    service:
        ....
        logs:
            receivers: [otlp, filelog/containers]
            processors: [batch]
            exporters: [clickhouselogsexporter]
    ```

* Now we can restart the otel collector container so that new changes are applied and the docker container logs will be visible in SigNoz.
