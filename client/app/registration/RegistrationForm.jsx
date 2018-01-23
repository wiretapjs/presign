import React from 'react'
import PropTypes from 'prop-types'
import Formsy from 'formsy-react'
import RaisedButton from 'material-ui/RaisedButton'
import { FormsyText } from 'formsy-material-ui/lib'
import { isValidDate } from './date-formatter'
import { StyledLink, SubmitContainer, TermsContainer } from './registration.style'
import PasswordInputComponent from './passwordInput/PasswordInputComponent'
import * as inputStyles from './input.styles'
import { ErrorMessage, StyledErrorMessage } from './response-handling'

const submitButtonContainer = {
  paddingTop: 10,
}

const termsText = {
  paddingTop: 20,
  fontSize: 9,
  lineHeight: 1.4,
  color: '#969696',
}

const termsAnchor = {
  color: '#1B75BB',
  marginLeft: 5,
}

const form = {
  textAlign: 'left',
}

const loginText = {
  paddingLeft: 2,
  marginBottom: 5,
  fontSize: 12,
}

Formsy.addValidationRule('isDate', (values, value) => {
  return isValidDate(value)
})

const RegistrationForm = (props) => {
  const getSsnTextEntry = () => {
    return (
      <div>
        <FormsyText
          updateImmediately
          disabled={props.areFieldsDisabled}
          type="password"
          name="lastFourSSN"
          id="lastFourSSN"
          underlineShow={false}
          style={inputStyles.input}
          inputStyle={inputStyles.inputStyle}
          floatingLabelStyle={inputStyles.floatingLabelStyle}
          floatingLabelShrinkStyle={inputStyles.floatingLabelShrinkStyle}
          hintStyle={inputStyles.hintStyle}
          errorStyle={inputStyles.errorStyle}
          floatingLabelText="Last 4 of SSN"
          validations={{
            matchRegexp: /^\d+$/,
            isLength: 4,
          }}
          maxLength="4"
          required
          validationError="Please only enter the last four digits of your social security number."
        />
      </div>
    )
  }

  const getErrorMessage = (code) => {
    if (code) {
      return (
        <StyledErrorMessage
          parentFormInputWidth={inputStyles.input.width}
          parentFormInputPadding={inputStyles.input.padding}
          parentFormInputMargin={inputStyles.input.margin}
        >
          <ErrorMessage code={code} />
        </StyledErrorMessage>
      )
    }
  }

  return (
    <div style={form}>
      <Formsy.Form
        noValidate
        onValid={props.setValid}
        onInvalid={props.setInvalid}
        onValidSubmit={props.submitForm}
      >
        <div style={loginText}>
          Already have an account? &nbsp;
          <StyledLink href={props.loginDestination}>Sign In</StyledLink>
        </div>

        <FormsyText
          name="emailAddress"
          id="emailAddress"
          underlineShow={false}
          style={inputStyles.input}
          inputStyle={inputStyles.inputStyle}
          floatingLabelStyle={inputStyles.floatingLabelStyle}
          floatingLabelShrinkStyle={inputStyles.floatingLabelShrinkStyle}
          hintStyle={inputStyles.hintStyle}
          errorStyle={inputStyles.errorStyle}
          value={props.emailAddress}
          disabled
          required
          floatingLabelText="Email Address"
          validations="isEmail"
          validationError="You must enter a valid email address."
        />

        <PasswordInputComponent areFieldsDisabled={props.areFieldsDisabled} />

        <FormsyText
          id="dateOfBirth"
          name="dateOfBirth"
          underlineShow={false}
          style={inputStyles.input}
          inputStyle={inputStyles.inputStyle}
          floatingLabelStyle={inputStyles.floatingLabelStyle}
          floatingLabelShrinkStyle={inputStyles.floatingLabelShrinkStyle}
          floatingLabelFixed
          hintStyle={inputStyles.hintStyle}
          errorStyle={inputStyles.errorStyle}
          disabled={props.areFieldsDisabled}
          className="formsyInput"
          required
          type="date"
          floatingLabelText="Date of Birth"
          validations="isDate"
          validationError="Please enter your date of birth in the following format: MM/DD/YYYY"
        />
        {props.displaySsn && getSsnTextEntry()}

        {getErrorMessage(props.errorCode)}

        <div className="clearfix">
          <SubmitContainer>
            <div style={submitButtonContainer}>
              <RaisedButton
                type="submit"
                backgroundColor="#EC8900"
                style={{width: '100%', height: 50}}
                label={props.submitLabel}
                disabled={props.isButtonDisabled}
              />
            </div>
          </SubmitContainer>
          <TermsContainer>
            <div style={termsText}>
              By choosing to continue, you acknowledge you have read and accept our
              <a style={termsAnchor} target="_blank" href="http://public.libertymutual-cdn.com/PmEService/MediaAssets/pages/terms-and-conditions-enrollment.html">
                eService terms & conditions</a>.
            </div>
          </TermsContainer>
        </div>
      </Formsy.Form>
    </div>
  )
}

RegistrationForm.propTypes = {
  emailAddress: PropTypes.string,
  areFieldsDisabled: PropTypes.bool,
  isButtonDisabled: PropTypes.bool,
  displaySsn: PropTypes.bool,
  submitLabel: PropTypes.string,
  errorCode: PropTypes.string,
  setValid: PropTypes.func,
  setInvalid: PropTypes.func,
  submitForm: PropTypes.func,
  loginDestination: PropTypes.string,
}

export default RegistrationForm
