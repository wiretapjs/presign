import styled from 'styled-components'
import { minWidth } from 'app/data/styles'

const defaultLeftPadding = '90px'

export const MainContainer = styled.div`
  min-height: 600px;
  margin-top: 4em;
  font-family: 'Roboto-Regular', 'Roboto';
  text-align: center;
  ul li{
    margin-bottom: 18px;
    list-style: none;
    color: #F1C142;
  }
  ul {
    padding: 0px;
    padding-left: 1em;
  }
  ul li span{
    color: black;
  }
  @media only screen and (min-width: ${minWidth.tablet}) {
    ul li{
      color: #F1C142;
      list-style: inherit;
    }
  }
  @media only screen and (min-width: ${minWidth.desktop}) {
    padding-left: ${props => props.leftPadding ? props.leftPadding : defaultLeftPadding};
    text-align: left;
  }

`

export default MainContainer
