import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'

import { Button } from './button'

describe('Button', () => {
  it('should be defined', () => {
    const { getByText } = render(<Button>paragon-ui</Button>)
    const button = getByText('paragon-ui')

    expect(button).toBeInTheDocument()
  })
})
