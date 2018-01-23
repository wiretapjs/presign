import React from 'react'
import { storiesOf } from '@storybook/react'
import { Row, Span } from 'lib/components'

const fillerText = 'TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST'

storiesOf('Span', module)
  .addDecorator((story) => {
    return (
      <Row>
        {story()}
      </Row>
    )
  })
  .add('with a small basis', () => (
    <Span basis="25%">
      {fillerText}
    </Span>
  ))
  .add('with a large basis', () => (
    <Span basis="75%">
      {fillerText}
    </Span>
  ))
  .add('with a pre-defined height', () => (
    <Span height="500px">
      {fillerText}
    </Span>
  ))
  .add('with a pre-defined width', () => (
    <Span width="500px">
      {fillerText}
    </Span>
  ))
  .add('with a large basis override', () => (
    <Span
      basis={{ default: '100%', large: '25%' }}
    >
      {fillerText}
    </Span>
  ))
  .add('with a medium basis override', () => (
    <Span
      basis={{ default: '100%', medium: '25%' }}
    >
      {fillerText}
    </Span>
  ))
  .add('with a small basis override', () => (
    <Span
      basis={{ default: '100%', small: '25%' }}
    >
      {fillerText}
    </Span>
  ))
  .add('with an extra-small basis override', () => (
    <Span
      basis={{ default: '100%', xs: '25%' }}
    >
      {fillerText}
    </Span>
  ))
  .add('with a multi-level basis override', () => (
    <Span
      basis={{ default: '100%', medium: '50%', xs: '25%' }}
    >
      {fillerText}
    </Span>
  ))
