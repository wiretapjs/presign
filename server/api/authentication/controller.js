const request = require('request')
const HttpStatus = require('http-status-codes')
const cookieParser = require('lib/cookie-value-parser')
const config = require('../../config')
const LOGIN_RESOURCE = `${config.services.eServiceLegacy.url}/LMAuth/eservicelog.fcc`
const TARGET = `${config.services.eServiceLegacy.url}/PmEServiceAuth/cAuth/tredir.html?uri=login`

class AuthenticationController {
  constructor () {
    this.loginUser = this.loginUser.bind(this)
  }

  _formatLoginUserRequest (request, user) {
    const requestConfig = {
      url: LOGIN_RESOURCE,
      form: {
        target: TARGET,
        USER: user.username,
        PASSWORD: user.password,
      },
    }
    return requestConfig
  }

  loginUser (req, res, next) {
    const user = req.body
    const requestConfig = this._formatLoginUserRequest(req, user)
    request.post(requestConfig, (err, requestResponse) => {
      if (err) {
        return next(err)
      }

      const requestCookies = requestResponse.headers['set-cookie']
      const securityTokenKey = 'LtpaToken2'
      const ltpaToken2Cookies = cookieParser.filterCookies(requestCookies, securityTokenKey)
      // service always returns a redirect code,
      // we determine a successful login by checking for this cookie
      if (ltpaToken2Cookies.length > 0) {
        ltpaToken2Cookies.forEach(childCookie => {
          res.append('Set-Cookie', childCookie)
        })
        return res.status(HttpStatus.OK).json({})
      }
      return res.status(HttpStatus.UNAUTHORIZED).end()
    })
  }
}

module.exports = new AuthenticationController()
