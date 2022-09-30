---
id: opentelemetry-binary-usage-in-virtual-machine
title: OpenTelemetry Binary Usage in Virtual Machine
description: Using OpenTelemetry binary usage and monitor the virtual machine (VM).
---

import HostMetrics from '../shared/hostmetrics-list.md'

### Overview

This tutorial shows how you can deploy OpenTelemetry binary an agent, which
collects telemetry data. Data such as traces, metrics and logs generated
by applications most likely running in the same virtual machine (VM).

It can also be used for collecting data from other VMs in the same cluster,
data center or region, however binary is not recommended in that scenerio but
container or depoyment which can be easily scaled.

In this guide, you will also learn to set up hostmetrics receiver to collect
metrics from the VM and view in SigNoz.

### Prerequisites

- SigNoz application up and running
- SigNoz endpoint accessible from the VM
- availability of ports: `4317`, `4318`, `8888`, `1777`, `13133`

## Installation

You can obtain OpenTelemetry collector binary in the assets of each releases:
[open-telemetry/opentelemetry-collector-releases/releases][1].
There are two ways of installation with binary release assets: `deb` as
`systemd` and `tar.gz` as plain binary.

### Systemd

Using `deb` file, OpenTelemetry Collector will be installed as a `systemd` and
default configuration prepopulated at `/etc/otelcol-contrib` path. This method
would be preferable in case you want the OpenTelemetry collector to always be
running in the background.

To download `deb` file of release version `0.55.0`:

```bash
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.55.0/otelcol-contrib_0.55.0_linux_amd64.deb
```

:::info
In case of different OpenTelemetry collector version, replace `0.55.0` with respective version.
:::

To install `otelcol` as `systemd` using `dpkg`:

```bash
sudo dpkg -i otelcol-contrib_0.55.0_linux_amd64.deb
```

### Plain Binary

Using `tar.gz` release asset, we can extract the OpenTelemetry collector binary
and default configuration at our desired path. We can run the binary directly
with flags either use `tmux

To download `tar.gz` file of release version `0.55.0`:

```bash
wget https://github.com/open-telemetry/opentelemetry-collector-releases/releases/download/v0.55.0/otelcol-contrib_0.55.0_linux_amd64.tar.gz
```

:::info
In case of different OpenTelemetry collector version, replace `0.55.0` with respective version.
:::

To create `otelcol` folder and extract files from `tar.gz` to newly created folder:

```bash
mkdir otelcol-contrib && tar xvzf otelcol-contrib_0.55.0_linux_amd64.tar.gz -C otelcol-contrib/
```

## OpenTelemetry Collector Configuration

Let's download standalone configuration for `otelcol` binary running in the VM:

```bash
wget https://raw.githubusercontent.com/SigNoz/benchmark/main/docker/standalone/config.yaml
```

Replace `<IP of machine hosting SigNoz>` with the address to SigNoz in configuration
highlighted below:

```yaml {3}
exporters:
   otlp:
     endpoint: "<IP of machine hosting SigNoz>:4317"
     tls:
       insecure: true
