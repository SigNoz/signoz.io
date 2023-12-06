---
id: processors
title: Log Processors
---

# Log Processors

Every pipeline includes a chain of processors that define the transformations it will apply to logs.
When a log matches a pipeline's filter, it is transformed by each
processor in the pipeline one by one.

The following log transformation processors are available for 
defining pipelines.


## Regex
The Regex processor can be used to extract information out of text
using [regular expressions](https://www3.ntu.edu.sg/home/ehchua/programming/howto/Regexe.html).

#### Processor Fields
|     Field     |   Description   |
|---------------|-----------------|
|     Name      | A descriptive name for the processor. |
|     Pattern      | The regex pattern to be used. Must include atleast one named capture group |
|     Parse&#160;From      | The log text field to parse from. Eg: `body` or `attributes.sessionInfo` |
|     Parse&#160;To      | The path to parse to. Eg: If set to `attributes`, a capture group like `(?P<userId>.+)` in the regex pattern would get stored in `attributes.userId` |
|     On&#160;Error     | What to do if the processor fails. Options are to `drop` the log or `send` it to the next processor  |


## Grok
The Grok processor can be used to extract information out of text 
using grok patterns.  
[Grok](https://www.elastic.co/guide/en/elasticsearch/reference/current/grok.html) is a regular expression dialect with convenient [aliases](https://github.com/vjeantet/grok/blob/master/patterns.go) for commonly used expressions.   

#### Processor Fields
|     Field     |   Description   |
|---------------|-----------------|
|     Name      | A descriptive name for the processor. |
|     Pattern      | The [grok pattern](https://grokdebugger.com/) to be used. Must include atleast one named capture group |
|     Parse&#160;From      | The log text field to parse from. Eg: `body` or `attributes.sessionInfo` |
|     Parse&#160;To      | The path to parse to. Eg: If set to `attributes`, a capture group like `%{WORD:userId}` in the grok pattern would get stored in `attributes.userId` |
|     On&#160;Error     | What to do if the processor fails. Options are to `drop` the log or `send` it to the next processor  |


## JSON Parser
The JSON parsing processor can be used to parse serialized JSON text into log attributes.

#### Processor Fields
|     Field     |   Description   |
|---------------|-----------------|
|     Name      | A descriptive name for the processor. |
|     Parse&#160;From      | The log field containing serialized JSON text. Eg: `body` or `attributes.sessionInfo` |
|     Parse&#160;To      | The path to parse to. Eg: If set to `attributes`, parsing the JSON text `'{ "userId": 8888 }'` would set `attributes.userId` to `8888` |


## Trace Parser
The trace processor can be used to populate trace id, span id and trace flags for a log.  
Populating trace identifiers in logs allows navigation to and from corresponding traces for correlation.

#### Processor Fields
|     Field     |   Description   |
|---------------|-----------------|
|     Name      | A descriptive name for the processor. |
|     Parse&#160;Trace&#160;Id&#160;From   | The log field containing otel Trace Id. Eg: `attributes.myTraceId` <br/> Value at the specified path must be an even length string of hex characters |
|     Parse&#160;Span&#160;Id&#160;From    | The log field containing otel Span Id.  Eg: `attributes.mySpanId` <br/> Value at the specified path must be an even length string of hex characters |
|     Parse&#160;Trace&#160;Flags&#160;From    | The log field containing otel Trace Flags. Eg: `attributes.myTraceFlags` <br/> Value at the specified path must be an unsigned int |

:::note

At least one field among `Parse Trace Id From`, `Parse Span Id From` and `Parse Trace Flags From` must be specified.

:::

## Add
The add processor can be used to add a field to the log.

#### Processor Fields
|     Field     |   Description   |
|---------------|-----------------|
|     Name      | A descriptive name for the processor. |
|     Field     | Path of the field to be added. Must be of the form `attributes.*` or `resource.*`  |
|     Value     | The value to be set in the specified field |


## Remove
The remove processor can be used for removing unwanted log fields such as PII.

#### Processor Fields
|     Field     |   Description   |
|---------------|-----------------|
|     Name      | A descriptive name for the processor. |
|     Field     | Path of the field to be removed. Must be of the form `attributes.*` or `resource.*`  |


## Move
The move processor can be used to move or rename a log field.

#### Processor Fields
|     Field     |   Description   |
|---------------|-----------------|
|     Name      | A descriptive name for the processor. |
|     From      | Path of the field to be moved. Must be of the form `attributes.*` or `resource.*` |
|     To        | Path to move the field to. Must be of the form `attributes.*` or `resource.*` |


## Copy
The copy processor can be used to copy log fields.

#### Processor Fields
|     Field     |   Description   |
|---------------|-----------------|
|     Name      | A descriptive name for the processor. |
|     From      | Path of the field to be copied. Must be of the form `attributes.*` or `resource.*` |
|     To        | Path to copy the field to. Must be of the form `attributes.*` or `resource.*` |
