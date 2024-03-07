---
id: linux-host-metrics
title: Linux Metrics and Logs Collection
description: View linux host metrics and logs on SigNoz
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Overview

To export Linux metrics and logs with OpenTelemetry, we need to install and configure the <a href = "https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main
" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry Collector Contrib</a>.

A full list of supported host metrics can be found <a href = "https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md#getting-started" rel="noopener noreferrer nofollow" target="_blank" >here</a>.

The logs will be collected with <a href = "https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/filelogreceiver
" rel="noopener noreferrer nofollow" target="_blank" >Filelog Receiver</a>

## Sending Linux Metrics and Logs to SigNoz

Install otel-collector-contrib on linux host

<Tabs>
  <TabItem value="cloud" label="SigNoz Cloud" default>

<Tabs>
  <TabItem value="DEB" label="DEB" default>

   ```sh
   sudo apt-get update
   sudo apt-get -y install wget
   wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.93.0/otelcol-contrib_0.93.0_linux_amd64.deb
   sudo dpkg -i otelcol-contrib_0.93.0_linux_amd64.deb
   ```

  </TabItem>
  <TabItem value="RPM" label="RPM" default>

   ```sh
   sudo yum update
   sudo yum -y install wget systemctl
   wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.93.0/otelcol-contrib_0.93.0_linux_amd64.rpm
   sudo rpm -ivh otelcol-contrib_0.93.0_linux_amd64.rpm
   ```

  </TabItem>
  <TabItem value="APK" label="APK" default>

   ```sh
   apk update
   apk add wget shadow
   wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.93.0/otelcol-contrib_0.93.0_linux_amd64.apk
   apk add --allow-untrusted otelcol-contrib_0.93.0_linux_amd64.apk
   ```

  </TabItem>
