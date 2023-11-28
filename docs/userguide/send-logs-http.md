---
title: Sending Logs to SigNoz over HTTP
id: send-logs-http
---

You can send your logs to SigNoz over HTTP.

The payload is an array of JSON logs. It follows the same structure as
[OTEL Logs Data Model](https://opentelemetry.io/docs/specs/otel/logs/data-model/).

Here is how the payload looks like:
```
[
  {
    "timestamp": <uint64>,
    "trace_id": <hex string>,
    "span_id": <hex string>,
    "trace_flags": <int>
    "severity_text": <string>,
    "severity_number": <int>,
    "attributes": <map>,
    "resources": <map>,
    "body": <string>,
  }
]
```

Note :- 
* `timestamp` is int64 nanoseconds since Unix epoch
* You can use `message` instead of `body`.
* Any other keys present apart from the ones mentioned above will be moved to the attributes map.
  Ex:- 
  
  ```json
  [
    {
      "host": "myhost",
      "method": "GET",
      "body": "this is a log line"
    }
  ]
  ```

  Will be finally treated as:

  ```json
  [
    {
      "attributes": {
        "host": "myhost",
        "method": "GET"
      },
      "body": "this is a log line"
    }
  ]
  ```


## Send logs to SigNoz in SigNoz cloud

* Here is a sample curl request:

  ```bash
  curl --location 'https://ingest.<REGION>.signoz.cloud:443/logs/json/' \
  --header 'Content-Type: application/json' \
  --header 'signoz-access-token: <SIGNOZ_INGESTION_KEY>' \
  --data '[
      {
          "timestamp": 1698310066000000000,
          "trace_id": "000000000000000018c51935df0b93b9",
          "span_id": "18c51935df0b93b9",
          "trace_flags": 0,
          "severity_text": "info",
          "severity_number": 4,
          "attributes": {
              "method": "GET",
              "path": "/api/users"
          },
          "resources": {
              "host": "myhost",
              "namespace": "prod"
          },
          "message": "This is a log line"
      }
  ]'
  ```

  `<SIGNOZ_INGESTION_KEY>` is the ingestion key.

  `<REGION>` is the name of the region.
  
  Depending on the choice of your region for SigNoz Cloud, the OTLP endpoint will vary according to the table below:

  | Region | Endpoint                   |
  | ------ | -------------------------- |
  | US     | ingest.us.signoz.cloud:443 |
  | IN     | ingest.in.signoz.cloud:443 |
  | EU     | ingest.eu.signoz.cloud:443 |

* Once you run the above curl, you can open your SigNoz UI to verify it.
  ![JSON Data in log body](../../static/img/logs/http-log.webp)
  


## Send logs to SigNoz in Self-Hosted SigNoz

* Modify the `docker-compose.yaml` file present inside `deploy/docker/clickhouse-setup` to expose a port, in this case `8082`.
    ```yaml {8}
    ...
    otel-collector:
        image: signoz/signoz-otel-collector:0.79.13
        command: ["--config=/etc/otel-collector-config.yaml"]
        volumes:
          - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
        ports:
          - "8082:8082"
    ...
    ```

* Add the httplogreceiver reciever to `otel-collector-config.yaml` which is present inside `deploy/docker/clickhouse-setup`:
    ```yaml {2-10}
    receivers:
      httplogreceiver/json:
        endpoint: 0.0.0.0:8082
        source: json
    ...
    ```

* Next we will modify our pipeline inside `otel-collector-config.yaml` to include the receiver we have created above.
    ```yaml {4}
    service:
        ....
        logs:
            receivers: [otlp, httplogreceiver/json]
            processors: [batch]
            exporters: [clickhouselogsexporter]
    ```

* Now we can restart the otel collector container so that new changes are applied and we can send our logs to port `8082`.

* Sample curl
  ```bash
  curl --location 'http://<IP>:8082' \
  --header 'Content-Type: application/json' \
  --data '[
    {
        "timestamp": 1698310066000000000,
        "trace_id": "000000000000000018c51935df0b93b9",
        "span_id": "18c51935df0b93b9",
        "trace_flags": 0,
        "severity_text": "info",
        "severity_number": 4,
        "attributes": {
            "method": "GET",
            "path": "/api/users"
        },
        "resources": {
            "host": "myhost",
            "namespace": "prod"
        },
        "message": "This is a log line"
    }
  ]'
  ```
  Replace IP with IP of the system where your collector is running.
  For more info check [troubleshooting](../install/troubleshooting.md#signoz-otel-collector-address-grid). 
* Once added you can verify by going to the SigNoz UI.
  ![test](../../static/img/logs/http-log.webp)