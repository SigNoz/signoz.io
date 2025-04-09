import { lazy, useEffect } from 'react'

// Performance monitoring utility
export const measurePerformance = (metricName: string) => {
  if (typeof window === 'undefined') return

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      // Log to analytics or monitoring service
      console.log(`${metricName}:`, entry)

      // You can send this data to your analytics service
      if (window.gtag) {
        window.gtag('event', 'performance_metric', {
          metric_name: metricName,
          value: entry.startTime,
          duration: entry.duration,
        })
      }
    })
  })

  observer.observe({ entryTypes: ['measure'] })
  return observer
}

// Resource hints for preloading critical assets
export const addResourceHints = () => {
  if (typeof document === 'undefined') return

  const hints = [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: 'anonymous',
    },
  ]

  hints.forEach((hint) => {
    const link = document.createElement('link')
    Object.entries(hint).forEach(([key, value]) => {
      link.setAttribute(key, value)
    })
    document.head.appendChild(link)
  })
}

// Lazy loading utility
export const lazyLoadComponent = (importFunc: () => Promise<any>) => {
  return {
    component: lazy(importFunc),
    preload: () => {
      const component = importFunc()
      return component
    },
  }
}

// Intersection Observer hook for lazy loading
export const useIntersectionObserver = (
  callback: () => void,
  options: IntersectionObserverInit = {}
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback()
          observer.unobserve(entry.target)
        }
      })
    }, options)

    return () => observer.disconnect()
  }, [callback, options])
}

// Cache control utility
export const setCacheControl = (res: any, maxAge: number = 31536000) => {
  res.setHeader(
    'Cache-Control',
    `public, max-age=${maxAge}, s-maxage=${maxAge}, stale-while-revalidate=59`
  )
}

// Performance budget checker
export const checkPerformanceBudget = (metric: string, value: number) => {
  const budgets: Record<string, number> = {
    'First Contentful Paint': 1800, // 1.8s
    'Largest Contentful Paint': 2500, // 2.5s
    'First Input Delay': 100, // 100ms
    'Cumulative Layout Shift': 0.1, // 0.1
  }

  if (budgets[metric] && value > budgets[metric]) {
    console.warn(`Performance budget exceeded for ${metric}: ${value}ms`)
    // You can implement additional reporting here
  }
}
