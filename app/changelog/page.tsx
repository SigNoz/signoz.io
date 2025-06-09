import React from 'react'
import { fetchChangelogEntries } from '../../utils/strapi'
import type { ChangelogEntry } from '../../utils/strapi'

const Changelog: React.FC = async () => {
  const changelogEntries: ChangelogEntry[] = await fetchChangelogEntries()

  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="my-12 text-center text-5xl font-bold">Changelog</h1>
      <div className="relative border-l border-gray-200 dark:border-gray-700">
        {changelogEntries.map((entry) => (
          <div key={entry.id} className="mb-10 ml-6">
            <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#5468ff] ring-8 ring-white dark:ring-gray-900"></span>
            <div className="mb-1 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {entry.title}
              </h2>
              <span className="text-sm font-normal text-gray-400 dark:text-gray-500">
                {new Date(entry.date).toLocaleDateString()}
              </span>
            </div>
            <div className="rounded-lg bg-white p-6 shadow dark:bg-gray-800">
              <p className="text-gray-600 dark:text-gray-400">
                Checkout the complete changelog of{' '}
                <a
                  href={`https://github.com/SigNoz/signoz/releases/tag/${entry.title}`}
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {entry.title}
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-12 text-center">
        <a
          href="https://github.com/SigNoz/signoz/releases"
          className="text-blue-500 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Checkout the complete changelog!
        </a>
      </div>
    </div>
  )
}

export default Changelog
