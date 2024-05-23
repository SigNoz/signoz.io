Once we are done with the above configurations, we can now run the collector service with the following command:

From the `otelcol-contrib`, run the following command:

```bash
./otelcol-contrib --config ./config.yaml
```

### Run in background 

If you want to run otel collector process in the background:

```bash
./otelcol-contrib --config ./config.yaml &> otelcol-output.log & echo "$\!" > otel-pid
```
The above command sends the output of the otel-collector to `otelcol-output.log` file and prints the process id of the background running otel collector process to the otel-pid file.