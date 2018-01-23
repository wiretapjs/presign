import ESignLoadingTrafficSplitService from 'app/experiments/eSignLoadingTrafficSplit'
import getESignLoadingTrafficSplitConfig from 'app/experiments/eSignLoadingTrafficSplit/config'
import { context } from 'test/helpers/jest'
import config from 'app/config'

config.environment = 'test'
let token = 'blah'

describe('EsignLoadTrafficSplitService', () => {
  describe('choice', () => {
    afterEach(() => {
      config.environment = ''
      token = ''
    })
    const getChoice = function (token) {
      return new ESignLoadingTrafficSplitService(token).choice
    }

    const getBase = function () {
      return getESignLoadingTrafficSplitConfig().base
    }

    const getTreatmentA = function () {
      return getESignLoadingTrafficSplitConfig().treatmentA
    }
    context('token blah', () => {
      beforeEach(() => {
        token = 'blah'
      })
      it('returns treatmentA variant in localhost', () => {
        config.environment = 'localhost'
        expect(getChoice(token)).toEqual(getTreatmentA())
      })
      it('returns treatmentA variant in test', () => {
        config.environment = 'test'
        expect(getChoice(token)).toEqual(getTreatmentA())
      })
      it('returns treatmentA variant in dev', () => {
        config.environment = 'development'
        expect(getChoice(token)).toEqual(getTreatmentA())
      })
      it('returns base variant in production', () => {
        config.environment = 'production'
        expect(getChoice(token)).toEqual(getBase())
      })
      it('should return base variant', () => {
        config.environment = 'staging'
        expect(getChoice(token)).toEqual(getBase())
      })
    })
    context('token lu576dyntym7g0kke29', () => {
      beforeEach(() => {
        token = 'lu576dyntym7g0kke29'
      })
      it('returns treatmentA variant in localhost', () => {
        config.environment = 'localhost'
        expect(getChoice(token)).toEqual(getTreatmentA())
      })
      it('returns treatmentA variant in test', () => {
        config.environment = 'test'
        expect(getChoice(token)).toEqual(getTreatmentA())
      })
      it('returns treatmentA variant in dev', () => {
        config.environment = 'development'
        expect(getChoice(token)).toEqual(getTreatmentA())
      })
      it('returns treatment A variant in production', () => {
        config.environment = 'production'
        expect(getChoice(token)).toEqual(getTreatmentA())
      })
      it('should return treatment A variant in staging', () => {
        config.environment = 'staging'
        expect(getChoice(token)).toEqual(getTreatmentA())
      })
    })
  })
})
