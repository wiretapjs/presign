import styled from 'styled-components'

export const Container = styled.div`
  width: 290px;
  height: 58px;
  background-color: #ffffff;
  padding: 8px 32px;
  -moz-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.0784313725490196);
  -webkit-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.0784313725490196);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.0784313725490196);
  border-bottom: solid 4px rgba(241, 193, 66, 1);
  z-index: 100;
`

export const StyledText = styled.div`
  font-weight: 200;
  font-family: 'Roboto';
  font-weight: 300;
  font-size: 14px;
  word-wrap: break-word;
  color: black;
  margin-bottom: 5px;
  text-align: center;
`

export const StyledTriangle = styled.div`
  background-color: rgba(241, 193, 66, 1);
  width: 15px;
  height: 15px;
  margin-top: -8px;
  margin-right : 4px;
  z-index: 0;
  -webkit-transform: rotate(-45deg); /* Safari */
  transform: rotate(-45deg);
`
export const BlockerDiv = styled.div`
  z-index: 5;
  height: 6px;
  bottom: 1px;
  position: relative;
`
export const StyledHelpMessageWrapper = styled.div`
   display : flex;
   flex-direction : column;
   align-items : center;
   position: absolute;
   margin-top : -90px;
   @media only screen and (min-width: 1070px) {
     align-items: flex-end;
   }
`
