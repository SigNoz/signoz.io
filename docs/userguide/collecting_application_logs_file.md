---
title: Collecting Application Logs from Log file
id: collect_logs_from_file
---
# Collecting application Logs from Log file

With SigNoz you can collect your application logs from a log file and push it to SigNoz and perform different actions on your data.
In this blog we will create a simple application that will create a log file and we will configure otel-collector to read those logs from the file and push them.

For this sample application we will be using Python but the same idea can be extended to any application that can write logs to a file.

This guide also assumes that SigNoz is running on that same host where your application is running and the path where logs is getting written can be read by the SigNoz otel-collector container. If there is a case where singoz is running on a different machine, then you will have to run a otel-collector or other agent like FluentBit on your machine to export them to SigNoz otel-collector running on another machine.

## Steps

* Please make sure that you have python installed on your system and you have a running instance of SigNoz.
* We will create a sample python script name `main.py` and the following code.
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
  
