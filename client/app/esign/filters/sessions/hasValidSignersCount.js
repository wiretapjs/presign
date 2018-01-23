module.exports = (sessions) => {
  let isValid = true

  sessions.forEach(session => {
    const signerCount = session.signerCount || 0
    if (signerCount !== 1) isValid = false
  })

  return isValid
}
