import React from 'react'
import { mount } from 'enzyme'
import HelpLink from 'app/esign/document/HelpLink'
import { StyledHelpLinkWrapper, StyledLink } from 'app/esign/document/HelpLink.style'
import * as analytics from 'app/esign/document/analytics'

analytics.recordNeedHelpClick = jest.fn()
describe('HelpLink', () => {
  beforeEach(() => {
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Default', () => {
    const helpLinkWrapper = mount(<HelpLink />)
    it('toggles isDisplayed after clicking', () => {
      const helpLinkInstance = helpLinkWrapper.instance()
      const helpLink = helpLinkWrapper.find(StyledHelpLinkWrapper).first()
      helpLink.simulate('click')
      helpLinkInstance.forceUpdate()
      expect(helpLinkInstance.state.isDisplayed).toBe(true)
    })

    it('register events with analytics', () => {
      const helpLinkInstance = helpLinkWrapper.instance()
      const helpLink = helpLinkWrapper.find(StyledLink).first()
      helpLink.simulate('click')
      helpLinkInstance.forceUpdate()
      expect(analytics.recordNeedHelpClick).toHaveBeenCalledTimes(1)
    })
  })
})
