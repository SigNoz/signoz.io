import React from 'react'
import { ArrowUpRight } from 'lucide-react'

export enum BUTTON_TYPES {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
}

const TYPE_TO_STYLES_MAP = {
  [BUTTON_TYPES.PRIMARY]:
    'homepage-button homepage-button--primary h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 bg-signoz_robin-500 text-center font-medium leading-5 text-white no-underline outline-none hover:text-white',
  [BUTTON_TYPES.SECONDARY]:
    'homepage-button homepage-button--secondary h-10 pr-3 pl-4 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-1.5 button-background text-center font-medium leading-5 text-white no-underline outline-none hover:text-white',
}

const TYPE_TO_ICON_STYLES_MAP = {
  [BUTTON_TYPES.PRIMARY]: 'homepage-button__icon--primary',
  [BUTTON_TYPES.SECONDARY]: 'homepage-button__icon--secondary',
}

function Button(props) {
  const {
    as: Component = 'button',
    children,
    type = BUTTON_TYPES.PRIMARY,
    className = '',
    ...rest
  } = props
  const style = `${TYPE_TO_STYLES_MAP[type]} ${className}`

  return (
    <Component className={style} {...rest}>
      <span className="homepage-button__label flex min-w-0 items-center justify-center gap-1.5">
        {children}
      </span>
      <span
        className={`homepage-button__icon hidden ${TYPE_TO_ICON_STYLES_MAP[type]}`}
        aria-hidden="true"
      >
        <ArrowUpRight size={16} strokeWidth={2.5} />
      </span>
    </Component>
  )
}

Button.TYPES = BUTTON_TYPES

export default Button
