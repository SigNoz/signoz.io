import * as React from 'react'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'

import Button from '@/components/ui/Button'
import { cn } from 'app/lib/utils'

interface GetStartedProps {
  page: string
  className?: string
}

const GetStarted: React.FC<GetStartedProps> = ({ page, className }) => {
  const getStartedId = `btn-get-started-${page}-bottom`
  const readDocumentationId = `btn-read-documentation-${page}-bottom`

  return (
    <div className={cn('w-full font-medium', className)}>
      <div className="bg-heading-dot-grid bg-[length:45%] bg-[center_top_-12rem] sm:bg-no-repeat">
        <div className="bg-blur-ellipse-206">
          <div className="flex flex-col gap-12">
            <p className="mb-0 mt-20 text-center text-4xl font-bold">
              Get started with <br /> SigNoz Cloud today
            </p>
            <div className="mb-10 flex items-center justify-center gap-3 pt-4 max-sm:flex-col">
              <Button asChild size="lg" id={getStartedId}>
                <Link href="/teams/">
                  Get Started - Free
                  <ArrowRight size={16} />
                </Link>
              </Button>

              <Button asChild size="lg" variant="secondary" id={readDocumentationId}>
                <Link href="/docs/introduction/">
                  <BookOpen size={16} />
                  Read Documentation
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <img
              src="/img/landing/landing_thumbnail.webp"
              alt="SigNoz dashboard with application performance metrics - Launch Week"
              className="z-[0] -mb-36 w-3/5 rounded-lg max-sm:-mb-8"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default GetStarted
