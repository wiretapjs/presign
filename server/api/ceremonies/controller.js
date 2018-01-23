const request = require('request')
const _ = require('lodash')
const HttpStatus = require('http-status-codes')
const Url = require('url-parse')
const config = require('../../config')

const REMOTE_RESOURCE = `${config.services.eServiceLegacy.url}/PmInternetPolicyServiceWeb/jaxrs/policy/ceremonies`

const CeremonyStatuses = {
  SENT: 'sent',
  READY: 'ready',
  ESIGN: 'esign',
}

const CeremonySessionTypes = {
  ESIGN: 'esign',
  PSM: 'psm',
  PAPERLESS: 'paperless',
  NOT_AVAILABLE: 'notavailable',
}

class CeremoniesController {
  constructor () {
    this.listCeremonies = this.listCeremonies.bind(this)
    this.CeremonyStatuses = CeremonyStatuses
    this.CeremonySessionTypes = CeremonySessionTypes
  }

  get resource () {
    return REMOTE_RESOURCE
  }

  _formatPolicyNumbers (policyNumbers) {
    if (!policyNumbers) return []
    if (Array.isArray(policyNumbers)) return policyNumbers
    return policyNumbers.split(',')
  }

  _formatListRequest (request, policyNumbers) {
    const requestConfig = {
      url: REMOTE_RESOURCE,
      headers: request.headers,
      body: {
        policyNumber: policyNumbers,
      },
      json: true,
      proxy: config.proxy,
    }

    requestConfig.headers.host = new Url(REMOTE_RESOURCE).host

    return requestConfig
  }

  _filterSessionType (ceremonies, sessionTypes) {
    return ceremonies.filter((ceremony) => {
      return (sessionTypes.indexOf(ceremony.sessionType) >= 0)
    })
  }

  _filterCeremonyStatus (ceremonies, statuses) {
    return ceremonies.filter((ceremony) => {
      return statuses.indexOf(ceremony.ceremonyStatus) >= 0
    })
  }

  _formatRemoteResponse (ceremonies, params) {
    let formattedCeremonies = ceremonies
    if (params.sessionType) {
      formattedCeremonies = this._filterSessionType(formattedCeremonies, params.sessionType)
    }

    if (params.ceremonyStatus) {
      formattedCeremonies = this._filterCeremonyStatus(formattedCeremonies, params.ceremonyStatus)
    }
    return formattedCeremonies
  }

  _formatParamArray (param) {
    if (Array.isArray(param)) return param
    return [param]
  }

  listCeremonies (req, res, next) {
    const policyNumbers = this._formatPolicyNumbers(req.query.policyNumbers)
    const requestConfig = this._formatListRequest(req, policyNumbers)
    if (policyNumbers.length === 0) {
      return res.status(HttpStatus.BAD_REQUEST).json({message: 'You must supply at least one policy number'})
    }

    if (req.query.sessionType) {
      req.query.sessionType = this._formatParamArray(req.query.sessionType)
    }

    if (req.query.ceremonyStatus) {
      req.query.ceremonyStatus = this._formatParamArray(req.query.ceremonyStatus)
    }

    request.post(requestConfig, (err, result) => {
      if (err) {
        return next(err)
      }

      if (result.statusCode === HttpStatus.FORBIDDEN) {
        return res.status(HttpStatus.FORBIDDEN).json({message: 'Unable to access forbidden resouce.'})
      }

      if (result.statusCode >= HttpStatus.BAD_REQUEST) {
        return next(result)
      }

      res.append('Set-Cookie', result.headers['set-cookie'])

      let ceremonies = _.get(result, 'body.ceremonies', [])
      ceremonies = this._formatRemoteResponse(ceremonies, req.query)
      return res.status(HttpStatus.OK).json({ ceremonies: ceremonies })
    })
  }
}

module.exports = new CeremoniesController()
