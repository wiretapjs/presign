import React from 'react'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'
import { context } from 'test/helpers/jest'
import RegistrationLink from 'app/welcome/components/RegistrationLink/RegistrationLink'
import config from 'app/config'
import getRegistrationTrafficSplitConfig from 'app/experiments/registrationTrafficSplit/config'

const renderRegistrationLinkWrapper = (registriationTrafficSplitChoice) => {
  return mount(
    <MemoryRouter>
      <RegistrationLink
        registriationTrafficSplitChoice={registriationTrafficSplitChoice}
      />
    </MemoryRouter>)
}

config.registrationLink = 'foo'

const yellowBoxLink = `a[href="${config.registrationLink}"]`
const baseVariant = getRegistrationTrafficSplitConfig().base
const treatmentAVariant = getRegistrationTrafficSplitConfig().treatmentA

let registrationLinkWrapper

describe('RegistrationLink', () => {
  context('with the base variant', () => {
    beforeEach(() => {
      registrationLinkWrapper = renderRegistrationLinkWrapper(baseVariant)
    })

    it('should not redirect to the registration page', () => {
      expect(registrationLinkWrapper.find('Link').exists()).toBe(false)
    })

    it('should link to the Yellow Box', () => {
      expect(registrationLinkWrapper.find(yellowBoxLink).exists()).toBe(true)
    })
  })

  context('with the treatment A variant', () => {
    beforeEach(() => {
      registrationLinkWrapper = renderRegistrationLinkWrapper(treatmentAVariant)
    })

    it('should have a redirect the registration page', () => {
      expect(registrationLinkWrapper.find('Link').exists()).toBe(true)
    })

    it('should not link to the Yellow Box', () => {
      expect(registrationLinkWrapper.find(yellowBoxLink).exists()).toBe(false)
    })
  })
})
