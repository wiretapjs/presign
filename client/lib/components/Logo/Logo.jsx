import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Logo = (props) => {
  const { src } = props
  const StyledLogo = styled.img`
    width: 252px;
    height: 89px;
    margin: auto;
    @media only screen and (max-width: 992px) {
        margin: 0 auto 20px auto;
        width: 200px;
        height: 71px;
    }
    `
  return (
    <StyledLogo src={src} />
  )
}

Logo.propTypes = {
  src: PropTypes.string,
}

export default Logo
