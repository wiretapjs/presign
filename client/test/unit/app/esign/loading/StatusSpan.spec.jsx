import React from 'react'
import { shallow } from 'enzyme'
import StatusSpan from 'app/esign/loading/StatusSpan'

const existingCeremony = {
  ceremony: {
    ceremonyStatus: 'accepted',
  },
}

const nonexistingCeremony = {
  ceremony: {
    ceremonyStatus: 'accepte',
  },
}

const initializeStatusSpan = function (props = existingCeremony) {
  return shallow(<StatusSpan {...props} />)
}

describe('StatusSpan', () => {
  it('should display nothing if ceremony status does not exists in mapped UI status', () => {
    const wrapper = initializeStatusSpan(nonexistingCeremony)
    expect(wrapper.type()).toBe(null)
  })
  it('should display the UI status if ceremony status exists in mapped UI status', () => {
    const wrapper = initializeStatusSpan(existingCeremony)
    expect(wrapper.type()).not.toBe(null)
  })
})
