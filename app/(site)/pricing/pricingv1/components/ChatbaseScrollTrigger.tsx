'use client'

import { useEffect, useRef, useState } from 'react'

// Extend the Window interface to include Chatbase types for this component
declare global {
  interface Window {
    chatbase: any & {
      setInitialMessages?: (messages: string[]) => void
      open?: () => void
    }
  }
}

interface ChatbaseScrollTriggerProps {
  triggerElementId: string
  messages: string[]
}

/**
 * Client component that handles Chatbase scroll triggers and bubble animations
 */
export default function ChatbaseScrollTrigger({
  triggerElementId,
  messages,
}: ChatbaseScrollTriggerProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const [hasTriggeredMessage, setHasTriggeredMessage] = useState(false)
  const retryCountRef = useRef(0)
  const maxRetries = 5 // Maximum number of retries
  const maxWaitTime = 30000 // Maximum wait time (30 seconds)
  const startTime = useRef<number>(Date.now())

  // Function to check if Chatbase is loaded and available
  const isChatbaseLoaded = (): boolean => {
    return (
      typeof window !== 'undefined' &&
      window.chatbase &&
      typeof window.chatbase.setInitialMessages === 'function'
    )
  }

  // Function to add a persistent pulsating dot near the chat widget
  const addPersistentPulsingDot = () => {
    // Only proceed if Chatbase is available (which means chat widget should exist)
    if (!isChatbaseLoaded()) {
      console.log('Chatbase not loaded, skipping pulse dot creation')
      return
    }

    try {
      // Check if dot already exists
      if (document.getElementById('signoz-chat-pulse-dot')) {
        console.log('Pulse dot already exists')
        return
      }

      // Look for the actual chat bubble button (not the message bubbles)
      const possibleSelectors = [
        // Look for iframe that contains the chat widget
        'iframe[src*="chatbase.co"]',
        'iframe[id*="chatbase"]',
        // Look for button elements
        'button[id*="chatbase"]',
        'div[role="button"][id*="chatbase"]',
        // Look for common chat bubble patterns
        '[data-testid*="chat"]',
        '[aria-label*="chat"]',
        '[title*="chat"]',
      ]

      let chatBubble: HTMLElement | null = null

      // First try the specific selectors
      for (const selector of possibleSelectors) {
        try {
          const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>
          // Filter for visible elements that are likely the chat bubble
          for (const element of elements) {
            const style = window.getComputedStyle(element)
            if (
              style.display !== 'none' &&
              style.visibility !== 'hidden' &&
              style.opacity !== '0'
            ) {
              chatBubble = element
              break
            }
          }
          if (chatBubble) break
        } catch (error) {
          console.warn(`Error checking selector ${selector}:`, error)
          continue
        }
      }

      // If still not found, look for any fixed position element in bottom right
      if (!chatBubble) {
        try {
          const allElements = document.querySelectorAll('*') as NodeListOf<HTMLElement>
          for (const element of allElements) {
            const style = window.getComputedStyle(element)
            const rect = element.getBoundingClientRect()

            // Look for elements positioned in bottom right corner that are visible and clickable
            if (
              style.position === 'fixed' &&
              rect.bottom > window.innerHeight - 200 &&
              rect.right > window.innerWidth - 200 &&
              rect.width > 30 &&
              rect.height > 30 &&
              style.display !== 'none' &&
              style.visibility !== 'hidden' &&
              (element.tagName === 'BUTTON' ||
                element.style.cursor === 'pointer' ||
                element.onclick)
            ) {
              chatBubble = element
              break
            }
          }
        } catch (error) {
          console.warn('Error searching for chat bubble in bottom right:', error)
        }
      }

      if (chatBubble) {
        // Create the pulsating dot element
        const pulseDot = document.createElement('div')
        pulseDot.id = 'signoz-chat-pulse-dot'

        // Get chat bubble position
        const rect = chatBubble.getBoundingClientRect()

        // Style the dot (positioned on the left top of the widget)
        pulseDot.style.cssText = `
          position: fixed;
          top: ${rect.top - 6}px;
          left: ${rect.left - 6}px;
          width: 8px;
          height: 8px;
          background-color: #3b82f6;
          border-radius: 50%;
          z-index: 9999;
          animation: signoz-pulse 2s ease-in-out infinite;
          pointer-events: none;
        `

        // Create the CSS animation if it doesn't exist
        if (!document.getElementById('signoz-pulse-animation')) {
          const style = document.createElement('style')
          style.id = 'signoz-pulse-animation'
          style.textContent = `
            @keyframes signoz-pulse {
              0%, 100% {
                opacity: 0.4;
                transform: scale(1);
              }
              50% {
                opacity: 1;
                transform: scale(1.2);
              }
            }
          `
          document.head.appendChild(style)
        }

        // Add the dot to the document
        document.body.appendChild(pulseDot)

        // Function to remove the dot
        const removeDot = () => {
          try {
            if (document.body.contains(pulseDot)) {
              document.body.removeChild(pulseDot)
              console.log('Pulse dot removed after chat widget click')
            }
          } catch (error) {
            console.warn('Error removing pulse dot:', error)
          }
        }

        // Add click listener to chat widget to remove dot
        const handleChatClick = () => {
          removeDot()
          // Remove the click listener after use
          try {
            chatBubble.removeEventListener('click', handleChatClick)
          } catch (error) {
            console.warn('Error removing chat click listener:', error)
          }
        }
        chatBubble.addEventListener('click', handleChatClick)

        // Update dot position when window resizes or chat bubble moves
        const updateDotPosition = () => {
          try {
            if (!chatBubble || !document.body.contains(chatBubble)) return
            const updatedRect = chatBubble.getBoundingClientRect()
            pulseDot.style.top = `${updatedRect.top - 6}px`
            pulseDot.style.left = `${updatedRect.left - 6}px`
          } catch (error) {
            console.warn('Error updating dot position:', error)
          }
        }

        // Listen for window resize
        window.addEventListener('resize', updateDotPosition)

        // Periodically check if chat bubble position changed
        const positionChecker = setInterval(() => {
          try {
            if (!document.body.contains(pulseDot) || !document.body.contains(chatBubble)) {
              clearInterval(positionChecker)
              window.removeEventListener('resize', updateDotPosition)
              chatBubble.removeEventListener('click', handleChatClick)
              return
            }
            updateDotPosition()
          } catch (error) {
            console.warn('Error in position checker:', error)
            clearInterval(positionChecker)
          }
        }, 1000)

        console.log('Created persistent pulsing dot near chat bubble:', pulseDot)
      } else {
        console.log(
          'Chat bubble not found for pulse dot. This is normal if Chatbase widget is not loaded.'
        )
      }
    } catch (error) {
      console.error('Failed to add pulsing dot near chat bubble:', error)
    }
  }

  // Function to trigger the Chatbase message and add visual attention to the bubble
  const triggerChatbaseMessage = () => {
    if (hasTriggeredMessage) return

    // Check if we've exceeded maximum retries or wait time
    const currentTime = Date.now()
    const elapsedTime = currentTime - startTime.current

    if (retryCountRef.current >= maxRetries || elapsedTime > maxWaitTime) {
      console.log('Chatbase loading timeout or max retries reached. Stopping attempts.')
      setHasTriggeredMessage(true) // Prevent further attempts
      return
    }

    if (isChatbaseLoaded()) {
      try {
        // Add a small delay to ensure Chatbase is fully loaded
        setTimeout(() => {
          if (window.chatbase?.setInitialMessages) {
            // Set the initial message that will appear when the chat opens
            window.chatbase.setInitialMessages(messages)

            // Add persistent pulsing dot near the chat widget
            addPersistentPulsingDot()

            setHasTriggeredMessage(true)
            console.log('Chatbase message set and bubble attention added')
          } else {
            console.warn('Chatbase setInitialMessages function not available')
            setHasTriggeredMessage(true) // Prevent infinite retries
          }
        }, 500)
      } catch (error) {
        console.error('Failed to trigger Chatbase message:', error)
        setHasTriggeredMessage(true) // Prevent infinite retries on error
      }
    } else {
      // Retry after a delay if Chatbase isn't loaded yet
      retryCountRef.current += 1
      console.log(`Chatbase not loaded yet. Retry ${retryCountRef.current}/${maxRetries}`)

      setTimeout(() => {
        if (!hasTriggeredMessage) {
          triggerChatbaseMessage()
        }
      }, 2000) // Increased delay between retries
    }
  }

  useEffect(() => {
    const triggerElement = document.getElementById(triggerElementId)
    if (!triggerElement) {
      console.warn(`Trigger element with ID "${triggerElementId}" not found`)
      return
    }

    try {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // When the trigger element leaves the viewport (scrolled past)
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
              triggerChatbaseMessage()
            }
          })
        },
        {
          // Trigger when the section is completely out of view
          threshold: 0,
          rootMargin: '0px 0px -100px 0px',
        }
      )

      observerRef.current.observe(triggerElement)
    } catch (error) {
      console.error('Failed to set up intersection observer:', error)
    }

    return () => {
      try {
        if (observerRef.current && triggerElement) {
          observerRef.current.unobserve(triggerElement)
        }
      } catch (error) {
        console.warn('Error cleaning up intersection observer:', error)
      }
    }
  }, [triggerElementId, messages, hasTriggeredMessage])

  // This component doesn't render anything visible
  return null
}
