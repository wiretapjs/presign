import { getAnalyticsQueue, resetAnalyticsQueue } from 'test/helpers/analytics'
import AnalyticsEvent from 'lib/services/analytics/AnalyticsEvent'
import dispatchHeapIdentification from 'lib/services/analytics/heap/dispatchIdentification'
import dispatchHeapAddUserProperties from 'lib/services/analytics/heap/dispatchAddUserProperties'
import { identifyUser } from 'app/analytics'

const policyNumber = '1111111'
const emailAddress = 'markyMark@gmail.com'

describe('identifyUser', () => {
  afterEach(() => {
    resetAnalyticsQueue()
    jest.clearAllMocks()
  })
  it('identifies the user in Heap', () => {
    identifyUser({emailAddress})
    expect(getAnalyticsQueue())
      .toContainEqual(new AnalyticsEvent(emailAddress, dispatchHeapIdentification))
  })
  it('should add user policy Information if policyNumber is passed', () => {
    identifyUser({policyNumber, emailAddress})
    expect(getAnalyticsQueue()).toContainEqual(
      new AnalyticsEvent({policyNumber}, dispatchHeapAddUserProperties),
    )
  })

  it('should send policy Information if policyNumber is passed, but no email address', () => {
    identifyUser({policyNumber})
    expect(getAnalyticsQueue()).toContainEqual(
      new AnalyticsEvent({policyNumber}, dispatchHeapAddUserProperties),
    )
  })
  it('should not send any events if no information is passed', () => {
    identifyUser()
    expect(getAnalyticsQueue().length).toBe(0)
  })
  it('should not send any events if empty object is passed', () => {
    identifyUser({})
    expect(getAnalyticsQueue().length).toBe(0)
  })
})
