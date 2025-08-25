'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import * as Sentry from '@sentry/nextjs';
import { detectBotFromUserAgent } from '@/utils/logEvent'
import DOMPurify from 'dompurify';

function snapshotSanitizedSSR(): string | null {
  try {
    if (typeof document === 'undefined') return null;

    // Clone current body and strip dangerous elements
    const bodyClone = document.body.cloneNode(true) as HTMLElement;
    bodyClone.querySelectorAll('script, object, embed, iframe').forEach((n) => n.remove());
    bodyClone.querySelectorAll('link[rel="modulepreload"], link[as="script"]').forEach((n) => n.remove());
    
    const html = bodyClone.innerHTML || '';
    
    if (html.trim().length === 0) return null;
    
    // Sanitize with DOMPurify for enhanced security
    const sanitized = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
        'a', 'img', 'ul', 'ol', 'li', 'br', 'strong', 'em', 'b', 'i',
        'article', 'section', 'nav', 'header', 'footer', 'main', 'aside',
        'table', 'thead', 'tbody', 'tr', 'td', 'th', 'code', 'pre',
        'blockquote', 'figure', 'figcaption', 'time', 'small'
      ],
      ALLOWED_ATTR: [
        'class', 'id', 'href', 'src', 'alt', 'title', 'role', 
        'aria-label', 'aria-labelledby', 'aria-describedby',
        'data-testid', 'data-id', 'width', 'height'
      ],
      FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'form', 'input', 'button', 'select', 'textarea'],
      FORBID_ATTR: ['onload', 'onclick', 'onerror', 'onmouseover', 'onmouseout', 'onfocus', 'onblur', 'style'],
      KEEP_CONTENT: true // Keep text content even if wrapper is removed
    });
    
    return sanitized.trim().length > 0 ? sanitized : null;
  } catch {
    return null;
  }
}

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }, reset: () => void }) {
  const preservedRef = useRef<string | null>(null);
  if (preservedRef.current === null) {
    // Attempt to grab SSR HTML immediately
    preservedRef.current = snapshotSanitizedSSR();
  }

  const [showOverlay, setShowOverlay] = useState(true);

  // Overlay is not shown for bot requests, using the same bot detection as in middleware.ts
  const isBotUA = (() => {
    if (typeof navigator === 'undefined') return false
    const { isBot } = detectBotFromUserAgent(navigator.userAgent || '')
    return isBot
  })();

  useEffect(() => {
    try {
      Sentry.withScope((scope) => {
        scope.setTag('errorBoundary', 'global')
        scope.setTag('severity', 'critical')
        scope.setLevel('fatal')
        if (typeof window !== 'undefined') {
          scope.setContext('browser', {
            url: window.location.href,
            userAgent: window.navigator.userAgent,
            preservedSSR: preservedRef.current,
          })
        }
        scope.setContext('error', {
          name: error.name,
          message: error.message,
          fullError: error,
        })
        Sentry.captureException(error)
      })
    } catch (_) { /* cannot do much if Sentry fails */ }
  }, [error])

  const hasPreserved = Boolean(preservedRef.current && preservedRef.current.length > 200);

  // Memoize the sanitized HTML to avoid re-processing
  const sanitizedHTML = useMemo(() => {
    if (!preservedRef.current) return '';
    return preservedRef.current; // Already sanitized in snapshotSanitizedSSR
  }, []);

  return (
    <html lang="en">
      <head>
        <title>SigNoz | The Open Source Datadog Alternative</title>
        <meta
          name="description"
          content="SigNoz is an open-source observability tool powered by OpenTelemetry. Get APM, logs, traces, metrics, exceptions, & alerts in a single tool."
        />
        <meta property="og:title" content="SigNoz | The Open Source Datadog Alternative" />
        <meta
          property="og:description"
          content="SigNoz is an open-source observability tool powered by OpenTelemetry. Get APM, logs, traces, metrics, exceptions, & alerts in a single tool."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SigNoz | The Open Source Datadog Alternative" />
        <meta
          name="twitter:description"
          content="SigNoz is an open-source observability tool powered by OpenTelemetry. Get APM, logs, traces, metrics, exceptions, & alerts in a single tool."
        />
      </head>
      <body style={{
        background: '#111113', color: '#f3f4f6', margin: 0, padding: 0, fontFamily: 'system-ui,sans-serif', minHeight: '100vh', maxHeight: 'fit-content'
      }}>
        {hasPreserved && showOverlay && !isBotUA && (
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100000,
            backgroundColor: 'rgba(249, 115, 22, 0.95)', color: '#fff', padding: '10px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderTop: '2px solid #ea580c', boxShadow: '0 -8px 24px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 22, height: 22, background: '#fff', color: '#f97316', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>!</div>
              <div><strong>Resource loading issue.</strong> The page below is server-rendered and still readable.</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => (typeof window !== 'undefined' ? window.location.reload() : reset())} style={{ background: '#fff', color: '#f97316', border: 'none', borderRadius: 6, padding: '6px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Reload</button>
              <button onClick={() => setShowOverlay(false)} style={{ background: 'transparent', color: '#fff', border: '1px solid #fff', borderRadius: 6, padding: '6px 10px', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Dismiss</button>
            </div>
          </div>
        )}

        {hasPreserved ? (
          <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
        ) : (
          <div style={{
            margin: 'auto', maxWidth: 560, padding: 32, background: '#1e1f24',
            borderRadius: 16, border: '1px solid #30323a', boxShadow: '0 24px 48px #000a'
          }}>
            <div style={{ fontSize: 48, marginBottom: 18 }}>🚨</div>
            <h1 style={{ fontSize: 28, marginBottom: 12 }}>Critical Application Error</h1>
            <p style={{ color: '#9ca3af', marginBottom: 12 }}>
              The application failed to initialize due to a critical error. Server-rendered content may be unavailable.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 16 }}>
              <button
                onClick={() => (typeof window !== 'undefined' ? window.location.reload() : reset())}
                style={{
                  background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8,
                  padding: '10px 16px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                Reload
              </button>
              <button
                onClick={() => (typeof window !== 'undefined' ? (window.location.href = '/') : reset())}
                style={{
                  background: 'transparent', color: '#9ca3af', border: '1px solid #4b5563', borderRadius: 8,
                  padding: '10px 16px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                Go Home
              </button>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
