import hasValidEsignStatus from 'app/esign/filters/sessions/hasValidEsignStatus'

describe('Filter has Valid Print Doc Count', () => {
  describe('Single session', () => {
    it('false if status is completed', () => {
      const sessionsObject = [
        {
          ceremonyStatus: 'complete',
        },
      ]

      const result = hasValidEsignStatus(sessionsObject)

      expect(result).toBe(false)
    })

    it('false if status is in progress', () => {
      const sessionsObject = [
        {
          ceremonyStatus: 'in progress',
        },
      ]

      const result = hasValidEsignStatus(sessionsObject)

      expect(result).toBe(false)
    })

    it('true if status is accepted', () => {
      const sessionsObject = [
        {
          ceremonyStatus: 'accepted',
        },
      ]

      const result = hasValidEsignStatus(sessionsObject)

      expect(result).toBe(true)
    })
  })

  describe('Multiple sessions', () => {
    it('false any status is completed', () => {
      const sessionsObject = [
        {
          ceremonyStatus: 'accepted',
        },
        {
          ceremonyStatus: 'complete',
        },
      ]

      const result = hasValidEsignStatus(sessionsObject)

      expect(result).toBe(false)
    })

    it('false if any status is in progress', () => {
      const sessionsObject = [
        {
          ceremonyStatus: 'accepted',
        },
        {
          ceremonyStatus: 'in progress',
        },
      ]

      const result = hasValidEsignStatus(sessionsObject)

      expect(result).toBe(false)
    })

    it('true if all statuses are accepted', () => {
      const sessionsObject = [
        {
          ceremonyStatus: 'accepted',
        },
        {
          ceremonyStatus: 'accepted',
        },
      ]

      const result = hasValidEsignStatus(sessionsObject)

      expect(result).toBe(true)
    })
  })
})
