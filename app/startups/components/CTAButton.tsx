'use client'

import React from 'react'
import Button from '@/components/Button/Button'

export default function CTAButton() {
  const scrollToForm = () => {
    // Scroll to the top of the page where the form is located
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Button
      onClick={scrollToForm}
      className="rounded-md px-6 py-2 font-medium text-white hover:opacity-90"
    >
      Apply Now
    </Button>
  )
}
