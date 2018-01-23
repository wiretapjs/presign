import React from 'react'
import { storiesOf } from '@storybook/react'
import { MainTitle } from 'lib/components'

storiesOf('MainTitle', module)
  .add('renders as expected', () => (
    <MainTitle>
      Give me my policies
    </MainTitle>
  ))
