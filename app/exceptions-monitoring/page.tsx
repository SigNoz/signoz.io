import React from 'react'
import Exceptions from './Exceptions'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    absolute: 'Exceptions Monitoring | SigNoz',
  },
  openGraph: {
    title: 'Exceptions Monitoring | SigNoz',
    description: 'Monitor exceptions automatically in Python, Java, Ruby, and Javascript. For other languages, just drop in a few lines of code and start monitoring exceptions.',
    images:"/img/features/exceptions/exceptions-overview.webp"
  },
  description:
    'Monitor exceptions automatically in Python, Java, Ruby, and Javascript. For other languages, just drop in a few lines of code and start monitoring exceptions.',
  twitter:{
    title: 'Exceptions Monitoring | SigNoz',
    description: 'Monitor exceptions automatically in Python, Java, Ruby, and Javascript. For other languages, just drop in a few lines of code and start monitoring exceptions.',
    images:"/img/features/exceptions/exceptions-overview.webp",
  }
}

export default function ExceptionsPage() {
  return <Exceptions />
}