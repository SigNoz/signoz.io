import { TestimonialCardProps } from "./TestimonialCard.types"
import { Card } from "@/components/ui/Card"
import Image from "next/image"
import GridLayout from "../GridLayout"
import { TESTIMONIALS } from "./TestimonialCard.constants"

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, 
  role, 
  testimonial, 
  image, 
  className = '' 
}) => {
  return (
    <Card className={`p-0 [&>*]:border-1 [&>*]:border-solid ${className}`}>
      <div className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-4">
          <Image 
            src={image} 
            alt={name} 
            width={48} 
            height={48} 
            className="rounded-full"
          />
          <div>
            <h3 className="text-signoz_vanilla-100 font-medium mb-0">{name}</h3>
            <p className="text-signoz_vanilla-400 text-sm mb-0">{role}</p>
          </div>
        </div>
        <p className="text-signoz_vanilla-100 mb-0">{testimonial}</p>
      </div>
    </Card>
  )
}

export const TestimonialCardGrid: React.FC = () => {
  return (
    <GridLayout cols={2} className="px-20 gap-8">
      {TESTIMONIALS.map((testimonial, index) => (
        <TestimonialCard key={index} {...testimonial} />
      ))}
    </GridLayout>
  )
}

export default TestimonialCardGrid