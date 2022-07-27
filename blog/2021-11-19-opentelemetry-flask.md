---
title: Monitoring your Flask application using OpenTelemetry
slug: opentelemetry-flask
date: 2021-11-19
tags: [OpenTelemetry Instrumentation, Python]
authors: ankit_anand
description: OpenTelemetry is a vendor-agnostic isntrumentation library. In this article, learn how to set up monitoring for a Flask application using OpenTelemetry.
image: /img/blog/2021/11/monitor_flask_cover.webp
hide_table_of_contents: true
keywords:
  - opentelemetry
  - opentelemetry python
  - opentelemetry flask
  - distributed tracing
  - observability
  - flask monitoring
  - flask instrumentation
  - signoz
---

import { LiteYoutubeEmbed } from "react-lite-yt-embed";

<head>
  <link rel="canonical" href="https://signoz.io/blog/opentelemetry-flask/"/>
</head>

In this article, we will use OpenTelemetry to instrument a sample Flask app. Flask is one of the most popular web application frameworks of Python. It consists of Werkzeug WSGI toolkit and Jinja2 template engine.

<!--truncate-->

![Cover Image](/img/blog/2021/11/monitor_flask_cover.webp)

Instrumentation is one of the biggest challenge engineering teams face when starting out with observability. Instrumenting a distributed application architecture is not easy. Applications now have distributed services as well as distributed teams that might be using multiple programming languages and numerous frameworks and libraries.

<a href = "https://opentelemetry.io/" rel="noopener noreferrer nofollow" target="_blank" >OpenTelemetry</a> is the leading open-source standard that is solving the problem of instrumentation. It is currently an incubating project under the <a href = "https://www.cncf.io/" rel="noopener noreferrer nofollow" target="_blank" >Cloud Native Computing Foundation</a>.

It is a set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(Logs, metrics, and traces). It aims to make telemetry data(logs, metrics, and traces) a built-in feature of cloud-native software applications.

### Why use OpenTelemetry?

As might be clear by now that OpenTelemetry helps you to generate telemetry data. You still need a backend to analyze, store and visualize that data. By design, OpenTelemetry is vendor-agnostic. And that's one of the biggest advantages of using OpenTelemetry. It can export data in multiple formats which you can send to a backend of your choice.

