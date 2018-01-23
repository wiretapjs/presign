const HttpStatus = require('http-status-codes')
const autobind = require('auto-bind')
const documentCountServiceV1 = require('./v1/esign/count')

class DocumentsController {
  constructor () {
    autobind(this)
  }

  listDocumentCountV1 (req, res) {
    const options = {
      transactionIds: req.query['transaction-id'],
    }

    return documentCountServiceV1.getDocumentCount([], options)
      .then(count => res.status(HttpStatus.OK).json({ count }))
      .catch(error => {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: error.toString() })
      })
  }
}

module.exports = new DocumentsController()
