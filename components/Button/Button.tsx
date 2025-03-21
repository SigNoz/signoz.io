import React from 'react'

export enum BUTTON_TYPES {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

const TYPE_TO_STYLES_MAP = {
  [BUTTON_TYPES.PRIMARY]:
    'h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 bg-signoz_robin-500 text-center font-medium leading-5 text-white no-underline outline-none hover:text-white',
  [BUTTON_TYPES.SECONDARY]:
    'h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white',
}

function Button(props) {
  const { children, type = BUTTON_TYPES.PRIMARY, className = '', ...rest } = props
  const style = `${TYPE_TO_STYLES_MAP[type]} ${className}`

  return (
    <button className={style} {...rest}>
      {children}
    </button>
  )
}

Button.TYPES = BUTTON_TYPES

export default Button
