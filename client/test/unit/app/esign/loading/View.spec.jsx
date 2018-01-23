import React from 'react'
import { asyncFunction } from 'test/helpers/dummy-functions'
import { render } from 'enzyme'
import ESignLoadingView from 'app/esign/loading/View'

const defaultProps = {
  policyNumbers: ['AO1234521345'],
  numberOfEsignDocs: 1,
  numberOfPrintSignMailDocs: 1,
  hasMultipleSigners: true,
  isLoading: false,
  errorMessage: null,
  handleClick: asyncFunction,
}

const renderedView = function (props = defaultProps) {
  return render(<ESignLoadingView {...props} />)
}

describe('ESignLoadingView', () => {
  describe('Rendering the error message', () => {
    it('should render the error message', () => {
      const viewWrapper = renderedView({...defaultProps, errorMessage: 'test'})
      expect(viewWrapper.html()).toContain('test')
    })
  })
  describe('Rendering the title', () => {
    it('should not display the expectations if there\'s no information', () => {
      const newProps = {...defaultProps,
        numberOfEsignDocs: 0,
        numberOfPrintSignMailDocs: 0,
        hasMultipleSigners: false,
      }
      const viewWrapper = renderedView(newProps)
      expect(viewWrapper.html()).not.toContain('Here&apos;s what to expect:')
    })
    it('should display the expectations if there\'s no information', () => {
      const newProps = {...defaultProps,
        numberOfEsignDocs: 0,
        numberOfPrintSignMailDocs: 1,
        hasMultipleSigners: false,
      }
      const viewWrapper = renderedView(newProps)
      expect(viewWrapper.html()).toContain('Here&apos;s what to expect:')
    })
  })
})
