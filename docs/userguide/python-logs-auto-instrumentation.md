---
title: Python Logs Auto-Instrumentation
id: python-logs-auto-instrumentation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Collecting Python Application Logs Using Auto-Instrumentation

If you are using python auto-instrumentation for instrumenting your python application you can send logs to SigNoz easily with auto-instrumentation.

To enable logs auto-instrumentation just add this environment variable 

```bash
OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true
```

# Example application 
Here is a sample python application

1. Create a file named main.py and paste the following code
```python
from flask import Flask
import logging

app = Flask(__name__)

@app.route('/')
def hello_world():
    logging.warning("hello world log message")
    return 'Hello World'

if __name__ == '__main__':
    app.run()
```

2. Create a virual environment
```bash
python -m venv venv
source ./venv/bin/activate
```
3. Install dependencies
  
```bash
pip install opentelemetry-distro
pip install flask requests
pip install opentelemetry-exporter-otlp
```
4. Run the opentelemetry-bootstrap command:
```bash
opentelemetry-bootstrap -a install
```

4. Run the application
```bash
OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true opentelemetry-instrument --traces_exporter none --metrics_exporter none --logs_exporter console python main.py
```
You will be able to see the otel logs on the console once you visit `http://localhost:5000`

If you want to send data to SigNoz cloud or self host SigNoz the run command will change and will be described in the next steps


<Tabs>
<TabItem value="cloud" label="SigNoz Cloud" default>

For SigNoz Cloud the run command will be
```bash
OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true \
OTEL_EXPORTER_OTLP_ENDPOINT=<SIGNOZ_ENDPOINT> \
OTEL_EXPORTER_OTLP_HEADERS=signoz-access-token=<INGESTION_KEY> \
opentelemetry-instrument --traces_exporter otlp --metrics_exporter otlp --logs_exporter otlp python main.py
```
* The value of `SIGNOZ_ENDPOINT` will be `https://ingest.{region}.signoz.cloud:443` where depending on the choice of your region for SigNoz cloud, the otlp endpoint will vary according to this table.
  
  | Region | Endpoint                   |
  | ------ | -------------------------- |
  | US     | ingest.us.signoz.cloud:443 |
  | IN     | ingest.in.signoz.cloud:443 |
  | EU     | ingest.eu.signoz.cloud:443 |

* The value of `INGESTION_KEY`  is your ingestion key

</TabItem>

<TabItem value="self-host" label="Self-Host">

For SigNoz Cloud the run command will be
```bash
OTEL_PYTHON_LOGGING_AUTO_INSTRUMENTATION_ENABLED=true \
OTEL_EXPORTER_OTLP_ENDPOINT=<OTLP_ENDPOINT> \
opentelemetry-instrument --traces_exporter otlp --metrics_exporter otlp --logs_exporter otlp python main.py
```
* The value of `OTLP_ENDPOINT` will be you otlp receiver endpoint
* You might need to add `OTEL_EXPORTER_OTLP_INSECURE=true` if your endpoint is not secured.

</TabItem>
</Tabs>