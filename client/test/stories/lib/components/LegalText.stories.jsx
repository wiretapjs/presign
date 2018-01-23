import React from 'react'
import { storiesOf } from '@storybook/react'
import { LegalText } from 'lib/components'

storiesOf('LegalText', module)
  .add('renders with text', () => (
    <LegalText>Don't do illegal stuff</LegalText>
  ))
