import environment from 'app/initializers/environment'
import config from 'app/config'
import { context } from 'test/helpers/jest'
import setWindowLocation from 'test/helpers/set-window-location'

describe('environment', () => {
  context('before initialization', () => {
    it('does not define environment in config', () => {
      expect(config.environment).toBeUndefined()
    })

    it('does not define subdomain mappings in config', () => {
      expect(config.libertySubDomainMapping).toBeUndefined()
    })
  })

  context('after initialization', () => {
    afterEach(() => {
      delete config.environment
    })

    it('defines environment in config', () => {
      environment.run()
      expect(config.environment).toBeDefined()
    })

    it('defines subdomain mappings in config', () => {
      environment.run()
      expect(config.libertySubDomainMapping).toBeDefined()
    })

    describe('proper environment defined in config', () => {
      it("chooses 'localhost' when url contains 'localhost'", () => {
        setWindowLocation(undefined)
        environment.run()
        expect(config.environment).toEqual('localhost')
      })

      it("chooses 'development' when url contains 'development'", () => {
        setWindowLocation('development')
        environment.run()
        expect(config.environment).toEqual('development')
      })

      it("chooses 'staging' when url contains 'staging'", () => {
        setWindowLocation('staging')
        environment.run()
        expect(config.environment).toEqual('staging')
      })

      it("chooses 'test' when url contains 'test'", () => {
        setWindowLocation('test')
        environment.run()
        expect(config.environment).toEqual('test')
      })

      it("chooses 'production' when url does not contain an environment name", () => {
        setWindowLocation('')
        environment.run()
        expect(config.environment).toEqual('production')
      })
    })
  })
})
