'use client'

import React from 'react'
import { ErrorBoundary, FallbackProps } from 'react-error-boundary'

// Fallback component that renders children without analytics
function AnalyticsFallback({ resetErrorBoundary }: FallbackProps) {
  return null // Don't render anything, just allow the app to continue
}

// Error handler component
function AnalyticsErrorHandler({ error }: { error: Error }) {
  // Log the error to your error reporting service
  console.error('Analytics Error:', error)
  return null // Don't render anything, just log the error
}

export function AnalyticsErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={AnalyticsFallback}
      onError={(error) => {
        // Additional error handling if needed
        console.error('Analytics Error Boundary caught an error:', error)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
