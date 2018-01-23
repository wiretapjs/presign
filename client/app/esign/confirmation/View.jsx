import React from 'react'
import PropTypes from 'prop-types'
import { Header, MainContainer, MainTitle } from 'lib/components'
import getESignConfirmationDestination from 'app/esign/confirmation/destination'
import CoreLayout from 'app/CoreLayout'
import {StyledButton, StyledText} from './View.style'

const getButtonContent = function (isDataLoading) {
  if (isDataLoading) {
    return 'LOADING...'
  }

  return 'EXPLORE YOUR ACCOUNT'
}

const ESignConfirmationView = function (props) {
  return (
    <CoreLayout>
      <div>
        <Header />
        <MainContainer>
          <MainTitle>
            You're all set!
          </MainTitle>
          <StyledText>
            Now see what your online account can do for you.
          </StyledText>
          <a href={getESignConfirmationDestination()}>
            <StyledButton
              label="EXPLORE YOUR ACCOUNT"
              disabled={props.isDataLoading}
            >
              {getButtonContent(props.isDataLoading)}
            </StyledButton>
          </a>
        </MainContainer>
      </div>
    </CoreLayout>
  )
}

ESignConfirmationView.propTypes = {
  isDataLoading: PropTypes.bool,
}

export default ESignConfirmationView
