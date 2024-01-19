---
title: OpenTelemetry Nginx Tutorial - Instrument and visualize traces
slug: opentelemetry-nginx
date: 2023-02-24
tags: [OpenTelemetry, Distributed Tracing]
authors: adnan
description: In this tutorial, you will learn how to instrument your nginx web servers with OpenTelemetry. Steps to instrument nginx web server with OpenTelemetry....
image: /img/blog/2023/02/opentelemetry_nginx_cover-min.jpg
hide_table_of_contents: true
keywords:
  - opentelemetry
  - opentelemetry nginx
  - signoz
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-nginx/"/>
</head>

OpenTelemetry is an open-source standard for instrumenting cloud-native applications for generating different types of telemetry data. A robust observability framework set up using OpenTelemetry can help tremendously while troubleshooting software in production.

<!--truncate-->

![Cover Image](/img/blog/2023/02/opentelemetry_nginx_cover.webp)

Nginx is one of the most widely adopted web servers. Most often, nginx is used as a reverse proxy. It serves the frontend or backend applications behind the reverse proxy. In this tutorial, we will learn how to instrument nginx web servers with OpenTelemetry for traces. We will illustrate how to use the OpenTelemetry module, build an nginx container image, deploy it to Kubernetes, and view the traces using SigNoz.

## The architecture of the setup

The architecture of the setup used for the tutorial is given below.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/02/architecture_nginx_backend_signoz.webp" alt="Architecture of the setup consisting of nginx, backend and SigNoz"/>
    <figcaption><i>Architecture of the setup consisting of nginx, backend and SigNoz</i></figcaption>
</figure>

<br></br>

The setup consists of:

- Three namespaces: nginx, backend, and platform (SigNoz)
- Nginx serves as a reverse proxy (nginx namespace)
- Go backend which does real work (go-backend namespace)
- SigNoz collector collecting the traces (platform namespace)

At the end of the tutorial, setup will be able to track the request from nginx to Go backend.

## Installing SigNoz

