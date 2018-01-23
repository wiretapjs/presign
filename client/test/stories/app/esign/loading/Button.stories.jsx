import React from 'react'
import { storiesOf } from '@storybook/react'
import Button from 'app/esign/loading/Button'

storiesOf('Button', module)
  .add('renders', () => (
    <Button handleClick={() => {}} title="AGREE & CONTINUE" />
  ))
