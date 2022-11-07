---
title: Monitoring your FastAPI application using OpenTelemetry
slug: opentelemetry-fastapi
date: 2021-11-20
tags: [OpenTelemetry Instrumentation, Python]
authors: ankit_anand
description: OpenTelemetry is a vendor-agnostic isntrumentation library. In this article, learn how to set up monitoring for FastAPI web framework using OpenTelemetry.
image: /img/blog/2021/11/monitor_fastAPI_cover.webp
keywords:
  - opentelemetry
  - opentelemetry python
  - opentelemetry fastapi
  - distributed tracing
  - observability
  - fastapi monitoring
  - fastapi instrumentation
  - signoz
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-fastapi/"/>
</head>

FastAPI is a modern Python web framework based on standard Python type hints that makes it easy to build APIs. It's a relatively new framework, having been released in 2018 but has now been adopted by big companies like Uber, Netflix, and Microsoft.

<!--truncate-->

![Cover Image](/img/blog/2021/11/monitor_fastAPI_cover.webp)

FastAPI is one of the fastest Python web frameworks currently available and is really efficient when it comes to writing code. It is based on ASGI specification, unlike other Python frameworks like Flask, which is based on WSGI specification.

Instrumentation is the biggest challenge engineering teams face when starting out with monitoring their application performance. <a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> is the leading open-source standard that is solving the problem of instrumentation. It is currently an incubating project under the <a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank" >Cloud Native Computing Foundation</a>.

It is a set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(Logs, metrics, and traces). It aims to make telemetry data(logs, metrics, and traces) a built-in feature of cloud-native software applications.

 One of the biggest advantages of using OpenTelemetry is that it is vendor-agnostic. It can export data in multiple formats which you can send to a backend of your choice.

