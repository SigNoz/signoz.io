import React from 'react'
import ProductPopoverContent from './ProductPopoverContent'
import ResourcesPopoverContent from './ResourcesPopoverContent'
import AuthButtons from './AuthButtons'

export default function TopNavStaticContent() {
  return (
    <div className='sr-only'>
      <ProductPopoverContent />
      <ResourcesPopoverContent />
      <AuthButtons />
    </div>
  )
} 