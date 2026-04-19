const phoneNumberRegex = /^\d{2,3}-\d{7,8}$/

const isValidPhoneNumber = (number) => {
  return phoneNumberRegex.test(number)
}

module.exports = { isValidPhoneNumber }
