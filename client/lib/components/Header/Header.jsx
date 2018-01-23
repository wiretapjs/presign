import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Logo } from 'lib/components'
import logoImg from 'lib/resources/images/LMI-logo.png'
import {StyledHeader, StyledHeaderContainer} from './Header.style.jsx'

export class Header extends Component {
  render () {
    return (
      <StyledHeader>
        <StyledHeaderContainer leftPadding={this.props.leftPadding}>
          <Logo src={logoImg} />
        </StyledHeaderContainer>
      </StyledHeader>
    )
  }
}

Header.defaultProps = {
  leftPadding: '90px',
}

Header.propTypes = {
  leftPadding: PropTypes.string,
}

export default Header
