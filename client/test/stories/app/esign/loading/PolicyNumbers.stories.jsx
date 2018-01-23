import React from 'react'
import { storiesOf } from '@storybook/react'
import PolicyNumbers from 'app/esign/loading/PolicyNumbers'

const ceremony = [{
  policyNumber: 'AOS28103563340',
  ceremonyStatus: 'esigned',
}]

const ceremonies = [
  {
    policyNumber: 'AOS28103563340',
    ceremonyStatus: 'accepted',
  },
  {
    policyNumber: 'AOS28103563340',
    ceremonyStatus: 'complete',
  },
  {
    policyNumber: 'AOS28103563340',
    ceremonyStatus: 'esigned',
  },
  {
    policyNumber: 'AOS28103563340',
    ceremonyStatus: 'failed',
  },
  {
    policyNumber: 'AOS28103563340',
    ceremonyStatus: 'in progress',
  },
  {
    policyNumber: 'AOS28103563340',
    ceremonyStatus: 'ready',
  },
  {
    policyNumber: 'AOS28103563340',
    ceremonyStatus: 'sent',
  },
]

storiesOf('PolicyNumbers', module)
  .add('with undefined ceremonies passed', () => (
    <PolicyNumbers ceremonies={undefined} />
  ))
  .add('with no ceremonies passed', () => (
    <PolicyNumbers ceremonies={[]} />
  ))
  .add('with one ceremony passed', () => (
    <PolicyNumbers ceremonies={ceremony} />
  ))
  .add('with multiple ceremonies passed', () => (
    <PolicyNumbers ceremonies={ceremonies} />
  ))
