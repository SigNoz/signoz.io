/// <reference lib="webworker" />

import { LogInputFormat, parseLogs, ParsedLog, sortLogsByTimestamp } from './logAnalyzer.utils'

type ParseWorkerRequest =
  | {
      type: 'parse-file'
      file: File
      format: LogInputFormat
    }
  | {
      type: 'parse-text'
      input: string
      format: LogInputFormat
    }

type ParseWorkerResponse =
  | { type: 'progress'; progress: number }
  | { type: 'result'; logs: ParsedLog[] }
  | { type: 'error'; message: string }

const workerScope = self as DedicatedWorkerGlobalScope
const CHUNK_SIZE = 1024 * 1024

const sendProgress = (progress: number) => {
  workerScope.postMessage({ type: 'progress', progress } satisfies ParseWorkerResponse)
}

const parseLineFile = async (file: File): Promise<ParsedLog[]> => {
  const decoder = new TextDecoder()
  const logs: ParsedLog[] = []
  let carry = ''
  let lineNumber = 0

  for (let offset = 0; offset < file.size; offset += CHUNK_SIZE) {
    const end = Math.min(offset + CHUNK_SIZE, file.size)
    const buffer = await file.slice(offset, end).arrayBuffer()
    carry += decoder.decode(buffer, { stream: end < file.size })

    const lines = carry.split(/\r?\n/)
    carry = lines.pop() ?? ''

    lines.forEach((rawLine) => {
      lineNumber += 1
      const line = rawLine.trim()
      if (!line) return

      parseLogs(line).forEach((log, recordIndex) => {
        logs.push({
          ...log,
          id: `log-${lineNumber}-${recordIndex}`,
          lineNumber,
        })
      })
    })

    sendProgress(Math.max(5, Math.round((end / file.size) * 90)))
  }

  const finalLine = carry.trim()
  if (finalLine) {
    lineNumber += 1
    parseLogs(finalLine).forEach((log, recordIndex) => {
      logs.push({
        ...log,
        id: `log-${lineNumber}-${recordIndex}`,
        lineNumber,
      })
    })
  }

  return logs
}

const parseWholeFile = async (file: File, format: LogInputFormat): Promise<ParsedLog[]> => {
  const decoder = new TextDecoder()
  const chunks: string[] = []

  for (let offset = 0; offset < file.size; offset += CHUNK_SIZE) {
    const end = Math.min(offset + CHUNK_SIZE, file.size)
    const buffer = await file.slice(offset, end).arrayBuffer()
    chunks.push(decoder.decode(buffer, { stream: end < file.size }))
    sendProgress(Math.max(5, Math.round((end / file.size) * 85)))
  }

  sendProgress(90)
  return parseLogs(chunks.join(''), format)
}

workerScope.onmessage = async (event: MessageEvent<ParseWorkerRequest>) => {
  try {
    sendProgress(2)

    const logs =
      event.data.type === 'parse-text'
        ? parseLogs(event.data.input, event.data.format)
        : /\.(?:jsonl|ndjson|log|out)$/i.test(event.data.file.name)
          ? await parseLineFile(event.data.file)
          : await parseWholeFile(event.data.file, event.data.format)

    const sortedLogs = sortLogsByTimestamp(logs)
    sendProgress(100)
    workerScope.postMessage({ type: 'result', logs: sortedLogs } satisfies ParseWorkerResponse)
  } catch (error) {
    workerScope.postMessage({
      type: 'error',
      message: error instanceof Error ? error.message : 'The browser could not parse these logs.',
    } satisfies ParseWorkerResponse)
  }
}

export type { ParseWorkerRequest, ParseWorkerResponse }
