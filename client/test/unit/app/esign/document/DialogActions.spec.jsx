import React from 'react'
import { shallow } from 'enzyme'
import DialogActions from 'app/esign/document/DialogActions'

describe('DialogActions', () => {
  it('toggles openDialog after clicking on StyledLink', () => {
    const DialogActionsWrapper = shallow(<DialogActions />)
    expect(DialogActionsWrapper).toMatchSnapshot()
  })
})
