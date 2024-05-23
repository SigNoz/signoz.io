**Method 1: Updating entrypoint in task definition**

We need to obtain the endpoint or IP address of the instance on which the task
is running. We can do this by querying the metadata service of the instance.
For EC2, the metadata service is available at `169.254.169.254`.

The `entryPoint` will look like:

```
{
      ...,
      "entryPoint": [
        "sh",
        "-c",
        "export OTEL_EXPORTER_OTLP_ENDPOINT=\"http://$(curl http://169.254.169.254/latest/meta-data/local-ipv4):4317\"; <Application Startup Commands>"
      ],
			"command": [],
			...
}
```

- Replace `<Application Startup Commands>` with the commands to start your application.