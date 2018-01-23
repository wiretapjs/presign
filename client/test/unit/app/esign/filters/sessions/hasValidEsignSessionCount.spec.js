import hasValidEsignSessionCount from 'app/esign/filters/sessions/hasValidEsignSessionCount'

describe('Filter has Valid sesesions Doc Count', () => {
  describe('Single session', () => {
    it('true if 1 sessions', () => {
      const sessionsObject = [
        {
          eSignSession: [],
        },
      ]

      const result = hasValidEsignSessionCount(sessionsObject)

      expect(result).toBe(true)
    })

    it('false if 0 sessions', () => {
      const sessionsObject = []

      const result = hasValidEsignSessionCount(sessionsObject)

      expect(result).toBe(false)
    })

    describe('Multiple sessions', () => {
      it('false if multiple sessions', () => {
        const sessionsObject = [
          {
            eSignSession: [],
          },
          {
            eSignSession: [],
          },
        ]

        const result = hasValidEsignSessionCount(sessionsObject)

        expect(result).toBe(false)
      })
    })
  })
})
