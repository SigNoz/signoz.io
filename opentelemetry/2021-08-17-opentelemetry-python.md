---
title: Monitor your Python application with OpenTelemetry and SigNoz
slug: python
date: 2023-02-06
tags: [python-monitoring]
author: Ankit Anand
author_title: SigNoz Team
author_url: https://github.com/ankit01-oss
author_image_url: https://avatars.githubusercontent.com/u/83692067?v=4
description: End-to-end performance monitoring of Python application with OpenTelemetry. Get your telemetry data visualized with SigNoz....
image: /img/blog/2021/08/opentelemetry_python_cover.jpeg
keywords:
  - opentelemetry
  - opentelemetry python
  - distributed tracing
  - observability
  - python monitoring
  - python instrumentation
  - signoz
---

OpenTelemetry is a vendor-agnostic instrumentation library under CNCF. It can be used to instrument your Python applications to generate telemetry data. Let's learn how it works and see how to visualize that data with SigNoz.

<!--truncate-->

import Screenshot from "@theme/Screenshot"


<figure data-zoomable align='center'>
    <img src="/img/blog/2021/08/opentelemetry_python_cover.webp" alt="Monitor Python applications with SigNoz"/>
    <figcaption><i>Monitor Python applications with SigNoz</i></figcaption>
</figure>

<br></br>

**The cost of a millisecond.**<br></br>
TABB Group, a financial services industry research firm, <a href="https://research.tabbgroup.com/report/v06-007-value-millisecond-finding-optimal-speed-trading-infrastructure" rel="noopener noreferrer nofollow" target="_blank">estimates</a> that if a broker's electronic trading platform is 5 milliseconds behind the competition, it could cost $4 million in revenue per millisecond.

The cost of latency is too high in the financial services industry, and the same is true for almost any software-based business today. Half a second is enough to kill user satisfaction to a point where they abandon an app's service.

Capturing and analyzing data about your production environment is critical. You need to proactively solve stability and performance issues in your web application to avoid system failures and ensure a smooth user experience.

In a microservices architecture, the challenge is to solve availability and performance issues quickly. You need observability for your applications. And, observability is powered with telemetry data.

## What is OpenTelemetry?

OpenTelemetry emerged as a single project after the merging of OpenCensus(from Google) and OpenTracing(from Uber) into a single project. The project aims to make telemetry data(logs, metrics, and traces) a built-in feature of cloud-native software applications.

OpenTelemetry has laguage-specific implementation for generating telemetry data which includes OpenTelemetry Python libraries.

You can check out the current releases of <a href = "https://github.com/open-telemetry/opentelemetry-python/releases" rel="noopener noreferrer nofollow" target="_blank">opentelemetry-python</a>.

