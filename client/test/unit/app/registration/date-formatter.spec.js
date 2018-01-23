import { isValidDate, formatDateString } from 'app/registration/date-formatter'

describe('date formatter', () => {
  describe('isValidDate', () => {
    it('should return true when passed yyyy-mm-dd', () => {
      const result = isValidDate('2001-01-01')
      expect(result).toBe(true)
    })

    it('should return false when passed yy-mm-dd', () => {
      const result = isValidDate('99-01-01')
      expect(result).toBe(false)
    })

    it('should return false when passed yyyy-m-dd', () => {
      const result = isValidDate('2001-1-01')
      expect(result).toBe(false)
    })

    it('should return false when passed yyyy-mm-d', () => {
      const result = isValidDate('2001-01-1')
      expect(result).toBe(false)
    })

    it('should return true when passed mm/dd/yyyy', () => {
      const result = isValidDate('01/01/2001')
      expect(result).toBe(true)
    })

    it('should return false when passed m/dd/yyyy', () => {
      const result = isValidDate('1/01/2001')
      expect(result).toBe(false)
    })

    it('should return false when passed mm/d/yyyy', () => {
      const result = isValidDate('01/1/2001')
      expect(result).toBe(false)
    })

    it('should return false when passed mm/dd/yy', () => {
      const result = isValidDate('01/01/99')
      expect(result).toBe(false)
    })

    it('should return false when passed a random string', () => {
      const result = isValidDate('foo')
      expect(result).toBe(false)
    })
  })

  describe('formatDateString', () => {
    it('should return proper format when passed yyyy-mm-dd', () => {
      const result = formatDateString('1980-03-11')
      expect(result).toBe('1980-03-11')
    })

    it('should return proper format when passed mm/dd/yyyy', () => {
      const result = formatDateString('10/11/1980')
      expect(result).toBe('1980-10-11')
    })

    it('should add zero if month is single digit', () => {
      const result = formatDateString('3/11/1980')
      expect(result).toBe('1980-03-11')
    })
    it('should add zero if day is single digit', () => {
      const result = formatDateString('03/3/1980')
      expect(result).toBe('1980-03-03')
    })
  })
})
