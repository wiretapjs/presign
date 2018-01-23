import styled from 'styled-components'

export const StyledHeaderWrapper = styled.div`
  background-color : white;
  width: 100%;
`
export const StyledTextWrapper = styled.div`
  margin : 10px;
  width : 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top : 2em;
  @media only screen and (min-width: 768px) {
     width: 970px;
     align-items: flex-start;
     padding-left : 75px;
  }
`
export const StyledHelpWrapper = styled.div`
  margin : 10px;
  width : 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top : 2em;
  margin-bottom : 0em;
  @media only screen and (min-width: 1070px) {
     width: 970px;
     flex-direction: row;
     align-items: flex-start;
     justify-content : space-between;
     padding-left : 75px;
  }
`
export const StyledWrapper = styled.div`
  display: flex;
  height: 150%;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  @media only screen and (min-height: 801px){
      height: 130%;
  }
  @media only screen and (min-height: 1024px) {
      height: 100%;
  }
  @media only screen and (min-width: 768px) {
     align-items: flex-start;
  }
`
export const StyledIframeWrapper = styled.div`
  height: 100%;
  width: 100%;
  @media only screen and (min-width: 1025px) {
     width: 970px;
     padding-left : 75px;
  }
  align-items: stretch;
  display: flex;
  margin-top : 2em;
  margin-bottom : -50px;
`
export const StyledErrorMessage = styled.div`
  width: 100%;
  height: 250px;
  text-align: center;
  font-family: Roboto, sans-serif;
  font-weight: 300;
  font-size: 2em;
  color: #001663;
  margin-top: 30%;

`
