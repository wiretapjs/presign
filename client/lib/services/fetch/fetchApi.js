class FetchApi {
  async request (url, config) {
    if (!url) throw new Error('The URL is required')

    config = config || {}

    if (config.body) {
      config = FetchApi._setDefaultsWithBody(config)
      config.body = typeof config.body === 'object' ? JSON.stringify(config.body) : config.body
    } else {
      config = FetchApi._setDefaultsWithoutBody(config)
    }

    const requestInit = {
      credentials: 'include',
      cache: 'no-cache',
      method: config.method,
      body: config.body,
    }

    if (config.headers) requestInit.headers = new Headers(config.headers)

    const response = await fetch(url, requestInit)

    if (response.ok) {
      return FetchApi._parseJSON(response)
    } else {
      throw response
    }
  }

  static _setDefaultsWithBody (config) {
    return Object.assign({
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    }, config)
  }

  static _parseJSON (response) {
    return response.text().then(function (text) {
      return text ? JSON.parse(text) : {}
    })
  }

  static _setDefaultsWithoutBody (config) {
    return Object.assign({
      method: 'GET',
    }, config)
  }
}

export default new FetchApi()
