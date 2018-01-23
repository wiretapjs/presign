
class DocumentCountService {
  getDocumentCount (sessions, options) {
    return this._validateOptions(options)
      .then(() => this._validateSessions(sessions))
      .then(() => {
        return sessions.reduce((sum, session) => {
          return sum + session.numSignOnlineDocs || 0
        }, 0)
      })
      .then(count => {
        return count
      })
  }

  _validateOptions (options) {
    return new Promise((resolve, reject) => {
      if (!options.transactionIds) {
        reject(new Error('Transaction ID is required'))
      }

      resolve()
    })
  }

  _validateSessions (sessions) {
    return new Promise((resolve, reject) => {
      if (!sessions) {
        reject(new Error('Sessions is required'))
      }

      if (!Array.isArray(sessions)) {
        reject(new Error('Sessions must be an array'))
      }

      resolve()
    })
  }
}

module.exports = DocumentCountService
