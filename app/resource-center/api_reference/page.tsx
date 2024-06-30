'use client'
import React, { useEffect } from 'react'
import { RedocStandalone } from 'redoc'

const fetchData = async () => {
  try {
    const res = await fetch('/api/openapi')
    return await res.json()
  } catch (error) {
    console.error('Error fetching reference api :', error)
  }
}

const REDOC_OPTIONS = {
  scrollYOffset: 70,
  nativeScrollbars: true,

  theme: {
    colors: { primary: { main: '#4e74f8' }, text: { primary: '#fff' } },
    sidebar: {
      backgroundColor: '#18181b00',
      textColor: '#fff',
      level1Items: { activeTextColor: '#4e74f8' },
    },
    typography: {
      fontFamily: `"Inter", sans-serif`,
      headings: { fontFamily: `"Inter", sans-serif` },
    },
    rightPanel: { textColor: '#999' },
  },
}

export default function BlogHome() {
  const [spec, setSpec] = React.useState(undefined)

  useEffect(() => {
    const data = fetchData().then((res) => setSpec(res))
    return () => {
      setSpec(undefined)
    }
  }, [])

  return (
    <div className="container mx-auto py-4">
      <RedocStandalone spec={spec} options={REDOC_OPTIONS} />
    </div>
  )
}
