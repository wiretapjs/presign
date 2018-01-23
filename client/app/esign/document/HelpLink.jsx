import React from 'react'
import autoBind from 'react-autobind'
import { HelpMessage } from 'lib/components'
import * as analytics from './analytics'
import { StyledLink, FadeInDiv, StyledHelpLinkWrapper } from './HelpLink.style'

class HelpLink extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isDisplayed: false,
    }
    autoBind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.toggleDisplay()
  }

  styledLinkClickHandler (e) {
    analytics.recordNeedHelpClick()
  }

  toggleDisplay () {
    this.setState(prevState => {
      return { isDisplayed: !prevState.isDisplayed }
    })
  }

  renderHelpMessage () {
    return (
      <FadeInDiv onAnimationEnd={this.toggleDisplay}>
        <HelpMessage />
      </FadeInDiv >
    )
  }

  render () {
    return (
      <StyledHelpLinkWrapper onClick={this.handleClick}>
        {this.state.isDisplayed && this.renderHelpMessage()}
        <StyledLink onClick={this.styledLinkClickHandler}>Need help?</StyledLink>
      </StyledHelpLinkWrapper>
    )
  }
}

export default HelpLink
