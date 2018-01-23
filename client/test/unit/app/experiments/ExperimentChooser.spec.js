import { context } from 'test/helpers/jest'
import ExperimentChooser from 'app/experiments/ExperimentChooser'
import Variant from 'app/experiments/Variant'

const baseCriteriaValueAt50Percent = 'woohoo'
const treatmentACriteriaValueAt50Percent = 'blorg'
const config = {
  salt: 'foo',
  base: new Variant('foo'),
  treatmentA: new Variant('bar'),
}

const setPercentBaseVersion = function (percentBaseVersion) {
  config.percentBaseVersion = percentBaseVersion
}

describe('ExperimentChooser', () => {
  describe('makeChoice', () => {
    context('without a criteria value', () => {
      it('returns the base variant', () => {
        setPercentBaseVersion(0)
        const subject = new ExperimentChooser(config).makeChoice()
        expect(subject).toBe(config.base)
      })
    })

    context('with a criteria value', () => {
      context('with percentBaseVersion set to 100 percent in the config', () => {
        beforeEach(() => {
          setPercentBaseVersion(100)
        })

        it('always returns the base variant', () => {
          const subject = new ExperimentChooser(config)
            .makeChoice(treatmentACriteriaValueAt50Percent)
          expect(subject).toBe(config.base)
        })
      })

      context('with percentBaseVersion set to 50 percent in the config file', () => {
        beforeEach(() => {
          setPercentBaseVersion(50)
        })

        context('with a criteria value that resolves to base', () => {
          it('returns the base variant', () => {
            const subject = new ExperimentChooser(config).makeChoice(baseCriteriaValueAt50Percent)
            expect(subject).toBe(config.base)
          })
        })

        context('with a criteria value that resolves to treatment A', () => {
          it('returns the treatment A variant', () => {
            const subject = new ExperimentChooser(config)
              .makeChoice(treatmentACriteriaValueAt50Percent)
            expect(subject).toBe(config.treatmentA)
          })
        })
      })

      context('with percentBaseVersion set to 0 percent in the config file', () => {
        beforeEach(() => {
          setPercentBaseVersion(0)
        })

        it('always returns the treatment A variant', () => {
          const subject = new ExperimentChooser(config).makeChoice(baseCriteriaValueAt50Percent)
          expect(subject).toBe(config.treatmentA)
        })
      })
    })
  })
})
