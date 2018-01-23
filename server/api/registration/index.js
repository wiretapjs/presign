const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.get('/v1/registeredUser/:regToken', controller.getRegisteredUser)
router.post('/v1/registerUserUsingRegToken', controller.registerUserUsingRegToken)
module.exports = router
