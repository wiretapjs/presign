import { context } from 'test/helpers/jest'
import createEnvironmentConfig from 'test/helpers/environments'
import WelcomeExperiment from 'app/experiments/welcome'
import welcomeConfig from 'app/experiments/welcome/config'

const baseToken = 'foo'
const treatmentAToken = 'blah'

createEnvironmentConfig()

describe('WelcomeExperiment', () => {
  describe('choice', () => {
    context('without a token', () => {
      it('returns the base variant', () => {
        const subject = new WelcomeExperiment().choice
        expect(subject).toBe(welcomeConfig.base)
      })
    })

    context('with a token that resolves to base', () => {
      it('returns the BASE variant', () => {
        const subject = new WelcomeExperiment(baseToken).choice
        expect(subject).toBe(welcomeConfig.base)
      })
    })

    context('with a token that resolves to treatment A', () => {
      it('returns the TREATMENT_A variant', () => {
        const subject = new WelcomeExperiment(treatmentAToken).choice
        expect(subject).toBe(welcomeConfig.treatmentA)
      })
    })
  })
})
