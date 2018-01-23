const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.get('/v1', controller.listCeremonies)

module.exports = router
