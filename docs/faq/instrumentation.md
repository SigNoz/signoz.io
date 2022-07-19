---
id: instrumentation
title: FAQ - Instrumentation
description: Frequently asked question during Application Instrumentation using SigNoz 

---

### 1. What are all the ports that will be used by a running instance of SigNoz and its associated dependencies so that I can check with my application ports to avoid conflicts. 

Ensure that the ports `8080,` `3301`, `4317`and `4318`are open on the machine where you install SigNoz.



### 2. What do the below commands mean?
```
OTEL_EXPORTER_OTLP_ENDPOINT="http://xx.x.130.93:4317" -e 
OTEL_RESOURCE_ATTRIBUTES=service.name=bluesky -e POD_NAMESPACE=xyz-dev cfpb-john bash
```
Refer here: 

- [https://aws-otel.github.io/docs/components/otlp-exporter](https://aws-otel.github.io/docs/components/otlp-exporter)
- [https://opentelemetry.io/docs/concepts/sdk-configuration/otlp-exporter-configuration/](https://opentelemetry.io/docs/concepts/sdk-configuration/otlp-exporter-configuration/)
- [https://opentelemetry-python.readthedocs.io/en/latest/exporter/otlp/otlp.html](https://opentelemetry-python.readthedocs.io/en/latest/exporter/otlp/otlp.html)
- [https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/exporter.md](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/protocol/exporter.md)



### 3. Do I still use OpenTelemetry SDKs to instrument ourselves and just use SigNoz as an analysis backend? OR do I have to use SigNoz as a solution itself? 

You have to instrument your application using OpenTelemetry  SDKs.

Link for Instrumentation using SigNoz - [https://signoz.io/docs/instrumentation](https://signoz.io/docs/instrumentation/golang/#automatically-create-tracesspans-on-http-requests)

SigNoz has an OpenTelemetry collector built in it, so you just have to point your application to SigNoz installation and visualize data in the SigNoz dashboard.



### 4. Which all languages/tech stack is currently supported with SigNoz for instrumentation? 

Python, JavaScript, Java, .NET, Ruby, Rust, Go, Elixir/Erlang, PHP.

Find the documentation for them here - [https://signoz.io/docs/instrumentation/](https://signoz.io/docs/instrumentation/)



### 5. Can I use auto instrumentation for my application(s)?

OpenTelemetry and thus SigNoz, currently supports JavaScript, Java, Ruby, .NET, and Python modules for auto instrumentation.

Refer here: [https://opentelemetry.io](https://opentelemetry.io/)

If your module is auto-instrumentation is supported, you don't need code level changes but just need to add some more libraries in your application. 



### 6. I am confused about `<IP of SigNoz>` can you provide some examples?

IP of SigNoz means the host IP OR the IP of the instance where you have installed SigNoz, it could be either your local machine, the cloud providers, or VMs. 

- IP is `localhost` or `127.0.0.1` - If it's installed on your local machine
- IP is `xxx.xx.xx.xx`, where x is the public IP address of your AWS, Azure, GCP, or other cloud providers.
- IP is`[example.com](http://example.com)` if SigNoz is hosted on your custom domain.

So, to summarize, the `OTEL_EXPORTER_OTLP_ENDPOINT` would look something like this.

`OTEL_EXPORTER_OTLP_ENDPOINT="[http://localhost:4317](http://xxxxxxx:4317/)"` 

`OTEL_EXPORTER_OTLP_ENDPOINT="[http://127.0.0.1:4317](http://xxxxxxx:4317/)"` 

`OTEL_EXPORTER_OTLP_ENDPOINT="[http://netflix.com:4317](http://xxxxxxx:4317/)"` 

`OTEL_EXPORTER_OTLP_ENDPOINT="[http://xxx.xx.xx.xx:4317](http://xxxxxxx:4317/)"` 

**Note:** 

- SigNoz UI is running at 3301 but the collector backend which receives the telemetry is running at 4317 or 4318.
- Port 4317 is for proto/gRPC and Port 4318 is for proto/HTTP.
- If you are using `otlp_proto_http` the port should be 4318 (used to transfer trace/metrics data)
- Some language/runtime versions may not go well with gRPC and might cause problems.



### 7. Does SigNoz have some agents for other servers from where I might want to collect data? 

You need to use OpenTelemetry binary in your application servers to send host metrics data to SigNoz.

Refer here: [https://github.com/SigNoz/benchmark/tree/main/docker#binary](https://github.com/SigNoz/benchmark/tree/main/docker#binary)



### 8. Is it possible to use core OpenTelemetry Collector agents to write to SigNoz exporter instead of using a custom collector provided by SigNoz? 

Yes, this is usually done when core otel-collectors are run as agents in every node. 

Every application in a node will send its trace and metrics data to the agent running in that machine ([http://localhost:4317](http://localhost:4317/)) and all the agents will have `otlp` exporter configured to forward the data to SigNoz's IP (say, a machine or cluster running SigNoz). 

Example: core otel collector will have additional exporter config as,

```
    exporters:
      otlp:
        endpoint: "<IP of machine hosting SigNoz>:4317"
        insecure: true
```