Run otel-collector agent with the configuration

```bash
./otelcol-contrib --config ./config.yaml &> otelcol-output.log & echo "$\!" > otel-pid
```