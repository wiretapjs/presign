import styled, { keyframes } from 'styled-components'

export const Containter = styled.div`
  position: absolute;
  width: 290px;
  height: 58px;
`

export const StyledLink = styled.div`
  font-family: 'Roboto';
  font-weight : 300;
  font-size: 16px;
  cursor: pointer;
  border-width:0px;
  white-space:nowrap;
  color: #1F7FC7;
`

const fadeInFadeOut = keyframes`
  0%   { opacity: 0; }
  20%  { opacity: 1; }
  80%  { opacity : 1; }
  100% { opacity: 0; }
`

export const FadeInDiv = styled.div`
  animation: ${fadeInFadeOut} 10s linear 1;
  margin-left : -135px;
  @media only screen and (min-width: 1070px) {
    margin-left: -270px;
  }
`
export const StyledHelpLinkWrapper = styled.div`
   display : flex;
   flex-direction : column;
   align-items : flex-start;
   margin : 10px;
`
