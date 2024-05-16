
import MarkdownRenderer from '@/components/ReactMarkdown'
import React from 'react'

const markdownContent = `[![Logs Perf Benchmark](/img/blog/common/logs-performance-benchmark-cta.webp)](https://signoz.io/blog/logs-performance-benchmark/)`

export default function LogsPerf() {
  return <MarkdownRenderer markdownContent={markdownContent} />
}








