import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const EnvironmentWatermark = (props) => {
  const { environment } = props
  const StyledEnvironmentWatermark = styled.div`
    color: red;
    position: absolute;
    left: 0;
    top: 0;
    margin-left: 10px;
    font-weight: bold;
    `

  if (environment === 'production') return null
  return (
    <StyledEnvironmentWatermark>
      {`Non-production environment (${environment})`}
    </StyledEnvironmentWatermark>
  )
}

EnvironmentWatermark.propTypes = {
  environment: PropTypes.string,
}

export default EnvironmentWatermark
