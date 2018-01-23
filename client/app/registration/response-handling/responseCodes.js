const values = {
  genericError: {
    code: '5201',
    typeOfResponse: 'Generic Error',
  },
  lockout: {
    code: '5022',
    typeOfResponse: 'Lockout',
  },
  invalidNewPassword: {
    code: '5036',
    typeOfResponse: 'Invalid New Password',
  },
  usernameAlreadyExists: {
    code: '5037',
    typeOfResponse: 'UserName already exists',
  },
  alreadyRegistered: {
    code: '5040',
    typeOfResponse: 'Policy already registered',
  },
  invalidDOB: {
    code: '5045',
    typeOfResponse: 'Invalid DOB',
  },
  invalidEmail: {
    code: '5046',
    typeOfResponse: 'Invalid Email',
  },
  duplicateAccount: {
    code: '5035',
    typeOfResponse: 'Duplicate Account',
  },
  success: {
    code: '5010',
    typeOfResponse: 'Success',
  },
}

export const defaultResponseValue = values.genericError

export const getValue = function (code) {
  let matchingItem = Object.values(values).find(responseItem => responseItem.code === code)
  if (!matchingItem) matchingItem = defaultResponseValue
  return {
    typeOfResponse: matchingItem.typeOfResponse,
    code: matchingItem.code,
  }
}

export default values
