'use client'

import siteMetadata from '@/data/siteMetadata'
import { TrieveModalSearch } from 'trieve-search-component'
import 'trieve-search-component/styles'

const SearchButton = () => {
  if (siteMetadata.search) {
    return (
      <TrieveModalSearch
        theme="dark"
        apiKey="tr-cK2MylVI0my78NUoafAiTvvmpdktntO3"
        datasetId="4650e231-7857-45aa-beb1-cb52006a2460"
        openKeyCombination={[
          {
            key: '/',
          },
        ]}
        defaultSearchQueries={[
          'App Service Diagnostic Settings EventHub',
          'Logstash to SigNoz configuration tutorial',
          'EventHub and App Service logging integration',
        ]}
        defaultAiQuestions={[
          'What is SigNoz?',
          'How to change retention period?',
          'How do I install SigNoz?',
        ]}
        brandColor="#E75536"
        brandName="SigNoz"
        brandLogoImgSrcUrl="https://avatars.githubusercontent.com/u/76905799?s=200&v=4"
        cssRelease="stable"
        showFloatingButton={true}
        ButtonEl={() => (
          <div className="-mt-1 flex min-h-8 items-center justify-between rounded-full pb-0 pl-4 pr-0 pt-1 sm:bg-signoz_slate-500 sm:pb-1 sm:pr-4">
            <div className="mr-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              <span className="hidden text-sm text-signoz_vanilla-400 sm:inline">Search...</span>
            </div>
            <div className="hidden h-5 w-5 items-center justify-center rounded-sm border-1.5 border-b-2 border-signoz_ink-200 text-[10px] font-bold sm:flex">
              /
            </div>
          </div>
        )}
      />
    )
  }
}

export default SearchButton
