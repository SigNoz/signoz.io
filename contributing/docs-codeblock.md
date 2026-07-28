# Docs CodeBlock (MDX fences)

How to author fenced code in `data/docs/**` (and other MDX that uses the same pipeline).

Docs fences render through the site **CodeBlock** (Shiki / `rehype-pretty-code`). Keep authoring as normal fenced backticks. Flags go in the fence info string after the language (order does not matter).

For general docs writing rules (JTBD, frontmatter, region endpoints, links), see [docs-authoring.md](docs-authoring.md).

## Defaults

No meta needed:

- Line numbers on
- Collapse controls appear when the block has **more than 20 lines** (starts **expanded**)
- Untitled chrome uses a floating Copy chip; titled chrome uses a header with filename + Copy

## Meta cheat sheet

| Meta | Effect |
|------|--------|
| `lang:path` | Filename title in the chrome (e.g. `yaml:otel-collector-config.yaml`). Prefer this over `title="…"`. |
| `{5}` / `{5-9}` / `{2,4-6}` | Neutral (robin) line highlight. Prefer for “look here” callouts. |
| `{5}#cherry` / `#forest` / `#amber` / `#robin` | Sentiment highlights (error / success / warning / info). |
| `noLineNumbers` | Hide the line-number gutter. |
| `minimap` | Right-side minimap strip (useful for long samples). |
| `collapse` | Collapse controls when lines **> 20** (same as default auto behavior; explicit is fine). |
| `collapse={N}` | Collapse controls when lines **> N**. |
| `noCollapse` | Never show collapse controls, even for long fences. |
| `defaultCollapsed` | Start collapsed. Only applies when collapse controls are shown. |

Combine freely:

````md
```ts:server.ts minimap {5}#cherry collapse={40}
```
````

## Untitled fence

````md
```bash
export OTEL_EXPORTER_OTLP_ENDPOINT="https://ingest.<region>.signoz.cloud:443"
```
````

## Filename title

Use `language:relative/or/filename` (colon form). Do not put spaces around the colon.

````md
```yaml:otel-collector-config.yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
processors:
  batch:
exporters:
  otlp:
    endpoint: ingest.<region>.signoz.cloud:443
```
````

## Line numbers on / off

Line numbers are on by default. Hide them only when the gutter adds noise (tiny one-liners, pure shell prompts):

````md
```bash noLineNumbers
curl -X POST https://ingest.<region>.signoz.cloud/v1/logs
```
````

Title without line numbers:

````md
```python:app.py noLineNumbers
from flask import Flask

app = Flask(__name__)
```
````

## Line highlights

### Neutral (preferred)

````md
```ts {3-5}
const a = 1
const b = 2
const c = 3
const d = 4
const e = 5
```
````

### Sentiment colors

Use when the highlight meaning matters (error / success / warning / info):

````md
```ts {2}#cherry {3}#forest {4}#amber {5}#robin
const ok = true
throw new Error('boom')
return 'success'
console.warn('slow')
console.info('hint')
```
````

### Title + highlight

````md
```yaml:config.yaml {4-6}
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
```
````

### Title + sentiment highlights

````md
```yaml:config.yaml {4-6}#amber {8}#cherry
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [otlp]
    logs:
      receivers: [otlp]
      exporters: [otlp]
```
````

## Minimap

Opt in with `minimap`. Best for longer samples where readers skim structure:

````md
```python minimap {3}#cherry {8}#forest
def resolve(flag):
    try:
        return provider.get(flag)
    except Exception as exc:
        raise RuntimeError(str(exc)) from exc


def evaluate(ctx):
    value = resolve(ctx.key)
    if value is None:
        return ctx.default
    return value
```
````

Title + minimap + highlights:

````md
```ts:server.ts minimap {5}#cherry {10}#forest
import express from 'express'

const app = express()

app.get('/health', (_req, res) => {
  res.status(500).json({ ok: false })
})

app.get('/ready', (_req, res) => {
  res.json({ ok: true })
})

app.listen(8080)
```
````

## Collapse

