'use client'

import React from 'react'
import Button from '@/components/ui/Button'

export default function CTAButton() {
  const scrollToForm = () => {
    // Scroll to the top of the page where the form is located
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Button variant="default" onClick={scrollToForm}>
      Apply Now
    </Button>
  )
}
