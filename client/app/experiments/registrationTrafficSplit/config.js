import { isTestEnvironment } from 'app/experiments/configHelpers'
import Variant from '../Variant'

export default function () {
  return {
    salt: 'registrationTrafficSplit',
    percentBaseVersion: isTestEnvironment() ? 0 : 99,
    base: new Variant('regSplit-base'),
    treatmentA: new Variant('regSplit-a'),
  }
}
