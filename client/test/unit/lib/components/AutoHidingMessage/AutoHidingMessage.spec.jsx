import React from 'react'
import { shallow, mount } from 'enzyme'
import AutoHidingMessage from 'lib/components/AutoHidingMessage/AutoHidingMessage'

describe('AutoHidingMessage', () => {
  it('should render correctly', () => {
    const ahmsg = shallow(<AutoHidingMessage display />)
    expect(ahmsg).toMatchSnapshot()
  })

  it('should not render anything when display is false', () => {
    const ahmsgWrapper = mount(<AutoHidingMessage display={false} />)
    const ahmInstance = ahmsgWrapper.instance()
    expect(ahmInstance.state.display).toBe(false)
  })

  it('should render when display is true', () => {
    const ahmsgWrapper = mount(<AutoHidingMessage display autoHideDuration={1} />)
    const ahmInstance = ahmsgWrapper.instance()
    expect(ahmInstance.state.display).toBe(true)
  })

  describe('Receiving props', () => {
    it('should set display from new props', async () => {
      const autoHidingMessageWrapper = shallow(<AutoHidingMessage />)
      const autoHidingMessageInstance = autoHidingMessageWrapper.instance()
      await autoHidingMessageInstance.componentWillReceiveProps({ display: true })
      expect(autoHidingMessageInstance.state.display).toEqual(true)
    })

    it('should set message from new props', async () => {
      const autoHidingMessageWrapper = shallow(<AutoHidingMessage />)
      const autoHidingMessageInstance = autoHidingMessageWrapper.instance()
      await autoHidingMessageInstance.componentWillReceiveProps({ message: 'test message' })
      expect(autoHidingMessageInstance.state.message).toEqual('test message')
    })

    it('should set textStyle from new props', async () => {
      const autoHidingMessageWrapper = shallow(<AutoHidingMessage />)
      const autoHidingMessageInstance = autoHidingMessageWrapper.instance()
      await autoHidingMessageInstance.componentWillReceiveProps({ textStyle: { color: 'red' } })
      expect(autoHidingMessageInstance.state.textStyle).toEqual({ color: 'red' })
    })

    it('should set textStyle from new props', async () => {
      const autoHidingMessageWrapper = shallow(<AutoHidingMessage />)
      const autoHidingMessageInstance = autoHidingMessageWrapper.instance()
      await autoHidingMessageInstance.componentWillReceiveProps({ divStyle: { paddingTop: 5, maxWidth: '375px' } })
      expect(autoHidingMessageInstance.state.divStyle).toEqual({ paddingTop: 5, maxWidth: '375px' })
    })
  })

  describe('Autohiding', () => {
    it('should hide when it is displayed and an autohide duration is set', async () => {
      jest.useFakeTimers()

      const autoHidingMessageWrapper = shallow(<AutoHidingMessage />)
      const autoHidingMessageInstance = autoHidingMessageWrapper.instance()
      autoHidingMessageInstance.setState({ display: true, autoHideDuration: 1 })
      await autoHidingMessageInstance.setAutoHide()

      setTimeout(() => {
        expect(autoHidingMessageInstance.state.display).toEqual(false)
      }, autoHidingMessageInstance.state.autoHideDuration)

      jest.runAllTimers()
    })

    it('should not hide when it is displayed and an autohide duration is set, and then hidden', async () => {
      jest.useFakeTimers()

      const autoHidingMessageWrapper = shallow(<AutoHidingMessage />)
      const autoHidingMessageInstance = autoHidingMessageWrapper.instance()
      autoHidingMessageInstance.setState({ display: true, autoHideDuration: 1 })
      await autoHidingMessageInstance.setAutoHide()
      autoHidingMessageInstance.setState({ display: false })

      setTimeout(() => {
        expect(autoHidingMessageInstance.state.display).toEqual(false)
      }, autoHidingMessageInstance.state.autoHideDuration)

      jest.runAllTimers()
    })

    it('should not hide when it is not displayed and an autohide duration is set', async () => {
      const autoHidingMessageWrapper = shallow(<AutoHidingMessage />)
      const autoHidingMessageInstance = autoHidingMessageWrapper.instance()
      autoHidingMessageInstance.setState({ display: false, autoHideDuration: undefined })
      await autoHidingMessageInstance.setAutoHide()
      expect(autoHidingMessageInstance.state.display).toEqual(false)
    })

    it('should not hide when it is not displayed and an autohide duration is set', async () => {
      const autoHidingMessageWrapper = shallow(<AutoHidingMessage />)
      const autoHidingMessageInstance = autoHidingMessageWrapper.instance()
      autoHidingMessageInstance.setState({ display: false, autoHideDuration: undefined })
      await autoHidingMessageInstance.setAutoHide()
      expect(autoHidingMessageInstance.state.display).toEqual(false)
    })

    it('should not hide when it is not displayed and an autohide duration is not set', async () => {
      const autoHidingMessageWrapper = shallow(<AutoHidingMessage />)
      const autoHidingMessageInstance = autoHidingMessageWrapper.instance()
      autoHidingMessageInstance.setState({ display: false, autoHideDuration: undefined })
      await autoHidingMessageInstance.setAutoHide()
      expect(autoHidingMessageInstance.state.display).toEqual(false)
    })

    it('should set autohide duration as seconds when the value is less than 1000', () => {
      const autoHidingMessageWrapper = shallow(<AutoHidingMessage autoHideDuration={1} />)
      const autoHidingMessageInstance = autoHidingMessageWrapper.instance()
      expect(autoHidingMessageInstance.state.autoHideDuration).toEqual(1000)
    })

    it('should set autohide duration as milliseconds when the value is greater or equal to 1000', () => {
      const autoHidingMessageWrapper = shallow(<AutoHidingMessage autoHideDuration={1000} />)
      const autoHidingMessageInstance = autoHidingMessageWrapper.instance()
      expect(autoHidingMessageInstance.state.autoHideDuration).toEqual(1000)
    })
  })
})
