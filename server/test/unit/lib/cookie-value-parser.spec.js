const cookieParser = require('lib/cookie-value-parser')

describe('Test the cookie parser', () => {
  it('should return null when no cookie passed', () => {
    const result = cookieParser.filterCookies(null, null)

    expect(result.length).toBe(0)
  })

  it('should return null when no target passed', () => {
    const result = cookieParser.filterCookies(null, null)

    expect(result.length).toBe(0)
  })

  it('should return null when no target passed', () => {
    const result = cookieParser.filterCookies(null, 'null')

    expect(result.length).toBe(0)
  })

  it('should return values when target matched', () => {
    const result = cookieParser.filterCookies(['some=test', 'some=othertest'], 'some')

    expect(result.length).toBe(2)
  })
})
