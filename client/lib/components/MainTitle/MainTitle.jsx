import styled from 'styled-components'
import { minWidth } from 'app/data/styles'

export const MainTitle = styled.h1`
  color: #9B9B9B;
  font-size: 22px;
  font-family: 'Roboto-Regular', 'Roboto';
  @media only screen and (min-width: ${minWidth.tablet}) {
    font-size: 36px;
  }
  @media only screen and (min-width: ${minWidth.desktop}) {
    font-size: 40px;
  }
`

export default MainTitle
