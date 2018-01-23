import styled from 'styled-components'

export const StyledLink = styled.a`
  color: #1B75BB;
`

export const VeryLargeText = styled.div`
  height: 250px;
  text-align: center;
  font-family: Roboto, sans-serif;
  font-weight: 300;
  font-size: 2em;
  color: #001663;
  margin-top: 30%;
`

export const SubmitContainer = styled.div`{
    @media only screen and (min-width: 320px){
        float : none;
        margin-right : -7px;
    }

    @media only screen and (min-width: 768px){
        float : left;
        margin-right : 10px;
    }
  `

export const Card = styled.div`{
    background-color: #fff;
    -webkit-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
    -moz-box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);
    box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.35);

    @media only screen and (min-width: 320px){
         padding: 10px;
         padding-right : 15px;
    }

    @media only screen and (min-width: 480px){
        padding: 30px;
    }

    @media only screen and (min-width: 768px){
        padding: 65px;
    }
      `

export const TermsContainer = styled.div`{
    height : 50px;
    display : flex;
    flex-direction : row;
    align-items : center;
`

export const RegContainer = styled.div`{
    margin : auto;
    @media only screen and (min-width: 320px){
        max-width : 365px;
    }

    @media only screen and (min-width: 480px){
        max-width : 365px;
    }

    @media only screen and (min-width: 768px){
        max-width : 500px;
    }

    @media only screen and (min-width: 1280px){
        max-width : 500px;
    }
`

export const HeadlineContainer = styled.div`{
    text-align: center;
    font-size: 40px;
    font-weight: 300;
    margin-bottom: 50px;
    color: #404040;

    @media only screen and (min-width: 320px){
        font-size: 24px;
        margin-bottom: 20px;
    }

    @media only screen and (min-width: 480px){
        font-size: 28px;
        margin-bottom: 25px;
    }
`

export const SubheadlineContainer = styled.div`{
    margin-bottom: 18px;
    text-align: center;
    font-size: 20px;
    color: #404040;

    @media only screen and (min-width: 320px){
        font-size: 13px;
        margin-bottom: 10px;
    }

    @media only screen and (min-width: 480px){
        font-size: 14px;
    }
`