OpenTelemetry only generates telemetry data and lets you decide where to send your data for analysis and visualization. In this article, we will be using [SigNoz](https://signoz.io/) - an open-source full-stack application performance monitoring tool as our analysis backend.

**Steps to get started with OpenTelemetry for a Python application:**

- Installing SigNoz
- Installing sample Python app
- Instrumentation with OpenTelemetry and sending data to SigNoz

## Installing SigNoz

You can get started with SigNoz using just three commands at your terminal.

```bash
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
    <img src="/img/blog/common/signoz_dashboard_homepage.webp" alt="SigNoz dashboard"/>
    <figcaption><i>SigNoz dashboard</i></figcaption>
</figure>

<br></br>

## Installing sample Python app

**Prerequisites**

1. **Python 3.4 or newer**<br></br>
   If you do not have Python installed on your system, you can download it from the <a href="https://www.python.org/downloads/" rel="noopener noreferrer nofollow" target="_blank">link</a>. Check the version of Python using `python3 --version` on your terminal to see if Python is properly installed or not.

2. **MongoDB**<br></br>
   If you already have MongoDB services running on your system, you can skip this step.
   
   For macOS: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

   For Linux: https://docs.mongodb.com/manual/administration/install-on-linux/

   For Ubuntu: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

   For Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

   On MacOS the installation is done using Homebrew's brew package manager. Once the installation is done, don't forget to start MongoDB services using `brew services start mongodb/brew/mongodb-community@4.4`  on your macOS terminal.

   <figure data-zoomable align='center'>
       <img src="/img/blog/2021/08/opentelemetry_python_start_mongodb.webp" alt="starting mongoDB services from mac terminal"/>
      <figcaption><i>starting mongoDB services from mac terminal</i></figcaption>
   </figure>

<br></br>

### Steps to get the Python app up and running

1. Clone sample Flask app repository and go to the root folder

   ```bash
   git clone --single-branch --depth 1 https://github.com/SigNoz/sample-flask-app.git
   cd sample-flask-app
   ```

2. Create a virtual environment
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```
3. Check if the app is running
   ```bash
   python3 app.py
   ```


<figure data-zoomable align='center'>
    <img src="/img/blog/2021/08/opentelemetry_python_python_app_terminal.webp" alt="mac terminal commands for running a python app"/>
    <figcaption><i>mac terminal commands for running a python app</i></figcaption>
</figure>

<br></br>


   You can now access the UI of the app on your local host: http://localhost:5002/

<figure data-zoomable align='center'>
    <img src="/img/blog/2021/08/python_app_ui.webp" alt="Python app UI"/>
    <figcaption><i>Python app UI</i></figcaption>
</figure>

<br></br>

## Instrumentation with OpenTelemetry and sending data to SigNoz

1. **Opentelemetry Python instrumentation installation**<br></br>
   Your app folder contains a file called requirements.txt. This file contains all the necessary commands to set up OpenTelemetry Python instrumentation. All the mandatory packages required to start the instrumentation are installed with the help of this file. Make sure your path is updated to the root directory of your sample app and run the following command:

   ```bash
   python -m pip install -r requirements.txt
   ```

   If it hangs while installing `grpcio` during **pip3 install opentelemetry-exporter-otlp** then follow below steps as suggested in <a href="https://stackoverflow.com/questions/56357794/unable-to-install-grpcio-using-pip-install-grpcio/62500932#62500932" rel="noopener noreferrer nofollow" target="_blank">this stackoverflow link</a>.

   - pip3 install --upgrade pip
   - python3 -m pip install --upgrade setuptools
   - pip3 install --no-cache-dir --force-reinstall -Iv grpcio

2. **Install application specific packages**<br></br>
   This step is required to install packages specific to the application. Make sure to run this command in the root directory of your installed application. This command figures out which instrumentation packages the user might want to install and installs it for them:

   ```bash
   opentelemetry-bootstrap --action=install
   ```

3. **Configure a span exporter and run your application**<br></br>
   You're almost done. In the last step, you just need to configure a few environment variables for your OTLP exporters. Environment variables that need to be configured:

   - `service.name`- application service name (you can name it as you like)
   - `OTEL_EXPORTER_OTLP_ENDPOINT` - In this case, IP of the machine where SigNoz is installed

   You need to put these environment variables in the below command.

   :::note
   Don’t run app in reloader/hot-reload mode as it breaks instrumentation.
   :::
   
   ```bash
   OTEL_RESOURCE_ATTRIBUTES=service.name=<service_name> OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz>:4317"
   OTEL_EXPORTER_OTLP_PROTOCOL=grpc opentelemetry-instrument python3 app.py
   ```

   As we are running SigNoz on local host, `IP of SigNoz` can be replaced with `localhost` in this case. And, for `service_name` let's use `pythonApp`. Hence, the final command becomes:

   **Final Command**

   ```
   OTEL_RESOURCE_ATTRIBUTES=service.name=pythonApp OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
   OTEL_EXPORTER_OTLP_PROTOCOL=grpc opentelemetry-instrument python3 app.py
   ```

   And, congratulations! You have instrumented your sample Python app. You can now access the SigNoz dashboard at [http://localhost:3301](http://localhost:3301/) to monitor your app for performance metrics.


<figure data-zoomable align='center'>
    <img src="/img/blog/2021/08/opentelemetry_python_dashboard.webp" alt="SigNoz dashboard showing python app in its list of applications"/>
    <figcaption><i>SigNoz dashboard showing python app in its list of applications</i></figcaption>
</figure>

<br></br>

## Metrics and Traces of the Python application

SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests


<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_charts_application_metrics.webp" alt="SigNoz dashboard showing the popular RED metrics for application performance monitoring"/>
    <figcaption><i>SigNoz dashboard showing the popular RED metrics for application performance monitoring</i></figcaption>
</figure>

<br></br>

You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.


<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_list_of_traces_hc.webp" alt="See traces, and apply powerful filters on trace data"/>
    <figcaption><i>View of traces at a particular timestamp</i></figcaption>
</figure>

<br></br>


You can use flamegraphs to exactly identify the issue causing the latency.


<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_flamegraphs.webp" alt="Flamegraphs for distributed tracing"/>
    <figcaption><i>Flamegraphs showing exact duration taken by each spans - a concept of distributed tracing</i></figcaption>
</figure>

<br></br>

## Conclusion

OpenTelemetry makes it very convenient to instrument your Python application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇<br></br>

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you face any issues while trying out SigNoz, feel free to write to us at: support@signoz.io

If you want to read more about SigNoz 👇<br></br>

[Golang Application Performance Monitoring with SigNoz](https://signoz.io/blog/monitoring-your-go-application-with-signoz/)

[Nodejs Application Performance Monitoring with SigNoz](https://signoz.io/blog/nodejs-opensource-application-monitoring/)

