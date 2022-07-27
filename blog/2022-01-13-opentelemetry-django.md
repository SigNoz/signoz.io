---
title: Monitoring Django application performance with OpenTelemetry
slug: opentelemetry-django
date: 2022-01-13
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

import Screenshot from "@theme/Screenshot"

<Screenshot
   alt="Admin access UI for the sample Django application used for monitoring Django application with OpenTelemetry"
   height={500}
   src="/img/blog/2022/01/django_app_admin_panel.webp"
   title="Admin site of the sample Django application"
   width={700}
/>

### Running Django application with OpenTelemetry
First, you need to install SigNoz. Data collected by OpenTelemetry will be sent to SigNoz for storage and visualization.

You can get started with SigNoz using just three commands at your terminal.

``` jsx
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```

The above instruction is for MacOS and linux distributions. For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/deployment/docker/?utm_source=blog&utm_medium=opentelemetry_django)

If you have installed SigNoz on your local host, you can access the UI at: [http://localhost:3301](http://localhost:3301/application)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

<Screenshot
   alt="SigNoz dashboard showing application list"
   height={500}
   src="/img/blog/2021/08/signoz_dashboard_hc.webp"
   title="SigNoz Dashboard"
   width={700}
/>

### Instrumenting a sample Django application with OpenTelemetry
**Prerequisites**
Python 3.8 or newer
Download the <a href = "https://www.python.org/downloads/" rel="noopener noreferrer nofollow" target="_blank" >latest version</a> of Python.

1. **Running sample Django app**<br></br>
   We will be using the Django app at this [Github repo](https://github.com/SigNoz/sample-django). All the required OpenTelemetry and Python packages are contained within the `requirements.txt` file.
   ```jsx
   git clone https://github.com/SigNoz/sample-django.git
   cd sample-django
   ```
2. **Installing necessary OpenTelemetry and Python packages**<br></br>
   The `requirements.txt` file contains all the necessary OpenTelemetry and Python packages needed for instrumentation. In order to install those packages, run the following command:
   ```jsx
   pip3 install -r requirements.txt
   ```
   Here’s a snapshot of packages in the requirements.txt file to run the Django application with OpenTelemetry.

   <br></br><div align="center">
   <img src="/img/blog/2022/01/django_packages.webp"
       height = "380" width = "480"
       alt = "Packages required for the sample Django application"/>
   </div>

3. **Install application-specific packages**<br></br>
   This step is required to install packages specific to the application. This command figures out which instrumentation packages the user might want to install and installs it for them:
   ```jsx
   opentelemetry-bootstrap --action=install
   ```
4. **Prepare your Django app**<br></br>
   Now you need to run the following three commands to prepare the sample Django application.<br></br>

   a. This command is used to perform the initial database migration. You will only need to run this the very first time you deploy your app.
   ```jsx
   python3 manage.py migrate
   ```

   b. This command is used to collect static files from multiple apps into a single path.
   ```jsx
   python3 manage.py collectstatic
   ```
   
   c. The following command creates a user who can log in to the admin site. You will be asked to create a username and a password. You will need the username and password to login to the admin portal later.
   ```jsx
   python3 manage.py createsuperuser
   ```
   The sample app creates an admin login as shown in the picture below.
   <Screenshot
   alt="Django app login UI"
   height={500}
   src="/img/blog/2022/01/django_app_login.webp"
   title="You will need the username and password to log into the admin panel"
   width={700}
   />

5. **Configure environment variables to run app and send data to SigNoz**<br></br>
   Finally you can run your Django app with OpenTelemetry and send data to SigNoz for monitoring. You can do that in three ways and you can choose what’s more suited to you.

   a. **To run with gunicorn you need to add post_fork hook**<br></br>
      To run the sample app with Gunicorn, we have added a file named `gunicorn.config.py`. In this step, you just need to configure a few environment variables for your OTLP exporters. Environment variables that need to be configured:
      - `service.name`application service name (you can name it as you like)
      - `OTEL_EXPORTER_OTLP_ENDPOINT` - In this case, IP of the machine where SigNoz is installed
      - `DJANGO_SETTINGS_MODULE`

      :::note
      Don’t run app in reloader/hot-reload mode as it breaks instrumentation.
      :::

      ```jsx
      DJANGO_SETTINGS_MODULE=<DJANGO_APP>.settings  OTEL_RESOURCE_ATTRIBUTES=service.name=<serviceName> OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP OF SigNoz>:4317" opentelemetry-instrument gunicorn <DJANGO_APP>.wsgi -c gunicorn.config.py --workers 2 --threads 2 --reload
      ```
      As we are running SigNoz on local host, `IP of SigNoz` can be replaced with `localhost` in this case. And, for `service_name `let's use `DjangoApp`. DJANGO_SETTINGS_MODULE for this example is mysite.settings. Hence, the final command becomes:
      ```jsx
      DJANGO_SETTINGS_MODULE=mysite.settings  OTEL_RESOURCE_ATTRIBUTES=service.name=DjangoApp OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317" opentelemetry-instrument gunicorn mysite.wsgi -c gunicorn.config.py --workers 2 --threads 2 --reload
      ```
      And, congratulations! You have enabled OpenTelemetry to capture telemetry data from your Django application. And, you are sending the captured data to SigNoz.
      
      You can check if your app by opening the admin panel at [http://localhost:8000/admin](http://localhost:8000/admin).
      
      If you have installed SigNoz on your local host, then you can access the SigNoz dashboard at [http://localhost:3301](http://localhost:3301/) to monitor your Django app for performance metrics.
      
      You need to generate some load on your app so that there is data to be captured by OpenTelemetry. Try adding a few questions in the polls app and play around.

      <Screenshot
        alt="SigNoz dashboard showing application list with Django app being monitored"
        height={500}
        src="/img/blog/2022/01/django_app_signoz.webp"
        title="You will find Django application in the list of applications monitored on SigNoz dashboard. The other applications are from a sample app that comes loaded with SigNoz."
        width={700}
      />


There are two other ways to run the Django app with OpenTelemetry using Docker and Docker compose.

b. **If want to run docker image of django app directly**<br></br>
```jsx
docker run --env OTEL_METRICS_EXPORTER=none \
    --env OTEL_SERVICE_NAME=djangoApp \
    --env OTEL_EXPORTER_OTLP_ENDPOINT=http://<IP of SigNoz>:4317 \
    --env DJANGO_SETTINGS_MODULE=mysite.settings \
    -p 8000:8000 \
    -t signoz/sample-django:latest1 opentelemetry-instrument gunicorn mysite.wsgi -c gunicorn.config.py --workers 2 --threads 2 --reload --bind 0.0.0.0:8000
```

c. **If want to use docker image of django app in docker-compose**<br></br>
```jsx
django-app:
    image: "signoz/sample-django:latest"
    container_name: sample-django
    command: opentelemetry-instrument gunicorn mysite.wsgi -c gunicorn.config.py --workers 2 --threads 2 --reload --bind 0.0.0.0:8000
    ports:
      - "8000:8000"
    environment:
    - OTEL_METRICS_EXPORTER=none
    - OTEL_SERVICE_NAME=djangoApp
    - OTEL_EXPORTER_OTLP_ENDPOINT=http://otel-collector:4317
    - DJANGO_SETTINGS_MODULE=mysite.settings
```

6. **Browsing the app and checking data with SigNoz**<br></br>
   a. Visit [http://localhost:8000/admin](http://localhost:8000/admin) and create a question for poll<br></br>
   b. Then visit the list of polls at [http://localhost:8000/polls/](http://localhost:8000/polls/) and explore the polls<br></br>
   c. The data should be visible now in SigNoz at `http://<IP of SigNoz>:3301`<br></br>


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
OpenTelemetry makes it very convenient to instrument your Django application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇
[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="fmDLpaF1xFc" mute={false} />

<p>&nbsp;</p>


If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://signoz.io/slack)

---

If you want to read more about SigNoz 👇

[Golang Aplication Monitoring with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/go/)

[OpenTelemetry collector - complete guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)





