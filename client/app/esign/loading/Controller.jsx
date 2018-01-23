import React from 'react'
import { historyPropTypes } from 'lib/util/commonPropTypes.js'
import autobind from 'react-autobind'
import { eSignDocuments } from 'app/data/urls'
import _ from 'lodash'
import redirect from 'lib/util/redirect.js'
import getESignLoadingDestination from 'app/esign/loading/destination'
import Routing from 'lib/util/routing'
import errorMessages from './content/errorMessages'
import * as analytics from './analytics'
import ViewModel from './ViewModel'
import ESignLoadingView from './View'

class Controller extends React.Component {
  constructor (props) {
    super(props)
    this.destination = getESignLoadingDestination()
    this.state = {
      viewModel: {
        numberOfEsignDocs: 0,
        numberOfPrintSignMailDocs: 0,
        signableCeremonies: [],
        hasMultipleSigners: false,
      },
      isLoading: true,
      errorMessage: null,
      hasErrors: false,
    }
    autobind(this)
    // inject the window here so we can mock it in tests
    this.window = window
  }

  get timeToShowNoSignableMessage () {
    return 9000
  }

  async componentDidMount () {
    let viewModel
    try {
      viewModel = await ViewModel.create()

      if (viewModel.signableCeremonies.length === 0) {
        analytics.recordESignLoadingError()
        this.setState({errorMessage: errorMessages.noSignablePolicies, hasErrors: true})
        setTimeout(redirect.eserviceWelcomePage, this.timeToShowNoSignableMessage)
      } else {
        analytics.recordESignLoading(viewModel.eSignSessions)
        this.setState({viewModel})
      }
      this.setState({isLoading: false})
    } catch (err) {
      analytics.recordESignLoadingError()
      redirect.eserviceEsignLogin()
    }
  }

  async acceptTermsAndConditions () {
    try {
      const viewModel = await this.state.viewModel.acceptTermsAndConditions()
      this.setState({viewModel}, this._redirectToESignDocuments)
    } catch (err) {
      this.setState({hasErrors: true}, this._redirectToESignDocuments)
    }
  }

  _redirectToESignDocuments () {
    if (this._shouldGoToPurpleBox()) {
      this.props.history.push(Routing.generateLinkTo(eSignDocuments))
    } else {
      redirect.eserviceEsignLogin()
    }
  }

  _shouldGoToPurpleBox () {
    return this.state.viewModel.canEsign && !this.state.hasErrors
  }

  get signableCeremonies () {
    return _.get(this.state, 'viewModel.signableCeremonies')
  }

  get numberOfEsignDocs () {
    return _.get(this.state, 'viewModel.numberOfEsignDocs')
  }

  get numberOfPrintSignMailDocs () {
    return _.get(this.state, 'viewModel.numberOfPrintSignMailDocs')
  }

  get hasMultipleSigners () {
    return _.get(this.state, 'viewModel.hasMultipleSigners')
  }

  render () {
    // The ref sets the redirect link so that the click can be tracked by Heap analytics
    return (
      <div>
        <ESignLoadingView
          ceremonies={this.signableCeremonies}
          numberOfEsignDocs={this.numberOfEsignDocs}
          numberOfPrintSignMailDocs={this.numberOfPrintSignMailDocs}
          hasMultipleSigners={this.hasMultipleSigners}
          errorMessage={this.state.errorMessage}
          isLoading={this.state.isLoading}
          handleClick={this.acceptTermsAndConditions}
        />
      </div>
    )
  }
}

Controller.propTypes = {
  history: historyPropTypes,
}

export default Controller
