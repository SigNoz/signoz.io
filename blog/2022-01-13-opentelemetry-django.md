---
title: Monitoring Django application performance with OpenTelemetry
slug: opentelemetry-django
date: 2023-08-27
tags: [OpenTelemetry Instrumentation, Python]
authors: [ankit_anand, ankit_nayan]
description: OpenTelemetry provides an open-source standard with a consistent collection mechanism and data format. In this article, learn how to set up monitoring for a Django application using OpenTelemetry.
image: /img/blog/2022/01/opentelemetry_django_cover.webp
hide_table_of_contents: true
keywords:
  - opentelemetry
  - opentelemetry django
  - opentelemetry python
  - distributed tracing
  - observability
  - django monitoring
  - django instrumentation
  - signoz
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-django/"/>
</head>

Django is a popular open-source python web framework that enables rapid development while taking out much of the hassle from routine web development. It also helps developers to avoid common security mistakes. As such, many applications are built with Django.

<!--truncate-->

![Cover Image](/img/blog/2022/01/opentelemetry_django_cover.webp)

Django is very popular among web developers and has a huge community behind it. It gives web developers ready-to-use components for common things that you will need to accomplish for a web application. Some examples are user authentication, admin panel for your website, forms, etc.

A Django application is built of different components like a web server, database, web server gateway interface, etc. To monitor a Django application for performance, you need to monitor all these components. And that’s where OpenTelemetry comes into the picture.

> **What is OpenTelemetry Django?**<br></br>
> OpenTelemetry Django instrumentation enables generation of telemetry data from your Django application. The data is then used to monitor performance of Django application.<br></br> OpenTelemetry provides an open-source standard with a consistent collection mechanism and data format. As application owners, you will always have the freedom to choose different vendors to visualize the collected telemetry data.

OpenTelemetry is a set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(Logs, metrics, and traces). It aims to make telemetry data(logs, metrics, and traces) a built-in feature of cloud-native software applications.

 One of the biggest advantages of using OpenTelemetry is that it is vendor-agnostic. It can export data in multiple formats, which you can send to a backend of your choice.

