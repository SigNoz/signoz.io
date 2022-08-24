---
id: python
title: Python OpenTelemetry Instrumentation
description: Send events from your Python application to SigNoz

---

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import InstrumentationFAQ from '../shared/instrumentation-faq.md'


<p align="center">

[![Book meeting](/img/docs/ZoomCTA1.png)](https://calendly.com/pranay-signoz/instrumentation-office-hrs)

</p>


Get up and running with OpenTelemetry in just a few quick steps! 

The setup process consists of two phases:
- Getting OpenTelemetry installed and configured
- Validating that configuration to ensure that data is being sent as expected. 

This guide explains how to download, install, and run OpenTelemetry in Python.

### Requirements

- Python 3.6 or newer
- An app to add OpenTelemetry to

We follow [OpenTelemetry python instrumentation library](https://github.com/open-telemetry/opentelemetry-python). **We shall be exporting data in OTLP protocol.**

Start by creating a separate virtual environment.

```
python3 -m venv instrumentation_env
source instrumentation_env/bin/activate
```

#### Install

```bash
pip install opentelemetry-distro
pip install opentelemetry-exporter-otlp
```

:::note
The `opentelemetry-exporter-otlp` is a convenient way to install all supported OpenTelemetry exporters. Currently it installs:
- opentelemetry-exporter-otlp-proto-http
- opentelemetry-exporter-otlp-proto-grpc

We recommend using the http exporter for sending data to SigNoz.
:::

The below command inspects the Python dependencies of your application and installs the instrumentation packages relevant for your Python application.

```bash
opentelemetry-bootstrap --action=install
```


<p>&nbsp;</p>

#### Run Command

<!-- <Tabs
  defaultValue="self-hosted"
  groupId="hosting-options"
  values={[
    { label: "Self Hosted", value: "self-hosted" },
    { label: "Cloud", value: "cloud" },
  ]}
>
<TabItem value="self-hosted"> -->

In the final run command, you can configure environment variables and flags. Flags for exporters:
- HTTP: `otlp_proto_http`
- gRPC: `otlp_proto_grpc`

We recommend using the `otlp_proto_http` exporter.

To start sending data to SigNoz, use the following run command:

```bash
OTEL_RESOURCE_ATTRIBUTES=service.name=<service_name> OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz Backend>:4318"  opentelemetry-instrument --traces_exporter otlp_proto_http <your run command>
```

_<service_name>_ is the name of service you want

_<your_run_command>_ can be `python3 app.py` or `flask run`


:::note

- The port numbers are 4317 and 4318 for the gRPC and HTTP exporters respectively.
- Remember to allow incoming requests to port **4317**/**4318** of machine where SigNoz backend is hosted

:::

<!-- </TabItem> -->
<!-- <TabItem value="cloud">

```bash
OTEL_RESOURCE_ATTRIBUTES=service.name=<service_name> OTEL_EXPORTER_OTLP_ENDPOINT="ingest.signoz.io:443" OTEL_EXPORTER_OTLP_HEADERS="signoz-access-token=<access_token>" opentelemetry-instrument <your_run_command>
```

_<service_name>_ is the name of service you want

_<your_run_command>_ can be `python3 app.py` or `flask run`

_<access_token>_ can be found in your settings page as shown in below image

![access_token_settings_page](../../static/img/access_token_settings_page.png)

:::caution

- If _opentelemetry-instrument_ command is not found then use full path of executable. In ubuntu it is at _/home/ubuntu/.local/bin/opentelemetry-instrument_

:::

</TabItem>

</Tabs> -->

<p>&nbsp;</p>

### Instrumenting a sample Flask application

We have included a sample flask application with `README.md` at https://github.com/SigNoz/sample-flask-app.

Feel free to use this repo to test out OpenTelemetry instrumentation and how to send telemetry data to SigNoz.

<p>&nbsp;</p>

### Instrumenting Django Applications

For instrumenting Django applications, the instructions are same as for a Flask app as mentioned above. 

Though for Django, you must define `DJANGO_SETTINGS_MODULE` correctly. If your project is called `mysite`, something like following should work

```
export DJANGO_SETTINGS_MODULE=mysite.settings
```

Please refer the official [Django docs](https://docs.djangoproject.com/en/1.10/topics/settings/#designating-the-settings) for more details.

You can also read this [blog](https://signoz.io/blog/opentelemetry-django/) to see how OpenTelemetry is implemented in a Django application.

<p>&nbsp;</p>

### Running applications with Gunicorn, uWSGI

For application servers which are based on pre fork model like Gunicorn, uWSGI you have to add a `post_fork` hook or a `@postfork` decorator in your configuration.

Check this [documentation](https://opentelemetry-python.readthedocs.io/en/latest/examples/fork-process-model/README.html) from OpenTelemetry on how to set it up.

[Here's](https://github.com/SigNoz/opentelemetry-python/tree/main/docs/examples/fork-process-model) a working example where we have configured a gunicorn server with `post_fork` hook.
  
<p>&nbsp;</p>

:::note

`psycopg2-binary` is not supported by opentelemetry auto instrumentation libraries as it is not recommended for production use. Please use `psycopg2` to see DB calls also in your trace data in SigNoz

:::


### Troubleshooting your installation

#### Spans are not being reported

If spans are not being reported to SigNoz, try enabling debug exporter which writes the json formatted trace data to console.

`opentelemetry-instrument --traces_exporter otlp_proto_http,console <your run command>`:

```json
{
    "name": "alice",
    "context": {
        "trace_id": "0xedb7caf0c8b082a9578460a201759193",
        "span_id": "0x57cf7eee198e1fed",
        "trace_state": "[]"
    },
    "kind": "SpanKind.INTERNAL",
    "parent_id": null,
    "start_time": "2022-03-27T14:55:18.804758Z",
    "end_time": "2022-03-27T14:55:18.804805Z",
    "status": {
        "status_code": "UNSET"
    },
    "attributes": {},
    "events": [],
    "links": [],
    "resource": {
        "telemetry.sdk.language": "python",
        "telemetry.sdk.name": "opentelemetry",
        "telemetry.sdk.version": "1.10.0",
        "service.name": "my-service"
    }
}
```

<p>&nbsp;</p>

#### If DB Calls are not reported in spans

Ensure you have the correct opentelemetry instrumentations:

- [opentelemetry-instrumentation-psycopg2](https://pypi.org/project/opentelemetry-instrumentation-psycopg2/) for Postgres
- [opentelemetry-instrumentation-pymysql](https://pypi.org/project/opentelemetry-instrumentation-pymysql/) for MySQL
- [opentelemetry-instrumentation-sqlite3](https://pypi.org/project/opentelemetry-instrumentation-sqlite3/) for SQLite3
- Complete list [here](https://github.com/open-telemetry/opentelemetry-python-contrib/tree/main/instrumentation)


<InstrumentationFAQ />