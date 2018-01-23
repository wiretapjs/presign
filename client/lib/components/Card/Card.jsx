import React from 'react'
import styled from 'styled-components'
import { childrenPropTypes } from 'lib/util/commonPropTypes'

const Card = (props) => {
  const {children} = props
  const StyledCard = styled.div`
    border-top: 5px solid #ECAC00;
    max-width: 560px;
    background-color: #fff;
    -webkit-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
    -moz-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
    padding: 40px;
    `
  return (
    <StyledCard>
      {children}
    </StyledCard>
  )
}

Card.propTypes = {
  children: childrenPropTypes,
}

export default Card
