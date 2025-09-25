'use client'

import React, { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { getOrCreateAnonymousId, getUserId, extractGroupIdFromEmail } from '@/utils/userUtils'

interface ChatbaseClientProps {
  className?: string
  userId?: string
  userHash?: string
  disableFloatingMessages?: boolean
}

/**
 * Client component that loads the Chatbase embed script and handles identity verification
 */
export default function ChatbaseClient({
  className,
  userId,
  userHash,
  disableFloatingMessages,
}: ChatbaseClientProps) {
  const isInitialized = useRef(false)
  const [shouldLoadScript, setShouldLoadScript] = useState(false)

  useEffect(() => {
    // Ensure we're running in a browser environment
    if (typeof window === 'undefined') {
      console.log('Window object not available, skipping Chatbase initialization')
      return
    }

    // Prevent multiple initializations
    if (isInitialized.current) return
    isInitialized.current = true

    // Get user information
    const anonymousId = getOrCreateAnonymousId()
    const storedUserId = getUserId()

    // Use server-provided userId/hash if available, otherwise use client-side data
    const finalUserId = userId || anonymousId

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
      if (userHash) {
        window.chatbaseUserConfig = {
          user_id: finalUserId,
          user_hash: userHash,
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
  }, [disableFloatingMessages, userId, userHash])

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
          strategy="afterInteractive"
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
