import React from 'react'
import PropTypes from 'prop-types'
import autobind from 'react-autobind'
import { StyledButton } from './View.style'

export default class Button extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      disabled: false,
    }
    autobind(this)
  }

  handleClick (event) {
    event.preventDefault()
    this.setState({disabled: true})
    this.props.handleClick()
  }

  render () {
    return (
      <StyledButton onClick={this.handleClick} disabled={this.state.disabled}>
        {this.props.title}
      </StyledButton>
    )
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
}
