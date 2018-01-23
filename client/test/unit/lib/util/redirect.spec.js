import redirect from 'lib/util/redirect'
import * as getESignDestination from 'app/esign/loading/destination'
import * as destination from 'app/registration/destination'
import * as getESignConfirmationDestination from 'app/esign/confirmation/destination'

const fakeLoginDestination = 'loginDest'
const fakeEsignDestination = 'esginDest'
const fakeRegDestination = 'regDest'
const fakeWelcomeDestination = 'welcomeDest'

destination.getEsignLoginDestination = jest.fn(() => fakeLoginDestination)
getESignDestination.default = jest.fn(() => fakeEsignDestination)
destination.getESignRegDestination = jest.fn(() => fakeRegDestination)
getESignConfirmationDestination.default = jest.fn(() => fakeWelcomeDestination)

Object.defineProperty(window.location, 'href', {
  value: 'foo',
  writable: true,
})
describe('redirect', () => {
  afterEach(() => {
    window.location.href = ''
  })
  describe('eserviceEsignLogin', () => {
    it('should set the location in getEsignLoginDestination', () => {
      redirect.eserviceEsignLogin()
      expect(window.location.href).toBe(fakeLoginDestination)
    })
  })
  describe('eserviceEsign', () => {
    it('should set the location in getESignDestination', () => {
      redirect.eserviceEsign('test')
      expect(window.location.href).toBe(fakeEsignDestination)
    })
  })

  describe('eserviceEsignRegister', () => {
    it('should set the location in getESignRegDestination', () => {
      redirect.eserviceEsignRegister()
      expect(window.location.href).toBe(fakeRegDestination)
    })
  })
  describe('eserviceWelcomePage', () => {
    it('should set the location in getESignConfirmationDestination', () => {
      redirect.eserviceWelcomePage()
      expect(window.location.href).toBe(fakeWelcomeDestination)
    })
  })
})
