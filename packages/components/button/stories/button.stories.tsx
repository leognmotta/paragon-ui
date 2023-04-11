import { useEffect, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../src/button'
import type { ButtonProps } from '../src/button'

import './button.css'

const meta: Meta<ButtonProps> = {
  title: 'Button/test',
  component: Button,
  decorators: [(story: Function) => <div>{story()}</div>],
}

const ToggleButton = ({ children, isToggleActive, disabled }: ButtonProps) => {
  const [toggleActive, setToggleActive] = useState(isToggleActive)

  useEffect(() => {
    if (disabled) {
      setToggleActive(undefined)
    } else {
      setToggleActive(isToggleActive)
    }
  }, [disabled, isToggleActive])

  const handleClick = () => {
    setToggleActive(!toggleActive)
  }

  return (
    <Button isToggleActive={toggleActive} onClick={handleClick} disabled={disabled}>
      {children}
    </Button>
  )
}

export const basic: StoryObj<ButtonProps> = {
  args: {
    children: 'Button',
  },
  argTypes: {
    disabled: {
      type: 'boolean',
    },
  },
  render: ({ children, disabled }) => (
    <Button disabled={disabled} onClick={() => alert(`you've clicked me!`)}>
      {children}
    </Button>
  ),
}

export const asToggle: StoryObj<ButtonProps> = {
  args: {
    children: 'Button',
  },
  argTypes: {
    isToggleActive: {
      type: 'boolean',
      description:
        'If this value is provided, it will provide "aria-pressed" prop so the button behaves as Toggle button',
      defaultValue: false,
    },
    disabled: {
      type: 'boolean',
    },
  },
  render: ({ children, isToggleActive, disabled }) => {
    return (
      <ToggleButton isToggleActive={isToggleActive} disabled={disabled}>
        {children}
      </ToggleButton>
    )
  },
}

export default meta
