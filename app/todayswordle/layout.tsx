import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProviders } from '../theme-providers'
import { Suspense, ReactNode } from 'react'
import { GrowthBookProvider } from '@/components/GrowthBookProvider'
import { AnonymousIdSetter } from '../anonymous-id-setter'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SigNoz Wordle',
  description: 'Play the SigNoz Wordle game!',
}

export default function WordleLayout({ children }: { children: ReactNode }) {
  return (
    <body className="text-white antialiased">
      <AnonymousIdSetter />
      <ThemeProviders>
        <GrowthBookProvider>
          <Suspense>
            {children}
          </Suspense>
        </GrowthBookProvider>
      </ThemeProviders>
    </body>
  )
} 