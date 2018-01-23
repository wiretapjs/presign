import React from 'react'
import { storiesOf } from '@storybook/react'
import { Paper } from 'lib/components'

storiesOf('ContentContainer', module)
  .add('renders as expected', () => (
    <Paper>
      Some text
    </Paper>
  ))
