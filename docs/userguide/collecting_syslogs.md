---
title: Collecting syslogs
id: collecting_syslogs
---

# Collecting Syslogs

With SigNoz you can collect your syslogs logs and perform different queries on top of it.
In this example we will configure `rsyslog` to forward our system logs to tcp endpoint of otel-collector and use `syslog` receiver in otel-collector to receive and parse the logs.
Below are the steps to collect syslogs.

## Steps
* Modify the `docker-compose.yaml` file present inside `deploy/docker/clickhouse-setup` to expose a port, in this case `54527` so that we can forward syslogs to this port.
    ```yaml {8}
    ...
    otel-collector:
        image: signoz/signoz-otel-collector:0.55.0-rc.3
        command: ["--config=/etc/otel-collector-config.yaml"]
        volumes:
          - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
        ports:
          - "54527:54527"
    ...
    ```

* Add the syslog reciever to `otel-collector-config.yaml` which is present inside `deploy/docker/clickhouse-setup`
    ```yaml {2-10}
    receivers:
      syslog:
        tcp:
          listen_address: "0.0.0.0:54527"
        protocol: rfc3164
        location: UTC
        operators:
          - type: move
            from: attributes.message
            to: body
    ...
    ```
    Here we are collecting the logs and moving message from attributes to body using operators that are available.
    You can read more about operators [here](./logs.md#operators-for-parsing-and-manipulating-logs)

    For more configurations that are available for syslog receiver please check [here](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/syslogreceiver).

* Next we will modify our pipeline inside `otel-collector-config.yaml` to include the receiver we have created above.
    ```yaml {4}
    service:
        ....
        logs:
            receivers: [otlp, syslog]
            processors: [batch]
            exporters: [clickhouselogsexporter]
    ```

* Now we can restart the otel collector container so that new changes are applied and we can forward our logs to port `54527`.

* Modify your `rsyslog.conf` file present inside `/etc/` by running `sudo vim /etc/rsyslog.conf` and adding the this line at the end
    ```
    *.* action(type="omfwd" target="0.0.0.0" port="54527" protocol="tcp")
    ```

    For production use cases it is recommended to using something like
    ```
    *.*  action(type="omfwd" target="0.0.0.0" port="54527" protocol="tcp"
            action.resumeRetryCount="10"
            queue.type="linkedList" queue.size="10000")
    ```

    So that you have retires and queue in place to de-couple the sending from the other logging action.

    The value of `target` might vary depending on where SigNoz is deployed, since it is deployed on the same host I am using `0.0.0.0` for more help you can visit [here](../install/troubleshooting.md#signoz-otel-collector-address-grid)

* Now restart your rsyslog service by running `sudo systemctl restart rsyslog.service`
* You can check the status of service by running `sudo systemctl status rsyslog.service`
* If there are no errors your logs will be visible on SigNoz UI.
  
