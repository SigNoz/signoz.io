'use client'

import React from 'react'

export default function CTAButton() {
  const scrollToForm = () => {
    // Scroll to the top of the page where the form is located
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToForm}
      className="rounded-md bg-gradient-to-r from-[#BE6BF1] to-[#4568DC] px-6 py-2 font-medium text-white hover:opacity-90"
    >
      Apply Now
    </button>
  )
}
