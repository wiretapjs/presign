import ExperimentChooser from '../ExperimentChooser'
import getRegistrationTrafficSplitConfig from './config'

class RegistrationTrafficSplit {
  constructor (regToken) {
    this.choice = new ExperimentChooser(getRegistrationTrafficSplitConfig()).makeChoice(regToken)
  }
}

export default RegistrationTrafficSplit
