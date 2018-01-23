import { getAnalyticsQueue, resetAnalyticsQueue } from 'test/helpers/analytics'
import * as registrationAnalytics from 'app/registration/analytics'
import AnalyticsEvent from 'lib/services/analytics/AnalyticsEvent'
import omnitureConfig from 'lib/services/analytics/omniture/config'
import dispatchOmniture from 'lib/services/analytics/omniture/dispatch'
import heapConfig from 'lib/services/analytics/heap/config'
import dispatchHeapTracking from 'lib/services/analytics/heap/dispatchTracking'

describe('registration analytics', () => {
  afterEach(() => {
    resetAnalyticsQueue()
    jest.clearAllMocks()
  })

  describe('Registration Screen', () => {
    beforeEach(() => {
      registrationAnalytics.recordRegistrationScreen()
    })
    it('should add the initializeRegistration event to Omniture', () => {
      expect(getAnalyticsQueue())
        .toContainEqual(new AnalyticsEvent(omnitureConfig.initializeRegistration, dispatchOmniture))
    })
    it('should add the initializeRegistration event to Heap', () => {
      expect(getAnalyticsQueue()).toContainEqual(
        new AnalyticsEvent(heapConfig.initializeRegistration, dispatchHeapTracking),
      )
    })
  })

  describe('Registration Submit', () => {
    beforeEach(() => {
      registrationAnalytics.recordRegistrationSubmit()
    })
    it('should add the submitRegistrationClick event to Heap', () => {
      expect(getAnalyticsQueue()).toContainEqual(
        new AnalyticsEvent(heapConfig.submitRegistrationClick, dispatchHeapTracking))
    })
  })

  describe('Complete Registration', () => {
    beforeEach(() => {
      registrationAnalytics.recordRegistrationComplete()
    })
    it('should add the completeRegistration event to Heap', () => {
      expect(getAnalyticsQueue())
        .toContainEqual(new AnalyticsEvent(heapConfig.completeRegistration, dispatchHeapTracking))
    })
  })
  describe('Complete Automatic Login', () => {
    beforeEach(() => {
      registrationAnalytics.recordAutomaticLoginComplete()
    })
    it('should add the completeAutomaticLogin event to Heap', () => {
      expect(getAnalyticsQueue())
        .toContainEqual(new AnalyticsEvent(heapConfig.completeAutomaticLogin, dispatchHeapTracking))
    })
  })
})
