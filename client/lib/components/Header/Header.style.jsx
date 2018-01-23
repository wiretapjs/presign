import styled from 'styled-components'
import { minWidth } from 'app/data/styles'

export const StyledHeader = styled.div`
  background-color : white;

`
export const StyledHeaderContainer = styled.div`
  text-align: center;
  @media only screen and (min-width: ${minWidth.tablet}) {
    text-align: center;
    padding: 25px;
    padding-bottom: 0px;
  }
  @media only screen and (min-width: ${minWidth.desktop}) {
    text-align: left;
    padding-bottom: 25px;
    padding-left: ${props => props.leftPadding};

  }
`
