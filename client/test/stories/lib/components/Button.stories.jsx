import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from 'lib/components'

storiesOf('Button', module)
  .add('with no label', () => (
    <Button />
  ))
  .add('with a label', () => (
    <Button label={'test'} />
  ))
