import 'css/tailwind.css'
import 'css/global.css'

import { GoogleTagManager } from '@next/third-parties/google'
import { SearchProvider, SearchConfig } from 'pliny/search'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import MainFooter from '@/components/mainFooter'
import TopNav from '@/components/TopNav/TopNav'
import { Inter } from 'next/font/google'
import React, { Suspense } from 'react'
import PageViewTracker from '@/components/Analytics/PageViewTracker'
import { GrowthBookProvider } from '@/components/GrowthBookProvider'
import { AnonymousIdSetter } from './anonymous-id-setter'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
    description: siteMetadata.description,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={siteMetadata.language} className={inter.className} suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-N9B6D4H" />
      <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="48x48" href="/static/favicons/favicon-48x48.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/static/favicons/favicon-96x96.png" />
      <link
        rel="icon"
        type="image/png"
        sizes="144x144"
        href="/static/favicons/favicon-144x144.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="152x152"
        href="/static/favicons/favicon-152x152.png"
      />
      <link rel="icon" type="image/svg+xml" href="/static/favicons/favicon.svg" />
      <link rel="shortcut icon" href="/static/favicons/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/static/favicons/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-title" content="SigNoz" />
      <link rel="manifest" href="/static/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

      <body className="pl-[calc(100vw-100%)] text-white antialiased">
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N9B6D4H"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <AnonymousIdSetter />

        <ThemeProviders>
          <GrowthBookProvider>
            <Suspense>
              <SectionContainer>
                <div className="relative flex h-screen flex-col justify-between ">
                  <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                    <TopNav />
                    <main className="mb-auto mt-[48px]">{children}</main>
                  </SearchProvider>
                  <MainFooter />
                </div>
              </SectionContainer>
            </Suspense>
          </GrowthBookProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
