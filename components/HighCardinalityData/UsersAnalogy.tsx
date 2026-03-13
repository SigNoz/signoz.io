'use client'

import { useState } from 'react'

type QueryType = 'total' | 'region' | 'userId'

interface User {
  id: number
  color: string
  userId: string
  region: string
}

const COLORS = ['#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
const REGIONS = ['US-East', 'US-West', 'EU', 'APAC']

function generateUsers(count: number): User[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    userId: `usr_${Math.random().toString(36).substring(2, 6)}`,
    region: REGIONS[Math.floor(Math.random() * REGIONS.length)],
  }))
}

export default function UsersAnalogy() {
  const [users] = useState(() => generateUsers(40)) // Reduced to 40 for cleaner grid
  const [query, setQuery] = useState<QueryType | null>(null)

  // Group users based on current query
  const groupedUsers = () => {
    if (query === 'region') {
      const groups: Record<string, User[]> = {}
      REGIONS.forEach((r) => (groups[r] = []))
      users.forEach((u) => groups[u.region].push(u))
      return groups
    }
    if (query === 'userId') {
      const groups: Record<string, User[]> = {}
      users.forEach((u) => (groups[u.userId] = [u]))
      return groups
    }
    return { 'All Users': users }
  }

  const groups = groupedUsers()
  const isHighCardinality = query === 'userId'

  return (
    <div className="mx-auto my-12 w-full max-w-3xl font-sans">
      {/* Controls */}
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <button
          onClick={() => setQuery(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            query === null
              ? 'bg-zinc-100 text-black'
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
          }`}
        >
          Reset
        </button>
        <button
          onClick={() => setQuery('total')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            query === 'total'
              ? 'bg-green-600 text-white'
              : 'bg-green-900/30 text-green-300 hover:bg-green-900/50'
          }`}
        >
          Count Total (Card: 1)
        </button>
        <button
          onClick={() => setQuery('region')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            query === 'region'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50'
          }`}
        >
          Group by Region (Card: 4)
        </button>
        <button
          onClick={() => setQuery('userId')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            query === 'userId'
              ? 'bg-red-600 text-white'
              : 'bg-red-900/30 text-red-300 hover:bg-red-900/50'
          }`}
        >
          Group by User ID (Card: 40)
        </button>
      </div>

      {/* Visual Area - Less Boxy, No Borders */}
      <div
        className={`min-h-[300px] transition-all duration-500 ${
          query === 'region'
            ? 'grid grid-cols-2 gap-4 md:gap-8'
            : query === 'userId'
              ? 'grid grid-cols-4 gap-1.5 sm:grid-cols-5 md:grid-cols-8 md:gap-2'
              : 'flex flex-wrap content-start justify-center gap-2'
        }`}
      >
        {Object.entries(groups).map(([groupName, groupUsers]) => (
          <div
            key={groupName}
            className={`transition-all duration-500 ${
              query === 'region'
                ? 'rounded-xl bg-zinc-800/50 p-4'
                : query === 'userId'
                  ? 'bg-transparent'
                  : 'contents'
            }`}
          >
            {/* Group Label */}
            {query === 'region' && (
              <div className="mb-3 w-full border-b border-zinc-700 pb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {groupName}
              </div>
            )}

            {/* Users */}
            <div className={`flex flex-wrap gap-2 ${query === 'region' ? '' : 'contents'}`}>
              {groupUsers.map((user) => (
                <div
                  key={user.id}
                  className={`group relative rounded-full transition-all duration-500
                    ${query === 'userId' ? 'h-8 w-8 border border-zinc-600 md:h-10 md:w-10' : 'h-6 w-6'}
                    ${query === 'total' ? 'bg-green-500' : ''}
                  `}
                  style={{
                    backgroundColor: query === 'total' ? undefined : user.color,
                    opacity: 1,
                  }}
                >
                  {/* Tooltip for User ID */}
                  {query === 'userId' && (
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-[8px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                      ID
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Per-group summary for User ID mode */}
            {query === 'userId' && (
              <div className="mt-1 text-center font-mono text-[10px] text-zinc-500">
                {groupName}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Inline Explanation */}
      <div className="mx-auto mt-8 max-w-xl text-center italic text-zinc-300">
        {query === null && 'Scattered data. The database sees a pile of records.'}
        {query === 'total' && 'One single answer. The database just counts. Fast.'}
        {query === 'region' &&
          'Four neat buckets. The database organizes users into just 4 groups. Fast.'}
        {query === 'userId' &&
          '40 separate buckets! The database must create a unique group for EVERY user. This is high cardinality.'}
      </div>
    </div>
  )
}
