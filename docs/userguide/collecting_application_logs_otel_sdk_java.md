---
title: Collecting Application Logs Using OTEL Java Agent
id: collecting_application_logs_otel_sdk_java
---

# Collecting Application Logs Using OTEL Java Agent

You can directly send your application logs to SigNoz using [Java Agent provided by OpenTelemetry](https://signoz.io/docs/instrumentation/java/).
In this doc we will run a sample java application with the OpenTelemetry Java agent to send logs to SigNoz.


For collecting logs we will have to download the java agent from [here](https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar).


To sends logs from a Java application you will have to add the agent and add the environment variables for the agent.

## For Sending Logs To SigNoz Cloud

```bash
OTEL_LOGS_EXPORTER=otlp OTEL_EXPORTER_OTLP_ENDPOINT="https://ingest.{region}.signoz.cloud:443" OTEL_EXPORTER_OTLP_HEADERS=signoz-access-token=<SIGNOZ_INGESTION_KEY> OTEL_RESOURCE_ATTRIBUTES=service.name=<app_name> java -javaagent:/path/opentelemetry-javaagent.jar -jar  <myapp>.jar
```

 You will have to add `<SIGNOZ_INGESTION_KEY>` and depending on the choice of your region for SigNoz cloud, the otlp endpoint will vary according to this table.

  | Region | Endpoint                   |
  | ------ | -------------------------- |
  | US     | ingest.us.signoz.cloud:443 |
  | IN     | ingest.in.signoz.cloud:443 |
  | EU     | ingest.eu.signoz.cloud:443 |

## For Sending Logs To SigNoz Hosted Locally
```bash
OTEL_LOGS_EXPORTER=otlp OTEL_EXPORTER_OTLP_ENDPOINT="http://<IP of SigNoz Backend>:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=<app_name> java -javaagent:/path/opentelemetry-javaagent.jar -jar  <myapp>.jar
```

<br></br>

In the below example we will configure a java application to send logs to SigNoz.

## How to Collect Application Logs Using OTEL Java Agent?

* Clone this [repository](https://github.com/SigNoz/spring-petclinic)
* Build the application using `./mvnw package`
* Now run the application

  **For SigNoz Cloud**
  ```
  OTEL_LOGS_EXPORTER=otlp OTEL_EXPORTER_OTLP_ENDPOINT="https://ingest.{region}.signoz.cloud:443" OTEL_EXPORTER_OTLP_HEADERS=signoz-access-token=<SIGNOZ_INGESTION_KEY> OTEL_RESOURCE_ATTRIBUTES=service.name=myapp java -javaagent:/path/opentelemetry-javaagent.jar -jar target/*.jar
  ```
  
  You will have to replace the value of `{region}` according to region of your cloud account and also add `<SIGNOZ_INGESTION_KEY>`

  **For SigNoz Hosted Locally**
  ```
  OTEL_LOGS_EXPORTER=otlp OTEL_EXPORTER_OTLP_ENDPOINT="http://<host>:4317" OTEL_RESOURCE_ATTRIBUTES=service.name=myapp java -javaagent:/path/opentelemetry-javaagent.jar -jar target/*.jar
  ```

  You will have to replace your the value of `host` as  `0.0.0.0` if SigNoz is running in the same host, for other configurations please check the 
 [troubleshooting](../install/troubleshooting.md#signoz-otel-collector-address-grid) guide.

* Now if the application starts successfully the logs will be visible on SigNoz UI.
