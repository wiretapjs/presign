import React from 'react'
import PropTypes from 'prop-types'
import { StyledLi } from './View.style'
const element = <StyledLi><span>All policy holders will have to sign</span></StyledLi>

const MultipleSigners = function (props) {
  return props.hasMultipleSigners ? element : null
}

MultipleSigners.propTypes = {
  hasMultipleSigners: PropTypes.bool,
}

export default MultipleSigners
