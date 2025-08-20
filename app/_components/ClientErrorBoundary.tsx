"use client";
import React from "react";

interface ClientErrorBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

interface ClientErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ClientErrorBoundary extends React.Component<
  ClientErrorBoundaryProps,
  ClientErrorBoundaryState
> {
  constructor(props: ClientErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ClientErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error to console for debugging
    console.error("ClientErrorBoundary caught an error:", error, errorInfo);
    
    // Check if it's a chunk loading error
    const isChunkError = 
      error.message?.includes('Loading chunk') ||
      error.message?.includes('Failed to fetch dynamically imported module') ||
      error.message?.includes('ChunkLoadError') ||
      error.stack?.includes('webpack');
    
    if (isChunkError) {
      console.log("Detected chunk loading error - displaying fallback UI");
    }
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback !== undefined) {
        return <>{this.props.fallback}</>;
      }
      
      // Default fallback for chunk errors - null to hide the broken component
      return null;
    }

    return this.props.children;
  }
}