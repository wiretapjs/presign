import React from 'react'
import autobind from 'react-autobind'
import PropTypes from 'prop-types'
import { Paper, Header, MainTitle, MainContainer, ErrorMessage, LegalText } from 'lib/components'
import CoreLayout from 'app/CoreLayout'
import Loading from 'app/registration/RegistrationLoading'
import { paperlessTermsAndCondition } from 'app/data/urls'
import paperBackgroundImage from './resources/images/town-drawing-white-background.png'
import { StyledImage, ContentContainer, StyledH2, StyledUl, StyledLink } from './View.style'
import PolicyNumbers from './PolicyNumbers'
import NumberOfDocuments from './NumberOfDocuments'
import MultipleSigners from './MultipleSigners'
import Button from './Button'

export class ESignLoadingView extends React.Component {
  constructor (props) {
    super(props)
    autobind(this)
  }

  _renderPolicyExpectations () {
    if (this._shouldRenderPolicyExpectation()) {
      return (<StyledH2>Here's what to expect:</StyledH2>)
    } else {
      return null
    }
  }

  _shouldRenderPolicyExpectation () {
    const { numberOfEsignDocs, numberOfPrintSignMailDocs, hasMultipleSigners } = this.props
    return numberOfEsignDocs || numberOfPrintSignMailDocs || hasMultipleSigners
  }

  _renderContent () {
    if (this.props.errorMessage) {
      return (<ErrorMessage>{this.props.errorMessage}</ErrorMessage>)
    } else {
      return (
        <ContentContainer>
          <PolicyNumbers ceremonies={this.props.ceremonies} />
          {this._renderPolicyExpectations()}
          <StyledUl>
            <NumberOfDocuments
              numberOfEsignDocs={this.props.numberOfEsignDocs}
              numberOfPrintSignMailDocs={this.props.numberOfPrintSignMailDocs}
            />
            <MultipleSigners hasMultipleSigners={this.props.hasMultipleSigners} />
          </StyledUl>
          <LegalText>
            By continuing you acknowledge to have read, understood, and agreed
            to the&nbsp;
            <StyledLink href={paperlessTermsAndCondition} rel="noopener noreferrer" target="_blank">
              eSignature and Paperless Policy Terms & Conditions.
            </StyledLink>
          </LegalText>
          <Button title="AGREE & CONTINUE" handleClick={this.props.handleClick} />
          <StyledImage src={paperBackgroundImage} />
        </ContentContainer>
      )
    }
  }

  render () {
    return (
      <CoreLayout>
        <Header />
        <MainContainer>
          <MainTitle>Sign your documents in a few simple steps</MainTitle>
          <Paper>
            {this.props.isLoading ? <Loading /> : this._renderContent() }
          </Paper>
        </MainContainer>
      </CoreLayout>
    )
  }
}

ESignLoadingView.propTypes = {
  handleClick: PropTypes.func.isRequired,
  ceremonies: PropTypes.array,
  isLoading: PropTypes.bool,
  errorMessage: PropTypes.string,
  numberOfEsignDocs: PropTypes.number,
  numberOfPrintSignMailDocs: PropTypes.number,
  hasMultipleSigners: PropTypes.bool,
}

export default ESignLoadingView
