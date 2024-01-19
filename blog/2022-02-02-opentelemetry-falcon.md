---
title: Monitoring apps based on Falcon Web Framework with OpenTelemetry
slug: opentelemetry-falcon
date: 2023-08-27
tags: [OpenTelemetry Instrumentation, Python]
authors: [ankit_anand, ankit_nayan]
description: OpenTelemetry provides an open-source standard with a consistent collection mechanism and data format. In this article, learn how to set up monitoring for a Falcon based web application using OpenTelemetry.
image: /img/blog/2022/02/opentelemetry_falcon.webp
hide_table_of_contents: true
keywords:
  - opentelemetry
  - opentelemetry falcon
  - opentelemetry python
  - distributed tracing
  - observability
  - falcon monitoring
  - falcon instrumentation
  - signoz
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-falcon/"/>
</head>

Falcon is a minimalist Python web API framework for building robust applications and microservices. It also compliments many other Python frameworks by providing extra reliability, flexibility, and performance. Falcon based applications can be monitored using OpenTelemetry - an open-source standard to generate telemetry data.

<!--truncate-->

![Cover Image](/img/blog/2022/02/opentelemetry_falcon.webp)

> **What is OpenTelemetry Falcon?**<br></br>
> OpenTelemetry Falcon instrumentation enables the generation of telemetry data from your applications based on the Falcon web framework. The telemetry data is then used to monitor the performance of the Falcon application. OpenTelemetry provides an open-source standard with a consistent collection mechanism and data format. OpenTelemetry gives you the freedom to choose monitoring backends.

OpenTelemetry is a set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(Logs, metrics, and traces). It aims to make telemetry data(logs, metrics, and traces) a built-in feature of cloud-native software applications.

One of the biggest advantages of using OpenTelemetry is that it is vendor-agnostic. It can export data in multiple formats, which you can send to a backend of your choice.

