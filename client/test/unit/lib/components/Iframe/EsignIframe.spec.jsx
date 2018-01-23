import React from 'react'
import { shallow, mount } from 'enzyme'
import { EsignIframe } from 'lib/components'

describe('EsignIframe', () => {
  it('should render correctly', () => {
    const esignIframe = shallow(<EsignIframe />)
    esignIframe.setState({showLoading: true})
    esignIframe.iframeOnLoadEvent = jest.fn()
    expect(esignIframe).toMatchSnapshot()
  })
  it('should set show loading to false once iframe loaded', () => {
    const esignIframe = mount(<EsignIframe url="test" esignEvents={jest.fn()} />)
    esignIframe.receiveMessage = jest.fn()
    const iFrame = esignIframe.find('iframe')
    expect(iFrame.exists()).toBe(true)
    iFrame.simulate('load')
    expect(esignIframe.state().showLoading).toBe(false)
  })
})

describe('After mounting', () => {
  let receiveMessage, mountEsignInstance
  const mountEsignIframe = () => {
    const mountEsignWrapper = shallow(<EsignIframe url="test" esignEvents={jest.fn()} />)
    mountEsignInstance = mountEsignWrapper.instance()
    receiveMessage = jest.spyOn(mountEsignInstance, 'receiveMessage')
    mountEsignInstance.componentDidMount()
    window.dispatchEvent(new CustomEvent('message'))
    return mountEsignInstance
  }
  it('should recive message from iframe', async () => {
    await mountEsignIframe()
    expect(receiveMessage).toHaveBeenCalled()
  })
  it('should post ESL:MESSAGE:REGISTER', async () => {
    const event = {
      origin: 'libertymutual.com',
      data: 'ESL:MESSAGE:REGISTER',
      source: {
        postMessage: jest.fn(),
      },
    }
    mountEsignInstance.receiveMessage(event)
    expect(event.source.postMessage).toHaveBeenCalledWith('ESL:MESSAGE:ACTIVATE_EVENTS', 'libertymutual.com')
  })
  it('should post ESL:MESSAGE:SUCCESS:SIGNER_COMPLETE', async () => {
    const event = {
      origin: 'libertymutual.com',
      data: 'ESL:MESSAGE:SUCCESS:SIGNER_COMPLETE',
      source: {
        postMessage: jest.fn(),
      },
    }
    mountEsignInstance.receiveMessage(event)
    expect(event.source.postMessage).toHaveBeenCalledWith('ESL:MESSAGE:SUCCESS:SIGNER_COMPLETE', 'libertymutual.com')
  })
  it('should post any other events back to iframe', async () => {
    const event = {
      origin: 'libertymutual.com',
      data: 'events',
      source: {
        postMessage: jest.fn(),
      },
    }
    mountEsignInstance.receiveMessage(event)
    expect(event.source.postMessage).toHaveBeenCalledWith('events', 'libertymutual.com')
  })
})
