---
title: OpenTelemetry Browser Instrumentation Complete Tutorial
slug: opentelemetry-browser-instrumentation
date: 2023-03-20
tags: [OpenTelemetry, Javascript]
authors: [sai_deepesh]
description: OpenTelemetry can be used for instrumenting browser applications. The OpenTelemetry browser instrumentation libraries provides developer the ability to collect performance metrics, traces, and other telemetry data...
image: /img/blog/2023/03/opentelemetry_browser_instrumentation_cover-min.jpg
hide_table_of_contents: false
keywords:
  - opentelemetry
  - opentelemetry browser
  - opentelemetry browser instrumentation
  - browser instrumentation
---

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-browser-instrumentation/"/>
</head>

Browser instrumentation refers to collecting and analyzing data about a user's interactions with a web browser. This type of instrumentation involves using specialized tools and techniques to gather information about how a website is being used, such as page load times, network requests, and user interactions. 

<!--truncate-->

![Cover Image](/img/blog/2023/03/opentelemetry_browser_instrumentation_cover.webp)

The data collected through browser instrumentation can be used to improve website performance, identify and troubleshoot errors, and gain insights into user behavior. In this tutorial, we will use OpenTelemetry to instrument a React browser application.

# OpenTelemetry Browser Instrumentation

OpenTelemetry provides libraries that enable the collection of telemetry data from web browsers using the OpenTelemetry API. You can collect performance metrics, traces, and other telemetry data from client-side applications running in the browser. The collected data can be exported to an observability backend like [SigNoz](https://signoz.io/). 

By using OpenTelemetry Browser Instrumentation, developers can gain valuable insights into how their web applications are performing and identify opportunities for optimization, leading to a better user experience. OpenTelemetry is backed by CNCF and is continuously evolving to improve observability for software systems.

OpenTelemetry just provides an instrumentation layer, you would need a backend to store and analyze data. In this tutorial, we will use SigNoz - an open source full-stack observability tool to visualize the collected data.

Let’s learn how to instrument a React browser application with OpenTelemetry. 

## Browser Instrumentation with OpenTelemetry

### Prerequisites

- [Reactjs](https://reactjs.org/)
- SigNoz

### Install SigNoz

**Step 1: Install SigNoz**

First, you need to install SigNoz so that OpenTelemetry can send the data to it.

SigNoz can be installed on macOS or Linux computers in just three steps by using a simple install script.

The install script automatically installs Docker Engine on Linux. However, on macOS, you must manually install <a href = "https://docs.docker.com/engine/install/" rel="noopener noreferrer nofollow" target="_blank" ><b>Docker Engine</b></a> before running the install script.

```jsx
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

You can visit the documentation for instructions on how to install SigNoz using Docker Swarm and Helm Charts.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/)

When you are done installing SigNoz, you can access the UI at [http://localhost:3301](http://localhost:3301/application)

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_dashboard_homepage.webp" alt="Homepage SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard - It shows services from a sample app that comes bundled with the application</i></figcaption>
</figure>

<br></br>

**Step 2: Get the sample React app**

[Sample React App](https://github.com/SigNoz/react-app-browser-instrumentation)
It contains the sample boilerplate code that we will instrument.

```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/react-app-browser-instrumentation.git
```

### Instrument React App with OpenTelemetry

**Step 3: Tracing.js file**
Our application code consists of a `tracing.js` file. The `tracing.js` file contains the code for setting up OpenTelemetry. You can find the file <a href = "https://github.com/SigNoz/react-app-browser-instrumentation/blob/main/src/tracing.js" rel="noopener noreferrer nofollow" target="_blank" ><b>here</b></a>.

**Step 4: Instrument Browser Instrumentation in React app with OpenTelemetry**

To instrument the React app with OpenTelemetry, we need to install the OpenTelemetry dependencies.

```jsx
npm i @opentelemetry/api @opentelemetry/auto-instrumentations-web @opentelemetry/context-zone @opentelemetry/exporter-trace-otlp-http @opentelemetry/instrumentation-fetch @opentelemetry/instrumentation-xml-http-request @opentelemetry/resources @opentelemetry/sdk-trace-web
```

Since we already set up the tracing.js file in the sample react app, you can just change the service name.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/03/signoz-browser-tracing.webp" alt="Changes in the tracing file"/>
    <figcaption><i>Update the service name to signoz-browser-tracing</i></figcaption>
</figure>

<br></br>

**Step 3: Enable CORS in the OpenTelemetry Collector**

SigNoz installation comes with an OpenTelemetry Collector, which must be configured for receiving traces from the browser application. Enable CORS in the OTel Receiver. 

Under SigNoz folder,  open the `otel-collector-config.yaml` file. The file is located at `deploy/docker/clickhouse-setup/otel-collector-config.yaml`

You can view the file at <a href = "https://github.com/SigNoz/signoz/blob/develop/deploy/docker/clickhouse-setup/otel-collector-config.yaml" rel="noopener noreferrer nofollow" target="_blank" ><b>SigNoz GitHub repo</b></a>. Inside the file, add the following CORS config:

```
http:
  cors:
    allowed_origins:
      - https://netflix.com  # URL of your Frontend application

```

You need to update the URL in the config file to match your frontend application URL. For this tutorial, we will be running our frontend application on `http://localhost:3000`.

```
http:
  cors:
    allowed_origins:
      - http://localhost:3000

```

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/03/enable_cors.webp" alt="Enable CORS in SigNoz OTel Collector"/>
    <figcaption><i>Enable CORS in SigNoz OTel Collector</i></figcaption>
</figure>

<br></br>

Once you make the changes, you need to restart the Docker containers.

**To stop running the SigNoz cluster:**

```
sudo docker compose -f docker/clickhouse-setup/docker-compose.yaml stop

```

**To start/resume the running SigNoz cluster:**

```
sudo docker compose -f docker/clickhouse-setup/docker-compose.yaml up

```

- *Note: The stopped SigNoz cluster should resume and mount to the existing docker volumes.*

**Step 6: Start the React app**

Go to the root folder of your React application, and run the following command:

```
npm run start
```

Congratulations! You have successfully run your React application with OpenTelemetry. It’s time to see the collected data.

### Monitor React App with SigNoz

**Step 7: Generate some data**

In order to monitor your React application with SigNoz, you first need to generate some data.

Visit [http://localhost:3000/](http://localhost:3000/) to access your frontend application. Using the UI, make some calls to the backend API. You can check the network tab in your browser to see the requests that you have made.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/03/network_calls_tracing.webp" alt="Network calls for tracing"/>
    <figcaption><i>Network calls for tracing</i></figcaption>
</figure>

<br></br>

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/03/to_do_list_app.webp" alt="Todo list app in React"/>
    <figcaption><i>Todo list app in React</i></figcaption>
</figure>

<br></br>

**Step 8: Monitor your application with SigNoz**

With SigNoz, you can monitor the data collected by OpenTelemetry from your sample React application. You can see end-to-end traces for your React application.

You can analyze your tracing data with powerful filters using the `Traces` tab on the SigNoz dashboard.

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/03/signoz_browser_tracing_in_service_tab.webp" alt="Browser application in the list of applications monitored in SigNoz"/>
    <figcaption><i>Browser application in the list of applications monitored in SigNoz</i></figcaption>
</figure>

<br></br>

**Todo 1 got added**

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/03/to-do-list-1.webp" alt=" To do 1"/>
</figure>

<br></br>

**Todo 2 got added** 

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/03/to-do-list-2.webp" alt="To Do 2"/>
</figure>

<br></br>

**Todo 3 got deleted**

<figure data-zoomable align='center'>
    <img src="/img/blog/2023/03/to-do-list-3.webp" alt="To Do 3"/>
</figure>

<br></br>

## Conclusion

OpenTelemetry browser instrumentation lets you collect important metrics about performance of browser applications. If you use OpenTelemetry, you also don’t get locked in with any vendor. OpenTelemetry is a one-stop solution for generating and collecting all telemetry signals. You can future-proof your instrumentation by using OpenTelemetry libraries.

OpenTelemetry combined with SigNoz provides a full-stack open source solution. SigNoz provides all three telemetry signals - logs, metrics, and traces under a single pane of glass. 

If you have any questions or need any help in setting things up with SigNoz, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

---

**Further Reading**

[SigNoz - an open source alternative to DataDog](https://signoz.io/blog/open-source-datadog-alternative/)

[Monitor your Express application with OpenTelemetry and SigNoz](https://signoz.io/blog/opentelemetry-express/)