- **Auto:** any fence with more than **20** lines gets Collapse / Expand controls and starts expanded. No meta needed.
- **Custom threshold:** `collapse={N}` when you want controls sooner or later than 20.
- **Start collapsed:** add `defaultCollapsed` (only when controls apply).
- **Never collapse:** `noCollapse` for long configs readers must scan in full.

### Custom threshold (still default expanded)

````md
```text collapse={5}
line 1
line 2
line 3
line 4
line 5
line 6
```
````

### Start collapsed

````md
```text collapse={5} defaultCollapsed
line 1
line 2
line 3
line 4
line 5
line 6
```
````

### Never collapse

````md
```yaml:otel-collector-config.yaml noCollapse
# long config that should stay fully expanded
```
````

### Combined: title + minimap + collapse

````md
```yaml:long.yaml minimap collapse={8} defaultCollapsed {3}#robin {10}#cherry
# …
```
````

## In-chrome tabs (`CodeTabs` / `CodeTab`)

Prefer page-level `<Tabs>` / `<TabItem>` for docs (OS, Cloud vs Self-Host, language switchers at page scope).

Use `<CodeTabs>` only when tabs should live **inside** the codeblock header (product-style chrome). Leave a blank line between tags and fences so MDX parses cleanly.

````mdx
<CodeTabs>
  <CodeTab value="http" label="HTTP" default>

```bash
curl https://ingest.<region>.signoz.cloud/v1/traces
```

  </CodeTab>
  <CodeTab value="grpc" label="gRPC">

```bash
grpcurl ingest.<region>.signoz.cloud:443 list
```

  </CodeTab>
</CodeTabs>
````

### Props

| Prop | On | Effect |
|------|-----|--------|
| `value` | `CodeTab` | Stable tab id (required) |
| `label` | `CodeTab` | Visible tab title (required) |
| `default` | `CodeTab` | Starts selected (first tab if omitted) |
| `icon` | `CodeTab` | Optional React node; defaults to file icon |
| `className` | `CodeTabs` | Optional wrapper class |

### Behavior

- Header Copy copies the **active** tab only.
- Nested fences skip their own filename chrome; the tab label is the title.
- Per-tab fence meta still works (`{n}`, `minimap`, `noLineNumbers`, `collapse`, etc.).
- Use `<region>` in ingestion endpoints so the region selector can substitute.

### Example — languages

````mdx
<CodeTabs>
  <CodeTab value="js" label="JavaScript" default>

```js
const client = new SignozClient({
  endpoint: 'https://ingest.<region>.signoz.cloud:443',
})
```

  </CodeTab>
  <CodeTab value="py" label="Python">

```python
client = SignozClient(
    endpoint="https://ingest.<region>.signoz.cloud:443",
)
```

  </CodeTab>
</CodeTabs>
````

### Example — default on second tab

````mdx
<CodeTabs>
  <CodeTab value="curl" label="cURL">

```bash
curl -X POST https://ingest.<region>.signoz.cloud/v1/logs
```

  </CodeTab>
  <CodeTab value="otel" label="OTel Collector" default>

```yaml:otel-collector-config.yaml
exporters:
  otlp:
    endpoint: ingest.<region>.signoz.cloud:443
```

  </CodeTab>
</CodeTabs>
````

## Region-aware endpoints

Ingestion snippets must use the literal `<region>` token so the docs region selector can substitute. See [SigNoz Cloud ingestion endpoints](docs-authoring.md#signoz-cloud-ingestion-endpoints-region-aware).

````md
```bash
export OTEL_EXPORTER_OTLP_ENDPOINT="https://ingest.<region>.signoz.cloud:443"
```
````

## Authoring tips

- Prefer `lang:path` titles for real files readers will edit (`config.yaml`, `main.go`). Skip titles for one-off shell.
- Prefer neutral `{n}` / `{n-m}` highlights over sentiment colors unless the color carries meaning.
- Prefer page-level `<Tabs>` / `<TabItem>` over `<CodeTabs>` unless you need tabs inside the code chrome.
- Do not hardcode `us` / `eu` / `in` in ingestion endpoints; use `<region>`.