In this article, we will use [SigNoz](https://signoz.io/) as a backend. SigNoz is an open-source APM tool that can be used for both metrics and distributed tracing.

Let's get started and see how to use OpenTelemetry for a FastAPI application.

## Running a FastAPI application with OpenTelemetry

OpenTelemetry is a great choice to instrument ASGI frameworks. As it is open-source and vendor-agnostic, the data can be sent to any backend of your choice.

### Installing SigNoz

You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```
<br></br>

For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/docker/?utm_source=blog&utm_medium=fastapi)

When you are done installing SigNoz, you can access the UI at: [http://localhost:3301](http://localhost:3301/application)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

import Screenshot from "@theme/Screenshot"

<Screenshot
    alt="SigNoz dashboard home"
    height={500}
    src="/img/blog/common/signoz_dashboard_homepage.webp"
    title="List of applications shown as an example on SigNoz dashboard"
    width={700}
/>

### Instrumenting a sample FastAPI application with OpenTelemetry

**Prerequisites**<br></br>
Python 3.6 or newer

Download the <a href = "https://www.python.org/downloads/" rel="noopener noreferrer nofollow" target="_blank" >latest version</a> of Python.

**1. Running sample FastAPI app**<br></br>
We will be using the FastAPI app at this <a href = "https://github.com/SigNoz/sample-fastAPI-app" rel="noopener noreferrer nofollow" target="_blank" >Github repo</a>. All the required OpenTelemetry packages are contained within the `requirements.txt` file under `app` folder in this sample app. Go to the `app` folder first.
```jsx
git clone https://github.com/SigNoz/sample-fastAPI-app.git
cd sample-fastapi-app/
cd app
```


Note: We will using a virtual python environment for this sample fastAPI app. Learn how to do it [here](https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/26/python-virtual-env/).

<br></br>

**2. Run instructions for sending data to SigNoz**<br></br>
The `requirements.txt` file contains all the necessary OpenTelemetry Python packages needed for instrumentation. In order to install those packages, run the following command:
```jsx
pip3 install -r requirements.txt
```
<br></br>

**3. Install application specific packages**<br></br>
This step is required to install packages specific to the application. This command figures out which instrumentation packages the user might want to install and installs it for them:
```jsx
opentelemetry-bootstrap --action=install
```
<br></br>


**4. Configure environment variables to run app and send data to SigNoz**<br></br>
You're almost done. In the last step, you just need to configure a few environment variables for your OTLP exporters. Environment variables that need to be configured:

   - `service.name`- application service name (you can name it as you like)
   - `OTEL_EXPORTER_OTLP_ENDPOINT` - In this case, IP of the machine where SigNoz is installed

   :::note
   Don’t run app in reloader/hot-reload mode as it breaks instrumentation.
   :::
   
   You need to put these environment variables in the below command.
   
   ```jsx
   OTEL_RESOURCE_ATTRIBUTES=service.name=<service_name> OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz>:4317" opentelemetry-instrument uvicorn main:app --host localhost --port 5002
   ```

   As we are running SigNoz on local host, `IP of SigNoz` can be replaced with `localhost` in this case. And, for `service_name` let's use `fastapiApp`. Hence, the final command becomes:

   :::note

    The uvicorn run command with multiple workers has yet to be supported. Alternatively, you can use gunicorn with the worker class `uvicorn.workers.Uvicorn[H11]Worker`

    In that case, the final command will be

    ```
    OTEL_RESOURCE_ATTRIBUTES=service.name=fastapiApp OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317" opentelemetry-instrument gunicorn main:app --workers 2 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
    ```
   :::


   **Final Command**

   ```jsx
   OTEL_RESOURCE_ATTRIBUTES=service.name=fastapiApp OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317" opentelemetry-instrument uvicorn main:app --host localhost --port 5002
   ```

And, congratulations! You have instrumented your sample FastAPI app. You can check if your app is running or not by hitting the endpoint at [http://localhost:5002/](http://localhost:5002/).

If you have installed SigNoz on your local host, then you can access the SigNoz dashboard at [http://localhost:3301](http://localhost:3301) to monitor your app for performance metrics.

You need to generate some load on your app so that there is data to be captured by OpenTelemetry. You can use locust for this load testing.

```jsx
pip3 install locust
```

<br></br>

```jsx
locust -f locust.py --headless --users 10 --spawn-rate 1 -H http://localhost:5002
```
<br></br>

You will find `fastapiAPP` in the list of sample applications being monitored by SigNoz.

<Screenshot
    alt="FastAPI in the list of applications"
    height={500}
    src="/img/blog/2021/11/list_of_apps_fastapi.webp"
    title="FastAPI in the list of applications being monitored by SigNoz"
    width={700}
/>

If you want to run the application with a docker image, refer to the section below for instructions.

### Run with docker
You can use the below instructions if you want to run your app as a docker image, below are the instructions.<br></br>
**Build docker image**
```jsx
docker build -t sample-fastapi-app .
```
<br></br>

**Setting environment variables**<br></br>
You need to set some environment variables while running the application with OpenTelemetry and send collected data to SigNoz. You can do so with the following commands at the terminal:
```jsx
# If you have your SigNoz IP Address, replace <IP of SigNoz> with your IP Address. 

docker run -d --name fastapi-container \
-e OTEL_METRICS_EXPORTER='none' \
-e OTEL_RESOURCE_ATTRIBUTES='service.name=fastapiApp' \
-e OTEL_EXPORTER_OTLP_ENDPOINT='http://<IP of SigNoz>:4317' \
-p 5002:5002 sample-fastapi-app
```
<br></br>

If you're using docker-compose setup:

```jsx
# If you are running signoz through official docker-compose setup, run `docker network ls` and find clickhouse network id. It will be something like this clickhouse-setup_default 
# and pass network id by using --net <network ID>

docker run -d --name fastapi-container \ 
--net clickhouse-setup_default  \ 
--link clickhouse-setup_otel-collector_1 \
-e OTEL_METRICS_EXPORTER='none' \
-e OTEL_RESOURCE_ATTRIBUTES='service.name=fastapiApp' \
-e OTEL_EXPORTER_OTLP_ENDPOINT='http://clickhouse-setup_otel-collector_1:4317' \
-p 5002:5002 sample-fastapi-app
```
<br></br>

If you're running SigNoz in your local host then you can replace `<IP of SigNoz>` with `localhost` and the final command will look like below:

```jsx
docker run -d --name fastapi-container \
-e OTEL_METRICS_EXPORTER='none' \
-e OTEL_RESOURCE_ATTRIBUTES='service.name=fastapiApp' \
-e OTEL_EXPORTER_OTLP_ENDPOINT='http://localhost:4317' \
-p 5002:5002 sample-fastapi-app
```
<br></br>

## Open-source tool to visualize telemetry data
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
OpenTelemetry makes it very convenient to instrument your FastAPI application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="R2VX2T1WB-I" mute={false} />

<p>&nbsp;</p>

If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://signoz.io/slack)

---
Read more about OpenTelemetry 👇

[Things you need to know about OpenTelemetry tracing](https://signoz.io/blog/opentelemetry-tracing/)

[OpenTelemetry collector - architecture and configuration guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)

