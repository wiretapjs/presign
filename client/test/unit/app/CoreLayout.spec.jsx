import React from 'react'
import { shallow } from 'enzyme'
import CoreLayout from 'app/CoreLayout.jsx'

describe('CoreLayout', () => {
  it('renders correctly', () => {
    const comp = shallow(<CoreLayout />)
    expect(comp).toMatchSnapshot()
  })
})
