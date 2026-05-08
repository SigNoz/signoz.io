import { MIN_LOG_VALUE } from './constants'

// Transform linear slider value to logarithmic scale (floor is MIN_LOG_VALUE from constants).
export const linearToLog = (value: number, maxLog: number) => {
  if (value === 0) return 0
  const minValue = Math.log(MIN_LOG_VALUE)
  const maxValue = Math.log(maxLog)
  const scale = (maxValue - minValue) / (maxLog - MIN_LOG_VALUE)
  return Math.round(Math.exp(minValue + scale * (value - MIN_LOG_VALUE)))
}

// Transform logarithmic value back to linear scale for slider
export const logToLinear = (value: number, maxLog: number) => {
  if (value === 0) return 0
  const minValue = Math.log(MIN_LOG_VALUE)
  const maxValue = Math.log(maxLog)
  const scale = (maxLog - MIN_LOG_VALUE) / (maxValue - minValue)
  return Math.round(MIN_LOG_VALUE + scale * (Math.log(value) - minValue))
}
