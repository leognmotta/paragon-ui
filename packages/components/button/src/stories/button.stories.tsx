import type { Meta } from '@storybook/react'

import { Button } from '../button'

const meta: Meta<typeof Button> = {
  title: 'Button/test',
  decorators: [(story: Function) => <div>{story()}</div>],
}

export default meta

export const WithVariants = () => <Button>Button</Button>
