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
      color: 'bg-blue-900/20 text-blue-300',
      type: 'low',
    },
    {
      key: 'status',
      label: 'status',
      cardinality: 'Low (~50)',
      color: 'bg-green-900/20 text-green-300',
      type: 'low',
    },
    {
      key: 'region',
      label: 'region',
      cardinality: 'Low (~20)',
      color: 'bg-purple-900/20 text-purple-300',
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
      color: 'bg-red-900/20 text-red-300',
      type: 'high',
    },
  ]

  return (
    <div className="mx-auto my-12 w-full max-w-4xl font-mono text-sm">
      <div className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow-sm">
        <div className="overflow-x-auto">
          {/* Table Header */}
          <div className="grid min-w-[600px] grid-cols-5 border-b border-zinc-700 bg-zinc-800">
            {columns.map((col) => (
              <div
                key={col.key}
                className={`cursor-help border-r border-zinc-700 p-4 transition-colors last:border-0
                ${hoveredCol === col.key ? col.color : 'hover:bg-zinc-700'}
              `}
                onMouseEnter={() => setHoveredCol(col.key)}
                onMouseLeave={() => setHoveredCol(null)}
              >
                <div className="mb-1 font-bold text-zinc-100">{col.label}</div>
                <div
                  className={`inline-block rounded-full px-2 py-0.5 font-sans text-xs font-medium
                ${col.type === 'high' ? 'bg-orange-900/30 text-orange-300' : 'bg-zinc-700 text-zinc-400'}
              `}
                >
                  {col.type === 'high' ? 'High Card.' : 'Low Card.'}
                </div>
              </div>
            ))}
          </div>

          {/* Table Body */}
          <div className="divide-y divide-zinc-700">
            {DATA.map((row, i) => (
              <div
                key={i}
                className="grid min-w-[600px] grid-cols-5 transition-colors hover:bg-zinc-800/50"
              >
                {columns.map((col) => (
                  <div
                    key={col.key}
                    className={`truncate border-r border-zinc-700 p-4 text-zinc-400 last:border-0
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
            <div className="grid min-w-[600px] grid-cols-5 bg-zinc-800/30 italic text-zinc-600">
              {columns.map((col) => (
                <div key={col.key} className="border-r border-zinc-700 p-4 last:border-0">
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
          <span className="text-xs text-zinc-500">
            Hover over headers to see cardinality estimates
          </span>
        )}
      </div>
    </div>
  )
}
