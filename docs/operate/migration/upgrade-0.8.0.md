---
id: upgrade-0.8.0
title: Upgrade to 0.8.0
sidebar_label: Upgrade to 0.8.0
---
import { LiteYoutubeEmbed } from "react-lite-yt-embed";

# Upgrade to v0.8.0 from earlier versions

v0.8.0 is a breaking release which requires data migration, if you are upgrading from an older version then you have to run the data migration scripts to be able to see past data.

## First upgrade to v0.8.0

Follow the platform specific instructions to upgrade to v0.8.0 and above.

Note that the past data will not be visible on the new application until you run the migration script.

### Upgrade Docker Installation

- `git clone --single-branch --depth 1 https://github.com/SigNoz/signoz.git && cd signoz/deploy/`
- `git checkout v0.8.0`
- `./install.sh`

### Upgrade Kubernetes Installation

- `helm repo update`
- `helm search repo signoz --versions`
- `helm -n platform upgrade my-release signoz/signoz`

## Steps to run migration script:

### For Docker

```bash
docker run --name signoz-migrate --network clickhouse-setup_default \
  -it -d signoz/migrate:0.8 -host=clickhouse -port=9000
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

### For Kubernetes

```bash
kubectl -n platform run -i -t signoz-migrate --image=signoz/migrate:0.8 --restart='Never' \
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

There are some custom flags which can be enabled based on different usecases.

All the flags below are `optional`

Flags:

- `-port` : Specify port of clickhouse. `default=9000`
- `-host` : Specify host of clickhouse. `default=127.0.0.1`
- `-userName` : Specify user name of clickhouse. `default=default`
- `-password` : Specify password of clickhouse. `default=""`
- `-dropOldTable` : If it is set to true then the old tables will be dropped after data migration is successful `default=true`
- `-service` : If you want to restart the migration starting with the service after it has failed specify the service name with -service. `default=""`
- `-timeNano` : Timestamp in nano after which the migration needs to be restarted. `default=""`

### Steps to be taken in the browser to clear cache after upgrade

### For Chrome

<LiteYoutubeEmbed id="PmbfbTKKxmk" mute={false} />

### For Firefox

<LiteYoutubeEmbed id="ESivE729ZTs" mute={false} />

### For Safari

<LiteYoutubeEmbed id="T_ovOttPRhA" mute={false} />
