'use client'

import React, { Component, ReactNode } from 'react'
import { AlertTriangle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Features Showcase Error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-signoz_slate-400/10 bg-signoz_ink-300/10">
            <div className="flex flex-col items-center gap-4 text-center">
              <AlertTriangle className="h-12 w-12 text-signoz_sakura-500" />
              <div>
                <h3 className="text-lg font-medium text-signoz_vanilla-400">
                  Something went wrong
                </h3>
                <p className="mt-2 text-sm text-signoz_vanilla-600">
                  Unable to load the features showcase. Please try refreshing the page.
                </p>
              </div>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}