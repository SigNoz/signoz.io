'use client'

import React, { useEffect, useRef } from 'react'
import { getOrCreateAnonymousId, getUserId, extractGroupIdFromEmail } from '@/utils/userUtils'

interface ChatbaseClientProps {
  className?: string
  userId?: string
  userHash?: string
}

/**
 * Client component that loads the Chatbase embed script and handles identity verification
 */
export default function ChatbaseClient({ className, userId, userHash }: ChatbaseClientProps) {
  const isInitialized = useRef(false)

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

    // Load script function matching the exact embed code
    const onLoad = function () {
      const script = document.createElement('script')
      script.src = 'https://www.chatbase.co/embed.min.js'
      script.id = 'ZXMN63dnzm9r1LEY0He6U'
      script.setAttribute('domain', 'www.chatbase.co')

      script.onerror = (error) => {
        console.error('Failed to load Chatbase script:', error)
      }

      document.body.appendChild(script)
    }

    // Load script with more reliable timing
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // Document is already loaded or loading is complete
      onLoad()
    } else {
      // Document is still loading
      const loadHandler = () => {
        onLoad()
        window.removeEventListener('load', loadHandler)
      }

      window.addEventListener('load', loadHandler)

      // Fallback: load after a short delay if load event doesn't fire
      const fallbackTimeout = setTimeout(() => {
        onLoad()
        window.removeEventListener('load', loadHandler)
      }, 2000)

      // Cleanup function
      return () => {
        window.removeEventListener('load', loadHandler)
        clearTimeout(fallbackTimeout)
      }
    }
  }, [userId, userHash])

  // This component doesn't render any visible content
  return null
}

// Extend the Window interface to include Chatbase types
declare global {
  interface Window {
    chatbase: any
    chatbaseUserConfig?: {
      user_id: string
      user_hash?: string
      user_metadata?: Record<string, string>
    }
  }
}
