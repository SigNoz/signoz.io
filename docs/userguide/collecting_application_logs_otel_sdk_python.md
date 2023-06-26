---
title: Collecting Application Logs Using OTEL Python SDK
id: collecting_application_logs_otel_sdk_python
---

# Collecting Application Logs Using OTEL Python SDK

You can directly send logs of your application to SigNoz using the Python SDKs provided by opentlemetry. Please find an example [here](https://github.com/open-telemetry/opentelemetry-python/tree/main/docs/examples/logs).



<!-- ## How to Collect Application Logs Using OTEL Python SDK?

* First we will install a few dependencies using PIP
  ```
  pip install opentelemetry-api
  pip install opentelemetry-sdk
  pip install opentelemetry-exporter-otlp
  ```

* We will use the example provided opentelemetry for exporting logs in python. [example](https://github.com/open-telemetry/opentelemetry-python/tree/main/docs/examples/logs)
  ```python
    import logging
    from opentelemetry import trace
    from opentelemetry.exporter.otlp.proto.grpc._log_exporter import (
        OTLPLogExporter,
    )
    from opentelemetry.sdk._logs import (
        LogEmitterProvider,
        LoggingHandler,
        set_log_emitter_provider,
    )
    from opentelemetry.sdk._logs.export import BatchLogProcessor
    from opentelemetry.sdk.resources import Resource
    from opentelemetry.sdk.trace import TracerProvider
    from opentelemetry.sdk.trace.export import (
        BatchSpanProcessor,
        ConsoleSpanExporter,
    )

    trace.set_tracer_provider(TracerProvider())
    trace.get_tracer_provider().add_span_processor(
        BatchSpanProcessor(ConsoleSpanExporter())
    )

    log_emitter_provider = LogEmitterProvider(
        resource=Resource.create(
            {
                "service.name": "shoppingcart",
                "service.instance.id": "instance-12",
            }
        ),
    )
    set_log_emitter_provider(log_emitter_provider)

    exporter = OTLPLogExporter(insecure=True)
    log_emitter_provider.add_log_processor(BatchLogProcessor(exporter))
    log_emitter = log_emitter_provider.get_log_emitter(__name__, "0.1")
    handler = LoggingHandler(level=logging.NOTSET, log_emitter=log_emitter)

    # Attach OTLP handler to root logger
    logging.getLogger().addHandler(handler)

    # Log directly
    logging.info("Jackdaws love my big sphinx of quartz.")

    # Create different namespaced loggers
    logger1 = logging.getLogger("myapp.area1")
    logger2 = logging.getLogger("myapp.area2")

    logger1.debug("Quick zephyrs blow, vexing daft Jim.")
    logger1.info("How quickly daft jumping zebras vex.")
    logger2.warning("Jail zesty vixen who grabbed pay from quack.")
    logger2.error("The five boxing wizards jump quickly.")

    # Trace context correlation
    tracer = trace.get_tracer(__name__)
    with tracer.start_as_current_span("foo"):
        # Do something
        logger2.error("Hyderabad, we have a major problem.")

    log_emitter_provider.shutdown()
  ```

* We will modify the `OTLPLogExporter` to 
  ```
  OTLPLogExporter(endpoint="0.0.0.0:4317")
  ```
  Here we are using `0.0.0.0` as our host since we are running this application in the same machine where SigNoz is running, for other configurations please check the 
 [troubleshooting](../install/troubleshooting.md#signoz-otel-collector-address-grid) guide.

* Now you can run your python script by running `python3 example.py`
* If there are no errors your logs will be visible on SigNoz UI.
   -->
