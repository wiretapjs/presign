import URLSearchParams from 'url-search-params'

class QueryParams {
  constructor () {
    this._searchParams = new URLSearchParams()
  }

  append (name, value) {
    if (!name) throw new Error('The param name must be defined')

    if (Array.isArray(value)) {
      value.forEach((individualValue) => {
        this._searchParams.append(name, individualValue)
      })
    } else if (value) {
      this._searchParams.append(name, value)
    }
  }

  toString () {
    return this._searchParams.toString()
  }
}

export default QueryParams
