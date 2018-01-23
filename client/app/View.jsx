import { childrenPropTypes } from 'lib/util/commonPropTypes'
import React from 'react'
import PropTypes from 'prop-types'
import { Background, EnvironmentWatermark } from 'lib/components'
import config from 'app/config'

const View = function (props) {
  const { children, bgImg, bgColor } = props

  return (
    <Background src={bgImg} color={bgColor}>
      <EnvironmentWatermark environment={config.environment} />
      {children}
    </Background>
  )
}

View.propTypes = {
  children: childrenPropTypes,
  bgImg: PropTypes.string,
  bgColor: PropTypes.string,
}

export default View
