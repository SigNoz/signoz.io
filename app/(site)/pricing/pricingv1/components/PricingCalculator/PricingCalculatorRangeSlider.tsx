import { PricingRangeSlider } from '@/components/ui/PricingRangeSlider'
import { MAX_VALUE, MIN_VALUE } from './constants'

interface PricingCalculatorRangeSliderProps {
  value: number
  onChange: (value: number | number[]) => void
  color: 'secondary' | 'danger' | 'warning'
  minLabel: string
  maxLabel: string
  formatFunc: (value: number) => string
  thumbColor: string
  ariaLabel: string
  inputValue: string
}

export const PricingCalculatorRangeSlider: React.FC<PricingCalculatorRangeSliderProps> = ({
  value,
  onChange,
  color,
  minLabel,
  maxLabel,
  formatFunc,
  thumbColor,
  ariaLabel,
  inputValue,
}) => (
  <PricingRangeSlider
    value={value}
    onChange={onChange}
    min={MIN_VALUE}
    max={MAX_VALUE}
    step={0.01}
    color={color}
    minLabel={minLabel}
    maxLabel={maxLabel}
    tooltipText={value === 0 ? '0' : formatFunc(Number(inputValue))}
    thumbColorToken={thumbColor}
    aria-label={ariaLabel}
  />
)
