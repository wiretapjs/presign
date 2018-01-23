import React from 'react'
import { mount, shallow } from 'enzyme'
import _ from 'lodash'
import { context } from 'test/helpers/jest'
import muiTheme from 'app/muiTheme'
import ESignDocumentView from 'app/esign/document/Document'
import {StyledErrorMessage} from 'app/esign/document/Document.style'
import sessionsService from 'lib/services/sessions'
import redirect from 'lib/util/redirect'
import * as common from 'app/esign/filters/common'
import ceremoniesService from 'lib/services/ceremonies'
import policyService from 'lib/services/policies'
import * as esignIframeData from 'app/data/esignIframe'
import { flushPromises } from 'test/helpers/promises'
import { recordESignDocument, recordESignDocumentError } from 'app/esign/document/analytics'

const history = {
  push: jest.fn(),
}

const mountWithContext = node => mount(node, {
  context: { muiTheme },
  childContextTypes: { muiTheme: React.PropTypes.object },
})

redirect.eserviceEsignLogin = jest.fn()
let esignRenderWrapper
let esignDocumentInstance

jest.mock('app/esign/document/analytics')

const sessionsResponse = [{
  eSignSession: [
    {
      signerSession: [
        { namedInsuredNumber: 1,
          esignatureUrl: 'http://example.com',
        },
      ],
      numSignOnlineDocs: '3',
      numPrintSignMailDocs: '0',
    },
  ],
  signerCount: 1,
  policyNumber: 5,
},
]

