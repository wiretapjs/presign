import analyticsManager from 'lib/services/analytics/analyticsManager'
import AnalyticsEvent from 'lib/services/analytics/AnalyticsEvent'
import dispatchOmniture from 'lib/services/analytics/omniture/dispatch'
import omnitureConfig from 'lib/services/analytics/omniture/config'
import heapConfig from 'lib/services/analytics/heap/config'
import dispatchHeapTracking from 'lib/services/analytics/heap/dispatchTracking'
import config from 'app/config'
import fetchInject from 'lib/services/fetch/fetchInjectEnsighten'
import { asyncFunction } from 'test/helpers/dummy-functions'

fetchInject.injectScript = jest.fn(asyncFunction)

const getArgsForFirstInjectCall = function () {
  return fetchInject.injectScript.mock.calls[0]
}

const mockDispatch = function (analyticsEvent) {
  analyticsEvent.dispatch = jest.fn()
}

const initializeWelcomeMatEvent = new AnalyticsEvent(
  omnitureConfig.initializeWelcomeMat, dispatchOmniture)
const getStartedClickEvent = new AnalyticsEvent(omnitureConfig.getStartedClick, dispatchOmniture)
const welcomeBaseEvent = new AnalyticsEvent(heapConfig.welcome.base, dispatchHeapTracking)
const welcomeAEvent = new AnalyticsEvent(heapConfig.welcome.a, dispatchHeapTracking)

mockDispatch(initializeWelcomeMatEvent)
mockDispatch(getStartedClickEvent)
mockDispatch(welcomeBaseEvent)
mockDispatch(welcomeAEvent)

const sendTestEventsToQueue = async function () {
  analyticsManager.analyticsEventsArr.push(initializeWelcomeMatEvent)
  analyticsManager.analyticsEventsArr.push(welcomeBaseEvent)
  analyticsManager.analyticsEventsArr.push(getStartedClickEvent)
  analyticsManager.analyticsEventsArr.push(welcomeAEvent)
}

const setUpAndRunTestMethod = async function () {
  sendTestEventsToQueue()
  await analyticsManager.run()
}

describe('analyticsManager', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('processQueue', () => {
    it('should process the heap events', async () => {
      await setUpAndRunTestMethod()
      expect(welcomeBaseEvent.dispatch).toHaveBeenCalledTimes(1)
      expect(welcomeAEvent.dispatch).toHaveBeenCalledTimes(1)
    })

    it('should process the omniture events', async () => {
      await setUpAndRunTestMethod()
      expect(initializeWelcomeMatEvent.dispatch).toHaveBeenCalledTimes(1)
      expect(getStartedClickEvent.dispatch).toHaveBeenCalledTimes(1)
    })
  })

  describe('run', () => {
    it('should run react Bootstrap in deployed environment', async () => {
      config.environment = 'production'
      await setUpAndRunTestMethod()
      expect(getArgsForFirstInjectCall()).toEqual(['//nexus.ensighten.com/libertymutual/react/Bootstrap.js'])
    })

    it('should run ccad Bootstrap in local environment', async () => {
      config.environment = 'localhost'
      await setUpAndRunTestMethod()
      expect(getArgsForFirstInjectCall()).toEqual(['//nexus.ensighten.com/libertymutual/ccad/Bootstrap.js'])
    })

    it('should not throw an error if AnalyticsManger fails to run', async () => {
      sendTestEventsToQueue()
      analyticsManager.processQueue = () => { throw Error() }
      expect(async () => { await analyticsManager.run() }).not.toThrow()
    })
  })
})
