import QueryString from 'query-string'

const get = function (param) {
  return QueryString.parse(window.location.search)[param]
}

export default { get }
