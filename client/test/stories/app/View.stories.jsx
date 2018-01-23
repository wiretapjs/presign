import React from 'react'
import { storiesOf } from '@storybook/react'
import View from 'app/View'
import bgImg from 'app/welcome/resources/images/welcome_background.jpg'

storiesOf('View', module)
  .add('with no src image and no color', () => (
    <View />
  ))
  .add('with src image and no color', () => (
    <View bgImg={bgImg} />
  ))
  .add('with color and no src image', () => (
    <View bgColor={'#0000ff'} />
  ))
  .add('with color and src image', () => (
    <View bgColor={'#0000ff'} bgImg={bgImg} />
  ))
