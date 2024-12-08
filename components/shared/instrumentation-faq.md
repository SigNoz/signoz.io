### Frequently Asked Questions

1. How to find what to use in `IP of SigNoz` if I have installed SigNoz in Kubernetes cluster?

    Based on where you have installed your application and where you have installed SigNoz, you need to find the right value for this. Please use [this grid](/docs/instrumentation/troubleshoot-instrumentation/) to find the value you should use for `IP of SigNoz`

2. I am sending data from my application to SigNoz, but I don't see any events or graphs in the SigNoz dashboard. What should I do?

    This could be because of one of the following reasons:

    1. *Your application is generating telemetry data, but not able to connect with SigNoz installation*

        Please use this [troubleshooting guide](/docs/install/troubleshooting/) to find if your application is able to access SigNoz installation and send data to it.

    2. *Your application is not actually generating telemetry data*

        Please check if the application is generating telemetry data first. You can use `Console Exporter` to just print your telemetry data in console first. Join our [Slack Community](https://signoz.io/slack/) if you need help on how to export your telemetry data in console

    3. *Your SigNoz installation is not running or behind a firewall*

        Please double check if the pods in SigNoz installation are running fine. `docker ps` or `kubectl get pods -n platform` are your friends for this. 

## What Cloud Endpoint Should I Use?

The primary method for sending data to SigNoz Cloud is through OTLP exporters. You can either send the data directly from your application using the exporters available in SDKs/language agents or send the data to a collector agent, which batches/enriches telemetry and sends it to the Cloud.

### My Collector Sends Data to SigNoz Cloud

#### Using gRPC Exporter

The endpoint should be `ingest.{region}.signoz.cloud:443`, where `{region}` should be replaced with `in`, `us`, or `eu`. Note that the exporter endpoint doesn't require a scheme for the gRPC exporter in the collector.

```yaml
# Sample config with `us` region
exporters:
    otlp:
        endpoint: "ingest.us.signoz.cloud:443"
        tls:
            insecure: false
        headers:
            "signoz-ingestion-key": "<SIGNOZ_INGESTION_KEY>"
```

#### Using HTTP Exporter

The endpoint should be `https://ingest.{region}.signoz.cloud:443`, where `{region}` should be replaced with `in`, `us`, or `eu`. Note that the endpoint includes the scheme `https` for the HTTP exporter in the collector.

```yaml
# Sample config with `us` region
exporters:
    otlphttp:
        endpoint: "https://ingest.us.signoz.cloud:443"
        tls:
            insecure: false
        headers:
            "signoz-ingestion-key": "<SIGNOZ_INGESTION_KEY>"
```

### My Application Sends Data to SigNoz Cloud

The endpoint should be configured either with environment variables or in the SDK setup code.

#### Using Environment Variables

##### Using gRPC Exporter

Examples with `us` region

- `OTEL_EXPORTER_OTLP_PROTOCOL=grpc OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.us.signoz.cloud:443 OTEL_EXPORTER_OTLP_HEADERS=signoz-ingestion-key=<SIGNOZ_INGESTION_KEY>`

##### Using HTTP Exporter

- `OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf OTEL_EXPORTER_OTLP_ENDPOINT=https://ingest.us.signoz.cloud:443 OTEL_EXPORTER_OTLP_HEADERS=signoz-ingestion-key=<SIGNOZ_INGESTION_KEY>`

#### Configuring Endpoint in Code

Please refer to the agent documentation.

### Sending Data from a Third-Party Service

The endpoint configuration here depends on the export protocol supported by the third-party service. They may support either gRPC, HTTP, or both. Generally, you will need to adjust the host and port. The host address should be `ingest.{region}.signoz.cloud:443`, where `{region}` should be replaced with `in`, `us`, or `eu`, and port `443` should be used.
