import digest from 'lib/digest'

describe('digest', () => {
  it('returns the appropriate Java hash code of the input', () => {
    expect(digest('hey there')).toBe(1973704800)
  })
})
