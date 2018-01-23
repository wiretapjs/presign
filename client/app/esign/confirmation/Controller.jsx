import React from 'react'
import policyService from 'lib/services/policies'
import sessionsService from 'lib/services/sessions'
import ESignConfirmationView from './View'
import { recordEsignConfirmationView } from './analytics'

class ESignConfirmationController extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      isDataLoading: true,
    }
  }

  async componentDidMount () {
    try {
      const sessionsList = await sessionsService.getUpdatedSessions()

      if (sessionsList.length > 0) {
        const policyNumber = sessionsList[0].policyNumber
        const policySummary = await policyService.getUpdatedSummary(policyNumber)
        recordEsignConfirmationView(policyNumber, policySummary.policyJurisdiction)
      }
    } catch (err) {
      // There is no error analytics event to send for this page
      console.error(err)
    }

    this.setState({ isDataLoading: false })
  }

  render () {
    return <ESignConfirmationView isDataLoading={this.state.isDataLoading} />
  }
}

export default ESignConfirmationController
