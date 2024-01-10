### Step 3: Configure Daemon Service

To configure the daemon service, you need to run the commands below.

```bash
export CLUSTER_NAME=<YOUR-ECS-CLUSTER-NAME>
export REGION=<YOUR-ECS-REGION>
export COMMAND=--config=env:SIGNOZ_CONFIG_CONTENT
export SIGNOZ_CONFIG_PATH=/ecs/signoz/otelcol-daemon.yaml
```

:::info
Make sure you have `CLUSTER_NAME` and `REGION` environment variables set to
the proper values before running any `aws` commands.
:::

Now, you can run the following command to create the daemon service.

```bash
aws cloudformation create-stack --stack-name AOCECS-daemon-${CLUSTER_NAME}-${REGION} \
    --template-body file://daemon-template.yaml \
    --parameters ParameterKey=ClusterName,ParameterValue=${CLUSTER_NAME} \
    ParameterKey=CreateIAMRoles,ParameterValue=True \
		ParameterKey=command,ParameterValue=${COMMAND} \
		ParameterKey=SigNozConfigPath,ParameterValue=${SIGNOZ_CONFIG_PATH} \
    --capabilities CAPABILITY_NAMED_IAM \
    --region ${REGION}
```

### Step 4: Verify Daemon Service

To verify that the daemon service is running, you can run the following command.

```bash
aws ecs list-tasks --cluster ${CLUSTER_NAME} --region ${REGION}
```

You should see the task ARN of the daemon service in the output.

### Step 5: Verify Data in SigNoz

<div>
To verify that the data is being sent to SigNoz {props.name}, you can go to the
SigNoz dashboard page and import the dashboards below:
</div>
<br/>

- [instance-metrics.json](https://github.com/SigNoz/dashboards/raw/chore/ecs-dashboards/ecs-infra-metrics/instance-metrics.json)
- [hostmetrics-with-variable.json](https://github.com/SigNoz/dashboards/raw/main/hostmetrics/hostmetrics-with-variable.json)

You should see the metrics for your ECS cluster in the dashboard.

### (Optional) Step 6: Clean Up

To clean up the daemon service, you can run the following command.

```bash
aws cloudformation delete-stack --stack-name AOCECS-daemon-${CLUSTER_NAME}-${REGION} --region ${REGION}
```