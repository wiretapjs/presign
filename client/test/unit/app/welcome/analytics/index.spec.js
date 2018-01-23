import { getAnalyticsQueue, resetAnalyticsQueue } from 'test/helpers/analytics'
import { context } from 'test/helpers/jest'
import { getStartedClick, recordWelcomeScreen } from 'app/welcome/analytics'
import AnalyticsEvent from 'lib/services/analytics/AnalyticsEvent'
import omnitureConfig from 'lib/services/analytics/omniture/config'
import dispatchOmniture from 'lib/services/analytics/omniture/dispatch'
import heapConfig from 'lib/services/analytics/heap/config'
import dispatchHeapTracking from 'lib/services/analytics/heap/dispatchTracking'

Object.defineProperty(console, 'error', {
  value: jest.fn(),
})

describe('welcome analytics', () => {
  afterEach(() => {
    resetAnalyticsQueue()
    jest.clearAllMocks()
  })

  describe('record welcome screen', () => {
    context('Base Variant', () => {
      beforeEach(() => {
        recordWelcomeScreen('base')
      })

      it('adds the view welcomeMat page event for omniture', () => {
        expect(getAnalyticsQueue())
          .toContainEqual(new AnalyticsEvent(omnitureConfig.initializeWelcomeMat, dispatchOmniture))
      })

      it('adds the view welcome base variant event for omniture', () => {
        expect(getAnalyticsQueue()).toContainEqual(new AnalyticsEvent(omnitureConfig.welcome['base'], dispatchOmniture))
      })

      it('adds the view welcome base variant event for heap', () => {
        expect(getAnalyticsQueue()).toContainEqual(new AnalyticsEvent(heapConfig.welcome['base'], dispatchHeapTracking))
      })
    })

    context('A Variant', () => {
      beforeEach(() => {
        recordWelcomeScreen('a')
      })

      it('adds the view welcomeMat page event for omniture', () => {
        expect(getAnalyticsQueue())
          .toContainEqual(new AnalyticsEvent(omnitureConfig.initializeWelcomeMat, dispatchOmniture))
      })

      it('adds the view welcome A variant event for omniture', () => {
        expect(getAnalyticsQueue()).toContainEqual(new AnalyticsEvent(omnitureConfig.welcome['a'], dispatchOmniture))
      })

      it('adds the view welcome A variant event for heap', () => {
        expect(getAnalyticsQueue()).toContainEqual(new AnalyticsEvent(heapConfig.welcome['a'], dispatchHeapTracking))
      })
    })

    context('Non existing variant', () => {
      beforeEach(() => {
        recordWelcomeScreen("I don't exist")
      })

      it('adds the view welcomeMat page event for omniture', () => {
        expect(getAnalyticsQueue())
          .toContainEqual(new AnalyticsEvent(omnitureConfig.initializeWelcomeMat, dispatchOmniture))
      })

      it('records the console error "heap event not found"', () => {
        expect(console.error).toBeCalledWith('Heap Event not found')
      })

      it('records the console error "omniture event not found"', () => {
        expect(console.error).toBeCalledWith('Omniture Event not found')
      })
    })
  })

  describe('get started click', () => {
    context('Base Variant', () => {
      beforeEach(() => {
        getStartedClick('base')
      })
      it('should add the getStartedClick event to Omniture', () => {
        expect(getAnalyticsQueue()).toContainEqual(
          new AnalyticsEvent(omnitureConfig.getStartedClick, dispatchOmniture))
      })
      it('should add the getStartedClick base event to Heap', () => {
        expect(getAnalyticsQueue()).toContainEqual(new AnalyticsEvent(heapConfig.getStartedClick['base'], dispatchHeapTracking))
      })
    })
    context('A Variant', () => {
      beforeEach(() => {
        getStartedClick('a')
      })
      it('should add the getStartedClick event to Ominiture', () => {
        expect(getAnalyticsQueue()).toContainEqual(
          new AnalyticsEvent(omnitureConfig.getStartedClick, dispatchOmniture))
      })
      it('should add the recordRegistrationScreen a event to Heap', () => {
        expect(getAnalyticsQueue()).toContainEqual(new AnalyticsEvent(heapConfig.getStartedClick['a'], dispatchHeapTracking))
      })
    })
    context('Non existing variant', () => {
      beforeEach(() => {
        getStartedClick('non existence')
      })
      it('should console error heap event not found', () => {
        expect(console.error).toBeCalledWith('Heap Event not found')
      })
    })
  })
})
