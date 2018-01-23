class Routing {
  generateLinkTo (pathname) {
    return {
      pathname,
      search: window.location.search,
    }
  }
}
export default new Routing()
