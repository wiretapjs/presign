import React, { Component } from 'react'
import PropTypes from 'prop-types'
import sessionsService from 'lib/services/sessions'
import { EsignIframe, Footer, Header, MainTitle } from 'lib/components'
import ceremoniesService from 'lib/services/ceremonies'
import policyService from 'lib/services/policies'
import autoBind from 'react-autobind'
import { errorEvents, signerCompleteEvents } from 'app/data/esignIframe'
import View from 'app/View'
import routing from 'lib/util/routing'
import redirect from 'lib/util/redirect'
import isURL from 'validator/lib/isURL'
import { canEsign } from 'app/esign/filters/common'
import RegistrationLoading from 'app/registration/RegistrationLoading'
import HelpLink from './HelpLink'
import { recordESignDocument, recordESignDocumentError } from './analytics'
import CantSeeDocsLinkComponent from './CantSeeDocsLinkComponent'
import {
  StyledHeaderWrapper,
  StyledWrapper,
  StyledIframeWrapper,
  StyledTextWrapper,
  StyledErrorMessage,
  StyledHelpWrapper } from './Document.style'

class Document extends Component {
  constructor () {
    super()
    this.state = {
      esignatureUrl: '',
      policyNumber: '',
      showLoading: true,
      showErrorMessage: false,
    }
    autoBind(this)
  }

  async componentDidMount () {
    try {
      const sessionList = await sessionsService.getUpdatedSessions()

      if (!canEsign(sessionList)) {
        this.handleLoadingError()
      } else {
        const sessionObjectForFirstPolicy = sessionList[0]
        const policyNumber = sessionObjectForFirstPolicy.policyNumber

        const firstEsignSession = sessionObjectForFirstPolicy.eSignSession[0]
        const firstSignerOfFirstSession = firstEsignSession.signerSession[0]
        const esignatureUrl = firstSignerOfFirstSession.esignatureUrl
        if (!isURL(esignatureUrl)) throw new Error('Invalid URL')
        const policySummary = await policyService.getCachedSummary(policyNumber)

        recordESignDocument(sessionObjectForFirstPolicy, policySummary.policyJurisdiction)

        this.setState({esignatureUrl, policyNumber, showLoading: false})
      }
    } catch (err) {
      this.handleLoadingError()
    }
  }

  handleLoadingError () {
    recordESignDocumentError()
    this.redirectToEsign()
  }

  redirectToEsign () {
    redirect.eserviceEsignLogin()
  }

  esignEventsHandler (data, domain) {
    if (signerCompleteEvents.includes(data)) {
      this.validateCeremoniesAndRedirect()
    } else if (errorEvents.includes(data)) {
      this.setState({showErrorMessage: true})
      this.redirectToEsign()
    }
  }

  validateCeremoniesAndRedirect () {
    this.setState({showLoading: true})
    this.areCeremoniesValid().then((areValid) => {
      if (areValid) {
        this.props.history.push(routing.generateLinkTo('/esign/confirmation'))
      } else {
        this.redirectToEsign()
      }
    })
  }

  areCeremoniesValid () {
    return ceremoniesService.getCeremonies({
      policyNumbers: [this.state.policyNumber],
      sessionType: 'esign',
    }).then((ceremoniesResponse) => {
      const { ceremonies } = ceremoniesResponse
      if (!ceremonies || !ceremonies.length) return false

      return ceremonies[0].ceremonyStatus !== 'failed' && ceremonies[0].redirectIndicator !== 'Y'
    }).catch(() => false)
  }

  renderIframe () {
    if (this.state.showLoading) {
      return <RegistrationLoading />
    }

    if (this.state.showErrorMessage) {
      return (<StyledErrorMessage>Oops! It looks like something went wrong.</StyledErrorMessage>)
    }

    return <EsignIframe url={this.state.esignatureUrl} esignEvents={this.esignEventsHandler} />
  }

  render () {
    return (
      <View>
        <StyledWrapper>
          <StyledHeaderWrapper>
            <Header />
          </StyledHeaderWrapper>
          <StyledTextWrapper>
            <MainTitle> Let's sign your policy documents </MainTitle>
          </StyledTextWrapper>
          <StyledHelpWrapper>
            <CantSeeDocsLinkComponent />
            <HelpLink />
          </StyledHelpWrapper>
          <StyledIframeWrapper>
            {this.renderIframe()}
          </StyledIframeWrapper>
          <Footer />
        </StyledWrapper>
      </View>
    )
  }
}

Document.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}

export default Document
