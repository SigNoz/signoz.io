---
id: retention-period
title: Retention Period
---

To set retention period for metrics, traces and logs, you can navigate to the `General` tab on the `Settings` page.


<figure data-zoomable align='center'>
    <img src="/img/docs/retention_settings.webp" alt="Set Retention period of metrics traces"/>
</figure>

<br></br>

- You can select independent retention period for metrics, traces and logs.
- You can also set the duration after which the data will be moved to cold storage (S3) for both traces and metrics. This can be only set if Cold Storage (eg. S3) is enabled from the backend.
- Click `Save` to update the new retention periods..

### Configuring Cold Storage - Amazon S3

#### Docker

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

#### Kubernetes

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
