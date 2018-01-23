import { context } from 'test/helpers/jest'
import * as config from 'app/config'
import visitor from 'app/initializers/visitor'

describe('visitor', () => {
  beforeEach(() => {
    config.default = {}
  })

  context('with no token param in the URL', () => {
    beforeEach(() => {
      Object.defineProperty(window.location, 'search', {
        value: '',
        writable: true,
      })
    })

    it('creates an empty visitor object in the config', () => {
      visitor.run()
      expect(config.default.visitor).toEqual({})
    })
  })

  context('with a token param in the URL', () => {
    beforeEach(() => {
      Object.defineProperty(window.location, 'search', {
        value: '?token=hi',
        writable: true,
      })
    })

    it('stores the token in the visitor object', () => {
      visitor.run()
      expect(config.default.visitor).toEqual({
        regToken: 'hi',
      })
    })
  })
})
