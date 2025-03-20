import React from 'react'
import { trackClick } from '../../utils/analytics'

export enum BUTTON_TYPES {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY'
}

const TYPE_TO_STYLES_MAP = {
  [BUTTON_TYPES.PRIMARY]: 'h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 bg-signoz_robin-500 text-center font-medium leading-5 text-white no-underline outline-none hover:text-white',
  [BUTTON_TYPES.SECONDARY]: 'h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white'
}

interface ButtonProps {
  children: React.ReactNode;
  type?: BUTTON_TYPES;
  className?: string;
  // Optional tracking params
  clickType?: string;
  clickName?: string;
  clickLocation?: string;
  clickText?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  [key: string]: any;
}

function Button(props: ButtonProps) {
  const { 
    children, 
    type = BUTTON_TYPES.PRIMARY, 
    className = '', 
    clickType,
    clickName,
    clickLocation,
    clickText,
    onClick,
    ...rest 
  } = props
  
  const style = `${TYPE_TO_STYLES_MAP[type]} ${className}`;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Track click if tracking params are provided
    if (clickType && clickName && clickText && clickLocation) {
      trackClick(
        clickType,
        clickName,
        clickText,
        clickLocation,
        window.location.pathname || ''
      )
    }
    
    // Call the original onClick handler if provided
    if (onClick) {
      onClick(event)
    }
  }

  return (
    <button className={style} onClick={handleClick} {...rest}>
      {children}
    </button>
  )
}

Button.TYPES = BUTTON_TYPES

export default Button