import { isTestEnvironment } from 'app/experiments/configHelpers'
import Variant from '../Variant'

export default function () {
  return {
    salt: 'eSignLoadTrafficSplit',
    percentBaseVersion: isTestEnvironment() ? 0 : 50,
    base: new Variant('eSignLoadingSplit-redirect-to-eService'),
    treatmentA: new Variant('eSingLoadingSplit-redirect-to-our-Loader'),
  }
}
