import requestValidator from 'api/policies/v1/list/requestValidator.js'
import PolicyRequestValidatorModel from 'models/policy/PolicyRequestValidatorModel.js'

describe('List Service Request validator', () => {
  it('is valid is false when an invalid line of business', () => {
    const validationInput = new PolicyRequestValidatorModel()
    validationInput.filters.linesOfBusiness.push('Not Valid')
    const result = requestValidator.validate(validationInput)

    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBe(1)
  })

  it('is valid is true when a valid line of business', () => {
    const validationInput = new PolicyRequestValidatorModel()
    validationInput.filters.linesOfBusiness.push('HOME')
    const result = requestValidator.validate(validationInput)
    expect(result.errors.length).toBe(0)
    expect(result.isValid).toBe(true)
  })

  it('is valid is true when no line of business', () => {
    const validationInput = new PolicyRequestValidatorModel()
    delete validationInput.filters.linesOfBusiness
    const result = requestValidator.validate(validationInput)

    expect(result.isValid).toBe(true)
    expect(result.errors.length).toBe(0)
  })

  it('is valid is false when an invalid rating', () => {
    const validationInput = new PolicyRequestValidatorModel()
    validationInput.filters.ratingMethod = 'Not Valid'
    const result = requestValidator.validate(validationInput)

    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBe(1)
  })

  it('is valid is true when a valid rating', () => {
    const validationInput = new PolicyRequestValidatorModel()
    validationInput.filters.ratingMethod = 'MANUAL'
    const result = requestValidator.validate(validationInput)

    expect(result.isValid).toBe(true)
    expect(result.errors.length).toBe(0)
  })

  it('is valid is true when no rating', () => {
    const validationInput = new PolicyRequestValidatorModel()
    const result = requestValidator.validate(validationInput)

    expect(result.isValid).toBe(true)
    expect(result.errors.length).toBe(0)
  })

  it('is valid is false and has two errors when rating and filter are invalid', () => {
    const validationInput = new PolicyRequestValidatorModel()
    validationInput.filters.ratingMethod = 'Not Valid'
    validationInput.filters.linesOfBusiness.push('Not Valid')
    const result = requestValidator.validate(validationInput)

    expect(result.isValid).toBe(false)
    expect(result.errors.length).toBe(2)
  })
})
