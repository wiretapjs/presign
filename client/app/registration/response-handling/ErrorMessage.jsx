import React from 'react'
import PropTypes from 'prop-types'
import redirect from 'lib/util/redirect'
import { passwordErrorMessage } from '../passwordInput/PasswordInput'
import responseCodes, { defaultResponseValue } from './responseCodes'
import AlreadyRegisteredError from './AlreadyRegisteredError'

const codeToMessage = {
  [responseCodes.genericError.code]: <div>
    Oops something went wrong, let's try this again.
  </div>,
  [responseCodes.invalidNewPassword.code]: <div>{passwordErrorMessage}</div>,
  [responseCodes.invalidDOB.code]: <div>
    The date of birth entered does not match our records.
    Please verify your information and re-enter.
  </div>,
  [responseCodes.alreadyRegistered.code]: <AlreadyRegisteredError />,
  [responseCodes.duplicateAccount.code]: <AlreadyRegisteredError />,
}

const canHandleCode = function (code) {
  return Object.keys(codeToMessage).includes(code)
}

const shouldRedirectToEService = function (code) {
  return code === defaultResponseValue.code
}

const ErrorMessage = function (props) {
  let errorCodeForRendering = props.code

  if (!canHandleCode(props.code)) errorCodeForRendering = defaultResponseValue.code

  if (shouldRedirectToEService(errorCodeForRendering)) redirect.eserviceEsignRegister()

  return codeToMessage[errorCodeForRendering]
}

ErrorMessage.propTypes = {
  code: PropTypes.string.isRequired,
}

export default ErrorMessage
