const express = require('express')
const router = express.Router()

router.get('/v1/sessions', require('./v1/sessions/list/handler'))
router.post('/v1/terms-and-conditions/accept', require('./v1/termsAndConditions/accept/handler'))
module.exports = router
