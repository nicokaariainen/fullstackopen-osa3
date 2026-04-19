const { isValidPhoneNumber } = require('../utils/validators')

describe('phone number validation', () => {
  test('valid number with 2-digit area code', () => {
    expect(isValidPhoneNumber('09-1234567')).toBe(true)
  })

  test('valid number with 3-digit area code', () => {
    expect(isValidPhoneNumber('040-12345678')).toBe(true)
  })

  test('rejects number without dash', () => {
    expect(isValidPhoneNumber('091234567')).toBe(false)
  })

  test('rejects number with 1-digit area code', () => {
    expect(isValidPhoneNumber('1-1234567')).toBe(false)
  })

  test('rejects number with too short second part', () => {
    expect(isValidPhoneNumber('09-123456')).toBe(false)
  })

  test('rejects number with too long second part', () => {
    expect(isValidPhoneNumber('09-123456789')).toBe(false)
  })

  test('rejects number with letters', () => {
    expect(isValidPhoneNumber('09-abcdefg')).toBe(false)
  })

  test('rejects empty string', () => {
    expect(isValidPhoneNumber('')).toBe(false)
  })
})