We will install SigNoz by [deploying it with Helm charts](https://signoz.io/docs/install/kubernetes/others/).

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

Pre-requisites:

- Running Kubernetes cluster (>= 1.21 version)
- 8GB of memory
- 4 CPU cores
- 30 GB of storage

If you have your own cluster, you can use it. Otherwise, you can follow the instructions from the repository itself to run a fully functional cluster using multipass and k3s.

[GitHub: Demo for OpenTelemetry using Nginx, Go and Signoz.](https://github.com/SigNoz/opentelemetry-nginx-tutorial)

In the README you can find detailed instructions on how to install the local Kubernetes cluster.
Navigate to the root of the repository and hit the next commands (for Linux).

```jsx
snap install multipass
git clone --single-branch --depth 1 https://github.com/SigNoz/opentelemetry-nginx-tutorial.git
cd opentelemetry-nginx-tutorial
./start.sh
```

After a while, you will have a fully functional SigNoz platform installed on Kubernetes in the multipass machine.

```jsx
ubuntu@k3s:~/opentelemetry-nginx-tutorial$ k get pods -n platform
NAME                                                READY   STATUS    RESTARTS   AGE
signoz-clickhouse-operator-774d4d6cc-xhf2t          2/2     Running   0          38h
signoz-k8s-infra-otel-deployment-5dfdd7899d-9d9kd   1/1     Running   0          38h
signoz-zookeeper-0                                  1/1     Running   0          38h
signoz-k8s-infra-otel-agent-tnlpj                   1/1     Running   0          38h
chi-signoz-clickhouse-cluster-0-0-0                 1/1     Running   0          38h
signoz-query-service-0                              1/1     Running   0          38h
signoz-otel-collector-d69d59d68-nqx48               1/1     Running   0          38h
signoz-otel-collector-metrics-789475976f-w86bz      1/1     Running   0          38h
signoz-alertmanager-0                               1/1     Running   0          38h
signoz-frontend-57bb96c66f-ch22x                    1/1     Running   0          38h
```

Now let's see how to build the nginx container image with the OpenTelemetry module.

## Building nginx with the OpenTelemetry module

All the container images are located in `package/docker` directory. Let's inspect the nginx Dockerfile.

```jsx
FROM nginx:1.23.1
RUN apt-get update ; apt-get install unzip
ADD https://github.com/open-telemetry/opentelemetry-cpp-contrib/releases/download/webserver%2Fv1.0.3/opentelemetry-webserver-sdk-x64-linux.tgz /opt
RUN cd /opt; tar xvzf opentelemetry-webserver-sdk-x64-linux.tgz
RUN cd /opt/opentelemetry-webserver-sdk; ./install.sh
ENV LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/opt/opentelemetry-webserver-sdk/sdk_lib/lib
RUN echo "load_module /opt/opentelemetry-webserver-sdk/WebServerModule/Nginx/1.23.1/ngx_http_opentelemetry_module.so;\n$(cat /etc/nginx/nginx.conf)" > /etc/nginx/nginx.conf
COPY opentelemetry_module.conf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/conf.d/default.conf
```

This is the example taken from the OpenTelemetry docs on how to [instrument nginx with OpenTelemetry](https://opentelemetry.io/blog/2022/instrument-nginx/).

The lines we are interested in are:

- `COPY opentelemetry_module.conf /etc/nginx/conf.d`
- `COPY nginx.conf /etc/nginx/conf.d/default.conf`

The first copy is referring to the configuration of the OpenTelemetry module of the nginx. This is where you can tweak all the config options of the instrumentation itself.

```jsx
NginxModuleEnabled ON;
NginxModuleOtelSpanExporter otlp;
NginxModuleOtelExporterEndpoint signoz-otel-collector.platform:4317;
NginxModuleServiceName NginxService;
NginxModuleServiceNamespace nginx;
NginxModuleServiceInstanceId NginxInstanceId;
NginxModuleResolveBackends ON;
NginxModuleTraceAsError ON;
```

We are using otlp exporter and exporting the traces to the SigNoz collector already installed in the platform namespace at `signoz-otel-collector.platform:4317`. That's the place where the SigNoz collector is living in our setup.

Building this docker image is easy as a docker build. If you want to build an nginx docker image with enabled opentelemetry support you can run the next command in the shell. Nginx configuration file **nginx.conf** and **opentelemetry_module.conf** must be located in the same directory where Dockerfile is located. See the `package/docker/nginx` directory for reference.

```jsx
docker build --tag nginx-otel:latest .
```

Otherwise, to be able to use it in our local Kubernetes instance, you can run `build.sh` and then `deploy.sh` from the multipass machine.

It will deploy the custom-built docker nginx image to the nginx namespace.

```jsx
ubuntu@k3s:~/opentelemetry-nginx-tutorial$ k get pods -n nginx
NAME                     READY   STATUS    RESTARTS   AGE
nginx-845947d9f8-g2rhc   1/1     Running   0          3s
```

## Building Go backend with tracing enabled

We will build a simple GO API to handle multiple endpoints. Tracing will be enabled on the `/getEntry/{id}` endpoint.

Same as for the nginx, the whole solution is located in the package directory at the root of the repository.

In the `internal/config/config.go`, the `setupTracing` function will create a tracing exporter to be used globally in the application. The configuration of the traces is configured here, and you can tweak the options.

In the `internal/handler/handler.go` in the function GetEntry() we will refer to this exporter and export span to the SigNoz otel collector.

The endpoint of the SigNoz collector is configured in the config/env-default `COLLECTOR=signoz-otel-collector.platform:4317`.

You can tweak the endpoint there.

So basically, what happens next:

- The user hits the endpoint /getEntry/1 for eg.
- The service will trigger the handler function GetEntry()
- Span will be started using a global tracer exporter
- At the end of the method, the span will be closed, and traces will be exported to the SigNoz otel collector.

After deploying both nginx and go backend we can inspect the traces directly on the SigNoz frontend.

## Inspecting traces with SigNoz

Since Kubernetes is using multipass and k3s for the running cluster itself additional tweak is needed to expose the SigNoz frontend.

```jsx
➜  ~ multipass list 
Name                    State             IPv4             Image
k3s                     Running           10.117.145.50    Ubuntu 22.04 LTS
                                          172.17.0.1
                                          10.42.0.0
                                          10.42.0.1
➜  ~ sudo -- /bin/sh -c ' echo "10.117.145.50 signoz.local" >> /etc/hosts'
```

Since we are using Traefik and ingresses for the distinction on the cluster we will expose signoz.local as the entry point for the SigNoz frontend.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/02/nginx_go_services.webp" alt="nginx and go backend in the list of applications monitored on SigNoz"/>
    <figcaption><i>nginx and go backend in the list of applications monitored on SigNoz</i></figcaption>
</figure>

<br></br>

As you can see on the SigNoz UI we have two services:

- Our nginx
- And GO backend

So SigNoz was able to detect those services great. Let's hit the endpoint to get entry 1.

```jsx
➜  ~ multipass list     
Name                    State             IPv4             Image
k3s                     Running           10.117.145.50    Ubuntu 22.04 LTS
                                          172.17.0.1
                                          10.42.0.0
                                          10.42.0.1
➜  ~ curl 10.117.145.50/nginx/getEntries/1
Entry doesn't exists.
```

Let's inspect the traces on the SigNoz UI.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/02/nginx_traces.webp" alt="Traces on SigNoz dashboard"/>
    <figcaption><i>Traces on the SigNoz dashboard shows requests traveling through nginx to the backend application.</i></figcaption>
</figure>

<br></br>

As can be seen in the picture, the requests are traveling through the nginx to the backend application. The distributed tracing shows 14 spans for a single request. Spans are fundamental building blocks of distributed tracing. A single trace in distributed tracing consists of a series of tagged time intervals known as [spans](https://signoz.io/blog/distributed-tracing-span/).

It returns the 500 error since the API returns 500 for nonexistent entries.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/02/nginx_500_traces.webp" alt="spans with http status codes in attributes"/>
    <figcaption><i>http_status_code is 500 in case of non-existent entries</i></figcaption>
</figure>

<br></br>

If we’re hitting the right endpoint, the `http_status_code` shows 200.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/02/nginx_200_traces.webp" alt="spans with http status codes in attributes"/>
    <figcaption><i>http_status_code is 200 in case of hitting the right endpoint</i></figcaption>
</figure>

<br></br>

Traces give you a detailed view of how requests are performing across each 

As you can see you can easily navigate and find your traces in the UI to inspect the outcome of the steps you have an interest in.

## Conclusion

OpenTelemetry is quietly becoming the world standard for instrumenting cloud-native applications. You can instrument all components of your software system with OpenTelemetry. It is rapidly growing and being widely adopted by users. Backed by CNCF, OpenTelemetry is the best open-source standard that you can use to set up your observability framework.

Also, there is no vendor lock-in. You can send the collected data to an observability backend of your choice. An OpenTelemetry-native APM like SigNoz is suited to visualize the data collected by OpenTelemetry.

---

**Related Posts**

**[SigNoz - An open source OpenTelemetry APM](https://signoz.io/blog/opentelemetry-apm/)** 

**[OpenTelemetry Collector Complete Guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)**