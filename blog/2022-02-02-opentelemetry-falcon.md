---
title: Monitoring apps based on Falcon Web Framework with OpenTelemetry
slug: opentelemetry-falcon
date: 2022-02-03
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

``` jsx
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

The above instruction is for MacOS and linux distributions. For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/docker/?utm_source=blog&utm_medium=opentelemetry_django)

If you have installed SigNoz on your local host, you can access the UI at: [http://localhost:3301](http://localhost:3301/application)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

import Screenshot from "@theme/Screenshot"

<Screenshot
   alt="SigNoz dashboard showing application list"
   height={500}
   src="/img/blog/2021/08/signoz_dashboard_hc.webp"
   title="SigNoz Dashboard"
   width={700}
/>

### Instrumenting a sample Falcon application with OpenTelemetry

#### Prerequisites for the sample app

1. Python 3.8 or newer<br></br>
   Download the [latest version](https://www.python.org/downloads/) of Python.

2. Redis<br></br>
   For Mac users
   ```jsx
   brew install redis
   brew services start redis
   ```
   
   For Ubuntu users
   ```jsx
   sudo apt install redis-server
   ```
   
   You can also read a [detailed guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04) to installing Redis on Ubuntu.

#### Running sample Falcon based app with OpenTelemetry

1. **Running sample Falcon based app**<br></br>
   We will be using the Falcon app at this [Github repo](https://github.com/SigNoz/python-falcon-template).

   ```jsx
   git clone https://github.com/SigNoz/python-falcon-template.git
   cd python-falcon-template
   ```

2. **Create a virtual python environment and activate it**<br></br>
   It’s a good practice to create virtual environments for running Python apps.

   ```jsx
   virtualenv mypython
   source mypython/bin/activate
   ```

   You can read more about [creating virtual environments](https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/26/python-virtual-env/) in Python.

3. **Installing necessary OpenTelemetry and Python packages**<br></br>
   The `base.txt` file contains all the necessary OpenTelemetry and Python packages needed for instrumentation. In order to install those packages, run the following command:

   ```jsx
   pip3 install -r requirements/base.txt
   ```
   Here’s a snapshot of packages in the `base.txt` file to run the Flacon application with OpenTelemetry.
   <Screenshot
   alt="Python packages required for the application"
   height={290}
   src="/img/blog/2022/02/opentelemetry_python_packages.png"
   width={500}
   />

4. **Install application-specific packages**<br></br>
   This step is required to install packages specific to the application. This command figures out which instrumentation packages the user might want to install and installs it for them:
   ```jsx
   opentelemetry-bootstrap --action=install
   ```

5. **Configure environment variables to run app and send data to SigNoz**<br></br>
   Finally, you can run your Falcon app with OpenTelemetry and send data to SigNoz for monitoring. In the last step, you just need to configure a few environment variables for your OTLP exporters. Environment variables that need to be configured:

   - `service.name` - name of the service you’re monitoring, you can name it anything you want
   - `OTEL_EXPORTER_OTLP_ENDPOINT` - Here you have to specify the endpoint of the backend where OpenTelemetry will send the captured data to.

   After taking care of these environment variables, you only need to run your instrumented application. Accomplish all these by using the following command at your terminal.

   ```jsx
   OTEL_RESOURCE_ATTRIBUTES=service.name=<service_name> OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz>:4317" opentelemetry-instrument gunicorn src.app -b 0.0.0.0:8001
   ```

   Naming our service as `falconApp` and replacing `Ip of SigNoz`  with `localhost`, the final command becomes:

   ```jsx
   OTEL_RESOURCE_ATTRIBUTES=service.name=flaconApp OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317" opentelemetry-instrument gunicorn src.app -b 0.0.0.0:8001
   ```
   And congratulations! You have now instrumented your falcon application with OpenTelemetry.

6. **Checking the app and monitoring data with SigNoz**<br></br>
   Access an endpoint from the sample application here: [http://localhost:8001/api/v1/test](http://localhost:8001/api/v1/test).
   
   You need to interact with the endpoint to generate some monitoring data. Refresh the endpoint about 10-20 times and check SigNoz dashboard.
   
   If you have installed SigNoz on your local machine, you can access the SigNoz dashboard at: [http://localhost:3301](http://localhost:3301)

<Screenshot
   alt="Falcon based application monitored on SigNoz dashboard"
   height={500}
   src="/img/blog/2022/02/falcon_app_monitored.webp"
   title="You will find the Falcon application in the list of applications monitored on SigNoz dashboard. The other applications are from a sample app that comes loaded with SigNoz."
   width={700}
/>

### Open-source tool to visualize telemetry data
SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests

<Screenshot
    alt="SigNoz charts and metrics"
    height={500}
    src="/img/blog/common/signoz_charts_application_metrics.webp"
    title="Measure things like application latency, requests per sec, error percentage and see your top endpoints with SigNoz."
    width={700}
/>

You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.

<Screenshot
    alt="List of traces on SigNoz dashboard"
    height={500}
    src="/img/blog/common/signoz_list_of_traces_hc.webp"
    title="View of traces at a particular timestamp"
    width={700}
/>

You can use flamegraphs to exactly identify the issue causing the latency.

<Screenshot
    alt="Flamegraphs used to visualize spans of distributed tracing in SigNoz UI"
    height={500}
    src="/img/blog/common/signoz_flamegraphs.webp"
    title="View of traces at a particular timestamp"
    width={700}
/>

You can also build custom metrics dashboard for your infrastructure.

<Screenshot
    alt="Custom metrics dashboard"
    height={500}
    src="/img/blog/common/signoz_custom_dashboard-min.webp"
    title="You can also build a custom metrics dashboard for your infrastructure"
    width={700}
/>

## Conclusion
OpenTelemetry makes it very convenient to instrument your Falcon application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. SigNoz provides both metrics monitoring and distributed tracing so that you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇
[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="ntW_3t5J34g" mute={false} />

<p>&nbsp;</p>

If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://signoz.io/slack)

---

If you want to read more about SigNoz 👇

[Golang Aplication Monitoring with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/go/)

[OpenTelemetry collector - complete guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)



