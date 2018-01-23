import { childrenPropTypes } from 'lib/util/commonPropTypes'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const formatResponsiveObject = function (prop) {
  if (!prop) return { default: 'auto', large: 'auto', medium: 'auto', small: 'auto', xs: 'auto' }

  let propObject = prop
  if (!propObject.default) propObject = { default: prop }
  if (!propObject.large) propObject.large = propObject.default
  if (!propObject.medium) propObject.medium = propObject.large
  if (!propObject.small) propObject.small = propObject.medium
  if (!propObject.xs) propObject.xs = propObject.small

  return propObject
}

const Span = function ({ basis, children, height, width }) {
  height = formatResponsiveObject(height)
  width = formatResponsiveObject(width)
  basis = formatResponsiveObject(basis)

  const StyledSpan = styled.div`
    display: flex;
    flex: 0 1 ${basis.default ? basis.default : basis};
    height: ${height.default ? height.default : height};
    width: ${width.default ? width.default : width};
    @media only screen and (max-width: 1200px){
      flex: 0 1 ${basis.large};
      height: ${height.large};
      width: ${width.large};
    }
    @media only screen and (max-width: 992px){
      flex: 0 1 ${basis.medium};
      height: ${height.medium};
      width: ${width.medium};
    }
    @media only screen and (max-width: 768px){
      flex: 0 1 ${basis.small};
      height: ${height.small};
      width: ${width.small};
    }
    @media only screen and (max-width: 576px){
      flex: 0 1 ${basis.xs};
      height: ${height.xs};
      width: ${width.xs};
    }
  `
  return (
    <StyledSpan>{children}</StyledSpan>
  )
}

Span.propTypes = {
  basis: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      default: PropTypes.string.isRequired,
      large: PropTypes.string,
      medium: PropTypes.string,
      small: PropTypes.string,
    }),
  ]),
  children: childrenPropTypes,
  height: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      default: PropTypes.string.isRequired,
      large: PropTypes.string,
      medium: PropTypes.string,
      small: PropTypes.string,
    }),
  ]),
  width: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      default: PropTypes.string.isRequired,
      large: PropTypes.string,
      medium: PropTypes.string,
      small: PropTypes.string,
    }),
  ]),
}

export default Span
