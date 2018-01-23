import React from 'react'
import { storiesOf } from '@storybook/react'
import ESignLoadingView from 'app/esign/loading/View'
import errorMessages from 'app/esign/loading/content/errorMessages'

const props = {
  policyNumbers: ['AO1234521345'],
  numberOfEsignDocs: 1,
  numberOfPrintSignMailDocs: 1,
  hasMultipleSigners: true,
  isLoading: false,
  handleClick: function () {},
}

storiesOf('eSign Loading View', module)
  .add('While loading', () => (
    <ESignLoadingView
      {...props}
      isLoading
    />
  ))
  .add('While not loading', () => (
    <ESignLoadingView {...props} isLoading={false} />
  ))
  .add('with error message', () => {
    return (
      <ESignLoadingView {...props}
        errorMessage={errorMessages.noSignablePolicies}
      />)
  })
