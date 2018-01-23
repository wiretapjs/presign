import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { childrenPropTypes } from 'lib/util/commonPropTypes'

const Background = (props) => {
  const {children, src, color} = props
  const StyledBackground = styled.div`
    height: 100vh;
    width : 100vw;
    position:fixed !important;
    background: url(${src}) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    background-color: ${color};
    overflow-y: auto;
    `
  return (
    <StyledBackground src={src}>
      {children}
    </StyledBackground>
  )
}

Background.propTypes = {
  children: childrenPropTypes,
  src: PropTypes.string,
  color: PropTypes.string,
}

Background.defaultProps = {
  children: null,
  src: '',
  color: '#e8f0f5',
}

export default Background
