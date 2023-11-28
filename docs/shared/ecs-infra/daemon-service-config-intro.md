### Step 2: Create SigNoz OtelCollector Config

![OtelCol Config in Parameter Store](/img/docs/ecs-docs/ecs-otelcol-config-ssm.webp)

Go to AWS Parameter Store and create a new parameter with the name `/ecs/signoz/otelcol-daemon.yaml`.

Download the [otelcol-daemon.yaml](https://github.com/SigNoz/benchmark/blob/main/ecs/ec2/otelcol-daemon.yaml):

```bash
wget https://github.com/SigNoz/benchmark/raw/main/ecs/ec2/otelcol-daemon.yaml
```

Update `{region}` and `SIGNOZ_INGESTION_KEY` with the proper values in the config
as stated in the *Notes* section below.

Now, copy the content of the `otelcol-daemon.yaml` file and paste it in the
value field of the parameter.