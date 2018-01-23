import getESignDestination from 'app/esign/loading/destination'
import { getEsignLoginDestination, getESignRegDestination } from 'app/registration/destination'
import getESignConfirmationDestination from 'app/esign/confirmation/destination'

class Redirect {
  eserviceEsignLogin (handstampSuffix) {
    window.location.href = getEsignLoginDestination(handstampSuffix)
  }

  eserviceEsign (handstampSuffix) {
    window.location.href = getESignDestination(handstampSuffix)
  }

  eserviceWelcomePage (handstampSuffix) {
    window.location.href = getESignConfirmationDestination()
  }

  eserviceEsignRegister (handstampSuffix) {
    window.location.href = getESignRegDestination(handstampSuffix)
  }
}

export default new Redirect()
