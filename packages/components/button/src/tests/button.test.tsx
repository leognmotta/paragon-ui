import { createRef } from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { Button, ButtonProps } from '../button'

describe('Button component', () => {
  // Define test props
  const testProps: ButtonProps = {
    children: 'Test Button',
    disabled: false,
    isToggleActive: false,
    onClick: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render button element with correct default props', () => {
    // Render the Button component without passing any props
    const { getByRole } = render(<Button />)

    // Assert that the rendered button element has the correct default props
    const buttonElement = getByRole('button')
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).not.toBeDisabled()
    expect(buttonElement).not.toHaveAttribute('aria-pressed')
  })

  it('should render button element with correct props', () => {
    // Render the Button component with testProps
    const { getByText } = render(<Button {...testProps} />)

    // Assert that the rendered button element has the correct props
    const buttonElement = getByText('Test Button')
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).not.toBeDisabled()
    expect(buttonElement).toHaveAttribute('aria-pressed', 'false')
  })

  it('should call onClick handler when clicked', () => {
    // Render the Button component with testProps
    const { getByText } = render(<Button {...testProps} />)

    // Simulate a click on the button
    const buttonElement = getByText('Test Button')
    fireEvent.click(buttonElement)

    // Assert that the onClick handler is called
    expect(testProps.onClick).toHaveBeenCalledTimes(1)
  })

  it('should not call onClick handler when clicked and disabled', () => {
    // Render the Button component with disabled prop
    const { getByText } = render(<Button {...testProps} disabled={true} />)

    // Simulate a click on the disabled button
    const buttonElement = getByText('Test Button')
    fireEvent.click(buttonElement)

    // Assert that the onClick handler is not called
    expect(testProps.onClick).toHaveBeenCalledTimes(0)
  })

  it('should render button element with disabled prop', () => {
    // Render the Button component with disabled prop
    const { getByText } = render(<Button {...testProps} disabled={true} />)

    // Assert that the rendered button element is disabled
    const buttonElement = getByText('Test Button')
    expect(buttonElement).toBeDisabled()
    expect(buttonElement).toHaveAttribute('aria-disabled', 'true')
  })

  it('should render button element with isToggleActive prop set to true', () => {
    // Render the Button component with isToggleActive prop
    const { getByText } = render(<Button {...testProps} isToggleActive={true} />)

    // Assert that the rendered button element has correct aria-pressed value
    const buttonElement = getByText('Test Button')
    expect(buttonElement).toHaveAttribute('aria-pressed', 'true')
  })

  it('should render button element with isToggleActive prop set to false', () => {
    // Render the Button component with isToggleActive prop
    const { getByText } = render(<Button {...testProps} isToggleActive={false} />)

    // Assert that the rendered button element has correct aria-pressed value
    const buttonElement = getByText('Test Button')
    expect(buttonElement).toHaveAttribute('aria-pressed', 'false')
  })

  it('should not have aria-pressed when isToggleActive is not boolean', () => {
    // Render the Button component with isToggleActive prop
    const { getByText } = render(<Button {...testProps} isToggleActive={undefined} />)

    // Assert that the rendered button element has correct aria-pressed value
    const buttonElement = getByText('Test Button')
    expect(buttonElement).not.toHaveAttribute('aria-pressed')
  })

  it('should not have aria-pressed when disable', () => {
    // Render the Button component with isToggleActive prop
    const { getByText } = render(<Button {...testProps} isToggleActive={true} disabled />)

    // Assert that the rendered button element has correct aria-pressed value
    const buttonElement = getByText('Test Button')
    expect(buttonElement).not.toHaveAttribute('aria-pressed')
  })

  it('should forward ref to button element', () => {
    // Create a ref
    const ref = createRef<HTMLButtonElement>()

    // Render the Button component with the ref
    render(<Button {...testProps} ref={ref} />)

    // Assert that the ref is forwarded correctly
    expect(ref.current).toBeDefined()
    expect(ref.current?.tagName).toBe('BUTTON')
  })

  it('should render button element with correct data-element attribute', () => {
    // Render the Button component with testProps
    const { getByText } = render(<Button {...testProps} />)

    // Assert that the rendered button element has the correct data-element attribute
    const buttonElement = getByText('Test Button')
    expect(buttonElement).toHaveAttribute('data-element', 'button')
  })

  it('should render button element with additional props', () => {
    // Render the Button component with additional props
    const { getByText } = render(<Button {...testProps} data-testid="test-button" />)

    // Assert that the rendered button element has the additional props
    const buttonElement = getByText('Test Button')
    expect(buttonElement).toHaveAttribute('data-testid', 'test-button')
  })
})
