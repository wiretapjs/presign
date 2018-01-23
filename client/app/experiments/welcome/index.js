import getWelcomeDestination from 'app/welcome/destination'
import ExperimentChooser from '../ExperimentChooser'
import welcomeConfig from './config'

class Welcome {
  constructor (regToken) {
    this.choice = new ExperimentChooser(welcomeConfig).makeChoice(regToken)
    this.getRegistrationLink = getWelcomeDestination(this.choice)
  }
}

export default Welcome
