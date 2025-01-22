import React from 'react'
import Link from 'next/link'
import Button from '../Button/Button'
import { ArrowRight } from 'lucide-react'

interface GetStartedOpenTelemetryButtonProps {
  href?: string
  className?: string
  children?: React.ReactNode
}

const GetStartedOpenTelemetryButton: React.FC<GetStartedOpenTelemetryButtonProps> = ({ 
  href = '/teams/',
  className = '',
  children = 'Get Started with OpenTelemetry'
}) => {
  return (
    <Link href={href} className="no-underline hover:no-underline">
      <Button type={Button.TYPES.PRIMARY} className={`flex items-center gap-2 ${className}`}>
        {children} <ArrowRight size={14} />
      </Button>
    </Link>
  )
}
  
export default GetStartedOpenTelemetryButton 