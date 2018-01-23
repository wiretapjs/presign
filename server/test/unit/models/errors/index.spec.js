const Errors = require('models/errors')

describe('Error constructors', () => {
  describe('Default construction', () => {
    Object.keys(Errors).forEach((key) => {
      it(`${key} is created with a default message`, () => {
        const errorInstance = new Errors[key]()
        expect(errorInstance.message).not.toBeNull()
      })
    })
  })
})
