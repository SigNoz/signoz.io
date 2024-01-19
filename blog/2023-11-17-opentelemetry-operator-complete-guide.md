---
title: OpenTelemetry Operator Complete Guide [OTel Collector + Auto-Instrumentation Demo]
slug: opentelemetry-operator-complete-guide
date: 2023-11-17
tags: [OpenTelemetry]
authors: daniel
description: An OpenTelemetry Operator is a Kubernetes Operator that manages OpenTelemetry Collectors and auto-instrumentation of workloads. Learn how to use OpenTelemetry operator to deploy OpenTelemetry Collectors and auto-instrument a sample Java application...
image: /img/blog/2023/11/opentelemetry-operator-cover.jpeg
hide_table_of_contents: true
keywords:
  - opentelemetry
  - signoz
  - autoinstrumentation
  - observability
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-operator-complete-guide/"/>
</head>

import GetStartedSigNoz from '../docs/shared/get-started-signoz.md';

Manually deploying and managing OpenTelemetry components in a Kubernetes environment can be a complex and time-consuming task. It involves creating various Kubernetes resources, setting up configurations, and ensuring the components are properly integrated with the applications.

<!--truncate-->

![Cover Image](/img/blog/2023/11/opentelemetry-operator-cover.webp)


OpenTelemetry Operators provide a solution to this problem by automating the deployment, configuration, and management of OpenTelemetry components in Kubernetes clusters, making it easier for operation teams to implement observability in their applications.

In this tutorial, we will cover:


- [What is OpenTelemetry?](#what-is-opentelemetry)
- [What is a Kubernetes Operator?](#what-is-a-kubernetes-operator)
- [OpenTelemetry Operator for Kubernetes](#opentelemetry-operator-for-kubernetes)
- [Using an OpenTelemetry Operator to auto-instrument a Java application](#using-an-opentelemetry-operator-to-auto-instrument-a-java-application)
  - [Prerequisite](#prerequisite)
  - [Setting up SigNoz](#setting-up-signoz)
  - [Setting up your Java application](#setting-up-your-java-application)
  - [Setting up the OpenTelemetry Operator](#setting-up-the-opentelemetry-operator)
  - [Setup the OpenTelemetry Collector instance](#setup-the-opentelemetry-collector-instance)
- [Creating an Instrumentation Instance](#creating-an-instrumentation-instance)
  - [Auto-instrument your Java app with OpenTelemetry](#auto-instrument-your-java-app-with-opentelemetry)
- [Conclusion](#conclusion)
- [Getting started with SigNoz](#getting-started-with-signoz)
- [Further Reading](#further-reading)


## What is OpenTelemetry?

<a href = "https://opentelemetry.io" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry</a> is an open-source project under the Cloud Native Computing Foundation (<a href = "https://www.cncf.io" rel="noopener noreferrer nofollow" target="_blank">CNCF</a>) that aims to standardize the generation and collection of telemetry data. Telemetry data includes logs, metrics, and traces.

It is a collection of APIs, SDKs, and client libraries used to generate telemetry data from your application code. The data you collect with OpenTelemetry is vendor-agnostic and can be exported in many formats.

The biggest advantage of using OpenTelemetry is that you have the freedom to choose a backend of your choice. You don’t get locked into a vendor, and engineering teams can get ramped up on a single technology to generate telemetry data.

> Which backend analysis tool to choose? <br />
> You can try [SigNoz](https://signoz.io/), a full stack open-source APM built natively on OpenTelemetry.



<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/otel-signoz-arch.webp" alt="Architecture - How OpenTelemetry fits in an application architecture. OTel collector refers to OpenTelemetry Collector"/>
    <figcaption><i>Architecture - How OpenTelemetry fits in an application architecture. OTel collector refers to OpenTelemetry Collector</i></figcaption>
</figure>



## What is a Kubernetes Operator?

A Kubernetes Operator is a specialized controller or software component that automates the management of complex applications in a Kubernetes cluster through the use of <a href = "https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources" rel="noopener noreferrer nofollow" target="_blank">Custom Resource Definitions (CRDs)</a>. It extends Kubernetes functionality, allowing it to handle tasks like deploying, configuring, and managing applications, databases, and services.

Operators are especially valuable for stateful applications (applications that maintain persistent state, such as databases, caching systems, and file stores). They work by monitoring the state of the cluster and automatically taking actions to keep it in the desired state. For example, a Kubernetes Operator could monitor the status of a StatefulSet and automatically perform a rollback if an update fails. Operators can also handle complex scenarios like upgrading a database from one version to another while ensuring data consistency.

## OpenTelemetry Operator for Kubernetes

An <a href = "https://opentelemetry.io/docs/kubernetes/operator" rel="noopener noreferrer nofollow" target="_blank">OpenTelemetry Operator</a> is a Kubernetes Operator that manages [OpenTelemetry Collectors](https://signoz.io/blog/opentelemetry-collector-complete-guide/) and auto-instrumentation of workloads. It basically simplifies the deployment and management of OpenTelemetry in a Kubernetes environment.

The OpenTelemetry Operator provides two Custom Resource Definitions (CRDs):

- `OpenTelemetryCollector`
- `Instrumentation`

The `OpenTelemetryCollector` CRD allows you to deploy and manage OpenTelemetry Collectors in your Kubernetes cluster. 

The `Instrumentation` CRD allows you to configure and inject OpenTelemetry auto-instrumentation libraries into your workloads.

The OpenTelemetry Operator can be used to simplify and automate the following tasks:

- Deploying and managing OpenTelemetry Collectors in a Kubernetes cluster
- Auto-instrumenting workloads with OpenTelemetry
- Configuring OpenTelemetry Collectors and Exporters
- Routing telemetry data to multiple destinations

## Using an OpenTelemetry Operator to auto-instrument a Java application

In this section, you will learn how an OpenTelemetry Operator can be set up and used in SigNoz.

### Prerequisite

- A [SigNoz](https://signoz.io/teams/) cloud account
- A Kubernetes cluster
- Java 8 or newer (full JDK not a JRE)
- A Java application

### Setting up SigNoz

You need a backend to which you can send the collected data for monitoring and visualization. [SigNoz](https://signoz.io/) is an OpenTelemetry-native APM that is well-suited for visualizing OpenTelemetry data.

SigNoz cloud is the easiest way to run SigNoz. You can sign up [here](https://signoz.io/teams/) for a free account and get 30 days of free uncapped usage.

You can also install and self-host SigNoz yourself. Check out the [docs](https://signoz.io/docs/install/) for installing self-host SigNoz.

### Setting up your Java application

A sample Spring PetClinic Java application has been provided. To access it, run the below in your terminal:

```jsx
# Clone the Spring PetClinic repository from SigNoz's GitHub
git clone --single-branch --depth 1 https://github.com/SigNoz/spring-petclinic

# Change into the cloned directory
cd spring-petclinic

# Use Maven Wrapper to package the Spring PetClinic application
./mvnw package

# Run the Spring PetClinic application using the generated JAR file
java -jar target/*.jar
```

You can then access the running application at [localhost:8090](http://localhost:8090) 


<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/petclinic-welcome.webp" alt="petclinic welcome screen"/>
    <figcaption><i></i></figcaption>
</figure>


### Setting up the OpenTelemetry Operator

To install the operator in the existing K8s cluster, run the following command:

```jsx
kubectl apply -f https://github.com/open-telemetry/opentelemetry-operator/releases/download/v0.79.0/opentelemetry-operator.yaml
```

Installing the OpenTelemetry Operator sets up the necessary components and configurations to enable the observability and monitoring of applications running in the cluster.

### Setup the OpenTelemetry Collector instance

Once the `opentelemetry-operator` has been deployed, you can proceed with the creation of the OpenTelemetry Collector (`otelcol`) instance. The OpenTelemetry Collector collects, processes, and exports telemetry data.

There are different <a href = "https://github.com/open-telemetry/opentelemetry-operator#deployment-modes" rel="noopener noreferrer nofollow" target="_blank">deployment modes</a> for the OpenTelemetryCollector, and you can specify them in the **`spec.mode`** section of the custom resource. The available deployment modes are:

- Daemonset
- Sidecar
- StatefulSet
- Deployment (default mode)

The default method - the Deployment mode, will be used here.

To create a simple instance of the OpenTelemetry Collector, run the below in your terminal:

```jsx
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

The above `otelcol` example receives OTLP traces data using gRPC and HTTP protocols, batches the data, and logs it to the console.

## Creating an Instrumentation Instance

Once the OpenTelemetry Collector instance has been deployed, the next step will be to create an instrumentation instance, which will be responsible for sending OTLP data to the SigNoz endpoint.

To create an instance of `Instrumentation`, run the below configuration in your terminal:

```jsx
kubectl apply -f - <<EOF
apiVersion: opentelemetry.io/v1alpha1
kind: Instrumentation
metadata:
  name: my-instrumentation
spec:
  exporter:
    endpoint: https://ingest.{region}.signoz.cloud:443
  env:
    - name: OTEL_EXPORTER_OTLP_HEADERS
      value: signoz-access-token=<insert-token-here>
    - name: OTEL_EXPORTER_OTLP_INSECURE
      value: "false"
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
  dotnet:
    image: ghcr.io/open-telemetry/opentelemetry-operator/autoinstrumentation-dotnet:latest
EOF
```

This above configuration sets up the OpenTelemetry Operator to automatically instrument applications written in Java, Node.js, Python, and .NET. It defines settings for the exporter, context propagation, and sampling strategies. 

In essence, once you deploy an application in the specified languages, the OpenTelemetry Operator will apply the necessary instrumentation code to collect telemetry data from that application.

> Replace the {region} with the region you selected when creating the SigNoz cloud account, and replace `<signoz-access-token>` with the ingestion token sent to your email.


You can find the ingestion details in the SigNoz dashboard under the `Settings` tab.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/ingestion-key-details.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>


### Auto-instrument your Java app with OpenTelemetry

Applications can be instrumented through both manual instrumentation and auto-instrumentation. Manual instrumentation offers granular control and customization of instrumentation code but may be time-consuming and require existing code modification. Alternatively, auto-instrumentation automates this process without code modifications, saving time and effort. In this case, auto-instrumentation will be utilized for simplicity.

There are different ways to set up auto-instrumentation for your applications using the OpenTelemetry Operator, which you can look at [here](https://signoz.io/docs/tutorial/opentelemetry-operator-usage/#opentelemetry-auto-instrumentation-injection).

The sample Java application that was set up earlier is to be auto-instrumented with OpenTelemetry. It has already been packaged into a docker image and is being referenced in the below Kubernetes manifest. Once the deployment is created, the image will be pulled into your cluster from the GitHub Container Registry, where it is hosted. Auto instrumentation has been set up for the application using the “Auto-instrumentation without Sidecar” method in the below manifest. 

Run the below to create the deployment:

```jsx
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

> The pod annotation `instrumentation.opentelemetry.io/inject-java: "true"`  signals to the OpenTelemetry Operator that this specific pod should be auto-instrumented for Java.


The OpenTelemetry Operator will be responsible for injecting and configuring OpenTelemetry auto-instrumentation libraries into the spring-petclinic application without you needing to set up OpenTelemetry and its components for the application yourself.

To ensure that the pod deployed is up and running, run the following command:

```jsx
kubectl get pods
```

It should return a similar output as the one below showing that the pod is running

```jsx
NAME                                        READY   STATUS    RESTARTS   AGE
spring-petclinic-ff8897995-gnqnq            1/1     Running   0          133m
```

Once the pod has reached a running state, export the pod name:

```jsx
export POD_NAME=$(kubectl get pod -l app=spring-petclinic -o jsonpath="{.items[0].metadata.name}")
```

Forward network traffic from your local machine to a specific port on a pod in your cluster:

```jsx
kubectl port-forward ${POD_NAME} 8080:8080
```

In your browser, visit [http://localhost:8080](http://localhost:8080/) to see the running application.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/petclinic-welcome.webp" alt="petclinic welcome screen"/>
    <figcaption><i></i></figcaption>
</figure>
<br />

Now, telemetry data needs to be generated for the application. This telemetry data will then be visualized in SigNoz. To do this, you can refresh the web page multiple times, which will generate some HTTP GET requests, or you can click on the different pages in the application(Home, Fine Owners, Veterinarians, Error) to generate some activity.

Once telemetry data has been generated, open your SigNoz cloud account, and you should see the spring-petclinic application under the Services tab.


<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/petclinic-service-app.webp" alt="SigNoz UI showing spring-petclinic application"/>
    <figcaption><i>SigNoz UI showing spring-petclinic application</i></figcaption>
</figure>
<br />

You can change the duration in case the application doesn’t show up depending on the time the telemetry data was generated.


<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/duration-options.webp" alt="Duration options"/>
    <figcaption><i>Duration options</i></figcaption>
</figure>
<br />

When you click on the 'Spring-Pet-Clinic' application in the 'Services' tab, you will find an overview of your application in the 'Overview' tab containing information on the Latency, Rate, Apdex, Key Operations, and Error Rate. You can also see the tabs for DB Call Metrics and External Metrics. You can select each of the charts to get more insights.



<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/service-list-tab.webp" alt="List of services in Services tab"/>
    <figcaption><i>List of services in Services tab</i></figcaption>
</figure>
<br />

By selecting and viewing the Latency chart, you gain access to crucial percentiles – p99, p90, and p50. These metrics offer valuable insights into the distribution of response times.



<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/latency-chart.webp" alt="Latency chart showing p99, p90 and p50 percentiles"/>
    <figcaption><i>Latency chart showing p99, p90 and p50 percentiles</i></figcaption>
</figure>
<br />


Beneath, you can observe the Apdex (Application Performance Index) is at 0, and the Error percentage chart has no data. This is because there was no failure in the requests sent to the application, resulting in no data for the error percentage. The Key Operations chart, on the other hand, shows all the requests made and activities carried out in the application.



<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/key-operation-chart.webp" alt=""/>
    <figcaption><i></i></figcaption>
</figure>
<br />

In the Traces tab, you can utilize the ‘Trace Explorer’ to filter traces by tags, choose specific services, set desired duration and status filters, and perform additional actions for refined trace viewing.


<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/trace-explorer-chart.webp" alt="Trace Explorer tab"/>
    <figcaption><i>Trace Explorer tab</i></figcaption>
</figure>
<br />

Switching over to the new Traces Explorer UI, you can query metrics using the Query Builder, and you can see Root Spans under the Traces tab.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/11/query-builder-petclinic.webp" alt="Query Builder in Trace Explorer"/>
    <figcaption><i>Query Builder in Trace Explorer</i></figcaption>
</figure>

<br />

## Conclusion

The OpenTelemetry Operator proves to be a crucial asset in streamlining observability within a Kubernetes cluster. By simplifying the deployment of OpenTelemetry components, it facilitates the seamless collection of telemetry data. This data can then be efficiently forwarded to SigNoz, a comprehensive open-source backend solution, enabling robust visualization and monitoring capabilities for enhanced operational insights.


## Getting started with SigNoz

<GetStartedSigNoz />

---
## Further Reading

[Using SigNoz to monitor your Kubernetes cluster](https://signoz.io/blog/using-signoz-to-monitor-your-kubernetes-cluster/)

[SigNoz - An OpenTelemetry-native APM](https://signoz.io/blog/opentelemetry-apm/)