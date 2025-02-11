Extract otel-collector tar.gz to the `otelcol-contrib` folder

```bash
mkdir otelcol-contrib 
tar xvzf otelcol-contrib_0.116.0_windows_amd64.tar.gz -C otelcol-contrib
```

Upon successful extraction, change directory using

```bash
cd otelcol-contrib
```

To verify the successful setup of Otel Collector, run the following command

```bash
.\otelcol-contrib.exe --version
```

Expected output:
`otelcol-contrib version `
