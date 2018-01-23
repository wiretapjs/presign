import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logoImg from 'lib/resources/images/LMI-logo.png'
import { Logo } from 'lib/components'
import autoBind from 'react-autobind'
import registrationApi from 'api/registrationApi'
import CoreLayout from 'app/CoreLayout'
import redirect from 'lib/util/redirect'
import RegistrationFormComponent from './RegistrationFormComponent'
import RegistrationLoading from './RegistrationLoading'
import RegistrationTokenError from './RegistrationTokenError'
import { Card, RegContainer, SubheadlineContainer, HeadlineContainer } from './registration.style'

const regContainer = {
  fontFamily: 'Roboto, sans-serif',
}

const logoContainer = {
  paddingTop: 10,
  paddingBottom: 10,
  textAlign: 'center',
}
const termsText = {
  fontSize: 10,
  marginTop: 15,
  textAlign: 'center',
  color: '#969696',
}
const cardContentContainer = {
  textAlign: 'left',
}

class Registration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showLoading: true,
      emailAddress: null,
      displaySsn: true,
      showEmailError: false,
    }
    autoBind(this)
  }

  componentDidMount () {
    registrationApi.getUserInfo().then((response) => {
      if (response.isValidToken) {
        this.validTokenHandler(response)
      } else {
        this.inValidTokenHandler()
      }
    }).catch(() => {
      this.inValidTokenHandler()
    })
  }

  validTokenHandler (response) {
    const { userAlreadyRegistered, registrationKeyActive } = response.registrationInfo
    if (userAlreadyRegistered) {
      redirect.eserviceEsignLogin()
    } else if (!registrationKeyActive) {
      redirect.eserviceEsignRegister()
    } else {
      this.setState({
        showLoading: false,
        emailAddress: response.registrationInfo.emailAddress,
        displaySsn: response.registrationInfo.namedInsuredMissingSSN,
      })
    }
  }

  inValidTokenHandler () {
    this.setState({
      showLoading: false,
      showEmailError: true,
    })
    redirect.eserviceEsignRegister()
  }

  getDisplay () {
    if (this.state.showLoading) {
      return <RegistrationLoading />
    } else if (this.state.showEmailError) {
      return <RegistrationTokenError />
    } else {
      return <RegistrationFormComponent {...this.state} {...this.props} />
    }
  }

  render () {
    return (
      <CoreLayout>
        <div>
          <RegContainer style={regContainer}>
            <div>
              <div style={logoContainer}>
                <Logo src={logoImg} />
              </div>
              <Card>
                <div style={cardContentContainer}>
                  <SubheadlineContainer>
                  Get set up and on your way in a few simple steps!
                  </SubheadlineContainer>
                  <HeadlineContainer>
                  Create your account online
                  </HeadlineContainer>
                  {this.getDisplay()}
                </div>
              </Card>
              <div style={termsText}>
              We only use this information to securely verify your identity.
              Liberty Mutual respects your privacy and will not share your information.
              </div>
            </div>
          </RegContainer>
        </div>
      </CoreLayout>
    )
  }
}

Registration.propTypes = {
  regToken: PropTypes.string,
  email: PropTypes.string,
  displaySsn: PropTypes.bool,
}

export default Registration