In this article, we will use [SigNoz](https://signoz.io/) as a backend. SigNoz is an open-source APM that can be used for both metrics and distributed tracing.

Let's get started and see how to use OpenTelemetry for a Flask application.

## Running a Flask application with OpenTelemetry

OpenTelemetry is a set of tools, APIs, and SDKs used to instrument applications to create and manage telemetry data(logs, metrics, and traces).

### Installing SigNoz

You can get started with SigNoz using just three commands at your terminal.

```jsx
git clone -b main https://github.com/SigNoz/signoz.git
cd signoz/deploy/
./install.sh
```
<br></br>

For detailed instructions, you can visit our documentation.

[![Deployment Docs](/img/blog/common/deploy_docker_documentation.webp)](https://signoz.io/docs/install/docker/?utm_source=blog&utm_medium=opentelemetry_flask)

When you are done installing SigNoz, you can access the UI at: [http://localhost:3301](http://localhost:3301/application)

The application list shown in the dashboard is from a sample app called HOT R.O.D that comes bundled with the SigNoz installation package.

import Screenshot from "@theme/Screenshot"

<Screenshot
   alt="SigNoz dashboard showing application list"
   height={500}
   src="/img/blog/2021/08/signoz_dashboard_hc.webp"
   title="SigNoz Dashboard"
   width={700}
/>

### Getting a sample Flask application

**Prerequisites**
1. Python 3.4 or newer<br></br>
   Download the <a href = "https://www.python.org/downloads/" rel="noopener noreferrer nofollow" target="_blank" >latest version</a> of Python.
    
2. MongoDB<br></br>
   Below are the download links for different OS:<br></br>
   <a href = "https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/" rel="noopener noreferrer nofollow" target="_blank" >MacOS</a><br></br>
   <a href = "https://docs.mongodb.com/manual/administration/install-on-linux/" rel="noopener noreferrer nofollow" target="_blank" >Linux</a><br></br>
   <a href = "https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/" rel="noopener noreferrer nofollow" target="_blank" >Windows</a><br></br>
   <a href = "https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/" rel="noopener noreferrer nofollow" target="_blank" >Ubuntu</a><br></br>


**Running sample Flask app**<br></br>
We will be using the Flask app at this <a href = "https://github.com/SigNoz/sample-flask-app" rel="noopener noreferrer nofollow" target="_blank" >Github repo</a>.

1. Clone sample Flask app repository and go to the root folder<br></br>
   ```jsx
   git clone https://github.com/SigNoz/sample-flask-app.git
   cd sample-flask-app
   ```
2. Check if the app is running
   ```jsx
   python3 app.py
   ```
You can now access the UI of the app on your local host: http://localhost:5002/

<Screenshot
   alt="SigNoz dashboard showing application list"
   height={500}
   src="/img/blog/2021/11/sample_flask_app.webp"
   title="Sample flask application running on local host"
   width={700}
/>

To capture data with OpenTelemetry, you need to configure some environment variables and run the app with OpenTelemetry packages. Once you ensure your app is running, stop the app with `ctrl + c` on a mac. So let us see how to run the app with OpenTelemetry packages.

### Instrumenting the Flask application with OpenTelemetry
1. **Opentelemetry Python instrumentation installation**<br></br>
   The app folder contains a file called `requirements.txt`, which contains all the necessary requirements to set up OpenTelemetry Python instrumentation. Make sure your path is updated to the root directory of your sample app and run the following command:
   ```jsx
   pip3 install -r requirements.txt
   ```
   If it hangs while installing `grpcio` during **pip3 install opentelemetry-exporter-otlp** then follow below steps as suggested in <a href = "https://stackoverflow.com/questions/56357794/unable-to-install-grpcio-using-pip-install-grpcio/62500932#62500932" rel="noopener noreferrer nofollow" target="_blank" >this stackoverflow link</a>.

   - pip3 install --upgrade pip
   - python3 -m pip install --upgrade setuptools
   - pip3 install --no-cache-dir --force-reinstall -Iv grpcio

2. **Install application-specific packages**<br></br>
   This step is required to install packages specific to the application. Make sure to run this command in the root directory of your installed application. This command figures out which instrumentation packages the user might want to install and installs it for them:
   ```jsx
   opentelemetry-bootstrap --action=install
   ```

3. **Passing the necessary environment variables**<br></br>
   You're almost done. In the last step, you just need to configure a few environment variables for your OTLP exporters. Environment variables that need to be configured:

   - `service.name`- application service name (you can name it as you like)
   - `OTEL_EXPORTER_OTLP_ENDPOINT` - In this case, IP of the machine where SigNoz is installed

   You need to put these environment variables in the below command.

   :::note
   Don’t run app in reloader/hot-reload mode as it breaks instrumentation.
   :::

   ```jsx
   OTEL_RESOURCE_ATTRIBUTES=service.name=<service_name> OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz>:4317" opentelemetry-instrument python3 app.py
   ```

   As we are running SigNoz on local host, `IP of SigNoz` can be replaced with `localhost` in this case. And, for `service_name` let's use `Flask_App`. Hence, the final command becomes:<br></br>
   **Final Command**
   ```jsx
   OTEL_RESOURCE_ATTRIBUTES=service.name=Flask_App OTEL_METRICS_EXPORTER=none OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317" opentelemetry-instrument python3 app.py
   ```

   And congratulations! You have now instrumented your flask application with OpenTelemetry.

   Below you can find your `Flask_app` in the list of applications being monitored on SigNoz dashboard.

   <Screenshot
    alt="Flask app in the list of applications"
    height={500}
    src="/img/blog/2021/11/flask_app_list_signoz.webp"
    title="Flask app in the list of applications monitored by SigNoz"
    width={700}
   />

### Troubleshooting
The debug mode can break instrumentation from happening because it enables a reloader. To run instrumentation while the debug mode is enabled, set the use_reloader option to False:
```jsx
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002, debug=True, use_reloader=False)
```
If you face any problem in instrumenting with OpenTelemetry, refer to docs at https://signoz.io/docs/instrumentation/python


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
OpenTelemetry makes it very convenient to instrument your Flask application. You can then use an open-source APM tool like SigNoz to analyze the performance of your app. As SigNoz offers a full-stack observability tool, you don't have to use multiple tools for your monitoring needs.

You can try out SigNoz by visiting its GitHub repo 👇

[![SigNoz GitHub repo](/img/blog/common/signoz_github.webp)](https://github.com/SigNoz/signoz)

If you are someone who understands more from video, then you can watch the below video tutorial on the same with SigNoz.

<p>&nbsp;</p>

<LiteYoutubeEmbed id="_URJaj0dYz8" mute={false} />

<p>&nbsp;</p>


If you have any questions or need any help in setting things up, join our slack community and ping us in `#support` channel.

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://signoz.io/slack)

---

If you want to read more about SigNoz 👇

[Golang Aplication Monitoring with OpenTelemetry and SigNoz](https://signoz.io/opentelemetry/go/)

[OpenTelemetry collector - complete guide](https://signoz.io/blog/opentelemetry-collector-complete-guide/)



