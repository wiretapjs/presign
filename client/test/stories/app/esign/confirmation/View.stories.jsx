import React from 'react'
import { storiesOf } from '@storybook/react'
import ESignConfirmationView from 'app/esign/confirmation/View'
import StoryRouter from 'storybook-router'

storiesOf('Confirmation', module)
  .addDecorator(StoryRouter())
  .add('when data is loading', () => {
    return <ESignConfirmationView isDataLoading />
  })
  .add('when data is not loading', () => {
    return <ESignConfirmationView isDataLoading={false} />
  })
