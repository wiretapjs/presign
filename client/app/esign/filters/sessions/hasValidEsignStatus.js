module.exports = (sessions) => {
  let isValid = true

  sessions.forEach(session => {
    if (session.ceremonyStatus !== 'accepted') {
      isValid = false
    }
  })

  return isValid
}
