import React from 'react'
import Button from 'app/esign/loading/Button'
import { asyncFunction } from 'test/helpers/dummy-functions'
import { shallow, mount } from 'enzyme'

const defaultProps = {
  title: 'AGREE & CONTINUE',
  handleClick: asyncFunction,
}

const initializeViewInstance = function (props = defaultProps) {
  return shallow(<Button {...props} />).instance()
}

describe('disabled button', () => {
  it('should not be disabled at the start', () => {
    const viewInstance = initializeViewInstance()
    expect(viewInstance.state.disabled).toBe(false)
  })
  it('should be disabled when button is clicked', () => {
    const wrapper = mount(<Button {...defaultProps} />)
    wrapper.find('button').simulate('click')
    expect(wrapper.state().disabled).toBe(true)
  })
})
