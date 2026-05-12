'use client'

import React, { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { getOrCreateAnonymousId, getUserId } from '@/utils/userClient'
import { extractGroupIdFromEmail } from '@/utils/userShared'
import { isDocsOnboardingPathname } from '@/utils/docs/onboardingPath'

interface ChatbaseClientProps {
  className?: string
  userId?: string
  userHash?: string
  disableFloatingMessages?: boolean
}

async function fetchUserHash(): Promise<{ userId: string; userHash: string } | null> {
  try {
    const res = await fetch('/api/chatbase-hash/', {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export default function ChatbaseClient({
  className,
  userId,
  userHash,
  disableFloatingMessages,
}: ChatbaseClientProps) {
  const isInitialized = useRef(false)
  const [shouldLoadScript, setShouldLoadScript] = useState(false)
  const pathname = usePathname()
  const isOnboarding = isDocsOnboardingPathname(pathname)

  useEffect(() => {
    // Ensure we're running in a browser environment
    if (typeof window === 'undefined') {
      console.log('Window object not available, skipping Chatbase initialization')
      return
    }

    if (isOnboarding) {
      console.log('Skipping Chatbase initialization due to onboarding path')
      return
    }

    // Prevent multiple initializations
    if (isInitialized.current) return
    isInitialized.current = true

    const initChatbase = async () => {
      // Get user information
      const anonymousId = getOrCreateAnonymousId()
      const storedUserId = getUserId()

      // Sync anonymous ID to cookie so server can access it for hash generation
      if (anonymousId) {
        document.cookie = `app_anonymous_id=${encodeURIComponent(anonymousId)}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
      }

      // If no server-provided hash, try to fetch it
      let finalUserId = userId || anonymousId
      let finalUserHash = userHash

      if (!finalUserHash && anonymousId) {
        const hashData = await fetchUserHash()
        if (hashData) {
          finalUserId = hashData.userId
          finalUserHash = hashData.userHash
        }
      }

      // Set up Chatbase configuration BEFORE loading the script
      if (finalUserId) {
        const userMetadata: Record<string, string> = {}

        // Add email to metadata if available
        if (storedUserId) {
          userMetadata.email = storedUserId

          // Extract company from email domain
          const company = extractGroupIdFromEmail(storedUserId)
          if (company) {
            userMetadata.company = company
          }
        }

        // Configure Chatbase with identity verification if hash is available
        if (finalUserHash) {
          window.chatbaseUserConfig = {
            user_id: finalUserId,
            user_hash: finalUserHash,
            user_metadata: userMetadata,
          }
        } else {
          // Fallback without identity verification
          window.chatbaseUserConfig = {
            user_id: finalUserId,
            user_metadata: userMetadata,
          }
        }
      } else {
        console.log('No user ID available for Chatbase configuration')
      }

      if (disableFloatingMessages) {
        window.chatbaseConfig = {
          ...(window.chatbaseConfig || {}),
          showFloatingInitialMessages: false,
        }
      }

      // Initialize Chatbase exactly as provided in the embed script
      if (!window.chatbase || window.chatbase('getState') !== 'initialized') {
        window.chatbase = (...args: any[]) => {
          if (!window.chatbase.q) {
            window.chatbase.q = []
          }
          window.chatbase.q.push(args)
        }

        window.chatbase = new Proxy(window.chatbase, {
          get(target: any, prop: string | symbol) {
            if (prop === 'q') {
              return target.q
            }
            return (...args: any[]) => target(prop, ...args)
          },
        })
      }

      // Trigger script loading
      setShouldLoadScript(true)
    }

    initChatbase()
  }, [disableFloatingMessages, isOnboarding, userId, userHash])

  const handleScriptLoad = () => {
    console.log('Chatbase script loaded successfully')
  }

  const handleScriptError = (error: Error) => {
    console.error('Failed to load Chatbase script:', error)
  }

  return (
    <>
      {shouldLoadScript && (
        <Script
          src="https://www.chatbase.co/embed.min.js"
          id="ZXMN63dnzm9r1LEY0He6U"
          strategy="lazyOnload"
          onLoad={handleScriptLoad}
          onError={handleScriptError}
          data-domain="www.chatbase.co"
        />
      )}
    </>
  )
}

// Extend the Window interface to include Chatbase types
declare global {
  interface Window {
    chatbase: any & {
      setInitialMessages?: (messages: string[]) => void
    }
    chatbaseUserConfig?: {
      user_id: string
      user_hash?: string
      user_metadata?: Record<string, string>
    }
    chatbaseConfig?: {
      showFloatingInitialMessages?: boolean
      [key: string]: unknown
    }
  }
}
