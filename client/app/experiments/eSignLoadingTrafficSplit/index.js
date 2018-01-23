import ExperimentChooser from '../ExperimentChooser'
import getEsignTrafficSplitConfig from './config'

class ESignTrafficSplitService {
  constructor (regToken) {
    this.choice = new ExperimentChooser(getEsignTrafficSplitConfig()).makeChoice(regToken)
  }
}

export default ESignTrafficSplitService
