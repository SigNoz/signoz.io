---
id: upgrade-0.19
title: Upgrade to 0.19
sidebar_label: Upgrade to 0.19
---

# Upgrade to v0.19 from earlier versions

SigNoz `v0.19` requires users to run migration script for alerts and dashboards.

If you had created any dashboards or alerts in previous versions,
you will need to run this script to sanitise the data.

## First Upgrade to v0.19

Follow the platform specific instructions to upgrade to 0.19 and above.

- [Docker Standalone](https://signoz.io/docs/operate/docker-standalone/#upgrade)
- [Docker Swarm](https://signoz.io/docs/operate/docker-swarm/#upgrade)
- [Kubernetes](https://signoz.io/docs/operate/kubernetes/#upgrade)

:::warning
After upgrading to 0.19, it is recommended to run the migration script
before modifying any existing alerts/dashboards. Otherwise, it could
potentially cause irreversible changes to alerts/dashboard data.
:::

## Steps to run migration script

### For Docker

`cd` to SigNoz repository and run following commands:

```bash
cd deploy/docker/clickhouse-setup

docker run -it -v $PWD/data/signoz/:/var/lib/signoz/ signoz/migrate:0.19
```

Output should be similar as below:

```
Data Source path:  signoz.db
2023/05/20 15:28:22 Total Dashboard found: 2
2023/05/20 15:28:22 625fa391-d9d3-47c1-809a-1a147eea229d
2023/05/20 15:28:22 b05af383-23ec-4061-8f57-0765d45ccd51
2023/05/20 15:28:22 Dashboard 625fa391-d9d3-47c1-809a-1a147eea229d updated
2023/05/20 15:28:22 Dashboard b05af383-23ec-4061-8f57-0765d45ccd51 updated
2023/05/20 15:28:22 Dashboards migrated
2023/05/20 15:28:22 Migrating 1 rules
2023/05/20 15:28:22 Migrating rule 1
2023/05/20 15:28:22 Migrated 1 rules
```

### For Docker Swarm

`cd` to SigNoz repository and run following commands:

```bash
cd deploy/swarm/clickhouse-setup

docker run -it -v $PWD/data/signoz/:/var/lib/signoz/ signoz/migrate:0.19
```

Output should be similar as below:

```
Data Source path:  signoz.db
2023/05/20 15:28:22 Total Dashboard found: 2
2023/05/20 15:28:22 625fa391-d9d3-47c1-809a-1a147eea229d
2023/05/20 15:28:22 b05af383-23ec-4061-8f57-0765d45ccd51
2023/05/20 15:28:22 Dashboard 625fa391-d9d3-47c1-809a-1a147eea229d updated
2023/05/20 15:28:22 Dashboard b05af383-23ec-4061-8f57-0765d45ccd51 updated
2023/05/20 15:28:22 Dashboards migrated
2023/05/20 15:28:22 Migrating 1 rules
2023/05/20 15:28:22 Migrating rule 1
2023/05/20 15:28:22 Migrated 1 rules
```

:::info
In case of multi node swarm cluster, run the above commands in the node where
query-service is running. To find out which node: `docker service ps query-service`.
:::

### For Kubernetes

To download `migrate` binary:

```bash
wget https://github.com/signoz/signoz-db-migrations/releases/download/v0.19/migrate-v0.19-linux-amd64 -O migrate

sudo chmod +x migrate
```

To copy the binary in persistent volume path `/var/lib/signoz` in `query-service`:

```bash
kubectl cp -n platform ./migrate my-release-signoz-query-service-0:/var/lib/signoz/migrate
```

To `exec` into the `query-service` container:

```bash
kubectl -n platform exec -it pod/my-release-signoz-query-service-0 -- sh
```

Now, change directory to the `/var/lib/signoz` and run the migration script:

```bash
cd /var/lib/signoz

./migrate
```

You should see output similar to this:

```
Data Source path:  signoz.db
2023/05/20 15:28:22 Total Dashboard found: 3
2023/05/20 15:28:22 625fa391-d9d3-47c1-809a-1a147eea229d
2023/05/20 15:28:22 b05af383-23ec-4061-8f57-0765d45ccd51
2023/05/20 15:28:22 e730bcd5-5319-4cab-8de7-82edd5f48c72
2023/05/20 15:28:22 Dashboard 625fa391-d9d3-47c1-809a-1a147eea229d updated
2023/05/20 15:28:22 Dashboard b05af383-23ec-4061-8f57-0765d45ccd51 updated
2023/05/20 15:28:22 Dashboard e730bcd5-5319-4cab-8de7-82edd5f48c72 updated
2023/05/20 15:28:22 Dashboards migrated
2023/05/20 15:28:22 Migrating 1 rules
2023/05/20 15:28:22 Migrating rule 1
2023/05/20 15:28:22 Migrated 1 rules
```

At last, clean up the binary and trigger a restart of the query-service pod:

```bash
rm migrate

kubectl -n platform delete pod my-release-signoz-query-service-0
```

## Command-Line Interface (CLI) Flags

There are is only one flag in the `migrate` binary:

- `--dataSource` : Data Source path. `default=signoz.db`
