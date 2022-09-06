---
id: opentelemetry-operator-usage
title: OpenTelemetry Operator Usage
description: How to use OpenTelemetry Operator to ease otelcol deployment and instrumentation in SigNoz
---

import OtelOperatorOTLPEndpoint from '../shared/otel-operator-otlp-endpoint.md'
import OtelOperatorAutoInstrumentation from '../shared/otel-operator-auto-instrumentation.md'
import OtelOperatorPetClinic from '../shared/otel-operator-pet-clinic.md'
import OtelOperatorCleanUp from '../shared/otel-operator-cleanup.md'

## Overview

In this tutorial, we would like to introduce [OpenTelemetry Operator][1] which makes
it very easy to set up Collector and instrument workloads deployed on Kubernetes.

In general, OpenTelemetry deployments and instrumentations is known to be a tedious
process. An application can be instrumented either automatically or manually.

[OpenTelemetry Operator][1] significantly helps a lot in managing OpenTelemetry
collectors. There are three modes to deploy OpenTelemetry Collector: Deployment,
DaemonSet and Sidecar.

## Prerequisite

- You must have a K8s cluster up and running
- You must have `kubectl` access to your cluster
- Make sure [SigNoz is up and running][2]
- Make sure to install [`cert-manager`][3]:
```bash
kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.9.1/cert-manager.yaml
```

## Set up OpenTelemetry Operator

To install the operator in the existing K8s cluster:

```bash
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/download/v0.55.0/opentelemetry-operator.yaml
```

Once the `opentelemetry-operator` deployment is ready, we can proceed with creation of
OpenTelemetry Collector (`otelcol`) instance and autoinstrumentation.

## Deployment Modes

The `CustomResource` of the `OpenTelemetryCollector` kind exposes a property named
`.Spec.Mode`, which can be used to specify whether the collector should run as a
`DaemonSet`, `Sidecar`, or `Deployment` (default).

### Independent Deployment

To create simple instance of `otelcol` with `Deployment` mode, follow the instructions below:

```bash
kubectl apply -f - <<EOF
apiVersion: opentelemetry.io/v1alpha1
kind: OpenTelemetryCollector
metadata:
  name: simplest
spec:
  mode: deployment
  config: |
    receivers:
      otlp:
        protocols:
          grpc:
          http:
    processors:
      batch:
    exporters:
      logging:
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [batch]
          exporters: [logging]
EOF
```

:::info
The above simplest `otelcol` example receives OTLP traces data using gRPC and HTTP protocols,
batches the data and logs it to the console.
:::

To test sending traces using [tracegen][4] follow the steps below:

- Install `tracegen` binary
  ```bash
  go install github.com/open-telemetry/opentelemetry-collector-contrib/tracegen@v0.55.0
  ```
- To forward gRPC port of the OTLP service
  ```bash
  kubectl port-forward service/simplest-collector 4317
  ```
- (In another terminal) Send trace data using `tracegen`
  ```bash
  tracegen -traces 1 -otlp-endpoint localhost:4317 -otlp-insecure
  ```

To see logs of simplest collector:

```bash
kubectl logs -l app.kubernetes.io/name=simplest-collector
```

Output should include the following:

```
2022-09-05T06:25:50.178Z	INFO	loggingexporter/logging_exporter.go:43	TracesExporter	{"#spans": 2}
```

At last make sure to clean up the `otelcol` instance:

```bash
kubectl delete otelcol/simplest
```

### Across the Nodes - DaemonSet

Similarly, OpenTelemetry Collector instance can be deployment with `DaemonSet` mode.
`DaemonSet` ensures that all (or some) nodes run copy of the collector pod.

In case of `DaemonSet`, only `spec.mode` property would be updated to `daemonset`
from the previous example of `otelcol` YAML and config can either be kept as it
is or updated as per the need.

:::info
`DaemonSet` is suitable for tasks such as log collection daemons, storage daemons,
and node monitoring daemons.
:::

### Sidecar Injection 

A sidecar with the OpenTelemetry Collector can be injected into pod-based workloads
by setting the pod annotation `sidecar.opentelemetry.io/inject` to either `"true"`,
or to the name of a concrete `OpenTelemetryCollector` from the same namespace.

Here is an example to create a `Sidecar` with `jaeger` as input and logs output to console:

