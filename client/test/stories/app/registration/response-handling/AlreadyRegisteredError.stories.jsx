import React from 'react'
import { storiesOf } from '@storybook/react'
import { AlreadyRegisteredError } from 'app/registration/response-handling'

storiesOf('AlreadyRegisteredError', module)
  .add('default', () => {
    return <AlreadyRegisteredError />
  })
