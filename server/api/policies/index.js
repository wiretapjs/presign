const express = require('express')
const controller = require('./controller')
const router = express.Router()

router.get('/v1', controller.listPolicies)
router.get('/v1/:policyNumber/summary', controller.getPolicySummary)

module.exports = router
