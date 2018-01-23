import React from 'react'
import PropTypes from 'prop-types'
import { FormsyText } from 'formsy-material-ui/lib'
import * as inputStyles from 'app/registration/input.styles'
import PasswordHint from 'app/registration/passwordInput/PasswordHint'

export const passwordErrorMessage =
  "We're sorry, your new password does not meet the password requirements.  Please make sure your password does not contain spaces or the following characters: / % < & + >"

const PasswordInput = props => {
  const container = {
    position: 'relative',
  }

  const showHideLink = {
    color: '#1B75BB',
    cursor: 'pointer',
  }

  const showHideLinkText = {
    fontSize: 10,
    right: 10,
    position: 'absolute',
    top: 17,
  }

  const onKeyPress = (event) => {
    if (event.key === 'Enter') props.onEnterPress(event)
  }

  return (
    <div style={container}>
      <div>
        <FormsyText
          name="password"
          id="password"
          underlineShow={false}
          style={inputStyles.input}
          inputStyle={inputStyles.inputStyle}
          floatingLabelStyle={inputStyles.floatingLabelStyle}
          floatingLabelShrinkStyle={inputStyles.floatingLabelShrinkStyle}
          hintStyle={inputStyles.hintStyle}
          errorStyle={inputStyles.errorStyle}
          disabled={props.areFieldsDisabled}
          onKeyPress={onKeyPress}
          onChange={props.onPasswordChange}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          required
          type={props.isPasswordVisible ? 'text' : 'password'}
          floatingLabelText="Create Password"
          validations={{
            matchRegexp: props.validationRegex,
            minLength: props.minLength,
          }}
          validationError={passwordErrorMessage}
        />
      </div>
      <span style={showHideLinkText}>
        <a style={showHideLink} onClick={props.togglePassword}>
          {props.isPasswordVisible ? <span>hide</span> : <span>show</span>}
        </a>
      </span>
      {props.isPasswordHintVisible && <PasswordHint /> }
    </div>
  )
}

PasswordInput.propTypes = {
  areFieldsDisabled: PropTypes.bool,
  isPasswordVisible: PropTypes.bool,
  togglePassword: PropTypes.func,
  isPasswordHintVisible: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onEnterPress: PropTypes.func,
  onPasswordChange: PropTypes.func,
  validationRegex: PropTypes.object.isRequired,
  minLength: PropTypes.number.isRequired,
}

PasswordInput.defaultProps = {
  areFieldsDisabled: false,
  isPasswordVisible: false,
  togglePassword: () => {},
  isPasswordHintVisible: false,
  onFocus: () => {},
  onBlur: () => {},
  onEnterPress: () => {},
  onPasswordChange: () => {},
}

export default PasswordInput