```

In the configuration above, we enable three receivers: `OTLP`, `hostmetrics`
and `prometheus`.

`OTLP` receiver is configured to receive all types of telemetry data:
traces, metrics and logs. These data would be forwarded to SigNoz via
OTLP gRPC endpoint.

`hostmetrics` receiver is configured to collect various metrics of the virtual
machine. It consists of metrics related to CPU, memory, disk, file system,
network, and others.

`prometheus` receiver is configured to collect the internal metrics of the
`otelcol`. You can update it as per your need to include additional scrape
targets accessible from the VM or remove existing targets.

## OpenTelemetry Collector Usage

You copy the configuration file to the respective config paths as per your
installation methods. Followed by respective instructions to start, restart,
and view logs of the `otelcol` binary.

### Systemd

To copy the updated `config.yaml` file:

```bash
sudo cp config.yaml /etc/otelcol-contrib/config.yaml
```

To restart `otelcol` with updated config:

```bash
sudo systemctl restart otelcol-contrib.service
```

To check status of `otelcol`:

```bash
sudo systemctl status otelcol-contrib.service
```

To view logs of `otelcol`:

```bash
sudo journalctl -u otelcol-contrib.service
```

To stop of `otelcol`:

```bash
sudo systemctl stop otelcol-contrib.service
```

### Plain Binary

It is recommended to use the `otelcol` binary inside terminal multiplexer
tools like `tmux` or `screen`, since plain binary usage is ephemeral.

To copy the updated `config.yaml` file:

```bash
cp config.yaml ./otelcol-contrib/config.yaml
```

To change directory inside `otelcol-contrib` folder:

```bash
cd otelcol-contrib
```

To start `otelcol` with updated config:

```bash
./otelcol-contrib --config ./config.yaml &> otelcol-output.log & echo "$!" > otel-pid
```

To view last 50 lines of `otelcol` logs:

```bash
tail -f -n 50 otelcol-output.log
```

To stop `otelcol`:

```bash
kill "$(< otel-pid)"
```

## Test Sending Traces

OpenTelemetry collector binary should be able to forward all types of telemetry data recevied:
traces, metrics, and logs, to SigNoz OTLP endpoint via gRPC.

Let's send sample traces to the `otelcol` using `tracegen`.

To install tracegen binary:

```bash
go install github.com/open-telemetry/opentelemetry-collector-contrib/tracegen@v0.55.0
```

To send trace data using `tracegen`, execute the command below:

```bash
tracegen -traces 1 -otlp-endpoint localhost:4317 -otlp-insecure
```

Output should look like this:

```
...
2022-09-30T14:23:20.439+0545	INFO	channelz/funcs.go:340	[core][Channel #1] Channel Connectivity change to READY	{"system": "grpc", "grpc_log": true}
2022-09-30T14:23:20.439+0545	INFO	tracegen/config.go:105	generation of traces isn't being throttled
2022-09-30T14:23:20.440+0545	INFO	tracegen/worker.go:91	traces generated	{"worker": 0, "traces": 1}
2022-09-30T14:23:20.440+0545	INFO	tracegen@v0.55.0/main.go:98	stop the batch span processor
2022-09-30T14:23:20.742+0545	INFO	channelz/funcs.go:340	[core][Channel #1] Channel Connectivity change to SHUTDOWN	{"system": "grpc", "grpc_log": true}
2022-09-30T14:23:20.742+0545	INFO	channelz/funcs.go:340	[core][Channel #1 SubChannel #2] Subchannel Connectivity change to SHUTDOWN	{"system": "grpc", "grpc_log": true}
2022-09-30T14:23:20.742+0545	INFO	channelz/funcs.go:340	[core][Channel #1 SubChannel #2] Subchannel deleted	{"system": "grpc", "grpc_log": true}
2022-09-30T14:23:20.742+0545	INFO	channelz/funcs.go:340	[core][Channel #1] Channel deleted	{"system": "grpc", "grpc_log": true}
2022-09-30T14:23:20.742+0545	INFO	tracegen@v0.55.0/main.go:89	stopping the exporter
```

If the SigNoz endpoint in the configuration is set correctly and accessible,
you should be able to see the traces sent via OpenTelemetry collector in VM
from `tracegen` in the SigNoz UI.

![traces generated by tracegen][2]

## HostMetrics Dashboard

In this section, we will generate and import dashboard with VM HostMetrics.
It involves two steps: generting dashboard JSON using bash script and
importing dashboard JSON in SigNoz UI.

To generate HostMetrics dashboards for the VM:

```bash
curl -sL https://github.com/SigNoz/benchmark/raw/main/dashboards/hostmetrics/hostmetrics-import.sh | bash
```

Output should look similar to the following:

```
✅ Succesfully generated Host Metrics dashboard: signoz-hostmetrics-one-piece.json
```

After importing the dashboard JSON, we should see the following dashboard in SigNoz UI:

![hostmetrics dashboard][3]

---

### List of metrics

<HostMetrics name="Virtual Machine Metrics"/>

---

[1]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases
[2]: /img/docs/tracegen-output.png
[3]: /img/docs/hostmetrics-dashboard.png
