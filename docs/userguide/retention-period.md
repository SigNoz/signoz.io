---
id: retention-period
title: Retention Period
---

By default, retention period is set to 7 days for logs and traces, and 30 days for metrics. To set retention period for metrics, traces and logs, you can navigate to the `General` tab on the `Settings` page.


<figure data-zoomable align='center'>
    <img src="/img/docs/retention_settings.webp" alt="Set Retention period of metrics traces"/>
</figure>

<br></br>

- You can select independent retention period for metrics, traces and logs.
- You can also set the duration after which the data will be moved to cold storage (S3) for both traces and metrics. This can be only set if Cold Storage (eg. S3) is enabled from the backend.
- Click `Save` to update the new retention periods..

## Recommendations for setting retention period

Updating retention period can be very long running operation with large data. So, here are some recommendations:

1. It is recommended to set retention period early in the lifecycle of the platform.
2. It is recommended to update retention period when there is less traffic on the platform or increase resources for the clickhouse. This is because updating retention period when there's lot of data will require a lot of resources and can cause performance issues.
3. It is not recommended to change retention period frequently.

## Configuring Cold Storage - Amazon S3

### Docker

In case of docker, uncomment `storage_configuration` from `clickhouse-config.xml`. Also configure the endpoint, access key and secret.

```xml
<storage_configuration>
	<disks>
		<default>
		</default>
 	    <s3>
 	      <type>s3</type>
		  <endpoint>https://BUCKET-NAME-HERE.s3.amazonaws.com/data/</endpoint>
 	      <access_key_id>ACCESS-KEY-ID-HERE</access_key_id>
 	      <secret_access_key>SECRET-ACCESS-KEY-HERE</secret_access_key>
 	    </s3>
	</disks>
	<policies>
		<tiered>
    	<volumes>
    	  <default>
    	    <disk>default</disk>
    	  </default>
    	  <s3>
    	    <disk>s3</disk>
    	  </s3>
    	</volumes>
        </tiered>
	</policies>
</storage_configuration>
```

### Kubernetes

In case of helm charts, update the `clickhouse.coldStorage` in `values.yaml`.

```yaml
clickhouse:
  coldStorage:
    enabled: true
    # Set free space size on default disk
    defaultKeepFreeSpaceBytes: "10485760" # 10MiB
    endpoint: https://<bucket-name>.s3.amazonaws.com/data/
    accessKey: <access_key_id>
    secretAccess: <secret_access_key>
```

## Troubleshooting

1. SigNoz UI is loading slower than usual after updating retention period.

 This is because the retention period update is a long running operation when there's lot of data, it might require a lot of resources and can cause performance issues. So, it is recommended to update retention period when there is less traffic on the platform or increase resources for the clickhouse.

---

If you have any feedback or facing issues, feel free to join our slack community to get help!

[![SigNoz Slack community](/img/blog/common/join_slack_cta.png)](https://signoz.io/slack)
