---
id: ec2-logs
title: Send Application/Server logs from EC2 to SigNoz
---

## Introduction
This guide provides detailed instructions on how to send application and server logs from an EC2 instance to **SigNoz Cloud**. By integrating with SigNoz, you can efficiently collect, monitor, and analyze your logs for better insights into your applications and servers.

## Prerequisites

- A Linux-based EC2 instance 
- An active [SigNoz Cloud](http://localhost:3000/teams/) account

Sending your server/application logs to SigNoz Cloud broadly involves these two simple steps:
- Install OpenTelemetry Collector(OTel collector)
- Configure filelog receiver


## Install OpenTelemetry Collector

The OpenTelemetry collector provides a vendor-neutral way to collect, process, and export your telemetry data such as logs, metrics, and traces.

You can install OpenTelemetry collector as an agent on your Virtual Machine by following this [guide](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/).


## Dummy log file

As an example, we can use a sample log file called `app.log` with the following dummy data:

```
This is log line 1
This is log line 2
This is log line 3
```

This file represents a log file of your application/server.

## Configure filelog receiver

Receivers are used to get data into the collector. A filelog receiver collects logs from files. 
Modify the `config.yaml` file that you created while installing OTel collector in the previous step to include the filelog receiver. This involves specifying the path to your `app.log` file (or your log file) and setting the `start_at` parameter. For more fields that are available for filelog receiver please check [this link](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver).


```yaml
receivers:
  ...
  filelog/app:
    include: [ /tmp/app.log ] #include the full path to your log file
    start_at: end
...
```

:::note 

The `start_at: end` configuration ensures that only newly added logs are transmitted. If you wish to include historical logs from the file, remember to modify `start_at` to `beginning`.

:::

## Update pipeline configuration

Receivers must be enabled via pipelines within the service section of the collector config file. In the same `config.yaml` file mentioned above, update the pipeline settings to include the new filelog receiver. This step is crucial for ensuring that the logs are correctly processed and sent to SigNoz.

```yaml {4}
    service:
        ....
        logs:
            receivers: [otlp, filelog/app]
            processors: [batch]
            exporters: [otlp]
```

Now restart the OTel collector so that new changes are applied. The steps to run the OTel collector can be found [here](https://signoz.io/docs/tutorial/opentelemetry-binary-usage-in-virtual-machine/)

## Verifying the exported logs
The logs will be exported to SigNoz UI. If you add more entries to your app.log file they will also be visible in SigNoz UI.

<figure data-zoomable align='center'>
    <img src="/img/docs/ec2-application-server-logs.webp" alt="Logs of the dummy app.log file visible in SigNoz"/>
    <figcaption><i>Dummy log file data shown in SigNoz Logs Explorer</i></figcaption>
</figure>