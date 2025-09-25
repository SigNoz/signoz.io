import React from 'react'
import { cookies } from 'next/headers'
import { generateUserHash } from '@/utils/userUtils'
import ChatbaseClient from './ChatbaseClient'
import ChatbaseCookieSync from './ChatbaseCookieSync'

interface ChatbaseServerProps {
  className?: string
  disableFloatingMessages?: boolean
}

/**
 * Server component that handles Chatbase identity verification
 * Generates the user hash on the server and passes it to the client component
 */
export default async function ChatbaseServer({
  className,
  disableFloatingMessages,
}: ChatbaseServerProps) {
  // Get the secret key from environment variables
  const secret = process.env.CHATBASE_SECRET_KEY

  if (!secret) {
    console.warn('CHATBASE_SECRET_KEY not found in environment variables')
    return (
      <>
        <ChatbaseCookieSync />
        <ChatbaseClient
          className={className}
          disableFloatingMessages={disableFloatingMessages}
        />
      </>
    )
  }

  // Get anonymous ID from cookies (set by the client)
  const cookieStore = cookies()
  const anonymousIdCookie = cookieStore.get('app_anonymous_id')
  const anonymousId = anonymousIdCookie?.value

  if (!anonymousId) {
    // If no anonymous ID is available, render without identity verification
    // The cookie sync component will set the cookie on the client side
    return (
      <>
        <ChatbaseCookieSync />
        <ChatbaseClient
          className={className}
          disableFloatingMessages={disableFloatingMessages}
        />
      </>
    )
  }

  // Generate the user hash for identity verification
  const userHash = generateUserHash(anonymousId, secret)

  return (
    <>
      <ChatbaseCookieSync />
      <ChatbaseClient
        className={className}
        userId={anonymousId}
        userHash={userHash}
        disableFloatingMessages={disableFloatingMessages}
      />
    </>
  )
}
