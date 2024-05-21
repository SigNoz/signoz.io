Download the [otelcol-daemon-oss.yaml](https://github.com/SigNoz/benchmark/blob/main/ecs/otelcol-daemon-oss.yaml):

```bash
wget https://github.com/SigNoz/benchmark/raw/main/ecs/otelcol-daemon-oss.yaml
```

Update `{region}` and `SIGNOZ_INGESTION_KEY` with the proper values in the config
as stated in the *Notes* section below.

Now, copy the content of the `otelcol-daemon-oss.yaml` file and paste it in the
value field of the parameter.

***Notes:***

- Replace `<IP of machine hosting SigNoz>` with the address to SigNoz OtelCollector.
- After successful set up, feel free to remove `logging` exporter if it gets too noisy.