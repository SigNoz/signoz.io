---
title: Collecting Application Logs from Log file
id: collect_logs_from_file
---
# Collecting application Logs from Log file

With SigNoz you can collect your application logs from a log file and push it to SigNoz and perform different actions on your data.

In this tutorail configure OpenTelemetry Collector to read logs from a file and push them to SigNoz.


We will create a sample log file named `app.log` and paste the following lines.
  ```
  This is a log line 1
  This is a log line 2
  This is a log line 3
  ```

## Collect Application Logs from Log file in SigNoz cloud

If you don’t already have a SigNoz cloud account, you can sign up [here](https://signoz.io/teams/).

* Add otel collector binary to your VM by following this [guide](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/).
  

* Add the filelog reciever to `config.yaml`.
    ```yaml {3-15}
    receivers:
      ...
      filelog/app:
        include: [ /tmp/app.log ]
        start_at: beginning
    ...
    ```
    `start_at: beginning` can be removed once you are done testing.

    For parsing logs of different formats you will have to use operators, you can read more about operators [here](https://signoz.io/docs/userguide/logs/#operators-for-parsing-and-manipulating-logs).

    For more configurations that are available for filelog receiver please check [here](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

* Next we will modify our pipeline inside `config.yaml` to include the receiver we have created above.
    ```yaml {4}
    service:
        ....
        logs:
            receivers: [otlp, filelog/app]
            processors: [batch]
            exporters: [otlp]
    ```

* Now we can restart the otel collector so that new changes are applied.

* The log will be exported, if you add more lines to the log file it will be exported as well
  
* If there are no errors your logs will be visible on SigNoz UI.
  


## Collect Application Logs from Log file in Self-Hosted SigNoz

### Steps for collecting logs if SigNoz is running on the same host.

* Modify the `docker-compose.yaml` file present inside `deploy/docker/clickhouse-setup` to expose to mount the log file to otel-collector.

    ```yaml {6}
      ...
      otel-collector:
      image: signoz/signoz-otel-collector:0.79.5
      command: ["--config=/etc/otel-collector-config.yaml"]
      volumes:
        - ~/<path>/app.log:/tmp/app.log
      ....
    ```

    Here we are mounting the log file of our application to the `tmp` directory of SigNoz otel-collector.
    You will have to replace `<path>` with the path where your log file is present.

* Add the filelog reciever to `otel-collector-config.yaml` which is present inside `deploy/docker/clickhouse-setup`
    ```yaml {3-15}
    receivers:
      ...
      filelog:
        include: [ /tmp/app.log ]
        start_at: beginning
    ...
    ```
    `start_at: beginning` can be removed once you are done testing.

    For parsing logs of different formats you will have to use operators, you can read more about operators [here](./logs.md#operators-for-parsing-and-manipulating-logs)

    For more configurations that are available for filelog receiver please check [here](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).

* Next we will modify our pipeline inside `otel-collector-config.yaml` to include the receiver we have created above.
    ```yaml {4}
    service:
        ....
        logs:
            receivers: [otlp, filelog]
            processors: [batch]
            exporters: [clickhouselogsexporter]
    ```

* Now we can restart the otel collector container so that new changes are applied.

* The log will be exported, if you add more lines to the log file it will be exported as well
  
* If there are no errors your logs will be visible on SigNoz UI.
  


### Steps for collecting logs if SigNoz is running on a different host.

If you have a signoz running on a different host then you will have to run a otel-collector to export logs from your host to the host where SigNoz is running.


* We will create a `otel-collector-config.yaml`
  ```yaml
  receivers:
    filelog:
      include: [ /tmp/app.log ]
      start_at: beginning
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
        receivers: [filelog]
        processors: [batch]
        exporters: [ otlp/log ]
  ```
   For parsing logs of different formats you will have to use operators, you can read more about operators [here](./logs.md#operators-for-parsing-and-manipulating-logs)

  The parsed logs are batched up using the batch processor and then exported to the host where signoz is deployed. The `otlp/log` exporter here uses a http endpoint but if you want to use https you will have to provide the certificate and the key. You can read more about it [here](https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md)

  For finding the right host and port for your SigNoz cluster please follow the guide [here](../install/troubleshooting.md#signoz-otel-collector-address-grid).  

* We will start our otel-collector container and mount the logs file so that the logs can be read from log file.
  ```
  docker run -d --name signoz-host-otel-collector --user root -v $(pwd)/app.log:/tmp/app.log:ro -v $(pwd)/otel-collector-config.yaml:/etc/otel/config.yaml signoz/signoz-otel-collector:0.79.0
  ```

* If there are no errors your logs will be exported and visible on the SigNoz UI. 