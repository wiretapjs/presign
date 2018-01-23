import React from 'react'
import { storiesOf } from '@storybook/react'
import NumberOfDocuments from 'app/esign/loading/NumberOfDocuments'

storiesOf('NumberOfDocuments', module)
  .add('with undefined numberOfEsignDocuments passed', () => (
    <NumberOfDocuments numberOfEsignDocuments={undefined} />
  ))
  .add('with non-integer numberOfEsignDocuments passed', () => (
    <NumberOfDocuments numberOfEsignDocuments={4.2} />
  ))
  .add('with undefined numberOfPrintSignMailDocs passed', () => (
    <NumberOfDocuments numberOfPrintSignMailDocs={undefined} />
  ))
  .add('with non-integer numberOfPrintSignMailDocs passed', () => (
    <NumberOfDocuments numberOfPrintSignMailDocs={4.2} />
  ))
  .add('with integer numberOfEsignDocuments and numberOfPrintSignMailDocs passed', () => (
    <NumberOfDocuments numberOfEsignDocs={5} numberOfPrintSignMailDocs={5} />
  ))
  .add('with integer numberOfPrintSignMailDocs passed', () => (
    <NumberOfDocuments numberOfPrintSignMailDocs={5} />
  ))
  .add('with integer numberOfEsignDocuments passed', () => (
    <NumberOfDocuments numberOfEsignDocs={5} />
  ))
