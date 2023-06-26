---
id: traefik-observability
title: Traefik Observability
description: Tutorial to export Traefik metrics and traces to SigNoz.
---

import TraefikMetrics from '../shared/traefik-metrics-list.md'

### Overview

In this tutorial, we will see how to export metrics and traces of Traefik to SigNoz.
Visualizing Traefik metrics and traces will help you to understand the performance
of services running behind Traefik and troubleshoot issues.

### Prerequisites

- Traefik v3.0 or above
- Must have SigNoz running. You can follow the [installation guide][1] to install SigNoz.
- Must have SigNoz OtelCollector accessible from Traefik

## Export Traefik Metrics and Traces to SigNoz

In this section, we will see how to export Traefik metrics and traces to SigNoz.

For metrics, we will have to set the following CLI flags in Traefik:

- `--metrics.openTelemetry=true`
- `--metrics.openTelemetry.address=<SigNoz OtelCollector IP>:4317`
- `--metrics.openTelemetry.insecure=true`
- `--metrics.openTelemetry.grpc=true`

For traces, we will have to set the following CLI flags in Traefik:

- `--tracing.openTelemetry=true`
- `--tracing.openTelemetry.address=<SigNoz OtelCollector IP>:4317`
- `--tracing.openTelemetry.insecure=true`
- `--tracing.openTelemetry.grpc=true`

We will take an example of a simple `hello-app` running behind Traefik.

_docker-compose.yaml_

```yaml
version: '3'
services:
  reverse-proxy:
    image: traefik:v3.0.0-beta3
    extra_hosts:
      - signoz:host-gateway
    command:
      - --api.insecure=true
      - --providers.docker
      - --metrics.openTelemetry=true
      - --metrics.openTelemetry.address=signoz:4317
      - --metrics.openTelemetry.insecure=true
      - --metrics.openTelemetry.grpc=true
      - --tracing.openTelemetry=true
      - --tracing.openTelemetry.address=signoz:4317
      - --tracing.openTelemetry.insecure=true
      - --tracing.openTelemetry.grpc=true
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
  hello-app:
    image: gcr.io/google-samples/hello-app:2.0
    environment:
      - PORT=8080
    labels:
      traefik.enable: true
      traefik.http.routers.hello-app.rule: Host(`hello-app.docker.localhost`)
      traefik.http.routers.hello-app.entrypoints: http
      traefik.http.routers.hello-app.service: hello-app
```

:::info
In case SigNoz is not running on the same host, you will have to replace `signoz`
with the IP address of the host running SigNoz.
:::

To start the services, run the following command:

```bash
docker-compose up -d
```

We will visit the `hello-app` service to generate some traffic.

```bash
curl -H Host:hello-app.docker.localhost http://127.0.0.1
```

Now, we will visit the SigNoz UI to see the traces and metrics.

![Traefik Traces](/img/docs/tutorial/traefik-traces.png)

To plot metrics generated from **Traefik**, follow the instructions
given in the docs [here][2].

Check out the [List of metrics from Traefik][3].

### List of Metrics

<TraefikMetrics />

---

[1]: https://signoz.io/docs/install/
[2]: https://signoz.io/docs/userguide/dashboards/
[3]: #list-of-metrics
