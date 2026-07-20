import React from 'react'
import Link from 'next/link'
import { Button } from '@signozhq/ui/button'
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
    <Button asChild variant="solid" color="primary" className={className}>
      <Link href={href} className="flex items-center gap-2 no-underline hover:no-underline">
        {children} <ArrowRight size={14} />
      </Link>
    </Button>
  )
}

export default GetStartedOpenTelemetryButton
