import React from 'react'
import styled from 'styled-components'
import { childrenPropTypes } from 'lib/util/commonPropTypes'
import { minWidth } from 'app/data/styles'

const StyledDiv = styled.div`
  height: 250px;
  text-align: center;
  font-family: Roboto, sans-serif;
  font-weight: 300;
  color: #001663;
  margin-top: 30%;
  padding: 1em;
  font-size: 15px;
  @media (min-width: ${minWidth.tablet}) {
    font-size: 20px
  }
`

const ErrorMessage = (props) => {
  return (
    <StyledDiv>
      <div dangerouslySetInnerHTML={{__html: props.children}} />
    </StyledDiv>
  )
}

ErrorMessage.propTypes = {
  children: childrenPropTypes,
}

export default ErrorMessage
