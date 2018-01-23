import React from 'react'
import PropTypes from 'prop-types'
import { formatPolicyNumber } from 'lib/util/policies'
import StatusSpan from './StatusSpan'
import { StyledH2, StyledP } from './View.style'

const SINGLE_POLICY_TITLE = 'Your policy:'
const MULTI_POLICY_TITLE = 'Your policies:'

class PolicyNumbers extends React.Component {
  render () {
    const { ceremonies } = this.props
    if (typeof ceremonies === 'undefined' || ceremonies.length === 0) return null

    let policyTitle = SINGLE_POLICY_TITLE
    if (ceremonies.length > 1) {
      policyTitle = MULTI_POLICY_TITLE
    }

    return (
      <div>
        <StyledH2>{policyTitle}</StyledH2>
        {
          ceremonies.map((ceremony, index) => {
            return (<StyledP key={index}>
              {formatPolicyNumber(ceremony.policyNumber)}
              <StatusSpan ceremony={ceremony} />
            </StyledP>)
          })
        }
      </div>
    )
  }
}

PolicyNumbers.propTypes = {
  ceremonies: PropTypes.array,
}

export default PolicyNumbers
