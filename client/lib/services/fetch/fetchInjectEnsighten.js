class FetchInjectEnsighten {
  injectScript (src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.onload = (evt) => {
        window.Bootstrapper.bindPageSpecificCompletion(function (event) {
          resolve()
        })
      }
      script.src = src
      document.body.appendChild(script)
    })
  }
}

export default new FetchInjectEnsighten()
