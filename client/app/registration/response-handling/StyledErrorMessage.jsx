import React from 'react'
import PropTypes from 'prop-types'
import { childrenPropTypes } from 'lib/util/commonPropTypes'
import { errorStyle } from '../input.styles'

const StyledErrorMessage = function (props) {
  return (
    <div
      style={{
        display: 'inline-block',
        height: 0,
        margin: props.parentFormInputMargin,
        padding: props.parentFormInputPadding,
        width: props.parentFormInputWidth,
      }}
    >
      <div style={errorStyle}>
        {props.children}
      </div>
    </div>
  )
}

StyledErrorMessage.propTypes = {
  children: childrenPropTypes,
  parentFormInputMargin: PropTypes.string.isRequired,
  parentFormInputPadding: PropTypes.string.isRequired,
  parentFormInputWidth: PropTypes.string.isRequired,
}

export default StyledErrorMessage
