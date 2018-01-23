import React from 'react'
import PropTypes from 'prop-types'
import pluralize from 'pluralize'
import { StyledLi } from './View.style'

const NumberOfDocuments = function (props) {
  const {numberOfEsignDocs, numberOfPrintSignMailDocs} = props
  let esignDocs
  let printSignMailDocs

  if (isNumberValuePresentable(numberOfEsignDocs)) {
    esignDocs = (<StyledLi><span>
      You have <strong>{numberOfEsignDocs}</strong>
      &nbsp;{pluralize('document', numberOfEsignDocs)} to sign in total
    </span></StyledLi>)
  }

  if (isNumberValuePresentable(numberOfPrintSignMailDocs)) {
    printSignMailDocs = (<StyledLi><span>
    You have <strong>{numberOfPrintSignMailDocs}</strong>
      &nbsp;{pluralize('document', numberOfPrintSignMailDocs)} to print, sign, and mail
    </span></StyledLi>)
  }

  if (!esignDocs && !printSignMailDocs) {
    return null
  }

  return (
    <span>
      {esignDocs}
      {printSignMailDocs}
    </span>
  )
}

const isNumberValuePresentable = function (number) {
  return Number.isInteger(number) && number > 0
}

NumberOfDocuments.propTypes = {
  numberOfEsignDocs: PropTypes.number,
  numberOfPrintSignMailDocs: PropTypes.number,
}

export default NumberOfDocuments
