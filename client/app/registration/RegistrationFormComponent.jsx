import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import isEqual from 'lodash.isequal'
import registrationApi from 'api/registrationApi'
import authenticationApi from 'api/authenticationApi'
import ESignLoadingTrafficSplitService from 'app/experiments/eSignLoadingTrafficSplit'
import getESignLoadingTrafficSplitConfig from 'app/experiments/eSignLoadingTrafficSplit/config'
import Routing from 'lib/util/routing'
import redirect from 'lib/util/redirect'
import RegistrationForm from 'app/registration/RegistrationForm'
import { formatDateString } from './date-formatter'
import { getEsignLoginDestination } from './destination'
import * as analytics from './analytics'
import responseCodes, { getValue as getResponseValue } from './response-handling/responseCodes'

class RegistrationFormComponent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isValid: false,
      errorMessage: '',
      errorCode: '',
      isSubmitting: false,
    }

    autoBind(this)
  }

  componentDidMount () {
    analytics.recordRegistrationScreen()
  }

  setValid () {
    this.setState({
      isValid: true,
    })
  }

  setInvalid () {
    this.setState({
      isValid: false,
    })
  }

  formatData (data) {
    data.userName = data.emailAddress
    data.dateOfBirth = formatDateString(data.dateOfBirth)
    return data
  }

  get isButtonDisabled () {
    return !this.state.isValid || this.state.isSubmitting
  }

  get areFieldsDisabled () {
    return this.state.isSubmitting
  }

  get submitLabel () {
    return this.state.isSubmitting ? 'Loading' : 'Submit'
  }

  submitForm (data) {
    this.userData = this.formatData(data)
    this.setState({ isSubmitting: true })
    analytics.recordRegistrationSubmit()
    registrationApi.submitRegistration(data)
      .then(response => this.parseFormSubmissionResponse(response)).catch(() => {
        redirect.eserviceEsignRegister()
      })
  }

  _splitRedirectTraffic () {
    const choice = new ESignLoadingTrafficSplitService(this.props.regToken).choice
    if (isEqual(
      choice,
      getESignLoadingTrafficSplitConfig().treatmentA,
    )) {
      this.props.history.push(Routing.generateLinkTo('/esign/loading'))
    } else {
      redirect.eserviceEsign()
    }
  }

  parseFormSubmissionResponse (response) {
    const responseValue = getResponseValue(response.responseCode)
    if (responseValue.code === responseCodes.success.code) {
      analytics.recordRegistrationComplete()
      authenticationApi.loginUser(this.userData.userName, this.userData.password).then(() => {
        analytics.recordAutomaticLoginComplete()
        this._splitRedirectTraffic()
      }).catch(() => {
        redirect.eserviceEsign()
      })
    } else {
      this.setState({ isSubmitting: false })
      this.setState({
        errorCode: responseValue.code,
      })
    }
  }

  render () {
    return (
      <RegistrationForm
        setValid={this.setValid}
        setInvalid={this.setInvalid}
        submitForm={this.submitForm}
        emailAddress={this.props.emailAddress}
        displaySsn={this.props.displaySsn}
        areFieldsDisabled={this.areFieldsDisabled}
        errorCode={this.state.errorCode}
        submitLabel={this.submitLabel}
        isButtonDisabled={this.isButtonDisabled}
        loginDestination={getEsignLoginDestination()}
      />
    )
  }
}

RegistrationFormComponent.propTypes = {
  emailAddress: PropTypes.string,
  displaySsn: PropTypes.bool,
  regToken: PropTypes.string,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}

export default RegistrationFormComponent
