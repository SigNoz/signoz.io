import Button from "@/components/ui/Button"
import { ArrowRight } from "lucide-react"
import { ButtonGroupProps } from "./ButtonGroup.types"

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 md:flex-row ${className}`}>
      {buttons.map((button, index) => (
        <Button 
          key={index}
          to={button.href}
          variant={button.variant} 
          rounded="full" 
          className={`flex items-center gap-2 !w-fit ${button.className || ''}`}
        >
          {button.text}
          {button.icon || <ArrowRight size={14} />}
        </Button>
      ))}
    </div>
  )
}

export default ButtonGroup