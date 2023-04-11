---
title: Collecting Application Logs from Log file
id: collect_logs_from_file
---
# Collecting application Logs from Log file

With SigNoz you can collect your application logs from a log file and push it to SigNoz and perform different actions on your data.
In this blog we will create a simple application that will create a log file and we will configure otel-collector to read those logs from the file and push them.

For this sample application we will be using Python but the same idea can be extended to any application that can write logs to a file.


We will create a sample python script name `main.py` and the following code for generating dummy log data.
  ```python
  import logging
  import time

  logging.basicConfig(filename="./python.log", level=logging.DEBUG, datefmt='%Y-%m-%d,%H:%M:%S %z',
                      format="{\"time\": \"%(asctime)s\", \"message\": \"%(message)s\"}", filemode="a")

  if __name__ == '__main__':
      while True:
          logging.debug("Logging test...")
          logging.info("The program is working as expected")
          logging.warning("The program may not function properly")
          logging.error("The program encountered a    n error")
          logging.critical("The program crashed")
          time.sleep(2)
  ```
  So this python script creates a logger which outputs logs to a file named `python.log` in the same directory.


## Steps for collecting logs if SigNoz is running on the same host.

* Modify the `docker-compose.yaml` file present inside `deploy/docker/clickhouse-setup` to expose to mount the log file to otel-collector.

    ```yaml {6}
      ...
      otel-collector:
      image: signoz/signoz-otel-collector:0.55.0-rc.3
      command: ["--config=/etc/otel-collector-config.yaml"]
      volumes:
        - ~/<path>/python.log:/tmp/python.log
      ....
    ```

    Here we are mounting the log file of our application to the `tmp` directory of SigNoz otel-collector.
    You will have to replace `<path>` with the path where your log file is present.

* Add the filelog reciever to `otel-collector-config.yaml` which is present inside `deploy/docker/clickhouse-setup`
    ```yaml {3-15}
    receivers:
      ...
      filelog:
        include: [ /tmp/python.log ]
        start_at: beginning
        operators:
          - type: json_parser
            timestamp:
              parse_from: attributes.time
              layout: '%Y-%m-%d,%H:%M:%S %z'
          - type: move
            from: attributes.message
            to: body
          - type: remove
            field: attributes.time
    ...
    ```
    Here we are collecting the logs from the path and parsing them using the json parser and extracting the timestamp. After that we are cleaning up the attributes using different operators.You can read more about operators [here](./logs.md#operators-for-parsing-and-manipulating-logs)

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

* We can now run the python script to generate logs using `python3 main.py`
  
* If there are no errors your logs will be visible on SigNoz UI.
  


## Steps for collecting logs if SigNoz is running on a different host.

If you have a signoz running on a different host then you will have to run a otel-collector to export logs from your host to the host where SigNoz is running.


* We will create a `otel-collector-config.yaml`
  ```yaml
  receivers:
    filelog:
      include: [ /tmp/python.log ]
      start_at: beginning
      operators:
        - type: json_parser
          timestamp:
            parse_from: attributes.time
            layout: '%Y-%m-%d,%H:%M:%S %z'
        - type: move
          from: attributes.message
          to: body
        - type: remove
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
        receivers: [filelog]
        processors: [batch]
        exporters: [ otlp/log ]
  ```
   Here we are collecting the logs from the path and parsing them using the json parser and extracting the timestamp. After that we are cleaning up the attributes using different operators.You can read more about operators [here](./logs.md#operators-for-parsing-and-manipulating-logs)

  The parsed logs are batched up using the batch processor and then exported to the host where signoz is deployed. The `otlp/log` exporter here uses a http endpoint but if you want to use https you will have to provide the certificate and the key. You can read more about it [here](https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md)

  For finding the right host and port for your SigNoz cluster please follow the guide [here](../install/troubleshooting.md#signoz-otel-collector-address-grid).  

* We will start our otel-collector container and mount the logs file so that the logs can be read from log file.
  ```
  docker run -d --name signoz-host-otel-collector --user root -v $(pwd)/python.log:/tmp/python.log:ro -v $(pwd)/otel-collector-config.yaml:/etc/otel/config.yaml signoz/signoz-otel-collector:0.55.0-rc.3
  ```

* If there are no errors your logs will be exported and visible on the SigNoz UI. 