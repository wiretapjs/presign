'use strict'
const identityObjProxy = require('identity-obj-proxy')

// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/tutorial-webpack.html

module.exports = {
  process () {
    return identityObjProxy
  },
  getCacheKey () {
    // The output is always the same.
    return 'cssTransform'
  },
}
