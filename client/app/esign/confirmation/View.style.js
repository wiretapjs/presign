import styled from 'styled-components'

export const StyledText = styled.p`
  fontSize: 1.75em;
  color: black;
  font-size: 15px;
  @media only screen and (min-width: 600px) {
    font-size: 18px;
  }
  @media only screen and (min-width: 992px) {
    font-size: 24px;
  }
`

export const StyledButton = styled.button`
  margin-top: 15px;
  border-radius: 2px;
  border: none;
  color: #fff;
  background-color: rgba(229, 117, 2, 1);
  width: 290px;
  height: 50px;
  font-size: 15px;
  cursor: pointer;
  @media only screen and (min-width: 500px) {
    font-size: 18px;
  }

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`
