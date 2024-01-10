---
id: upgrade-0.38
title: Upgrade to 0.38
sidebar_label: Upgrade to 0.38
---

# Upgrade to v0.38 from earlier versions

In the pervious version of SigNoz `0.36` i.e. SigNoz chart version `0.32.0` , we have added support for dot(`.`) in attribute names.

This migration updates the dashboards and alerts to support the new format.

Please make sure that migration v0.36 is successful before running this.

## Steps to run migration script:

## First upgrade to v0.38

Follow the platform specific instructions to upgrade to 0.38 and above.

Note that the past exceptions/error data will not be visible on the new application until you run the migration script.

- [Docker Standalone](https://signoz.io/docs/operate/docker-standalone/#upgrade)
- [Docker Swarm](https://signoz.io/docs/operate/docker-swarm/#upgrade)
- [Kubernetes](https://signoz.io/docs/operate/kubernetes/#upgrade)


### For Docker

Change the directory to SigNoz repo and run following commands:

```bash
cd deploy/docker/clickhouse-setup
```

```bash
docker run --name signoz-migrate-sqlite --network clickhouse-setup_default -it \
  -v $PWD/data/signoz/:/var/lib/signoz/ signoz/migrate:0.38 \
  --data_source=/var/lib/signoz/signoz.db \
  --host=clickhouse \
  --port=9000
```

Steps to check logs:

```bash
docker logs -f signoz-migrate-sqlite
```

In case of failure and have to run again, make sure to cleanup the container before running the migration script again.

```bash
docker stop signoz-migrate-sqlite

docker rm docker stop signoz-migrate-sqlite
```


### For Kubernetes

```bash
RELEASE=my-release
ADMIN_PASSWORD=$(
  kubectl -n platform get clickhouseinstallations.clickhouse.altinity.com $RELEASE-clickhouse \
  -o jsonpath --template '{.spec.configuration.users.admin/password}'
)

kubectl -n platform run -i -t signoz-migrate --image=signoz/migrate:0.36 --restart='Never' \
  -- -host=$RELEASE-clickhouse -port=9000 -userName=admin -password=$ADMIN_PASSWORD
```

Steps to check logs:

```bash
kubectl -n platform logs -f signoz-migrate
```

In case of failure and have to run again, make sure to cleanup the pod before running the migration script again.

```bash
kubectl -n platform delete pod signoz-migrate
```


## In case of Upgrade Failure

Reach out to us at [Slack](https://signoz.io/slack).

## Command-Line Interface (CLI) Flags

There are some custom flags which can be enabled based on different use-cases.
All the flags below are `optional`.

Flags:

- `--port` : Specify port of clickhouse. `default=9000`
- `--host` : Specify host of clickhouse. `default=127.0.0.1`
- `--user` : Specify user name of clickhouse. `default=default`
- `--password` : Specify password of clickhouse. `default=""`
- `--data_source`: Data Source path of sqlite db. `default="db"`