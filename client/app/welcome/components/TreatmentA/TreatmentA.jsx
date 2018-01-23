import React from 'react'
import Labels from 'app/data/Labels'
import checkMarkImg from '../../resources/images/yellow-check.png'
import {StyledGreeting, StyledCheckMarkText, StyledCheckMark, StyledParagraph} from '../../Welcome.style'
import { StyledBottomHeaderText } from './TreatmentA.style'

const TreatmentA = (props) => {
  return (
    <div style={{width: '100%'}}>
      <StyledGreeting>
        {Labels.screenLabels.welcomeScreen.treatmentA.greeting}
      </StyledGreeting>
      <StyledCheckMarkText>
        <StyledCheckMark src={checkMarkImg} />
        {Labels.screenLabels.welcomeScreen.common.checkMarkText}
      </StyledCheckMarkText>
      <StyledParagraph>
        {Labels.screenLabels.welcomeScreen.treatmentA.paragraph1}
      </StyledParagraph>
      <StyledBottomHeaderText>
        {Labels.screenLabels.welcomeScreen.treatmentA.listHeaderText}
      </StyledBottomHeaderText>
      <ul>
        {
          Labels.screenLabels.welcomeScreen.treatmentA.listTextArray.map(
            (listText, indx) => <li key={indx}>{listText}</li>,
          )
        }
      </ul>
    </div>
  )
}

export default TreatmentA
