import getESignDestination from 'app/esign/loading/destination'
import { getEsignLoginDestination, getESignRegDestination } from './destination'

class Redirect {
  eserviceEsignLogin (handstampSuffix) {
    window.location.href = getEsignLoginDestination(handstampSuffix)
  }

  eserviceEsign (handstampSuffix) {
    window.location.href = getESignDestination(handstampSuffix)
  }

  eserviceEsignRegister (handstampSuffix) {
    window.location.href = getESignRegDestination(handstampSuffix)
  }
}

export default new Redirect()
