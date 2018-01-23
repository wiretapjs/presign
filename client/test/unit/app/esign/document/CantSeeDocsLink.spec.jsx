import React from 'react'
import { shallow } from 'enzyme'
import CantSeeDocsLink from 'app/esign/document/CantSeeDocsLink'

describe('CantSeeDocsLink', () => {
  it('toggles openDialog after clicking on StyledLink', () => {
    const CantSeeDocsLinkWrapper = shallow(<CantSeeDocsLink />)
    expect(CantSeeDocsLinkWrapper).toMatchSnapshot()
  })
})
