
Download the [otelcol-sidecar-oss.yaml](https://github.com/SigNoz/benchmark/blob/main/ecs/otelcol-sidecar-oss.yaml):

```bash
wget https://github.com/SigNoz/benchmark/raw/main/ecs/otelcol-sidecar-oss.yaml
```

Update `<IP of machine hosting SigNoz>` with the proper values in the config
as stated in the *Notes* section below.

Now, copy the content of the `otelcol-sidecar-oss.yaml` file and paste it in the
value field of the parameter.

***Notes:***

- Replace `<IP of machine hosting SigNoz>` with the address to SigNoz OtelCollector.
- After successful set up, feel free to remove `logging` exporter if it gets too noisy.