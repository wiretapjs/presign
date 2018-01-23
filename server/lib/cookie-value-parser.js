class CookieValueParser {
  filterCookies (cookies, filter) {
    if (!cookies || !filter) {
      return []
    }

    const filteredCookies = cookies.filter(cookie => cookie.toLowerCase()
      .includes(filter.toLowerCase()))

    return filteredCookies
  }
}

module.exports = new CookieValueParser()
