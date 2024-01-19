---
title: Monitor your Python application with full stack open source APM tool - SigNoz
slug: python-application-monitoring
date: 2023-08-27
tags: [OpenTelemetry Instrumentation, Python]
authors: ankit_anand
description: In this article, learn how to setup application monitoring for Python apps using an open-source solution, SigNoz.
image: /img/blog/2021/06/python_application_monitoring_hc.webp
keywords:
  - python application monitoring
  - opentelemetry
  - opentelemetry python
  - python app
  - python
  - distributed tracing
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

In this article, learn how to setup application monitoring for Python apps using an open-source solution, SigNoz.

<!--truncate-->

![Cover Image](/img/blog/2021/06/python_application_monitoring_hc.webp)

If you want to check our Github repo before diving in 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

**The cost of a millisecond.**

TABB Group, a financial services industry research firm, <a href = "https://research.tabbgroup.com/report/v06-007-value-millisecond-finding-optimal-speed-trading-infrastructure" rel="noopener noreferrer nofollow" target="_blank" >estimates</a> that if a broker's electronic trading platform is 5 milliseconds behind the competition, it could cost $4 million in revenue per millisecond.


The cost of latency is too high in the financial services industry, and the same is true for almost any software-based business today. For Google, half a second delay in search results caused a 20% drop in traffic. Half a second is enough to kill user satisfaction to a point where they abandon an app's service.

While a user sees a screen, there are thousands of services in the background taking care of a user's request. In a microservices architecture, the challenge for engineering teams is to constantly figure out areas of optimization in a complex distributed network. And the solution starts with setting up a robust monitoring infrastructure for the application's production environment.

Capturing and analyzing data about your production environment is critical. You need to proactively solve stability and performance issues in your web application to avoid system failures and ensure a smooth user experience.

And to do that, you need insights into how your infrastructure handles user requests. With SigNoz, you can start monitoring your app in a few simple steps, and with an easy-to-use dashboard, you can quickly identify bottlenecks in your services.

## Introducing SigNoz

SigNoz is a full-stack open-source application monitoring and observability platform which can be installed within your infra. You can track metrics like p99 latency, error rates for your services, external API calls, and individual endpoints. With service maps, you can quickly assess the health of your services.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_service_maps.webp" alt=""/>
    <figcaption><i>Service maps on SigNoz dashboard</i></figcaption>
</figure>

<br></br>

<!--- Service maps on SigNoz dashboard --->

And once you know the affected service, trace data can help you identify the exact code causing the issue. Using SigNoz dashboard, you can visualize your traces easily with flamegraphs.


<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt=""/>
    <figcaption><i>Distributed tracing visualized with flamegraphs on SigNoz dashboard</i></figcaption>
</figure>

<br></br>

<!--- Distributed tracing visualized with flamegraphs on SigNoz dashboard --->

Now let's get down to some action and see everything for yourself.

We have set up a <a href = "https://github.com/SigNoz/sample-flask-app" rel="noopener noreferrer nofollow" target="_blank" >sample ToDo Python app</a> based on Flask web framework, which uses MongoDB as a database to demonstrate how SigNoz works. We will divide the tutorial into two parts:

1. Installing SigNoz
2. Instrumenting sample app to start monitoring


## Installing SigNoz

You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```
<br></br>

For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

When you are done installing SigNoz, you can access the UI at: `http://localhost:3301`

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.


<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_dashboard_homepage.webp" alt="Homepage SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the application</i></figcaption>
</figure>

<br></br>

<!-- ## Part 1 - Installing SigNoz

