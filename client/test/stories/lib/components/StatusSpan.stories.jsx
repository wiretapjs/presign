import React from 'react'
import { storiesOf } from '@storybook/react'
import StatusSpan from 'app/esign/loading/StatusSpan'

const existingCeremony = {
  ceremony: {
    ceremonyStatus: 'accepted',
  },
}

const nonexistingCeremony = {
  ceremony: {
    ceremonyStatus: 'accepte',
  },
}

storiesOf('StatusSpan', module)
  .add('nothing if ceremony status does not exists in mapped UI status', () => {
    return (<StatusSpan {...nonexistingCeremony} />)
  })
  .add('should display the UI status if ceremony status exists in mapped UI status', () => {
    return (<StatusSpan {...existingCeremony} />)
  })
