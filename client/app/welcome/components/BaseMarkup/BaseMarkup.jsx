import React from 'react'
import Labels from 'app/data/Labels'
import checkMarkImg from '../../resources/images/yellow-check.png'
import {StyledGreeting, StyledCheckMarkText, StyledCheckMark, StyledParagraph} from '../../Welcome.style'
import { StyledBottomHeaderText } from './BaseMarkup.style'

const BaseMarkup = (props) => {
  return (
    <div style={{width: '100%'}}>
      <StyledGreeting>
        {Labels.screenLabels.welcomeScreen.base.greeting}
      </StyledGreeting>
      <StyledCheckMarkText>
        <StyledCheckMark src={checkMarkImg} />
        {Labels.screenLabels.welcomeScreen.common.checkMarkText}
      </StyledCheckMarkText>
      <StyledParagraph>
        {Labels.screenLabels.welcomeScreen.base.paragraph1}
      </StyledParagraph>
      <StyledParagraph>
        {Labels.screenLabels.welcomeScreen.base.paragraph2}
      </StyledParagraph>
      <StyledBottomHeaderText>
        {Labels.screenLabels.welcomeScreen.base.bottomHeaderText}
      </StyledBottomHeaderText>
    </div>
  )
}

export default BaseMarkup
