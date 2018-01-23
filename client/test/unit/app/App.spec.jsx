import React from 'react'
import { shallow } from 'enzyme'
import App from 'app/App'
import Welcome from 'app/welcome/Welcome'
import config from 'app/config'
import { context } from 'test/helpers/jest'
import Registration from 'app/registration/Registration'
import ESignLoadingController from 'app/esign/loading/Controller'
import ESignConfirmationController from 'app/esign/confirmation/Controller'

let routes

describe('App', () => {
  beforeEach(() => {
    config.visitor = {
      regToken: 'testToken',
    }
    routes = shallow(<App />).find('Route')
  })

  it('renders correctly', () => {
    const appComp = shallow(<App />)
    expect(appComp).toMatchSnapshot()
  })

  context('with a / path', () => {
    let welcomeRoute

    beforeEach(() => {
      welcomeRoute = routes.find({path: '/'})
    })

    it('renders the Welcome component', () => {
      const welcomeComponent = welcomeRoute.prop('component')()
      expect(welcomeComponent).toEqual(<Welcome regToken={'testToken'} />)
    })
  })

  context('with a /registration path', () => {
    let registrationRoute

    beforeEach(() => {
      registrationRoute = routes.find({path: '/registration'})
    })

    it('renders the Registration component', () => {
      const registrationComponent = registrationRoute.prop('component')()
      expect(registrationComponent).toEqual(<Registration regToken="testToken" />)
    })
  })

  context('with an /esign/loading path', () => {
    let eSignLoadingRoute

    beforeEach(() => {
      eSignLoadingRoute = routes.find({path: '/esign/loading'})
    })

    it('renders the ESignLoading component', () => {
      const ESignLoadingComponent = eSignLoadingRoute.prop('component')()
      expect(ESignLoadingComponent).toEqual(<ESignLoadingController />)
    })
  })

  context('with an /esign/confirmation path', () => {
    let eSignConfirmationRoute

    beforeEach(() => {
      eSignConfirmationRoute = routes.find({path: '/esign/confirmation'})
    })

    it('renders the ESignConfirmation controller', () => {
      const ESignConfirmationComponent = eSignConfirmationRoute.prop('component')()
      expect(ESignConfirmationComponent).toEqual(<ESignConfirmationController />)
    })
  })
})
