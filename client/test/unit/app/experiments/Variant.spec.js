import Variant from 'app/experiments/Variant'

describe('Variant', () => {
  describe('analyticsId', () => {
    it('returns a SHA1 hash of the handstamp string', () => {
      expect(new Variant('Purple Parrots').analyticsId)
        .toBe('20eb778a03ad6e1fb3f33b1e115b48c2cd918b45')
    })
  })
})
