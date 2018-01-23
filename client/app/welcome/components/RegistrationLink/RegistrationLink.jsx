import { childrenPropTypes } from 'lib/util/commonPropTypes'
import React from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash.isequal'
import getRegistrationTrafficSplitConfig from 'app/experiments/registrationTrafficSplit/config'
import { Link } from 'react-router-dom'
import Routing from 'lib/util/routing'
import config from 'app/config'

const RegistrationLink = function (props) {
  if (isEqual(
    props.registriationTrafficSplitChoice,
    getRegistrationTrafficSplitConfig().treatmentA,
  )) {
    return (
      <Link to={Routing.generateLinkTo('/registration')}>
        {props.children}
      </Link>
    )
  }

  return (
    <a href={config.registrationLink}>
      {props.children}
    </a>
  )
}

RegistrationLink.propTypes = {
  children: childrenPropTypes,
  registriationTrafficSplitChoice: PropTypes.shape({
    name: PropTypes.string,
    analyticsId: PropTypes.string,
  }),

}

export default RegistrationLink
