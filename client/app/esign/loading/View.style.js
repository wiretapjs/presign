import styled from 'styled-components'
import { maxWidth } from 'app/data/styles'
const TextColors = {
  Success: '#4B9E60',
  Danger: '#F44336',
  Warn: '#FFA000',
}
// this creates three styled spans for the different ceremony statuses
Object.keys(TextColors).forEach(key => {
  module.exports[`${key}Span`] = styled.span`
  color:${TextColors[key]};
  font-style: italic;
  font-size: 12px;
  `
})
export const StyledButton = styled.button`{
  display: inline-block;
  background-color: rgba(3, 123, 183, 1);
  height: 50px;
  border-radius: 2px;
  color: white;
  font-size: 15px;
  width: 204px;
  :enabled:hover {
    cursor: pointer;
    background-color: rgba(72, 123, 183, 1);
  }
  :disabled {
    cursor: not-allowed;
  }
}`

export const ContentContainer = styled.div`
  padding: 12px 40px;
`

export const StyledH2 = styled.h2`
  color: black;
  margin: 38px 0 22px 0;
  font-size: 32px;
  @media only screen and (max-width: ${maxWidth.tablet}){
    font-size: 24px;
  }
  @media only screen and (max-width: ${maxWidth.mobile}){
    font-size: 15px;
  }
`

export const StyledImage = styled.img`
  width: 100%;
  @media only screen and (max-width: ${maxWidth.mobile}){
    width: 0%;
  }
`
export const StyledP = styled.p`
  margin: 0px;
  margin-top: 2px;
  margin-bottom: 16px;
`

export const StyledLink = styled.a`{
  color: rgba(14, 102, 168, 0.968627450980392);
  text-decoration: none;
}
`

export const StyledLi = styled.li`{
  @media only screen and (max-width: ${maxWidth.mobile}){
    font-size: 12px;
  }
`

export const StyledUl = styled.ul`{
  @media only screen and (max-width: ${maxWidth.mobile}){
    padding: 0px;
  }

  @media only screen  and (min-width: 768px) {
    width: 85%;
    bottom: 0px;
  }

  @media only screen  and (min-width: 1024px) {
    width: 75%;
  }

  @media only screen  and (min-width: 1600px) {
    width: 65%;
  }
`
