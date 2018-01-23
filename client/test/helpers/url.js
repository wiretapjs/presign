import parseUrl from 'url-parse'
import QueryString from 'query-string'

export const setQueryString = function (queryString) {
  Object.defineProperty(window.location, 'search', {
    value: queryString,
    writable: true,
  })
}

export const getQueryParamsFromUrl = function (url) {
  return QueryString.parse(parseUrl(url).query)
}

export const getHostnameFromUrl = function (url) {
  return parseUrl(url).hostname
}
