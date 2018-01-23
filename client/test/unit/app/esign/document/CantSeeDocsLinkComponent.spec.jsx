import React from 'react'
import { shallow } from 'enzyme'
import CantSeeDocsLinkComponent from 'app/esign/document/CantSeeDocsLinkComponent'

describe('CantSeeDocsLinkComponent', () => {
  const CantSeeDocsLinkWrapper = shallow(<CantSeeDocsLinkComponent />)
  const CantSeeDocsLinkInstance = CantSeeDocsLinkWrapper.instance()
  it('Render CantSeeDocsLinkComponent', () => {
    expect(CantSeeDocsLinkWrapper).toMatchSnapshot()
  })
  it('Open Dialog to be true', () => {
    CantSeeDocsLinkInstance.openCantSeeDialog()
    expect(CantSeeDocsLinkWrapper.state().openDialog).toBe(true)
  })
  it('Open Dialog to be false', () => {
    CantSeeDocsLinkInstance.closeCantSeeDialog()
    expect(CantSeeDocsLinkWrapper.state().openDialog).toBe(false)
  })
})
