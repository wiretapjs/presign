import { formatPolicyNumber } from 'lib/util/policies'

describe('formatPolicyNumber', () => {
  it('should not have any dashes if it is 3 characters', () => {
    expect(formatPolicyNumber('123')).toEqual('123')
  })
  it('should have one dash if it has 4 characters', () => {
    expect(formatPolicyNumber('1234')).toEqual('123-4')
  })
  it('should have one dash if it has 6 characters', () => {
    expect(formatPolicyNumber('123456')).toEqual('123-456')
  })
  it('should have two dashes if it has 7 characters', () => {
    expect(formatPolicyNumber('1234567')).toEqual('123-456-7')
  })
  it('should have two dashes if it has 12 characters', () => {
    expect(formatPolicyNumber('123456789ABC')).toEqual('123-456-789ABC')
  })
  it('should have three dashes if it has 14 characters', () => {
    expect(formatPolicyNumber('123456789ABCDE')).toEqual('123-456-789ABC-DE')
  })
  it('should have three dashes if it has 16 characters', () => {
    expect(formatPolicyNumber('123456789ABCDEF0')).toEqual('123-456-789ABC-DEF0')
  })
})
