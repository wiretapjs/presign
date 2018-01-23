import QueryString from 'query-string'
import config from 'app/config'

class LegacyDestinationBuilder {
  constructor () {
    this.params = QueryString.parse(window.location.search)
    this.domain = 'libertymutual.com'
    this.bpmModule = 'PmInternetContentServiceWeb'
    this.suffix = 'url'
  }

  withAuthenticatedDestination () {
    this.suffix = 'insurance/url'
    return this
  }

  withHandstamp (suffix) {
    if (!this.params.src) return this
    const appendedSuffix = suffix ? `-${suffix}` : ''
    this.params = { ...this.params, src: `${this.params.src}-pb${appendedSuffix}` }
    return this
  }

  withQueryParamModifier (queryParamModifier) {
    this.queryParamModifier = queryParamModifier
    return this
  }

  build () {
    if (this.queryParamModifier) this.queryParamModifier(this.params)
    this.subDomain = this._buildSubDomain()
    return `https://${this.subDomain}.${this.domain}/${this.bpmModule}/${this.suffix}?${QueryString.stringify(this.params)}`
  }

  _buildSubDomain () {
    let pbDest
    if (!this.params.pbDest) {
      pbDest = config.environment === 'production' ? 'prod' : 'uat'
    } else {
      pbDest = this.params.pbDest
    }
    delete this.params.pbDest

    const subDomainPrefix = (pbDest === 'prod' || pbDest === '2pr') ? '' : `${pbDest}-`

    return `${subDomainPrefix}${config.libertySubDomainMapping[pbDest.split('-')[0]]}`
  }
}

export default LegacyDestinationBuilder
