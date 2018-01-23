import React from 'react'
import { storiesOf } from '@storybook/react'
import { EsignIframe } from 'lib/components'

storiesOf('EsignIframe', module)
  .add('load any website on to iFrame', () => (
    <EsignIframe url="https://www.libertymutual.com" />
  ))