describe('Esign Document View', () => {
  beforeEach(() => {
    ceremoniesService.getCeremonies = jest.fn(() => Promise.resolve({
      ceremonies: [
        {
          redirectIndicator: 'N',
          ceremonyStatus: 'complete',
        },
      ],
    }))
    esignRenderWrapper = shallow(<ESignDocumentView history={history} />)
    esignDocumentInstance = esignRenderWrapper.instance()
    common.canEsign = jest.fn(() => true)
    sessionsService.getUpdatedSessions = jest.fn(() => Promise.resolve(
      sessionsResponse,
    ))
    policyService.getCachedSummary = jest.fn(() => Promise.resolve(
      {
        policyNumber: 12345,
        policyJurisdiction: 'CA',
      },
    ))
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('it should render Esign Document View', () => {
    expect(esignRenderWrapper).toMatchSnapshot()
  })
  it('it should render Error message if isErrorMessage is true', () => {
    esignRenderWrapper = mountWithContext(
      <ESignDocumentView history={history} />,
    )
    esignRenderWrapper.setState({showErrorMessage: true, showLoading: false})
    expect(esignRenderWrapper.find(StyledErrorMessage).length).toBe(1)
  })

  describe('on mount', () => {
    it('should set show loading to false once get the list of esign sessions and the policy summary', async () => {
      await esignDocumentInstance.componentDidMount()
      expect(sessionsService.getUpdatedSessions).toHaveBeenCalledTimes(1)
      expect(policyService.getCachedSummary).toHaveBeenCalledTimes(1)
      expect(esignRenderWrapper.state().showLoading).toBe(false)
    })

    context('with eSign sessions that meet E2 filter criteria', () => {
      beforeEach(async () => {
        await esignDocumentInstance.componentDidMount()
      })

      it('should record the page load analytics event', () => {
        expect(recordESignDocument).toHaveBeenCalledTimes(1)
      })

      it('it should not redirect', async () => {
        await esignDocumentInstance.componentDidMount()
        expect(redirect.eserviceEsignLogin).not.toHaveBeenCalled()
      })
    })

    context('with an invalid esignature url', () => {
      beforeEach(async () => {
        const sessionsResponseWithInvalidUrl = _.cloneDeep(sessionsResponse)
        sessionsResponseWithInvalidUrl[0].eSignSession[0].signerSession[0].esignatureUrl = 'false'
        sessionsService.getUpdatedSessions = jest.fn(
          () => Promise.resolve(sessionsResponseWithInvalidUrl))
        await esignDocumentInstance.componentDidMount()
        await flushPromises()
      })
      it('should record the error analytics event', () => {
        expect(recordESignDocumentError).toHaveBeenCalledTimes(1)
      })

      it('it should redirect', () => {
        expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
      })
    })

    context('with an error response from the eSign session service', () => {
      beforeEach(async () => {
        sessionsService.getUpdatedSessions = jest.fn(() => Promise.reject(new Error()))
        await esignDocumentInstance.componentDidMount()
        await flushPromises()
      })

      it('should record the error analytics event', () => {
        expect(recordESignDocumentError).toHaveBeenCalledTimes(1)
      })

      it('it should redirect', () => {
        expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
      })
    })

    context('with eSign sessions that do not meet E2 filter criteria', () => {
      beforeEach(async () => {
        common.canEsign = jest.fn(() => false)
        await esignDocumentInstance.componentDidMount()
      })

      it('it should redirect', () => {
        expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
      })

      it('should record the error analytics event', () => {
        expect(recordESignDocumentError).toHaveBeenCalledTimes(1)
      })
    })

    context('with an error response from the policy service', () => {
      beforeEach(async () => {
        policyService.getCachedSummary = jest.fn(() => Promise.reject(new Error()))
        await esignDocumentInstance.componentDidMount()
        await flushPromises()
      })

      it('should redirect', () => {
        expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
      })

      it('should record the error analytics event', () => {
        expect(recordESignDocumentError).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('esignEventsHandler', () => {
    const domain = 'libertymutual.com'
    beforeEach(async () => {
      await esignDocumentInstance.componentDidMount()
      await flushPromises()
    })

    context('with a SIGNER_COMPLETE_STARTED event', () => {
      const event = esignIframeData.events.SIGNER_COMPLETE_STARTED

      it('does not show an error message', () => {
        esignDocumentInstance.esignEventsHandler(event, domain)
        expect(esignDocumentInstance.state.showErrorMessage).toBe(false)
      })

      it('sets showLoading to true', () => {
        esignDocumentInstance.esignEventsHandler(event, domain)
        expect(esignDocumentInstance.state.showLoading).toBe(true)
      })

      context('with a valid ceremonies result', () => {
        it('redirects to the esign confirmation page', async () => {
          esignDocumentInstance.esignEventsHandler(event, domain)
          await flushPromises()
          expect(history.push).toHaveBeenCalledWith({
            pathname: '/esign/confirmation',
            search: window.location.search,
          })
        })
      })

      context('with an empty ceremonies result', () => {
        it('redirects to the yellow box', async () => {
          ceremoniesService.getCeremonies = jest.fn(() => Promise.resolve({
            ceremonies: [],
          }))

          esignDocumentInstance.esignEventsHandler(event, domain)
          await flushPromises()
          expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
        })
      })

      context('with an empty result', () => {
        it('redirects to the yellow box', async () => {
          ceremoniesService.getCeremonies = jest.fn(() => Promise.resolve({}))

          esignDocumentInstance.esignEventsHandler(event, domain)
          await flushPromises()
          expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
        })
      })

      context('with a ceremony with a redirectIndicator', () => {
        it('redirects to the yellow box', async () => {
          ceremoniesService.getCeremonies = jest.fn(() => Promise.resolve({
            ceremonies: [
              {
                redirectIndicator: 'Y',
                ceremonyStatus: 'complete',
              },
            ],
          }))

          esignDocumentInstance.esignEventsHandler(event, domain)
          await flushPromises()
          expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
        })
      })

      context('with a ceremony with a ceremonyStatus', () => {
        it('redirects to the yellow box', async () => {
          ceremoniesService.getCeremonies = jest.fn(() => Promise.resolve({
            ceremonies: [
              {
                redirectIndicator: 'Y',
                ceremonyStatus: 'failed',
              },
            ],
          }))

          esignDocumentInstance.esignEventsHandler(event, domain)
          await flushPromises()
          expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
        })
      })

      context('with a failing ceremonies service call', () => {
        it('redirects to the yellow box', async () => {
          ceremoniesService.getCeremonies = jest.fn(() => Promise.reject(new Error()))
          esignDocumentInstance.esignEventsHandler(event, domain)
          await flushPromises()
          expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
        })
      })
    })

    context('with a SIGNER_COMPLETE_SUCCESS', () => {
      const event = esignIframeData.events.SIGNER_COMPLETE_SUCCESS

      it('does not show an error message', () => {
        esignDocumentInstance.esignEventsHandler(event, domain)
        expect(esignDocumentInstance.state.showErrorMessage).toBe(false)
      })

      it('sets showLoading to true', () => {
        esignDocumentInstance.esignEventsHandler(event, domain)
        expect(esignDocumentInstance.state.showLoading).toBe(true)
      })

      context('with a valid ceremonies result', () => {
        it('redirects to the esign confirmation page', async () => {
          esignDocumentInstance.esignEventsHandler(event, domain)
          await flushPromises()
          expect(history.push).toHaveBeenCalledWith({
            pathname: '/esign/confirmation',
            search: window.location.search,
          })
        })
      })

      context('with an empty ceremonies result', () => {
        it('redirects to the yellow box', async () => {
          ceremoniesService.getCeremonies = jest.fn(() => Promise.resolve({
            ceremonies: [],
          }))

          esignDocumentInstance.esignEventsHandler(event, domain)
          await flushPromises()
          expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
        })
      })

      context('with an empty result', () => {
        it('redirects to the yellow box', async () => {
          ceremoniesService.getCeremonies = jest.fn(() => Promise.resolve({}))

          esignDocumentInstance.esignEventsHandler(event, domain)
          await flushPromises()
          expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
        })
      })

      context('with a ceremony with a ceremonyStatus', () => {
        it('redirects to the yellow box', async () => {
          ceremoniesService.getCeremonies = jest.fn(() => Promise.resolve({
            ceremonies: [
              {
                redirectIndicator: 'Y',
                ceremonyStatus: 'failed',
              },
            ],
          }))

          esignDocumentInstance.esignEventsHandler(event, domain)
          await flushPromises()
          expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
        })
      })

      context('with a failing ceremonies service call', () => {
        it('redirects to the yellow box', async () => {
          ceremoniesService.getCeremonies = jest.fn(() => Promise.reject(new Error()))
          esignDocumentInstance.esignEventsHandler(event, domain)
          await flushPromises()
          expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
        })
      })

      context('with a failing ceremonies service call', () => {
        it('redirects to the yellow box', async () => {
          ceremoniesService.getCeremonies = jest.fn(() => Promise.reject(new Error()))
          esignDocumentInstance.esignEventsHandler(event, domain)
          await flushPromises()
          expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
        })
      })
    })

    context('with another non-error event', () => {
      beforeEach(() => {
        esignDocumentInstance.esignEventsHandler('foo', domain)
      })

      it('does not show an error message', () => {
        expect(esignDocumentInstance.state.showErrorMessage).toBe(false)
      })

      it('does not set showLoading to true', () => {
        expect(esignDocumentInstance.state.showLoading).toBe(false)
      })
    })

    context('with an error event', () => {
      beforeEach(() => {
        const data = esignIframeData.events.PACKAGE_DECLINE_ERROR
        esignDocumentInstance.esignEventsHandler(data, domain)
      })

      it('does not set showLoading to true', () => {
        expect(esignDocumentInstance.state.showLoading).toBe(false)
      })

      it('sets showError to true', () => {
        expect(esignDocumentInstance.state.showErrorMessage).toBe(true)
      })
      it('redirect to esign', () => {
        expect(redirect.eserviceEsignLogin).toHaveBeenCalledTimes(1)
      })
    })

    context('with an undefined event', () => {
      beforeEach(() => {
        esignDocumentInstance.esignEventsHandler(undefined, domain)
      })

      it('does not show an error message', () => {
        expect(esignDocumentInstance.state.showErrorMessage).toBe(false)
      })

      it('does not set showLoading to true', () => {
        expect(esignDocumentInstance.state.showLoading).toBe(false)
      })
    })
  })
})
