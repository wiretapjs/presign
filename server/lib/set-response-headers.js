
module.exports = function (res, headers) {
  headers = headers || {}
  Object.keys(headers).forEach((key) => {
    res.set(key, headers[key])
  })
}
