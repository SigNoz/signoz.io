'use client'

import { useState } from 'react'

const DATA = [
  {
    method: 'GET',
    status: '200',
    region: 'us-east-1',
    user_id: 'u_8a92b',
    request_id: 'req_9f8a...',
  },
  {
    method: 'POST',
    status: '201',
    region: 'eu-west-1',
    user_id: 'u_7b12c',
    request_id: 'req_1a2b...',
  },
  {
    method: 'GET',
    status: '200',
    region: 'us-east-1',
    user_id: 'u_8a92b',
    request_id: 'req_3c4d...',
  },
  {
    method: 'GET',
    status: '404',
    region: 'us-west-2',
    user_id: 'u_9d34e',
    request_id: 'req_5e6f...',
  },
  {
    method: 'POST',
    status: '200',
    region: 'eu-west-1',
    user_id: 'u_1f56g',
    request_id: 'req_7g8h...',
  },
]

export default function DatabaseTable() {
  const [hoveredCol, setHoveredCol] = useState<string | null>(null)

  const columns = [
    {
      key: 'method',
      label: 'method',
      cardinality: 'Low (~5)',
      color: 'bg-[var(--callout-primary-background)] text-[var(--callout-primary-title)]',
      type: 'low',
    },
    {
      key: 'status',
      label: 'status',
      cardinality: 'Low (~50)',
      color: 'bg-[var(--callout-success-background)] text-[var(--callout-success-title)]',
      type: 'low',
    },
    {
      key: 'region',
      label: 'region',
      cardinality: 'Low (~20)',
      color:
        'bg-[color-mix(in_srgb,#a855f7_12%,transparent)] text-[color-mix(in_srgb,#a855f7_55%,var(--l1-foreground))]',
      type: 'low',
    },
    {
      key: 'user_id',
      label: 'user_id',
      cardinality: 'High (Millions)',
      color: 'bg-orange-900/20 text-orange-300',
      type: 'high',
    },
    {
      key: 'request_id',
      label: 'request_id',
      cardinality: 'Max (Unlimited)',
      color: 'bg-[var(--callout-error-background)] text-[var(--callout-error-title)]',
      type: 'high',
    },
  ]

  return (
    <div className="mx-auto my-12 w-full max-w-4xl font-mono text-sm">
      <div className="overflow-hidden rounded-lg border border-[var(--l2-border)] bg-[var(--l2-background)] shadow-sm">
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="grid min-w-[600px] grid-cols-5 border-b border-[var(--l2-border)] bg-[var(--l3-background)]">
            {columns.map((col) => (
              <div
                key={col.key}
                className={`cursor-help border-r border-[var(--l2-border)] p-4 transition-colors last:border-0
                ${hoveredCol === col.key ? col.color : 'hover:bg-[var(--l3-background-hover)]'}
              `}
                onMouseEnter={() => setHoveredCol(col.key)}
                onMouseLeave={() => setHoveredCol(null)}
              >
                <div className="mb-1 font-bold text-[var(--l1-foreground)]">{col.label}</div>
                <div
                  className={`inline-block rounded-full px-2 py-0.5 font-sans text-xs font-medium
                ${col.type === 'high' ? 'bg-[var(--callout-warning-background)] text-[var(--callout-warning-title)]' : 'bg-[var(--l3-background)] text-[var(--l3-foreground)]'}
              `}
                >
                  {col.type === 'high' ? 'High Card.' : 'Low Card.'}
                </div>
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[var(--l2-border)]">
            {DATA.map((row, i) => (
              <div
                key={i}
                className="grid min-w-[600px] grid-cols-5 transition-colors hover:bg-[var(--l3-background-60)]"
              >
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className={`truncate border-r border-[var(--l2-border)] p-4 text-[var(--l3-foreground)] last:border-0
                    ${hoveredCol === col.key ? 'bg-opacity-30 ' + col.color.split(' ')[0] : ''}
                    ${col.type === 'high' && hoveredCol === col.key ? 'font-semibold' : ''}
                  `}
                  >
                    {/* @ts-ignore */}
                    {row[col.key]}
                  </div>
                ))}
              </div>
            ))}
            {/* ... row */}
            <div className="grid min-w-[600px] grid-cols-5 bg-[var(--l3-background-60)] italic text-[var(--l3-foreground)]">
              {columns.map((col) => (
                <div key={col.key} className="border-r border-[var(--l2-border)] p-4 last:border-0">
                  ...
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Caption / Context */}
      <div className="mt-4 h-8 text-center">
        {hoveredCol ? (
          <span
            className={`animate-in fade-in slide-in-from-bottom-2 inline-block rounded-full px-3 py-1 text-xs font-medium
            ${columns.find((c) => c.key === hoveredCol)?.color}
          `}
          >
            {columns.find((c) => c.key === hoveredCol)?.key}:{' '}
            {columns.find((c) => c.key === hoveredCol)?.cardinality} unique values
          </span>
        ) : (
          <span className="text-xs text-[var(--l3-foreground)]">
            Hover over headers to see cardinality estimates
          </span>
        )}
      </div>
    </div>
  )
}
