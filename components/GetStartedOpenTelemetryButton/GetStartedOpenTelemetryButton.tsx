import React from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ArrowRight } from 'lucide-react'

interface GetStartedOpenTelemetryButtonProps {
  href?: string
  className?: string
  children?: React.ReactNode
}

const GetStartedOpenTelemetryButton: React.FC<GetStartedOpenTelemetryButtonProps> = ({
  href = '/teams/',
  className = '',
  children = 'Get Started with OpenTelemetry',
}) => {
  return (
    <Button asChild variant="default" className={className}>
      <Link href={href}>
        {children}
        <ArrowRight size={14} />
      </Link>
    </Button>
  )
}

export default GetStartedOpenTelemetryButton
