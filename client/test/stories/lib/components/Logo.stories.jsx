import React from 'react'
import { storiesOf } from '@storybook/react'
import { Logo } from 'lib/components'
import logoImg from 'lib/resources/images/LMI-logo.png'

storiesOf('Logo', module)
  .add('with no src image', () => (
    <Logo />
  ))
  .add('with src image', () => (
    <Logo src={logoImg} />
  ))
