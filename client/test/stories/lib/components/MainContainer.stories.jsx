import React from 'react'
import { storiesOf } from '@storybook/react'
import { MainContainer } from 'lib/components'

storiesOf('MainContainer', module)
  .add('with no padding', () => (
    <MainContainer leftPadding={'0px'}>
      This is the main container
      <ul>
        Test
        <li><span> 1 </span></li>
        <li><span> 2 </span></li>
        <li><span> 3 </span></li>
      </ul>
    </MainContainer>
  ))
  .add('with default padding', () => (
    <MainContainer>
      This is the main container
      <ul>
        Test
        <li><span> 1 </span></li>
        <li><span> 2 </span></li>
        <li><span> 3 </span></li>
      </ul>
    </MainContainer>
  ))
  .add('with 100px of padding', () => (
    <MainContainer leftPadding={'100x'}>
      This is the main container
      <ul>
        Test
        <li><span> 1 </span></li>
        <li><span> 2 </span></li>
        <li><span> 3 </span></li>
      </ul>
    </MainContainer>
  ))
