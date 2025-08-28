'use client'

import React from 'react'
import siteMetadata from '@/data/siteMetadata'
import { InkeepSearchBar, type InkeepSearchBarProps } from '@inkeep/cxkit-react'

type SearchButtonProps = {
  disableShortcut?: boolean
}

const SearchButton = ({ disableShortcut = false }: SearchButtonProps) => {
  if (siteMetadata.search) {
    const config: InkeepSearchBarProps = {
      baseSettings: {
        apiKey: process.env.NEXT_PUBLIC_INKEEP_API_KEY || '',
        primaryBrandColor: '#E75536',
        organizationDisplayName: 'SigNoz',
        colorMode: {
          forcedColorMode: 'dark',
        },
        theme: {
          styles: [
            {
              key: 'signoz-searchbar-style',
              type: 'style',
              value: `
                .ikp-search-bar__container {
                  display: flex;
                  align-items: center;
                  width: fit-content !important;
                  min-width: unset !important;
                }
                .ikp-search-bar__button {
                  background: rgb(23 25 34);
                  color: rgb(229 231 235);
                  border-radius: 9999px;
                  padding: 2px 14px 2px 16px
                  min-height: 2rem;
                  height: 1.5rem;
                  font-size: 13px;
                  border: none;
                  display: flex;
                  align-items: center;
                  gap: 6px;
                  transition: all 0.2s;
                  width: auto;
                  min-width: 120px;
                  margin: 0;
                }
                .ikp-search-bar__button:hover {
                  background: rgb(51 65 85 / 0.85);
                }
                .ikp-search-bar__icon {
                  width: 14px;
                  height: 14px;
                  flex-shrink: 0;
                }
                .ikp-search-bar__text {
                  color: rgb(163 163 163);
                  font-size: 13px;
                  white-space: nowrap;
                }
                .ikp-search-bar__kbd-wrapper {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background: transparent;
                  border: 0px solid rgb(82 82 91);
                  border-bottom-width: 0px;
                  border-radius: 3px;
                  padding: 0;
                  width: 18px;
                  height: 18px;
                  font-size: 10px;
                  font-weight: 700;
                  color: rgb(163 163 163);
                  flex-shrink: 0;
                  margin-left: 6px;
                }
                .ikp-search-bar__content-wrapper {
                  display: flex;
                  align-items: center;
                  gap: 4px;
                }
                @media (max-width: 640px) {
                  .ikp-search-bar__button {
                    background: transparent;
                    border: none;
                    padding: 8px;
                    min-width: unset;
                    width: auto;
                    height: auto;
                    min-height: unset;
                  }
                  .ikp-search-bar__icon {
                    width: 20px;
                    height: 20px;
                    color: rgb(163 163 163);
                  }
                  .ikp-search-bar__text {
                    display: none;
                  }
                  .ikp-search-bar__kbd-wrapper {
                    display: none;
                  }
                }
              `,
            },
          ],
        },
      },
      // modalSettings will be attached below only when disabling the shortcut
      searchSettings: {
        placeholder: 'Search docs...',
      },
      aiChatSettings: {
        placeholder: 'Ask about SigNoz...',
      },
      defaultView: 'search',
      shouldShowAskAICard: true,
      askAICardLabel: 'Ask AI',
      askAILabel: 'Ask AI',
      searchLabel: 'Search',
    }

    // Attach modalSettings only when disabling the shortcut, to avoid overriding
    // Inkeep's default "k" when we want it enabled.
    if (disableShortcut) {
      // @ts-expect-error - assigning optional prop conditionally
      config.modalSettings = { shortcutKey: null }
    }

    return <InkeepSearchBar {...config} />
  }
}

export default SearchButton
