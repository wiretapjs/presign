import React from 'react'
import { shallow } from 'enzyme'
import RegistrationLoading from 'app/registration/RegistrationLoading'

describe('RegistrationLoading', () => {
  it('should render correctly', () => {
    const ahmsg = shallow(<RegistrationLoading />)
    expect(ahmsg).toMatchSnapshot()
  })
})
