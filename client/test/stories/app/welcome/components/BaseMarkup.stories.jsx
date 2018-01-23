import React from 'react'
import { storiesOf } from '@storybook/react'
import BaseMarkup from 'app/welcome/components/BaseMarkup/BaseMarkup'

storiesOf('BaseMarkup', module)
  .add('default', () => {
    return <BaseMarkup />
  })
