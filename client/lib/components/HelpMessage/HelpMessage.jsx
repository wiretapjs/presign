import React from 'react'
import { Container, StyledText, StyledTriangle, BlockerDiv, StyledHelpMessageWrapper } from './HelpMessage.style'

export const HelpMessage = props => {
  return (
    <StyledHelpMessageWrapper>
      <Container>
        <StyledText>
          We’re here to help. Please don’t hesitate to call us if
          you have any questions or concerns.
        </StyledText>
        <StyledText>1-888-398-8924</StyledText>
        <BlockerDiv />
      </Container>
      <StyledTriangle />
    </StyledHelpMessageWrapper>
  )
}

export default HelpMessage
