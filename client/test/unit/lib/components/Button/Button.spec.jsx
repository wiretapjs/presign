import React from 'react'
import { shallow } from 'enzyme'
import { context } from 'test/helpers/jest'
import { Button } from 'lib/components'

describe('Button', () => {
  context('with an onClick prop', () => {
    let mockFunction
    let buttonForTest
    let mockEvent

    beforeEach(() => {
      mockFunction = jest.fn()
      mockEvent = { preventDefault: jest.fn() }
    })

    context('without an onClick function passed', () => {
      beforeEach(() => {
        buttonForTest = shallow(<Button />)
      })

      it('does not prevent the default click event when clicked', () => {
        buttonForTest.simulate('click', mockEvent)
        expect(mockEvent.preventDefault).not.toHaveBeenCalled()
      })
    })

    context('with an onClick function passed', () => {
      beforeEach(() => {
        buttonForTest = shallow(<Button onClick={mockFunction} />)
      })

      it('does not prevent the default click event when clicked', () => {
        buttonForTest.simulate('click', mockEvent)
        expect(mockEvent.preventDefault).not.toHaveBeenCalled()
      })

      it('calls the onClick function when clicked', () => {
        buttonForTest.simulate('click', mockEvent)
        expect(mockFunction).toHaveBeenCalled()
      })
    })
  })
})
