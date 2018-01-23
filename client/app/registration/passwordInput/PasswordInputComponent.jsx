import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import PasswordInput from './PasswordInput'

class PasswordInputComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isPasswordVisible: false,
      isPasswordHintVisible: false,
      passwordHasFocus: false,
    }

    this.passwordValidationRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)[^<>/%+&\s]*$/
    this.passwordMinLength = 8

    autoBind(this)
  }

  isPasswordValid (password) {
    return password.length >= this.passwordMinLength && password.match(this.passwordValidationRegex)
  }

  onPasswordChange (event) {
    const value = event.target.value
    const valid = this.isPasswordValid(value)

    if (valid) {
      this.setState({isPasswordHintVisible: false})
    } else if (this.state.passwordHasFocus) {
      this.setState({isPasswordHintVisible: true})
    }
  }

  togglePassword () {
    this.setState(prevState => {
      return {
        isPasswordVisible: !prevState.isPasswordVisible,
      }
    })
  }

  setPasswordHintVisibleFlag (value) {
    this.setState({
      isPasswordHintVisible: value,
    })
  }

  setPasswordFocusFlag (value) {
    this.setState({
      passwordHasFocus: value,
      isPasswordHintVisible: value,
    })
  }

  render () {
    return (
      <PasswordInput
        areFieldsDisabled={this.props.areFieldsDisabled}
        isPasswordVisible={this.state.isPasswordVisible}
        togglePassword={this.togglePassword}
        isPasswordHintVisible={this.state.isPasswordHintVisible}
        onFocus={() => this.setPasswordFocusFlag(true)}
        onBlur={() => this.setPasswordFocusFlag(false)}
        onEnterPress={() => this.setPasswordHintVisibleFlag(false)}
        onPasswordChange={this.onPasswordChange}
        validationRegex={this.passwordValidationRegex}
        minLength={this.passwordMinLength}
      />
    )
  }
}

PasswordInputComponent.propTypes = {
  areFieldsDisabled: PropTypes.bool,
}

export default PasswordInputComponent
