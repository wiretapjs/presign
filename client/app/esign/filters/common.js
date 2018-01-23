import filters from 'app/esign/filters/sessions/filterCollection'

export const getDocumentCountByDocType = function (sessions, docType) {
  return sessions.reduce((total, policy) => {
    const sum = policy.eSignSession.reduce((accumulator, session) => {
      const count = +session[docType.countField] || 0
      return accumulator + count
    }, 0)

    return total + sum
  }, 0)
}

export const canEsign = function (sessions) {
  let result = true

  filters.forEach(filter => {
    const filterResult = filter(sessions)
    if (!filterResult) {
      result = false
    }
  },
  )

  return result
}
