import MarkdownRenderer from '@/components/ReactMarkdown'
import React from 'react'

const markdownContent = `[![Logs Perf Benchmark](/img/blog/common/logs-performance-benchmark-cta.webp)](https://signoz.io/blog/logs-performance-benchmark/)`

export default function LogsPerf() {
  return (
    <div className="overflow-hidden rounded-md border border-[var(--l2-border)] bg-[var(--l2-background)]">
      <MarkdownRenderer markdownContent={markdownContent} />
    </div>
  )
}
