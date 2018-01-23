const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.post('/v1/login', controller.loginUser)
module.exports = router
