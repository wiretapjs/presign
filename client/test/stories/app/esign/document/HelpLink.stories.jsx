import React from 'react'
import { storiesOf } from '@storybook/react'
import HelpLink from 'app/esign/document/HelpLink'
import StoryRouter from 'storybook-router'

storiesOf('HelpLink', module)
  .addDecorator(StoryRouter())
  .add('renders link', () => {
    return <HelpLink />
  })
