/*
This script is intentionally located outside of the application build path.
It is intended to detect, as early as possible, whether certain browsers or
features are supported by our application.

Minified dependencies are vendored as siblings to this script. They must be
imported manually in `index.html` before this script.
*/

/* eslint-disable */
(function () {
  var browser = {
    isNotSupported: bowser.isUnsupportedBrowser({
      chrome: '37',
      msie: '11',
      msedge: '13',
      ios: '9',
      android: '5',
      firefox: '38',
      safari: '9',
      samsungBrowser: '4'
    }, true)
  }

  domReady(function () {
    if (browser.isNotSupported) {
      // display support message
      document.getElementById('browser-support').style.display = 'block'

      // prevent React from rendering
      var root = document.getElementById('root')
      root.parentNode.removeChild(root)

      // prevent the body from having a background image
      document.body.className = ''
    }
  })
})()
/* eslint-enable */
