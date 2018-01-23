import React from 'react'
import { storiesOf } from '@storybook/react'
import { Header } from 'lib/components'

storiesOf('Header', module)
  .add('with no padding', () => (
    <Header leftPadding={'0px'} />
  ))
  .add('with automatic padding', () => (
    <Header />
  ))
  .add('with 100px of padding', () => (
    <Header leftPadding={'100px'} />
  ))
