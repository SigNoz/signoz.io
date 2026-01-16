'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface IngestionKeyContextType {
  ingestionKey: string | null
  setIngestionKey: (key: string | null) => void
}

const IngestionKeyContext = createContext<IngestionKeyContextType | undefined>(undefined)

export const IngestionKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ingestionKey, setIngestionKeyState] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const keyFromUrl = searchParams.get('ingestion_key')
    if (keyFromUrl) {
      setIngestionKeyState(keyFromUrl)

      // Remove from URL
      const current = new URLSearchParams(Array.from(searchParams.entries()))
      current.delete('ingestion_key')
      const search = current.toString()
      const query = search ? `?${search}` : ''

      // using replace to avoid history stack buildup
      router.replace(`${pathname}${query}`, { scroll: false })
    }
  }, [searchParams, pathname, router])

  const setIngestionKey = (key: string | null) => {
    setIngestionKeyState(key)
  }

  return (
    <IngestionKeyContext.Provider value={{ ingestionKey, setIngestionKey }}>
      {children}
    </IngestionKeyContext.Provider>
  )
}

export const useIngestionKey = () => {
  const context = useContext(IngestionKeyContext)
  if (context === undefined) {
    throw new Error('useIngestionKey must be used within a IngestionKeyProvider')
  }
  return context
}
