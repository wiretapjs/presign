import React from 'react'
import { storiesOf } from '@storybook/react'
import RegistrationTokenError from 'app/registration/RegistrationTokenError'

storiesOf('RegistrationTokenError', module)
  .add('default', () => {
    return <RegistrationTokenError />
  })
