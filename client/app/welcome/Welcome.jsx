import React, { Component } from 'react'
import PropTypes from 'prop-types'
import autoBind from 'react-autobind'
import Labels from 'app/data/Labels'
import config from 'app/config'
import RegistrationTrafficSplitExperiment from 'app/experiments/registrationTrafficSplit'
import WelcomeExperiment from 'app/experiments/welcome'
import welcomeConfig from 'app/experiments/welcome/config'
import {
  Button,
  Card,
  Logo,
  Column,
  Row,
  Span,
} from 'lib/components'
import View from 'app/View'
import logoImg from 'lib/resources/images/LMI-logo.png'
import * as analytics from './analytics'
import RegistrationLink from './components/RegistrationLink/RegistrationLink'
import BaseMarkup from './components/BaseMarkup/BaseMarkup'
import TreatmentA from './components/TreatmentA/TreatmentA'
import bgImg from './resources/images/welcome_background.jpg'

class Welcome extends Component {
  constructor (props) {
    super(props)
    this.welcomeExperiment = new WelcomeExperiment(props.regToken)
    this.registriationTrafficSplitExperiment =
      new RegistrationTrafficSplitExperiment(props.regToken)
    analytics.recordWelcomeScreen(this.welcomeExperiment.choice.name)
    config.registrationLink = this.welcomeExperiment.getRegistrationLink

    autoBind(this)
  }

  getStartedClickHandler () {
    analytics.getStartedClick(this.welcomeExperiment.choice.name)
  }

  getCopyComponent () {
    if (this.welcomeExperiment.choice === welcomeConfig.treatmentA) {
      return <TreatmentA />
    }
    return <BaseMarkup />
  }

  getButtonLabel () {
    const baseLabel = Labels.screenLabels.welcomeScreen.base.buttonText
    const treatmentALabel = Labels.screenLabels.welcomeScreen.treatmentA.buttonText
    return this.welcomeExperiment.choice === welcomeConfig.treatmentA ? treatmentALabel : baseLabel
  }

  render () {
    return (
      <View bgImg={bgImg}>
        <Column>
          <Span height="40px" />
          <Row>
            <Span
              basis={{
                default: '50%',
                medium: '10%',
              }}
            />
            <Column>
              <Logo src={logoImg} />
              <Card>
                {this.getCopyComponent()}
                <RegistrationLink
                  registriationTrafficSplitChoice={this.registriationTrafficSplitExperiment.choice}
                >
                  <Button heapId={this.welcomeExperiment.choice.analyticsId}
                    onClick={this.getStartedClickHandler}
                    label={this.getButtonLabel()}
                  />
                </RegistrationLink>
              </Card>
            </Column>
            <Span
              basis={{
                default: '20%',
                medium: '10%',
              }}
            />
          </Row>
        </Column>
      </View>
    )
  }
}

Welcome.propTypes = {
  regToken: PropTypes.string,
}

export default Welcome
