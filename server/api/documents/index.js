const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.get('/v1/esign/count', controller.listDocumentCountV1)

module.exports = router
