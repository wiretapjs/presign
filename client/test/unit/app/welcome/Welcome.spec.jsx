import React from 'react'
import { shallow } from 'enzyme'
import { MemoryRouter } from 'react-router'
import Welcome from 'app/welcome/Welcome'
import * as WelcomeMock from 'app/experiments/welcome'
import * as welcomeAnalytics from 'app/welcome/analytics'

const renderWelcomeWrapper = (regToken) => {
  return shallow(<MemoryRouter><Welcome regToken={regToken} /></MemoryRouter>).find('Welcome').shallow()
}

describe('Welcome', () => {
  beforeEach(() => {
    WelcomeMock.default = class {
      constructor () {
        this.choice = 'blah'
        this.getStartedLink = 'some new url'
      }
    }
  })

  it('calls the recordWelcomeScreen analytics event', () => {
    welcomeAnalytics.recordWelcomeScreen = jest.fn()
    expect(welcomeAnalytics.recordWelcomeScreen).toHaveBeenCalledTimes(0)

    renderWelcomeWrapper()
    expect(welcomeAnalytics.recordWelcomeScreen).toHaveBeenCalledTimes(1)
  })

  describe('getStartedClickHandler', () => {
    it('calls the getStartedClick analytics event', () => {
      welcomeAnalytics.getStartedClick = jest.fn()
      const welcomeWrapper = renderWelcomeWrapper()
      expect(welcomeAnalytics.getStartedClick).toHaveBeenCalledTimes(0)

      const button = welcomeWrapper.find('Button')
      button.simulate('click')
      expect(welcomeAnalytics.getStartedClick).toHaveBeenCalledTimes(1)
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
})
