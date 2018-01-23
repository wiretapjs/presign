import React from 'react'
import { storiesOf } from '@storybook/react'
import MultipleSigners from 'app/esign/loading/MultipleSigners'

storiesOf('MultipleSigners', module)
  .add('with undefined hasMultipleSigners passed', () => (
    <MultipleSigners hasMultipleSigners={undefined} />
  ))
  .add('with false hasMultipleSigners passed', () => (
    <MultipleSigners hasMultipleSigners={false} />
  ))
  .add('with true hasMultipleSigners passed', () => (
    <MultipleSigners hasMultipleSigners />
  ))
