import React from 'react'
import { shallow } from 'enzyme'
import { Footer } from 'lib/components'

describe('Footer', () => {
  it('should render correctly', () => {
    const ahmsg = shallow(<Footer />)
    expect(ahmsg).toMatchSnapshot()
  })
})
