import React from 'react'
import { storiesOf } from '@storybook/react'
import { Background } from 'lib/components'
import bgImg from 'app/welcome/resources/images/welcome_background.jpg'

storiesOf('Background', module)
  .add('with no src image', () => (
    <Background />
  ))
  .add('with src image and no color', () => (
    <Background src={bgImg} />
  ))
  .add('with color and no image', () => (
    <Background color={'#0000ff'} />
  ))
  .add('with color and src image', () => (
    <Background src={bgImg} color={'#0000ff'} />
  ))
