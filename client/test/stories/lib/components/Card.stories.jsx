import React from 'react'
import { storiesOf } from '@storybook/react'
import { Card } from 'lib/components'

storiesOf('Card', module)
  .add('renders as expected', () => (
    <Card />
  ))
