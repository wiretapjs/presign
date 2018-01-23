import { context } from 'test/helpers/jest'
import RegistrationTrafficSplit from 'app/experiments/registrationTrafficSplit'
import Variant from 'app/experiments/Variant'

const baseTokenAt50Percent = 'foo'
const treatmentATokenAt50Percent = 'bla'

const mockConfig = {
  salt: 'registrationTrafficSplit',
  percentBaseVersion: 0,
  base: new Variant('regSplit-base'),
  treatmentA: new Variant('regSplit-a'),
}

const setPercentBaseVersion = function (percentBaseVersion) {
  mockConfig.percentBaseVersion = percentBaseVersion
}

jest.mock('app/experiments/registrationTrafficSplit/config', () => () => {
  return mockConfig
})

describe('RegistrationTrafficSplitService', () => {
  describe('choice', () => {
    context('without a token', () => {
      it('returns the base variant', () => {
        const subject = new RegistrationTrafficSplit().choice
        expect(subject).toBe(mockConfig.base)
      })
    })

    context('with percentBaseVersion set to 100 percent in the config file', () => {
      beforeEach(() => {
        setPercentBaseVersion(100)
      })

      it('always returns the base variant', () => {
        const subject = new RegistrationTrafficSplit(treatmentATokenAt50Percent).choice
        expect(subject).toBe(mockConfig.base)
      })
    })

    context('with percentBaseVersion set to 50 percent in the config file', () => {
      beforeEach(() => {
        setPercentBaseVersion(50)
      })

      context('with a token that resolves to base', () => {
        it('returns the base variant', () => {
          const subject = new RegistrationTrafficSplit(baseTokenAt50Percent).choice
          expect(subject).toBe(mockConfig.base)
        })
      })

      context('with a token that resolves to treatment A', () => {
        it('returns the treatment A variant', () => {
          const subject = new RegistrationTrafficSplit(treatmentATokenAt50Percent).choice
          expect(subject).toBe(mockConfig.treatmentA)
        })
      })
    })

    context('with percentBaseVersion set to 0 percent in the config file', () => {
      beforeEach(() => {
        setPercentBaseVersion(0)
      })

      it('always returns the treatment A variant', () => {
        const subject = new RegistrationTrafficSplit(baseTokenAt50Percent).choice
        expect(subject).toBe(mockConfig.treatmentA)
      })
    })
  })
})
