import type { Meta } from '@storybook/react'

import { Button } from '../src/button'

const meta: Meta<typeof Button> = {
  title: 'Button/test',
  decorators: [(story: Function) => <div>{story()}</div>],
}

export default meta

export const WithVariants = () => (
  <div>
    <Button>Button</Button>
  </div>
)