```bash
kubectl apply -f - <<EOF
apiVersion: opentelemetry.io/v1alpha1
kind: OpenTelemetryCollector
metadata:
  name: my-sidecar
spec:
  mode: sidecar
  config: |
    receivers:
      jaeger:
        protocols:
          thrift_compact:
    processors:
    exporters:
      logging:
    service:
      pipelines:
        traces:
          receivers: [jaeger]
          processors: []
          exporters: [logging]
EOF
```

Next, let us create a `Pod` using `jaeger` example image and set `sidecar.opentelemetry.io/inject`
annotations to `"true"`:

```bash
kubectl apply -f - <<EOF
apiVersion: v1
kind: Pod
metadata:
  name: myapp
  annotations:
    sidecar.opentelemetry.io/inject: "true"
spec:
  containers:
  - name: myapp
    image: jaegertracing/vertx-create-span:operator-e2e-tests
    ports:
      - containerPort: 8080
        protocol: TCP
EOF
```

---
To obtain name of the Pet Clinic pod:

```bash
export POD_NAME=$(kubectl get pod -l app=spring-petclinic -o jsonpath="{.items[0].metadata.name}")
```

To forward port of the Pet Clinic pod:

```bash
kubectl port-forward ${POD_NAME} 8080:8080
```

Now, let's use Pet Clinic UI for a while in browser to generate telemetry
data: [http://localhost:8080](http://localhost:8080).

![Spring Pet Clinic metrics page](/img/docs/otel-operator-spring-pet-clinic.png)
---

To forward port of the `myapp` pod:

```bash
kubectl port-forward pod/myapp 8080:8080
```

In another terminal, let's send a HTTP request using `curl`:

```bash
curl http://localhost:8080
```

To log output of the `Sidecar`:

```bash
kubectl logs pod/myapp -c otc-container
```

Output should look something like this:

```
2022-09-05T16:51:37.753Z	info	service/collector.go:128	Everything is ready. Begin running and processing data.
2022-09-05T17:07:37.319Z	INFO	loggingexporter/logging_exporter.go:43	TracesExporter	{"#spans": 4}
2022-09-05T17:07:37.322Z	INFO	loggingexporter/logging_exporter.go:43	TracesExporter	{"#spans": 9}
```

At last make sure to clean up `Sidecar` and `myapp` pod:

To remove sidecar otelcol named `my-sidecar`:

```bash
kubectl delete otelcol/my-sidecar
```

To remove `myapp` pod:

```bash
kubectl delete pod/myapp
```

## OpenTelemetry Auto-instrumentation Injection

The OpenTelemetry operator can inject and configure OpenTelemetry
auto-instrumentation libraries.

At the moment the instrumentation is supported for Java, NodeJS, and Python
languages. The instrumentation is enabled when the following annotation is
applied to a workload or a namespace.

 - `instrumentation.opentelemetry.io/inject-java: "true"` — for Java
 - `instrumentation.opentelemetry.io/inject-nodejs: "true"` — for NodeJS
 - `instrumentation.opentelemetry.io/inject-python: "true"` — for Python

The possible values for the annotation can be:
 - `"true"` - inject and Instrumentation resource from the namespace.
 - `"my-instrumentation"` - name of Instrumentation CR instance in the current namespace.
 - `"my-other-namespace/my-instrumentation"` - name and namespace of Instrumentation CR
 instance in another namespace.
 - `"false"` - do not inject.

:::info
Support for `DotNet` will be bundled in near future after [signoz-otel-collector][5]
is synced with OpenTelemetry Collector `v0.57.2` or above.
:::

Before using auto-instrumentation, we would need to configure an `Instrumentation`
resource with the configuration for the SDK and instrumentation.

Instrumentation` consists of following properties:

 - `exporter.endpoint` - (optional) The address where telemetry data is to be sent
 in OTLP format.
 
 - `propagators` - Enables all data sources to share an underlying context mechanism
 for storing state and accessing data across the lifespan of a transaction.

 - `sampler` - Mechanism to control the noise and overhead introduced by reducing
 the number of samples of traces collected and sent to the backend. OpenTelemetry
 provides two types: **StaticSampler** and **TraceIDRatioBased**.

 - Language properties i.e. `java`, `nodejs` and `python` - custom images
 to be used for auto-instrumentation with respect to the languages as set
 in the pod annotation.

### Using Sidecar

To create a `Sidecar` which has `OTLP` receivers as input while sending traces
data to SigNoz Collector as well logs to console:

```bash {19}
kubectl apply -f - <<EOF
apiVersion: opentelemetry.io/v1alpha1
kind: OpenTelemetryCollector
metadata:
  name: my-sidecar
spec:
  mode: sidecar
  config: |
    receivers:
      otlp:
        protocols:
          http:
          grpc:
    processors:
      batch:
    exporters:
      logging:
      otlp:
        endpoint: http://my-release-signoz-otel-collector.platform.svc.cluster.local:4317
        tls:
          insecure: true
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [batch]
          exporters: [logging, otlp]
        metrics:
          receivers: [otlp]
          processors: [batch]
          exporters: [logging, otlp]
EOF
```

<OtelOperatorOTLPEndpoint/>

To create an instance of `Instrumentation`:

```bash
kubectl apply -f - <<EOF
apiVersion: opentelemetry.io/v1alpha1
kind: Instrumentation
metadata:
  name: my-instrumentation
spec:
  propagators:
    - tracecontext
    - baggage
    - b3
  sampler:
    type: parentbased_always_on
  java:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-java:latest
  nodejs:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-nodejs:latest
  python:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-python:latest
EOF
```

Now, we would have to set the pod annotations `instrumentation.opentelemetry.io/inject-java`
and `sidecar.opentelemetry.io/inject` to `"true"`, for setting up auto-instrumentation of
workload deployed in K8s. It would sends OTLP data to `Sidecar` which would in turn relay
it to SigNoz collector.

Here is an example of pet clinic with auto-instrumentation:

```bash {16-17}
kubectl apply -f - <<EOF                                    
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-petclinic
spec:
  selector:
    matchLabels:
      app: spring-petclinic
  replicas: 1
  template:
    metadata:
      labels:
        app: spring-petclinic
      annotations:
        sidecar.opentelemetry.io/inject: "true"
        instrumentation.opentelemetry.io/inject-java: "true"
    spec:
      containers:
      - name: app
        image: ghcr.io/pavolloffay/spring-petclinic:latest
EOF
```

<OtelOperatorAutoInstrumentation/>

<OtelOperatorPetClinic/>

<OtelOperatorCleanUp/>

To remove `Sidecar` collector:

```bash
kubectl delete otelcol/my-sidecar
```

### Auto-instrumentation without Sidecar

To create an instance of `Instrumentation` which sends OTLP data to SigNoz endpoint:

```bash {8}
kubectl apply -f - <<EOF
apiVersion: opentelemetry.io/v1alpha1
kind: Instrumentation
metadata:
  name: my-instrumentation
spec:
  exporter:
    endpoint: http://my-release-signoz-otel-collector.platform.svc.cluster.local:4317
  propagators:
    - tracecontext
    - baggage
    - b3
  sampler:
    type: parentbased_traceidratio
    argument: "0.25"
  java:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-java:latest
  nodejs:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-nodejs:latest
  python:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-python:latest
EOF
```

<OtelOperatorOTLPEndpoint/>

Now, we would just have set the pod annotation `instrumentation.opentelemetry.io/inject-java`
to `"true"` for our Java Springboot workload deployed in K8s.

Here is an example of pet clinic with auto-instrumentation:

```bash {16}
kubectl apply -f - <<EOF                                    
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spring-petclinic
spec:
  selector:
    matchLabels:
      app: spring-petclinic
  replicas: 1
  template:
    metadata:
      labels:
        app: spring-petclinic
      annotations:
        instrumentation.opentelemetry.io/inject-java: "true"
    spec:
      containers:
      - name: app
        image: ghcr.io/pavolloffay/spring-petclinic:latest
EOF
```

<OtelOperatorAutoInstrumentation/>

<OtelOperatorPetClinic/>

<OtelOperatorCleanUp/>

---

[1]: https://github.com/open-telemetry/opentelemetry-operator
[2]: https://cert-manager.io/docs/
[3]: https://pkg.go.dev/github.com/open-telemetry/opentelemetry-collector-contrib/tracegen#section-readme
[4]: /docs/install/
[5]: https://github.com/SigNoz/signoz-otel-collector
[6]: http://localhost:8080
