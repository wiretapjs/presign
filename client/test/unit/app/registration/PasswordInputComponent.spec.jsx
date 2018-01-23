import React from 'react'
import { shallow } from 'enzyme'
import PasswordInputComponent from 'app/registration/passwordInput/PasswordInputComponent'
import PasswordInput from 'app/registration/passwordInput/PasswordInput'

describe('PasswordInputComponent', () => {
  describe('Display input', () => {
    it('should toggle show password', async () => {
      const wrapperInstance = shallow(<PasswordInputComponent />).instance()
      wrapperInstance.togglePassword()
      expect(wrapperInstance.state.isPasswordVisible).toBe(true)
    })

    it('should toggle show password hint when the focus changes', async () => {
      const wrapperInstance = shallow(<PasswordInputComponent />).instance()
      const defaultValue = wrapperInstance.state.isPasswordHintVisible
      wrapperInstance.setPasswordFocusFlag(!defaultValue)
      expect(wrapperInstance.state.isPasswordHintVisible).toBe(!defaultValue)
    })

    it('should toggle the focus flag when the focus changes', async () => {
      const wrapperInstance = shallow(<PasswordInputComponent />).instance()
      const defaultValue = wrapperInstance.state.passwordHasFocus
      wrapperInstance.setPasswordFocusFlag(!defaultValue)
      expect(wrapperInstance.state.passwordHasFocus).toBe(!defaultValue)
    })

    it('should toggle show password hint', async () => {
      const wrapperInstance = shallow(<PasswordInputComponent />).instance()
      const defaultValue = wrapperInstance.state.isPasswordHintVisible
      wrapperInstance.setPasswordHintVisibleFlag(!defaultValue)
      expect(wrapperInstance.state.isPasswordHintVisible).toBe(!defaultValue)
    })
  })

  describe('on password change', () => {
    it('should hide the password hint if the password is valid', () => {
      const parentWrapper = shallow(<PasswordInputComponent />)
      const childWrapper = parentWrapper.find(PasswordInput)

      parentWrapper.setState({ isPasswordHintVisible: true })
      childWrapper.prop('onPasswordChange')({ target: { value: 'testing1' } })
      expect(parentWrapper.state('isPasswordHintVisible')).toBe(false)
    })

    it('should not show the password hint if the password is invalid and the field is not focused', () => {
      const parentWrapper = shallow(<PasswordInputComponent />)
      const childWrapper = parentWrapper.find(PasswordInput)

      parentWrapper.setState({ isPasswordHintVisible: false, passwordHasFocus: false })
      childWrapper.prop('onPasswordChange')({ target: { value: 'test' } })
      expect(parentWrapper.state('isPasswordHintVisible')).toBe(false)
    })

    it('should show the password hint if the password is invalid and the field is focused', () => {
      const parentWrapper = shallow(<PasswordInputComponent />)
      const childWrapper = parentWrapper.find(PasswordInput)

      parentWrapper.setState({ isPasswordHintVisible: false, passwordHasFocus: true })
      childWrapper.prop('onPasswordChange')({ target: { value: 'test' } })
      expect(parentWrapper.state('isPasswordHintVisible')).toBe(true)
    })
  })

  describe('on password input focus', () => {
    it('should show the password hint', () => {
      const parentWrapper = shallow(<PasswordInputComponent />)
      const childWrapper = parentWrapper.find(PasswordInput)

      parentWrapper.setState({ isPasswordHintVisible: false })
      childWrapper.prop('onFocus')()
      expect(parentWrapper.state('isPasswordHintVisible')).toBe(true)
    })

    it('should record the focused state', () => {
      const parentWrapper = shallow(<PasswordInputComponent />)
      const childWrapper = parentWrapper.find(PasswordInput)

      parentWrapper.setState({ passwordHasFocus: false })
      childWrapper.prop('onFocus')()
      expect(parentWrapper.state('passwordHasFocus')).toBe(true)
    })
  })

  describe('on password input blur', () => {
    it('should hide the password hint', () => {
      const parentWrapper = shallow(<PasswordInputComponent />)
      const childWrapper = parentWrapper.find(PasswordInput)

      parentWrapper.setState({ isPasswordHintVisible: true })
      childWrapper.prop('onBlur')()
      expect(parentWrapper.state('isPasswordHintVisible')).toBe(false)
    })

    it('should record the unfocused state', () => {
      const parentWrapper = shallow(<PasswordInputComponent />)
      const childWrapper = parentWrapper.find(PasswordInput)

      parentWrapper.setState({ passwordHasFocus: true })
      childWrapper.prop('onBlur')()
      expect(parentWrapper.state('passwordHasFocus')).toBe(false)
    })
  })

  describe('on password input enter keypress', () => {
    it('should hide the password hint', () => {
      const parentWrapper = shallow(<PasswordInputComponent />)
      const childWrapper = parentWrapper.find(PasswordInput)

      parentWrapper.setState({ isPasswordHintVisible: true })
      childWrapper.prop('onEnterPress')()
      expect(parentWrapper.state('isPasswordHintVisible')).toBe(false)
    })

    it('should not alter the focused state', () => {
      const parentWrapper = shallow(<PasswordInputComponent />)
      const childWrapper = parentWrapper.find(PasswordInput)

      parentWrapper.setState({ passwordHasFocus: true })
      childWrapper.prop('onEnterPress')()
      expect(parentWrapper.state('passwordHasFocus')).toBe(true)
    })
  })
})
