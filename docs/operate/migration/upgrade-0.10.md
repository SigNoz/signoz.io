---
id: upgrade-0.10
title: Upgrade to 0.10
sidebar_label: Upgrade to 0.10
---

# Upgrade to 0.10 from earlier versions

v0.10 is a breaking release which requires data migration, if you are upgrading from an older version then you have to run the data migration scripts to be able to see past data.

## First upgrade to 0.10

Follow the platform specific instructions to upgrade to 0.10 and above.

Note that the past exceptions/error data will not be visible on the new application until you run the migration script.

- [Docker Standalone](https://signoz.io/docs/operate/docker-standalone/#upgrade)
- [Docker Swarm](https://signoz.io/docs/operate/docker-swarm/#upgrade)
- [Kubernetes](https://signoz.io/docs/operate/kubernetes/#upgrade)

## Steps to run migration script:

### Docker

```bash
docker run --name signoz-migrate --network clickhouse-setup_default \
  -it -d signoz/migrate:0.10 -host=clickhouse -port=9000
```

Steps to check logs:

```bash
docker logs -f signoz-migrate
```

In case of failure and have to run again, make sure to cleanup the container before running the migration script again.

```bash
docker stop signoz-migrate

docker rm signoz-migrate
```

### Docker Swarm

For Swarm, you could follow similar step to that of [Docker](#docker). However,
you would need to expose clickhouse container ports to host machine and use
host machine IP i.e. `172.17.0.17` for `-host` flag instead of `clickhouse`.

If you do not want to change anything in the current signoz deployment or to
expose clickhouse ports even temporarily, you can go through following steps.

1. To download `migration-v0.10` binary:

  ```bash
  wget https://github.com/SigNoz/signoz-db-migrations/releases/download/v0.10/migration-v0.10-linux-amd64

  chmod +x migration-v0.10-linux-amd64
  ```

2. To copy the binary in persistent volume path `/var/lib/clickhouse` in `clickhouse` container:

  ```bash
  docker cp migration-v0.10-linux-amd64 $(docker ps -q -f name=signoz_clickhouse):/var/lib/clickhouse/migration-0.10
  ```

3. To exec into the `clickhouse` container:

  ```bash
  docker exec -it $(docker ps -q -f name=signoz_clickhouse) bash
  ```

4. Now, change directory to the `/var/lib/clickhouse` and run the migration script:

  ```bash
  cd /var/lib/clickhouse

  ./migration-0.10
  ```

  You should see output similar to this:
  ```
  127.0.0.1 9000 default 
  No TTL found, skipping TTL migration
  There are total 1 rows, starting migration... 

  Processing 1 rows of serviceName flaskApp 
  Writing 1 rows
  ServiceName: flaskApp 
  Migrated till: 2022-07-15 09:15:04.151093623 +0000 UTC 
  TimeNano: 1657876504151093623 
  _________**********************************_________ 
  Completed migration in:  14.299842ms
  Dropping signoz_error_index table
  Successfully dropped signoz_error_index
  ```

5. At last, clean up the binary:

  ```bash
  rm migration-0.10
  ```

### Kubernetes

```bash
kubectl -n platform run -i -t signoz-migrate --image=signoz/migrate:0.10 --restart='Never' \
  -- -host=my-release-clickhouse -port=9000 -userName=admin -password=27ff0399-0d3a-4bd8-919d-17c2181e6fb9
```

Steps to check logs:

```bash
kubectl -n platform logs -f signoz-migrate
```

In case of failure and have to run again, make sure to cleanup the pod before running the migration script again.

```bash
kubectl -n platform delete pod signoz-migrate
```

## CLI Flags

There are some custom flags which can be enabled based on different usecases.
All the flags below are `optional`.

Flags:

- `-port` : Specify port of clickhouse. `default=9000`
- `-host` : Specify host of clickhouse. `default=127.0.0.1`
- `-userName` : Specify user name of clickhouse. `default=default`
- `-password` : Specify password of clickhouse. `default=""`
- `-dropOldTable` : If it is set to true then the old tables will be dropped after data migration is successful `default=true`
- `-service` : If you want to restart the migration starting with the service after it has failed specify the service name with -service. `default=""`
- `-timeNano` : Timestamp in nano after which the migration needs to be restarted. `default=""`
