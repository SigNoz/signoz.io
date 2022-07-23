---
id: installation
title: FAQ - Installation
description: Frequently Asked Question during SigNoz Installation.

---

### 1.  Where can I get the SigNoz Docker Image? 
Find the SigNoz Docker images here:  [https://hub.docker.com/u/signoz](https://hub.docker.com/u/signoz)



### 2. Is it mandatory to install SigNoz on every server and map the required IP?
No, you do not have to install SigNoz on every server. Just configure the application in server-A(say) to send data to SigNoz running in server-B (say). Make sure the network settings are taken care.

SigNoz should ideally run in a VM or cluster independent of VMs where the other applications are hosted. You just need to point the applications to the `IP of the SigNoz machine` to send the telemetry data.



### 3. I want to install SigNoz from docker on one of my many servers, mostly VMs from different providers. What should I do?  

You can run node exporter in each of the servers and send data to SigNoz in Prometheus format, and configure SigNoz OpenTelemetry collector to scrape those targets. 

Check this doc - [https://signoz.io/docs/userguide/send-metrics/](https://signoz.io/docs/userguide/send-metrics/)



### 4. I am not seeing my Old Data after migrating to a newer version, what am I doing wrong? 

You need to run migration scripts to see the old data traces and metrics.

Refer here: [Migration Docs](https://signoz.io/docs/operate/migration/)



### 5. How to create and install an agent to monitor network health from a Windows machine? 

We haven't tested the agent on Windows. 

Nevertheless, you can use the otelcol-contrib Windows agent `v0.43.0`  and relay metrics to SigNoz: [https://github.com/open-telemetry/opentelemetry-collector-releases/releases/tag/v0.43.0](https://github.com/open-telemetry/opentelemetry-collector-releases/releases/tag/v0.43.0)

You could refer to these docs for running as Windows service: [https://www.sentrysoftware.com/docs/hws-otel-collector/latest/install.html](https://www.sentrysoftware.com/docs/hws-otel-collector/latest/install.html)

You could refer to the otel config from here to collect host metrics of the windows machine: [https://github.com/SigNoz/benchmark/tree/main/docker#binary](https://github.com/SigNoz/benchmark/tree/main/docker#binary)



### 6. What is the difference between the OpenTelemetry Collector and OpenTelemetry Metrics Collector with the Helm Chart? 

We are creating APM metrics from traces and exposing them at the OpenTelemetry Collector level using Prometheus exporter at OpenTelemetry Collector config.

We use the OpenTelemetry Collector Metrics to scrape APM from other OpenTelemetry Collectors and write to ClickHouse DB.



### 7. How to increase persistent volume for ClickHouse DB in Kubernetes? Is the default volume 20GB? 

You could run the following for AWS:

```
helm -n platform upgrade my-release signoz/signoz \
   --set clickhouse.installCustomStorageClass=true \
   --set clickhouse.cloud=aws \
   --set clickhouse.persistence.size=25Gi \
   --set clickhouse.persistence.storageClass=gp2-resizable
```

In the case of Google Cloud:

- set `clickhouse.cloud` to `gcp`
- set `clickhouse.persistence.storageClass` to `gce-resizable`

Refer here: https://signoz.io/docs/operate/clickhouse/increase-clickhouse-pv/



### 8. I do not want to increase the storage space but wanted to delete the older metrics and traces so as to free up the disk space, What should I do?

Quick and easy way would be to first increase disk space, wait for some time and then set TTL to auto remove old traces/metrics.

Follow the guide below to increase PV size: [https://signoz.io/docs/operate/clickhouse/increase-clickhouse-pv/#increase-persisent-volume](https://signoz.io/docs/operate/clickhouse/increase-clickhouse-pv/#increase-persisent-volume)



### 9. I want to monitor different AWS services like RDS, APIGateway, and Lambda for my serverless application, how can that be achieved? 

You can use AWS metric receivers available [here](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver) and send data to the SigNoz OTel collector. You can then visualize your metrics in SigNoz dashboards. 

Check this section in the docs - [https://signoz.io/docs/userguide/send-metrics/#enable-a-specific-metric-receiver](https://signoz.io/docs/userguide/send-metrics/#enable-a-specific-metric-receiver) 



### 10. Are there any guides or use cases for using SigNoz with AWS / GCP / Azure or other cloud providers?

You can install SigNoz in AWS / GCP / Azure with Helm charts if you are using Kubernetes. More details here 

- [https://signoz.io/docs/deployment/helm_chart/](https://signoz.io/docs/deployment/helm_chart/)
- https://signoz.io/docs/install/kubernetes/aws/



### 11. My pods are in waiting for the state, what could be the reason for it? 

It could be caused by insufficient resources on your machine.



### 12. I am not seeing a move to the AWS S3 option for cold storage on the SigNoz UI, what to do? 

To get the S3 option, you have to configure S3 first.

Refer here: [https://signoz.io/docs/userguide/retention-period/#configuring-cold-storage---amazon-s3](https://signoz.io/docs/userguide/retention-period/#configuring-cold-storage---amazon-s3)




### 13. Can I install SigNoz without Docker? 

No, it is not supported as of today. 

There's an existing issue on this [https://github.com/SigNoz/signoz/issues/392](https://github.com/SigNoz/signoz/issues/392)

Please add your use case on the issues so that we can understand how much community demand is there for this.