</Tabs>

   You can check the status of the installed service with:

   ```
   sudo systemctl status otelcol-contrib
   ```
   For check otelcol-contrib logs:
   ```bash
   sudo journalctl -u otelcol-contrib -f
   ```
   To collect host logs at `/var/log/` we need root permission. So edit the file `/lib/systemd/system/otelcol-contrib.service` for set User and Group as root:

   ```bash
   User=root
   Group=root
   ```

   After restart otel-contrib with new config:

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart otelcol-contrib
   ```
   Now edit the config file `/etc/otelcol-contrib/config.yaml` add the below config:

   ```bash
   extensions:
     health_check:
     pprof:
       endpoint: 0.0.0.0:1777
     zpages:
       endpoint: 0.0.0.0:55679

   receivers:
     hostmetrics:
       collection_interval: 10s
       scrapers:
         cpu:
         disk:
         filesystem:
         load:
         memory:
         network:
         paging:
     filelog:
       include: [ /var/log/*log ]
       start_at: end

   processors:
     batch:
     resourcedetection:
       detectors: [env, system]
     cumulativetodelta:

   exporters:
     otlp:
       endpoint: <IP-or-Endpoint-of-SigNoz-OtelCollector>:4317
       tls:
         insecure: false
       headers:
         "signoz-access-token": "<SIGNOZ_INGESTION_KEY>"

   service:
     pipelines:
       metrics:
         receivers: [hostmetrics]
         processors: [cumulativetodelta, batch, resourcedetection]
         exporters: [otlp]
       logs:
         receivers: [filelog]
         processors: [batch, resourcedetection]
         exporters: [otlp]

     extensions: [health_check, pprof, zpages]
  ```
  And restart OpenTelemetry Contrib Collector:

  ```bash
  sudo systemctl restart otelcol-contrib
  ```

</TabItem>

<TabItem value="self-host" label="Self-Host">

<Tabs>
  <TabItem value="DEB" label="DEB" default>

   ```sh
   sudo apt-get update
   sudo apt-get -y install wget
   wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.93.0/otelcol-contrib_0.93.0_linux_amd64.deb
   sudo dpkg -i otelcol-contrib_0.93.0_linux_amd64.deb
   ```

  </TabItem>
  <TabItem value="RPM" label="RPM" default>

   ```sh
   sudo yum update
   sudo yum -y install wget systemctl
   wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.93.0/otelcol-contrib_0.93.0_linux_amd64.rpm
   sudo rpm -ivh otelcol-contrib_0.93.0_linux_amd64.rpm
   ```

  </TabItem>
  <TabItem value="APK" label="APK" default>

   ```sh
   apk update
   apk add wget shadow
   wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.93.0/otelcol-contrib_0.93.0_linux_amd64.apk
   apk add --allow-untrusted otelcol-contrib_0.93.0_linux_amd64.apk
   ```

  </TabItem>
</Tabs>

   You can check the status of the installed service with:

   ```
   sudo systemctl status otelcol-contrib
   ```
   For check otelcol-contrib logs:
   ```bash
   sudo journalctl -u otelcol-contrib -f
   ```
   To collect host logs at `/var/log/` we need root permission. So edit the file `/lib/systemd/system/otelcol-contrib.service` for set User and Group as root:

   ```bash
   User=root
   Group=root
   ```

   After restart otel-contrib with new config:

   ```bash
   sudo systemctl daemon-reload
   sudo systemctl restart otelcol-contrib
   ```

   Now edit the config file `/etc/otelcol-contrib/config.yaml` add the below config:

   ```bash
   extensions:
     health_check:
     pprof:
       endpoint: 0.0.0.0:1777
     zpages:
       endpoint: 0.0.0.0:55679

   receivers:
     hostmetrics:
       collection_interval: 10s
       scrapers:
         cpu:
         disk:
         filesystem:
         load:
         memory:
         network:
         paging:
     filelog:
       include: [ /var/log/*log ]
       start_at: end

   processors:
     batch:
     resourcedetection:
       detectors: [env, system]
     cumulativetodelta:

   exporters:
     otlp:
       endpoint: <IP-or-Endpoint-of-SigNoz-OtelCollector>:4317
       tls:
         insecure: true

   service:
     pipelines:
       metrics:
         receivers: [hostmetrics]
         processors: [cumulativetodelta, batch, resourcedetection]
         exporters: [otlp]
       logs:
         receivers: [filelog]
         processors: [batch, resourcedetection]
         exporters: [otlp]

     extensions: [health_check, pprof, zpages]
  ```
  And restart OpenTelemetry Contrib Collector:

  ```bash
  sudo systemctl restart otelcol-contrib
  ```

</TabItem>
</Tabs>

## Plot Dashboard in SigNoz UI

**Import Dashboard**

   Import dashboard json with metrics of Linux Host
   from [here][1].

## Dashboard preview

<figure data-zoomable align='center'>
    <img src="/img/linux-host-metrics.png" alt="Linux host metrics Dashboard in SigNoz"/>
    <figcaption><i>Linux host metrics Dashboard in SigNoz</i></figcaption>
</figure>
<br></br>

## Logs preview

<figure data-zoomable align='center'>
    <img src="/img/linux-host-logs.png" alt="Linux host logs in SigNoz"/>
    <figcaption><i>Linux host logs in SigNoz</i></figcaption>
</figure>
<br></br>

## Extra: Send metrics and logs using Docker container

   First we need to get the hostname of host:

   ```
   hostname
   ```

   Create a `config.yaml` file with config of this tutorial (SigNoz Cloud or Self-Host)

   Run a docker container passing the hostname of host:

   ```
    docker run -d \
      -v ./config.yaml:/etc/otelcol-contrib/config.yaml \
      -v /var/log:/var/log -u 0 \
      -e OTEL_RESOURCE_ATTRIBUTES=host.name=HOSTNAME,os.type=linux \
      --name otel-collector \
      otel/opentelemetry-collector-contrib:latest
   ```
---

[1]: https://github.com/SigNoz/dashboards/raw/main/hostmetrics/linux-host-metrics.json