In this article, we will use [SigNoz](https://signoz.io/) as a backend. SigNoz is an open-source APM tool built natively for OpenTelemetry and can be used for both metrics and distributed tracing. We will visualize the data captured by OpenTelemetry using SigNoz.

## Running Falcon based web application with OpenTelemetry

### Installing SigNoz

First, you need to install SigNoz. We will use OpenTelemetry to instrument the sample Falcon application, and the data collected by OpenTelemetry will be sent to SigNoz for storage and visualization.

> **What is application instrumentation?**<br></br>
> Instrumentation is the process of enabling your application to generate telemetry data (logs, metrics, and traces).

You can get started with SigNoz using just three commands at your terminal.

``` bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

The above instruction is for MacOS and linux distributions. For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

If you have installed SigNoz on your local host, you can access the UI at: [http://localhost:3301](http://localhost:3301/application)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.


<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_dashboard_homepage.webp" alt="Homepage SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the application</i></figcaption>
</figure>

<br></br>

### Instrumenting a sample Falcon application with OpenTelemetry

#### Prerequisites for the sample app

1. Python 3.8 or newer<br></br>
   Download the [latest version](https://www.python.org/downloads/) of Python.

2. Redis<br></br>
   For Mac users
   ```bash
   brew install redis
   brew services start redis
   ```
   
   For Ubuntu users
   ```bash
   sudo apt install redis-server
   ```
   
   You can also read a [detailed guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04) to installing Redis on Ubuntu.

#### Running sample Falcon based app with OpenTelemetry

**Step 1. Running sample Falcon based app**<br></br>
We will be using the Falcon app at this [Github repo](https://github.com/SigNoz/python-falcon-template).

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/python-falcon-template.git
cd python-falcon-template
```

**Step 2. Create a virtual python environment and activate it**<br></br>
It’s a good practice to create virtual environments for running Python apps.

```bash
python3 -m venv .venv
source .venv/bin/activate
```

**Step 3. Installing necessary OpenTelemetry and Python packages**<br></br>
The `base.txt` file contains all the necessary OpenTelemetry and Python packages needed for instrumentation. In order to install those packages, run the following command:

```bash
python -m pip install -r requirements/base.txt
```

The dependencies included are briefly explained below:

`opentelemetry-distro` - The distro provides a mechanism to automatically configure some of the more common options for users. It helps to get started with OpenTelemetry auto-instrumentation quickly. 

`opentelemetry-exporter-otlp` - This library provides a way to install all OTLP exporters. You will need an exporter to send the data to SigNoz.

:::note
💡 The `opentelemetry-exporter-otlp` is a convenient wrapper package to install all OTLP exporters. Currently, it installs:

- opentelemetry-exporter-otlp-proto-http
- opentelemetry-exporter-otlp-proto-grpc

- (soon) opentelemetry-exporter-otlp-json-http

The `opentelemetry-exporter-otlp-proto-grpc` package installs the gRPC exporter which depends on the `grpcio` package. The installation of `grpcio` may fail on some platforms for various reasons. If you run into such issues, or you don't want to use gRPC, you can install the HTTP exporter instead by installing the `opentelemetry-exporter-otlp-proto-http` package. You need to set the `OTEL_EXPORTER_OTLP_PROTOCOL` environment variable to `http/protobuf` to use the HTTP exporter.
:::


**Step 4. Install application-specific packages**<br></br>
This step is required to install packages specific to the application. This command figures out which instrumentation packages the user might want to install and installs it for them:
```bash
opentelemetry-bootstrap --action=install
```

:::note
Please make sure that you have installed all the dependencies of your application before running the above command. The command will not install instrumentation for the dependencies which are not installed.
:::

**Step 5. Configure environment variables to run app and send data to SigNoz**<br></br>
Finally, you can run your Falcon app with OpenTelemetry and send data to SigNoz for monitoring. In the last step, you just need to configure a few environment variables for your OTLP exporters. Environment variables that need to be configured:

- `service.name` - name of the service you’re monitoring, you can name it anything you want
- `OTEL_EXPORTER_OTLP_ENDPOINT` - Here you have to specify the endpoint of the backend where OpenTelemetry will send the captured data to.

After taking care of these environment variables, you only need to run your instrumented application. Accomplish all these by using the following command at your terminal.

```bash
OTEL_RESOURCE_ATTRIBUTES=service.name=<service_name> OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz>:4317"
OTEL_EXPORTER_OTLP_PROTOCOL=grpc opentelemetry-instrument gunicorn src.app -b 0.0.0.0:8001
```

Naming our service as `falconApp` and replacing `Ip of SigNoz`  with `localhost`, the final command becomes:

```bash
OTEL_RESOURCE_ATTRIBUTES=service.name=flaconApp OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
OTEL_EXPORTER_OTLP_PROTOCOL=grpc opentelemetry-instrument gunicorn src.app -b 0.0.0.0:8001
```

`IP of SigNoz backend` is the IP of the machine where you installed SigNoz. If you have installed SigNoz on `localhost`, the endpoint will be `http://localhost:4317` for gRPC exporter and `http://localhost:4318` for HTTP exporter.
      
:::note
The port numbers are 4317 and 4318 for the gRPC and HTTP exporters respectively. Remember to allow incoming requests to port **4317**/**4318** of machine where SigNoz backend is hosted.
:::

And congratulations! You have now instrumented your falcon application with OpenTelemetry.

:::note
Don’t run app in reloader/hot-reload mode as it breaks instrumentation.
:::

**Step 6. Checking the app and monitoring data with SigNoz**<br></br>
Access an endpoint from the sample application here: [http://localhost:8001/api/v1/test](http://localhost:8001/api/v1/test).

You need to interact with the endpoint to generate some monitoring data. Refresh the endpoint about 10-20 times and check SigNoz dashboard.

If you have installed SigNoz on your local machine, you can access the SigNoz dashboard at: [http://localhost:3301](http://localhost:3301)

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/02/falcon_app_monitored.webp" alt="Falcon based application monitored on SigNoz dashboard"/>
    <figcaption><i>You will find the Falcon application in the list of applications monitored on SigNoz dashboard. The other applications are from a sample app that comes loaded with SigNoz</i></figcaption>
</figure>

<br></br>

### Open-source tool to visualize telemetry data
SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_charts_application_metrics.webp" alt="SigNoz charts and metrics"/>
    <figcaption><i>Measure things like application latency, requests per sec, error percentage and see your top endpoints with SigNoz</i></figcaption>
</figure>

<br></br>

You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_list_of_traces_hc.webp" alt="List of traces on SigNoz dashboard"/>
    <figcaption><i>View of traces at a particular timestamp</i></figcaption>
</figure>

<br></br>

You can use flamegraphs to exactly identify the issue causing the latency.


<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt=""/>
    <figcaption><i>View of traces at a particular timestamp</i></figcaption>
</figure>

<br></br>

You can also build custom metrics dashboard for your infrastructure.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_custom_dashboard-min.webp" alt=""/>
    <figcaption><i>You can also build a custom metrics dashboard for your infrastructure</i></figcaption>
</figure>

<br></br>

## Conclusion
OpenTelemetry makes it very convenient to instrument your Falcon application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. SigNoz provides both metrics monitoring and distributed tracing so that you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇
[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="ntW_3t5J34g" mute={false} />

<p>&nbsp;</p>

If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

---

If you want to read more about SigNoz 👇

[Golang Aplication Monitoring with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/go/)

[OpenTelemetry collector - complete guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)



