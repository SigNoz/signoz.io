Download the [otelcol-daemon.yaml](https://github.com/SigNoz/benchmark/blob/main/ecs/otelcol-daemon.yaml):

```bash
wget https://github.com/SigNoz/benchmark/raw/main/ecs/otelcol-daemon.yaml
```

Update `{region}` and `SIGNOZ_INGESTION_KEY` with the proper values in the config
as stated in the *Notes* section below.

Now, copy the content of the `otelcol-daemon.yaml` file and paste it in the
value field of the parameter.

***Notes:***

- Depending on the choice of your region for SigNoz cloud, the OTLP endpoint
  will vary according to this table.

  | Region	| Endpoint |
  | --- | --- |
  | US | ingest.us.signoz.cloud:443 |
  | IN | ingest.in.signoz.cloud:443 |
  | EU | ingest.eu.signoz.cloud:443 |
- Replace `SIGNOZ_INGESTION_KEY` with the ingestion key of your SigNoz Cloud account
- You can find the **Ingestion Key** and **Region** in the SigNoz Cloud invitation email as well as the **Settings Tab** of your SigNoz Cloud UI.
- After successful set up, feel free to remove `logging` exporter if it gets too noisy.