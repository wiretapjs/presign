import { childrenPropTypes } from 'lib/util/commonPropTypes'
import React from 'react'
import styled from 'styled-components'
import { minWidth } from 'app/data/styles'

const Paper = (props) => {
  const {children} = props
  const StyledContentContainer = styled.div`
    font-family: 'Roboto-Regular', 'Roboto';
    border-color: rgba(224, 224, 224, 1);
    background-color: rgba(255, 255, 255, 1);
    color: #404040;
    border-style: solid;
    margin: 2em 1em;
    @media only screen and (min-width: ${minWidth.tablet}) {
      text-align: left;
      margin: 2em auto;
    }
    @media only screen and (min-width: ${minWidth.desktop}) {
      text-align: left;
      margin: 2em 0em;
    }
    border-width: 1px;
    max-width: 788px;
    font-weight: 400;
    font-style: normal;
    `
  return (
    <StyledContentContainer>
      {children}
    </StyledContentContainer>
  )
}

Paper.propTypes = {
  children: childrenPropTypes,
}

export default Paper