1. **Install Docker**<br></br>
   You can install Docker by following the steps listed on their website [here.](https://www.docker.com/get-started) For this tutorial, you can choose the Docker Desktop option based on the system you have.

   ![](/img/blog/2021/05/screenzy-1621623948044-2.webp)

2. **Clone SigNoz GitHub repository**<br></br>
   From your terminal use the following command to clone SigNoz's GitHub repository.

   ```
   git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
   ```

3. **Update path to signoz/deploy and install SigNoz**<br></br>
   The deploy folder contains the files necessary for deploying SigNoz through Docker.

   ```
   cd signoz/deploy/
   ./install.sh
   ```

   You will be asked to select one of the 2 ways to proceed:

   1. ClickHouse as database (default)
   2. Kafka + Druid setup to handle scale (recommended for production use)

   Trying out SigNoz with ClickHouse database takes less than 1.5GB of memory and for this tutorial, we will use that option.

   ![](/img/blog/2021/06/screenzy-1623086990810-1.webp)

   You will get the following message once the installation is complete.

   ![](/img/blog/2021/06/screenzy-1623086918860-1.webp)

   Note that this setup is just for demo/testing purposes and you need to proceed with Kafka + Druid set up option in case you want to set up SigNoz for use in production.

Once the installation runs successfully, the UI should be accessible at port 3301. Wait for 2-3 mins for the data to be available to frontend. 

![SigNoz UI](/img/blog/2021/05/screenzy-1621624012520-3.webp) -->

The applications shown in the dashboard are from a sample app called Hot R.O.D that comes with the installation bundle.

Now that you have SigNoz up and running, let's see how instrumentation works. Instrumentation is the process of implementing code instructions to monitor your application's performance. Instrumentation is key to see how your application handles the real world.

SigNoz supports <a href = "https://opentelemetry.io" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> as the primary way for users to instrument their application. OpenTelemetry is a single, vendor-agnostic instrumentation library per language with support for both automatic and manual instrumentation. You don't need to worry about instrumentation in this tutorial. OpenTelemetry comes with all currently available <a href = "https://github.com/open-telemetry/opentelemetry-python" rel="noopener noreferrer nofollow" target="_blank" >instrumentation</a>.

## Instrumenting sample app to start monitoring

**Prerequisites**

1. **Python 3.8 or newer**<br></br>
   If you do not have Python installed on your system, you can download it from the link <a href = "https://www.python.org/downloads/" rel="noopener noreferrer nofollow" target="_blank" >here</a>. Check the version of Python using `python3 --version` on your terminal to see if Python is properly installed or not.

2. **MongoDB**<br></br>
   If you already have MongoDB services running on your system, you can skip this step.
   
   For macOS: <a href = "https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/" rel="noopener noreferrer nofollow" target="_blank" >https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x</a>

   For Linux: <a href = "https://docs.mongodb.com/manual/administration/install-on-linux/" rel="noopener noreferrer nofollow" target="_blank" >https://docs.mongodb.com/manual/administration/install-on-linux</a>


On MacOS the installation is done using Homebrew's brew package manager. Once the installation is done, don't forget to start MongoDB services using `brew services start mongodb/brew/mongodb-community@4.4`  on your macOS terminal.


<figure data-zoomable align='center'>
    <img src="/img/blog/2021/05/screenzy-1622494628333.webp" alt=""/>
    <figcaption><i>Starting mongodb with homebrew</i></figcaption>
</figure>

<br></br>

### Steps

Step 1. Clone sample Flask app repository<br></br>

From your terminal use the following command to clone sample Flask app GitHub repository.

```
git clone --single-branch --depth 1 https://github.com/SigNoz/sample-flask-app.git
```

Step 2. Update path to sample-flask-app<br></br>

Check if the app is working or not using the following command:

```
cd sample-flask-app
python3 app.py
```


<figure data-zoomable align='center'>
    <img src="/img/blog/2021/05/screenzy-1622486361195.webp" alt=""/>
    <figcaption><i>mac terminal running Python apps</i></figcaption>
</figure>

<br></br>

<!--- On my mac terminal --->

You can now access the UI of the app on your local host: [http://localhost:5002/](http://localhost:5002/)



<figure data-zoomable align='center'>
    <img src="/img/blog/2021/05/screenzy-1622486344949-1.webp" alt=""/>
    <figcaption><i>TODO reminder app with Flask and MongoDB</i></figcaption>
</figure>

<br></br>



Press 'Ctrl + C' to exit the app once you have made sure it is running properly.

Step 3. **Set up OpenTelemetry Python instrumentation library**<br></br>

Your app folder contains a file called `requirements.txt`. This file contains all the necessary commands to set up OpenTelemetry python instrumentation library. All the mandatory packages required to start the instrumentation are installed with the help of this file. Make sure your path is updated to the root directory of your sample app and run the following command:

```
pip3 install -r requirements.txt
```

:::note
The opentelemetry-exporter-otlp is a convenience wrapper package to install all OTLP exporters. Currently, it installs:

- opentelemetry-exporter-otlp-proto-http

- opentelemetry-exporter-otlp-proto-grpc

- (soon) opentelemetry-exporter-otlp-json-http

The `opentelemetry-exporter-otlp-proto-grpc` package installs the gRPC exporter which depends on the `grpcio` package. The installation of `grpcio` may fail on some platforms for various reasons. If you run into such issues, or you don't want to use gRPC, you can install the HTTP exporter instead by installing the `opentelemetry-exporter-otlp-proto-http` package. You need to set the `OTEL_EXPORTER_OTLP_PROTOCOL` environment variable to `http/protobuf` to use the HTTP exporter.
:::

If it hangs while installing `grpcio` during **pip3 install opentelemetry-exporter-otlp** then follow below steps as suggested in **<a href = "https://stackoverflow.com/a/62500932/3243212" rel="noopener noreferrer nofollow" target="_blank" >this stackoverflow link</a>**

- pip3 install --upgrade pip
- python3 -m pip install --upgrade setuptools
- pip3 install --no-cache-dir --force-reinstall -Iv grpcio

Step 4. **Install application specific packages**<br></br>

This step is required to install packages specific to the application. Make sure to run this command in the root directory of your installed application. This command figures out which instrumentation packages the user might want to install and installs it for them:

```
opentelemetry-bootstrap --action=install
```
:::note
Please make sure that you have installed all the dependencies of your application before running the above command. The command will not install instrumentation for the dependencies which are not installed.
:::

Step 5. **Configure environment variables to run app and send data to SigNoz**<br></br>
You're almost done. In the last step, you just need to configure a few environment variables for your OTLP exporters. Environment variables that need to be configured:

- `service.name`- application service name (you can name it as you like)
- `OTEL_EXPORTER_OTLP_ENDPOINT` - In this case, IP of the machine where SigNoz is installed

`IP of SigNoz backend` is the IP of the machine where you installed SigNoz. If you have installed SigNoz on `localhost`, the endpoint will be `http://localhost:4317` for gRPC exporter and `http://localhost:4318` for HTTP exporter.

You need to put these environment variables in the below command.

```bash
OTEL_RESOURCE_ATTRIBUTES=service.name=<service_name> OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz>:4317" opentelemetry-instrument python3 app.py
```

:::note
Don’t run app in reloader/hot-reload mode as it breaks instrumentation. For example, if you use `export FLASK_ENV=development`, it enables the reloader mode which breaks OpenTelemetry instrumentation.
:::

As we are running SigNoz on local host, `IP of SigNoz` can be replaced with `localhost` in this case. And, for `service_name` let's use `pythonApp`. Hence, the final command becomes:

**Final Command**

```
OTEL_RESOURCE_ATTRIBUTES=service.name=pythonApp OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317" opentelemetry-instrument python3 app.py
```

And, congratulations! You have instrumented your sample Python app. You can now access the SigNoz dashboard at [http://localhost:3301](http://localhost:3301/) to monitor your app for performance metrics.


<figure data-zoomable align='center'>
    <img src="/img/blog/2021/05/dashboard-1.webp" alt=""/>
    <figcaption><i>Python app in the application list</i></figcaption>
</figure>

<br></br>

## Using SigNoz dashboard to identify issues causing high latency in your app

Now that you have installed SigNoz, let's see how you can identify specific events causing high latency in your deployed applications.

In just 5 easy steps, our dashboard lets you drill down to events causing a delay in your deployed apps 👇

1. **Choose the service you want to inspect**

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_dashboard_homepage.webp" alt=""/>
    <figcaption><i>List of services monitored</i></figcaption>
</figure>

<br></br>

2. **Choose the timestamp where latency is high and click on view traces**

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_metrics_to_traces.webp" alt=""/>
    <figcaption><i>Dashboard showing RED metrics</i></figcaption>
</figure>

<br></br>

3. **Choose the trace ID with the highest latency**

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_list_of_traces_hc.webp" alt=""/>
    <figcaption><i>See list of traces</i></figcaption>
</figure>

<br></br>

4. **Inspect distributed traces with flamegraph**

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt=""/>
    <figcaption><i>Flamegraphs for distributed tracing</i></figcaption>
</figure>

<br></br>

If you need any help with trying out SigNoz, feel free to mail me at ankit.anand@signoz.io.

Check out our [documentation](https://signoz.io/docs/install/docker) for more installation guides and troubleshooting instructions.

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="oZkFfMN57yI" mute={false} />

<p>&nbsp;</p>

They say, "If it's not monitored, then it's not in production." And with SigNoz you can start monitoring your applications now. Enabling your team to resolve issues quickly in production is critical to maintaining complex distributed systems in fine health.

At SigNoz, we are committed to making the best open-source, self-hosted tool for application performance monitoring. Feel free to check out our GitHub repo here 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)
