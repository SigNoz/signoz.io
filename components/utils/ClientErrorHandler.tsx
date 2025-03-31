'use client';

import { useEffect } from 'react';

export default function ClientErrorHandler() {
  useEffect(() => {
    const handleChunkLoadError = (event: Event | PromiseRejectionEvent) => {
      let error: Error | null = null;

      if (event instanceof ErrorEvent) {
        error = event.error;
      } else if ('reason' in event) {
        // Handle PromiseRejectionEvent
        error = event.reason;
      }

      if (error && /Loading( CSS)? chunk .* failed./i.test(error.message)) {
        console.warn('ChunkLoadError detected, reloading page...');
        window.location.reload();
      }
    };

    // Listen for general errors (might catch some loading errors)
    window.addEventListener('error', handleChunkLoadError);

    // Listen for unhandled promise rejections (often where dynamic import errors surface)
    window.addEventListener('unhandledrejection', handleChunkLoadError);

    return () => {
      window.removeEventListener('error', handleChunkLoadError);
      window.removeEventListener('unhandledrejection', handleChunkLoadError);
    };
  }, []);

  return null; // This component doesn't render anything
} 