In this article, we will use [SigNoz](https://signoz.io/) as a backend. SigNoz is an open-source APM tool built natively for OpenTelemetry and can be used for both metrics and distributed tracing. We will visualize the data captured by OpenTelemetry using SigNoz.

In this article, we will use a sample Django application.

### Sample Django application
We will be using a sample poll application which will consist of two parts:

- A public site that lets people view polls and vote in them
- An admin site that lets you add, change and delete polls.

You can find the detailed tutorial on [official django website](https://docs.djangoproject.com/en/3.1/intro/tutorial01/).


<figure data-zoomable align='center'>
    <img src="/img/blog/2022/01/django_app_admin_panel.webp" alt=""/>
    <figcaption><i>Admin site of the sample Django application</i></figcaption>
</figure>

<br></br>

### Running Django application with OpenTelemetry
First, you need to install SigNoz. Data collected by OpenTelemetry will be sent to SigNoz for storage and visualization.

You can get started with SigNoz using just three commands at your terminal.

``` bash
git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

The above instruction is for MacOS and linux distributions. For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/deployment/docker/)

If you have installed SigNoz on your local host, you can access the UI at: [http://localhost:3301](http://localhost:3301/application)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_dashboard_homepage.webp" alt=""/>
    <figcaption><i>SigNoz Dashboard</i></figcaption>
</figure>

<br></br>

### Instrumenting a sample Django application with OpenTelemetry
**Prerequisites:**

- Python 3.8 or newer. Download the <a href = "https://www.python.org/downloads/" rel="noopener noreferrer nofollow" target="_blank" >latest version</a> of Python.

- for Django, you must define `DJANGO_SETTINGS_MODULE`correctly. If your project is called `mysite`, something like following should work:

```bash
export DJANGO_SETTINGS_MODULE=mysite.settings
```


**Step 1. Running sample Django app**<br></br>
We will be using the Django app at this [Github repo](https://github.com/SigNoz/sample-django). All the required OpenTelemetry and Python packages are contained within the `requirements.txt` file.
```bash
git clone --single-branch --depth 1 https://github.com/SigNoz/sample-django.git
cd sample-django
```
It’s a good practice to create virtual environments for running Python apps, so we will be using a virtual python environment for this sample Django app
#### Create a Virtual Environment
```bash
python3 -m venv .venv
source .venv/bin/activate
```
**Step 2. Installing necessary OpenTelemetry and Python packages**<br></br>
The `requirements.txt` file contains all the necessary OpenTelemetry and Python packages needed for instrumentation. In order to install those packages, run the following command:
```bash
python -m pip install -r requirements.txt
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

**Step 3. Install application-specific packages**<br></br>
This step is required to install packages specific to the application. This command figures out which instrumentation packages the user might want to install and installs it for them:
```bash
opentelemetry-bootstrap --action=install
```

:::note
Please make sure that you have installed all the dependencies of your application before running the above command. The command will not install instrumentation for the dependencies which are not installed.
:::

**Step 4. Prepare your Django app**<br></br>
Now you need to run the following three commands to prepare the sample Django application.<br></br>

a. This command is used to perform the initial database migration. You will only need to run this the very first time you deploy your app.
```bash
python3 manage.py migrate
```

b. This command is used to collect static files from multiple apps into a single path.
```bash
python3 manage.py collectstatic
```

c. The following command creates a user who can log in to the admin site. You will be asked to create a username and a password. You will need the username and password to login to the admin portal later.
```bash
python3 manage.py createsuperuser
```
The sample app creates an admin login as shown in the picture below.
 

<figure data-zoomable align='center'>
    <img src="/img/blog/2022/01/django_app_login.webp" alt=""/>
    <figcaption><i>You will need the username and password to log into the admin panel</i></figcaption>
</figure>

<br></br>

**Step 5. Configure environment variables to run app and send data to SigNoz**<br></br>
Finally you can run your Django app with OpenTelemetry and send data to SigNoz for monitoring. You can do that in three ways and you can choose what’s more suited to you.

a. **To run with gunicorn you need to add post_fork hook**<br></br>
To run the sample app with Gunicorn, we have added a file named `gunicorn.config.py`. In this step, you just need to configure a few environment variables for your OTLP exporters. Environment variables that need to be configured:
- `service.name`application service name (you can name it as you like)
- `OTEL_EXPORTER_OTLP_ENDPOINT` - In this case, IP of the machine where SigNoz is installed
- `DJANGO_SETTINGS_MODULE`

:::note
Don’t run app in reloader/hot-reload mode as it breaks instrumentation. For example, you can disable the auto reload with `--noreload`.
:::

```bash
DJANGO_SETTINGS_MODULE=<DJANGO_APP>.settings  OTEL_RESOURCE_ATTRIBUTES=service.name=<serviceName> OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP OF SigNoz>:4317"
OTEL_EXPORTER_OTLP_PROTOCOL=grpc opentelemetry-instrument gunicorn <DJANGO_APP>.wsgi -c gunicorn.config.py --workers 2 --threads 2 --reload
```
As we are running SigNoz on local host, `IP of SigNoz` can be replaced with `localhost` in this case. And, for `service_name `let's use `DjangoApp`. DJANGO_SETTINGS_MODULE for this example is mysite.settings. Hence, the final command becomes:
```bash
DJANGO_SETTINGS_MODULE=mysite.settings  OTEL_RESOURCE_ATTRIBUTES=service.name=DjangoApp OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
OTEL_EXPORTER_OTLP_PROTOCOL=grpc opentelemetry-instrument gunicorn mysite.wsgi -c gunicorn.config.py --workers 2 --threads 2 --reload
```

`IP of SigNoz backend` is the IP of the machine where you installed SigNoz. If you have installed SigNoz on `localhost`, the endpoint will be `http://localhost:4317` for gRPC exporter and `http://localhost:4318` for HTTP exporter.

:::note
The port numbers are 4317 and 4318 for the gRPC and HTTP exporters respectively. Remember to allow incoming requests to port **4317**/**4318** of machine where SigNoz backend is hosted.
:::

And, congratulations! You have enabled OpenTelemetry to capture telemetry data from your Django application. And, you are sending the captured data to SigNoz.

You can check if your app by opening the admin panel at [http://localhost:8000/admin](http://localhost:8000/admin).

If you have installed SigNoz on your local host, then you can access the SigNoz dashboard at [http://localhost:3301](http://localhost:3301/) to monitor your Django app for performance metrics.

You need to generate some load on your app so that there is data to be captured by OpenTelemetry. Try adding a few questions in the polls app and play around.


 <figure data-zoomable align='center'>
      <img src="/img/blog/2022/01/django_app_signoz.webp" alt=""/>
      <figcaption><i>You will find Django application in the list of applications monitored on SigNoz dashboard. The other applications are from a sample app that comes loaded with SigNoz</i></figcaption>
 </figure>

 <br></br>


There are two other ways to run the Django app with OpenTelemetry using Docker and Docker compose.

b. **If want to run docker image of django app directly**<br></br>
```bash
docker run --env \
    --env OTEL_SERVICE_NAME=djangoApp \
    --env OTEL_EXPORTER_OTLP_ENDPOINT=http://<IP of SigNoz>:4317 \
    --env OTEL_EXPORTER_OTLP_PROTOCOL=grpc \
    --env DJANGO_SETTINGS_MODULE=mysite.settings \
    -p 8000:8000 \
    -t signoz/sample-django:latest1 opentelemetry-instrument gunicorn mysite.wsgi -c gunicorn.config.py --workers 2 --threads 2 --reload --bind 0.0.0.0:8000
```

c. **If want to use docker image of django app in docker compose**<br></br>
```bash
django-app:
    image: "signoz/sample-django:latest"
    container_name: sample-django
    command: opentelemetry-instrument gunicorn mysite.wsgi -c gunicorn.config.py --workers 2 --threads 2 --reload --bind 0.0.0.0:8000
    ports:
      - "8000:8000"
    environment:
    - OTEL_SERVICE_NAME=djangoApp
    - OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317
    - OTEL_EXPORTER_OTLP_PROTOCOL=grpc
    - DJANGO_SETTINGS_MODULE=mysite.settings
```

1. **Browsing the app and checking data with SigNoz**<br></br>
   a. Visit [http://localhost:8000/admin](http://localhost:8000/admin) and create a question for poll<br></br>
   b. Then visit the list of polls at [http://localhost:8000/polls/](http://localhost:8000/polls/) and explore the polls<br></br>
   c. The data should be visible now in SigNoz at `http://<IP of SigNoz>:3301`<br></br>


### Open-source tool to visualize telemetry data
SigNoz makes it easy to visualize metrics and traces captured through OpenTelemetry instrumentation.

SigNoz comes with out of box RED metrics charts and visualization. RED metrics stands for:

- Rate of requests
- Error rate of requests
- Duration taken by requests


<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_charts_application_metrics.webp" alt=""/>
    <figcaption><i>Measure things like application latency, requests per sec, error percentage and see your top endpoints with SigNoz</i></figcaption>
</figure>

<br></br>

You can then choose a particular timestamp where latency is high to drill down to traces around that timestamp.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_list_of_traces_hc.webp" alt=""/>
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

SigNoz also provides Log management. The logs tab in SigNoz has advanced features like a log query builder, search across multiple fields, structured table view, JSON view, etc.

<figure data-zoomable align='center'>
    <img src="/img/blog/common/signoz_logs.webp" alt="Log management in SigNoz"/>
    <figcaption><i>Log management in SigNoz</i></figcaption>
</figure>

<br></br>


## Conclusion
OpenTelemetry makes it very convenient to instrument your Django application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇
[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="fmDLpaF1xFc" mute={false} />

<p>&nbsp;</p>


If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.webp)](https://signoz.io/slack)

---

If you want to read more about SigNoz 👇

[Golang Aplication Monitoring with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/go/)

[OpenTelemetry collector - complete guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)





