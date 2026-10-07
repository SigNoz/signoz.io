import { TestimonialCardProps } from './TestimonialCard.types'
import { Card } from '@/components/ui/Card'
import Image from 'next/image'
import GridLayout from '../GridLayout'
import { TESTIMONIALS } from './TestimonialCard.constants'

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  testimonial,
  image,
  className = '',
}) => {
  return (
    <Card
      className={`[&>*]:border-1 bg-[var(--l2-background)] p-0 [&>*]:border-solid ${className}`}
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-4">
          <Image src={image} alt={name} width={48} height={48} className="rounded-full" />
          <div>
            <h3 className="mb-0 font-medium text-[var(--l1-foreground)]">{name}</h3>
            <p className="mb-0 text-sm text-[var(--l2-foreground)]">{role}</p>
          </div>
        </div>
        <p className="mb-0 text-[var(--l1-foreground)]">{testimonial}</p>
      </div>
    </Card>
  )
}

export interface TestimonialCardGridProps {
  /** When true, excludes the last card from the grid */
  excludeLastCard?: boolean
}

export const TestimonialCardGrid: React.FC<TestimonialCardGridProps> = ({
  excludeLastCard = false,
}) => {
  const testimonials = excludeLastCard ? TESTIMONIALS.slice(0, -1) : TESTIMONIALS
  return (
    <GridLayout cols={2} className="gap-8 px-0 md:px-32">
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </GridLayout>
  )
}

export default TestimonialCardGrid
