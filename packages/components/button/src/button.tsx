import React from 'react'
import { useMergeRefs } from '@paragon-ui/use-merge-refs'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isToggleActive?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<ButtonProps>>(
  ({ children, ...theirProps }, forwardedRef) => {
    const ourProps = {
      'aria-disabled': theirProps.disabled,
      'aria-pressed': theirProps.disabled ? undefined : theirProps.isToggleActive,
    } as ButtonProps
    const buttonRef = React.useRef<HTMLButtonElement>(null)

    return (
      <button
        ref={useMergeRefs(buttonRef, forwardedRef)}
        {...ourProps}
        {...theirProps}
        data-element="button"
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'ParagonButton'
