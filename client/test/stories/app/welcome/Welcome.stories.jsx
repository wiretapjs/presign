import React from 'react'
import { storiesOf } from '@storybook/react'
import Welcome from 'app/welcome/Welcome'
import StoryRouter from 'storybook-router'
import welcomeConfig from 'app/experiments/welcome/config'
import * as getRegistrationTrafficSplitConfig from 'app/experiments/registrationTrafficSplit/config'

welcomeConfig.percentBaseVersion = 50

const regConfig = getRegistrationTrafficSplitConfig.default()

getRegistrationTrafficSplitConfig.default = () => {
  regConfig.percentBaseVersion = 50
  return regConfig
}

const welcomeBaseToken = 'foo'
const welcomeTreatmentAToken = 'blah'
const registrationTrafficSplitBaseToken = 'foo'
const registrationTrafficSplitTreatmentAToken = 'bla'

storiesOf('Welcome', module)
  .addDecorator(StoryRouter())
  .add('with no token', () => {
    return <Welcome />
  })
  .add('with a token that triggers Welcome base', () => {
    return <Welcome regToken={welcomeBaseToken} />
  })
  .add('with a token that triggers Welcome treatment A', () => {
    return <Welcome regToken={welcomeTreatmentAToken} />
  })
  .add('with a token that will take users to Yellow Box', () => {
    return <Welcome regToken={registrationTrafficSplitBaseToken} />
  })
  .add('with a token that will take users to /registration', () => {
    return <Welcome regToken={registrationTrafficSplitTreatmentAToken} />
  })
